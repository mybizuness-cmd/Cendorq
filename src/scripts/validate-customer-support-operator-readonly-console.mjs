import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/admin/support/page.tsx";
const componentPath = "src/components/customer-support/operator-safe-summary-console.tsx";
const apiPath = "src/app/api/admin/support/requests/route.ts";
const consoleContractsPath = "src/lib/customer-support-operator-console-contracts.ts";
const packagePath = "package.json";

expect(pagePath, [
  "Support operator console",
  "noIndex: true",
  "OperatorSafeSummaryConsole",
  "Read support safely before any privileged action exists.",
  "read-only, audit-aware safe-summary console",
  "This first operator console surface is read-only and uses safe-summary-only projection.",
  "Assignment, approval, correction, billing, security, and closure actions are intentionally not available here.",
  "Operator access is gated by server-side role/session checks and each authorized read is audit-recorded.",
  "Raw payloads, raw evidence, raw security payloads, raw billing data, payment data, customer hashes, internal notes, operator identities, risk internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, and support context keys are not rendered.",
  "CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT",
  "CUSTOMER_SUPPORT_OPERATOR_CONSOLE_GUARDS",
  "Closed-by-default operator access.",
]);

expect(componentPath, [
  "use client",
  "OperatorSafeSummaryConsole",
  "/api/admin/support/requests?limit=50",
  "Refresh safe summaries",
  "Safe support summaries only.",
  "read-only",
  "safe-summary-only",
  "Mutation controls are intentionally absent.",
  "OperatorSafeSummary",
  "riskFlagCount",
  "rawPayloadStored",
  "customerOwnershipRequired",
  "supportAuditRequired",
  "formatDecision",
  "Use a verified operator session and try again.",
  "does not expose customer hashes, raw descriptions, raw evidence, billing data, internal notes, operator identities, risk internals, attacker details, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
]);

expect(apiPath, [
  "requireCustomerSupportOperatorAccess",
  "projection: \"safe-summary-only\"",
  "auditRecorded: auditBuild.ok",
]);

expect(consoleContractsPath, [
  "CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT",
  "CUSTOMER_SUPPORT_OPERATOR_CONSOLE_GUARDS",
  "server-only-admin-session",
  "closed-by-default",
  "safe-summary-only",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-readonly-console.mjs",
]);

forbidden(pagePath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "approve-billing-action",
  "approve-safe-correction",
  "close-request",
  "assign-review",
  "escalate-security-review",
  "request-customer-update",
  "raw payload is rendered",
  "customer hash is rendered",
  "operator identity is rendered",
  "guaranteed refund",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
]);

forbidden(componentPath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "SUPPORT_CONSOLE_READ_KEY",
  "customerIdHash",
  "safeDescription",
  "riskFlags",
  "rawEvidenceStored",
  "rawSecurityPayloadStored",
  "rawBillingDataStored",
  "internalNotes",
  "operatorId",
  "operatorIdentity",
  "riskScoringInternals",
  "attackerDetails",
  "sessionToken",
  "csrfToken",
  "console.log",
  "approve-billing-action",
  "approve-safe-correction",
  "close-request",
  "assign-review",
  "escalate-security-review",
  "request-customer-update",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Customer support operator read-only console validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator read-only console validation passed.");

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
