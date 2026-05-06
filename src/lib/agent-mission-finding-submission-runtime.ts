import { randomUUID } from "node:crypto";

import type { AgentFindingRecord } from "@/lib/agent-mission-operating-engine";
import {
  type AgentMissionExecutionRecord,
  type AgentMissionQueueState,
  loadAgentMissionExecutionEnvelope,
  projectCustomerOutputAssembly,
  saveAgentMissionExecutionEnvelope,
  scoreAgentMissionExecution,
} from "@/lib/agent-mission-live-execution-runtime";
import {
  projectAgentFindingSubmission,
  projectChiefAgentReview,
  projectReleaseCaptainApproval,
} from "@/lib/agent-mission-review-gates-runtime";

export type AgentMissionFindingSubmissionInput = {
  executionId: string;
  agentKey: string;
  verifiedFacts: readonly string[];
  sourceRefs: readonly string[];
  assumptions: readonly string[];
  evidenceGaps: readonly string[];
  risks: readonly string[];
  recommendation: string;
  confidence: AgentFindingRecord["confidence"];
  blockedCustomerClaims: readonly string[];
  now?: string;
};

export type AgentMissionFindingSubmissionResult = {
  ok: boolean;
  accepted: boolean;
  executionId: string;
  findingId: string;
  queueState: AgentMissionQueueState | "not-found";
  reasonCodes: readonly string[];
  qualityScoreTotal: number;
  qualityScoreTier: string;
  outputReadiness: string;
  nextOperatingAction: string;
};

export const AGENT_MISSION_FINDING_SUBMISSION_RULES = [
  "Agent finding submissions must target an existing persisted execution record.",
  "Only agents assigned to the mission can submit or replace a finding for that mission.",
  "A submitted finding must include verified facts, source references, assumptions, evidence gaps, risks, recommendation, confidence, and blocked customer claims.",
  "Accepted findings must recompute chief review, release-captain approval posture, quality score, output assembly, queue state, blocked reason codes, and audit trail.",
  "Finding submissions can move a mission toward review, but they cannot approve customer output, release reports, send delivery email, mutate production, or create billing actions.",
  "Submitted fields must remain safe summaries; private payload values, secrets, payment details, provider payloads, prompts, and cross-customer data are not stored here.",
] as const;

export async function submitAgentMissionFinding(input: AgentMissionFindingSubmissionInput): Promise<AgentMissionFindingSubmissionResult> {
  const now = input.now || new Date().toISOString();
  const envelope = await loadAgentMissionExecutionEnvelope();
  const record = envelope.entries.find((entry) => entry.executionId === cleanString(input.executionId, 220));

  if (!record) {
    return {
      ok: false,
      accepted: false,
      executionId: cleanString(input.executionId, 220),
      findingId: "missing-execution-record",
      queueState: "not-found",
      reasonCodes: ["execution-record-not-found"],
      qualityScoreTotal: 0,
      qualityScoreTier: "blocked",
      outputReadiness: "blocked",
      nextOperatingAction: "Create or locate the agent mission execution record before submitting findings.",
    };
  }

  const finding = projectSubmittedFinding(record, input);
  const runtimeWithFinding = { ...record.runtime, findingRecords: replaceFindingForAgent(record.findingRecords, finding) };
  const submission = projectAgentFindingSubmission(runtimeWithFinding, finding);

  if (!submission.accepted) {
    const qualityScore = scoreAgentMissionExecution(runtimeWithFinding, runtimeWithFinding.findingRecords);
    return {
      ok: false,
      accepted: false,
      executionId: record.executionId,
      findingId: finding.findingId,
      queueState: record.queueState,
      reasonCodes: submission.reasonCodes,
      qualityScoreTotal: qualityScore.total,
      qualityScoreTier: qualityScore.tier,
      outputReadiness: record.outputAssembly.readiness,
      nextOperatingAction: "Correct the finding submission before chief-agent review can use it.",
    };
  }

  const updatedRecord = reprojectExecutionRecord(record, runtimeWithFinding.findingRecords, now, `${finding.agentKey} submitted an accepted structured finding.`);
  const updatedEntries = envelope.entries.map((entry) => (entry.executionId === record.executionId ? updatedRecord : entry));
  await saveAgentMissionExecutionEnvelope({ ...envelope, entries: updatedEntries });

  return {
    ok: true,
    accepted: true,
    executionId: updatedRecord.executionId,
    findingId: finding.findingId,
    queueState: updatedRecord.queueState,
    reasonCodes: updatedRecord.blockedReasonCodes,
    qualityScoreTotal: updatedRecord.qualityScore.total,
    qualityScoreTier: updatedRecord.qualityScore.tier,
    outputReadiness: updatedRecord.outputAssembly.readiness,
    nextOperatingAction: updatedRecord.runtime.nextOperatingAction,
  };
}

