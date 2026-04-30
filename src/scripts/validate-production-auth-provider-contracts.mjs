import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/production-auth-provider-contracts.ts";
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
  "signup-and-verification",
  "session-issuance",
  "protected-api-bridge",
  "reauth-and-recovery",
  "dashboard value remains gated until verified email is true",
  "no session authority may be stored in localStorage, sessionStorage, URLs, analytics, emails, HTML, or public JavaScript",
  "protected customer APIs remain closed without server-validated session, ownership, and CSRF posture where required",
]);

expect(contractPath, [
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
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  validatorPath,
]);

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

console.log("Production auth provider contracts validation passed. validate:routes delegates through the orchestrator and the auth provider validator remains wired into the route chain.");

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
