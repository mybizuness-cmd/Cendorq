export type CustomerNotificationKey =
  | "email-confirmation-required"
  | "welcome-dashboard-ready"
  | "free-scan-resume"
  | "free-scan-received"
  | "free-scan-ready"
  | "deep-review-onboarding"
  | "deep-review-ready"
  | "build-fix-ready"
  | "ongoing-control-monthly-ready"
  | "billing-action-required"
  | "support-request-received"
  | "security-reauth-required";

export type CustomerNotificationSurface = "dashboard-home" | "report-vault" | "billing-center" | "account-security" | "support-center";
export type CustomerNotificationPriority = "low" | "normal" | "high" | "critical";
export type CustomerNotificationCategory = "account" | "scan" | "report" | "billing" | "support" | "security" | "conversion";

export type CustomerNotificationContract = {
  key: CustomerNotificationKey;
  label: string;
  category: CustomerNotificationCategory;
  priority: CustomerNotificationPriority;
  surfaces: readonly CustomerNotificationSurface[];
  trigger: string;
  title: string;
  body: string;
  primaryCta: string;
  primaryPath: string;
  secondaryCta?: string;
  secondaryPath?: string;
  conversionRole: string;
  requiredState: readonly string[];
  requiredGuards: readonly string[];
  suppressionRules: readonly string[];
  blockedContent: readonly string[];
};

