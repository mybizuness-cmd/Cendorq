import type { AgentFindingRecord } from "@/lib/agent-mission-operating-engine";
import {
  getAgentMissionRecordsRuntime,
  type AgentMissionRuntimeRecord,
  type AgentMissionReviewState,
} from "@/lib/agent-mission-records-runtime";

export type AgentFindingSubmissionProjection = {
  findingId: string;
  missionRecordId: string;
  agentKey: string;
  accepted: boolean;
  reasonCodes: readonly string[];
  verifiedFactCount: number;
  sourceRefCount: number;
  assumptionCount: number;
  evidenceGapCount: number;
  riskCount: number;
  blockedClaimCount: number;
  confidence: AgentFindingRecord["confidence"];
  safeForChiefReview: boolean;
  customerFacingUseAllowed: false;
};

export type ChiefAgentReviewProjection = {
  missionRecordId: string;
  chiefAgentKey: string;
  state: AgentMissionReviewState;
  acceptedFindingCount: number;
  requiredFindingCount: number;
  reasonCodes: readonly string[];
  consolidatedEvidencePosture: "ready-for-captain" | "needs-more-agent-work" | "blocked";
  requiredBeforeCaptainReview: readonly string[];
  customerFacingUseAllowed: false;
};

export type ReleaseCaptainApprovalProjection = {
  missionRecordId: string;
  releaseGate: string;
  state: AgentMissionReviewState;
  reasonCodes: readonly string[];
  customerSafeOutputPosture: "approved" | "not-ready" | "rejected";
  approvedOutputTypes: readonly string[];
  blockedOutputClaims: readonly string[];
  customerFacingOutputAllowed: boolean;
  productionMutationAllowed: boolean;
  billingActionAllowed: boolean;
  deliveryEmailAllowed: boolean;
  reportReleaseAllowed: boolean;
};

export const AGENT_MISSION_REVIEW_GATES_RUNTIME_RULES = [
  "Every finding submission must be rejected unless it includes verified facts, source references, assumptions, evidence gaps, risks, a recommendation, confidence, and blocked customer claims.",
  "Agent findings can become safe for chief-agent review, but they can never become customer-facing output by themselves.",
  "Chief-agent review can consolidate findings and request captain review, but it cannot approve customer-facing report, fix, monitoring alert, paid recommendation, code, billing, provider action, delivery email, or production mutation.",
  "Release-captain approval is the only gate that can approve customer-safe output posture, and it must keep output plan-scoped with blocked claims removed or safely limited.",
  "Release-captain approval must still keep production mutation, billing action, delivery email, and report release blocked unless the matching delivery system, output approval system, and plan boundary gates also pass.",
  "Review gates must preserve source references, evidence gaps, assumptions, confidence, risks, and blocked customer claims as first-class data.",
] as const;

export function projectAgentFindingSubmission(record: AgentMissionRuntimeRecord, finding: AgentFindingRecord): AgentFindingSubmissionProjection {
  const reasonCodes = deriveFindingReasonCodes(record, finding);
  const accepted = reasonCodes.length === 0;

  return {
    findingId: finding.findingId,
    missionRecordId: record.missionRecordId,
    agentKey: finding.agentKey,
    accepted,
    reasonCodes,
    verifiedFactCount: finding.verifiedFacts.length,
    sourceRefCount: finding.sourceRefs.length,
    assumptionCount: finding.assumptions.length,
    evidenceGapCount: finding.evidenceGaps.length,
    riskCount: finding.risks.length,
    blockedClaimCount: finding.blockedCustomerClaims.length,
    confidence: finding.confidence,
    safeForChiefReview: accepted,
    customerFacingUseAllowed: false,
  };
}

export function projectChiefAgentReview(record: AgentMissionRuntimeRecord): ChiefAgentReviewProjection {
  const submissions = record.findingRecords.map((finding) => projectAgentFindingSubmission(record, finding));
  const acceptedFindingCount = submissions.filter((submission) => submission.accepted).length;
  const reasonCodes = deriveChiefReviewReasonCodes(record, acceptedFindingCount);
  const blocked = record.status === "blocked" || reasonCodes.includes("mission-blocked-by-safety");

  return {
    missionRecordId: record.missionRecordId,
    chiefAgentKey: record.assignedChiefAgent,
    state: reasonCodes.length ? "not-ready" : "waiting",
    acceptedFindingCount,
    requiredFindingCount: record.assignedAgentKeys.length,
    reasonCodes,
    consolidatedEvidencePosture: blocked ? "blocked" : reasonCodes.length ? "needs-more-agent-work" : "ready-for-captain",
    requiredBeforeCaptainReview: record.chiefAgentReview.requiredBeforeCaptainReview,
    customerFacingUseAllowed: false,
  };
}