export function projectAgentMissionFindingSubmissionPreview(record: AgentMissionExecutionRecord, input: Omit<AgentMissionFindingSubmissionInput, "executionId">) {
  const finding = projectSubmittedFinding(record, { ...input, executionId: record.executionId });
  const runtimeWithFinding = { ...record.runtime, findingRecords: replaceFindingForAgent(record.findingRecords, finding) };
  const submission = projectAgentFindingSubmission(runtimeWithFinding, finding);
  const reprojected = submission.accepted ? reprojectExecutionRecord(record, runtimeWithFinding.findingRecords, input.now || new Date().toISOString(), "Previewed accepted structured finding submission.") : record;
  return {
    submission,
    finding,
    queueState: reprojected.queueState,
    qualityScore: reprojected.qualityScore,
    outputAssembly: reprojected.outputAssembly,
    blockedReasonCodes: submission.accepted ? reprojected.blockedReasonCodes : submission.reasonCodes,
  };
}

function reprojectExecutionRecord(record: AgentMissionExecutionRecord, findingRecords: readonly AgentFindingRecord[], now: string, auditSummary: string): AgentMissionExecutionRecord {
  const runtime = { ...record.runtime, findingRecords };
  const chiefReview = projectChiefAgentReview(runtime);
  const captainApproval = projectReleaseCaptainApproval(runtime);
  const qualityScore = scoreAgentMissionExecution(runtime, findingRecords);
  const outputAssembly = projectCustomerOutputAssembly(runtime, captainApproval, qualityScore);
  const queueState = deriveQueueState(runtime, chiefReview, captainApproval, outputAssembly);
  const blockedReasonCodes = [
    ...chiefReview.reasonCodes,
    ...captainApproval.reasonCodes,
    ...(qualityScore.tier === "blocked" || qualityScore.tier === "thin" ? [`quality-score-${qualityScore.tier}`] : []),
    ...outputAssembly.blockedUntil,
    ...runtime.missingMissionInputs.map((field) => `missing-input:${field}`),
  ];

  return {
    ...record,
    updatedAt: now,
    runtime,
    queueState,
    findingRecords,
    chiefReview,
    captainApproval,
    qualityScore,
    outputAssembly,
    blockedReasonCodes,
    auditTrail: [
      ...record.auditTrail,
      {
        eventId: `finding-submitted-${randomUUID()}`,
        eventType: "finding-submitted",
        occurredAt: now,
        actor: "agent",
        safeSummary: auditSummary,
      },
    ],
  };
}

function projectSubmittedFinding(record: AgentMissionExecutionRecord, input: AgentMissionFindingSubmissionInput): AgentFindingRecord {
  const agentKey = cleanString(input.agentKey, 120);
  return {
    findingId: `${record.runtime.missionRecordId}-${agentKey || "unknown-agent"}-submitted`,
    agentKey,
    requiredFields: record.runtime.requiredFindingFields,
    verifiedFacts: cleanStringList(input.verifiedFacts, 280, 8),
    sourceRefs: cleanStringList(input.sourceRefs, 320, 8),
    assumptions: cleanStringList(input.assumptions, 260, 8),
    evidenceGaps: cleanStringList(input.evidenceGaps, 260, 8),
    confidence: normalizeConfidence(input.confidence),
    risks: cleanStringList(input.risks, 260, 8),
    recommendation: cleanString(input.recommendation, 500),
    blockedCustomerClaims: cleanStringList(input.blockedCustomerClaims, 220, 8),
  };
}

function replaceFindingForAgent(findings: readonly AgentFindingRecord[], finding: AgentFindingRecord) {
  const replaced = findings.map((item) => (item.agentKey === finding.agentKey ? finding : item));
  if (replaced.some((item) => item.findingId === finding.findingId)) return replaced;
  return [...replaced, finding];
}

function deriveQueueState(runtime: AgentMissionExecutionRecord["runtime"], chiefReview: AgentMissionExecutionRecord["chiefReview"], captainApproval: AgentMissionExecutionRecord["captainApproval"], outputAssembly: AgentMissionExecutionRecord["outputAssembly"]): AgentMissionQueueState {
  if (runtime.status === "blocked") return "blocked-by-safety";
  if (runtime.missingMissionInputs.length) return "waiting-for-context";
  if (outputAssembly.readiness === "ready-for-delivery-gate") return "customer-output-approved";
  if (captainApproval.state === "waiting") return "captain-review-ready";
  if (chiefReview.consolidatedEvidencePosture === "ready-for-captain") return "chief-review-ready";
  if (runtime.findingRecords.some((finding) => projectAgentFindingSubmission(runtime, finding).accepted)) return "findings-submitted";
  return "queued";
}

function normalizeConfidence(value: AgentFindingRecord["confidence"]): AgentFindingRecord["confidence"] {
  return value === "high" || value === "medium" || value === "low" ? value : "low";
}

function cleanStringList(values: readonly string[], maxLength: number, maxItems: number) {
  return values.map((value) => cleanString(value, maxLength)).filter(Boolean).slice(0, maxItems);
}

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.normalize("NFKC").replace(/<[^>]*>/g, " ").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
}
