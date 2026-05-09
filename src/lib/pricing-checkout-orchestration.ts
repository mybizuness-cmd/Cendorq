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

export type CendorqPostPaymentStage = {
  step: string;
  customerExperience: string;
  systemAction: string;
  requiredProof: readonly string[];
  blockedFailureMode: readonly string[];
};

export type CendorqReportTrigger = {
  planKey: CendorqPlanKey;
  customerFacingOutput: string;
  backendTrigger: string;
  reportOrResultType: string;
  intakeNeeded: readonly string[];
  serviceSequence: readonly string[];
  releaseGate: string;
  followUp: string;
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
    successPath: "/dashboard/reports/free-scan",
    primaryCustomerPromise: "Find the first visible reason AI engines or customers may misunderstand the business before spending on the wrong repair.",
    revenueRole: "Create the account, validate the email path, and move the customer into the dashboard conversion command room.",
    afterPaymentNextStep: "Finish the scan, verify the inbox, open the protected result, and choose the right paid depth from the dashboard.",
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
    revenueRole: "Convert Free Scan uncertainty into paid cause-level review through proof, not pressure.",
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
    revenueRole: "Turn proven friction into paid implementation work with visible scope and approval gates.",
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
    revenueRole: "Create recurring revenue from customers who have a real baseline, watchlist, forecast refresh reason, or movement risk to protect.",
    afterPaymentNextStep: "Choose the monthly priority, target channels, competitor set, reporting preference, and approval contact.",
    backendStartSignal: "ongoing_control_subscribed",
  },
] as const satisfies readonly CendorqPlanPrice[];

export const CENDORQ_PAID_PLAN_KEYS = ["deep-review", "build-fix", "ongoing-control"] as const satisfies readonly CendorqPaidPlanKey[];

export const CENDORQ_CHECKOUT_ORCHESTRATION = [
  {
    step: "plan-click",
    customerExperience: "The customer clicks one clear plan action from Plans, dashboard, report vault, billing, notifications, or support.",
    systemAction: "Create a plan-specific checkout attempt and attach customer, business, scan, report, recommendation, and source context when available.",
  },
  {
    step: "checkout-start",
    customerExperience: "Stripe opens with the correct product, exact price, customer email, billing details, and a clean return path.",
    systemAction: "Start a hosted Checkout Session or owner-provided Payment Link with plan metadata, client reference, success URL, cancel URL, and customer email prefill.",
  },
  {
    step: "payment-confirmed",
    customerExperience: "The customer lands on a Cendorq success page that says what was unlocked, what happens next, and where to continue.",
    systemAction: "Use verified webhook fulfillment as the source of truth, trigger idempotent fulfillment from success landing as a backup continuity path, and process each successful session once.",
  },
  {
    step: "dashboard-activation",
    customerExperience: "The dashboard shows the purchased plan, unlocked access, the next required action, and the report or work status.",
    systemAction: "Create dashboard notification, billing projection, entitlement, report/work queue, plan-specific intake state, and customer email sequence.",
  },
  {
    step: "service-started",
    customerExperience: "The customer sees what Cendorq needs from them, what Cendorq is doing, how the result/report will appear, and how support works.",
    systemAction: "Route AI Readiness Review to review queue, Signal Repair to scoped implementation intake, and Readiness Control to monthly control setup and baseline tracking.",
  },
  {
    step: "result-released",
    customerExperience: "The customer receives a branded Cendorq report/result in the report vault with logo, status, evidence boundaries, confidence, next action, and support path.",
    systemAction: "Release only after report truth, customer output approval, entitlement, verified access, no-leak checks, and release-captain review pass.",
  },
] as const;

export const CENDORQ_POST_PAYMENT_SERVICE_SEQUENCE = [
  {
    step: "idempotent-fulfillment",
    customerExperience: "Payment feels instant, but access is still backed by verified server-side fulfillment.",
    systemAction: "Handle checkout.session.completed and delayed-payment success events, retrieve the session with line items, check payment_status, map plan metadata, and record fulfillment once per session.",
    requiredProof: ["checkoutSessionId", "stripeEventId", "paymentStatus", "lineItems", "planKey", "customerMapping", "fulfillmentStatus"],
    blockedFailureMode: ["client-only entitlement", "duplicate fulfillment", "missing line item reconciliation", "unverified webhook state"],
  },
  {
    step: "entitlement-and-workflow-creation",
    customerExperience: "The dashboard immediately shows what was purchased, what is active, what is pending, and what is needed next.",
    systemAction: "Create or update entitlement, billing projection, dashboard next action, report/work queue, support context, and plan-specific intake checklist.",
    requiredProof: ["customerOwnership", "planMapping", "safePlanLabel", "entitlementStatus", "reportOrWorkQueueId", "auditId"],
    blockedFailureMode: ["report access without entitlement", "scope ambiguity", "paid work without workflow", "raw billing projection"],
  },
  {
    step: "customer-onboarding-and-intake",
    customerExperience: "The customer knows exactly what to confirm, why it matters, and how it helps Cendorq produce a stronger result.",
    systemAction: "Show a plan-specific dashboard intake that collects only useful, safe business context and never asks for passwords, tokens, card data, or unrelated private payloads.",
    requiredProof: ["requiredQuestions", "optionalContext", "rejectedInputs", "safeUploadPolicy", "supportPath"],
    blockedFailureMode: ["asking for secrets", "generic intake", "no time-to-value", "overwhelming customer with methodology"],
  },
  {
    step: "report-or-delivery-production",
    customerExperience: "Cendorq appears organized, serious, and already in command of the work after purchase.",
    systemAction: "Run the correct plan workflow, classify evidence, preserve uncertainty, create report sections, generate work status, and prepare customer-safe output.",
    requiredProof: ["evidenceMap", "confidenceLabels", "planBoundary", "workStatus", "reportStructure", "releaseGate"],
    blockedFailureMode: ["unbounded work", "generic report", "unsupported claims", "customer claim as verified fact"],
  },
  {
    step: "branded-report-release",
    customerExperience: "The customer receives a Cendorq-branded result that looks like a category-defining business document, not a template PDF.",
    systemAction: "Release a report/result with Cendorq logo, report type, business identity, methodology version, evidence boundaries, findings, priority, forecast/watchlist when justified, next action, and support/correction path.",
    requiredProof: ["logoPresent", "methodologyVersion", "businessIdentity", "evidenceBoundaries", "confidence", "nextAction", "correctionPath"],
    blockedFailureMode: ["unbranded report", "draft-looking output", "forecast as fact", "hidden limitations", "unsupported outcome promise"],
  },
  {
    step: "follow-up-satisfaction-retention",
    customerExperience: "After delivery, the customer understands what was done, what it means, what to do next, and why returning may matter.",
    systemAction: "Send lifecycle follow-up, dashboard reminders, support routing, satisfaction check, correction path, and evidence-backed next-depth or recurring-control recommendation when justified.",
    requiredProof: ["deliverySummary", "customerOpenedState", "questionPath", "satisfactionSignal", "nextDepthReason", "retentionReason"],
    blockedFailureMode: ["no follow-up", "generic upsell", "fake recurring urgency", "no correction path", "no satisfaction loop"],
  },
] as const satisfies readonly CendorqPostPaymentStage[];

