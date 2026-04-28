export type MarketLearningSignalClass =
  | "business-study-pattern"
  | "category-performance-pattern"
  | "advertising-model-pattern"
  | "social-platform-pattern"
  | "search-platform-pattern"
  | "conversion-system-pattern"
  | "pricing-packaging-pattern"
  | "customer-demand-pattern"
  | "public-competitor-pattern"
  | "operator-reviewed-pattern";

export type MarketLearningRule = {
  key: string;
  label: string;
  requirement: string;
  requiredEvidence: readonly MarketLearningSignalClass[];
  blockedBehavior: readonly string[];
};

export type SelfEvolutionControlRule = {
  key: string;
  label: string;
  evolutionPurpose: string;
  approvalGate: string;
  blockedBehavior: readonly string[];
};

export type CendorqLeverageRule = {
  key: string;
  label: string;
  opportunityType: string;
  discoveryPolicy: string;
  monetizationPolicy: string;
  blockedBehavior: readonly string[];
};

export const CONTROLLED_MARKET_LEARNING_RULES = [
  {
    key: "cross-business-pattern-learning",
    label: "Cross-business pattern learning",
    requirement: "After enough businesses are studied, Cendorq may identify recurring patterns by category, market, advertising model, platform mix, funnel type, revenue path, trust gap, and conversion blocker, but only when the pattern is supported by stored evidence and confidence labels.",
    requiredEvidence: ["business-study-pattern", "category-performance-pattern", "advertising-model-pattern", "conversion-system-pattern", "operator-reviewed-pattern"],
    blockedBehavior: ["learning from anecdotes as facts", "using one business as a universal rule", "hiding sample size", "ignoring confidence", "exposing customer-private data"],
  },
  {
    key: "market-direction-intelligence",
    label: "Market direction intelligence",
    requirement: "Cendorq should track what is working now, what is weakening, what is emerging, and where demand appears to be moving, while separating observed evidence from strategic forecast.",
    requiredEvidence: ["business-study-pattern", "customer-demand-pattern", "public-competitor-pattern", "search-platform-pattern", "social-platform-pattern"],
    blockedBehavior: ["presenting forecasts as facts", "copying competitor proprietary material", "using private competitor access", "claiming market certainty", "making unsupported 2-year 5-year 10-year 20-year or 100-year predictions"],
  },
  {
    key: "advertising-model-understanding",
    label: "Advertising model understanding",
    requirement: "The system should study different advertising models, channels, offers, funnels, creatives, social/platform activity, and conversion paths to understand what works for different categories and revenue contexts.",
    requiredEvidence: ["advertising-model-pattern", "social-platform-pattern", "search-platform-pattern", "conversion-system-pattern", "pricing-packaging-pattern"],
    blockedBehavior: ["assuming one advertising model works for every business", "ignoring platform-specific economics", "ignoring offline or referral revenue", "claiming campaign performance without verified data"],
  },
  {
    key: "privacy-safe-aggregation",
    label: "Privacy-safe aggregation",
    requirement: "Market learning must aggregate and abstract patterns without exposing customer identities, private records, raw evidence, confidential reports, private revenue, prompts, exact scoring weights, or proprietary customer details.",
    requiredEvidence: ["operator-reviewed-pattern"],
    blockedBehavior: ["customer data leakage", "raw evidence reuse", "private revenue disclosure", "identifiable customer benchmarking without consent", "training on restricted private data without policy"],
  },
] as const satisfies readonly MarketLearningRule[];

export const SELF_EVOLUTION_CONTROL_RULES = [
  {
    key: "review-gated-evolution",
    label: "Review-gated evolution",
    evolutionPurpose: "Use market learning to improve report methods, scoring assumptions, plan positioning, product strategy, and internal opportunity discovery.",
    approvalGate: "No learned pattern can change customer-facing reports, pricing, plan promises, scoring, recommendations, or AI behavior until it is reviewed, versioned, tested, and approved.",
    blockedBehavior: ["autonomous production changes", "agent drift", "unreviewed prompt changes", "silent scoring changes", "unapproved customer-facing claims"],
  },
  {
    key: "strict-agent-boundaries",
    label: "Strict agent boundaries",
    evolutionPurpose: "Keep report agents focused on verified evidence, approved methods, assigned business category, active plan stage, and customer-safe recommendations.",
    approvalGate: "Agents must stay inside the approved report truth engine, report growth system, validation registry, customer-output approval, and AI command history policies.",
    blockedBehavior: ["deviation from approved playbooks", "inventing new methods live", "using unsupported strategies", "changing report tone into hype", "bypassing approval gates"],
  },
  {
    key: "versioned-method-upgrades",
    label: "Versioned method upgrades",
    evolutionPurpose: "Improve Cendorq methods as stronger evidence appears while preserving auditability and rollback.",
    approvalGate: "Every method change must record source evidence, sample scope, hypothesis, test result, affected plan stages, risk, owner, approval status, and rollback path.",
    blockedBehavior: ["unversioned method changes", "no rollback path", "no evidence record", "no owner", "changing historical report meaning silently"],
  },
] as const satisfies readonly SelfEvolutionControlRule[];

export const CENDORQ_LEVERAGE_RULES = [
  {
    key: "new-income-source-discovery",
    label: "New income source discovery",
    opportunityType: "Cendorq product and revenue expansion",
    discoveryPolicy: "When repeated business studies reveal recurring high-value needs, unmet market demand, underserved categories, or repeatable fixes, Cendorq may identify new service lines, report modules, vertical offers, platform integrations, data products, or subscription controls.",
    monetizationPolicy: "New Cendorq revenue opportunities must be validated with evidence, customer value, operational feasibility, pricing logic, risk review, and brand fit before being offered.",
    blockedBehavior: ["launching unsupported offers", "exploiting customer data", "overpromising demand", "copying competitors blindly", "adding revenue streams that weaken trust"],
  },
  {
    key: "category-expansion-intelligence",
    label: "Category expansion intelligence",
    opportunityType: "New category and country expansion",
    discoveryPolicy: "Cendorq should identify countries, languages, categories, and business types where demand, public evidence availability, local platform coverage, and operational fit make the service effective.",
    monetizationPolicy: "Expansion should require localization readiness, legal/regulatory review where needed, local-platform support, language quality, and evidence-backed demand before scale.",
    blockedBehavior: ["expanding where reports cannot be accurate", "unsupported language claims", "ignoring local laws", "US-only assumptions", "global claims without local validation"],
  },
  {
    key: "platform-leverage-intelligence",
    label: "Platform leverage intelligence",
    opportunityType: "Social, marketplace, search, and platform growth leverage",
    discoveryPolicy: "When social media or another platform is material to a business model, Cendorq should learn the repeatable patterns that help that business use the platform better while still diversifying risk through other channels when appropriate.",
    monetizationPolicy: "Platform-focused offers should be created only when evidence shows repeatable customer value and Cendorq can explain the method transparently without claiming guaranteed platform outcomes.",
    blockedBehavior: ["single-platform dependency as default", "guaranteed algorithm outcomes", "follower-count vanity offers", "platform revenue claims without evidence"],
  },
] as const satisfies readonly CendorqLeverageRule[];

export function getControlledMarketLearningPolicy() {
  return {
    marketLearningRules: CONTROLLED_MARKET_LEARNING_RULES,
    selfEvolutionControlRules: SELF_EVOLUTION_CONTROL_RULES,
    cendorqLeverageRules: CENDORQ_LEVERAGE_RULES,
  };
}
