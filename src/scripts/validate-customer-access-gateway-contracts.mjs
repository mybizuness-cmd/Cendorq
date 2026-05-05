import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const gatewayPath = "src/lib/customer-access-gateway-contracts.ts";
const gatewayRuntimePath = "src/lib/customer-access-gateway-runtime.ts";
const supportApiPath = "src/app/api/customer/support/request/route.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(gatewayPath, [
  "CUSTOMER_ACCESS_GATEWAY_RULES",
  "CUSTOMER_ACCESS_TOKEN_BOUNDARIES",
  "CUSTOMER_ACCESS_GATEWAY_GUARDS",
  "getCustomerAccessGatewayContracts",
  "dashboard-access",
  "report-vault-access",
  "billing-center-access",
  "notification-center-access",
  "support-center-access",
  "support-request-api-access",
  "free-scan-access",
  "plans-access",
  "authenticated-customer",
  "verified-email",
  "customer-ownership",
  "business-boundary",
  "route-authorization",
  "billing-entitlement",
  "report-release-approval",
  "support-context",
  "risk-reauth",
  "safe-projection",
  "support-context-server-only",
  "admin-read-keys-server-only",
  "customer-session-cookie-boundary",
  "clientAllowed: false",
  "serverOnly: true",
  "no dashboard route without authenticated customer ownership and verified email once auth is active",
  "no customer object response without server-side customer ownership and business boundary checks",
  "no billing response without entitlement checks and safe billing projection",
  "no report response without release approval and safe report projection",
  "no support request API call from client-owned secret context",
  "no admin or support context key in browser JavaScript, public environment variables, HTML, analytics, logs, emails, or URLs",
  "no risky session can access sensitive customer, billing, report, support, or security actions without reauthentication or lockout path",
  "no safe failure can disclose account existence, risk-scoring internals, attacker details, raw evidence, raw billing IDs, prompts, secrets, or private report internals",
]);

expect(gatewayRuntimePath, [
  "CUSTOMER_CONTEXT_HEADER",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "Verified customer context is required before submitting support requests.",
]);

expect(supportApiPath, [
  "requireCustomerSession",
  "requireVerifiedEmail: true",
  "allowedOrigins: configuredSupportAllowedOrigins()",
  "rawPayloadStored: false",
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
  "validate-customer-access-gateway-contracts.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(gatewayPath, [
  "clientAllowed: true",
  "serverOnly: false",
  "support context secret in client allowed",
  "admin key in client allowed",
  "session token in localStorage allowed",
  "raw evidence allowed",
  "raw billing IDs allowed",
  "risk-scoring internals allowed",
  "account existence disclosure allowed",
]);

if (failures.length) {
  console.error("Customer access gateway contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer access gateway contracts validation passed with owner posture coverage.");

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
