import { randomUUID } from "node:crypto";
import path from "node:path";

import {
  type AgentFindingRecord,
  type PlanTriggeredAgentMission,
  projectPlanTriggeredAgentMission,
} from "@/lib/agent-mission-operating-engine";
import {
  projectAgentFindingSubmission,
  projectChiefAgentReview,
  projectReleaseCaptainApproval,
} from "@/lib/agent-mission-review-gates-runtime";
import type { AgentMissionRuntimeRecord } from "@/lib/agent-mission-records-runtime";
import { projectAgentMissionRuntimeRecord } from "@/lib/agent-mission-records-runtime";
import type { PlanIntelligenceIntakeRecord } from "@/lib/plan-intelligence-intake-records";
import type { PlanValueKey } from "@/lib/plan-value-delivery-architecture";
import {
  loadFileBackedEnvelope,
  saveFileBackedEnvelope,
  type FileBackedEnvelope,
} from "@/lib/storage/file-backed-envelope";

export type AgentMissionQueueState =
  | "queued"
  | "waiting-for-context"
  | "blocked-by-safety"
  | "researching"
  | "findings-submitted"
  | "chief-review-ready"
  | "captain-review-ready"
  | "customer-output-approved";

export type AgentMissionExecutionAuditEvent = {
  eventId: string;
  eventType:
    | "mission-created"
    | "finding-submitted"
    | "chief-review-projected"
    | "captain-approval-projected"
    | "output-assembly-projected";
  occurredAt: string;
  actor: "system" | "agent" | "chief-agent" | "release-captain";
  safeSummary: string;
};

export type AgentMissionQualityScore = {
  evidenceDepth: number;
  sourceCoverage: number;
  assumptionClarity: number;
  riskVisibility: number;
  planBoundarySafety: number;
  customerUsefulness: number;
  total: number;
  tier: "blocked" | "thin" | "reviewable" | "strong";
};

export type CustomerOutputAssemblyProjection = {
  outputKey: string;
  planKey: PlanValueKey;
  outputType: "free-scan-result" | "deep-review-report" | "build-fix-summary" | "ongoing-control-summary";
  readiness: "blocked" | "needs-review" | "ready-for-delivery-gate";
  dashboardDestination: "/dashboard/reports" | "/dashboard/reports/free-scan";
  requiresPdfAttachment: boolean;
  requiresDeliveryEmail: boolean;
  safeSections: readonly string[];
  blockedUntil: readonly string[];
};

export type AgentMissionExecutionRecord = {
  executionId: string;
  createdAt: string;
  updatedAt: string;
  mission: PlanTriggeredAgentMission;
  runtime: AgentMissionRuntimeRecord;
  queueState: AgentMissionQueueState;
  findingRecords: readonly AgentFindingRecord[];
  chiefReview: ReturnType<typeof projectChiefAgentReview>;
  captainApproval: ReturnType<typeof projectReleaseCaptainApproval>;
  qualityScore: AgentMissionQualityScore;
  outputAssembly: CustomerOutputAssemblyProjection;
  auditTrail: readonly AgentMissionExecutionAuditEvent[];
  blockedReasonCodes: readonly string[];
};

type AgentMissionExecutionEnvelope = FileBackedEnvelope<AgentMissionExecutionRecord>;

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const STORAGE_FILE = path.join(STORAGE_DIR, "agent-mission-executions.v3.json");

export const AGENT_MISSION_LIVE_EXECUTION_RULES = [
  "Every plan-triggered mission must persist an execution record before agent work can be treated as operational.",
  "Every execution record must carry mission template, runtime record, queue state, finding records, chief review, captain approval, quality score, output assembly posture, blocked reason codes, and append-only audit trail.",
  "Free Scan output assembly can target dashboard-only results, while paid plan output assembly must target dashboard report delivery plus PDF/email gates.",
  "Customer output assembly cannot become delivery-ready until finding submissions, chief review, release-captain approval posture, plan boundary safety, and blocked-claim review pass.",
  "Live execution records must store safe summaries and metadata only; raw customer payloads, credentials, payment data, provider payloads, prompts, internal notes, and cross-customer records are blocked.",
  "Quality scoring must penalize missing sources, missing assumptions, missing risks, weak plan-boundary safety, and unclear customer usefulness.",
] as const;

