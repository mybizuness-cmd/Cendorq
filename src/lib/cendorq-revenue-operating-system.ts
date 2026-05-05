export type CendorqRevenueStageKey =
  | "first-signal"
  | "paid-diagnosis"
  | "paid-implementation"
  | "recurring-control";

export type CendorqRevenueStage = {
  key: CendorqRevenueStageKey;
  customerName: string;
  planName: string;
  price: string;
  businessPurpose: string;
  customerFeeling: string;
  conversionJob: string;
  dashboardState: string;
  backendWorkflow: string;
  requiredCustomerContext: readonly string[];
  emailMoment: string;
  nextBestAction: string;
};

export const CENDORQ_REVENUE_OPERATING_SYSTEM = [
  {
    key: "first-signal",
    customerName: "Find the first reason",
    planName: "Free Scan",
    price: "$0",
    businessPurpose: "Turn anonymous interest into a verified customer account and a dashboard relationship.",
    customerFeeling: "This feels useful before I pay, and it shows me what might be costing choices.",
    conversionJob: "Earn the first paid step by showing a clear limitation, evidence gap, or unresolved cause.",
    dashboardState: "Verified customer workspace with scan status, first-read progress, report vault entry, billing path, notifications, and support recovery.",
    backendWorkflow: "Create account, verify email, create business profile shell, start scan record, and prepare recommendation state.",
    requiredCustomerContext: [
      "Business name and website or primary link",
      "Primary offer or service",
      "Target customer",
      "Location or market served",
      "Main concern or goal",
    ],
    emailMoment: "Verified welcome plus scan continuation if the first read is incomplete.",
    nextBestAction: "Continue the Free Scan or unlock Deep Review when the cause is not clear enough to fix yet.",
  },
  {
    key: "paid-diagnosis",
    customerName: "Get the full reason",
    planName: "Deep Review",
    price: "$497",
    businessPurpose: "Convert uncertainty into an evidence-backed diagnosis before the customer buys fixes, ads, or redesign work.",
    customerFeeling: "Now I understand why customers hesitate and what deserves money first.",
    conversionJob: "Move from free signal to paid diagnosis by making the cost of guessing feel larger than the price of clarity.",
    dashboardState: "Paid diagnosis unlocked with report status, required context, evidence progress, billing record, and report vault destination.",
    backendWorkflow: "Create Deep Review order, entitlement, diagnosis queue item, evidence checklist, report shell, notification, and kickoff email.",
    requiredCustomerContext: [
      "Business URL or main page to review",
      "Most important customer action",
      "Top customer type",
      "Main concern or question",
      "Known competitors or alternatives",
      "Any existing Free Scan result or report id",
    ],
    emailMoment: "Deep Review is unlocked. Confirm the focus so the diagnosis can begin.",
    nextBestAction: "Confirm the review focus and track report progress in the dashboard.",
  },
  {
    key: "paid-implementation",
    customerName: "Fix what costs choices",
    planName: "Build Fix",
    price: "$1,497",
    businessPurpose: "Turn known friction into a concrete customer-facing improvement that can help conversion.",
    customerFeeling: "The weak part is getting handled, and I know what Cendorq needs from me.",
    conversionJob: "Move diagnosed customers into implementation when the problem is clear enough to improve now.",
    dashboardState: "Build Fix unlocked with implementation intake, current priority, approved business details, support route, and delivery progress.",
    backendWorkflow: "Create Build Fix order, entitlement, implementation workspace, asset/context checklist, owner task, notification, and kickoff email.",
    requiredCustomerContext: [
      "Page, section, offer, or action path to improve",
      "Approved business description",
      "Brand constraints and tone boundaries",
      "Primary CTA or contact path",
      "Proof, reviews, examples, or assets available",
      "Approval contact",
    ],
    emailMoment: "Build Fix is unlocked. Confirm the page, offer, and approved details.",
    nextBestAction: "Confirm the fix details and track implementation progress inside the dashboard.",
  },
  {
    key: "recurring-control",
    customerName: "Keep monthly control",
    planName: "Ongoing Control",
    price: "$597/month",
    businessPurpose: "Create recurring revenue by keeping visibility, trust, customer friction, and revenue movement under monthly watch.",
    customerFeeling: "Cendorq is watching the business with me, not leaving me after one report.",
    conversionJob: "Retain customers who need continuous improvement, changing-market awareness, and monthly decision support.",
    dashboardState: "Active subscription with monthly priority, recurring review cycle, alerts, report history, billing state, and support path.",
    backendWorkflow: "Create subscription entitlement, monthly control cycle, monitoring checklist, recurring report queue, notification schedule, and kickoff email.",
    requiredCustomerContext: [
      "Monthly priority",
      "Target channels to watch",
      "Competitor set",
      "Reporting preference",
      "Approval contact",
      "Known launches, campaigns, or market changes",
    ],
    emailMoment: "Ongoing Control is active. Choose this month’s focus.",
    nextBestAction: "Set the first monthly focus and review the dashboard control state.",
  },
] as const satisfies readonly CendorqRevenueStage[];

export const CENDORQ_BUSINESS_ARCHITECTURE_RULES = [
  "Every visible customer surface must answer what the customer should do next.",
  "Every paid plan must unlock a workflow, not just a receipt.",
  "Every checkout must return to a Cendorq success state and be fulfilled by backend payment confirmation.",
  "Every dashboard block must either clarify status, recover friction, or move the customer toward the right paid depth.",
  "Every email must be either transactional, lifecycle, or marketing; transactional delivery must not depend on marketing consent.",
  "Every mobile screen must lead with the action that creates the most customer and business value.",
  "Every support path must resolve anxiety without exposing private internal records or making unsupported promises.",
  "Every validator should protect real contracts and routes, not force generic hidden copy into customer pages.",
] as const;

export const CENDORQ_PLAN_PERSONALIZATION_FIELDS = {
  "deep-review": [
    "review_focus",
    "business_url",
    "target_customer",
    "main_offer",
    "main_concern",
    "competitors",
    "scan_id",
  ],
  "build-fix": [
    "fix_target",
    "approved_business_description",
    "primary_cta",
    "brand_constraints",
    "available_assets",
    "approval_contact",
  ],
  "ongoing-control": [
    "monthly_priority",
    "channels_to_watch",
    "competitor_set",
    "reporting_preference",
    "approval_contact",
    "known_market_changes",
  ],
} as const;

export function getCendorqRevenueStage(planName: string) {
  return CENDORQ_REVENUE_OPERATING_SYSTEM.find((stage) => stage.planName === planName) || CENDORQ_REVENUE_OPERATING_SYSTEM[0];
}
