export type CustomerPlatformRouteKey =
  | "signup"
  | "login"
  | "verifyEmail"
  | "dashboard"
  | "dashboardReports"
  | "dashboardBilling"
  | "dashboardNotifications"
  | "dashboardSupport"
  | "dashboardSupportStatus"
  | "freeCheck"
  | "plans";

export type CustomerPlatformRoute = {
  key: CustomerPlatformRouteKey;
  path: string;
  label: string;
  purpose: string;
  access: "public" | "verification" | "verified-customer";
};

export type CustomerPlatformStage = {
  key: string;
  label: string;
  route: CustomerPlatformRouteKey;
  customerPromise: string;
  conversionRole: string;
};

export const CUSTOMER_PLATFORM_ROUTES = [
  {
    key: "signup",
    path: "/signup",
    label: "Create account",
    purpose: "Start the customer platform relationship before Free Scan intake.",
    access: "public",
  },
  {
    key: "login",
    path: "/login",
    label: "Customer re-entry",
    purpose: "Magic-link-first returning customer access for dashboard, reports, billing, support, and paid plan continuation.",
    access: "public",
  },
  {
    key: "verifyEmail",
    path: "/verify-email",
    label: "Confirm email",
    purpose: "Confirm email ownership and redirect the verified customer straight into dashboard activation.",
    access: "verification",
  },
  {
    key: "dashboard",
    path: "/dashboard",
    label: "Dashboard",
    purpose: "Customer command room for scan status, results, next steps, proof, support, and plan progression.",
    access: "verified-customer",
  },
  {
    key: "dashboardReports",
    path: "/dashboard/reports",
    label: "Report vault",
    purpose: "Verified customer report vault for Free Scan, Deep Review, Build Fix, and Ongoing Control outputs.",
    access: "verified-customer",
  },
  {
    key: "dashboardBilling",
    path: "/dashboard/billing",
    label: "Billing and plans",
    purpose: "Verified customer billing, invoices, entitlements, upgrade paths, and plan state.",
    access: "verified-customer",
  },
  {
    key: "dashboardNotifications",
    path: "/dashboard/notifications",
    label: "Notification center",
    purpose: "Verified customer notification center for lifecycle alerts, security prompts, billing actions, report readiness, and support states.",
    access: "verified-customer",
  },
  {
    key: "dashboardSupport",
    path: "/dashboard/support",
    label: "Support and corrections",
    purpose: "Verified customer support center for report questions, correction requests, billing help, security concerns, and plan guidance.",
    access: "verified-customer",
  },
  {
    key: "dashboardSupportStatus",
    path: "/dashboard/support/status",
    label: "Support status",
    purpose: "Verified customer support status center for customer-safe request status, approved next actions, and safe support follow-through.",
    access: "verified-customer",
  },
  {
    key: "freeCheck",
    path: "/free-check",
    label: "Free Scan",
    purpose: "Guided scan form after signup and verification when the customer is ready to submit business details.",
    access: "public",
  },
  {
    key: "plans",
    path: "/plans",
    label: "Plans",
    purpose: "Public plan comparison and plan-stage education.",
    access: "public",
  },
] as const satisfies readonly CustomerPlatformRoute[];

export const CUSTOMER_PLATFORM_STAGES = [
  {
    key: "account-created",
    label: "Account created",
    route: "signup",
    customerPromise: "Create a secure Cendorq account using provider access, email magic link, or email and password fallback.",
    conversionRole: "Move the customer into a Cendorq-owned platform relationship before the Free Scan.",
  },
  {
    key: "email-confirmed",
    label: "Email confirmed",
    route: "verifyEmail",
    customerPromise: "Click the confirmation email once and land directly in the dashboard.",
    conversionRole: "Protect the account, validate deliverability, activate the dashboard, and improve future follow-up quality.",
  },
  {
    key: "dashboard-reentry",
    label: "Dashboard re-entry",
    route: "login",
    customerPromise: "Return with email magic link first, passkey-ready access later, and password as fallback.",
    conversionRole: "Recover returning customers quickly so they can continue reports, billing, support, and paid plan decisions.",
  },
  {
    key: "free-scan-submitted",
    label: "Free Scan submitted",
    route: "freeCheck",
    customerPromise: "Submit business details once, with returning-customer prefill ready later.",
    conversionRole: "Create a clean first read and route the customer to the dashboard.",
  },
  {
    key: "dashboard-activated",
    label: "Dashboard activated",
    route: "dashboard",
    customerPromise: "See status, findings, proof, next actions, and plan guidance in one place.",
    conversionRole: "Convert Free Scan users into Deep Review through proof and clear limitations.",
  },
  {
    key: "report-vault-opened",
    label: "Report vault opened",
    route: "dashboardReports",
    customerPromise: "Keep every report, confidence label, version, and correction marker organized.",
    conversionRole: "Show the customer what they have received and what deeper work unlocks.",
  },
  {
    key: "billing-ready",
    label: "Billing ready",
    route: "dashboardBilling",
    customerPromise: "See plan, invoices, billing status, and upgrade options without friction.",
    conversionRole: "Make checkout and upgrades transparent, fast, and entitlement-safe.",
  },
  {
    key: "notifications-controlled",
    label: "Notifications controlled",
    route: "dashboardNotifications",
    customerPromise: "See important account, report, billing, support, and security alerts without noise or hidden risk.",
    conversionRole: "Keep customers moving through the right next step while preserving trust, suppression, and safety boundaries.",
  },
  {
    key: "support-protected",
    label: "Support protected",
    route: "dashboardSupport",
    customerPromise: "Ask for help, corrections, billing guidance, or security review through a protected, documented support path.",
    conversionRole: "Protect trust, reduce disputes, and keep high-intent customers moving with service instead of pressure.",
  },
  {
    key: "support-status-visible",
    label: "Support status visible",
    route: "dashboardSupportStatus",
    customerPromise: "Track request status through customer-safe fields without exposing internal notes, raw evidence, billing data, or security details.",
    conversionRole: "Reduce anxiety, keep customers moving, and preserve trust after support submission.",
  },
] as const satisfies readonly CustomerPlatformStage[];

export const CUSTOMER_PLATFORM_ROUTE_GUARDS = [
  "dashboard access requires verified email",
  "verification click redirects to dashboard",
  "login uses magic link first with passkey-ready path and password fallback",
  "scan results require account ownership",
  "billing access requires authenticated customer",
  "report vault access requires matching customer and business boundary",
  "notification center access requires authenticated customer ownership and route authorization",
  "notification center must not render raw evidence, raw security payloads, raw billing IDs, secrets, prompts, or private report internals",
  "support center access requires authenticated customer ownership and route authorization",
  "support status access requires authenticated customer ownership, session authorization, and customer-safe projection",
  "support status must not render raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
  "support center must not promise refunds, legal outcomes, report changes, billing changes, or guaranteed results without approval",
  "support center must preserve correction path, billing help, security review, and escalation visibility",
  "provider signup, email magic link, and email/password fallback must remain available",
  "Cendorq Support <support@cendorq.com> remains the transactional sender identity",
  "welcome email is one-time only after verified account creation",
  "transactional and marketing email consent must stay separated",
  "SPF DKIM DMARC and suppression handling are required before scaling lifecycle email",
  "conversion CTAs must be plan-stage and evidence-backed",
] as const;

export function getCustomerPlatformRouteMap() {
  return {
    routes: CUSTOMER_PLATFORM_ROUTES,
    stages: CUSTOMER_PLATFORM_STAGES,
    guards: CUSTOMER_PLATFORM_ROUTE_GUARDS,
  };
}