export const CENDORQ_REPORT_TRIGGER_MATRIX = [
  {
    planKey: "free-scan",
    customerFacingOutput: "Protected Free Scan result",
    backendTrigger: "free_scan_verified_and_ready",
    reportOrResultType: "first-signal-readiness-result",
    intakeNeeded: ["business basics", "website or location", "customer type", "main offer", "visible concern"],
    serviceSequence: ["verify inbox", "resolve business identity", "produce first signal", "release protected dashboard result", "guide to the right paid depth"],
    releaseGate: "free-scan-safe-result-release",
    followUp: "If opened and evidence supports it, guide toward AI Readiness Review through proof and limitation clarity.",
  },
  {
    planKey: "deep-review",
    customerFacingOutput: "AI Readiness Review report",
    backendTrigger: "deep_review_paid_and_intake_ready",
    reportOrResultType: "cause-level-ai-readiness-review",
    intakeNeeded: ["business confirmation", "target customer", "main offer", "known concern", "competitor set", "approval contact"],
    serviceSequence: ["fulfill checkout", "activate entitlement", "collect expanded intake", "run evidence review", "prepare branded report", "release to report vault", "follow up with next action"],
    releaseGate: "ai-readiness-review-release-captain-gate",
    followUp: "Explain the cause, priority, and whether Signal Repair, Readiness Control, or no deeper action is safest.",
  },
  {
    planKey: "build-fix",
    customerFacingOutput: "Signal Repair delivery summary and before/after record",
    backendTrigger: "signal_repair_paid_and_scope_ready",
    reportOrResultType: "scoped-repair-delivery-record",
    intakeNeeded: ["approved target", "brand constraints", "page or flow", "customer action", "assets", "approval contact"],
    serviceSequence: ["fulfill checkout", "activate entitlement", "confirm scope", "capture before state", "prepare repair", "request approval", "release delivery summary", "recommend watchlist if justified"],
    releaseGate: "signal-repair-customer-output-approval",
    followUp: "Show what changed, what remains, what should be watched, and whether Readiness Control has a real baseline reason.",
  },
  {
    planKey: "ongoing-control",
    customerFacingOutput: "Readiness Control monthly report and dashboard watchlist",
    backendTrigger: "readiness_control_subscription_active",
    reportOrResultType: "monthly-readiness-control-report",
    intakeNeeded: ["monthly priority", "channels to watch", "competitors", "report preference", "approval contact", "risk threshold"],
    serviceSequence: ["fulfill subscription", "activate recurring entitlement", "set baseline", "monitor movement", "prepare monthly report", "release watchlist", "recommend repair only when evidence supports it"],
    releaseGate: "readiness-control-monthly-review-gate",
    followUp: "Show progress, drift, competitor movement, forecast refresh when justified, next priority, and satisfaction check.",
  },
] as const satisfies readonly CendorqReportTrigger[];

export const CENDORQ_CHECKOUT_METADATA_KEYS = [
  "plan_key",
  "price_amount",
  "billing_mode",
  "customer_id",
  "customer_email",
  "business_id",
  "scan_id",
  "report_id",
  "work_queue_id",
  "source_page",
  "recommended_from",
  "checkout_session_id",
  "stripe_customer_id",
  "stripe_price_id",
  "stripe_payment_status",
  "stripe_subscription_id",
  "stripe_event_id",
  "client_reference_id",
  "marketing_consent",
  "backend_start_signal",
  "report_trigger",
  "fulfillment_status",
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

export function getCendorqReportTrigger(planKey: CendorqPlanKey) {
  return CENDORQ_REPORT_TRIGGER_MATRIX.find((trigger) => trigger.planKey === planKey) || CENDORQ_REPORT_TRIGGER_MATRIX[0];
}
