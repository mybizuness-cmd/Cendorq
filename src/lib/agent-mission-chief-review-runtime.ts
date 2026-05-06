import { randomUUID } from "node:crypto";
import path from "node:path";

import {
  type AgentMissionExecutionRecord,
  type AgentMissionQueueState,
  loadAgentMissionExecutionEnvelope,
  projectCustomerOutputAssembly,
  saveAgentMissionExecutionEnvelope,
  scoreAgentMissionExecution,
} from "@/lib/agent-mission-live-execution-runtime";
import { projectAgentFindingSubmission, projectReleaseCaptainApproval } from "@/lib/agent-mission-review-gates-runtime";
import { loadFileBackedEnvelope, saveFileBackedEnvelope, type FileBackedEnvelope } from "@/lib/storage/file-backed-envelope";

export type ChiefAgentReviewDecision = "accepted" | "request-changes" | "rejected";

export type ChiefAgentMissionReviewInput = {
  executionId: string;
  chiefAgentKey: string;
  decision: ChiefAgentReviewDecision;
  consolidatedFacts: readonly string[];
  priorityFindings: readonly string[];
  evidenceConflicts: readonly string[];
  safeLimitations: readonly string[];
  requiredCaptainNotes: readonly string[];
  now?: string;
};

export type ChiefAgentMissionReviewRecord = {
  reviewId: string;
  executionId: string;
  missionRecordId: string;
  planKey: string;
  chiefAgentKey: string;
  decision: ChiefAgentReviewDecision;
  createdAt: string;
  acceptedFindingCount: number;
  requiredFindingCount: number;
  consolidatedFacts: readonly string[];
  priorityFindings: readonly string[];
  evidenceConflicts: readonly string[];
  safeLimitations: readonly string[];
  requiredCaptainNotes: readonly string[];
  reasonCodes: readonly string[];
  captainReviewReady: boolean;
  customerFacingOutputAllowed: false;
  reportReleaseAllowed: false;
  productionMutationAllowed: false;
  deliveryEmailAllowed: false;
  billingActionAllowed: false;
};

export type ChiefAgentMissionReviewResult = {
  ok: boolean;
  executionId: string;
  reviewId: string;
  decision: ChiefAgentReviewDecision;
  queueState: AgentMissionQueueState | "not-found";
  captainReviewReady: boolean;
  acceptedFindingCount: number;
  requiredFindingCount: number;
  reasonCodes: readonly string[];
  nextOperatingAction: string;
};

type ChiefAgentMissionReviewEnvelope = FileBackedEnvelope<ChiefAgentMissionReviewRecord>;

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const STORAGE_FILE = path.join(STORAGE_DIR, "agent-mission-chief-reviews.v3.json");

export const AGENT_MISSION_CHIEF_REVIEW_RULES = [
  "Chief-agent review must target an existing persisted execution record.",
  "Only the assigned chief agent for the mission can submit the chief review record.",
  "Chief review must include consolidated facts, priority findings, evidence conflicts, safe limitations, and required captain notes.",
  "Chief review can accept findings for release-captain review, request changes, or reject the mission posture.",
  "Chief review cannot approve customer-facing output, report release, production mutation, delivery email, billing action, provider action, or paid recommendation.",
  "Accepted chief review must still leave release-captain approval, plan boundary checks, output assembly, report/PDF/email delivery gates, and blocked-claim limitations in place.",
] as const;

export async function submitChiefAgentMissionReview(input: ChiefAgentMissionReviewInput): Promise<ChiefAgentMissionReviewResult> {
  const now = input.now || new Date().toISOString();
  const executionEnvelope = await loadAgentMissionExecutionEnvelope();
  const execution = executionEnvelope.entries.find((entry) => entry.executionId === cleanString(input.executionId, 220));

  if (!execution) {
    return {
      ok: false,
      executionId: cleanString(input.executionId, 220),
      reviewId: "missing-execution-record",
      decision: input.decision,
      queueState: "not-found",
      captainReviewReady: false,
      acceptedFindingCount: 0,
      requiredFindingCount: 0,
      reasonCodes: ["execution-record-not-found"],
      nextOperatingAction: "Create or locate the agent mission execution record before chief-agent review.",
    };
  }

  const review = projectChiefAgentMissionReviewRecord(execution, input, now);
  const updatedExecution = projectExecutionAfterChiefReview(execution, review, now);
  const updatedEntries = executionEnvelope.entries.map((entry) => (entry.executionId === execution.executionId ? updatedExecution : entry));
  await saveAgentMissionExecutionEnvelope({ ...executionEnvelope, entries: updatedEntries });

  const reviewEnvelope = await loadChiefAgentMissionReviewEnvelope();
  await saveChiefAgentMissionReviewEnvelope({ version: 3, entries: [review, ...reviewEnvelope.entries.filter((entry) => entry.reviewId !== review.reviewId)] });

  return {
    ok: review.reasonCodes.length === 0,
    executionId: execution.executionId,
    reviewId: review.reviewId,
    decision: review.decision,
    queueState: updatedExecution.queueState,
    captainReviewReady: review.captainReviewReady,
    acceptedFindingCount: review.acceptedFindingCount,
    requiredFindingCount: review.requiredFindingCount,
    reasonCodes: review.reasonCodes,
    nextOperatingAction: review.captainReviewReady ? "Send the mission to release-captain review; do not release customer output yet." : "Resolve chief-agent review blockers before release-captain review.",
  };
}

