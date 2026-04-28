export type CustomerAuthSurface =
  | "signup"
  | "email-verification"
  | "login"
  | "logout"
  | "session-refresh"
  | "dashboard-route"
  | "protected-api"
  | "support-request"
  | "billing-action"
  | "report-access"
  | "security-reauth";

export type CustomerAuthRequirement =
  | "provider-signup"
  | "email-password-signup"
  | "email-confirmation"
  | "verified-email"
  | "http-only-session"
  | "secure-cookie"
  | "same-site-cookie"
  | "csrf-protection"
  | "rate-limit"
  | "customer-ownership"
  | "business-boundary"
  | "entitlement-check"
  | "reauth-required"
  | "audit-event"
  | "safe-failure";

export type CustomerSessionAuthRule = {
  key: string;
  label: string;
  surface: CustomerAuthSurface;
  requirements: readonly CustomerAuthRequirement[];
  allowedWhen: string;
  deniedWhen: readonly string[];
  requiredState: readonly string[];
  safeFailure: string;
  requiredAuditEvents: readonly string[];
};

export type CustomerSessionCookieContract = {
  key: string;
  label: string;
  requirement: string;
  mustBe: readonly string[];
  blockedBehavior: readonly string[];
};

export const CUSTOMER_SESSION_AUTH_RULES = [
  {
    key: "signup-provider-and-password",
    label: "Signup supports providers and email/password",
    surface: "signup",
    requirements: ["provider-signup", "email-password-signup", "rate-limit", "safe-failure", "audit-event"],
    allowedWhen: "A visitor signs up through an approved identity provider or email/password path and the request passes abuse, bot, and rate-limit checks.",
    deniedWhen: ["known abusive source", "bot or automation abuse", "credential stuffing pattern", "unsafe redirect", "unsupported provider", "malformed email"],
    requiredState: ["signup method", "email candidate", "provider identity when applicable", "rate-limit decision", "created account state"],
    safeFailure: "Return a generic signup failure or verification-required path without confirming whether an email already exists.",
    requiredAuditEvents: ["signup-started", "signup-accepted", "signup-denied", "signup-rate-limited"],
  },
  {
    key: "email-verification-required",
    label: "Email verification required before dashboard value",
    surface: "email-verification",
    requirements: ["email-confirmation", "verified-email", "rate-limit", "safe-failure", "audit-event"],
    allowedWhen: "A single-use, expiring verification token matches the server-side account verification record and has not been consumed.",
    deniedWhen: ["expired token", "consumed token", "invalid token", "token/account mismatch", "too many resend attempts", "locked account"],
    requiredState: ["verification token hash", "token expiration", "consumed flag", "resend counter", "welcome sent flag"],
    safeFailure: "Ask the customer to request a new verification link without disclosing account existence or token internals.",
    requiredAuditEvents: ["email-verification-sent", "email-verification-accepted", "email-verification-denied", "welcome-email-suppressed-or-sent"],
  },
  {
    key: "login-session-issued",
    label: "Login issues protected server session",
    surface: "login",
    requirements: ["verified-email", "http-only-session", "secure-cookie", "same-site-cookie", "csrf-protection", "rate-limit", "audit-event"],
    allowedWhen: "A verified customer authenticates successfully and a server-managed session is issued with secure cookie controls.",
    deniedWhen: ["unverified email", "invalid credentials", "provider mismatch", "locked account", "high-risk source", "rate-limit exceeded"],
    requiredState: ["customer id", "email verified flag", "session id hash", "session expiration", "csrf token hash", "device/session trust state"],
    safeFailure: "Return a generic login failure or verification-required path without saying whether the account exists.",
    requiredAuditEvents: ["login-accepted", "login-denied", "session-issued", "risk-reauth-required"],
  },
  {
    key: "dashboard-route-auth",
    label: "Dashboard route authorization",
    surface: "dashboard-route",
    requirements: ["verified-email", "http-only-session", "customer-ownership", "safe-failure", "audit-event"],
    allowedWhen: "A verified customer has a valid server session that owns the requested dashboard route and no reauthentication block is active.",
    deniedWhen: ["anonymous visitor", "unverified email", "expired session", "revoked session", "locked account", "cross-customer route", "reauth-required"],
    requiredState: ["customer id", "verified email", "session status", "route authorization", "reauth status"],
    safeFailure: "Redirect to login, verification, or reauthentication without leaking account, report, billing, or security details.",
    requiredAuditEvents: ["dashboard-route-allowed", "dashboard-route-denied", "dashboard-reauth-required"],
  },
  {
    key: "protected-api-session-auth",
    label: "Protected API session authorization",
    surface: "protected-api",
    requirements: ["http-only-session", "csrf-protection", "customer-ownership", "safe-failure", "audit-event"],
    allowedWhen: "A protected API request has a valid server-managed customer session, CSRF protection where required, route authorization, and customer ownership.",
    deniedWhen: ["missing session", "invalid csrf", "revoked session", "cross-customer object", "client-owned secret context", "unsafe origin"],
    requiredState: ["session id hash", "customer id", "csrf decision", "route authorization", "ownership decision"],
    safeFailure: "Return no-store JSON with generic authorization failure and no account existence, risk, or object-existence disclosure.",
    requiredAuditEvents: ["protected-api-allowed", "protected-api-denied", "csrf-denied"],
  },
  {
    key: "support-request-auth",
    label: "Support request auth bridge",
    surface: "support-request",
    requirements: ["http-only-session", "csrf-protection", "customer-ownership", "safe-failure", "audit-event"],
    allowedWhen: "The browser submits a support request using a valid customer session; the server derives customer context internally without exposing support context headers to client code.",
    deniedWhen: ["missing session", "client-supplied support context secret", "invalid csrf", "unsafe support payload", "cross-customer support request"],
    requiredState: ["customer session", "derived customer id", "safe support summary", "risk decision", "support audit id"],
    safeFailure: "Return generic support authorization failure while preserving the customer's safe form state client-side.",
    requiredAuditEvents: ["support-request-session-accepted", "support-request-session-denied", "support-request-risk-decision"],
  },
  {
    key: "billing-action-reauth",
    label: "Billing actions require entitlement and reauth when risky",
    surface: "billing-action",
    requirements: ["http-only-session", "csrf-protection", "customer-ownership", "entitlement-check", "reauth-required", "safe-failure", "audit-event"],
    allowedWhen: "A verified customer owns the billing account, entitlement checks pass, and risky billing actions have fresh reauthentication.",
    deniedWhen: ["cross-customer billing", "missing entitlement", "risky session", "missing reauth", "raw payment data request", "provider mismatch"],
    requiredState: ["customer id", "entitlement id", "billing state", "reauth timestamp", "billing portal session id hash"],
    safeFailure: "Show billing support or reauthentication path without exposing raw billing IDs, payment details, or provider internals.",
    requiredAuditEvents: ["billing-action-allowed", "billing-action-denied", "billing-reauth-required"],
  },
  {
    key: "report-access-release-auth",
    label: "Report access requires release approval and ownership",
    surface: "report-access",
    requirements: ["http-only-session", "customer-ownership", "business-boundary", "safe-failure", "audit-event"],
    allowedWhen: "A verified customer owns the business boundary and the report has passed release approval for that customer.",
    deniedWhen: ["cross-business report", "cross-customer report", "unapproved report", "raw evidence request", "private report internals request"],
    requiredState: ["customer id", "business id", "report id", "report version", "release approval state"],
    safeFailure: "Show unavailable or review-pending state without exposing report existence, raw evidence, or private internals.",
    requiredAuditEvents: ["report-access-allowed", "report-access-denied", "report-release-required"],
  },
  {
    key: "security-reauth-session",
    label: "Security reauthentication session",
    surface: "security-reauth",
    requirements: ["reauth-required", "verified-email", "http-only-session", "safe-failure", "audit-event"],
    allowedWhen: "A risky session, new device, or sensitive action requires the customer to reconfirm identity before continuing.",
    deniedWhen: ["failed reauth", "locked account", "revoked session", "suspicious token", "too many attempts"],
    requiredState: ["reauth challenge id hash", "session id hash", "device trust state", "reauth expiration", "attempt counter"],
    safeFailure: "Ask for reauthentication or support without revealing attacker details, risk scores, or detection internals.",
    requiredAuditEvents: ["reauth-started", "reauth-accepted", "reauth-denied", "account-lockout-triggered"],
  },
] as const satisfies readonly CustomerSessionAuthRule[];

