export type OperatorTerminalProductionEntryGateId =
  | "verified-operator-identity"
  | "route-boundary"
  | "role-scope"
  | "packet-record-source"
  | "approval-audit-trail"
  | "release-log-record"
  | "rollback-plan"
  | "visual-review";

export type OperatorTerminalProductionEntryGate = Readonly<{
  id: OperatorTerminalProductionEntryGateId;
  label: string;
  requiredEvidence: string;
  launchBlocker: string;
}>;

export type OperatorTerminalProductionEntryResolution = Readonly<{
  productionEntryAllowed: false;
  mode: "hold-for-production-readiness";
  reason: string;
  requiredGates: readonly OperatorTerminalProductionEntryGate[];
  missingGateIds: readonly OperatorTerminalProductionEntryGateId[];
  allowedBeforeProduction: readonly string[];
  forbiddenBeforeProduction: readonly string[];
}>;

export const OPERATOR_TERMINAL_PRODUCTION_ENTRY_GATES: readonly OperatorTerminalProductionEntryGate[] = [
  {
    id: "verified-operator-identity",
    label: "Verified operator identity",
    requiredEvidence: "Operator identity must be resolved by trusted platform code before the terminal is treated as production ready.",
    launchBlocker: "No production entry until operator identity is verified outside the sample page.",
  },
  {
    id: "route-boundary",
    label: "Route boundary",
    requiredEvidence: "The terminal route must have a trusted boundary before the page renders production controls.",
    launchBlocker: "No production entry until the route boundary is enforced before render.",
  },
  {
    id: "role-scope",
    label: "Role scope",
    requiredEvidence: "Review, approval, and support capabilities must be separated by trusted role checks.",
    launchBlocker: "No production entry until review rights and approval rights are role scoped.",
  },
  {
    id: "packet-record-source",
    label: "Packet record source",
    requiredEvidence: "Packets must come from trusted records instead of sample fixtures.",
    launchBlocker: "No production entry until sample packets are replaced by trusted packet records.",
  },
  {
    id: "approval-audit-trail",
    label: "Approval audit trail",
    requiredEvidence: "Every approval decision must store actor, time, evidence references, and safe release note.",
    launchBlocker: "No production entry until approval decisions are auditable.",
  },
  {
    id: "release-log-record",
    label: "Release log record",
    requiredEvidence: "Released customer-safe outputs must write a durable release log before visibility changes.",
    launchBlocker: "No production entry until release logs are durable and queryable.",
  },
  {
    id: "rollback-plan",
    label: "Rollback plan",
    requiredEvidence: "Operators must have a documented rollback path for released report packages.",
    launchBlocker: "No production entry until rollback instructions exist for every release path.",
  },
  {
    id: "visual-review",
    label: "Visual review",
    requiredEvidence: "The terminal must pass mobile, tablet, and desktop review for safety banners and gate state clarity.",
    launchBlocker: "No production entry until visual review confirms hold-state actions are obvious.",
  },
] as const;

export function resolveOperatorTerminalProductionEntryGuard(): OperatorTerminalProductionEntryResolution {
  return {
    productionEntryAllowed: false,
    mode: "hold-for-production-readiness",
    reason: "Operator terminal production entry remains held until every identity, route, role, packet, audit, release-log, rollback, and visual review gate is complete.",
    requiredGates: OPERATOR_TERMINAL_PRODUCTION_ENTRY_GATES,
    missingGateIds: OPERATOR_TERMINAL_PRODUCTION_ENTRY_GATES.map((gate) => gate.id),
    allowedBeforeProduction: [
      "inspect sample packet state",
      "review static gate copy",
      "validate route guardrails",
      "prepare trusted terminal implementation",
    ],
    forbiddenBeforeProduction: [
      "enable release execution",
      "connect external provider controls",
      "load live customer records into the sample page",
      "send approval notifications",
      "publish terminal for customer use",
    ],
  } as const;
}
