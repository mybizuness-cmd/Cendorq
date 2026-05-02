import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const authPath = "src/lib/customer-session-auth-contracts.ts";
const gatewayPath = "src/lib/customer-access-gateway-contracts.ts";
const runtimePath = "src/lib/customer-access-gateway-runtime.ts";
const formPath = "src/components/customer-support/support-request-form.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(authPath, [
  "CUSTOMER_SESSION_AUTH_RULES",
  "CUSTOMER_SESSION_COOKIE_CONTRACTS",
  "CUSTOMER_SESSION_AUTH_GUARDS",
  "getCustomerSessionAuthContracts",
  "signup-provider-and-password",
  "email-verification-required",
  "login-session-issued",
  "dashboard-route-auth",
  "protected-api-session-auth",
  "support-request-auth",
  "billing-action-reauth",
  "report-access-release-auth",
  "security-reauth-session",
  "provider-signup",
  "email-password-signup",
  "email-confirmation",
  "verified-email",
  "http-only-session",
  "secure-cookie",
  "same-site-cookie",
  "csrf-protection",
  "customer-ownership",
  "business-boundary",
  "entitlement-check",
  "reauth-required",
  "safe-failure",
  "Customer sessions must be server-managed and stored in secure, httpOnly, sameSite cookies or equivalent secure server-side session controls.",
  "State-changing protected customer APIs must require CSRF or equivalent same-site, origin, and session-bound request protection.",
  "Email/password auth and provider auth must never store plaintext passwords, raw provider tokens, or secrets in customer-facing records, analytics, emails, logs, or browser storage.",
  "no protected dashboard route without server-validated customer session once auth is active",
  "no protected customer API without server-validated session, route authorization, ownership checks, and CSRF or equivalent protection where required",
  "no support request API should rely on a browser-exposed support context secret",
  "no customer session token, CSRF token, provider token, password, reset token, or admin secret in localStorage, sessionStorage, URL, analytics, HTML, emails, or public JavaScript",
  "no login, signup, verification, reset, or support failure may disclose account existence, security risk scores, attacker details, raw evidence, raw billing IDs, prompts, secrets, or private report internals",
  "no welcome email before verified account creation and no duplicate welcome after welcome sent flag is true",
  "no account recovery, email change, password reset, provider link, or session revocation without audit events and safe failure behavior",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(gatewayPath, [
  "CUSTOMER_ACCESS_GATEWAY_RULES",
  "customer-session-cookie-boundary",
  "no support request API call from client-owned secret context",
]);

expect(runtimePath, [
  "verifyCustomerSupportContext",
  "verifyAdminReadAccess",
  "CUSTOMER_ACCESS_GATEWAY_RUNTIME_GUARDS",
]);

expect(formPath, [
  "SupportRequestForm",
  "/api/customer/support/request",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-session-auth-contracts.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(authPath, [
  "session token in localStorage allowed",
  "session token in sessionStorage allowed",
  "plaintext password allowed",
  "raw provider token in client allowed",
  "account existence disclosure allowed",
  "state-changing API without CSRF allowed",
  "browser-exposed support context secret allowed",
  "password in email allowed",
  "reset token in logs allowed",
]);

if (failures.length) {
  console.error("Customer session auth contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer session auth contracts validation passed with owner posture coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