export async function createOrUpdateAgentMissionExecutionRecord(input: {
  planKey: PlanValueKey;
  intake?: PlanIntelligenceIntakeRecord;
  executionId?: string;
  now?: string;
}) {
  const now = input.now || new Date().toISOString();
  const mission = projectPlanTriggeredAgentMission(input.planKey, input.intake);
  const runtime = projectAgentMissionRuntimeRecord(input.planKey, input.intake);
  const findingRecords = runtime.findingRecords;
  const chiefReview = projectChiefAgentReview(runtime);
  const captainApproval = projectReleaseCaptainApproval(runtime);
  const qualityScore = scoreAgentMissionExecution(runtime, findingRecords);
  const outputAssembly = projectCustomerOutputAssembly(runtime, captainApproval, qualityScore);
  const blockedReasonCodes = deriveBlockedReasonCodes(runtime, chiefReview, captainApproval, qualityScore, outputAssembly);
  const executionId = input.executionId || `${runtime.missionRecordId}-execution`;

  const record: AgentMissionExecutionRecord = {
    executionId,
    createdAt: now,
    updatedAt: now,
    mission,
    runtime,
    queueState: deriveQueueState(runtime, chiefReview, captainApproval, outputAssembly),
    findingRecords,
    chiefReview,
    captainApproval,
    qualityScore,
    outputAssembly,
    blockedReasonCodes,
    auditTrail: [
      projectAuditEvent("mission-created", "system", `Created ${mission.planKey} agent mission execution record.`, now),
      projectAuditEvent("chief-review-projected", "chief-agent", `Projected chief review for ${runtime.assignedChiefAgent}.`, now),
      projectAuditEvent("captain-approval-projected", "release-captain", `Projected release gate ${runtime.releaseCaptainReview.gate}.`, now),
      projectAuditEvent("output-assembly-projected", "system", `Projected ${outputAssembly.outputType} assembly posture.`, now),
    ],
  };

  const envelope = await loadAgentMissionExecutionEnvelope();
  const existingIndex = envelope.entries.findIndex((entry) => entry.executionId === executionId);
  const entries = [...envelope.entries];
  if (existingIndex >= 0) entries[existingIndex] = { ...record, createdAt: entries[existingIndex].createdAt };
  else entries.unshift(record);
  await saveAgentMissionExecutionEnvelope({ version: 3, entries: sortAgentMissionExecutionRecords(entries) });
  return record;
}

export async function loadAgentMissionExecutionEnvelope(): Promise<AgentMissionExecutionEnvelope> {
  return loadFileBackedEnvelope({
    storageDir: STORAGE_DIR,
    storageFile: STORAGE_FILE,
    normalizeEntry: normalizeAgentMissionExecutionRecord,
    sortEntries: sortAgentMissionExecutionRecords,
    createTempId: randomUUID,
  });
}

export async function saveAgentMissionExecutionEnvelope(envelope: AgentMissionExecutionEnvelope) {
  await saveFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, envelope, createTempId: randomUUID });
}

export function projectAgentMissionExecutionPreview(planKey: PlanValueKey, intake?: PlanIntelligenceIntakeRecord) {
  const runtime = projectAgentMissionRuntimeRecord(planKey, intake);
  const chiefReview = projectChiefAgentReview(runtime);
  const captainApproval = projectReleaseCaptainApproval(runtime);
  const qualityScore = scoreAgentMissionExecution(runtime, runtime.findingRecords);
  const outputAssembly = projectCustomerOutputAssembly(runtime, captainApproval, qualityScore);
  return {
    runtime,
    chiefReview,
    captainApproval,
    qualityScore,
    outputAssembly,
    queueState: deriveQueueState(runtime, chiefReview, captainApproval, outputAssembly),
    blockedReasonCodes: deriveBlockedReasonCodes(runtime, chiefReview, captainApproval, qualityScore, outputAssembly),
  };
}

