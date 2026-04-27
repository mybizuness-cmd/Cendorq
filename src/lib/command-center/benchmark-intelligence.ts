export type BenchmarkIntelligenceCategory =
  | "local-service"
  | "professional-service"
  | "health-wellness"
  | "home-service"
  | "ecommerce"
  | "restaurant-hospitality"
  | "real-estate"
  | "creator-expert";

export type BenchmarkIntelligenceStatus = "candidate" | "reviewed" | "approved" | "retired";

export type BenchmarkIntelligenceControl = {
  category: BenchmarkIntelligenceCategory;
  label: string;
  targetReferenceCount: number;
  status: BenchmarkIntelligenceStatus;
  selectionStandards: readonly string[];
  requiredEvidenceTypes: readonly string[];
  comparisonAreas: readonly string[];
  aiReviewChecks: readonly string[];
  selfEvolutionSignals: readonly string[];
};

export const BENCHMARK_INTELLIGENCE_CONTROLS = [
  {
    category: "local-service",
    label: "Local Service Benchmarks",
    targetReferenceCount: 5,
    status: "candidate",
    selectionStandards: ["high trust presence", "clear offer", "strong local proof", "visible customer path"],
    requiredEvidenceTypes: ["website copy", "local profile", "review pattern", "service proof", "contact path"],
    comparisonAreas: ["clarity", "trust", "conversion path", "local authority", "follow-up readiness"],
    aiReviewChecks: ["claim support", "missing context", "recommendation strength", "customer-safe language"],
    selfEvolutionSignals: ["benchmark drift", "category pattern", "recommendation outcome", "quality regression"],
  },
  {
    category: "professional-service",
    label: "Professional Service Benchmarks",
    targetReferenceCount: 5,
    status: "candidate",
    selectionStandards: ["clear expertise", "credible proof", "strong consultation path", "trust-building content"],
    requiredEvidenceTypes: ["service page", "authority proof", "case signal", "testimonial pattern", "contact path"],
    comparisonAreas: ["positioning", "authority", "proof", "lead capture", "objection handling"],
    aiReviewChecks: ["unsupported authority claim", "proof gap", "offer clarity", "conversion risk"],
    selfEvolutionSignals: ["authority pattern", "lead-quality signal", "claim accuracy", "recommendation outcome"],
  },
  {
    category: "health-wellness",
    label: "Health and Wellness Benchmarks",
    targetReferenceCount: 5,
    status: "candidate",
    selectionStandards: ["safe claims", "credible trust proof", "clear booking path", "customer-friendly education"],
    requiredEvidenceTypes: ["service details", "credential proof", "review pattern", "booking path", "policy clarity"],
    comparisonAreas: ["trust", "safety language", "booking clarity", "proof", "education quality"],
    aiReviewChecks: ["risky claim", "credential support", "customer-safe summary", "missing proof"],
    selfEvolutionSignals: ["safety drift", "review pattern", "booking friction", "recommendation outcome"],
  },
  {
    category: "home-service",
    label: "Home Service Benchmarks",
    targetReferenceCount: 5,
    status: "candidate",
    selectionStandards: ["clear service area", "strong urgency path", "proof of work", "trust and review strength"],
    requiredEvidenceTypes: ["service area", "before-after proof", "review pattern", "estimate path", "emergency path"],
    comparisonAreas: ["service clarity", "speed to contact", "proof", "local trust", "conversion path"],
    aiReviewChecks: ["weak proof", "unclear location", "missing urgency path", "recommendation strength"],
    selfEvolutionSignals: ["seasonal signal", "service demand", "conversion blocker", "proof quality"],
  },
  {
    category: "ecommerce",
    label: "Ecommerce Benchmarks",
    targetReferenceCount: 5,
    status: "candidate",
    selectionStandards: ["clear product value", "trustworthy product proof", "smooth purchase path", "strong post-purchase confidence"],
    requiredEvidenceTypes: ["product page", "review pattern", "shipping policy", "return policy", "checkout path"],
    comparisonAreas: ["product clarity", "trust", "checkout friction", "policy clarity", "retention path"],
    aiReviewChecks: ["unclear value", "policy gap", "trust gap", "checkout risk"],
    selfEvolutionSignals: ["conversion friction", "policy expectation", "review trend", "recommendation outcome"],
  },
  {
    category: "restaurant-hospitality",
    label: "Restaurant and Hospitality Benchmarks",
    targetReferenceCount: 5,
    status: "candidate",
    selectionStandards: ["clear experience", "strong visuals", "easy booking or ordering", "review strength"],
    requiredEvidenceTypes: ["menu or offer", "visual proof", "review pattern", "reservation path", "location clarity"],
    comparisonAreas: ["experience clarity", "visual trust", "booking path", "local proof", "repeat visit signal"],
    aiReviewChecks: ["unclear offer", "weak visual proof", "booking friction", "review risk"],
    selfEvolutionSignals: ["local demand", "review trend", "seasonal pattern", "conversion blocker"],
  },
  {
    category: "real-estate",
    label: "Real Estate Benchmarks",
    targetReferenceCount: 5,
    status: "candidate",
    selectionStandards: ["strong local authority", "clear lead path", "credible proof", "market education"],
    requiredEvidenceTypes: ["service area", "listing or market proof", "review pattern", "lead path", "authority content"],
    comparisonAreas: ["local authority", "lead capture", "trust", "market clarity", "follow-up readiness"],
    aiReviewChecks: ["unsupported market claim", "weak local proof", "lead path gap", "customer-safe language"],
    selfEvolutionSignals: ["market shift", "lead-quality signal", "authority drift", "recommendation outcome"],
  },
  {
    category: "creator-expert",
    label: "Creator and Expert Benchmarks",
    targetReferenceCount: 5,
    status: "candidate",
    selectionStandards: ["clear expertise", "audience trust", "offer clarity", "conversion-ready authority"],
    requiredEvidenceTypes: ["profile proof", "content proof", "offer page", "testimonial pattern", "contact or purchase path"],
    comparisonAreas: ["authority", "clarity", "proof", "audience trust", "offer path"],
    aiReviewChecks: ["unsupported expertise", "offer confusion", "proof gap", "conversion blocker"],
    selfEvolutionSignals: ["content pattern", "authority signal", "offer performance", "recommendation outcome"],
  },
] as const satisfies readonly BenchmarkIntelligenceControl[];

export function getBenchmarkIntelligenceControls() {
  return BENCHMARK_INTELLIGENCE_CONTROLS;
}

export function getBenchmarkIntelligenceControl(category: BenchmarkIntelligenceCategory) {
  return BENCHMARK_INTELLIGENCE_CONTROLS.find((control) => control.category === category) ?? null;
}
