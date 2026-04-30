export const PRODUCTION_AUTH_PROVIDER_CONTRACT = {
  id: "production-auth-provider-contract",
  name: "Production Auth Provider Contract",
  purpose:
    "Define the exact requirements for connecting a real auth provider without weakening Cendorq customer session, verification, CSRF, ownership, safe failure, or browser-secret safeguards.",
  allowedProviderPatterns: [
    "managed identity provider with server-side session boundary",
    "email/password provider with server-side password hashing and reset-token hashing",
    "OAuth/OIDC provider with server-only token exchange and verified redirect allowlist",
    "passwordless email provider with expiring, single-use, server-hashed verification tokens",
  ],
  requiredProviderCapabilities: [
    "server-side account id and customer id mapping",
    "verified email claim or equivalent verified-email state",
    "revocable sessions",
    "session expiration and rotation",
    "single-use email verification token support",
    "single-use password reset token support when password auth is enabled",
    "audit events for signup, login, logout, verification, reset, provider link, session revoke, and denial",
    "generic safe failures without account-existence leakage",
    "origin and redirect allowlist enforcement",
    "rate-limit and abuse controls",
  ],
  integrationStages: [
    {
      key: "provider-selection",
      label: "Provider selection",
      requiredProof: ["provider supports verified email", "provider supports revocation", "provider supports server-side token exchange", "provider supports audit logging"],
      releaseGate: "provider cannot be connected until secret storage, redirect allowlist, and safe failure behavior are documented",
    },
    {
      key: "signup-and-verification",
      label: "Signup and email verification",
      requiredProof: ["generic signup response", "single-use verification token hash", "verified email state", "welcome sent flag"],
      releaseGate: "dashboard value remains gated until verified email is true",
    },
    {
      key: "session-issuance",
      label: "Session issuance",
      requiredProof: ["httpOnly cookie", "secure cookie in production", "sameSite cookie", "server-side session validation", "rotation and revocation"],
      releaseGate: "no session authority may be stored in localStorage, sessionStorage, URLs, analytics, emails, HTML, or public JavaScript",
    },
    {
      key: "protected-api-bridge",
      label: "Protected API bridge",
      requiredProof: ["customer ownership check", "route authorization", "CSRF or equivalent protection", "no-store JSON", "safe failure"],
      releaseGate: "protected customer APIs remain closed without server-validated session, ownership, and CSRF posture where required",
    },
    {
      key: "reauth-and-recovery",
      label: "Reauthentication and recovery",
      requiredProof: ["fresh reauth timestamp", "reset token hash", "attempt counter", "revocation path", "audit events"],
      releaseGate: "billing, security, email change, password reset, provider-link, and report-sensitive actions require the matching reauth or recovery gate",
    },
  ],
  safeFailureRules: [
    "Signup, login, verification, reset, support, and protected API failures must not disclose whether an account exists.",
    "Verification failures must ask for a new verification link without exposing token validity, token internals, account state, or lockout internals.",
    "Login failures must use generic denial or verification-required posture without exposing provider mismatch, exact risk reason, or account existence.",
    "Protected API failures must return no-store JSON with generic authorization failure and no object-existence, account-existence, billing, report, support, or security leakage.",
  ],
  browserSecretLocks: [
    "No customer session token in localStorage.",
    "No customer session token in sessionStorage.",
    "No customer session token in URLs, analytics, HTML, email, logs, or public JavaScript.",
    "No CSRF token in URLs, analytics, email, logs, or third-party scripts.",
    "No raw OAuth provider access token, refresh token, password reset token, verification token, admin key, support context key, or private key in browser storage.",
  ],
  dataProjectionLocks: [
    "No raw provider payloads in customer-visible records.",
    "No provider tokens in customer support summaries.",
    "No security risk scores, attacker details, detection internals, prompts, secrets, passwords, private keys, session tokens, CSRF tokens, admin keys, or support context keys in customer-facing copy.",
    "No cross-customer data and no account-existence leakage.",
  ],
  releaseRules: [
    "Provider integration cannot ship until validate:routes covers provider readiness contracts.",
    "Provider integration cannot ship until signup, verification, login, logout, protected API, reset, reauth, and revocation failure states are generic and audited.",
    "Provider integration cannot ship until welcome email is one-time only, verified-email gated, and sent from Cendorq Support <support@cendorq.com>.",
    "Provider integration cannot ship until customer dashboard, support, billing, report vault, notifications, and Free Scan handoff use server-derived customer context instead of browser-carried authority.",
  ],
} as const;

export const PRODUCTION_AUTH_PROVIDER_BLOCKED_PATTERNS = [
  "accountExistenceLeak",
  "browserSessionToken",
  "localStorageSessionToken",
  "sessionStorageSessionToken",
  "urlSessionToken",
  "analyticsSessionToken",
  "publicJavaScriptSessionAuthority",
  "rawProviderPayloadProjection",
  "rawProviderTokenExposure",
  "rawPasswordExposure",
  "plaintextPasswordStorage",
  "csrfTokenUrlExposure",
  "supportContextSecretInBrowser",
  "crossCustomerSessionAccess",
  "verificationTokenReplay",
  "resetTokenReplay",
  "unguardedDashboardValue",
  "protectedApiWithoutCsrf",
  "protectedApiWithoutOwnership",
  "welcomeEmailDuplicate",
  "welcomeEmailBeforeVerification",
] as const;

export function getProductionAuthProviderContract() {
  return PRODUCTION_AUTH_PROVIDER_CONTRACT;
}
