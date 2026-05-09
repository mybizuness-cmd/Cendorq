import type { ReportPlanStage } from "./report-truth-engine";

export type ReportGrowthSystemRule = {
  key: string;
  label: string;
  requirement: string;
  blockedBehavior: readonly string[];
};

export type PlanReportDepthRule = {
  planStage: ReportPlanStage;
  depthStandard: string;
  conversionStandard: string;
  requiredSections: readonly string[];
  blockedBehavior: readonly string[];
};

export type PlatformRevenueSignalRule = {
  key: string;
  label: string;
  discoveryRequirement: string;
  whenToAccentuate: string;
  requiredEvidence: readonly string[];
  blockedBehavior: readonly string[];
};

export type ReportForecastSectionRule = {
  key: string;
  label: string;
  sectionPurpose: string;
  requiredInputs: readonly string[];
  customerValue: string;
  blockedBehavior: readonly string[];
};

export type RecurringReportValueRule = {
  key: string;
  label: string;
  recurringValue: string;
  whyCustomerReturns: string;
  proofRequired: readonly string[];
  blockedBehavior: readonly string[];
};

export const REPORT_GROWTH_SYSTEM_RULES = [
  {
    key: "truthful-high-conversion",
    label: "Truthful high-conversion reporting",
    requirement: "Every report should be conversion-oriented, but only by making the verified problem, business impact, confidence level, and next logical readiness layer impossible to misunderstand. Conversion must come from clarity and proof, not exaggeration.",
    blockedBehavior: ["lying", "exaggerating", "manufacturing urgency", "creating false issues", "hiding uncertainty", "selling a plan not supported by evidence"],
  },
  {
    key: "section-business-tie-back",
    label: "Every section tied to the analyzed business",
    requirement: "Every report section must explain what the section measures, why it matters, how it is tied to the specific business being analyzed, and what evidence or calculation supports it.",
    blockedBehavior: ["generic section copy", "visuals without explanation", "recommendations not tied to the business", "unsupported section summaries"],
  },
  {
    key: "official-brand-presentation",
    label: "Official branded report presentation",
    requirement: "Every report must look official and Cendorq-branded with approved Cendorq logo, wordmark, report stage, date, methodology version, confidence labels, modern visuals, small footer, and analyzed business logo above or beside the business name when the logo is present and safely matched.",
    blockedBehavior: ["unbranded report", "draft-looking report", "missing methodology version", "guessing a business logo", "using a mismatched business logo", "letting customer branding overpower Cendorq branding"],
  },
  {
    key: "customer-safe-footer",
    label: "Customer-safe footer and guarantee language",
    requirement: "Each report must include a small Cendorq-branded footer that states the report is based on available evidence, observed public signals, customer-provided information where labeled, calculations, and methodology version. It may guarantee a serious evidence-backed review process, transparent methodology, documented findings, and correction of material report errors within the review window. Business outcomes, rankings, traffic, leads, conversions, revenue, platform behavior, or perfect accuracy must never be promised as certain.",
    blockedBehavior: ["legal immunity promise", "ranking certainty", "traffic certainty", "lead certainty", "conversion certainty", "revenue certainty", "attorney approval before legal review"],
  },
  {
    key: "recurring-value-without-fake-lock-in",
    label: "Recurring value without fake lock-in",
    requirement: "Reports must make the real reason for recurring Cendorq work obvious: search, AI answers, competitors, platform behavior, customer expectations, proof signals, and conversion paths keep moving. Recurrence must be earned with fresh evidence, not forced with fear.",
    blockedBehavior: ["fake lock-in", "invented monthly emergency", "subscription pitch without changed evidence", "one-time audit positioning", "hiding cheaper or safer next actions"],
  },
] as const satisfies readonly ReportGrowthSystemRule[];

