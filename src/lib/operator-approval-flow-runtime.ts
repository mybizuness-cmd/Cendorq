import { getOperatorReleaseGateContract, type OperatorReleaseGateStage } from "@/lib/operator-release-gate-contracts";
import type { PresenceReportEvidenceKind } from "@/lib/presence-report-evidence-record-contracts";
import type { PresenceReportEvidenceReadinessResolution } from "@/lib/presence-report-evidence-readiness-runtime";

export type OperatorApprovalFlowState = "release-ready" | "needs-review" | "release-blocked";

export type OperatorApprovalPacket = Readonly<{
  packetId: string;
  requestedStage: OperatorReleaseGateStage;
  evidenceReadiness: readonly PresenceReportEvidenceReadinessResolution[];
  completedChecks: readonly string[];
  approvedOutputs: readonly string[];
  approvalActor: string | null;
  approvalTime: string | null;
  releaseNote: string | null;
}>;

export type OperatorApprovalFlowResolution = Readonly<{
  packetId: string;
  stage: OperatorReleaseGateStage;
  label: string;
  state: OperatorApprovalFlowState;
  requiredChecks: readonly string[];
  missingChecks: readonly string[];
  allowedOutputs: readonly string[];
  blockedOutputs: readonly string[];
  evidenceSummary: Readonly<{
    customerReady: number;
    needsReview: number;
    blocked: number;
  }>;
  nextGate: OperatorReleaseGateStage;
  releaseLogRequired: boolean;
  customerSafeReleaseNote: string | null;
}>;

const OPERATOR_STAGE_ORDER: readonly OperatorReleaseGateStage[] = [
  "command-queue",
  "business-truth-profile",
  "evidence-console",
  "finding-builder",
  "repair-composer",
  "approval-gate",
  "release-log",
] as const;

export function resolveOperatorApprovalFlow(packet: OperatorApprovalPacket): OperatorApprovalFlowResolution {
  const contract = getOperatorReleaseGateContract(packet.requestedStage);
  const evidenceSummary = summarizeEvidence(packet.evidenceReadiness);
  const completedChecks = new Set(packet.completedChecks.map((check) => check.trim()).filter(Boolean));
  const approvedOutputs = new Set(packet.approvedOutputs.map((output) => output.trim()).filter(Boolean));
  const missingChecks = contract.requiredChecks.filter((check) => !completedChecks.has(check));
  const hasBlockedEvidence = evidenceSummary.blocked > 0;
  const hasUnreviewedEvidence = evidenceSummary.needsReview > 0;
  const hasMissingChecks = missingChecks.length > 0;
  const hasReleaseIdentity = Boolean(packet.approvalActor && packet.approvalTime && packet.releaseNote);
  const outputNotAllowed = packet.approvedOutputs.some((output) => !contract.allowedOutputs.includes(output));

  if (hasBlockedEvidence || outputNotAllowed) {
    return buildResolution(packet, contract, "release-blocked", missingChecks, evidenceSummary, "approval-gate", false, null);
  }

  if (hasUnreviewedEvidence || hasMissingChecks) {
    return buildResolution(packet, contract, "needs-review", missingChecks, evidenceSummary, packet.requestedStage, false, null);
  }

  if (packet.requestedStage === "approval-gate" && !hasReleaseIdentity) {
    return buildResolution(packet, contract, "needs-review", ["approval actor", "approval time", "customer-safe release note"], evidenceSummary, "approval-gate", false, null);
  }

  if (packet.requestedStage === "approval-gate") {
    return buildResolution(packet, contract, "release-ready", [], evidenceSummary, "release-log", true, packet.releaseNote);
  }

  if (packet.requestedStage === "release-log") {
    return buildResolution(packet, contract, "release-ready", [], evidenceSummary, "release-log", false, packet.releaseNote);
  }

  return buildResolution(packet, contract, "needs-review", [], evidenceSummary, getNextOperatorStage(packet.requestedStage), false, null);
}

export function getNextOperatorStage(stage: OperatorReleaseGateStage): OperatorReleaseGateStage {
  const currentIndex = OPERATOR_STAGE_ORDER.indexOf(stage);
  return OPERATOR_STAGE_ORDER[Math.min(currentIndex + 1, OPERATOR_STAGE_ORDER.length - 1)] ?? "command-queue";
}

export function getOperatorApprovalRequiredEvidenceKinds(stage: OperatorReleaseGateStage): readonly PresenceReportEvidenceKind[] {
  return getOperatorReleaseGateContract(stage).requiredInputs;
}

function buildResolution(
  packet: OperatorApprovalPacket,
  contract: ReturnType<typeof getOperatorReleaseGateContract>,
  state: OperatorApprovalFlowState,
  missingChecks: readonly string[],
  evidenceSummary: OperatorApprovalFlowResolution["evidenceSummary"],
  nextGate: OperatorReleaseGateStage,
  releaseLogRequired: boolean,
  customerSafeReleaseNote: string | null,
): OperatorApprovalFlowResolution {
  return {
    packetId: packet.packetId,
    stage: packet.requestedStage,
    label: contract.label,
    state,
    requiredChecks: contract.requiredChecks,
    missingChecks,
    allowedOutputs: state === "release-ready" ? contract.allowedOutputs : [],
    blockedOutputs: contract.blockedOutputs,
    evidenceSummary,
    nextGate,
    releaseLogRequired,
    customerSafeReleaseNote: state === "release-ready" ? customerSafeReleaseNote : null,
  } as const;
}

function summarizeEvidence(evidenceReadiness: readonly PresenceReportEvidenceReadinessResolution[]) {
  return {
    customerReady: evidenceReadiness.filter((item) => item.state === "customer-ready").length,
    needsReview: evidenceReadiness.filter((item) => item.state === "needs-review").length,
    blocked: evidenceReadiness.filter((item) => item.state === "blocked").length,
  } as const;
}
