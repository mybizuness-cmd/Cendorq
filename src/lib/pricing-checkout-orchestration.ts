import { projectPlanValueCommunication } from "@/lib/plan-value-communication-runtime";

export type CendorqPaidPlanKey = "deep-review" | "build-fix" | "ongoing-control";
export type CendorqPlanKey = "free-scan" | CendorqPaidPlanKey;

export type CendorqPlanPrice = {
  key: CendorqPlanKey;
  name: string;
  publicName: string;
  price: string;
  amountCents: number;
  stripeMode: "none" | "payment" | "subscription";
  cadence: string;
  checkoutPath: string;
  successPath: string;
  primaryCustomerPromise: string;
  revenueRole: string;
  afterPaymentNextStep: string;
  backendStartSignal: string;
};

export const CENDORQ_PLAN_PRICES = [
  {
    key: "free-scan",
    name: "Free Scan",
    publicName: "Cendorq Free Scan",
    price: "$0",
    amountCents: 0,
    stripeMode: "none",
    cadence: "first signal",
    checkoutPath: "/free-check",
    successPath: "/dashboard",
    primaryCustomerPromise: "Find the first visible reason AI engines or customers may misunderstand the business before spending on the wrong repair.",
    revenueRole: "Create the account, validate the email path, and move the customer into the dashboard.",
    afterPaymentNextStep: "Finish the scan and use the dashboard to choose the right paid depth.",
    backendStartSignal: "free_scan_started",
  },
  {
    key: "deep-review",
    name: "AI Readiness Review",
    publicName: "Cendorq AI Readiness Review",
    price: "$497",
    amountCents: 49700,
    stripeMode: "payment",
    cadence: "one-time review",
    checkoutPath: "/checkout/start?plan=deep-review",
    successPath: "/checkout/success?plan=deep-review&session_id={CHECKOUT_SESSION_ID}",
    primaryCustomerPromise: "Get the evidence-backed reason customers hesitate and AI engines may not understand, trust, or choose the business yet.",
    revenueRole: "Convert Free Scan uncertainty into a paid evidence-backed AI-readiness review.",
    afterPaymentNextStep: "Confirm the business, target customer, main offer, concern, and competitors so the review can begin.",
    backendStartSignal: "deep_review_paid",
  },
  {
    key: "build-fix",
    name: "Signal Repair",
    publicName: "Cendorq Signal Repair",
    price: "$1,497",
    amountCents: 149700,
    stripeMode: "payment",
    cadence: "one-time repair",
    checkoutPath: "/checkout/start?plan=build-fix",
    successPath: "/checkout/success?plan=build-fix&session_id={CHECKOUT_SESSION_ID}",
    primaryCustomerPromise: "Repair the weak page, message, proof, or action path that makes the business harder to understand or choose.",
    revenueRole: "Turn reviewed friction into paid implementation work.",
    afterPaymentNextStep: "Confirm the page, offer, customer action, brand constraints, and approved business details so the repair can begin.",
    backendStartSignal: "build_fix_paid",
  },
  {
    key: "ongoing-control",
    name: "Readiness Control",
    publicName: "Cendorq Readiness Control",
    price: "$597/mo",
    amountCents: 59700,
    stripeMode: "subscription",
    cadence: "monthly control",
    checkoutPath: "/checkout/start?plan=ongoing-control",
    successPath: "/checkout/success?plan=ongoing-control&session_id={CHECKOUT_SESSION_ID}",
    primaryCustomerPromise: "Keep clarity, proof, search posture, AI-readiness, and customer friction under monthly watch.",
    revenueRole: "Create recurring revenue from customers who need continued improvement and watch.",
    afterPaymentNextStep: "Choose the monthly priority, target channels, competitor set, reporting preference, and approval contact.",
    backendStartSignal: "ongoing_control_subscribed",
  },
] as const satisfies readonly CendorqPlanPrice[];

export const CENDORQ_PAID_PLAN_KEYS = ["deep-review", "build-fix", "ongoing-control"] as const satisfies readonly CendorqPaidPlanKey[];

