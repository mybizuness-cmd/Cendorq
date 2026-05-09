export type ReportPlanStage = "free-scan" | "deep-review" | "build-fix" | "ongoing-control";

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

export type DeliveryReliabilityRule = {
  key: string;
  label: string;
  deliveryStandard: string;
  minimumSafeOutput: string;
  proofGate: string;
  blockedBehavior: readonly string[];
};

export type AgentVerificationRule = {
  key: string;
  label: string;
  agentStandard: string;
  captainStandard: string;
  blockedBehavior: readonly string[];
};

export type PersuasiveTruthRule = {
  key: string;
  label: string;
  persuasionStandard: string;
  allowedTactics: readonly string[];
  proofBoundary: string;
  blockedBehavior: readonly string[];
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
    key: "minimum-information-delivery",
    label: "Minimum information delivery",
    requirement: "When the customer gives thin information, Cendorq must still attempt the strongest safe research path: resolve identity, gather public evidence, label what is missing, produce the highest-confidence useful output available, and clearly explain what cannot be verified yet.",
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
    requirement: "Reports must aim for maximum practical accuracy and factuality, but must never claim 100% certainty, perfect accuracy, guaranteed outcomes, or mistake-free operation unless the claim is a direct deterministic calculation from verified inputs.",
    blockedIfMissing: true,
  },
  {
    key: "recommendation-must-map-to-plan",
    label: "Recommendation must map to plan",
    requirement: "Each report must explain what is wrong, why it matters commercially, what proof supports the review, and which next plan is the correct next step based on severity, confidence, and required depth of work.",
    blockedIfMissing: true,
  },
] as const satisfies readonly ReportTruthRule[];

export const DELIVERY_RELIABILITY_RULES = [
  {
    key: "always-deliver-safe-output",
    label: "Always deliver the safest useful output",
    deliveryStandard: "Cendorq should not fail just because customer input is thin. It should deliver the strongest safe output available for the plan stage: confirmed facts, observed evidence, limitations, confidence, missing inputs, and the safest next action.",
    minimumSafeOutput: "At minimum, produce a bounded report state that says what is known, what is unknown, what was checked, why confidence is limited, and what would unlock stronger analysis.",
    proofGate: "Every output must pass evidence separation, confidence labeling, no-guarantee language, and release-captain review before it becomes customer-facing.",
    blockedBehavior: ["empty report because input is thin", "guessing to look complete", "claiming perfect accuracy", "hiding missing evidence", "selling paid work without proof"],
  },
  {
    key: "highest-practical-accuracy",
    label: "Highest practical accuracy",
    deliveryStandard: "Accuracy should be treated as an operating discipline: source triangulation, evidence age checks, contradiction checks, calculation traces, operator review, and correction paths should raise truth quality as high as practical.",
    minimumSafeOutput: "If evidence cannot reach strong confidence, the customer-facing output must say so plainly and still provide a useful next action.",
    proofGate: "Claims must be classified as verified fact, customer-provided context, observed evidence, inference, forecast, or unknown before release.",
    blockedBehavior: ["100 percent accuracy guarantee", "mistake-free guarantee", "unlabeled inference", "unlabeled forecast", "certainty theater", "removing useful findings just because they are not perfect"],
  },
  {
    key: "streamlined-command-chain",
    label: "Streamlined command chain",
    deliveryStandard: "Research should move from agent to captain to owner-facing release posture with clear responsibility, proof requirements, and escalation rules so output quality does not depend on one agent's raw competence.",
    minimumSafeOutput: "If an agent cannot verify a claim, it must downgrade confidence, ask for evidence only when necessary, or route to captain review instead of inventing certainty.",
    proofGate: "Captain review must check evidence, contradictions, plan fit, customer safety, and selling language before release.",
    blockedBehavior: ["agent-only final approval", "unreviewed customer-facing claims", "captain rubber-stamping", "strictness that deletes useful bounded observations", "unsupported selling language"],
  },
] as const satisfies readonly DeliveryReliabilityRule[];

