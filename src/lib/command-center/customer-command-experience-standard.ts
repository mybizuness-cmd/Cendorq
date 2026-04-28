export type CustomerCommandExperienceArea =
  | "first-impression"
  | "navigation"
  | "business-command-room"
  | "proof-and-trust"
  | "conversion"
  | "personalization"
  | "progress"
  | "billing"
  | "support"
  | "accessibility"
  | "performance"
  | "brand-moat";

export type CustomerCommandExperienceRule = {
  key: string;
  label: string;
  area: CustomerCommandExperienceArea;
  requirement: string;
  requiredControls: readonly string[];
  blockedBehavior: readonly string[];
};

export type CustomerCommandExperienceZone = {
  key: string;
  label: string;
  purpose: string;
  requiredModules: readonly string[];
  conversionRole: string;
};

export const CUSTOMER_COMMAND_EXPERIENCE_RULES = [
  {
    key: "out-of-this-world-first-impression",
    label: "Out-of-this-world first impression",
    area: "first-impression",
    requirement: "The customer dashboard must immediately feel like a premium business command room: branded, calm, fast, intelligent, personal to the business, and focused on what matters now.",
    requiredControls: ["Cendorq brand shell", "business identity header", "plan badge", "email verification badge", "status pulse", "top business insight", "next best action", "support shortcut"],
    blockedBehavior: ["generic SaaS dashboard", "empty welcome screen", "unclear status", "draft-looking UI", "overwhelming first screen", "missing next step"],
  },
  {
    key: "complete-account-navigation",
    label: "Complete account navigation",
    area: "navigation",
    requirement: "The dashboard must provide clear paths to all customer tasks from the dashboard and account menu: reports, roadmap, billing, profile, businesses, support, settings, plan upgrade, and trust/proof center.",
    requiredControls: ["account menu", "dashboard feature grid", "mobile navigation", "search or command palette readiness", "all-feature paths", "consistent help placement", "breadcrumb or location context"],
    blockedBehavior: ["hidden account feature", "dashboard dead end", "account menu too shallow", "missing billing path", "missing support path", "inconsistent navigation"],
  },
  {
    key: "business-command-room-layout",
    label: "Business command room layout",
    area: "business-command-room",
    requirement: "The dashboard must organize the customer business into a command-room layout: business profile, scan/report status, scorecards, evidence confidence, growth roadmap, saved opportunities, and plan value.",
    requiredControls: ["business profile card", "scorecards", "evidence confidence badges", "growth roadmap", "report vault", "opportunity shelf", "plan value card", "activity timeline"],
    blockedBehavior: ["random card layout", "decorative charts", "no business context", "no evidence confidence", "no roadmap", "no report history"],
  },
  {
    key: "proof-centered-trust-experience",
    label: "Proof-centered trust experience",
    area: "proof-and-trust",
    requirement: "The dashboard must make Cendorq's trust advantage visible: evidence classes, confidence labels, methodology version, guarantee limits, correction window, and why each recommendation is tied to the customer's business.",
    requiredControls: ["evidence legend", "confidence labels", "methodology version", "guarantee limits", "correction window", "recommendation tie-back", "trust and proof center"],
    blockedBehavior: ["black-box score", "unsupported claim", "hidden uncertainty", "missing guarantee limits", "generic recommendation", "no correction path"],
  },
  {
    key: "next-plan-conversion-engine",
    label: "Next-plan conversion engine",
    area: "conversion",
    requirement: "Every dashboard state must show the most truthful next best action: Free Scan to Full Diagnosis, Full Diagnosis to Optimization, Optimization to Monthly Control, and Monthly Control to retention or expansion.",
    requiredControls: ["plan-stage CTA", "evidence-backed reason", "what changes next", "what current plan cannot prove", "plan comparison drawer", "checkout path", "blocked-claim scan"],
    blockedBehavior: ["same CTA for every customer", "fake urgency", "guaranteed outcome wording", "unsupported upsell", "hidden current-plan limits", "conversion without proof"],
  },
  {
    key: "returning-customer-acceleration",
    label: "Returning customer acceleration",
    area: "personalization",
    requirement: "Returning customers must see remembered businesses, open recommendations, prior reports, billing state, scan history, saved opportunities, and fast paths to continue without re-entering known information.",
    requiredControls: ["business switcher", "safe prefill", "continue where left off", "saved opportunities", "open action list", "prior reports", "new business path"],
    blockedBehavior: ["forced re-entry", "wrong business memory", "cross-business leak", "no continue path", "no new business option", "stale plan state"],
  },
  {
    key: "progress-momentum-system",
    label: "Progress momentum system",
    area: "progress",
    requirement: "The dashboard must turn analysis into momentum using progress milestones, action timelines, completed work, open blockers, upcoming steps, monthly deltas, and regression warnings.",
    requiredControls: ["milestone tracker", "action timeline", "completed work", "open blockers", "monthly deltas", "regression warnings", "next checkpoint"],
    blockedBehavior: ["static report dump", "no progress state", "no completed work", "hidden regression", "non-comparable trend", "no next checkpoint"],
  },
  {
    key: "billing-without-friction",
    label: "Billing without friction",
    area: "billing",
    requirement: "Billing and plan management must feel seamless: current plan, entitlements, invoices, checkout, billing portal, failed payment recovery, renewal state, and upgrade paths must be visible and truthful.",
    requiredControls: ["current plan", "entitlements", "invoice links", "checkout", "billing portal", "failed payment recovery", "renewal status", "upgrade path"],
    blockedBehavior: ["unclear billing state", "paid access without entitlement", "missing invoice path", "manual-only upgrade", "hidden cancellation/support path", "stale subscription state"],
  },
  {
    key: "premium-help-and-support",
    label: "Premium help and support",
    area: "support",
    requirement: "Help must be consistent, visible, and context-aware across dashboard states, including support, correction requests, billing help, report questions, and plan guidance.",
    requiredControls: ["consistent help location", "contextual support CTA", "correction request path", "billing support", "report question path", "plan guidance", "response expectation copy"],
    blockedBehavior: ["hidden help", "different support location by page", "no correction request path", "no billing support", "support dead end"],
  },
  {
    key: "accessible-authenticated-dashboard",
    label: "Accessible authenticated dashboard",
    area: "accessibility",
    requirement: "The dashboard must be designed for WCAG 2.2-aware accessibility: visible focus, usable target sizes, consistent help, accessible authentication, redundant entry reduction, keyboard support, readable contrast, and non-drag alternatives.",
    requiredControls: ["focus visibility", "target size", "consistent help", "accessible authentication", "reduced redundant entry", "keyboard navigation", "contrast", "non-drag alternative"],
    blockedBehavior: ["keyboard trap", "focus hidden", "tiny target", "drag-only control", "repeated forced input", "auth puzzle without accessible alternative"],
  },
  {
    key: "fast-premium-performance",
    label: "Fast premium performance",
    area: "performance",
    requirement: "The dashboard must remain fast, stable, and confidence-building under load, using skeleton states, bounded queries, safe caching, progressive disclosure, and no private data leaks.",
    requiredControls: ["skeleton states", "bounded queries", "safe cache key", "progressive disclosure", "optimistic-safe UI", "error states", "observability"],
    blockedBehavior: ["blank loading", "unbounded dashboard query", "cross-customer cache", "slow first action", "raw error", "private data in analytics"],
  },
  {
    key: "brand-moat-experience",
    label: "Brand moat experience",
    area: "brand-moat",
    requirement: "The dashboard must protect Cendorq's long-term business interests by making Cendorq the customer's trusted operating layer for evidence, reports, billing, progress, recommendations, support, and business improvement history.",
    requiredControls: ["Cendorq-owned dashboard relationship", "report vault", "customer history", "plan progression", "trust center", "billing center", "lifecycle messaging", "customer data boundaries"],
    blockedBehavior: ["one-off report relationship", "export-only experience", "no account memory", "no long-term plan path", "no trust center", "weak brand ownership"],
  },
] as const satisfies readonly CustomerCommandExperienceRule[];