export const PLAN_REPORT_DEPTH_RULES = [
  {
    planStage: "free-scan",
    depthStandard: "Free Scan must be fast, useful, and honest: it should expose the strongest visible issues, explain uncertainty limits, and avoid pretending to be a complete AI Readiness Review.",
    conversionStandard: "It should promote AI Readiness Review by showing what visible evidence suggests and what Free Scan cannot fully verify without deeper analysis.",
    requiredSections: ["business identity confidence", "highest-confidence visible gaps", "evidence and uncertainty summary", "recommended AI Readiness Review next step"],
    blockedBehavior: ["complete-review claims", "unsupported revenue claims", "fear-only selling", "hiding scan limitations"],
  },
  {
    planStage: "deep-review",
    depthStandard: "AI Readiness Review must be thorough and extensive: it should verify root causes, explore the business model, website, profiles, reviews, social and platform activity, conversion paths, revenue paths, category context, competitive context, technical blockers, trust gaps, priority severity, and the first forecastable movement risks.",
    conversionStandard: "It should promote Signal Repair by proving which issues matter most, why they matter commercially, what repair work is required, and why implementation is the logical next step, without lying, exaggerating, or creating anything false. It should also show when Readiness Control will become valuable if search, competitors, or customer-decision signals continue moving.",
    requiredSections: ["resolved business identity", "business model and revenue context", "visibility and discovery", "trust and reputation", "website and conversion friction", "social media and platform activity", "competitive and category context", "priority severity index", "forecastable movement risks", "recommended Signal Repair path"],
    blockedBehavior: ["shallow review", "unsupported repair recommendation", "invented urgency", "ranking issues without evidence", "overlooking social or platform revenue", "forecast without confidence label"],
  },
  {
    planStage: "build-fix",
    depthStandard: "Signal Repair reporting must translate review into action: it should show approved repairs, implementation sequence, expected outcome type, confidence, evidence, constraints, what remains unverified, and what should be monitored after the repair lands.",
    conversionStandard: "It should promote Readiness Control by showing why measurement, iteration, regression prevention, platform monitoring, competitive movement, and compounding improvements matter after implementation.",
    requiredSections: ["approved Signal Repair scope", "issue-to-repair mapping", "implementation sequence", "expected outcome type without guarantee", "measurement baseline", "post-repair watchlist", "recommended Readiness Control path"],
    blockedBehavior: ["repairs not tied to review", "guaranteed ROI", "ignoring measurement", "claiming implementation alone creates permanent growth", "missing post-repair monitoring need"],
  },
  {
    planStage: "ongoing-control",
    depthStandard: "Readiness Control reporting must monitor progress with comparable baselines, platform changes, AI/search movement, social activity, competitor movement, trust signals, conversion friction, open work, regressions, forecasts, and next actions.",
    conversionStandard: "It should reinforce retention through proof of work, clear next actions, risk prevention, forecast refresh, competitive movement tracking, and honest explanation of what changed, what did not, and what needs continued attention.",
    requiredSections: ["baseline comparison", "progress delta", "source comparability", "AI/search and platform changes", "competitive movement", "completed actions", "regression risks", "forecast refresh", "next-month priorities"],
    blockedBehavior: ["non-comparable progress claims", "vanity metrics as proof", "attributing causation without evidence", "hiding regressions", "generic monthly report", "forecast as fact"],
  },
] as const satisfies readonly PlanReportDepthRule[];

export const REPORT_FORECAST_SECTION_RULES = [
  {
    key: "ai-search-movement-forecast",
    label: "AI/search movement forecast",
    sectionPurpose: "Show how search and AI discovery conditions may affect the business if current clarity, proof, source visibility, and customer-choice signals stay the same.",
    requiredInputs: ["current visibility evidence", "source/link eligibility evidence", "content helpfulness evidence", "business proof evidence", "confidence label", "assumptions", "review horizon"],
    customerValue: "The customer sees why a report is not a one-time snapshot: the search environment can change, the business can drift, and the next review can prevent blind spending.",
    blockedBehavior: ["guaranteed ranking forecast", "exact traffic prediction", "unlabeled assumptions", "AI placement promise", "fear-based forecast"],
  },
  {
    key: "competitive-movement-forecast",
    label: "Competitive movement forecast",
    sectionPurpose: "Show how competitor proof, positioning, reviews, content, platform presence, and conversion paths may change the customer's relative readiness position.",
    requiredInputs: ["public competitor evidence", "category context", "customer-choice signal", "comparison friction", "confidence label", "watchlist trigger"],
    customerValue: "The customer sees what competitors are doing publicly and why Cendorq should re-check movement instead of assuming the market stays still.",
    blockedBehavior: ["private competitor data", "panic language", "copycat recommendation", "unsupported competitor threat", "competitor certainty"],
  },
  {
    key: "customer-decision-forecast",
    label: "Customer decision forecast",
    sectionPurpose: "Show how buyer questions, objections, trust needs, proof expectations, and action friction may evolve if the business keeps the same message and proof structure.",
    requiredInputs: ["current customer-friction evidence", "offer clarity evidence", "trust proof evidence", "review/social signal", "confidence label", "refresh trigger"],
    customerValue: "The customer understands that conversion clarity expires when customer expectations and comparison habits move.",
    blockedBehavior: ["invented customer psychology", "unsupported objection claims", "static buyer assumption", "upsell-only recommendation"],
  },
] as const satisfies readonly ReportForecastSectionRule[];