export function projectReleaseCaptainApproval(record: AgentMissionRuntimeRecord): ReleaseCaptainApprovalProjection {
  const chiefReview = projectChiefAgentReview(record);
  const reasonCodes = deriveCaptainApprovalReasonCodes(record, chiefReview);
  const ready = reasonCodes.length === 0;

  return {
    missionRecordId: record.missionRecordId,
    releaseGate: record.releaseCaptainReview.gate,
    state: ready ? "waiting" : "not-ready",
    reasonCodes,
    customerSafeOutputPosture: ready ? "approved" : record.status === "blocked" ? "rejected" : "not-ready",
    approvedOutputTypes: ready ? approvedOutputTypesForMission(record) : [],
    blockedOutputClaims: record.blockedOutputClaims,
    customerFacingOutputAllowed: ready,
    productionMutationAllowed: false,
    billingActionAllowed: false,
    deliveryEmailAllowed: false,
    reportReleaseAllowed: false,
  };
}

export function projectAgentMissionReviewGateIndex() {
  const runtime = getAgentMissionRecordsRuntime();
  return runtime.records.map((record) => ({
    record,
    findingSubmissions: record.findingRecords.map((finding) => projectAgentFindingSubmission(record, finding)),
    chiefReview: projectChiefAgentReview(record),
    captainApproval: projectReleaseCaptainApproval(record),
  }));
}

export function getAgentMissionReviewGatesRuntime() {
  return {
    rules: AGENT_MISSION_REVIEW_GATES_RUNTIME_RULES,
    reviews: projectAgentMissionReviewGateIndex(),
  };
}

function deriveFindingReasonCodes(record: AgentMissionRuntimeRecord, finding: AgentFindingRecord) {
  const reasons: string[] = [];
  if (!record.assignedAgentKeys.includes(finding.agentKey)) reasons.push("agent-not-assigned-to-mission");
  if (!finding.verifiedFacts.length) reasons.push("verified-facts-missing");
  if (!finding.sourceRefs.length) reasons.push("source-refs-missing");
  if (!finding.assumptions.length) reasons.push("assumptions-missing");
  if (!finding.evidenceGaps.length) reasons.push("evidence-gaps-missing");
  if (!finding.risks.length) reasons.push("risks-missing");
  if (!finding.recommendation.trim()) reasons.push("recommendation-missing");
  if (!finding.blockedCustomerClaims.length) reasons.push("blocked-customer-claims-missing");
  if (finding.confidence === "high" && (finding.sourceRefs.length < 2 || finding.evidenceGaps.length > 0)) reasons.push("high-confidence-not-supported");
  return reasons;
}

function deriveChiefReviewReasonCodes(record: AgentMissionRuntimeRecord, acceptedFindingCount: number) {
  const reasons: string[] = [];
  if (record.status === "blocked") reasons.push("mission-blocked-by-safety");
  if (record.missingMissionInputs.length) reasons.push("mission-inputs-missing");
  if (acceptedFindingCount < record.assignedAgentKeys.length) reasons.push("assigned-agent-findings-not-accepted");
  if (!record.findingRecords.length) reasons.push("finding-records-missing");
  if (!record.intakeRecordKey || record.intakeRecordKey.includes("pending")) reasons.push("intake-record-not-attached");
  return reasons;
}

function deriveCaptainApprovalReasonCodes(record: AgentMissionRuntimeRecord, chiefReview: ChiefAgentReviewProjection) {
  const reasons: string[] = [];
  if (chiefReview.consolidatedEvidencePosture !== "ready-for-captain") reasons.push("chief-review-not-ready-for-captain");
  if (record.blockedOutputClaims.length) reasons.push("blocked-output-claims-require-safe-limitation");
  if (!record.releaseCaptainReview.requiredBeforeCustomerOutput.length) reasons.push("captain-output-requirements-missing");
  if (record.status !== "ready" && record.status !== "in-review") reasons.push("mission-not-ready-for-customer-output");
  return reasons;
}

function approvedOutputTypesForMission(record: AgentMissionRuntimeRecord) {
  if (record.planKey === "free-scan") return ["dashboard-only Free Scan result"];
  if (record.planKey === "deep-review") return ["Deep Review report draft for delivery gate"];
  if (record.planKey === "build-fix") return ["Build Fix scoped output draft for customer-output approval"];
  return ["Ongoing Control monthly summary draft for delivery gate"];
}
