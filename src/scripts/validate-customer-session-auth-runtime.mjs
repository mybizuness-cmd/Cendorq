import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const runtimePath = "src/lib/customer-session-auth-runtime.ts";
const contractsPath = "src/lib/customer-session-auth-contracts.ts";
const gatewayRuntimePath = "src/lib/customer-access-gateway-runtime.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(runtimePath, [
  "CUSTOMER_SESSION_COOKIE_NAME",
  "CUSTOMER_CSRF_COOKIE_NAME",
  "CUSTOMER_CSRF_HEADER_NAME",
  "CUSTOMER_REAUTH_HEADER_NAME",
  "CUSTOMER_SESSION_AUTH_RUNTIME_GUARDS",
  "requireCustomerSession",
  "verifyCsrfForMutation",
  "verifyFreshReauth",
  "checkRequestOrigin",
  "buildCustomerSessionCookieAttributes",
  "buildCustomerCsrfCookieAttributes",
  "__Host-cendorq_session",
  "__Host-cendorq_csrf",
  "x-cendorq-csrf",
  "x-cendorq-reauth",
  "httpOnly: true",
  "secure: true",
  "sameSite: \"lax\"",
  "safeGatewayEqual",
  "hashGatewaySecret",
  "denyGatewayAccess",
  "session runtime is closed by default when no server-managed session is present",
  "session runtime expects secure httpOnly sameSite customer session cookies",
  "session runtime never reads session tokens from localStorage, sessionStorage, URLs, analytics, HTML, emails, or public JavaScript",
  "session runtime requires CSRF or equivalent checks for protected state-changing API requests",
  "session runtime uses constant-time comparison for CSRF and reauthentication checks",
  "session runtime returns safe failures without account existence, attacker details, risk-scoring internals, raw evidence, raw billing IDs, prompts, secrets, or private report internals",
  "session runtime can require verified email before dashboard, report, billing, notification, support, or protected API value",
  "session runtime can require fresh reauthentication before risky billing, security, report, or account actions",
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

expect(contractsPath, [
  "CUSTOMER_SESSION_AUTH_RULES",
  "CUSTOMER_SESSION_COOKIE_CONTRACTS",
  "no customer session token, CSRF token, provider token, password, reset token, or admin secret in localStorage, sessionStorage, URL, analytics, HTML, emails, or public JavaScript",
]);

expect(gatewayRuntimePath, [
  "CUSTOMER_ACCESS_GATEWAY_RUNTIME_GUARDS",
  "safeGatewayEqual",
  "denyGatewayAccess",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-session-auth-runtime.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(runtimePath, [
  "localStorage",
  "sessionStorage",
  "window.location.search",
  "document.cookie",
  "httpOnly: false",
  "secure: false",
  "sameSite: \"none\"",
  "console.log(request.cookies",
  "console.log(sessionToken",
  "account existence disclosed",
  "risk-scoring internals disclosed",
]);

if (failures.length) {
  console.error("Customer session auth runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer session auth runtime validation passed with owner posture coverage.");

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
