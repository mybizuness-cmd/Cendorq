import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/dashboard/notifications/page.tsx";
const lifecyclePath = "src/lib/customer-support-lifecycle-notification-contracts.ts";
const packagePath = "package.json";

expect(pagePath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS",
  "Support lifecycle",
  "Status changes should notify without exposing internals.",
  "View support status",
  "/dashboard/support/status",
  "support lifecycle notifications require customer-safe status projection before display",
  "Support lifecycle notifications suppress duplicates and route to status, safe resubmission, support center, or new request paths.",
  "raw evidence, internal notes, operator identity, risk scoring, attacker details, and unapproved promises",
  "notification.primaryPath",
  "notification.secondaryPath",
]);

expect(lifecyclePath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS",
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_GLOBAL_GUARDS",
  "support-request-received-status-ready",
  "support-request-reviewing",
  "support-request-waiting-on-customer",
  "support-request-specialist-review",
  "support-request-resolved",
  "support-request-closed",
  "every support lifecycle notification must have suppression rules to prevent duplicate anxiety or spam",
]);

expect(packagePath, [
  "validate:routes",
  "validate-notification-center-support-lifecycle.mjs",
]);

forbidden(pagePath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "rawPayload",
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
  "refund approved automatically",
  "legal outcome guaranteed",
  "report change guaranteed",
  "billing change guaranteed",
]);

if (failures.length) {
  console.error("Notification center support lifecycle validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Notification center support lifecycle validation passed.");

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
