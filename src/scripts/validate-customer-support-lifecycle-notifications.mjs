import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const lifecyclePath = "src/lib/customer-support-lifecycle-notification-contracts.ts";
const statusContractsPath = "src/lib/customer-support-status-contracts.ts";
const notificationContractsPath = "src/lib/customer-notification-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(lifecyclePath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS",
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_GLOBAL_GUARDS",
  "getCustomerSupportLifecycleNotificationContracts",
  "support-request-received-status-ready",
  "support-request-reviewing",
  "support-request-waiting-on-customer",
  "support-request-specialist-review",
  "support-request-resolved",
  "support-request-closed",
  "/dashboard/support/status",
  "/dashboard/support/request",
  "/dashboard/support",
  "requiredState",
  "requiredGuards",
  "suppressionRules",
  "blockedContent",
  "no support lifecycle notification without customer ownership and session authorization",
  "no support lifecycle notification before customer-safe support status projection exists",
  "no support lifecycle notification renders raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
  "no support lifecycle notification promises refunds, legal outcomes, report changes, billing changes, security outcomes, or unsupported business-result promises without approval",
  "every support lifecycle notification must point to support status, safe resubmission, support center, or new request path",
  "every support lifecycle notification must have suppression rules to prevent duplicate anxiety or spam",
]);

expect(statusContractsPath, ["CUSTOMER_SUPPORT_STATUS_CONTRACTS", "CUSTOMER_SUPPORT_STATUS_GLOBAL_GUARDS"]);
expect(notificationContractsPath, ["support-request-received", "CUSTOMER_NOTIFICATION_GLOBAL_GUARDS"]);
expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);
expect(ownerMaximumProtectionValidatorPath, ["Owner maximum protection posture validation passed", "docs/owner-maximum-protection-posture.md", "validate:routes"]);
expect(packagePath, ["validate:routes", "validate-customer-support-lifecycle-notifications.mjs", "validate-owner-maximum-protection-posture.mjs"]);

forbidden(lifecyclePath, [
  "raw payload customer copy",
  "raw evidence customer copy",
  "internal notes customer copy",
  "operator identity customer copy",
  "risk score customer copy",
  "attacker details customer copy",
  "refund approved automatically",
  "legal outcome guaranteed",
  "report change guaranteed",
  "billing change guaranteed",
  "guaranteed business results",
  "no suppression rules",
]);

if (failures.length) {
  console.error("Customer support lifecycle notifications validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support lifecycle notifications validation passed with owner posture and package wiring coverage.");

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