export const RECURRING_REPORT_VALUE_RULES = [
  {
    key: "freshness-based-return-reason",
    label: "Freshness-based return reason",
    recurringValue: "Every recurring report should show what evidence is fresh, aging, stale, missing, improved, weakened, or newly risky.",
    whyCustomerReturns: "The customer returns because old clarity can become stale, old proof can lose force, competitors can improve, and AI/search surfaces can change what they surface.",
    proofRequired: ["evidence age", "source comparability", "changed signal", "unchanged signal", "recommended refresh timing"],
    blockedBehavior: ["monthly report with no changed evidence", "recurrence without freshness reason", "hiding stale data", "manufacturing change"],
  },
  {
    key: "compounding-value-record",
    label: "Compounding value record",
    recurringValue: "Reports should build on previous reports so the customer sees a compounding readiness record instead of disconnected one-off deliverables.",
    whyCustomerReturns: "The customer returns because Cendorq preserves context, tracks deltas, protects improvements, and shows the next safest move with less waste each cycle.",
    proofRequired: ["previous baseline", "current baseline", "delta explanation", "completed work", "open watchlist", "next priority"],
    blockedBehavior: ["resetting context", "duplicate report language", "no baseline comparison", "selling repeated review without added insight"],
  },
  {
    key: "forecast-refresh-return-reason",
    label: "Forecast-refresh return reason",
    recurringValue: "Reports should explain when a forecast should be refreshed and what event, platform shift, competitor movement, or evidence age would justify returning sooner.",
    whyCustomerReturns: "The customer returns because Cendorq gives a rational monitoring cadence tied to business risk and external movement, not a generic subscription pitch.",
    proofRequired: ["forecast horizon", "confidence label", "trigger condition", "watchlist signal", "business risk level"],
    blockedBehavior: ["generic monthly pitch", "mandatory cadence without evidence", "forecast certainty", "over-monitoring low-risk customers"],
  },
] as const satisfies readonly RecurringReportValueRule[];

export const PLATFORM_REVENUE_SIGNAL_RULES = [
  {
    key: "social-platform-discovery",
    label: "Social and platform discovery",
    discoveryRequirement: "Every business study must consider social media and other platform activity as possible discovery, trust, demand, community, content, booking, sales, and revenue sources.",
    whenToAccentuate: "Accentuate social and platform analysis when evidence shows those channels are a major revenue source, a primary audience channel, or a high-potential growth path.",
    requiredEvidence: ["visible social profiles", "posting/activity recency", "engagement signals", "profile conversion paths", "platform-specific offers or shops", "links to booking, messaging, checkout, lead forms, or communities"],
    blockedBehavior: ["ignoring social revenue", "assuming social is irrelevant", "treating follower count as revenue proof", "claiming social revenue without evidence", "making social the main focus when it is not material"],
  },
  {
    key: "other-platform-revenue",
    label: "Other platform revenue discovery",
    discoveryRequirement: "Reports must consider whether the business earns money or demand from marketplaces, directories, booking platforms, delivery apps, creator platforms, review platforms, communities, app stores, or industry-specific platforms.",
    whenToAccentuate: "Accentuate other-platform analysis when the business visibly sells, books, gets reviewed, builds authority, or captures demand through platforms beyond its own website.",
    requiredEvidence: ["platform profile", "offer or product listing", "booking or purchase path", "reviews or ratings", "audience or activity signals", "linkage to the resolved business identity"],
    blockedBehavior: ["website-only analysis", "missing marketplace channels", "confusing presence with revenue", "using unverified platform identity"],
  },
] as const satisfies readonly PlatformRevenueSignalRule[];

export function getReportGrowthSystemPolicy() {
  return {
    growthSystemRules: REPORT_GROWTH_SYSTEM_RULES,
    planReportDepthRules: PLAN_REPORT_DEPTH_RULES,
    reportForecastSectionRules: REPORT_FORECAST_SECTION_RULES,
    recurringReportValueRules: RECURRING_REPORT_VALUE_RULES,
    platformRevenueSignalRules: PLATFORM_REVENUE_SIGNAL_RULES,
  };
}
