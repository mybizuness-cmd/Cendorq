import { resolveOperatorTerminalServerAccess, type OperatorTerminalServerAccessInput, type OperatorTerminalServerAccessResolution, type OperatorTerminalServerAccessState } from "@/lib/operator-terminal-server-access-gate";

export type OperatorTerminalAccessMatrixScenario = Readonly<{
  id: string;
  label: string;
  input: OperatorTerminalServerAccessInput;
  expectedState: OperatorTerminalServerAccessState;
  expectedTerminalVisible: boolean;
  expectedPacketReviewAllowed: boolean;
  expectedApprovalAllowed: boolean;
}>;

export type OperatorTerminalAccessMatrixResult = Readonly<{
  scenario: OperatorTerminalAccessMatrixScenario;
  resolution: OperatorTerminalServerAccessResolution;
  passed: boolean;
  mismatches: readonly string[];
}>;

export type OperatorTerminalAccessMatrixSummary = Readonly<{
  total: number;
  passed: number;
  failed: number;
  granted: number;
  limited: number;
  denied: number;
}>;

export const OPERATOR_TERMINAL_ACCESS_MATRIX_SCENARIOS: readonly OperatorTerminalAccessMatrixScenario[] = [
  {
    id: "owner-review-packet-granted",
    label: "Owner can review packets after every server gate passes.",
    input: {
      role: "owner",
      serverVerifiedIdentity: true,
      sessionBoundToServer: true,
      acceptedInternalBoundary: true,
      requestedAction: "review-packet",
    },
    expectedState: "access-granted",
    expectedTerminalVisible: true,
    expectedPacketReviewAllowed: true,
    expectedApprovalAllowed: true,
  },
  {
    id: "operator-approve-release-granted",
    label: "Operator can approve candidates after every server gate passes.",
    input: {
      role: "operator",
      serverVerifiedIdentity: true,
      sessionBoundToServer: true,
      acceptedInternalBoundary: true,
      requestedAction: "approve-release",
    },
    expectedState: "access-granted",
    expectedTerminalVisible: true,
    expectedPacketReviewAllowed: true,
    expectedApprovalAllowed: true,
  },
  {
    id: "support-approve-release-limited",
    label: "Support may review packets but cannot approve release candidates.",
    input: {
      role: "support",
      serverVerifiedIdentity: true,
      sessionBoundToServer: true,
      acceptedInternalBoundary: true,
      requestedAction: "approve-release",
    },
    expectedState: "access-limited",
    expectedTerminalVisible: true,
    expectedPacketReviewAllowed: true,
    expectedApprovalAllowed: false,
  },
  {
    id: "customer-view-terminal-denied",
    label: "Customer role cannot view the operator terminal.",
    input: {
      role: "customer",
      serverVerifiedIdentity: true,
      sessionBoundToServer: true,
      acceptedInternalBoundary: true,
      requestedAction: "view-terminal",
    },
    expectedState: "access-denied",
    expectedTerminalVisible: false,
    expectedPacketReviewAllowed: false,
    expectedApprovalAllowed: false,
  },
  {
    id: "anonymous-view-terminal-denied",
    label: "Anonymous visitor cannot view the operator terminal.",
    input: {
      role: "anonymous",
      serverVerifiedIdentity: false,
      sessionBoundToServer: false,
      acceptedInternalBoundary: false,
      requestedAction: "view-terminal",
    },
    expectedState: "access-denied",
    expectedTerminalVisible: false,
    expectedPacketReviewAllowed: false,
    expectedApprovalAllowed: false,
  },
  {
    id: "operator-release-execution-denied",
    label: "Operator cannot run release execution from this layer.",
    input: {
      role: "operator",
      serverVerifiedIdentity: true,
      sessionBoundToServer: true,
      acceptedInternalBoundary: true,
      requestedAction: "execute-release",
    },
    expectedState: "access-denied",
    expectedTerminalVisible: true,
    expectedPacketReviewAllowed: true,
    expectedApprovalAllowed: true,
  },
  {
    id: "owner-provider-access-denied",
    label: "Owner cannot open provider access from this layer.",
    input: {
      role: "owner",
      serverVerifiedIdentity: true,
      sessionBoundToServer: true,
      acceptedInternalBoundary: true,
      requestedAction: "open-provider-access",
    },
    expectedState: "access-denied",
    expectedTerminalVisible: true,
    expectedPacketReviewAllowed: true,
    expectedApprovalAllowed: true,
  },
  {
    id: "operator-missing-server-bound-session-limited",
    label: "Operator is limited until the session is server-bound.",
    input: {
      role: "operator",
      serverVerifiedIdentity: true,
      sessionBoundToServer: false,
      acceptedInternalBoundary: true,
      requestedAction: "review-packet",
    },
    expectedState: "access-limited",
    expectedTerminalVisible: true,
    expectedPacketReviewAllowed: false,
    expectedApprovalAllowed: false,
  },
] as const;

export function resolveOperatorTerminalAccessMatrix(scenarios: readonly OperatorTerminalAccessMatrixScenario[] = OPERATOR_TERMINAL_ACCESS_MATRIX_SCENARIOS) {
  return scenarios.map(resolveOperatorTerminalAccessMatrixScenario);
}

export function resolveOperatorTerminalAccessMatrixScenario(scenario: OperatorTerminalAccessMatrixScenario): OperatorTerminalAccessMatrixResult {
  const resolution = resolveOperatorTerminalServerAccess(scenario.input);
  const mismatches = [
    resolution.state === scenario.expectedState ? null : `state expected ${scenario.expectedState} but got ${resolution.state}`,
    resolution.terminalVisible === scenario.expectedTerminalVisible ? null : `terminalVisible expected ${scenario.expectedTerminalVisible} but got ${resolution.terminalVisible}`,
    resolution.packetReviewAllowed === scenario.expectedPacketReviewAllowed ? null : `packetReviewAllowed expected ${scenario.expectedPacketReviewAllowed} but got ${resolution.packetReviewAllowed}`,
    resolution.approvalAllowed === scenario.expectedApprovalAllowed ? null : `approvalAllowed expected ${scenario.expectedApprovalAllowed} but got ${resolution.approvalAllowed}`,
    resolution.releaseExecutionAllowed === false ? null : "releaseExecutionAllowed must remain false",
    resolution.providerAccessAllowed === false ? null : "providerAccessAllowed must remain false",
  ].filter(Boolean) as string[];

  return {
    scenario,
    resolution,
    passed: mismatches.length === 0,
    mismatches,
  } as const;
}

export function summarizeOperatorTerminalAccessMatrix(results: readonly OperatorTerminalAccessMatrixResult[]): OperatorTerminalAccessMatrixSummary {
  return {
    total: results.length,
    passed: results.filter((result) => result.passed).length,
    failed: results.filter((result) => !result.passed).length,
    granted: results.filter((result) => result.resolution.state === "access-granted").length,
    limited: results.filter((result) => result.resolution.state === "access-limited").length,
    denied: results.filter((result) => result.resolution.state === "access-denied").length,
  } as const;
}