export const CENDORQ_CHECKOUT_ORCHESTRATION = [
  {
    step: "plan-click",
    customerExperience: "The customer clicks one clear plan action from Plans, dashboard, report vault, billing, or notifications.",
    systemAction: "Create a plan-specific checkout attempt and attach customer, business, scan, report, and source context when available.",
  },
  {
    step: "checkout-start",
    customerExperience: "Stripe opens with the correct product, exact price, customer email, billing details, and promotional consent when needed.",
    systemAction: "Start a hosted Checkout Session with plan metadata, client reference, success URL, cancel URL, and customer email prefill.",
  },
  {
    step: "payment-confirmed",
    customerExperience: "The customer lands on a Cendorq success page that says what was unlocked and what happens next.",
    systemAction: "Use Stripe webhook fulfillment as the source of truth, process each successful session once, and create the correct entitlement and workflow.",
  },
  {
    step: "dashboard-activation",
    customerExperience: "The dashboard shows the purchased plan, the next required action, and the report or work status.",
    systemAction: "Create dashboard notification, billing record, plan entitlement, backend work queue, and customer email sequence.",
  },
  {
    step: "work-started",
    customerExperience: "The customer sees what Cendorq needs from them and where to track progress.",
    systemAction: "Route AI Readiness Review to review, Signal Repair to implementation intake, and Readiness Control to monthly control setup.",
  },
] as const;

export const CENDORQ_CHECKOUT_METADATA_KEYS = [
  "plan_key",
  "price_amount",
  "billing_mode",
  "customer_id",
  "customer_email",
  "business_id",
  "scan_id",
  "report_id",
  "source_page",
  "recommended_from",
  "checkout_session_id",
  "stripe_customer_id",
  "stripe_price_id",
  "stripe_payment_status",
  "marketing_consent",
  "backend_start_signal",
] as const;

const DEEP_REVIEW_COMMUNICATION = projectPlanValueCommunication("deep-review", "deep-review-kickoff");
const BUILD_FIX_COMMUNICATION = projectPlanValueCommunication("build-fix", "build-fix-kickoff");
const ONGOING_CONTROL_COMMUNICATION = projectPlanValueCommunication("ongoing-control", "ongoing-control-kickoff");

export const CENDORQ_POST_PAYMENT_EMAILS = [
  {
    key: "deep-review-kickoff",
    planKey: "deep-review",
    subject: DEEP_REVIEW_COMMUNICATION.subject,
    dashboardPath: "/dashboard/reports",
    customerGoal: "Confirm what Cendorq should review first.",
    customerPromise: DEEP_REVIEW_COMMUNICATION.customerPromise,
    includedValue: DEEP_REVIEW_COMMUNICATION.includedValue,
    notIncluded: DEEP_REVIEW_COMMUNICATION.notIncluded,
    boundary: DEEP_REVIEW_COMMUNICATION.boundary,
    safeUpgradeExplanation: DEEP_REVIEW_COMMUNICATION.safeUpgradeExplanation,
  },
  {
    key: "build-fix-kickoff",
    planKey: "build-fix",
    subject: BUILD_FIX_COMMUNICATION.subject,
    dashboardPath: "/dashboard/support/request",
    customerGoal: "Confirm what should be repaired and what business details are approved.",
    customerPromise: BUILD_FIX_COMMUNICATION.customerPromise,
    includedValue: BUILD_FIX_COMMUNICATION.includedValue,
    notIncluded: BUILD_FIX_COMMUNICATION.notIncluded,
    boundary: BUILD_FIX_COMMUNICATION.boundary,
    safeUpgradeExplanation: BUILD_FIX_COMMUNICATION.safeUpgradeExplanation,
  },
  {
    key: "ongoing-control-kickoff",
    planKey: "ongoing-control",
    subject: ONGOING_CONTROL_COMMUNICATION.subject,
    dashboardPath: "/dashboard/billing",
    customerGoal: "Choose the monthly priority and tracking focus.",
    customerPromise: ONGOING_CONTROL_COMMUNICATION.customerPromise,
    includedValue: ONGOING_CONTROL_COMMUNICATION.includedValue,
    notIncluded: ONGOING_CONTROL_COMMUNICATION.notIncluded,
    boundary: ONGOING_CONTROL_COMMUNICATION.boundary,
    safeUpgradeExplanation: ONGOING_CONTROL_COMMUNICATION.safeUpgradeExplanation,
  },
] as const;

export function getCendorqPlanPrice(planKey: CendorqPlanKey) {
  return CENDORQ_PLAN_PRICES.find((plan) => plan.key === planKey) || CENDORQ_PLAN_PRICES[0];
}

export function getPaidCendorqPlanPrice(planKey: CendorqPaidPlanKey) {
  return CENDORQ_PLAN_PRICES.find((plan) => plan.key === planKey) || CENDORQ_PLAN_PRICES[1];
}
