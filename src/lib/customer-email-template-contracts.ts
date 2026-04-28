export type CustomerEmailTemplateKey =
  | "confirm-email"
  | "welcome-verified"
  | "free-scan-resume"
  | "free-scan-received"
  | "free-scan-ready"
  | "deep-review-purchased"
  | "deep-review-delivered"
  | "build-fix-delivered"
  | "ongoing-control-monthly"
  | "billing-recovery"
  | "correction-support";

export type CustomerEmailCategory = "transactional" | "lifecycle" | "billing" | "support";
export type CustomerEmailTone = "luxury" | "calm" | "strategic" | "proof-first" | "supportive";

export type CustomerEmailTemplateContract = {
  key: CustomerEmailTemplateKey;
  label: string;
  category: CustomerEmailCategory;
  senderName: "Cendorq Support";
  fromAddress: "support@cendorq.com";
  subject: string;
  preheader: string;
  purpose: string;
  primaryCta: string;
  dashboardPath: string;
  conversionRole: string;
  tone: readonly CustomerEmailTone[];
  requiredPersonalization: readonly string[];
  requiredProofOrTrustElements: readonly string[];
  requiredComplianceControls: readonly string[];
  suppressionRules: readonly string[];
  blockedContent: readonly string[];
};

export const CUSTOMER_EMAIL_TEMPLATE_CONTRACTS = [
  {
    key: "confirm-email",
    label: "Confirm email",
    category: "transactional",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Confirm your Cendorq account to start your Free Scan",
    preheader: "Confirm your email so Cendorq can protect your dashboard and scan results.",
    purpose: "Verify email ownership before dashboard access, report access, and Free Scan result delivery.",
    primaryCta: "Confirm email",
    dashboardPath: "/verify-email",
    conversionRole: "Moves account creation into verified customer platform access with clear security purpose.",
    tone: ["calm", "supportive", "proof-first"],
    requiredPersonalization: ["customer email", "confirmation expiration window"],
    requiredProofOrTrustElements: ["single-use confirmation link", "why verification is required", "support contact"],
    requiredComplianceControls: ["token expiration", "rate-limited resend", "safe redirect allowlist", "generic account existence messaging"],
    suppressionRules: ["do not send duplicate confirmation faster than resend limit", "do not send after token is consumed", "do not reveal whether an account exists"],
    blockedContent: ["password", "raw token", "account exists", "unsafe redirect", "marketing upsell"],
  },
  {
    key: "welcome-verified",
    label: "Welcome verified customer",
    category: "transactional",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Welcome to Cendorq — your business intelligence dashboard is ready",
    preheader: "Your dashboard is ready. Start the Free Scan and keep everything connected.",
    purpose: "Welcome verified customers once and point them to the dashboard and Free Scan path.",
    primaryCta: "Start Free Scan",
    dashboardPath: "/dashboard",
    conversionRole: "Creates the first luxury platform impression and turns verification into Free Scan momentum.",
    tone: ["luxury", "calm", "strategic", "supportive"],
    requiredPersonalization: ["customer first name when available", "business name when available"],
    requiredProofOrTrustElements: ["dashboard value", "what happens next", "support contact", "privacy-safe account language"],
    requiredComplianceControls: ["welcome sent flag", "verified email required", "one-time only", "preference controls where required"],
    suppressionRules: ["never send twice", "do not send before email verification", "do not send to locked or disabled account"],
    blockedContent: ["guaranteed outcome", "fake urgency", "unsupported claim", "raw customer data"],
  },
  {
    key: "free-scan-resume",
    label: "Free Scan resume",
    category: "lifecycle",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Your Cendorq Free Scan is ready to continue",
    preheader: "Finish the scan when you are ready. Your dashboard will keep the results connected.",
    purpose: "Help verified customers finish a started Free Scan without pressure or repeated reminders.",
    primaryCta: "Continue Free Scan",
    dashboardPath: "/free-check",
    conversionRole: "Recovers scan abandonment through helpful continuation and low friction.",
    tone: ["calm", "supportive", "strategic"],
    requiredPersonalization: ["business name when available", "resume path"],
    requiredProofOrTrustElements: ["why the scan matters", "dashboard handoff", "support contact"],
    requiredComplianceControls: ["preference check", "suppression window", "no sensitive business details in email"],
    suppressionRules: ["do not send after scan submission", "do not send repeated reminders", "do not send after unsubscribe where required"],
    blockedContent: ["private intake details", "fake urgency", "pressure language", "raw form data"],
  },
  {
    key: "free-scan-received",
    label: "Free Scan received",
    category: "transactional",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "We received your Cendorq Free Scan",
    preheader: "Your scan is connected to your dashboard. We will show status and results there.",
    purpose: "Confirm scan submission, reduce uncertainty, and point customers to dashboard status.",
    primaryCta: "View scan status",
    dashboardPath: "/dashboard",
    conversionRole: "Protects trust between form submission and result readiness.",
    tone: ["calm", "supportive", "proof-first"],
    requiredPersonalization: ["business name", "scan submitted timestamp"],
    requiredProofOrTrustElements: ["dashboard status", "what happens next", "support contact"],
    requiredComplianceControls: ["idempotency guard", "safe status copy", "no exact completion promise unless known"],
    suppressionRules: ["do not duplicate for idempotent submission", "do not expose queue internals", "do not send if submission failed"],
    blockedContent: ["false instant result", "raw queue internals", "raw evidence", "unsupported claim"],
  },
  {
    key: "free-scan-ready",
    label: "Free Scan ready",
    category: "transactional",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Your Cendorq Free Scan is ready",
    preheader: "See your first findings, confidence labels, and the next best step in your dashboard.",
    purpose: "Deliver approved Free Scan result access and truthfully guide qualified customers toward Deep Review.",
    primaryCta: "Open Free Scan results",
    dashboardPath: "/dashboard",
    conversionRole: "Converts to Deep Review through visible limits, confidence labels, and business-specific proof.",
    tone: ["luxury", "calm", "proof-first", "strategic"],
    requiredPersonalization: ["business name", "top finding summary", "confidence language"],
    requiredProofOrTrustElements: ["confidence labels", "limitation statement", "dashboard result link", "Deep Review unlock explanation"],
    requiredComplianceControls: ["report release approval", "blocked-claim scan", "support/correction path", "no raw evidence in email"],
    suppressionRules: ["do not send before report approval", "do not send if account is locked", "do not send duplicate result-ready notice"],
    blockedContent: ["complete diagnosis claim", "guaranteed outcome", "fake urgency", "raw evidence", "unsupported revenue claim"],
  },
  {
    key: "deep-review-purchased",
    label: "Deep Review purchased",
    category: "billing",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Your Cendorq Deep Review has started",
    preheader: "Your plan is active. See status, billing, and next steps in your dashboard.",
    purpose: "Confirm verified purchase, explain onboarding, and point to dashboard and billing center.",
    primaryCta: "View Deep Review status",
    dashboardPath: "/dashboard",
    conversionRole: "Reduces buyer anxiety and strengthens paid-plan confidence immediately after checkout.",
    tone: ["luxury", "calm", "supportive"],
    requiredPersonalization: ["business name", "plan name", "billing status"],
    requiredProofOrTrustElements: ["invoice/billing path", "plan entitlement", "what happens next", "support contact"],
    requiredComplianceControls: ["verified webhook", "active entitlement", "billing portal path", "no raw billing IDs"],
    suppressionRules: ["do not send before verified billing event", "do not send if entitlement is not active", "do not duplicate purchase confirmation"],
    blockedContent: ["raw subscription ID", "unverified billing state", "guaranteed ROI", "hidden cancellation/support path"],
  },
  {
    key: "deep-review-delivered",
    label: "Deep Review delivered",
    category: "transactional",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Your Cendorq Deep Review is ready",
    preheader: "Your deeper diagnosis is in your dashboard with priorities, confidence, and next steps.",
    purpose: "Deliver approved Deep Review access and guide implementation-fit customers toward Build Fix.",
    primaryCta: "Open Deep Review",
    dashboardPath: "/dashboard/reports",
    conversionRole: "Moves from diagnosis to implementation by explaining causes, priorities, and Build Fix fit.",
    tone: ["luxury", "calm", "proof-first", "strategic"],
    requiredPersonalization: ["business name", "top priority summary", "report version"],
    requiredProofOrTrustElements: ["root-cause summary", "confidence labels", "correction window", "Build Fix unlock explanation"],
    requiredComplianceControls: ["report approval", "correction path", "blocked-claim scan", "no guaranteed ROI"],
    suppressionRules: ["do not send before approval", "do not hide correction path", "do not send duplicate delivery notice"],
    blockedContent: ["guaranteed ROI", "raw evidence", "unsupported implementation claim", "fake urgency"],
  },
  {
    key: "build-fix-delivered",
    label: "Build Fix delivered",
    category: "transactional",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Your Cendorq Build Fix summary is ready",
    preheader: "See completed work, remaining risks, and the monitoring path in your dashboard.",
    purpose: "Show completed implementation summary and truthfully explain Ongoing Control fit.",
    primaryCta: "Review Build Fix summary",
    dashboardPath: "/dashboard/reports",
    conversionRole: "Moves from implementation to ongoing control through baseline, remaining risks, and monitoring value.",
    tone: ["luxury", "calm", "proof-first", "strategic"],
    requiredPersonalization: ["business name", "completed work summary", "remaining risk summary"],
    requiredProofOrTrustElements: ["completed work record", "baseline", "remaining risks", "Ongoing Control explanation"],
    requiredComplianceControls: ["implementation summary approval", "no permanent growth claim", "support path"],
    suppressionRules: ["do not send before implementation summary", "do not hide remaining risks", "do not claim permanent improvement"],
    blockedContent: ["permanent growth claim", "guaranteed outcome", "raw internal notes", "unsupported metric"],
  },
  {
    key: "ongoing-control-monthly",
    label: "Ongoing Control monthly",
    category: "lifecycle",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Your Cendorq monthly control update is ready",
    preheader: "Review progress, risks, and next priorities in your dashboard.",
    purpose: "Notify active Ongoing Control customers that approved monthly summary is ready.",
    primaryCta: "Review this month’s priorities",
    dashboardPath: "/dashboard",
    conversionRole: "Drives retention through visible progress, risks, and useful next-month priorities.",
    tone: ["luxury", "calm", "proof-first", "strategic"],
    requiredPersonalization: ["business name", "month", "top priority"],
    requiredProofOrTrustElements: ["monthly delta", "confidence labels", "regression risks", "next-month priority"],
    requiredComplianceControls: ["approved monthly data", "preference controls", "no raw evidence in email"],
    suppressionRules: ["do not send if monthly summary is unapproved", "do not send after opt-out where required", "do not hide regressions"],
    blockedContent: ["non-comparable progress claim", "raw evidence", "guaranteed growth", "hidden regression"],
  },
  {
    key: "billing-recovery",
    label: "Billing recovery",
    category: "billing",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Action needed: update your Cendorq billing status",
    preheader: "Your dashboard shows the safest next step to keep plan access current.",
    purpose: "Help customers resolve failed payments, billing interruptions, or renewal risk without pressure.",
    primaryCta: "Resolve billing status",
    dashboardPath: "/dashboard/billing",
    conversionRole: "Protects retention and entitlement accuracy through clear, service-first billing recovery.",
    tone: ["calm", "supportive", "strategic"],
    requiredPersonalization: ["plan name", "billing status", "support path"],
    requiredProofOrTrustElements: ["billing center link", "support contact", "what happens next"],
    requiredComplianceControls: ["billing state check", "entitlement state", "support path", "no shame copy"],
    suppressionRules: ["do not send after account deletion request", "do not pressure during active dispute", "do not conceal support path"],
    blockedContent: ["shame copy", "false scarcity", "hidden cancellation/support path", "raw payment data"],
  },
  {
    key: "correction-support",
    label: "Correction and support",
    category: "support",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "We received your Cendorq support request",
    preheader: "Your request is connected to your dashboard and will be reviewed through the correct path.",
    purpose: "Confirm support, correction, billing, or report questions without making unapproved promises.",
    primaryCta: "View your dashboard",
    dashboardPath: "/dashboard",
    conversionRole: "Protects trust, reduces disputes, and keeps support connected to the customer account.",
    tone: ["calm", "supportive", "proof-first"],
    requiredPersonalization: ["request type", "support reference", "dashboard link"],
    requiredProofOrTrustElements: ["review path", "support contact", "correction path when applicable"],
    requiredComplianceControls: ["support record", "safe summary", "no refund/legal promise without approval"],
    suppressionRules: ["do not promise outcome before review", "do not expose internal notes", "do not duplicate acknowledgment"],
    blockedContent: ["unapproved refund promise", "legal ruling", "internal notes", "raw evidence"],
  },
] as const satisfies readonly CustomerEmailTemplateContract[];

export const CUSTOMER_EMAIL_GLOBAL_GUARDS = [
  "all customer emails use Cendorq Support <support@cendorq.com>",
  "transactional sender domain must support SPF, DKIM, DMARC, TLS, bounce handling, and complaint handling",
  "every customer email has one clear primary CTA",
  "every lifecycle email has suppression and preference controls where required",
  "no email contains passwords, raw tokens, raw billing IDs, raw evidence, secrets, or private report internals",
  "no email claims guaranteed outcomes, guaranteed ROI, fake urgency, false scarcity, or unsupported revenue impact",
  "no paid-plan or report-delivery email sends before entitlement, approval, or release gates pass",
  "every support/correction email keeps support path visible and avoids unapproved legal, refund, or outcome promises",
] as const;

export function getCustomerEmailTemplateContracts() {
  return {
    templates: CUSTOMER_EMAIL_TEMPLATE_CONTRACTS,
    guards: CUSTOMER_EMAIL_GLOBAL_GUARDS,
  };
}
