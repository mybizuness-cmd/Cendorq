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

export const REPORT_GROWTH_SYSTEM_RULES = [
  {
    key: "truthful-high-conversion",
    label: "Truthful high-conversion reporting",
    requirement: "Every report should be conversion-oriented, but only by making the verified problem, business impact, confidence level, and next logical plan impossible to misunderstand. Conversion must come from clarity and proof, not exaggeration.",
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
] as const satisfies readonly ReportGrowthSystemRule[];

export const PLAN_REPORT_DEPTH_RULES = [
  {
    planStage: "free-scan",
    depthStandard: "Free Scan must be fast, useful, and honest: it should expose the strongest visible issues, explain uncertainty limits, and avoid pretending to be a complete diagnosis.",
    conversionStandard: "It should promote Full Diagnosis by showing what visible evidence suggests and what Free Scan cannot fully verify without deeper analysis.",
    requiredSections: ["business identity confidence", "highest-confidence visible gaps", "evidence and uncertainty summary", "recommended Full Diagnosis next step"],
    blockedBehavior: ["complete-diagnosis claims", "unsupported revenue claims", "fear-only selling", "hiding scan limitations"],
  },
  {
    planStage: "full-diagnosis",
    depthStandard: "Full Diagnosis must be thorough and extensive: it should verify root causes, explore the business model, website, profiles, reviews, social and platform activity, conversion paths, revenue paths, category context, competitive context, technical blockers, trust gaps, and priority severity.",
    conversionStandard: "It should promote Optimization by proving which issues matter most, why they matter commercially, what fixes are required, and why implementation is the logical next step, without lying, exaggerating, or creating anything false.",
    requiredSections: ["resolved business identity", "business model and revenue context", "visibility and discovery", "trust and reputation", "website and conversion friction", "social media and platform activity", "competitive and category context", "priority severity index", "recommended Optimization path"],
    blockedBehavior: ["shallow diagnosis", "unsupported fix recommendation", "invented urgency", "ranking issues without evidence", "overlooking social or platform revenue"],
  },
  {
    planStage: "optimization",
    depthStandard: "Optimization reporting must translate diagnosis into action: it should show approved fixes, implementation sequence, expected outcome type, confidence, evidence, constraints, and what remains unverified.",
    conversionStandard: "It should promote Monthly Control by showing why measurement, iteration, regression prevention, platform monitoring, and compounding improvements matter after implementation.",
    requiredSections: ["approved optimization scope", "issue-to-fix mapping", "implementation sequence", "expected outcome type without guarantee", "measurement baseline", "recommended Monthly Control path"],
    blockedBehavior: ["fixes not tied to diagnosis", "guaranteed ROI", "ignoring measurement", "claiming implementation alone creates permanent growth"],
  },
  {
    planStage: "monthly-control",
    depthStandard: "Monthly Control reporting must monitor progress with comparable baselines, platform changes, social and search activity, trust signals, conversion friction, open work, regressions, and next actions.",
    conversionStandard: "It should reinforce retention through proof of work, clear next actions, risk prevention, and honest explanation of what changed, what did not, and what needs continued attention.",
    requiredSections: ["baseline comparison", "progress delta", "source comparability", "platform and social changes", "completed actions", "regression risks", "next-month priorities"],
    blockedBehavior: ["non-comparable progress claims", "vanity metrics as proof", "attributing causation without evidence", "hiding regressions"],
  },
] as const satisfies readonly PlanReportDepthRule[];

export const PLATFORM_REVENUE_SIGNAL_RULES = [
  {
    key: "social-platform-discovery",
    label: "Social and platform discovery",
    discoveryRequirement: "Every business study must consider social media and other platform activity as possible discovery, trust, demand, community, content, booking, sales, and revenue sources.",
    whenToAccentuate: "Accentuate social and platform analysis when evidence shows those channels are the business's bread and butter, a major revenue source, a primary audience channel, or a high-potential growth path.",
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
    platformRevenueSignalRules: PLATFORM_REVENUE_SIGNAL_RULES,
  };
}