export function scoreAgentMissionExecution(runtime: AgentMissionRuntimeRecord, findings: readonly AgentFindingRecord[]): AgentMissionQualityScore {
  const sourceCoverage = clampScore(sum(findings.map((finding) => finding.sourceRefs.length)) * 12);
  const evidenceDepth = clampScore(sum(findings.map((finding) => finding.verifiedFacts.length)) * 10);
  const assumptionClarity = clampScore(sum(findings.map((finding) => finding.assumptions.length)) * 10);
  const riskVisibility = clampScore(sum(findings.map((finding) => finding.risks.length)) * 12);
  const planBoundarySafety = runtime.blockedOutputClaims.length ? 55 : 90;
  const customerUsefulness = runtime.missingMissionInputs.length ? 40 : 75;
  const total = Math.round((evidenceDepth + sourceCoverage + assumptionClarity + riskVisibility + planBoundarySafety + customerUsefulness) / 6);
  return {
    evidenceDepth,
    sourceCoverage,
    assumptionClarity,
    riskVisibility,
    planBoundarySafety,
    customerUsefulness,
    total,
    tier: total >= 82 ? "strong" : total >= 65 ? "reviewable" : total >= 45 ? "thin" : "blocked",
  };
}

export function projectCustomerOutputAssembly(
  runtime: AgentMissionRuntimeRecord,
  captainApproval: ReturnType<typeof projectReleaseCaptainApproval>,
  qualityScore: AgentMissionQualityScore,
): CustomerOutputAssemblyProjection {
  const paidPlan = runtime.planKey !== "free-scan";
  const readiness = captainApproval.customerFacingOutputAllowed && qualityScore.tier !== "blocked" && qualityScore.tier !== "thin" ? "ready-for-delivery-gate" : runtime.status === "blocked" ? "blocked" : "needs-review";
  return {
    outputKey: `${runtime.missionRecordId}-customer-output`,
    planKey: runtime.planKey,
    outputType: runtime.planKey === "free-scan" ? "free-scan-result" : runtime.planKey === "deep-review" ? "deep-review-report" : runtime.planKey === "build-fix" ? "build-fix-summary" : "ongoing-control-summary",
    readiness,
    dashboardDestination: runtime.planKey === "free-scan" ? "/dashboard/reports/free-scan" : "/dashboard/reports",
    requiresPdfAttachment: paidPlan,
    requiresDeliveryEmail: paidPlan,
    safeSections: ["customer-safe summary", "verified facts", "assumptions", "evidence gaps", "confidence", "risks", "next action", "blocked claims removed or limited"],
    blockedUntil: readiness === "ready-for-delivery-gate" ? [] : deriveOutputAssemblyBlockers(runtime, captainApproval, qualityScore),
  };
}

function deriveQueueState(
  runtime: AgentMissionRuntimeRecord,
  chiefReview: ReturnType<typeof projectChiefAgentReview>,
  captainApproval: ReturnType<typeof projectReleaseCaptainApproval>,
  outputAssembly: CustomerOutputAssemblyProjection,
): AgentMissionQueueState {
  if (runtime.status === "blocked") return "blocked-by-safety";
  if (runtime.missingMissionInputs.length) return "waiting-for-context";
  if (outputAssembly.readiness === "ready-for-delivery-gate") return "customer-output-approved";
  if (captainApproval.state === "waiting") return "captain-review-ready";
  if (chiefReview.consolidatedEvidencePosture === "ready-for-captain") return "chief-review-ready";
  if (runtime.findingRecords.some((finding) => projectAgentFindingSubmission(runtime, finding).accepted)) return "findings-submitted";
  return "queued";
}

function deriveBlockedReasonCodes(
  runtime: AgentMissionRuntimeRecord,
  chiefReview: ReturnType<typeof projectChiefAgentReview>,
  captainApproval: ReturnType<typeof projectReleaseCaptainApproval>,
  qualityScore: AgentMissionQualityScore,
  outputAssembly: CustomerOutputAssemblyProjection,
) {
  return [
    ...chiefReview.reasonCodes,
    ...captainApproval.reasonCodes,
    ...(qualityScore.tier === "blocked" || qualityScore.tier === "thin" ? [`quality-score-${qualityScore.tier}`] : []),
    ...outputAssembly.blockedUntil,
    ...runtime.missingMissionInputs.map((field) => `missing-input:${field}`),
  ];
}

