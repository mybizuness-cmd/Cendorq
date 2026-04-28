export type CustomerPlatformArea =
  | "signup"
  | "email-verification"
  | "authentication"
  | "dashboard"
  | "free-scan"
  | "billing"
  | "conversion"
  | "email-deliverability"
  | "email-sequences"
  | "returning-customer"
  | "security"
  | "analytics";

export type CustomerPlatformRule = {
  key: string;
  label: string;
  area: CustomerPlatformArea;
  requirement: string;
  requiredControls: readonly string[];
  blockedBehavior: readonly string[];
};

export type CustomerDashboardZone = {
  key: string;
  label: string;
  purpose: string;
  requiredElements: readonly string[];
  conversionRole: string;
};

export type CustomerEmailSequenceRule = {
  key: string;
  label: string;
  trigger: string;
  requirement: string;
  requiredControls: readonly string[];
  blockedBehavior: readonly string[];
};

export const CUSTOMER_PLATFORM_RULES = [
  {
    key: "signup-first-free-scan",
    label: "Signup-first Free Scan",
    area: "signup",
    requirement: "Free Scan must create or attach a customer account so the customer becomes a platform member, verifies email, completes the Free Scan form, and lands in a branded dashboard with scan status and results.",
    requiredControls: ["low-friction signup", "email capture", "provider signup buttons", "email/password signup option", "consent and terms acceptance", "account attach", "dashboard redirect", "duplicate account handling"],
    blockedBehavior: ["anonymous report ownership", "lost lead after scan", "unclear consent", "duplicate unmanaged accounts", "dashboardless customer journey", "forcing only one signup method"],
  },
  {
    key: "mandatory-email-confirmation-before-access",
    label: "Mandatory email confirmation before access",
    area: "email-verification",
    requirement: "Customers must confirm the email address they provide before signing in to the customer dashboard or accessing scan results. Dashboard access and result access require verified email.",
    requiredControls: ["single-use verification token", "token expiration", "rate-limited resend", "verified email flag", "verification audit event", "safe redirect allowlist", "dashboard gate", "generic account-existence messaging"],
    blockedBehavior: ["dashboard access before required verification", "account enumeration", "never-expiring token", "host-header-based verification URL", "unlimited resend", "unsafe redirect", "verification bypass"],
  },
  {
    key: "provider-and-password-signup-options",
    label: "Provider and password signup options",
    area: "authentication",
    requirement: "Customers should be able to sign up with major trusted email or identity providers where supported, or create an account by typing their email and password. Provider flows must be secure, permission-scoped, and account-linking-safe.",
    requiredControls: ["provider buttons", "email/password form", "OAuth state protection", "PKCE where applicable", "scoped permissions", "safe account linking", "duplicate email handling", "secure password policy", "password reset path"],
    blockedBehavior: ["overbroad provider permissions", "unsafe account linking", "provider-only lock-in", "password in email", "weak reset flow", "session fixation", "unverified provider email treated as verified without proof"],
  },
  {
    key: "support-email-identity",
    label: "Support email identity",
    area: "email-deliverability",
    requirement: "Transactional support mail should use Cendorq Support <support@cendorq.com> with aligned Cendorq branding, authenticated sending, and clear purpose-specific subjects.",
    requiredControls: ["Cendorq Support sender name", "support@cendorq.com From address", "aligned From domain", "SPF", "DKIM", "DMARC", "TLS sending", "reply handling"],
    blockedBehavior: ["unauthenticated mail", "domain spoofing", "misaligned From domain", "unclear sender", "no reply path", "generic sender identity"],
  },
  {
    key: "email-deliverability-authenticity",
    label: "Email deliverability and authenticity",
    area: "email-deliverability",
    requirement: "Cendorq email must authenticate as legitimate Cendorq mail and be monitored for inbox placement quality across verification, welcome, scan, billing, correction, and plan emails.",
    requiredControls: ["SPF", "DKIM", "DMARC", "TLS sending", "aligned From domain", "provider verification", "separate transactional and marketing streams", "unsubscribe where required", "spam-rate monitoring", "bounce/complaint handling"],
    blockedBehavior: ["unauthenticated mail", "mixed transactional and promotional confusion", "missing unsubscribe on marketing", "no bounce handling", "no complaint monitoring", "misaligned From domain"],
  },
  {
    key: "free-scan-after-verification-flow",
    label: "Free Scan after verification flow",
    area: "free-scan",
    requirement: "After email confirmation, the customer should go straight into the Free Scan form, with returning-customer information prefilled where safe and editable, then land in the dashboard after completion.",
    requiredControls: ["verified-email gate", "safe prefill", "editable business profile", "business identity resolution", "scan job creation", "dashboard landing", "result-ready state", "duplicate scan handling"],
    blockedBehavior: ["forcing repeated typing", "stale uneditable customer info", "scan without account owner", "lost form state", "false instant results", "unverified result access"],
  },
  {
    key: "member-dashboard-home-base",
    label: "Member dashboard home base",
    area: "dashboard",
    requirement: "The dashboard must become the customer home base for Free Scan status, report results, evidence summaries, plan recommendations, billing, next actions, support, and ongoing progress.",
    requiredControls: ["dashboard shell", "plan state", "scan status", "report cards", "next best action", "billing state", "support path", "brand-consistent layout", "customer profile memory"],
    blockedBehavior: ["empty dashboard", "unclear next step", "generic report storage", "unbranded account area", "missing billing state", "missing support path", "forgotten returning customer context"],
  },
  {
    key: "truthful-dashboard-conversion",
    label: "Truthful dashboard conversion",
    area: "conversion",
    requirement: "Dashboard conversion must push the next logical plan based on customer plan stage, evidence, confidence, open questions, and value unlocked by the next step, without lying, exaggerating, or hiding limitations.",
    requiredControls: ["plan-stage mapping", "evidence-backed CTA", "next-plan explainer", "what-you-get panel", "uncertainty limits", "proof-based urgency", "blocked-claim scan", "plan comparison drawer"],
    blockedBehavior: ["fear-only selling", "unsupported urgency", "guaranteed outcome CTA", "same upsell for every account", "hiding current plan limits", "confusing billing CTA"],
  },
  {
    key: "billing-and-entitlement-control",
    label: "Billing and entitlement control",
    area: "billing",
    requirement: "Billing must map plans, payments, invoices, subscription states, upgrades, downgrades, cancellations, and access entitlements into the customer dashboard and backend access rules.",
    requiredControls: ["billing customer ID", "plan entitlement record", "subscription status", "invoice access", "upgrade checkout", "billing portal", "webhook processing", "access provisioning/deprovisioning", "failed-payment handling"],
    blockedBehavior: ["paid access without entitlement", "stale subscription state", "unhandled failed payment", "manual-only upgrade", "missing invoice access", "billing status not reflected in dashboard"],
  },
  {
    key: "returning-customer-memory",
    label: "Returning customer memory",
    area: "returning-customer",
    requirement: "Returning customers should see remembered business profiles, prior scans, prior reports, plan state, open recommendations, billing state, and prefilled forms while retaining control to edit or add a new business.",
    requiredControls: ["known customer profile", "business switcher", "safe prefill", "prior report list", "open recommendations", "plan state", "new business option", "privacy-safe memory"],
    blockedBehavior: ["forcing complete re-entry", "wrong business prefill", "no new business path", "cross-business leakage", "stale plan display"],
  },
  {
    key: "customer-platform-analytics",
    label: "Customer platform analytics",
    area: "analytics",
    requirement: "Customer platform events must track signup funnel, email verification, dashboard activation, scan completion, report views, CTA clicks, checkout starts, plan upgrades, billing issues, support requests, and churn-risk signals without exposing private report content.",
    requiredControls: ["event taxonomy", "privacy-safe analytics", "conversion funnel", "activation metric", "billing metric", "support metric", "capacity metric", "no raw report analytics"],
    blockedBehavior: ["tracking private evidence as analytics", "no funnel visibility", "unbounded analytics payload", "no conversion attribution", "silent dashboard failure"],
  },
] as const satisfies readonly CustomerPlatformRule[];

