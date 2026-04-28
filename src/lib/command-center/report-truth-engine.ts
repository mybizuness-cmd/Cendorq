export type ReportPlanStage = "free-scan" | "full-diagnosis" | "optimization" | "monthly-control";

export type EvidenceSourceClass =
  | "customer-provided"
  | "business-website"
  | "public-search-result"
  | "business-profile"
  | "directory-listing"
  | "review-platform"
  | "social-profile"
  | "technical-scan"
  | "calculated-metric"
  | "operator-reviewed";

export type EvidenceConfidence = "verified" | "strong" | "moderate" | "weak" | "missing";

export type ReportTruthRule = {
  key: string;
  label: string;
  requirement: string;
  blockedIfMissing: boolean;
};

export type ReportMetricRule = {
  key: string;
  label: string;
  planStages: readonly ReportPlanStage[];
  requiredEvidence: readonly EvidenceSourceClass[];
  calculationPolicy: string;
  confidencePolicy: string;
  forbiddenBehavior: readonly string[];
};

export type BusinessEnrichmentRule = {
  key: string;
  label: string;
  minimumInputs: readonly string[];
  enrichmentGoal: string;
  requiredResolutionSteps: readonly string[];
  fallbackPolicy: string;
};

export type ReportConversionRule = {
  fromStage: ReportPlanStage;
  nextStage: Exclude<ReportPlanStage, "free-scan">;
  pitchPosition: string;
  requiredProof: readonly string[];
  forbiddenBehavior: readonly string[];
};

export const REPORT_TRUTH_RULES = [
  {
    key: "separate-input-from-evidence",
    label: "Separate customer input from evidence",
    requirement: "Treat form fields as useful clues, not final proof. Every material claim must be backed by independent evidence, direct business-owned evidence, a technical scan, or a clearly labeled customer-provided assumption.",
    blockedIfMissing: true,
  },
  {
    key: "minimum-input-enrichment",
    label: "Minimum-input enrichment",
    requirement: "The back end must be able to start from a business name plus website or address and attempt to resolve the business identity, location, website, profiles, public listings, review footprint, and technical presence before scoring.",
    blockedIfMissing: true,
  },
  {
    key: "calculation-trace-required",
    label: "Calculation trace required",
    requirement: "Every score, grade, percentage, priority, and plan recommendation must store the calculation inputs, formula label, evidence references, confidence level, and rounding policy.",
    blockedIfMissing: true,
  },
  {
    key: "uncertainty-label-required",
    label: "Uncertainty label required",
    requirement: "If evidence is incomplete, conflicting, stale, or only customer-provided, the report must label uncertainty and avoid presenting the output as verified fact.",
    blockedIfMissing: true,
  },
  {
    key: "no-perfect-accuracy-claim",
    label: "No perfect accuracy claim",
    requirement: "Reports must aim for maximum practical accuracy and factuality, but must never claim 100% certainty, perfect accuracy, or guaranteed outcomes unless the claim is a direct deterministic calculation from verified inputs.",
    blockedIfMissing: true,
  },
  {
    key: "recommendation-must-map-to-plan",
    label: "Recommendation must map to plan",
    requirement: "Each report must explain what is wrong, why it matters commercially, what proof supports the diagnosis, and which next plan is the correct next step based on severity, confidence, and required depth of work.",
    blockedIfMissing: true,
  },
] as const satisfies readonly ReportTruthRule[];

export const BUSINESS_ENRICHMENT_RULES = [
  {
    key: "identity-resolution",
    label: "Business identity resolution",
    minimumInputs: ["business name", "website or address when available"],
    enrichmentGoal: "Identify the correct business entity before scoring so the report is not anchored to incomplete or incorrect form data.",
    requiredResolutionSteps: [
      "normalize business name, website, phone, and address fields",
      "match business-owned website and canonical domain",
      "match address or service area when available",
      "compare public business profiles and directory listings",
      "flag ambiguity when multiple plausible businesses match",
    ],
    fallbackPolicy: "If identity confidence is not strong, the report can produce only a limited scan with clear uncertainty and must recommend Full Diagnosis before deeper claims.",
  },
  {
    key: "presence-discovery",
    label: "Presence discovery",
    minimumInputs: ["resolved business identity"],
    enrichmentGoal: "Find the business website, search footprint, profiles, reviews, local listings, social presence, and technical visibility signals.",
    requiredResolutionSteps: [
      "discover owned website pages and core conversion pages",
      "discover business profiles and listing consistency",
      "discover review footprint and visible reputation signals",
      "discover social and content surfaces when relevant",
      "discover technical blockers visible from public pages",
    ],
    fallbackPolicy: "Missing surfaces should be scored as missing only when the absence is supported by a completed search attempt and logged as evidence; otherwise label unknown.",
  },
  {
    key: "competitive-context",
    label: "Competitive context",
    minimumInputs: ["business category", "location or target market"],
    enrichmentGoal: "Compare the business against relevant market expectations rather than generic benchmarks.",
    requiredResolutionSteps: [
      "identify likely category and customer intent",
      "identify local or niche competitor examples when available",
      "compare visibility, trust, conversion, and offer clarity signals",
      "separate observed facts from strategic inference",
    ],
    fallbackPolicy: "If market context is weak, keep competitive claims conservative and frame them as preliminary opportunities for Full Diagnosis.",
  },
] as const satisfies readonly BusinessEnrichmentRule[];