function deriveOutputAssemblyBlockers(
  runtime: AgentMissionRuntimeRecord,
  captainApproval: ReturnType<typeof projectReleaseCaptainApproval>,
  qualityScore: AgentMissionQualityScore,
) {
  const blockers: string[] = [];
  if (!captainApproval.customerFacingOutputAllowed) blockers.push("release-captain-output-posture-not-approved");
  if (qualityScore.tier === "blocked" || qualityScore.tier === "thin") blockers.push("quality-score-not-strong-enough");
  if (runtime.blockedOutputClaims.length) blockers.push("blocked-claims-need-safe-limitation");
  if (runtime.planKey !== "free-scan") blockers.push("paid-report-dashboard-pdf-email-gates-required");
  return blockers;
}

function normalizeAgentMissionExecutionRecord(value: unknown): AgentMissionExecutionRecord | null {
  if (!isRecord(value)) return null;
  const preview = projectAgentMissionExecutionPreview(normalizePlanKey(value.planKey) || "free-scan");
  return {
    executionId: cleanString(value.executionId, 220) || `${preview.runtime.missionRecordId}-execution`,
    createdAt: normalizeIsoDate(value.createdAt),
    updatedAt: normalizeIsoDate(value.updatedAt),
    mission: preview.runtime ? projectPlanTriggeredAgentMission(preview.runtime.planKey) : projectPlanTriggeredAgentMission("free-scan"),
    runtime: preview.runtime,
    queueState: normalizeQueueState(value.queueState) || preview.queueState,
    findingRecords: preview.runtime.findingRecords,
    chiefReview: preview.chiefReview,
    captainApproval: preview.captainApproval,
    qualityScore: preview.qualityScore,
    outputAssembly: preview.outputAssembly,
    auditTrail: normalizeAuditTrail(value.auditTrail),
    blockedReasonCodes: preview.blockedReasonCodes,
  };
}

function sortAgentMissionExecutionRecords(entries: AgentMissionExecutionRecord[]) {
  return [...entries].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function projectAuditEvent(eventType: AgentMissionExecutionAuditEvent["eventType"], actor: AgentMissionExecutionAuditEvent["actor"], safeSummary: string, occurredAt: string): AgentMissionExecutionAuditEvent {
  return { eventId: `${eventType}-${randomUUID()}`, eventType, actor, safeSummary, occurredAt };
}

function normalizeAuditTrail(value: unknown): readonly AgentMissionExecutionAuditEvent[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isRecord).map((event) => ({
    eventId: cleanString(event.eventId, 160) || randomUUID(),
    eventType: normalizeAuditEventType(event.eventType) || "mission-created",
    occurredAt: normalizeIsoDate(event.occurredAt),
    actor: normalizeAuditActor(event.actor) || "system",
    safeSummary: cleanString(event.safeSummary, 500) || "Safe mission audit event.",
  }));
}

function normalizeAuditEventType(value: unknown): AgentMissionExecutionAuditEvent["eventType"] | null {
  return value === "mission-created" || value === "finding-submitted" || value === "chief-review-projected" || value === "captain-approval-projected" || value === "output-assembly-projected" ? value : null;
}

function normalizeAuditActor(value: unknown): AgentMissionExecutionAuditEvent["actor"] | null {
  return value === "system" || value === "agent" || value === "chief-agent" || value === "release-captain" ? value : null;
}

function normalizeQueueState(value: unknown): AgentMissionQueueState | null {
  return value === "queued" || value === "waiting-for-context" || value === "blocked-by-safety" || value === "researching" || value === "findings-submitted" || value === "chief-review-ready" || value === "captain-review-ready" || value === "customer-output-approved" ? value : null;
}

function normalizePlanKey(value: unknown): PlanValueKey | null {
  return value === "free-scan" || value === "deep-review" || value === "build-fix" || value === "ongoing-control" ? value : null;
}

function normalizeIsoDate(value: unknown) {
  if (typeof value !== "string") return new Date().toISOString();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.normalize("NFKC").replace(/<[^>]*>/g, " ").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sum(values: readonly number[]) {
  return values.reduce((total, value) => total + value, 0);
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}
