export type CustomerPlatformRouteKey =
  | "signup"
  | "verifyEmail"
  | "dashboard"
  | "dashboardReports"
  | "dashboardBilling"
  | "dashboardNotifications"
  | "dashboardSupport"
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
    key: "verifyEmail",
    path: "/verify-email",
    label: "Confirm email",
    purpose: "Confirm email ownership before dashboard and result access.",
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
    customerPromise: "Create a secure Cendorq account using a provider or email and password.",
    conversionRole: "Move the customer into Cendorq-owned platform relationship before the Free Scan.",
  },
  {
    key: "email-confirmed",
    label: "Email confirmed",
    route: "verifyEmail",
    customerPromise: "Confirm email ownership before dashboard and result access.",
    conversionRole: "Protect the account, validate deliverability, and improve future follow-up quality.",
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
] as const satisfies readonly CustomerPlatformStage[];

export const CUSTOMER_PLATFORM_ROUTE_GUARDS = [
  "dashboard access requires verified email",
  "scan results require account ownership",
  "billing access requires authenticated customer",
  "report vault access requires matching customer and business boundary",
  "notification center access requires authenticated customer ownership and route authorization",
  "notification center must not render raw evidence, raw security payloads, raw billing IDs, secrets, prompts, or private report internals",
  "support center access requires authenticated customer ownership and route authorization",
  "support center must not promise refunds, legal outcomes, report changes, billing changes, or guaranteed results without approval",
  "support center must preserve correction path, billing help, security review, and escalation visibility",
  "provider signup and email/password signup must remain available",
  "Cendorq Support <support@cendorq.com> remains the transactional sender identity",
  "welcome email is one-time only after verified account creation",
  "conversion CTAs must be plan-stage and evidence-backed",
] as const;

export function getCustomerPlatformRouteMap() {
  return {
    routes: CUSTOMER_PLATFORM_ROUTES,
    stages: CUSTOMER_PLATFORM_STAGES,
    guards: CUSTOMER_PLATFORM_ROUTE_GUARDS,
  };
}