export const REPORT_METRIC_RULES = [
  {
    key: "visibility-score",
    label: "Visibility score",
    planStages: ["free-scan", "full-diagnosis", "optimization", "monthly-control"],
    requiredEvidence: ["business-website", "public-search-result", "business-profile", "directory-listing"],
    calculationPolicy: "Use weighted visibility signals such as discoverability of the canonical website, profile presence, listing consistency, category relevance, and search-result footprint. Store weights by formula version and expose only customer-safe explanations.",
    confidencePolicy: "High confidence requires resolved identity plus multiple independent public sources. Lower confidence must be labeled and should push toward Full Diagnosis.",
    forbiddenBehavior: ["inventing search rank", "treating one source as complete proof", "hiding missing evidence", "claiming guaranteed lead volume"],
  },
  {
    key: "trust-score",
    label: "Trust score",
    planStages: ["free-scan", "full-diagnosis", "optimization", "monthly-control"],
    requiredEvidence: ["business-profile", "review-platform", "business-website", "directory-listing"],
    calculationPolicy: "Combine review footprint, review recency, profile completeness, trust markers, listing consistency, and visible credibility gaps with documented weights and confidence labels.",
    confidencePolicy: "Verified trust scoring requires enough public review/profile evidence. Sparse evidence must be labeled as limited, not as a definitive reputation conclusion.",
    forbiddenBehavior: ["fabricating reviews", "overstating sentiment", "claiming reputation damage without evidence", "using stale evidence without labeling"],
  },
  {
    key: "conversion-friction-score",
    label: "Conversion friction score",
    planStages: ["full-diagnosis", "optimization", "monthly-control"],
    requiredEvidence: ["business-website", "technical-scan", "operator-reviewed"],
    calculationPolicy: "Score contact clarity, offer clarity, mobile usability, call-to-action path, form friction, speed signals, page structure, and trust markers with traceable observations.",
    confidencePolicy: "Full confidence requires page-level observations or technical scan outputs. Free Scan may preview likely friction only when supported by visible website evidence.",
    forbiddenBehavior: ["diagnosing hidden analytics without access", "claiming exact lost revenue without verified inputs", "turning assumptions into facts"],
  },
  {
    key: "priority-severity-index",
    label: "Priority severity index",
    planStages: ["full-diagnosis", "optimization", "monthly-control"],
    requiredEvidence: ["calculated-metric", "operator-reviewed"],
    calculationPolicy: "Rank issues by severity, confidence, business impact, implementation difficulty, and plan fit. Store issue-level inputs and formula version for audit.",
    confidencePolicy: "Priority can be strong only when both impact evidence and issue evidence are strong. Otherwise show as recommended investigation priority.",
    forbiddenBehavior: ["ranking unsupported issues", "hiding low confidence", "recommending paid work without evidence"],
  },
  {
    key: "progress-delta",
    label: "Progress delta",
    planStages: ["monthly-control"],
    requiredEvidence: ["calculated-metric", "technical-scan", "business-profile", "operator-reviewed"],
    calculationPolicy: "Compare current period to baseline using the same metric definitions, source classes, formula versions, and confidence thresholds. Separate observed changes from likely causes.",
    confidencePolicy: "Progress claims require comparable baselines. If sources or methods changed, label the delta as non-comparable or partially comparable.",
    forbiddenBehavior: ["claiming progress from incompatible baselines", "attributing causation without evidence", "counting test records as customer progress"],
  },
] as const satisfies readonly ReportMetricRule[];

export const REPORT_CONVERSION_RULES = [
  {
    fromStage: "free-scan",
    nextStage: "full-diagnosis",
    pitchPosition: "After showing the highest-confidence visible gaps and uncertainty limits, explain that Full Diagnosis is required to verify causes, quantify priorities, and produce a complete repair plan.",
    requiredProof: ["at least one verified or strong visible issue", "clear explanation of what Free Scan cannot prove", "specific next questions Full Diagnosis answers"],
    forbiddenBehavior: ["fear-only selling", "inventing urgency", "guaranteeing results", "hiding uncertainty"],
  },
  {
    fromStage: "full-diagnosis",
    nextStage: "optimization",
    pitchPosition: "After the complete diagnosis and priority severity index, explain why Optimization is the logical next step to fix the highest-impact proven issues.",
    requiredProof: ["ranked issue list", "evidence-backed cause explanation", "implementation path", "expected outcome type without guarantee"],
    forbiddenBehavior: ["selling fixes not supported by diagnosis", "claiming exact ROI without verified model inputs", "burying low confidence"],
  },
  {
    fromStage: "optimization",
    nextStage: "monthly-control",
    pitchPosition: "After implementation priorities, explain why Monthly Control protects, measures, and iterates the improvements instead of treating growth as a one-time project.",
    requiredProof: ["implemented or approved optimization scope", "baseline metrics", "monitoring plan", "recurring risk or opportunity explanation"],
    forbiddenBehavior: ["claiming ongoing growth is automatic", "using vanity metrics as proof", "ignoring baseline comparability"],
  },
] as const satisfies readonly ReportConversionRule[];

export function getReportTruthEnginePolicy() {
  return {
    truthRules: REPORT_TRUTH_RULES,
    enrichmentRules: BUSINESS_ENRICHMENT_RULES,
    metricRules: REPORT_METRIC_RULES,
    conversionRules: REPORT_CONVERSION_RULES,
  };
}