export function projectChiefAgentMissionReviewPreview(execution: AgentMissionExecutionRecord, input: Omit<ChiefAgentMissionReviewInput, "executionId">) {
  const review = projectChiefAgentMissionReviewRecord(execution, { ...input, executionId: execution.executionId }, input.now || new Date().toISOString());
  const updatedExecution = projectExecutionAfterChiefReview(execution, review, input.now || new Date().toISOString());
  return { review, updatedExecution };
}

export async function loadChiefAgentMissionReviewEnvelope(): Promise<ChiefAgentMissionReviewEnvelope> {
  return loadFileBackedEnvelope({
    storageDir: STORAGE_DIR,
    storageFile: STORAGE_FILE,
    normalizeEntry: normalizeChiefAgentMissionReviewRecord,
    sortEntries: sortChiefAgentMissionReviewRecords,
    createTempId: randomUUID,
  });
}

export async function saveChiefAgentMissionReviewEnvelope(envelope: ChiefAgentMissionReviewEnvelope) {
  await saveFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, envelope, createTempId: randomUUID });
}

function projectChiefAgentMissionReviewRecord(execution: AgentMissionExecutionRecord, input: ChiefAgentMissionReviewInput, now: string): ChiefAgentMissionReviewRecord {
  const acceptedSubmissions = execution.findingRecords.filter((finding) => projectAgentFindingSubmission(execution.runtime, finding).accepted);
  const chiefAgentKey = cleanString(input.chiefAgentKey, 140);
  const reasonCodes = deriveChiefReviewReasonCodes(execution, input, acceptedSubmissions.length);
  const decision = normalizeDecision(input.decision);
  const captainReviewReady = reasonCodes.length === 0 && decision === "accepted";

  return {
    reviewId: `${execution.executionId}-${chiefAgentKey || "unknown-chief"}-chief-review`,
    executionId: execution.executionId,
    missionRecordId: execution.runtime.missionRecordId,
    planKey: execution.runtime.planKey,
    chiefAgentKey,
    decision,
    createdAt: now,
    acceptedFindingCount: acceptedSubmissions.length,
    requiredFindingCount: execution.runtime.assignedAgentKeys.length,
    consolidatedFacts: cleanStringList(input.consolidatedFacts, 320, 10),
    priorityFindings: cleanStringList(input.priorityFindings, 320, 8),
    evidenceConflicts: cleanStringList(input.evidenceConflicts, 320, 8),
    safeLimitations: cleanStringList(input.safeLimitations, 320, 8),
    requiredCaptainNotes: cleanStringList(input.requiredCaptainNotes, 320, 8),
    reasonCodes,
    captainReviewReady,
    customerFacingOutputAllowed: false,
    reportReleaseAllowed: false,
    productionMutationAllowed: false,
    deliveryEmailAllowed: false,
    billingActionAllowed: false,
  };
}

function projectExecutionAfterChiefReview(execution: AgentMissionExecutionRecord, review: ChiefAgentMissionReviewRecord, now: string): AgentMissionExecutionRecord {
  const chiefReview = {
    ...execution.chiefReview,
    state: review.captainReviewReady ? "reviewed" as const : review.decision === "rejected" ? "rejected" as const : "not-ready" as const,
    acceptedFindingCount: review.acceptedFindingCount,
    requiredFindingCount: review.requiredFindingCount,
    reasonCodes: review.reasonCodes,
    consolidatedEvidencePosture: review.captainReviewReady ? "ready-for-captain" as const : review.decision === "rejected" ? "blocked" as const : "needs-more-agent-work" as const,
  };
  const captainApproval = projectReleaseCaptainApproval({ ...execution.runtime, findingRecords: execution.findingRecords });
  const qualityScore = scoreAgentMissionExecution(execution.runtime, execution.findingRecords);
  const outputAssembly = projectCustomerOutputAssembly(execution.runtime, captainApproval, qualityScore);
  const queueState = deriveQueueStateAfterChiefReview(execution, review);

  return {
    ...execution,
    updatedAt: now,
    chiefReview,
    captainApproval,
    qualityScore,
    outputAssembly,
    queueState,
    blockedReasonCodes: [...review.reasonCodes, ...captainApproval.reasonCodes, ...outputAssembly.blockedUntil],
    auditTrail: [
      ...execution.auditTrail,
      {
        eventId: `chief-review-${randomUUID()}`,
        eventType: "chief-review-projected",
        occurredAt: now,
        actor: "chief-agent",
        safeSummary: `Chief agent ${review.chiefAgentKey} submitted ${review.decision} review for ${execution.runtime.planKey}.`,
      },
    ],
  };
}