export const PERSUASIVE_TRUTH_RULES = [
  {
    key: "truthful-premium-framing",
    label: "Truthful premium framing",
    persuasionStandard: "Cendorq should sell with confidence, clarity, contrast, specificity, and premium positioning, but the strongest wording must be reserved for claims that have strong evidence or clear plan-stage fit.",
    allowedTactics: ["contrast before and after", "show cost of inaction when evidence supports it", "frame next action as safer than guessing", "explain opportunity windows", "use calm urgency when timing risk is visible", "make expert judgment easy to understand"],
    proofBoundary: "Persuasion must never convert weak evidence into certainty. If confidence is low, the copy can still be useful and compelling by explaining why deeper review is the safest move.",
    blockedBehavior: ["dark patterns", "fake urgency", "certainty theater", "unsupported fear", "claiming guaranteed outcomes", "using ambiguity to pressure purchase"],
  },
  {
    key: "educate-while-selling",
    label: "Educate while selling",
    persuasionStandard: "Sales copy should teach the customer how to think about readiness, proof, customer choice, AI/search movement, and repair timing while making the next purchase path obvious.",
    allowedTactics: ["simple buyer education", "stage comparison", "what this plan includes and excludes", "why this next step is safer", "what happens if nothing changes", "what evidence would improve confidence"],
    proofBoundary: "Education must stay concise and practical. It should not drown the customer in methodology or expose private scoring logic.",
    blockedBehavior: ["overexplaining until conversion dies", "hiding plan boundaries", "technical clutter", "methodology dumping", "selling a higher plan when a lower step is safer"],
  },
  {
    key: "reputation-over-short-term-sale",
    label: "Reputation over short-term sale",
    persuasionStandard: "Long-term reputation is more valuable than one conversion. If the evidence does not support a stronger claim, the system should use precise confidence language and sell the correct next step instead of overstating certainty.",
    allowedTactics: ["confidence labels", "bounded findings", "transparent limitations", "correction path", "review-first positioning", "selective urgency"],
    proofBoundary: "The customer should feel Cendorq is confident because it is disciplined, not because it is exaggerating.",
    blockedBehavior: ["sales copy that outruns evidence", "guarantee language", "hiding uncertainty", "manufacturing problems", "making every issue sound urgent"],
  },
] as const satisfies readonly PersuasiveTruthRule[];

export const AGENT_VERIFICATION_RULES = [
  {
    key: "agent-research-discipline",
    label: "Agent research discipline",
    agentStandard: "Agents must gather, compare, cite, classify, and label evidence before producing report claims. They should keep useful bounded findings instead of omitting them, but must label weak confidence clearly.",
    captainStandard: "Captain review verifies source relevance, evidence age, contradictions, completeness, plan fit, safe wording, and persuasion boundaries before anything becomes customer-facing.",
    blockedBehavior: ["agent improvisation as fact", "omitting useful evidence because it is imperfect", "overstating weak evidence", "unsupported competitor claims", "unverified customer-facing recommendations"],
  },
  {
    key: "truth-before-selling",
    label: "Truth before selling",
    agentStandard: "Agents may educate and sell, but every sales recommendation must follow proof, confidence, scope, and plan-fit checks.",
    captainStandard: "Captain review must reject copy that sells harder than the evidence supports, while preserving clean, confident conversion language when the proof is strong.",
    blockedBehavior: ["sales before proof", "fear-based urgency", "hiding cheaper next actions", "claiming guaranteed outcomes", "weak evidence turned into priority sales copy"],
  },
] as const satisfies readonly AgentVerificationRule[];

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
    fallbackPolicy: "If identity confidence is not strong, the report must still deliver a limited, useful, confidence-labeled scan with clear uncertainty and should recommend AI Readiness Review before deeper claims.",
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
    fallbackPolicy: "Missing surfaces should be scored as missing only when the absence is supported by a completed search attempt and logged as evidence; otherwise label unknown while still returning useful bounded findings.",
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
    fallbackPolicy: "If market context is weak, keep competitive claims conservative and frame them as preliminary opportunities for AI Readiness Review instead of omitting the whole category or inventing certainty.",
  },
] as const satisfies readonly BusinessEnrichmentRule[];

