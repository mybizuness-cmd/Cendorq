export type OperatorTerminalAccessSafetyMode = "sample-only" | "server-gated";

export type OperatorTerminalAccessSafetyResolution = Readonly<{
  mode: OperatorTerminalAccessSafetyMode;
  label: string;
  operatorOnly: true;
  customerFacingAllowed: false;
  liveCustomerDataAllowed: false;
  releaseExecutionAllowed: false;
  providerAccessAllowed: false;
  requiredGateBeforeProduction: string;
  banner: string;
  disabledActions: readonly string[];
  allowedSampleActions: readonly string[];
}>;

export const OPERATOR_TERMINAL_ACCESS_SAFETY: OperatorTerminalAccessSafetyResolution = {
  mode: "sample-only",
  label: "Internal sample-only operator terminal",
  operatorOnly: true,
  customerFacingAllowed: false,
  liveCustomerDataAllowed: false,
  releaseExecutionAllowed: false,
  providerAccessAllowed: false,
  requiredGateBeforeProduction: "server-owned operator identity and access gate",
  banner: "Sample-only operator view. Do not use for live customer records, provider access, or release execution until server-owned access gating is installed.",
  disabledActions: [
    "execute release",
    "modify live customer records",
    "open provider access",
    "publish customer-facing terminal",
    "send approval email",
  ],
  allowedSampleActions: [
    "review sample packet state",
    "inspect evidence readiness counts",
    "read operator notices",
    "plan safe next action",
  ],
} as const;

export function getOperatorTerminalAccessSafety() {
  return OPERATOR_TERMINAL_ACCESS_SAFETY;
}

export function isOperatorTerminalReleaseExecutionAllowed() {
  return OPERATOR_TERMINAL_ACCESS_SAFETY.releaseExecutionAllowed;
}
