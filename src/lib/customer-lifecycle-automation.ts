export type CustomerLifecycleStage =
  | "account-created"
  | "email-confirmation-pending"
  | "email-confirmed"
  | "free-scan-started"
  | "free-scan-submitted"
  | "free-scan-ready"
  | "deep-review-considering"
  | "deep-review-purchased"
  | "deep-review-delivered"
  | "build-fix-considering"
  | "build-fix-purchased"
  | "build-fix-delivered"
  | "ongoing-control-considering"
  | "ongoing-control-active"
  | "renewal-risk"
  | "reactivation";

export type LifecycleChannel = "dashboard" | "transactional-email" | "lifecycle-email" | "billing" | "support";
export type LifecycleTriggerType = "account" | "email" | "scan" | "report" | "billing" | "dashboard" | "support" | "risk";

export type CustomerLifecycleAutomationRule = {
  key: string;
  label: string;
  stage: CustomerLifecycleStage;
  triggerType: LifecycleTriggerType;
  trigger: string;
  channels: readonly LifecycleChannel[];
  dashboardState: string;
  emailBehavior: string;
  primaryCta: string;
  conversionPurpose: string;
  requiredGuards: readonly string[];
  suppressionRules: readonly string[];
};

export const CUSTOMER_LIFECYCLE_AUTOMATION_RULES = [
  {
    key: "account-created-confirm-email",
    label: "Account created: confirm email",
    stage: "account-created",
    triggerType: "account",
    trigger: "Customer creates an account through provider signup or email/password signup.",
    channels: ["transactional-email", "dashboard"],
    dashboardState: "Show confirmation-required state and explain why email confirmation protects scan results and dashboard access.",
    emailBehavior: "Send confirmation email from Cendorq Support <support@cendorq.com> with a single-use, expiring confirmation link.",
    primaryCta: "Confirm your Cendorq account to start your Free Scan.",
    conversionPurpose: "Protect access while moving the customer into the Free Scan flow with minimal confusion.",
    requiredGuards: ["single-use token", "token expiration", "generic account-existence messaging", "safe redirect allowlist", "rate-limited resend"],
    suppressionRules: ["do not send welcome email before verified account creation", "do not send duplicate confirmation faster than resend limit", "do not reveal whether an account exists"],
  },
  {
    key: "email-confirmed-one-time-welcome",
    label: "Email confirmed: one-time welcome",
    stage: "email-confirmed",
    triggerType: "email",
    trigger: "Customer confirms email ownership for the first time.",
    channels: ["transactional-email", "dashboard"],
    dashboardState: "Unlock dashboard and route the customer to Free Scan or continue where they left off.",
    emailBehavior: "Send one premium welcome email once only. Recommended subject: Welcome to Cendorq — your business intelligence dashboard is ready.",
    primaryCta: "Start your Free Scan.",
    conversionPurpose: "Make the dashboard feel owned, valuable, and ready before the scan begins.",
    requiredGuards: ["welcome sent flag", "verified email required", "dashboard deep link", "support path", "brand-safe copy"],
    suppressionRules: ["never send welcome email twice", "do not send welcome if account is locked or disabled", "do not send promotional cadence without preference controls"],
  },
  {
    key: "free-scan-started-resume",
    label: "Free Scan started: save momentum",
    stage: "free-scan-started",
    triggerType: "scan",
    trigger: "Verified customer starts Free Scan but does not complete it.",
    channels: ["dashboard", "lifecycle-email"],
    dashboardState: "Show incomplete scan progress, safe prefilled fields, and a continue action.",
    emailBehavior: "Send one helpful resume reminder only if the customer has opted into lifecycle messages or the message is allowed as a service reminder.",
    primaryCta: "Continue your Free Scan.",
    conversionPurpose: "Recover high-intent users without spam or pressure.",
    requiredGuards: ["safe prefill", "resume token or authenticated route", "preference check", "suppression window", "no raw private data in email"],
    suppressionRules: ["do not send repeated reminders", "do not send if scan was submitted", "do not include sensitive business details in email"],
  },
  {
    key: "free-scan-submitted-status",
    label: "Free Scan submitted: status and trust",
    stage: "free-scan-submitted",
    triggerType: "scan",
    trigger: "Customer submits Free Scan intake.",
    channels: ["dashboard", "transactional-email"],
    dashboardState: "Show scan received, queued/running status, what happens next, and support path.",
    emailBehavior: "Send receipt email with dashboard link, expectation copy, and no false instant-complete claim.",
    primaryCta: "Open your dashboard status.",
    conversionPurpose: "Preserve trust between submission and result readiness.",
    requiredGuards: ["scan job ID", "idempotency key", "queue status", "safe status copy", "no quality downgrade"],
    suppressionRules: ["do not send duplicate receipt for duplicate submission", "do not promise exact completion unless known", "do not expose queue internals"],
  },
  {
    key: "free-scan-ready-deep-review",
    label: "Free Scan ready: Deep Review conversion",
    stage: "free-scan-ready",
    triggerType: "report",
    trigger: "Free Scan result is approved and ready for customer view.",
    channels: ["dashboard", "transactional-email"],
    dashboardState: "Show Free Scan summary, confidence labels, visible limits, proof chips, and Deep Review next-step CTA.",
    emailBehavior: "Send branded result-ready email with concise scan summary, dashboard link, confidence language, and truthful Deep Review CTA.",
    primaryCta: "Unlock the Deep Review.",
    conversionPurpose: "Convert from Free Scan to paid diagnosis through proof, visible limits, and business-specific reasons.",
    requiredGuards: ["release approval", "confidence labels", "limitation statement", "evidence-backed CTA", "blocked-claim scan"],
    suppressionRules: ["do not claim complete diagnosis", "do not use fake urgency", "do not send if report is not approved", "do not hide limitations"],
  },
  {
    key: "deep-review-purchased-onboarding",
    label: "Deep Review purchased: onboarding",
    stage: "deep-review-purchased",
    triggerType: "billing",
    trigger: "Customer completes Deep Review checkout and entitlement is active.",
    channels: ["dashboard", "transactional-email", "billing"],
    dashboardState: "Show active entitlement, onboarding checklist, report status, invoice path, and support contact.",
    emailBehavior: "Send purchase confirmation and onboarding email with invoice/billing portal path where applicable.",
    primaryCta: "View Deep Review status.",
    conversionPurpose: "Reduce buyer anxiety and show the paid plan has begun.",
    requiredGuards: ["webhook verification", "entitlement record", "invoice access", "billing portal", "safe purchase confirmation"],
    suppressionRules: ["do not grant paid access without entitlement", "do not send purchase confirmation before verified billing event", "do not expose billing IDs raw"],
  },
  {
    key: "deep-review-delivered-build-fix",
    label: "Deep Review delivered: Build Fix conversion",
    stage: "deep-review-delivered",
    triggerType: "report",
    trigger: "Deep Review report is approved and delivered.",
    channels: ["dashboard", "lifecycle-email"],
    dashboardState: "Show ranked causes, evidence, visual explanations, open blockers, and Build Fix implementation CTA.",
    emailBehavior: "Send delivery email with dashboard link, report availability, correction path, and plan-stage next-step guidance.",
    primaryCta: "Turn the diagnosis into fixes.",
    conversionPurpose: "Move from knowing the problems to implementation with proof and clear sequencing.",
    requiredGuards: ["report approval", "correction window", "evidence summary", "implementation fit", "no guaranteed ROI"],
    suppressionRules: ["do not push Build Fix before report approval", "do not hide correction path", "do not claim results are guaranteed"],
  },
  {
    key: "build-fix-delivered-ongoing-control",
    label: "Build Fix delivered: Ongoing Control conversion",
    stage: "build-fix-delivered",
    triggerType: "report",
    trigger: "Build Fix implementation summary is delivered.",
    channels: ["dashboard", "lifecycle-email"],
    dashboardState: "Show completed fixes, baseline, remaining risks, next monitoring checkpoints, and Ongoing Control CTA.",
    emailBehavior: "Send implementation completion email with dashboard link and ongoing monitoring explanation.",
    primaryCta: "Start Ongoing Control.",
    conversionPurpose: "Turn implementation into recurring control, monitoring, and compounding improvement.",
    requiredGuards: ["completed work record", "baseline", "remaining risk list", "monitoring fit", "truthful plan explanation"],
    suppressionRules: ["do not claim permanent growth", "do not send without implementation summary", "do not hide remaining risks"],
  },
  {
    key: "ongoing-control-active-retention",
    label: "Ongoing Control active: retention and expansion",
    stage: "ongoing-control-active",
    triggerType: "dashboard",
    trigger: "Customer is active on Ongoing Control and receives recurring updates.",
    channels: ["dashboard", "lifecycle-email", "support"],
    dashboardState: "Show monthly deltas, completed actions, new risks, new opportunities, next-month priorities, and expansion fit where supported.",
    emailBehavior: "Send monthly summary only with approved data, confidence labels, and preference controls.",
    primaryCta: "Review this month’s priorities.",
    conversionPurpose: "Retain customers through visible progress and open opportunities.",
    requiredGuards: ["monthly delta", "comparable baseline", "confidence labels", "preference controls", "support path"],
    suppressionRules: ["do not hide regressions", "do not send non-comparable progress as improvement", "do not include private raw evidence in email"],
  },
  {
    key: "renewal-risk-reactivation",
    label: "Renewal risk: reactivation",
    stage: "renewal-risk",
    triggerType: "risk",
    trigger: "Customer shows churn, failed payment, inactivity, unresolved support issue, or cancellation risk.",
    channels: ["dashboard", "lifecycle-email", "billing", "support"],
    dashboardState: "Show billing recovery, support path, saved value, unresolved items, and next useful action.",
    emailBehavior: "Send helpful reactivation or recovery message only when allowed and stage-appropriate.",
    primaryCta: "Resolve account status.",
    conversionPurpose: "Recover accounts through service, clarity, and real value instead of pressure.",
    requiredGuards: ["billing state", "support path", "preference check", "no shame copy", "no false scarcity"],
    suppressionRules: ["do not send reactivation after deletion request", "do not pressure during active dispute", "do not conceal cancellation/support options"],
  },
] as const satisfies readonly CustomerLifecycleAutomationRule[];

export const CUSTOMER_LIFECYCLE_GLOBAL_GUARDS = [
  "no lifecycle automation without customer stage",
  "no email without suppression and preference review",
  "no duplicate welcome email",
  "no paid-plan access without billing entitlement",
  "no result email before report approval",
  "no conversion CTA without proof and plan-stage logic",
  "no private raw evidence in email or analytics",
  "no automation that hides support, correction, cancellation, or billing help",
] as const;

export function getCustomerLifecycleAutomation() {
  return {
    rules: CUSTOMER_LIFECYCLE_AUTOMATION_RULES,
    guards: CUSTOMER_LIFECYCLE_GLOBAL_GUARDS,
  };
}
