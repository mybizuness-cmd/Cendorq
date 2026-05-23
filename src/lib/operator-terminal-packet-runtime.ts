import { resolveOperatorApprovalFlow, type OperatorApprovalPacket, type OperatorApprovalFlowResolution } from "@/lib/operator-approval-flow-runtime";
import type { OperatorTerminalPacket } from "@/lib/operator-terminal-foundation";
import type { PresenceReportEvidenceReadinessResolution } from "@/lib/presence-report-evidence-readiness-runtime";

export type OperatorTerminalPacketRuntimeInput = Readonly<{
  packet: OperatorTerminalPacket;
  completedChecks: readonly string[];
  approvedOutputs: readonly string[];
  approvalActor: string | null;
  approvalTime: string | null;
  releaseNote: string | null;
}>;

export type OperatorTerminalPacketRuntimeResolution = Readonly<{
  terminalPacket: OperatorTerminalPacket;
  approvalPacket: OperatorApprovalPacket;
  approvalResolution: OperatorApprovalFlowResolution;
  visibleState: OperatorTerminalPacket["state"];
  operatorNotice: string;
  safeNextAction: string;
}>;

export function resolveOperatorTerminalPacketRuntime(input: OperatorTerminalPacketRuntimeInput): OperatorTerminalPacketRuntimeResolution {
  const approvalPacket = toOperatorApprovalPacket(input);
  const approvalResolution = resolveOperatorApprovalFlow(approvalPacket);

  return {
    terminalPacket: input.packet,
    approvalPacket,
    approvalResolution,
    visibleState: approvalResolution.state,
    operatorNotice: getOperatorNotice(approvalResolution),
    safeNextAction: getSafeNextAction(input.packet, approvalResolution),
  } as const;
}

export function resolveOperatorTerminalPacketRuntimeBatch(inputs: readonly OperatorTerminalPacketRuntimeInput[]) {
  const packets = inputs.map(resolveOperatorTerminalPacketRuntime);
  return {
    packets,
    releaseReady: packets.filter((item) => item.visibleState === "release-ready"),
    needsReview: packets.filter((item) => item.visibleState === "needs-review"),
    releaseBlocked: packets.filter((item) => item.visibleState === "release-blocked"),
  } as const;
}

export function toOperatorApprovalPacket(input: OperatorTerminalPacketRuntimeInput): OperatorApprovalPacket {
  return {
    packetId: input.packet.id,
    requestedStage: input.packet.nextGate,
    evidenceReadiness: buildEvidenceReadinessFromCounts(input.packet),
    completedChecks: input.completedChecks,
    approvedOutputs: input.approvedOutputs,
    approvalActor: input.approvalActor,
    approvalTime: input.approvalTime,
    releaseNote: input.releaseNote,
  } as const;
}

function buildEvidenceReadinessFromCounts(packet: OperatorTerminalPacket): PresenceReportEvidenceReadinessResolution[] {
  return [
    ...Array.from({ length: packet.evidenceReady }, (_, index) => buildEvidenceReadiness(packet.id, "customer-ready", index)),
    ...Array.from({ length: packet.needsReview }, (_, index) => buildEvidenceReadiness(packet.id, "needs-review", index)),
    ...Array.from({ length: packet.blocked }, (_, index) => buildEvidenceReadiness(packet.id, "blocked", index)),
  ];
}

function buildEvidenceReadiness(packetId: string, state: PresenceReportEvidenceReadinessResolution["state"], index: number): PresenceReportEvidenceReadinessResolution {
  return {
    kind: state === "customer-ready" ? "visible-public-signal" : "operator-note",
    label: `${packetId}-${state}-${index + 1}`,
    state,
    mayFeed: state === "customer-ready" ? ["finding-builder", "repair-composer", "approval-gate"] : [],
    customerSafeSummary: state === "customer-ready" ? "Sample customer-safe evidence summary." : null,
    confidenceLabel: state === "customer-ready" ? "sample-confidence" : null,
    limitation: state === "customer-ready" ? "Sample-only terminal packet projection." : null,
    missingSignals: state === "needs-review" ? ["confidence label"] : [],
    blockedReasons: state === "blocked" ? ["blocked by sample terminal packet count"] : [],
    nextGate: state === "customer-ready" ? "package-resolution" : "approval-gate",
  } as const;
}

function getOperatorNotice(resolution: OperatorApprovalFlowResolution) {
  if (resolution.state === "release-ready") return "Packet can move to release log after the required approval record is complete.";
  if (resolution.state === "release-blocked") return "Packet cannot release until blocked evidence or unsupported output is removed.";
  if (resolution.missingChecks.length) return `Packet still needs checks: ${resolution.missingChecks.join(", ")}.`;
  return "Packet still needs operator review before release.";
}

function getSafeNextAction(packet: OperatorTerminalPacket, resolution: OperatorApprovalFlowResolution) {
  if (resolution.state === "release-ready") return "Write release log before customer visibility changes.";
  if (resolution.state === "release-blocked") return "Keep packet blocked and remove unsafe evidence before retrying approval.";
  return packet.safeNextAction;
}