function deriveChiefReviewReasonCodes(execution: AgentMissionExecutionRecord, input: ChiefAgentMissionReviewInput, acceptedFindingCount: number) {
  const reasons: string[] = [];
  if (cleanString(input.chiefAgentKey, 140) !== execution.runtime.assignedChiefAgent) reasons.push("chief-agent-not-assigned-to-mission");
  if (acceptedFindingCount < execution.runtime.assignedAgentKeys.length) reasons.push("accepted-agent-findings-incomplete");
  if (!cleanStringList(input.consolidatedFacts, 320, 10).length) reasons.push("consolidated-facts-missing");
  if (!cleanStringList(input.priorityFindings, 320, 8).length) reasons.push("priority-findings-missing");
  if (!cleanStringList(input.safeLimitations, 320, 8).length) reasons.push("safe-limitations-missing");
  if (!cleanStringList(input.requiredCaptainNotes, 320, 8).length) reasons.push("required-captain-notes-missing");
  if (normalizeDecision(input.decision) === "accepted" && execution.qualityScore.tier === "blocked") reasons.push("quality-score-blocked");
  if (normalizeDecision(input.decision) === "accepted" && execution.runtime.status === "blocked") reasons.push("mission-status-blocked");
  return reasons;
}

function deriveQueueStateAfterChiefReview(execution: AgentMissionExecutionRecord, review: ChiefAgentMissionReviewRecord): AgentMissionQueueState {
  if (execution.runtime.status === "blocked" || review.decision === "rejected") return "blocked-by-safety";
  if (execution.runtime.missingMissionInputs.length) return "waiting-for-context";
  if (review.captainReviewReady) return "captain-review-ready";
  if (review.acceptedFindingCount > 0) return "findings-submitted";
  return execution.queueState;
}

function normalizeChiefAgentMissionReviewRecord(value: unknown): ChiefAgentMissionReviewRecord | null {
  if (!isRecord(value)) return null;
  return {
    reviewId: cleanString(value.reviewId, 220) || randomUUID(),
    executionId: cleanString(value.executionId, 220),
    missionRecordId: cleanString(value.missionRecordId, 220),
    planKey: cleanString(value.planKey, 60),
    chiefAgentKey: cleanString(value.chiefAgentKey, 140),
    decision: normalizeDecision(value.decision),
    createdAt: normalizeIsoDate(value.createdAt),
    acceptedFindingCount: clampInteger(value.acceptedFindingCount, 0, 100, 0),
    requiredFindingCount: clampInteger(value.requiredFindingCount, 0, 100, 0),
    consolidatedFacts: cleanStringList(asStringArray(value.consolidatedFacts), 320, 10),
    priorityFindings: cleanStringList(asStringArray(value.priorityFindings), 320, 8),
    evidenceConflicts: cleanStringList(asStringArray(value.evidenceConflicts), 320, 8),
    safeLimitations: cleanStringList(asStringArray(value.safeLimitations), 320, 8),
    requiredCaptainNotes: cleanStringList(asStringArray(value.requiredCaptainNotes), 320, 8),
    reasonCodes: cleanStringList(asStringArray(value.reasonCodes), 160, 12),
    captainReviewReady: value.captainReviewReady === true,
    customerFacingOutputAllowed: false,
    reportReleaseAllowed: false,
    productionMutationAllowed: false,
    deliveryEmailAllowed: false,
    billingActionAllowed: false,
  };
}

function sortChiefAgentMissionReviewRecords(entries: ChiefAgentMissionReviewRecord[]) {
  return [...entries].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

function normalizeDecision(value: unknown): ChiefAgentReviewDecision {
  return value === "accepted" || value === "request-changes" || value === "rejected" ? value : "request-changes";
}

function cleanStringList(values: readonly string[], maxLength: number, maxItems: number) {
  return values.map((value) => cleanString(value, maxLength)).filter(Boolean).slice(0, maxItems);
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.normalize("NFKC").replace(/<[^>]*>/g, " ").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeIsoDate(value: unknown) {
  if (typeof value !== "string") return new Date().toISOString();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function clampInteger(value: unknown, min: number, max: number, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
