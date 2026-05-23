import type { OperatorApprovalFlowState } from "@/lib/operator-approval-flow-runtime";
import type { OperatorReleaseGateStage } from "@/lib/operator-release-gate-contracts";

export type OperatorTerminalLaneId =
  | "command-queue"
  | "business-truth-profile"
  | "evidence-console"
  | "finding-builder"
  | "repair-composer"
  | "approval-gate"
  | "release-log";

export type OperatorTerminalLane = Readonly<{
  id: OperatorTerminalLaneId;
  label: string;
  stage: OperatorReleaseGateStage;
  purpose: string;
  primaryCommand: string;
  guardedOutput: string;
}>;

export type OperatorTerminalPacket = Readonly<{
  id: string;
  business: string;
  lane: OperatorTerminalLaneId;
  state: OperatorApprovalFlowState;
  nextGate: OperatorReleaseGateStage;
  evidenceReady: number;
  needsReview: number;
  blocked: number;
  safeNextAction: string;
}>;

export const OPERATOR_TERMINAL_LANES: readonly OperatorTerminalLane[] = [
  {
    id: "command-queue",
    label: "Command Queue",
    stage: "command-queue",
    purpose: "Prioritize scans, reports, and repairs before anything customer-facing changes.",
    primaryCommand: "Open highest-risk packet",
    guardedOutput: "review task",
  },
  {
    id: "business-truth-profile",
    label: "Business Truth Profile",
    stage: "business-truth-profile",
    purpose: "Separate approved customer facts from restricted claims before findings or repairs are written.",
    primaryCommand: "Resolve fact boundaries",
    guardedOutput: "customer-safe profile summary",
  },
  {
    id: "evidence-console",
    label: "Evidence Console",
    stage: "evidence-console",
    purpose: "Normalize public, comparison, and proof signals into reviewed evidence with labels, limitations, and confidence.",
    primaryCommand: "Review evidence readiness",
    guardedOutput: "approved evidence summary",
  },
  {
    id: "finding-builder",
    label: "Finding Builder",
    stage: "finding-builder",
    purpose: "Turn reviewed evidence into a customer-safe finding with weak point, proof, limitation, and confidence.",
    primaryCommand: "Draft bounded finding",
    guardedOutput: "customer-safe finding",
  },
  {
    id: "repair-composer",
    label: "Repair Composer",
    stage: "repair-composer",
    purpose: "Translate approved findings into scoped repairs for public business signals without overreaching the evidence.",
    primaryCommand: "Compose repair scope",
    guardedOutput: "approved repair queue",
  },
  {
    id: "approval-gate",
    label: "Approval Gate",
    stage: "approval-gate",
    purpose: "Approve only customer-safe findings, packages, and repairs after review state and sensitivity checks pass.",
    primaryCommand: "Approve or block release",
    guardedOutput: "released Presence Report package",
  },
  {
    id: "release-log",
    label: "Release Log",
    stage: "release-log",
    purpose: "Record what was released, why it was safe, which evidence supported it, and how it can be audited or rolled back.",
    primaryCommand: "Write release record",
    guardedOutput: "audit entry",
  },
] as const;

export const OPERATOR_TERMINAL_SAMPLE_PACKETS: readonly OperatorTerminalPacket[] = [
  {
    id: "packet-sandwork-free-scan",
    business: "Sandwork Demo Presence Report",
    lane: "evidence-console",
    state: "needs-review",
    nextGate: "evidence-console",
    evidenceReady: 3,
    needsReview: 2,
    blocked: 0,
    safeNextAction: "Review confidence labels before finding builder.",
  },
  {
    id: "packet-choice-gap-repair",
    business: "Choice Gap Repair Queue",
    lane: "repair-composer",
    state: "needs-review",
    nextGate: "repair-composer",
    evidenceReady: 4,
    needsReview: 1,
    blocked: 0,
    safeNextAction: "Scope repair without outcome promises.",
  },
  {
    id: "packet-release-approval",
    business: "Released Report Candidate",
    lane: "approval-gate",
    state: "release-blocked",
    nextGate: "approval-gate",
    evidenceReady: 5,
    needsReview: 0,
    blocked: 1,
    safeNextAction: "Remove blocked evidence before release log.",
  },
  {
    id: "packet-release-log-ready",
    business: "Customer-safe Release Log Candidate",
    lane: "release-log",
    state: "release-ready",
    nextGate: "release-log",
    evidenceReady: 6,
    needsReview: 0,
    blocked: 0,
    safeNextAction: "Write release record before customer visibility changes.",
  },
] as const;

export function getOperatorTerminalLanes() {
  return OPERATOR_TERMINAL_LANES;
}

export function getOperatorTerminalLane(id: OperatorTerminalLaneId) {
  return OPERATOR_TERMINAL_LANES.find((lane) => lane.id === id) ?? OPERATOR_TERMINAL_LANES[0];
}

export function getOperatorTerminalSamplePackets() {
  return OPERATOR_TERMINAL_SAMPLE_PACKETS;
}
