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

export type RecurringValueMoatRule = {
  key: string;
  label: string;
  customerValue: string;
  recurrenceReason: string;
  requiredEvidence: readonly MarketLearningSignalClass[];
  blockedBehavior: readonly string[];
};

export type ForecastGovernanceRule = {
  key: string;
  label: string;
  forecastPurpose: string;
  confidencePolicy: string;
  requiredEvidence: readonly MarketLearningSignalClass[];
  blockedBehavior: readonly string[];
};

export type SelectivePlacementRule = {
  key: string;
  label: string;
  placementPolicy: string;
  strongestSurfaces: readonly string[];
  lightHintSurfaces: readonly string[];
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

export const SELECTIVE_RECURRING_VALUE_PLACEMENT_RULES = [
  {
    key: "selective-not-everywhere",
    label: "Selective recurring value placement",
    placementPolicy: "Recurring value should be strongest where it naturally matters: report findings, Readiness Control, forecast refresh, dashboard watchlists, and post-repair monitoring. Other public surfaces may hint calmly, but must not repeat the same subscription argument everywhere.",
    strongestSurfaces: ["AI Readiness Review report", "Signal Repair post-repair watchlist", "Readiness Control report", "dashboard readiness watchlist", "forecast refresh note"],
    lightHintSurfaces: ["homepage", "plans overview", "Free Scan result", "footer", "confirmation email"],
    blockedBehavior: ["recurring pitch on every block", "loud subscription pressure", "fake urgency", "same sentence repeated across pages", "turning every CTA into Readiness Control"],
  },
  {
    key: "enterprise-style-retention",
    label: "Enterprise-style retention discipline",
    placementPolicy: "Model the retention posture after strong subscription and customer-success businesses: provide ongoing value, prove progress, reduce customer work, make the next step obvious, and give customers a reason to stay because the product keeps helping them make better decisions.",
    strongestSurfaces: ["customer dashboard", "report vault", "billing entitlement state", "monthly control summary", "support follow-up"],
    lightHintSurfaces: ["public plan copy", "email subject strategy", "not-found and error recovery"],
    blockedBehavior: ["retention by confusion", "forced lock-in", "hiding cancellation or scope boundaries", "overexplaining enterprise strategy in buyer copy", "making the product feel needy"],
  },
] as const satisfies readonly SelectivePlacementRule[];

export const RECURRING_VALUE_MOAT_RULES = [
  {
    key: "search-and-ai-volatility-review",
    label: "Search and AI volatility review",
    customerValue: "Where evidence supports it, show that search behavior, AI answer surfaces, source-link patterns, local visibility, social proof, and comparison paths can change faster than a one-time report can safely cover.",
    recurrenceReason: "Recurring review is positioned as a readiness radar only when there is a real signal to watch: what changed, what weakened, what competitors improved, what platforms shifted, or what action is safest now.",
    requiredEvidence: ["search-platform-pattern", "social-platform-pattern", "customer-demand-pattern", "operator-reviewed-pattern"],
    blockedBehavior: ["fake urgency", "invented algorithm claims", "claiming guaranteed search placement", "one-time report dependency", "using fear instead of evidence", "making volatility the headline everywhere"],
  },
  {
    key: "competitive-movement-review",
    label: "Competitive movement review",
    customerValue: "When competitive evidence exists, reports should make public competitor movement visible without panic: positioning, proof, offers, reviews, content, platform activity, conversion paths, and customer-choice signals.",
    recurrenceReason: "A business has a reason to return when Cendorq can calmly show whether competitors are gaining trust, clarity, visibility, or conversion advantage and what response is evidence-backed.",
    requiredEvidence: ["public-competitor-pattern", "category-performance-pattern", "business-study-pattern", "operator-reviewed-pattern"],
    blockedBehavior: ["copying competitors blindly", "using private competitor data", "unsupported competitive threats", "turning competitor movement into panic", "one-size-fits-all recommendations", "competitor talk with no evidence"],
  },
  {
    key: "customer-decision-drift-review",
    label: "Customer decision drift review",
    customerValue: "Cendorq should identify when customer questions, objections, trust expectations, platform habits, and comparison criteria change so the business does not keep selling with stale language.",
    recurrenceReason: "Recurring value comes from keeping the business easier to find, understand, trust, and choose as customers change how they search, compare, and decide.",
    requiredEvidence: ["customer-demand-pattern", "conversion-system-pattern", "social-platform-pattern", "search-platform-pattern", "operator-reviewed-pattern"],
    blockedBehavior: ["static buyer assumptions", "claiming customer intent without evidence", "ignoring new objections", "ignoring changed platform behavior", "outdated messaging as default"],
  },
  {
    key: "compounding-readiness-record",
    label: "Compounding readiness record",
    customerValue: "Recurring reports should leave the customer with a clean record of what changed, what improved, what still needs attention, what is newly risky, and what should be reviewed next.",
    recurrenceReason: "The customer keeps coming back because Cendorq preserves context and continuity, not because every surface loudly asks them to come back.",
    requiredEvidence: ["business-study-pattern", "conversion-system-pattern", "search-platform-pattern", "public-competitor-pattern", "operator-reviewed-pattern"],
    blockedBehavior: ["resetting context every report", "hiding unresolved work", "manufacturing new problems", "recommending more work without changed evidence", "making recurrence feel arbitrary", "recurring pitch without changed context"],
  },
] as const satisfies readonly RecurringValueMoatRule[];

export const FORECAST_GOVERNANCE_RULES = [
  {
    key: "evidence-backed-forecasting",
    label: "Evidence-backed forecasting",
    forecastPurpose: "Forecasts may show likely direction, momentum, risk, and opportunity windows when grounded in observed platform changes, public competitor movement, customer demand signals, historical report baselines, and operator-reviewed assumptions.",
    confidencePolicy: "Every forecast must label confidence, evidence inputs, assumptions, time horizon, what would change the forecast, and what is unknown. Forecasts are directional decision aids, not guarantees.",
    requiredEvidence: ["search-platform-pattern", "customer-demand-pattern", "public-competitor-pattern", "business-study-pattern", "operator-reviewed-pattern"],
    blockedBehavior: ["forecast as fact", "guaranteed rankings", "guaranteed revenue", "exact future traffic claims", "hidden assumptions", "long-range certainty", "forecast section on thin evidence"],
  },
  {
    key: "forecast-to-next-action",
    label: "Forecast-to-next-action translation",
    forecastPurpose: "Forecast sections should convert market movement into the safest next readiness move, such as wait, monitor, review deeper, repair a scoped weakness, or move into recurring control.",
    confidencePolicy: "Recommendations must separate urgent evidence-backed action from watchlist items, and must explain why the timing is safe rather than merely profitable for Cendorq.",
    requiredEvidence: ["business-study-pattern", "conversion-system-pattern", "search-platform-pattern", "operator-reviewed-pattern"],
    blockedBehavior: ["upsell-only forecast", "unprioritized forecast clutter", "urgency without evidence", "action recommendations with weak confidence", "hiding lower-cost options"],
  },
  {
    key: "forecast-refresh-cadence",
    label: "Forecast refresh cadence",
    forecastPurpose: "Reports should explain when the next review is useful because the underlying market, search, social, competitor, or customer-decision signals are likely to move again.",
    confidencePolicy: "Cadence must be justified by category volatility, platform volatility, competitive movement, business risk, and evidence freshness instead of a generic subscription pitch.",
    requiredEvidence: ["category-performance-pattern", "search-platform-pattern", "social-platform-pattern", "public-competitor-pattern", "operator-reviewed-pattern"],
    blockedBehavior: ["generic monthly pitch", "recurrence without reason", "over-monitoring low-risk accounts", "ignoring evidence freshness", "claiming a cadence is mandatory without proof"],
  },
] as const satisfies readonly ForecastGovernanceRule[];

export const SELF_EVOLUTION_CONTROL_RULES = [
  {
    key: "review-gated-evolution",
    label: "Review-gated evolution",
    evolutionPurpose: "Use market learning to improve report methods, scoring assumptions, plan positioning, product strategy, selective recurring value architecture, forecast logic, and internal opportunity discovery.",
    approvalGate: "No learned pattern can change customer-facing reports, pricing, plan promises, scoring, recommendations, forecasts, cadence recommendations, or AI behavior until it is reviewed, versioned, tested, and approved.",
    blockedBehavior: ["autonomous production changes", "agent drift", "unreviewed prompt changes", "silent scoring changes", "unapproved customer-facing claims"],
  },
  {
    key: "strict-agent-boundaries",
    label: "Strict agent boundaries",
    evolutionPurpose: "Keep report agents focused on verified evidence, approved methods, assigned business category, active plan stage, customer-safe forecasts, and customer-safe recommendations.",
    approvalGate: "Agents must stay inside the approved report truth engine, report growth system, forecast governance, validation registry, customer-output approval, and AI command history policies.",
    blockedBehavior: ["deviation from approved playbooks", "inventing new methods live", "using unsupported strategies", "changing report tone into hype", "bypassing approval gates"],
  },
  {
    key: "versioned-method-upgrades",
    label: "Versioned method upgrades",
    evolutionPurpose: "Improve Cendorq methods as stronger evidence appears while preserving auditability and rollback.",
    approvalGate: "Every method change must record source evidence, sample scope, hypothesis, test result, affected plan stages, affected forecast sections, affected cadence recommendations, risk, owner, approval status, and rollback path.",
    blockedBehavior: ["unversioned method changes", "no rollback path", "no evidence record", "no owner", "changing historical report meaning silently"],
  },
] as const satisfies readonly SelfEvolutionControlRule[];

export const CENDORQ_LEVERAGE_RULES = [
  {
    key: "new-income-source-discovery",
    label: "New income source discovery",
    opportunityType: "Cendorq product and revenue expansion",
    discoveryPolicy: "When repeated business studies reveal recurring high-value needs, unmet market demand, underserved categories, forecast needs, competitive monitoring needs, or repeatable repairs, Cendorq may identify new service lines, report modules, vertical offers, platform integrations, data products, or subscription controls.",
    monetizationPolicy: "New Cendorq revenue opportunities must be validated with evidence, customer value, operational feasibility, pricing logic, risk review, brand fit, and selective placement before being offered.",
    blockedBehavior: ["launching unsupported offers", "exploiting customer data", "overpromising demand", "copying competitors blindly", "adding revenue streams that weaken trust"],
  },
  {
    key: "category-expansion-intelligence",
    label: "Category expansion intelligence",
    opportunityType: "New category and country expansion",
    discoveryPolicy: "Cendorq should identify countries, languages, categories, and business types where demand, public evidence availability, local platform coverage, competitive volatility, recurring review value, and operational fit make the service effective.",
    monetizationPolicy: "Expansion should require localization readiness, legal/regulatory review where needed, local-platform support, language quality, and evidence-backed demand before scale.",
    blockedBehavior: ["expanding where reports cannot be accurate", "unsupported language claims", "ignoring local laws", "US-only assumptions", "global claims without local validation"],
  },
  {
    key: "platform-leverage-intelligence",
    label: "Platform leverage intelligence",
    opportunityType: "Social, marketplace, search, and platform growth leverage",
    discoveryPolicy: "When social media, search, AI answers, marketplaces, directories, or another platform is material to a business model, Cendorq should learn the repeatable patterns that help that business use the platform better while still diversifying risk through other channels when appropriate.",
    monetizationPolicy: "Platform-focused offers should be created only when evidence shows repeatable customer value and Cendorq can explain the method transparently without claiming guaranteed platform outcomes.",
    blockedBehavior: ["single-platform dependency as default", "guaranteed algorithm outcomes", "follower-count vanity offers", "platform revenue claims without evidence"],
  },
] as const satisfies readonly CendorqLeverageRule[];

export function getControlledMarketLearningPolicy() {
  return {
    marketLearningRules: CONTROLLED_MARKET_LEARNING_RULES,
    selectiveRecurringValuePlacementRules: SELECTIVE_RECURRING_VALUE_PLACEMENT_RULES,
    recurringValueMoatRules: RECURRING_VALUE_MOAT_RULES,
    forecastGovernanceRules: FORECAST_GOVERNANCE_RULES,
    selfEvolutionControlRules: SELF_EVOLUTION_CONTROL_RULES,
    cendorqLeverageRules: CENDORQ_LEVERAGE_RULES,
  };
}
