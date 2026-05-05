export type OptimizationMethodKey =
  | "clarity-upgrade"
  | "trust-proof-upgrade"
  | "conversion-path-upgrade"
  | "authority-signal-upgrade"
  | "offer-structure-upgrade"
  | "follow-up-system-upgrade"
  | "monthly-control-upgrade";

export type OptimizationMethodPlanScope = "free-scan" | "deep-review" | "build-fix" | "ongoing-control";

export type OptimizationMethod = {
  key: OptimizationMethodKey;
  label: string;
  planScopes: readonly OptimizationMethodPlanScope[];
  problemSignals: readonly string[];
  requiredEvidence: readonly string[];
  proofChecks: readonly string[];
  expectedOutcomes: readonly string[];
  customerSafeOutputRules: readonly string[];
};

export const OPTIMIZATION_METHOD_LIBRARY = [
  {
    key: "clarity-upgrade",
    label: "Clarity Upgrade",
    planScopes: ["free-scan", "deep-review", "build-fix", "ongoing-control"],
    problemSignals: ["unclear offer", "unclear audience", "unclear next step", "mixed messaging"],
    requiredEvidence: ["website observation", "offer copy", "customer path observation", "plan context"],
    proofChecks: ["problem identified", "before-after wording available", "plain-language improvement", "recommendation matched to plan scope", "operator review"],
    expectedOutcomes: ["faster understanding", "lower confusion", "stronger next-step action"],
    customerSafeOutputRules: ["avoid jargon", "state the issue plainly", "show what to change", "avoid unsupported performance promises"],
  },
  {
    key: "trust-proof-upgrade",
    label: "Trust Proof Upgrade",
    planScopes: ["free-scan", "deep-review", "build-fix", "ongoing-control"],
    problemSignals: ["weak proof", "missing reviews", "unclear credentials", "low confidence signals"],
    requiredEvidence: ["review pattern", "proof element", "credential or authority source", "trust placement observation"],
    proofChecks: ["proof source present", "claim supported", "customer confidence path clear", "private notes separated"],
    expectedOutcomes: ["stronger trust", "less buyer hesitation", "clearer credibility"],
    customerSafeOutputRules: ["do not exaggerate credentials", "separate observation from recommendation", "avoid making claims the source does not support"],
  },
  {
    key: "conversion-path-upgrade",
    label: "Conversion Path Upgrade",
    planScopes: ["free-scan", "deep-review", "build-fix", "ongoing-control"],
    problemSignals: ["hard to contact", "weak CTA", "too many steps", "missing booking path"],
    requiredEvidence: ["contact path", "CTA placement", "form or booking path", "mobile path observation"],
    proofChecks: ["friction identified", "next action defined", "plan scope matched", "customer-safe recommendation"],
    expectedOutcomes: ["clearer action", "less friction", "more completed inquiries"],
    customerSafeOutputRules: ["focus on observable friction", "avoid guaranteed conversion claims", "recommend one clear next step"],
  },
  {
    key: "authority-signal-upgrade",
    label: "Authority Signal Upgrade",
    planScopes: ["deep-review", "build-fix", "ongoing-control"],
    problemSignals: ["low expertise signal", "weak category authority", "missing proof of results", "thin educational content"],
    requiredEvidence: ["authority content", "case or result signal", "service expertise signal", "benchmark comparison when available"],
    proofChecks: ["authority claim supported", "source captured", "customer-safe explanation", "operator review"],
    expectedOutcomes: ["stronger perceived expertise", "better trust quality", "clearer category leadership"],
    customerSafeOutputRules: ["do not invent authority", "avoid unsupported superiority claims", "make the recommendation practical"],
  },
  {
    key: "offer-structure-upgrade",
    label: "Offer Structure Upgrade",
    planScopes: ["deep-review", "build-fix", "ongoing-control"],
    problemSignals: ["unclear package", "unclear pricing context", "weak value explanation", "confusing service structure"],
    requiredEvidence: ["service page", "offer copy", "pricing or package context when available", "customer path observation"],
    proofChecks: ["offer confusion identified", "scope matched", "value explanation improved", "customer-safe language reviewed"],
    expectedOutcomes: ["clearer value", "better buyer understanding", "stronger plan fit"],
    customerSafeOutputRules: ["do not promise revenue", "explain the value gap plainly", "keep recommendations within the purchased plan"],
  },
  {
    key: "follow-up-system-upgrade",
    label: "Follow-Up System Upgrade",
    planScopes: ["build-fix", "ongoing-control"],
    problemSignals: ["weak follow-up", "no reminder path", "unclear lead handoff", "missed next steps"],
    requiredEvidence: ["lead path", "delivery channel", "CRM or message workflow metadata", "operator workflow context"],
    proofChecks: ["handoff gap identified", "delivery path approved", "message preview reviewed", "automation boundary respected"],
    expectedOutcomes: ["better response consistency", "fewer missed leads", "clearer follow-up accountability"],
    customerSafeOutputRules: ["do not expose internal workflow details", "avoid overpromising automation results", "use customer-safe message previews"],
  },
  {
    key: "monthly-control-upgrade",
    label: "Monthly Control Upgrade",
    planScopes: ["ongoing-control"],
    problemSignals: ["stale content", "declining trust signal", "unfinished fix", "new risk", "missed recurring task"],
    requiredEvidence: ["monthly cycle record", "progress evidence", "risk observation", "previous recommendation", "next action rationale"],
    proofChecks: ["previous work reviewed", "progress captured", "risk explained", "next action evidence-backed", "customer update approved"],
    expectedOutcomes: ["clear progress visibility", "better monthly accountability", "continuous improvement path"],
    customerSafeOutputRules: ["show what changed", "separate risk from certainty", "explain next action plainly", "avoid unsupported improvement claims"],
  },
] as const satisfies readonly OptimizationMethod[];

export function getOptimizationMethodLibrary() {
  return OPTIMIZATION_METHOD_LIBRARY;
}

export function getOptimizationMethod(key: OptimizationMethodKey) {
  return OPTIMIZATION_METHOD_LIBRARY.find((method) => method.key === key) ?? null;
}
