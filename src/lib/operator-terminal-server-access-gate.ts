import { getOperatorTerminalAccessSafety } from "@/lib/operator-terminal-access-safety";

export type OperatorTerminalServerAccessRole = "owner" | "operator" | "support" | "customer" | "anonymous";
export type OperatorTerminalServerAccessState = "access-granted" | "access-limited" | "access-denied";

export type OperatorTerminalServerAccessInput = Readonly<{
  role: OperatorTerminalServerAccessRole;
  serverVerifiedIdentity: boolean;
  sessionBoundToServer: boolean;
  acceptedInternalBoundary: boolean;
  requestedAction: "view-terminal" | "review-packet" | "approve-release" | "execute-release" | "open-provider-access";
}>;

export type OperatorTerminalServerAccessResolution = Readonly<{
  state: OperatorTerminalServerAccessState;
  role: OperatorTerminalServerAccessRole;
  requestedAction: OperatorTerminalServerAccessInput["requestedAction"];
  terminalVisible: boolean;
  packetReviewAllowed: boolean;
  approvalAllowed: boolean;
  releaseExecutionAllowed: false;
  providerAccessAllowed: false;
  reason: string;
  missingGates: readonly string[];
  disabledActions: readonly string[];
  safetyBanner: string;
}>;

const INTERNAL_ROLES: readonly OperatorTerminalServerAccessRole[] = ["owner", "operator", "support"] as const;
const APPROVAL_ROLES: readonly OperatorTerminalServerAccessRole[] = ["owner", "operator"] as const;

export function resolveOperatorTerminalServerAccess(input: OperatorTerminalServerAccessInput): OperatorTerminalServerAccessResolution {
  const safety = getOperatorTerminalAccessSafety();
  const missingGates = getMissingGates(input);
  const isInternalRole = INTERNAL_ROLES.includes(input.role);
  const canApprove = APPROVAL_ROLES.includes(input.role);

  if (!isInternalRole) {
    return buildResolution(input, "access-denied", false, false, false, "Only server-verified internal roles may view the operator terminal.", missingGates);
  }

  if (missingGates.length) {
    return buildResolution(input, "access-limited", true, false, false, "Internal role detected, but server-owned access gates are incomplete.", missingGates);
  }

  if (input.requestedAction === "execute-release" || input.requestedAction === "open-provider-access") {
    return buildResolution(input, "access-denied", true, true, canApprove, "Release execution and provider access remain disabled until a later audited release layer.", []);
  }

  if (input.requestedAction === "approve-release" && !canApprove) {
    return buildResolution(input, "access-limited", true, true, false, "Support role may review packets but cannot approve release candidates.", []);
  }

  return buildResolution(input, "access-granted", true, true, canApprove, "Server-owned access gates passed for this internal operator terminal action.", []);

  function buildResolution(
    source: OperatorTerminalServerAccessInput,
    state: OperatorTerminalServerAccessState,
    terminalVisible: boolean,
    packetReviewAllowed: boolean,
    approvalAllowed: boolean,
    reason: string,
    gates: readonly string[],
  ): OperatorTerminalServerAccessResolution {
    return {
      state,
      role: source.role,
      requestedAction: source.requestedAction,
      terminalVisible,
      packetReviewAllowed,
      approvalAllowed,
      releaseExecutionAllowed: false,
      providerAccessAllowed: false,
      reason,
      missingGates: gates,
      disabledActions: safety.disabledActions,
      safetyBanner: safety.banner,
    } as const;
  }
}

function getMissingGates(input: OperatorTerminalServerAccessInput) {
  const gates: string[] = [];
  if (!input.serverVerifiedIdentity) gates.push("server-verified identity");
  if (!input.sessionBoundToServer) gates.push("server-bound session");
  if (!input.acceptedInternalBoundary) gates.push("accepted internal boundary");
  return gates;
}
