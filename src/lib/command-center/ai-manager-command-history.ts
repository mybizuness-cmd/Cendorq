export type AiManagerCommandHistoryEvent =
  | "command queued"
  | "context checked"
  | "output generated"
  | "self-review completed"
  | "operator review requested"
  | "approved"
  | "blocked"
  | "archived";

export type AiManagerCommandHistoryPolicy = {
  label: string;
  requiredFields: readonly string[];
  reviewFields: readonly string[];
  blockedReasonTypes: readonly string[];
  retentionStates: readonly string[];
  auditEvents: readonly AiManagerCommandHistoryEvent[];
};

export const AI_MANAGER_COMMAND_HISTORY_POLICY: AiManagerCommandHistoryPolicy = {
  label: "AI Manager Command History",
  requiredFields: [
    "command id",
    "command type",
    "requested by",
    "requested at",
    "record class",
    "source record reference",
    "model version label",
    "prompt policy version",
    "evaluation policy version",
    "approval state",
  ],
  reviewFields: [
    "required context summary",
    "guardrail checklist",
    "unsupported claim count",
    "uncertainty count",
    "private note exclusion check",
    "customer-safe language check",
    "reviewer note",
    "final decision",
  ],
  blockedReasonTypes: [
    "missing context",
    "missing evidence",
    "unsupported claim",
    "private note exposure risk",
    "plan scope mismatch",
    "record class mismatch",
    "delivery approval missing",
    "operator rejection",
  ],
  retentionStates: ["active", "reviewed", "archived", "retained for audit"],
  auditEvents: [
    "command queued",
    "context checked",
    "output generated",
    "self-review completed",
    "operator review requested",
    "approved",
    "blocked",
    "archived",
  ],
};

export function getAiManagerCommandHistoryPolicy() {
  return AI_MANAGER_COMMAND_HISTORY_POLICY;
}
