export type ReportEvidenceSourceTier =
  | "customer-context"
  | "owned-business-surface"
  | "safe-public-signal"
  | "technical-observation"
  | "calculated-analysis"
  | "operator-review"
  | "release-captain-review";

export type ReportEvidenceTrustLevel = "verified" | "strong" | "moderate" | "limited" | "missing" | "conflicted";

export type ReportEvidencePlanFit = "free-scan" | "deep-review" | "build-fix" | "ongoing-control";

export type ReportEvidenceOrchestrationRule = {
  key: string;
  label: string;
  purpose: string;
  requiredBeforeCustomerOutput: boolean;
  blockedIfMissing: boolean;
};

export type ReportEvidenceSourceContract = {
  tier: ReportEvidenceSourceTier;
  label: string;
  allowedUses: readonly string[];
  cannotProve: readonly string[];
  requiredHandling: readonly string[];
};

export type ReportEvidenceConfidenceContract = {
  trustLevel: ReportEvidenceTrustLevel;
  allowedReportLanguage: string;
  requiredEvidencePosture: readonly string[];
  blockedReportLanguage: readonly string[];
};

export type ReportEvidencePlanFitContract = {
  planFit: ReportEvidencePlanFit;
  minimumEvidencePosture: readonly string[];
  allowedRecommendation: string;
  blockedRecommendation: readonly string[];
};

export const REPORT_EVIDENCE_ORCHESTRATION_RULES = [
  {
    key: "evidence-before-report-output",
    label: "Evidence before report output",
    purpose: "Customer-facing report claims must be grounded in customer context, safe external evidence, internal state, calculated analysis, owner posture coverage, or reviewed operator judgment before output.",
    requiredBeforeCustomerOutput: true,
    blockedIfMissing: true,
  },
  {
    key: "conflict-before-confidence",
    label: "Conflict before confidence",
    purpose: "Contradictory evidence must be surfaced as an evidence conflict before confidence is raised or a recommendation is strengthened.",
    requiredBeforeCustomerOutput: true,
    blockedIfMissing: true,
  },
  {
    key: "plan-fit-before-upgrade",
    label: "Plan fit before upgrade",
    purpose: "Plan recommendations must be tied to observed blocker depth, evidence confidence, required work, and customer readiness rather than generic upsell pressure.",
    requiredBeforeCustomerOutput: true,
    blockedIfMissing: true,
  },
  {
    key: "release-captain-before-final-report",
    label: "Release captain before final report",
    purpose: "Final customer-facing report output must remain subject to release-captain review posture when claims, evidence conflicts, plan-fit decisions, owner posture coverage, or launch-sensitive guidance are material.",
    requiredBeforeCustomerOutput: true,
    blockedIfMissing: true,
  },
] as const satisfies readonly ReportEvidenceOrchestrationRule[];

export const REPORT_EVIDENCE_SOURCE_CONTRACTS = [
  {
    tier: "customer-context",
    label: "Customer-provided context",
    allowedUses: ["initial direction", "business intent", "stated goals", "stated pain points", "customer-owned clarification"],
    cannotProve: ["verified public visibility", "actual search position", "actual revenue impact", "actual platform performance", "competitor outcome"],
    requiredHandling: ["label as customer-provided", "do not turn into verified fact without support", "use as a starting clue", "compare against safe evidence when available"],
  },
  {
    tier: "owned-business-surface",
    label: "Owned business surface",
    allowedUses: ["website observation", "offer clarity", "contact path", "trust marker visibility", "page-level conversion friction"],
    cannotProve: ["hidden analytics", "exact lost revenue", "customer intent volume", "private conversion rate"],
    requiredHandling: ["capture observed page or surface", "separate visible fact from inference", "note freshness when available", "avoid hidden metric claims"],
  },
  {
    tier: "safe-public-signal",
    label: "Safe public signal",
    allowedUses: ["profile presence", "directory consistency", "review footprint", "social or platform activity", "category context"],
    cannotProve: ["private account state", "complete market share", "guaranteed lead impact", "unobserved customer behavior"],
    requiredHandling: ["record source class", "label sparse or stale evidence", "surface conflicts", "avoid treating one signal as total proof"],
  },
  {
    tier: "technical-observation",
    label: "Technical observation",
    allowedUses: ["visible technical blocker", "page structure issue", "basic performance signal", "form or route friction", "rendering or accessibility issue"],
    cannotProve: ["complete security posture", "server-side internals", "absolute safety", "full compliance"],
    requiredHandling: ["describe observed condition", "avoid absolute security language", "tie to customer-visible risk", "recommend deeper review when needed"],
  },
  {
    tier: "calculated-analysis",
    label: "Calculated analysis",
    allowedUses: ["score", "priority", "severity", "confidence", "plan-fit ranking", "progress delta"],
    cannotProve: ["outcome guarantee", "cause without evidence", "future revenue", "market certainty"],
    requiredHandling: ["store input classes", "store formula label", "store confidence", "store limitation", "separate correlation from cause"],
  },
  {
    tier: "operator-review",
    label: "Operator review",
    allowedUses: ["quality review", "evidence interpretation", "conflict triage", "customer-safe language review", "plan-fit review", "owner posture coverage"],
    cannotProve: ["unreviewed data truth", "launch approval", "provider approval", "security readiness approval"],
    requiredHandling: ["record reviewer role", "preserve audit posture", "avoid raw private payload exposure", "return final material claims to release captain"],
  },
  {
    tier: "release-captain-review",
    label: "Release captain review",
    allowedUses: ["final validation posture", "material claim approval posture", "report release readiness", "plan-fit final review", "conflict escalation", "owner posture coverage"],
    cannotProve: ["public launch by itself", "paid launch by itself", "report truth without evidence", "absolute certainty"],
    requiredHandling: ["validate evidence separation", "validate confidence labels", "validate limitations", "validate safe next action", "block unsupported claims"],
  },
] as const satisfies readonly ReportEvidenceSourceContract[];

