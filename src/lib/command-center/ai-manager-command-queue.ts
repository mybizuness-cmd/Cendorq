export type AiManagerCommandType =
  | "draft-report-section"
  | "review-report-claim"
  | "compare-benchmark"
  | "run-synthetic-test"
  | "summarize-intake"
  | "recommend-next-action"
  | "prepare-customer-output"
  | "review-monthly-progress";

export type AiManagerCommandState = "queued" | "running" | "needs-review" | "approved" | "blocked" | "archived";

export type AiManagerCommandPolicy = {
  commandType: AiManagerCommandType;
  label: string;
  defaultState: AiManagerCommandState;
  allowedInputClasses: readonly string[];
  requiredContext: readonly string[];
  requiredGuards: readonly string[];
  blockedActions: readonly string[];
  outputReviewGates: readonly string[];
  auditEvents: readonly string[];
};

export const AI_MANAGER_COMMAND_POLICIES = [
  {
    commandType: "draft-report-section",
    label: "Draft Report Section",
    defaultState: "queued",
    allowedInputClasses: ["live-customer", "synthetic-test", "regression-test"],
    requiredContext: ["plan scope", "report section", "evidence links", "method label"],
    requiredGuards: ["no unsupported claims", "private notes excluded", "customer-safe language", "operator review"],
    blockedActions: ["send output", "change live record", "approve own draft", "invent evidence"],
    outputReviewGates: ["truth review", "evidence review", "customer-safe language review"],
    auditEvents: ["command queued", "draft generated", "review requested", "approved or blocked"],
  },
  {
    commandType: "review-report-claim",
    label: "Review Report Claim",
    defaultState: "queued",
    allowedInputClasses: ["live-customer", "synthetic-test", "regression-test"],
    requiredContext: ["claim text", "source evidence", "method label", "customer output type"],
    requiredGuards: ["evidence match check", "uncertainty marking", "unsupported claim flag", "operator review"],
    blockedActions: ["mark unsupported claim as true", "send output", "remove audit trail"],
    outputReviewGates: ["evidence review", "truth review", "methodology review"],
    auditEvents: ["command queued", "claim checked", "unsupported count recorded", "review completed"],
  },
  {
    commandType: "compare-benchmark",
    label: "Compare Against Benchmarks",
    defaultState: "queued",
    allowedInputClasses: ["live-customer", "synthetic-test", "regression-test"],
    requiredContext: ["business category", "benchmark set", "source observations", "comparison areas"],
    requiredGuards: ["approved benchmark only", "benchmark not used as proof by itself", "category fit check", "operator review"],
    blockedActions: ["copy benchmark private notes", "send output", "treat benchmark as customer record"],
    outputReviewGates: ["benchmark evidence review", "customer-safe summary review", "truth review"],
    auditEvents: ["command queued", "benchmark compared", "pattern summary generated", "review completed"],
  },
  {
    commandType: "run-synthetic-test",
    label: "Run Synthetic Test",
    defaultState: "queued",
    allowedInputClasses: ["synthetic-test", "regression-test"],
    requiredContext: ["test purpose", "record class", "expected output", "evaluation policy"],
    requiredGuards: ["test record separation", "no customer delivery", "no revenue counting", "result review"],
    blockedActions: ["send output", "convert to live customer without approval", "count as customer progress"],
    outputReviewGates: ["test result review", "regression comparison", "operator approval"],
    auditEvents: ["command queued", "test executed", "result recorded", "review completed"],
  },
  {
    commandType: "summarize-intake",
    label: "Summarize Intake",
    defaultState: "queued",
    allowedInputClasses: ["live-customer", "synthetic-test"],
    requiredContext: ["intake submission", "business category", "plan context", "source fields"],
    requiredGuards: ["missing context flag", "private data boundary", "customer-safe summary", "operator review"],
    blockedActions: ["send output", "change score", "create customer record without approval"],
    outputReviewGates: ["intake review", "score-tier review", "customer-safe language review"],
    auditEvents: ["command queued", "intake summarized", "missing context flagged", "review completed"],
  },
  {
    commandType: "recommend-next-action",
    label: "Recommend Next Action",
    defaultState: "queued",
    allowedInputClasses: ["live-customer", "synthetic-test", "regression-test"],
    requiredContext: ["plan scope", "evidence links", "optimization method", "current state"],
    requiredGuards: ["plan scope match", "evidence link required", "method library match", "operator review"],
    blockedActions: ["guarantee results", "recommend outside plan scope", "send output", "change task status"],
    outputReviewGates: ["optimization proof review", "scope review", "customer-safe language review"],
    auditEvents: ["command queued", "recommendation drafted", "proof checked", "review completed"],
  },
  {
    commandType: "prepare-customer-output",
    label: "Prepare Customer Output",
    defaultState: "queued",
    allowedInputClasses: ["live-customer", "synthetic-test"],
    requiredContext: ["output type", "approved source material", "recipient context", "delivery channel"],
    requiredGuards: ["approval policy required", "private notes excluded", "link check", "recipient review"],
    blockedActions: ["send output", "bypass approval", "include private notes", "attach unapproved file"],
    outputReviewGates: ["preview review", "delivery review", "final approval"],
    auditEvents: ["command queued", "preview generated", "review requested", "approved or blocked"],
  },
  {
    commandType: "review-monthly-progress",
    label: "Review Monthly Progress",
    defaultState: "queued",
    allowedInputClasses: ["live-customer", "synthetic-test", "regression-test"],
    requiredContext: ["monthly cycle", "previous recommendation", "progress evidence", "risk signals"],
    requiredGuards: ["progress evidence required", "risk uncertainty marked", "next action backed", "operator review"],
    blockedActions: ["claim improvement without evidence", "send output", "close cycle without approval"],
    outputReviewGates: ["monthly evidence review", "risk review", "next action review"],
    auditEvents: ["command queued", "progress reviewed", "risk flagged", "review completed"],
  },
] as const satisfies readonly AiManagerCommandPolicy[];

export function getAiManagerCommandPolicies() {
  return AI_MANAGER_COMMAND_POLICIES;
}

export function getAiManagerCommandPolicy(commandType: AiManagerCommandType) {
  return AI_MANAGER_COMMAND_POLICIES.find((policy) => policy.commandType === commandType) ?? null;
}
