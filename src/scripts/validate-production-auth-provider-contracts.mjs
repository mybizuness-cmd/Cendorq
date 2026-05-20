import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/production-auth-provider-contracts.ts";
const runtimeBoundaryPath = "src/lib/customer-auth-provider-runtime-boundary.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-production-auth-provider-contracts.mjs";
const failures = [];

expect(contractPath, [
  "PRODUCTION_AUTH_PROVIDER_CONTRACT",
  "PRODUCTION_AUTH_PROVIDER_BLOCKED_PATTERNS",
  "Production Auth Provider Contract",
  "server-side session boundary",
  "verified email claim",
  "revocable sessions",
  "session expiration and rotation",
  "single-use email verification token support",
  "single-use password reset token support",
  "generic safe failures without account-existence leakage",
]);

expect(contractPath, [
  "provider-selection",
  "provider-token-exchange",
  "cendorq-customer-eligibility",
  "signup-and-verification",
  "session-issuance",
  "protected-api-bridge",
  "reauth-and-recovery",
  "dashboard value remains gated until verified email is true and Cendorq customer eligibility has passed",
  "authentication proves identity only; Cendorq must verify the email belongs to a Free Scan or paid customer before dashboard access",
  "no session authority may be stored in localStorage, sessionStorage, URLs, analytics, emails, HTML, or public JavaScript",
  "protected customer APIs remain closed without server-validated session, ownership, and CSRF posture where required",
]);

expect(contractPath, [
  "server-side only",
  "provider profile fetch returns a verified email claim",
  "resolveCustomerAccessEligibility runs on the verified provider email",
  "Unknown provider identities must be routed to Free Scan with customer-simple same-email recovery copy, not a blank dashboard account.",
  "Signup, login, verification, reset, support, and protected API failures must not disclose whether an account exists.",
  "Verification failures must ask for a new verification link without exposing token validity, token internals, account state, or lockout internals.",
  "Login failures must use generic denial or verification-required posture without exposing provider mismatch, exact risk reason, or account existence.",
  "Protected API failures must return no-store JSON with generic authorization failure and no object-existence, account-existence, billing, report, support, or security leakage.",
]);

expect(contractPath, [
  "No customer session token in localStorage.",
  "No customer session token in sessionStorage.",
  "No customer session token in URLs, analytics, HTML, email, logs, or public JavaScript.",
  "No CSRF token in URLs, analytics, email, logs, or third-party scripts.",
  "No raw OAuth provider access token, refresh token, password reset token, verification token, admin key, support context key, or private key in browser storage.",
]);

expect(contractPath, [
  "Provider integration cannot ship until welcome email is one-time only, verified-email gated, and sent from Cendorq Support <support@cendorq.com>.",
  "Provider integration cannot ship until provider callback uses resolveCustomerAccessEligibility before any dashboard session issuance.",
  "Provider integration cannot ship until unknown provider emails use buildFreeScanRequiredUrl and route to Free Scan instead of creating empty accounts.",
  "server-derived customer context instead of browser-carried authority",
  "accountExistenceLeak",
  "browserSessionToken",
  "localStorageSessionToken",
  "sessionStorageSessionToken",
  "rawProviderPayloadProjection",
  "protectedApiWithoutCsrf",
  "protectedApiWithoutOwnership",
  "welcomeEmailDuplicate",
  "welcomeEmailBeforeVerification",
  "providerSessionBeforeEligibility",
  "blankDashboardForUnknownProviderEmail",
]);

expect(runtimeBoundaryPath, [
  "CUSTOMER_AUTH_PROVIDER_RUNTIME_BOUNDARIES",
  "CUSTOMER_AUTH_PROVIDER_RUNTIME_BOUNDARY_STANDARD",
  "Provider runtime must exchange the provider code on the server only.",
  "Provider runtime must fetch or verify a provider email claim on the server only.",
  "Provider runtime must require a verified email before Cendorq eligibility.",
  "Provider runtime must run Cendorq eligibility before issuing a Cendorq session.",
  "Provider runtime must fall back to secure email access until the full chain is live.",
  "codeExchangeReady: false",
  "profileFetchReady: false",
  "safeFallback: \"secure-email-access\"",
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

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

expect(routesChainPath, [validatorPath]);

forbidden(contractPath, [
  "store session token in localStorage",
  "store session token in sessionStorage",
  "session token in URL is allowed",
  "raw provider token in client",
  "plaintext password",
  "skip csrf",
  "skip ownership",
  "disclose account exists",
  "welcome email before verification",
  "duplicate welcome email allowed",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
  "impossible to hack",
  "never liable",
  "liability-free",
]);

if (failures.length) {
  console.error("Production auth provider contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production auth provider contracts validation passed with owner posture, verified provider email, existing-customer eligibility, Free Scan fallback, provider runtime boundary scaffold, and route-chain coverage.");

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

  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
