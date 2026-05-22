import type { PresenceReportEvidenceKind } from "@/lib/presence-report-evidence-record-contracts";

export type OperatorReleaseGateStage =
  | "command-queue"
  | "business-truth-profile"
  | "evidence-console"
  | "finding-builder"
  | "repair-composer"
  | "approval-gate"
  | "release-log";

export type OperatorReleaseGateContract = {
  readonly stage: OperatorReleaseGateStage;
  readonly label: string;
  readonly operatorPurpose: string;
  readonly requiredInputs: readonly PresenceReportEvidenceKind[];
  readonly requiredChecks: readonly string[];
  readonly allowedOutputs: readonly string[];
  readonly blockedOutputs: readonly string[];
  readonly customerSafeExitCriteria: readonly string[];
};

export const OPERATOR_RELEASE_GATE_CONTRACTS: readonly OperatorReleaseGateContract[] = [
  {
    stage: "command-queue",
    label: "Command Queue",
    operatorPurpose: "Prioritize scans, reports, and repairs that need operator review before anything customer-facing changes.",
    requiredInputs: ["submitted-business-context", "visible-public-signal", "comparison-signal", "customer-proof-signal", "operator-note"],
    requiredChecks: ["customer ownership state", "report source kind", "review urgency", "blocked evidence count"],
    allowedOutputs: ["review task", "repair task", "release task", "blocked task"],
    blockedOutputs: ["customer-facing finding", "direct report release", "unsupported competitor claim"],
    customerSafeExitCriteria: ["task assigned to safe next stage", "no raw evidence rendered", "no customer sees internal queue state"],
  },
  {
    stage: "business-truth-profile",
    label: "Business Truth Profile",
    operatorPurpose: "Separate approved customer facts from restricted claims before findings or repairs are written.",
    requiredInputs: ["submitted-business-context", "customer-proof-signal"],
    requiredChecks: ["approved business name", "service/location boundaries", "restricted claims", "claim proof state"],
    allowedOutputs: ["approved fact", "restricted claim", "missing proof note", "customer-safe profile summary"],
    blockedOutputs: ["unverified superlative", "private customer document", "guaranteed result claim"],
    customerSafeExitCriteria: ["approved facts have boundaries", "restricted claims cannot feed public copy", "missing proof is labeled as limitation"],
  },
  {
    stage: "evidence-console",
    label: "Evidence Console",
    operatorPurpose: "Normalize public, comparison, and proof signals into reviewed evidence with labels, limitations, and confidence.",
    requiredInputs: ["visible-public-signal", "comparison-signal", "customer-proof-signal", "operator-note"],
    requiredChecks: ["source label", "observation summary", "sensitivity level", "review state", "confidence label"],
    allowedOutputs: ["approved evidence summary", "blocked evidence", "needs-review evidence", "evidence boundary"],
    blockedOutputs: ["raw scrape body", "unsupported competitor accusation", "operator note in customer report"],
    customerSafeExitCriteria: ["customer-safe evidence is summarized", "restricted evidence is reviewed", "internal-only evidence is blocked"],
  },
  {
    stage: "finding-builder",
    label: "Finding Builder",
    operatorPurpose: "Turn reviewed evidence into a customer-safe finding that states the weak point, proof, limitation, and confidence.",
    requiredInputs: ["visible-public-signal", "comparison-signal", "customer-proof-signal"],
    requiredChecks: ["weak point", "proof summary", "limitation", "confidence label", "no guarantee language"],
    allowedOutputs: ["customer-safe finding", "finding limitation", "confidence-labeled insight", "blocked finding"],
    blockedOutputs: ["ranking promise", "lead promise", "revenue promise", "AI placement promise", "unsupported certainty"],
    customerSafeExitCriteria: ["finding ties to evidence", "finding includes limitation", "confidence is visible", "next action is bounded"],
  },
  {
    stage: "repair-composer",
    label: "Repair Composer",
    operatorPurpose: "Translate approved findings into scoped repairs for public business signals without overreaching the evidence.",
    requiredInputs: ["visible-public-signal", "comparison-signal", "customer-proof-signal"],
    requiredChecks: ["repair target", "impact rationale", "effort estimate", "reversibility", "customer approval requirement"],
    allowedOutputs: ["page repair", "service copy repair", "schema alignment repair", "proof placement repair", "FAQ repair", "GBP guidance"],
    blockedOutputs: ["black-box SEO tactic", "hidden claim page", "unsupported schema claim", "irreversible live change"],
    customerSafeExitCriteria: ["repair is scoped", "repair maps to finding", "repair does not promise outcome", "customer approval path is clear"],
  },
  {
    stage: "approval-gate",
    label: "Approval Gate",
    operatorPurpose: "Approve only customer-safe findings, packages, and repairs for release after review state and sensitivity checks pass.",
    requiredInputs: ["visible-public-signal", "comparison-signal", "customer-proof-signal", "operator-note"],
    requiredChecks: ["operator approval", "release gate", "customer-safe rewrite", "source ownership", "paid entitlement when required"],
    allowedOutputs: ["released Presence Report package", "approved repair queue", "customer-safe next move", "release blocked"],
    blockedOutputs: ["draft report", "unapproved finding", "raw evidence", "operator notes", "private scoring internals"],
    customerSafeExitCriteria: ["approved-for-customer-report evidence only", "operator notes converted or blocked", "release log entry created"],
  },
  {
    stage: "release-log",
    label: "Release Log",
    operatorPurpose: "Record what was released, why it was safe, which evidence supported it, and how it can be audited or rolled back.",
    requiredInputs: ["visible-public-signal", "comparison-signal", "customer-proof-signal"],
    requiredChecks: ["released package id", "approval actor", "approval time", "evidence references", "rollback path"],
    allowedOutputs: ["release summary", "audit entry", "rollback marker", "customer-safe release note"],
    blockedOutputs: ["private scoring internals", "raw evidence dump", "operator-only rationale"],
    customerSafeExitCriteria: ["release can be audited", "customer-safe note is separated from internal log", "rollback path exists"],
  },
] as const;

export function getOperatorReleaseGateContracts() {
  return OPERATOR_RELEASE_GATE_CONTRACTS;
}

export function getOperatorReleaseGateContract(stage: OperatorReleaseGateStage) {
  return OPERATOR_RELEASE_GATE_CONTRACTS.find((contract) => contract.stage === stage) ?? OPERATOR_RELEASE_GATE_CONTRACTS[0];
}
