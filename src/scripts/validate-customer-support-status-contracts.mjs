import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const statusPath = "src/lib/customer-support-status-contracts.ts";
const supportRecordsPath = "src/lib/customer-support-record-contracts.ts";
const supportApiPath = "src/app/api/customer/support/request/route.ts";
const packagePath = "package.json";

expect(statusPath, [
  "CUSTOMER_SUPPORT_STATUS_CONTRACTS",
  "CUSTOMER_SUPPORT_STATUS_PROJECTION",
  "CUSTOMER_SUPPORT_STATUS_GLOBAL_GUARDS",
  "getCustomerSupportStatusContracts",
  "received",
  "reviewing",
  "waiting-on-customer",
  "in-specialist-review",
  "resolved",
  "closed",
  "customerVisibleFields",
  "internalOnlyFields",
  "requiredProjectionGuards",
  "supportRequestId",
  "requestType",
  "businessContext",
  "safeSummary",
  "customerVisibleStatus",
  "customerSafeStatus",
  "customerIdHash",
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
  "customer ownership before projection",
  "no internal-only fields in customer response",
  "no cross-customer support status access",
  "no account existence disclosure through status lookup",
  "no customer support status without customer ownership and session authorization",
  "no support status page or API reveals raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
  "no support status copy promises refunds, legal outcomes, report changes, billing changes, security outcomes, or guaranteed business results without approval",
  "no support status hides correction paths, billing help, security review, support escalation, or safe resubmission options",
]);

expect(supportRecordsPath, [
  "CUSTOMER_SUPPORT_RECORD_CONTRACTS",
  "customer-support-request",
  "customer-support-audit",
  "rawPayloadStored: false",
]);

expect(supportApiPath, [
  "requireCustomerSession",
  "rawPayloadStored: false",
  "customerIdHash: _customerIdHash",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-status-contracts.mjs",
]);

forbidden(statusPath, [
  "rawPayload customerVisible",
  "rawEvidence customerVisible",
  "internalNotes customerVisible",
  "operatorId customerVisible",
  "riskScoringInternals customerVisible",
  "attackerDetails customerVisible",
  "adminReadKey customerVisible",
  "supportContextKey customerVisible",
  "sessionToken customerVisible",
  "csrfToken customerVisible",
  "refund approved automatically",
  "legal outcome guaranteed",
  "report change guaranteed",
  "billing change guaranteed",
]);

if (failures.length) {
  console.error("Customer support status contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support status contracts validation passed.");

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
