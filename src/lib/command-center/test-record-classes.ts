export type CommandCenterRecordClass =
  | "benchmark-reference"
  | "synthetic-test"
  | "regression-test"
  | "live-customer"
  | "archived-benchmark";

export type CommandCenterRecordClassPolicy = {
  key: CommandCenterRecordClass;
  label: string;
  customerVisible: boolean;
  countsAsRevenue: boolean;
  countsAsProgress: boolean;
  canTriggerDelivery: boolean;
  purpose: string;
  requiredGuards: readonly string[];
};

export const COMMAND_CENTER_RECORD_CLASS_POLICIES = [
  {
    key: "benchmark-reference",
    label: "Benchmark Reference",
    customerVisible: false,
    countsAsRevenue: false,
    countsAsProgress: false,
    canTriggerDelivery: false,
    purpose: "Reviewed category reference used for comparison and learning.",
    requiredGuards: ["source evidence", "review owner", "category fit", "approval status", "staleness review"],
  },
  {
    key: "synthetic-test",
    label: "Synthetic Test",
    customerVisible: false,
    countsAsRevenue: false,
    countsAsProgress: false,
    canTriggerDelivery: false,
    purpose: "Internal test record for intake, scoring, reporting, delivery preview, and AI manager behavior.",
    requiredGuards: ["test label", "no delivery", "no revenue reporting", "no customer metrics", "clear test owner"],
  },
  {
    key: "regression-test",
    label: "Regression Test",
    customerVisible: false,
    countsAsRevenue: false,
    countsAsProgress: false,
    canTriggerDelivery: false,
    purpose: "Comparison record for prompt, model, scoring, report, or optimization method changes.",
    requiredGuards: ["baseline output", "new output", "quality comparison", "unsupported claim check", "approval status"],
  },
  {
    key: "live-customer",
    label: "Live Customer",
    customerVisible: true,
    countsAsRevenue: true,
    countsAsProgress: true,
    canTriggerDelivery: true,
    purpose: "Real prospect or customer record created through approved customer, operator, or integration activity.",
    requiredGuards: ["authorization", "audit trail", "delivery approval", "private data boundary", "source-of-truth record"],
  },
  {
    key: "archived-benchmark",
    label: "Archived Benchmark",
    customerVisible: false,
    countsAsRevenue: false,
    countsAsProgress: false,
    canTriggerDelivery: false,
    purpose: "Retired benchmark reference kept for historical comparison and auditability.",
    requiredGuards: ["retirement reason", "retirement date", "replacement status", "historical-only label"],
  },
] as const satisfies readonly CommandCenterRecordClassPolicy[];

export function getCommandCenterRecordClassPolicies() {
  return COMMAND_CENTER_RECORD_CLASS_POLICIES;
}

export function getCommandCenterRecordClassPolicy(key: CommandCenterRecordClass) {
  return COMMAND_CENTER_RECORD_CLASS_POLICIES.find((policy) => policy.key === key) ?? null;
}