export const CUSTOMER_SESSION_COOKIE_CONTRACTS = [
  {
    key: "customer-session-cookie",
    label: "Customer session cookie",
    requirement: "Customer sessions must be server-managed and stored in secure, httpOnly, sameSite cookies or equivalent secure server-side session controls.",
    mustBe: ["httpOnly", "secure in production", "sameSite=lax or stricter", "rotatable", "revocable", "expiring", "server-side validated"],
    blockedBehavior: ["session token in localStorage", "session token in sessionStorage", "session token in URL", "session token in analytics", "session token in email", "session token in public JavaScript"],
  },
  {
    key: "csrf-boundary",
    label: "CSRF boundary",
    requirement: "State-changing protected customer APIs must require CSRF or equivalent same-site, origin, and session-bound request protection.",
    mustBe: ["session-bound", "origin-checked", "rotatable", "not stored in analytics", "safe failure", "audited on denial"],
    blockedBehavior: ["state-changing API without CSRF", "CSRF token in URL", "CSRF token in analytics", "wildcard origin", "unsafe cross-site mutation"],
  },
  {
    key: "password-and-provider-boundary",
    label: "Password and provider boundary",
    requirement: "Email/password auth and provider auth must never store plaintext passwords, raw provider tokens, or secrets in customer-facing records, analytics, emails, logs, or browser storage.",
    mustBe: ["hashed passwords only", "provider token server boundary", "rate-limited", "breach-resistant failure copy", "password reset token hash", "single-use reset tokens"],
    blockedBehavior: ["plaintext password", "raw provider token in client", "password in email", "reset token in logs", "account existence disclosure"],
  },
] as const satisfies readonly CustomerSessionCookieContract[];

export const CUSTOMER_SESSION_AUTH_GUARDS = [
  "no protected dashboard route without server-validated customer session once auth is active",
  "no protected customer API without server-validated session, route authorization, ownership checks, and CSRF or equivalent protection where required",
  "no support request API should rely on a browser-exposed support context secret",
  "no customer session token, CSRF token, provider token, password, reset token, or admin secret in localStorage, sessionStorage, URL, analytics, HTML, emails, or public JavaScript",
  "no login, signup, verification, reset, or support failure may disclose account existence, security risk scores, attacker details, raw evidence, raw billing IDs, prompts, secrets, or private report internals",
  "no welcome email before verified account creation and no duplicate welcome after welcome sent flag is true",
  "no billing, report, support, or security action without customer ownership and the matching entitlement, business boundary, release approval, or reauthentication requirement",
  "no account recovery, email change, password reset, provider link, or session revocation without audit events and safe failure behavior",
] as const;

export function getCustomerSessionAuthContracts() {
  return {
    rules: CUSTOMER_SESSION_AUTH_RULES,
    cookieContracts: CUSTOMER_SESSION_COOKIE_CONTRACTS,
    guards: CUSTOMER_SESSION_AUTH_GUARDS,
  };
}
