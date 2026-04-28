export type CustomerAccessSurface =
  | "dashboard"
  | "report-vault"
  | "billing-center"
  | "notification-center"
  | "support-center"
  | "support-request-api"
  | "free-scan"
  | "plans";

export type CustomerAccessRequirement =
  | "authenticated-customer"
  | "verified-email"
  | "customer-ownership"
  | "business-boundary"
  | "route-authorization"
  | "billing-entitlement"
  | "report-release-approval"
  | "support-context"
  | "risk-reauth"
  | "safe-projection";

export type CustomerAccessGatewayRule = {
  key: string;
  label: string;
  surface: CustomerAccessSurface;
  pathPattern: string;
  requirements: readonly CustomerAccessRequirement[];
  allowedWhen: string;
  deniedWhen: readonly string[];
  safeFailure: string;
  requiredAuditEvents: readonly string[];
};

export type CustomerAccessTokenBoundary = {
  key: string;
  label: string;
  requirement: string;
  clientAllowed: boolean;
  serverOnly: boolean;
  blockedBehavior: readonly string[];
};

export const CUSTOMER_ACCESS_GATEWAY_RULES = [
  {
    key: "dashboard-access",
    label: "Dashboard access",
    surface: "dashboard",
    pathPattern: "/dashboard",
    requirements: ["authenticated-customer", "verified-email", "customer-ownership", "route-authorization", "risk-reauth"],
    allowedWhen: "A verified customer session owns the customer account and the session is not revoked, locked, expired, or reauthentication-blocked.",
    deniedWhen: ["anonymous session", "unverified email", "revoked session", "locked account", "risky session without reauthentication", "cross-customer access"],
    safeFailure: "Route to verification, reauthentication, or support without exposing account existence or internal risk details.",
    requiredAuditEvents: ["dashboard-access-allowed", "dashboard-access-denied", "reauth-required"],
  },
  {
    key: "report-vault-access",
    label: "Report vault access",
    surface: "report-vault",
    pathPattern: "/dashboard/reports",
    requirements: ["authenticated-customer", "verified-email", "customer-ownership", "business-boundary", "route-authorization", "report-release-approval", "safe-projection"],
    allowedWhen: "A verified customer owns the business boundary and the requested report has passed release approval for that customer.",
    deniedWhen: ["unapproved report", "cross-business report", "cross-customer report", "raw evidence request", "private report internals request"],
    safeFailure: "Show unavailable or review-pending state without leaking report existence, raw evidence, private internals, or other customer data.",
    requiredAuditEvents: ["report-vault-access-allowed", "report-vault-access-denied", "report-release-required"],
  },
  {
    key: "billing-center-access",
    label: "Billing center access",
    surface: "billing-center",
    pathPattern: "/dashboard/billing",
    requirements: ["authenticated-customer", "verified-email", "customer-ownership", "route-authorization", "billing-entitlement", "safe-projection"],
    allowedWhen: "A verified customer owns the account and can view only safe plan, entitlement, invoice, and billing portal state for their customer boundary.",
    deniedWhen: ["cross-customer billing access", "raw billing IDs request", "raw payment data request", "paid access without entitlement", "revoked billing session"],
    safeFailure: "Show support or billing recovery path without exposing raw billing identifiers, payment details, or provider internals.",
    requiredAuditEvents: ["billing-access-allowed", "billing-access-denied", "billing-entitlement-check"],
  },
  {
    key: "notification-center-access",
    label: "Notification center access",
    surface: "notification-center",
    pathPattern: "/dashboard/notifications",
    requirements: ["authenticated-customer", "verified-email", "customer-ownership", "route-authorization", "safe-projection"],
    allowedWhen: "A verified customer owns the notification boundary and sees only notifications projected for their customer, business, report, billing, support, and security state.",
    deniedWhen: ["cross-customer notification", "raw security payload request", "attacker detail request", "risk-scoring internals request", "raw billing ID request"],
    safeFailure: "Show empty, resolved, or unavailable notification state without exposing private security, billing, prompt, or report internals.",
    requiredAuditEvents: ["notification-access-allowed", "notification-access-denied"],
  },
  {
    key: "support-center-access",
    label: "Support center access",
    surface: "support-center",
    pathPattern: "/dashboard/support",
    requirements: ["authenticated-customer", "verified-email", "customer-ownership", "route-authorization", "safe-projection"],
    allowedWhen: "A verified customer owns the support boundary and can create or view safe support/correction/billing/security guidance for their account only.",
    deniedWhen: ["cross-customer support request", "raw internal notes request", "unapproved refund promise request", "unapproved legal or report-change promise request"],
    safeFailure: "Show support unavailable or verification-required state without exposing internal notes, approval state, or other customer requests.",
    requiredAuditEvents: ["support-access-allowed", "support-access-denied"],
  },
  {
    key: "support-request-api-access",
    label: "Support request API access",
    surface: "support-request-api",
    pathPattern: "/api/customer/support/request",
    requirements: ["authenticated-customer", "verified-email", "customer-ownership", "support-context", "route-authorization", "safe-projection"],
    allowedWhen: "A verified customer context is created server-side and submitted to the support API without exposing secret context keys to the browser.",
    deniedWhen: ["missing support context", "client-generated support context", "invalid support context", "raw payload storage request", "unsupported request type"],
    safeFailure: "Return no-store JSON with generic verification-required messaging and no account existence, secret, or risk-scoring disclosure.",
    requiredAuditEvents: ["support-request-api-allowed", "support-request-api-denied", "support-request-risk-decision"],
  },
  {
    key: "free-scan-access",
    label: "Free Scan access",
    surface: "free-scan",
    pathPattern: "/free-check",
    requirements: ["route-authorization", "safe-projection"],
    allowedWhen: "A visitor or verified customer can start the Free Scan, with enhanced dashboard linking when verified.",
    deniedWhen: ["oversized payload", "hostile input", "unsupported route source", "unsafe redirect", "unbounded submission"],
    safeFailure: "Reject unsafe input with clear customer-safe message and no stack traces or internal scoring leakage.",
    requiredAuditEvents: ["free-scan-submission-accepted", "free-scan-submission-denied", "hostile-input-detected"],
  },
  {
    key: "plans-access",
    label: "Plans access",
    surface: "plans",
    pathPattern: "/plans",
    requirements: ["safe-projection"],
    allowedWhen: "Public users and verified customers can compare plan value, entitlement, and next-step logic without private account state leakage.",
    deniedWhen: ["hidden pricing state", "unsupported claim", "guaranteed outcome", "unqualified benchmark", "private customer evidence"],
    safeFailure: "Show public-safe plan copy with support path and no private account or report data.",
    requiredAuditEvents: ["plan-copy-review-required"],
  },
] as const satisfies readonly CustomerAccessGatewayRule[];