export const CUSTOMER_NOTIFICATION_CONTRACTS = [
  {
    key: "email-confirmation-required",
    label: "Email confirmation required",
    category: "account",
    priority: "critical",
    surfaces: ["dashboard-home", "account-security"],
    trigger: "Customer account exists but email is not verified.",
    title: "Confirm your email to unlock your dashboard",
    body: "Cendorq protects your Free Scan, report access, billing center, and saved business history by requiring email confirmation first.",
    primaryCta: "Confirm email",
    primaryPath: "/verify-email",
    secondaryCta: "Use a different email",
    secondaryPath: "/signup",
    conversionRole: "Turns signup into verified platform access while explaining the trust reason for the step.",
    requiredState: ["customerId", "emailVerified=false", "confirmation token status"],
    requiredGuards: ["generic account existence messaging", "rate-limited resend", "safe redirect allowlist", "no dashboard result access before verification"],
    suppressionRules: ["hide after email verified", "hide when account locked or disabled", "do not show duplicate alert variants"],
    blockedContent: ["raw token", "account exists", "password", "marketing upsell"],
  },
  {
    key: "welcome-dashboard-ready",
    label: "Welcome dashboard ready",
    category: "account",
    priority: "normal",
    surfaces: ["dashboard-home"],
    trigger: "Customer verifies email and welcome has not been shown in dashboard.",
    title: "Your Cendorq dashboard is ready",
    body: "Start your Free Scan and keep your results, recommendations, billing, and future business history connected in one place.",
    primaryCta: "Start Free Scan",
    primaryPath: "/free-check",
    conversionRole: "Creates a luxury first dashboard impression and drives the first value action.",
    requiredState: ["emailVerified=true", "welcomeDashboardShown=false"],
    requiredGuards: ["welcome once", "verified email required", "support path visible", "no raw customer data"],
    suppressionRules: ["hide after first dashboard welcome acknowledgement", "hide if Free Scan already started", "hide if account locked"],
    blockedContent: ["fake urgency", "guaranteed outcome", "unsupported claim"],
  },
  {
    key: "free-scan-resume",
    label: "Free Scan resume",
    category: "scan",
    priority: "normal",
    surfaces: ["dashboard-home"],
    trigger: "Verified customer started Free Scan but has not submitted.",
    title: "Continue your Free Scan",
    body: "Your scan is ready to continue. Finish it to receive your first Cendorq read inside the dashboard.",
    primaryCta: "Continue Free Scan",
    primaryPath: "/free-check",
    conversionRole: "Recovers scan momentum without pressure.",
    requiredState: ["emailVerified=true", "scanStatus=started", "scanStatus!=submitted"],
    requiredGuards: ["safe prefill", "business boundary", "no sensitive intake details in alert"],
    suppressionRules: ["hide after scan submitted", "hide after dismissal window", "do not show repeated urgent variants"],
    blockedContent: ["private intake details", "pressure copy", "fake urgency"],
  },
  {
    key: "free-scan-received",
    label: "Free Scan received",
    category: "scan",
    priority: "normal",
    surfaces: ["dashboard-home"],
    trigger: "Free Scan submitted and job is queued or running.",
    title: "Your Free Scan is in progress",
    body: "Cendorq received your scan. Your dashboard will show the result when it is approved and ready.",
    primaryCta: "View status",
    primaryPath: "/dashboard",
    conversionRole: "Maintains trust between submission and result readiness.",
    requiredState: ["scanJobId", "scanStatus=queued|running", "customer ownership"],
    requiredGuards: ["idempotency", "queue status", "safe status copy", "no quality downgrade"],
    suppressionRules: ["hide after result ready", "do not reveal internal queue details", "do not duplicate for idempotent submission"],
    blockedContent: ["raw queue internals", "false instant result", "unsupported claim"],
  },
  {
    key: "free-scan-ready",
    label: "Free Scan ready",
    category: "conversion",
    priority: "high",
    surfaces: ["dashboard-home", "report-vault"],
    trigger: "Free Scan result is approved and ready.",
    title: "Your Free Scan is ready",
    body: "See your first findings, confidence labels, visible limits, and the reason Deep Review may be the next logical step.",
    primaryCta: "Open results",
    primaryPath: "/dashboard/reports",
    secondaryCta: "Compare plans",
    secondaryPath: "/plans",
    conversionRole: "Converts Free Scan into Deep Review through proof, confidence labels, and limitations.",
    requiredState: ["reportApproval=approved", "freeScanResultReady=true", "confidence labels"],
    requiredGuards: ["report release approval", "blocked-claim scan", "limitation statement", "no raw evidence"],
    suppressionRules: ["hide after customer opens report unless still relevant", "do not show if report not approved", "do not hide limitations"],
    blockedContent: ["complete diagnosis claim", "guaranteed outcome", "raw evidence", "fake urgency"],
  },
  {
    key: "deep-review-onboarding",
    label: "Deep Review onboarding",
    category: "billing",
    priority: "high",
    surfaces: ["dashboard-home", "billing-center", "report-vault"],
    trigger: "Deep Review entitlement becomes active.",
    title: "Your Deep Review has started",
    body: "Your plan is active. Track status, billing, invoice access, and next steps from your dashboard.",
    primaryCta: "View Deep Review status",
    primaryPath: "/dashboard",
    secondaryCta: "Billing center",
    secondaryPath: "/dashboard/billing",
    conversionRole: "Reduces buyer anxiety and confirms paid-plan value immediately after checkout.",
    requiredState: ["billing entitlement active", "verified webhook", "plan=deep-review"],
    requiredGuards: ["webhook signature verification", "active entitlement", "invoice access", "no raw billing IDs"],
    suppressionRules: ["hide after onboarding acknowledged", "do not show before entitlement active", "do not duplicate purchase confirmation"],
    blockedContent: ["raw subscription ID", "unverified billing state", "guaranteed ROI"],
  },
  {
    key: "deep-review-ready",
    label: "Deep Review ready",
    category: "conversion",
    priority: "high",
    surfaces: ["dashboard-home", "report-vault"],
    trigger: "Deep Review report is approved and delivered.",
    title: "Your Deep Review is ready",
    body: "Review the deeper diagnosis, ranked priorities, confidence labels, and what Build Fix can turn into implementation.",
    primaryCta: "Open Deep Review",
    primaryPath: "/dashboard/reports",
    secondaryCta: "Explore Build Fix",
    secondaryPath: "/plans",
    conversionRole: "Moves from diagnosis to implementation through verified causes and clear sequencing.",
    requiredState: ["deepReviewApproved=true", "reportVersion", "correctionWindow"],
    requiredGuards: ["report approval", "correction path", "blocked-claim scan", "no guaranteed ROI"],
    suppressionRules: ["do not show before approval", "do not hide correction path", "hide after completed next-step acknowledgement"],
    blockedContent: ["guaranteed ROI", "raw evidence", "unsupported implementation claim", "fake urgency"],
  },
  {
    key: "build-fix-ready",
    label: "Build Fix ready",
    category: "conversion",
    priority: "high",
    surfaces: ["dashboard-home", "report-vault"],
    trigger: "Build Fix summary is approved and ready.",
    title: "Your Build Fix summary is ready",
    body: "See completed work, remaining risks, baseline notes, and why Ongoing Control may protect progress.",
    primaryCta: "Review Build Fix summary",
    primaryPath: "/dashboard/reports",
    secondaryCta: "Explore Ongoing Control",
    secondaryPath: "/plans",
    conversionRole: "Moves implementation into recurring monitoring and retention through remaining risks and baseline tracking.",
    requiredState: ["implementationSummaryApproved=true", "completedWorkRecord", "baseline"],
    requiredGuards: ["approved summary", "remaining risk list", "no permanent growth claim", "support path"],
    suppressionRules: ["do not show before implementation summary approval", "do not hide remaining risks", "hide after next-step acknowledgement"],
    blockedContent: ["permanent growth claim", "guaranteed outcome", "raw internal notes", "unsupported metric"],
  },
  {
    key: "ongoing-control-monthly-ready",
    label: "Ongoing Control monthly ready",
    category: "report",
    priority: "normal",
    surfaces: ["dashboard-home", "report-vault"],
    trigger: "Approved Ongoing Control monthly summary is ready.",
    title: "Your monthly control update is ready",
    body: "Review progress, regressions, new risks, opportunities, and this month’s priorities.",
    primaryCta: "Review monthly priorities",
    primaryPath: "/dashboard/reports",
    conversionRole: "Retains customers through useful progress, risk visibility, and next-month focus.",
    requiredState: ["monthlySummaryApproved=true", "monthly delta", "confidence labels"],
    requiredGuards: ["approved monthly data", "comparable baseline", "no raw evidence", "do not hide regressions"],
    suppressionRules: ["do not show if summary unapproved", "hide after monthly report opened", "do not show non-comparable progress as improvement"],
    blockedContent: ["non-comparable progress claim", "raw evidence", "guaranteed growth", "hidden regression"],
  },
  {
    key: "billing-action-required",
    label: "Billing action required",
    category: "billing",
    priority: "critical",
    surfaces: ["dashboard-home", "billing-center"],
    trigger: "Billing status becomes past-due, failed, interrupted, or renewal-risk.",
    title: "Billing action is needed",
    body: "Your billing center shows the safest next step to keep plan access current or get support.",
    primaryCta: "Resolve billing status",
    primaryPath: "/dashboard/billing",
    secondaryCta: "Contact support",
    secondaryPath: "/dashboard",
    conversionRole: "Protects retention and entitlement accuracy through service-first recovery.",
    requiredState: ["billing status", "entitlement status", "support path"],
    requiredGuards: ["billing state check", "entitlement boundary", "no shame copy", "support path visible"],
    suppressionRules: ["hide after resolved", "do not show during account deletion request", "do not pressure during active dispute"],
    blockedContent: ["shame copy", "false scarcity", "hidden cancellation/support path", "raw payment data"],
  },
  {
    key: "support-request-received",
    label: "Support request received",
    category: "support",
    priority: "normal",
    surfaces: ["dashboard-home", "support-center"],
    trigger: "Customer creates support, correction, billing, or report question request.",
    title: "Cendorq received your request",
    body: "Your request is connected to your dashboard and will be handled through the right review path.",
    primaryCta: "View dashboard",
    primaryPath: "/dashboard",
    conversionRole: "Protects trust and reduces dispute risk by showing support did not disappear.",
    requiredState: ["supportRequestId", "requestType", "safe summary"],
    requiredGuards: ["support record", "safe summary", "no legal/refund promise without approval", "no internal notes"],
    suppressionRules: ["hide after support request closes", "do not duplicate acknowledgement", "do not show internal status not meant for customer"],
    blockedContent: ["unapproved refund promise", "legal ruling", "internal notes", "raw evidence"],
  },
  {
    key: "security-reauth-required",
    label: "Security reauthentication required",
    category: "security",
    priority: "critical",
    surfaces: ["dashboard-home", "account-security"],
    trigger: "Risky session, new device, suspicious activity, or sensitive action requires reauthentication.",
    title: "Reconfirm your account to continue",
    body: "For your protection, Cendorq needs to verify this session before allowing sensitive account, report, or billing actions.",
    primaryCta: "Reconfirm account",
    primaryPath: "/verify-email",
    conversionRole: "Protects trust and account safety without exposing security details.",
    requiredState: ["riskLevel", "sessionStatus=reauth-required", "device trust status"],
    requiredGuards: ["session rotation", "token revocation path", "safe security copy", "no attacker details"],
    suppressionRules: ["hide after reauth success", "do not expose risk scoring details", "do not show sensitive action until reauth"],
    blockedContent: ["risk scoring internals", "attacker payload", "raw security event", "secret"],
  },
] as const satisfies readonly CustomerNotificationContract[];

export const CUSTOMER_NOTIFICATION_GLOBAL_GUARDS = [
  "no customer notification without customer ownership and route authorization",
  "no notification renders raw evidence, raw security payloads, raw billing IDs, secrets, prompts, or private report internals",
  "no conversion notification without proof, confidence, limitation, and plan-stage logic",
  "no billing notification without entitlement and billing-state checks",
  "no support notification hides support, correction, cancellation, or billing help",
  "no security notification reveals attacker details, risk-scoring internals, or secrets",
  "every notification has suppression rules and a clear primary CTA",
  "critical notifications must be dismissible only when the required state is resolved or a safe alternate path exists",
] as const;

export function getCustomerNotificationContracts() {
  return {
    notifications: CUSTOMER_NOTIFICATION_CONTRACTS,
    guards: CUSTOMER_NOTIFICATION_GLOBAL_GUARDS,
  };
}