export const REPORT_METRIC_RULES = [
  {
    key: "visibility-score",
    label: "Visibility score",
    planStages: ["free-scan", "deep-review", "build-fix", "ongoing-control"],
    requiredEvidence: ["business-website", "public-search-result", "business-profile", "directory-listing"],
    calculationPolicy: "Use weighted visibility signals such as discoverability of the canonical website, profile presence, listing consistency, category relevance, and search-result footprint. Store weights by formula version and expose only customer-safe explanations.",
    confidencePolicy: "High confidence requires resolved identity plus multiple independent public sources. Lower confidence must be labeled and should push toward AI Readiness Review.",
    forbiddenBehavior: ["inventing search rank", "treating one source as complete proof", "hiding missing evidence", "claiming guaranteed lead volume"],
  },
  {
    key: "trust-score",
    label: "Trust score",
    planStages: ["free-scan", "deep-review", "build-fix", "ongoing-control"],
    requiredEvidence: ["business-profile", "review-platform", "business-website", "directory-listing"],
    calculationPolicy: "Combine review footprint, review recency, profile completeness, trust markers, listing consistency, and visible credibility gaps with documented weights and confidence labels.",
    confidencePolicy: "Verified trust scoring requires enough public review/profile evidence. Sparse evidence must be labeled as limited, not as a definitive reputation conclusion.",
    forbiddenBehavior: ["fabricating reviews", "overstating sentiment", "claiming reputation damage without evidence", "using stale evidence without labeling"],
  },
  {
    key: "conversion-friction-score",
    label: "Conversion friction score",
    planStages: ["deep-review", "build-fix", "ongoing-control"],
    requiredEvidence: ["business-website", "technical-scan", "operator-reviewed"],
    calculationPolicy: "Score contact clarity, offer clarity, mobile usability, call-to-action path, form friction, speed signals, page structure, and trust markers with traceable observations.",
    confidencePolicy: "Full confidence requires page-level observations or technical scan outputs. Free Scan may preview likely friction only when supported by visible website evidence.",
    forbiddenBehavior: ["claiming hidden analytics conclusions without access", "claiming exact lost revenue without verified inputs", "turning assumptions into facts"],
  },
  {
    key: "priority-severity-index",
    label: "Priority severity index",
    planStages: ["deep-review", "build-fix", "ongoing-control"],
    requiredEvidence: ["calculated-metric", "operator-reviewed"],
    calculationPolicy: "Rank issues by severity, confidence, business impact, implementation difficulty, and plan fit. Store issue-level inputs and formula version for audit.",
    confidencePolicy: "Priority can be strong only when both impact evidence and issue evidence are strong. Otherwise show as recommended investigation priority.",
    forbiddenBehavior: ["ranking unsupported issues", "hiding low confidence", "recommending paid work without evidence"],
  },
  {
    key: "progress-delta",
    label: "Progress delta",
    planStages: ["ongoing-control"],
    requiredEvidence: ["calculated-metric", "technical-scan", "business-profile", "operator-reviewed"],
    calculationPolicy: "Compare current period to baseline using the same metric definitions, source classes, formula versions, and confidence thresholds. Separate observed changes from likely causes.",
    confidencePolicy: "Progress claims require comparable baselines. If sources or methods changed, label the delta as non-comparable or partially comparable.",
    forbiddenBehavior: ["claiming progress from incompatible baselines", "attributing causation without evidence", "counting test records as customer progress"],
  },
] as const satisfies readonly ReportMetricRule[];

export const REPORT_CONVERSION_RULES = [
  {
    fromStage: "free-scan",
    nextStage: "deep-review",
    pitchPosition: "After showing the highest-confidence visible gaps and uncertainty limits, explain that AI Readiness Review is required to verify causes, quantify priorities, and produce a complete decision path.",
    requiredProof: ["at least one verified or strong visible issue", "clear explanation of what Free Scan cannot prove", "specific next questions AI Readiness Review answers"],
    forbiddenBehavior: ["fear-only selling", "inventing urgency", "guaranteing results", "hiding uncertainty"],
  },
  {
    fromStage: "deep-review",
    nextStage: "build-fix",
    pitchPosition: "After the complete review and priority severity index, explain why Signal Repair is the logical next step to address the highest-impact proven issues.",
    requiredProof: ["ranked issue list", "evidence-backed cause explanation", "implementation path", "expected outcome type without guarantee"],
    forbiddenBehavior: ["selling repairs not supported by review", "claiming exact ROI without verified model inputs", "burying low confidence"],
  },
  {
    fromStage: "build-fix",
    nextStage: "ongoing-control",
    pitchPosition: "After implementation priorities, explain why Readiness Control protects, measures, and iterates the improvements instead of treating growth as a one-time project.",
    requiredProof: ["implemented or approved Signal Repair scope", "baseline metrics", "monitoring plan", "recurring risk or opportunity explanation"],
    forbiddenBehavior: ["claiming ongoing growth is automatic", "using vanity metrics as proof", "ignoring baseline comparability"],
  },
] as const satisfies readonly ReportConversionRule[];

export function getReportTruthEnginePolicy() {
  return {
    truthRules: REPORT_TRUTH_RULES,
    deliveryReliabilityRules: DELIVERY_RELIABILITY_RULES,
    persuasiveTruthRules: PERSUASIVE_TRUTH_RULES,
    agentVerificationRules: AGENT_VERIFICATION_RULES,
    enrichmentRules: BUSINESS_ENRICHMENT_RULES,
    metricRules: REPORT_METRIC_RULES,
    conversionRules: REPORT_CONVERSION_RULES,
  };
}