export const REPORT_EVIDENCE_CONFIDENCE_CONTRACTS = [
  {
    trustLevel: "verified",
    allowedReportLanguage: "State as verified only when the claim is directly supported by reliable evidence, deterministic calculation, or reviewed owned records.",
    requiredEvidencePosture: ["direct support", "traceable source", "no unresolved conflict", "freshness or limitation noted"],
    blockedReportLanguage: ["guaranteed result", "absolute certainty beyond evidence", "unsupported future outcome"],
  },
  {
    trustLevel: "strong",
    allowedReportLanguage: "State as strongly supported when multiple signals point to the same conclusion and no material conflict is unresolved.",
    requiredEvidencePosture: ["multiple aligned signals", "source class recorded", "confidence label visible", "remaining limits disclosed"],
    blockedReportLanguage: ["verified fact", "certain outcome", "exact financial impact without model inputs"],
  },
  {
    trustLevel: "moderate",
    allowedReportLanguage: "State as likely or directional when evidence supports the pattern but still needs deeper review for final diagnosis.",
    requiredEvidencePosture: ["some supporting evidence", "known gaps disclosed", "recommended verification path", "no final-truth framing"],
    blockedReportLanguage: ["proven cause", "final diagnosis", "must buy now", "guaranteed improvement"],
  },
  {
    trustLevel: "limited",
    allowedReportLanguage: "State as limited or preliminary when evidence is sparse, stale, customer-only, or incomplete.",
    requiredEvidencePosture: ["limits visible", "next evidence step visible", "plan recommendation bounded", "customer claim not upgraded"],
    blockedReportLanguage: ["high confidence", "verified", "complete audit", "final report"],
  },
  {
    trustLevel: "missing",
    allowedReportLanguage: "State that evidence is missing and identify the next safe evidence step.",
    requiredEvidencePosture: ["missing class named", "reason or limit noted", "safe next action provided", "no invented claim"],
    blockedReportLanguage: ["assumed true", "scored as verified", "hidden gap", "customer blame"],
  },
  {
    trustLevel: "conflicted",
    allowedReportLanguage: "State that evidence conflicts and explain what must be resolved before stronger conclusions are made.",
    requiredEvidencePosture: ["conflict surfaced", "sources separated", "confidence lowered", "resolution path defined"],
    blockedReportLanguage: ["ignore conflict", "cherry-pick stronger claim", "final certainty", "unsupported accusation"],
  },
] as const satisfies readonly ReportEvidenceConfidenceContract[];

export const REPORT_EVIDENCE_PLAN_FIT_CONTRACTS = [
  {
    planFit: "free-scan",
    minimumEvidencePosture: ["safe intake context", "one visible or stated blocker", "limited confidence labels", "safe next action"],
    allowedRecommendation: "Recommend Free Scan as a first direction and triage layer when evidence is early, incomplete, or customer readiness is unclear.",
    blockedRecommendation: ["complete diagnosis", "guaranteed fix", "exact financial impact", "final truth"],
  },
  {
    planFit: "deep-review",
    minimumEvidencePosture: ["visible issue or conflict", "need for deeper verification", "multiple evidence classes desired", "clear unanswered questions"],
    allowedRecommendation: "Recommend Deep Review when root cause, priority, market context, or evidence conflicts require a full diagnostic pass.",
    blockedRecommendation: ["skip diagnosis", "sell fix without proof", "promise exact outcome", "hide uncertainty"],
  },
  {
    planFit: "build-fix",
    minimumEvidencePosture: ["diagnosed blocker", "sufficient confidence", "implementation path", "customer-owned scope"],
    allowedRecommendation: "Recommend Build Fix when evidence supports specific blockers and the next valuable step is implementation.",
    blockedRecommendation: ["fix unsupported issue", "scope creep", "security guarantee", "revenue guarantee"],
  },
  {
    planFit: "ongoing-control",
    minimumEvidencePosture: ["baseline or monitoring need", "recurring risk", "progress or drift target", "review cadence"],
    allowedRecommendation: "Recommend Ongoing Control when the business needs monitoring, iteration, market adaptation, and recurring proof review.",
    blockedRecommendation: ["automatic growth claim", "vanity metric proof", "unbounded retainer", "unsupported trend claim"],
  },
] as const satisfies readonly ReportEvidencePlanFitContract[];

export const REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS = [
  "customerClaimAsVerifiedFact",
  "singleSourceAsCompleteProof",
  "hiddenEvidenceGap",
  "ignoredEvidenceConflict",
  "unlabeledLowConfidence",
  "unsupportedPlanRecommendation",
  "fixWithoutDiagnosis",
  "customerFacingRawPayload",
  "customerFacingPrivateEvidence",
  "customerFacingOperatorNote",
  "guaranteedOutcomeClaim",
  "guaranteedRevenueClaim",
  "guaranteedRoiClaim",
  "absoluteSecurityClaim",
  "liabilityFreeClaim",
] as const;

export function getReportEvidenceOrchestrationPolicy() {
  return {
    orchestrationRules: REPORT_EVIDENCE_ORCHESTRATION_RULES,
    sourceContracts: REPORT_EVIDENCE_SOURCE_CONTRACTS,
    confidenceContracts: REPORT_EVIDENCE_CONFIDENCE_CONTRACTS,
    planFitContracts: REPORT_EVIDENCE_PLAN_FIT_CONTRACTS,
    blockedPatterns: REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS,
  };
}