export const CUSTOMER_COMMAND_EXPERIENCE_ZONES = [
  {
    key: "mission-control-hero",
    label: "Mission control hero",
    purpose: "The top dashboard zone that shows the business, current plan, verification, scan/report state, strongest insight, and next best action.",
    requiredModules: ["business identity", "plan badge", "verification badge", "status pulse", "strongest insight", "next best action", "support shortcut"],
    conversionRole: "Converts by making the next step obvious, specific, and evidence-backed.",
  },
  {
    key: "proof-grid",
    label: "Proof grid",
    purpose: "A modern visual grid showing visibility, trust, conversion, social/platform, and confidence summaries tied to evidence.",
    requiredModules: ["scorecards", "confidence chips", "evidence counts", "visual trend", "methodology version", "detail drawer"],
    conversionRole: "Builds confidence and makes deeper diagnosis feel necessary when limits are visible.",
  },
  {
    key: "roadmap-command-timeline",
    label: "Roadmap command timeline",
    purpose: "Turns findings into an ordered action sequence with completed work, open blockers, next milestones, and plan requirements.",
    requiredModules: ["priority sequence", "open blockers", "completed actions", "plan required", "impact explanation", "next checkpoint"],
    conversionRole: "Shows why Optimization or Monthly Control is the natural next step.",
  },
  {
    key: "business-memory-vault",
    label: "Business memory vault",
    purpose: "A persistent account memory for business profiles, reports, scans, invoices, corrections, saved opportunities, and plan history.",
    requiredModules: ["business switcher", "report vault", "scan history", "invoice history", "correction history", "saved opportunities", "plan history"],
    conversionRole: "Creates long-term platform ownership and makes return visits easier.",
  },
  {
    key: "upgrade-lab",
    label: "Upgrade lab",
    purpose: "A truthful plan comparison and checkout zone tailored to the customer's current stage and evidence.",
    requiredModules: ["current plan limits", "next plan unlocks", "evidence-backed reason", "pricing summary", "checkout CTA", "guarantee-safe language"],
    conversionRole: "Maximizes conversion through clarity, proof, and frictionless action.",
  },
] as const satisfies readonly CustomerCommandExperienceZone[];

export function getCustomerCommandExperienceStandard() {
  return {
    rules: CUSTOMER_COMMAND_EXPERIENCE_RULES,
    zones: CUSTOMER_COMMAND_EXPERIENCE_ZONES,
  };
}