export const CUSTOMER_DASHBOARD_ZONES = [
  { key: "executive-home", label: "Executive home", purpose: "Give immediate clarity on business, plan, email verification, scan/report status, scorecards, and next best action.", requiredElements: ["business logo/name", "plan badge", "verification badge", "scan/report status", "top scorecards", "next best action", "support shortcut"], conversionRole: "Make the correct next plan feel obvious and valuable without hiding current-plan limits." },
  { key: "report-vault", label: "Report vault", purpose: "Store Free Scan, Full Diagnosis, Optimization, and Monthly Control outputs with version, date, confidence, and status metadata.", requiredElements: ["report cards", "plan stage", "version", "delivered date", "confidence labels", "download/view action", "correction history marker"], conversionRole: "Show what the customer already received and what deeper plans unlock next." },
  { key: "growth-roadmap", label: "Growth roadmap", purpose: "Convert findings into a clear timeline of recommended actions, open questions, fixes, and monitoring steps.", requiredElements: ["issue priority", "recommended sequence", "impact explanation", "confidence", "plan needed", "completion status", "next milestone"], conversionRole: "Position Optimization and Monthly Control as logical continuation, not pressure selling." },
  { key: "billing-and-plan-center", label: "Billing and plan center", purpose: "Let customers see plan, invoices, payment status, upgrades, subscription state, and billing portal actions.", requiredElements: ["current plan", "entitlements", "invoice links", "payment status", "upgrade CTA", "billing portal", "renewal or status message"], conversionRole: "Make upgrades simple, transparent, and tied to plan value." },
  { key: "trust-and-proof-center", label: "Trust and proof center", purpose: "Explain methodology, evidence classes, confidence labels, limitations, guarantees, and correction window in customer-safe language.", requiredElements: ["methodology summary", "evidence legend", "confidence explanation", "guarantee limits", "correction window", "support contact"], conversionRole: "Increase trust so conversion comes from proof and transparency." },
] as const satisfies readonly CustomerDashboardZone[];