export const CUSTOMER_ACCESS_TOKEN_BOUNDARIES = [
  {
    key: "support-context-server-only",
    label: "Support context is server-only",
    requirement: "The support request API context key must be minted or checked server-side and must never be embedded into client JavaScript, public environment variables, HTML, analytics, logs, or emails.",
    clientAllowed: false,
    serverOnly: true,
    blockedBehavior: ["public support context header", "NEXT_PUBLIC support context secret", "context key in browser fetch", "context key in HTML", "context key in analytics", "context key in email"],
  },
  {
    key: "admin-read-keys-server-only",
    label: "Admin read keys are server-only",
    requirement: "Support, intake, and admin read keys are server-only operational secrets and cannot be exposed to customers, dashboards, support messages, or client code.",
    clientAllowed: false,
    serverOnly: true,
    blockedBehavior: ["admin key in client", "admin key in URL", "admin key in dashboard", "admin key in support response", "admin key in public env"],
  },
  {
    key: "customer-session-cookie-boundary",
    label: "Customer session cookie boundary",
    requirement: "Customer sessions must be stored in secure, httpOnly, sameSite cookies or equivalent server-managed session controls; sensitive tokens must not be stored in localStorage or sessionStorage.",
    clientAllowed: false,
    serverOnly: true,
    blockedBehavior: ["session token in localStorage", "session token in sessionStorage", "session ID in URL", "long-lived unrevocable session", "password-only admin access"],
  },
] as const satisfies readonly CustomerAccessTokenBoundary[];

export const CUSTOMER_ACCESS_GATEWAY_GUARDS = [
  "no dashboard route without authenticated customer ownership and verified email once auth is active",
  "no customer object response without server-side customer ownership and business boundary checks",
  "no billing response without entitlement checks and safe billing projection",
  "no report response without release approval and safe report projection",
  "no support request API call from client-owned secret context",
  "no admin or support context key in browser JavaScript, public environment variables, HTML, analytics, logs, emails, or URLs",
  "no risky session can access sensitive customer, billing, report, support, or security actions without reauthentication or lockout path",
  "no safe failure can disclose account existence, risk-scoring internals, attacker details, raw evidence, raw billing IDs, prompts, secrets, or private report internals",
] as const;

export function getCustomerAccessGatewayContracts() {
  return {
    rules: CUSTOMER_ACCESS_GATEWAY_RULES,
    tokenBoundaries: CUSTOMER_ACCESS_TOKEN_BOUNDARIES,
    guards: CUSTOMER_ACCESS_GATEWAY_GUARDS,
  };
}
