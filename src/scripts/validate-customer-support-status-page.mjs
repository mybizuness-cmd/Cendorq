import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

expect("src/lib/customer-platform-route-map.ts", [
  "dashboardSupportStatus",
  "/dashboard/support/status",
  "Support status",
  "support status access requires authenticated customer ownership, session authorization, and customer-safe projection",
  "support status must not render raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
]);

expect("src/app/dashboard/support/page.tsx", [
  "View support status",
  "Track request status",
  "/dashboard/support/status",
]);

expect("src/app/dashboard/support/status/page.tsx", [
  "Support status",
  "noIndex: true",
  "Track support without exposing internal risk.",
  "SupportStatusList",
  "CUSTOMER_SUPPORT_STATUS_CONTRACTS",
  "Internal notes, operator identities, risk-scoring internals, raw evidence, raw billing data, session tokens, CSRF tokens, admin keys, and support secrets stay private.",
]);

expect("src/components/customer-support/support-status-list.tsx", [
  "use client",
  "SupportStatusList",
  "/api/customer/support/status",
  "Refresh status",
  "No active support requests are visible yet.",
  "Start protected request",
  "Internal notes, operator identities, risk-scoring details, raw evidence, billing data, session tokens, and support secrets are never displayed here.",
  "supportRequestId",
  "customerVisibleStatus",
  "customerSafeStatus",
  "statusLabel",
  "statusCopy",
  "primaryCta",
  "primaryPath",
]);

expect("src/app/api/customer/support/status/route.ts", [
  "requireCustomerSession",
  "projectSupportStatus",
  "customerVisibleStatus",
  "No authorized support status was found.",
]);

expect("src/lib/customer-support-status-contracts.ts", [
  "CUSTOMER_SUPPORT_STATUS_CONTRACTS",
  "CUSTOMER_SUPPORT_STATUS_GLOBAL_GUARDS",
]);

expect("package.json", [
  "validate:routes",
  "validate-customer-support-status-page.mjs",
]);

forbidden("src/app/dashboard/support/status/page.tsx", [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "internalNotes",
  "operatorId",
  "riskScoringInternals",
  "attackerDetails",
  "adminReadKey",
  "supportContextKey",
]);

forbidden("src/components/customer-support/support-status-list.tsx", [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "SUPPORT_CONSOLE_READ_KEY",
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "internalNotes",
  "operatorId",
  "operatorIdHash",
  "riskScoringInternals",
  "attackerDetails",
  "adminReadKey",
  "supportContextKey",
  "sessionToken",
  "csrfToken",
  "console.log",
]);

if (failures.length) {
  console.error("Customer support status page validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support status page validation passed.");

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