export const CUSTOMER_EMAIL_SEQUENCE_RULES = [
  {
    key: "one-time-welcome-email",
    label: "One-time welcome email",
    trigger: "First successful verified account creation only",
    requirement: "Every new verified signup should receive one premium Cendorq welcome email only once. Sender: Cendorq Support <support@cendorq.com>. Recommended subject: Welcome to Cendorq — your business intelligence dashboard is ready.",
    requiredControls: ["welcome sent flag", "verified email requirement", "brand template", "dashboard CTA", "support link", "guarantee-safe language", "no duplicate welcome"],
    blockedBehavior: ["duplicate welcome spam", "welcome before verification when blocked", "unsupported promise", "missing dashboard CTA", "generic low-quality email"],
  },
  {
    key: "email-confirmation-message",
    label: "Email confirmation message",
    trigger: "Signup requires email ownership confirmation",
    requirement: "Send a concise verification email from Cendorq Support <support@cendorq.com>. Recommended subject: Confirm your Cendorq account to start your Free Scan.",
    requiredControls: ["single-use link", "expiration", "safe redirect", "generic resend", "support link", "no account enumeration"],
    blockedBehavior: ["never-expiring link", "unsafe redirect", "revealing account existence", "unlimited resend"],
  },
  {
    key: "free-scan-result-email",
    label: "Free Scan result email",
    trigger: "Free Scan result ready",
    requirement: "Send a branded Free Scan result email with a concise copy of the scan summary, dashboard link, confidence/limitation language, and a truthful Full Diagnosis call to action.",
    requiredControls: ["result-ready trigger", "summary copy", "dashboard link", "Full Diagnosis CTA", "confidence language", "preference compliance where required", "delivery event"],
    blockedBehavior: ["full diagnosis claims", "unsupported urgency", "missing dashboard link", "no confidence language", "spammy CTA"],
  },
  {
    key: "paid-plan-email-sequences",
    label: "Paid plan email sequences",
    trigger: "Full Diagnosis, Optimization, or Monthly Control purchase/status event",
    requirement: "Paid plan emails must be nuanced by plan stage: onboarding, status, delivery, next-step, billing, correction, and renewal/retention messages should match the customer's current plan and truthfully guide the next logical action.",
    requiredControls: ["plan-stage template", "billing state", "report status", "next-plan CTA", "support link", "correction path", "preference controls"],
    blockedBehavior: ["same sequence for every plan", "wrong plan CTA", "missing billing context", "missing correction notice", "hype without proof"],
  },
] as const satisfies readonly CustomerEmailSequenceRule[];

export function getCustomerPlatformStandard() {
  return {
    rules: CUSTOMER_PLATFORM_RULES,
    dashboardZones: CUSTOMER_DASHBOARD_ZONES,
    emailSequenceRules: CUSTOMER_EMAIL_SEQUENCE_RULES,
  };
}
