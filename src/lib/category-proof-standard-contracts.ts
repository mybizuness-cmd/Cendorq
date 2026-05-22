export type CategoryProofStandardStage =
  | "findability"
  | "understanding"
  | "trust"
  | "choice"
  | "action"
  | "control";

export type CategoryProofStandardContract = {
  readonly stage: CategoryProofStandardStage;
  readonly label: string;
  readonly questionAnswered: string;
  readonly acceptedProofSignals: readonly string[];
  readonly repairExamples: readonly string[];
  readonly confidenceRules: readonly string[];
  readonly unsafeClaims: readonly string[];
};

export const CATEGORY_PROOF_STANDARD_CONTRACTS: readonly CategoryProofStandardContract[] = [
  {
    stage: "findability",
    label: "Findability",
    questionAnswered: "Can search systems and customers find the business, service, location, and basic public facts?",
    acceptedProofSignals: ["indexable public page", "clear service/location page", "consistent business name", "accurate address or service area", "visible phone or contact path", "Google Business Profile consistency"],
    repairExamples: ["clarify service and location headings", "align page title and primary service", "fix missing contact path", "document GBP category/service mismatch", "repair crawl/index blockers"],
    confidenceRules: ["mark as sampled signal", "cite visible public source", "label missing access as limitation", "do not infer full index coverage from one page"],
    unsafeClaims: ["guaranteed ranking", "guaranteed inclusion", "complete search coverage", "AI placement guarantee"],
  },
  {
    stage: "understanding",
    label: "Understanding",
    questionAnswered: "Can AI/search systems and humans quickly understand what the business does, for whom, where, and why it matters?",
    acceptedProofSignals: ["clear homepage claim", "service taxonomy", "plain-language offer", "FAQ coverage", "schema aligned with visible copy", "Business Truth Profile facts"],
    repairExamples: ["rewrite hero for service clarity", "separate service pages", "add answer-ready FAQ", "align schema with visible facts", "remove vague or inflated positioning"],
    confidenceRules: ["prefer visible text over hidden metadata", "separate unclear copy from missing proof", "state when page context is insufficient"],
    unsafeClaims: ["AI understands this fully", "all engines will classify correctly", "schema guarantees AI answers"],
  },
  {
    stage: "trust",
    label: "Trust",
    questionAnswered: "Can the business support its claims with visible proof, review signals, credentials, examples, or customer-safe evidence?",
    acceptedProofSignals: ["reviews", "testimonials", "case examples", "licenses or credentials", "before/after proof with boundaries", "customer-proof-signal"],
    repairExamples: ["surface proof near claims", "add credential context", "separate verified proof from aspirational claims", "add review path", "tighten claim boundaries"],
    confidenceRules: ["do not treat private proof as public proof", "label unverified claims", "require operator approval for proof claims"],
    unsafeClaims: ["best in market", "guaranteed outcome", "verified without proof", "Fortune-level trust without source"],
  },
  {
    stage: "choice",
    label: "Choice",
    questionAnswered: "Is this business easier to compare and choose than alternatives for the target customer need?",
    acceptedProofSignals: ["comparison basis", "visible differentiator", "service fit", "price or process clarity", "local relevance", "reviewed comparison-signal"],
    repairExamples: ["add who-it-is-for copy", "clarify differentiators", "add process section", "reduce choice friction", "write customer-safe comparison language"],
    confidenceRules: ["comparison signals require review", "avoid competitor accusations", "explain basis and limits", "use may/might when evidence is partial"],
    unsafeClaims: ["competitor is worse", "guaranteed selection", "dominates all alternatives", "unsupported competitor weakness"],
  },
  {
    stage: "action",
    label: "Action",
    questionAnswered: "Can a ready customer take the next safe step without confusion, dead ends, or plan pressure before proof?",
    acceptedProofSignals: ["dominant CTA", "same-email recovery", "protected dashboard path", "clear support path", "pricing/plan boundary", "Free Scan first-signal explanation"],
    repairExamples: ["make one primary CTA per screen band", "move proof before paid pressure", "fix confusing access path", "clarify Review/Repair/Control next steps", "remove blank dashboard route"],
    confidenceRules: ["test mobile first", "separate public and protected language", "state when live access is not wired"],
    unsafeClaims: ["instant complete diagnosis", "payment guarantees result", "blank account creation", "provider access before runtime"],
  },
  {
    stage: "control",
    label: "Control",
    questionAnswered: "Can the business keep presence quality from drifting after repair work begins?",
    acceptedProofSignals: ["Control Snapshot", "drift trigger", "release log", "approval gate", "audit path", "recurring review schedule"],
    repairExamples: ["create control snapshot", "add drift watch", "log released changes", "add rollback path", "schedule proof refresh"],
    confidenceRules: ["control is monitoring not guarantee", "state sampling boundary", "separate internal audit from customer-safe note"],
    unsafeClaims: ["permanent visibility", "never loses ranking", "always chosen by AI", "complete monitoring of all engines"],
  },
] as const;

export function getCategoryProofStandardContracts() {
  return CATEGORY_PROOF_STANDARD_CONTRACTS;
}

export function getCategoryProofStandardContract(stage: CategoryProofStandardStage) {
  return CATEGORY_PROOF_STANDARD_CONTRACTS.find((contract) => contract.stage === stage) ?? CATEGORY_PROOF_STANDARD_CONTRACTS[0];
}
