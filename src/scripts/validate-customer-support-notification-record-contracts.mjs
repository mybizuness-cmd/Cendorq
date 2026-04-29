import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const recordContractsPath = "src/lib/customer-support-notification-record-contracts.ts";
const notificationContractsPath = "src/lib/customer-support-lifecycle-notification-contracts.ts";
const statusContractsPath = "src/lib/customer-support-status-contracts.ts";
const packagePath = "package.json";

expect(recordContractsPath, [
  "CustomerSupportNotificationRecordContract",
  "CustomerSupportNotificationRecordChannel",
  "CustomerSupportNotificationRecordState",
  "CUSTOMER_SUPPORT_NOTIFICATION_RECORD_REQUIRED_FIELDS",
  "CUSTOMER_SUPPORT_NOTIFICATION_RECORD_STORAGE_RULES",
  "CUSTOMER_SUPPORT_NOTIFICATION_RECORD_BLOCKED_CONTENT",
  "CUSTOMER_SUPPORT_NOTIFICATION_RECORD_GUARDS",
  "getCustomerSupportNotificationRecordContracts",
  "notificationId",
  "customerIdHash",
  "supportRequestId",
  "notificationKey",
  "CustomerSupportLifecycleNotificationKey",
  "CustomerSupportCustomerVisibleStatus",
  "channel",
  "state",
  "queuedAt",
  "displayedAt",
  "sentAt",
  "readAt",
  "suppressedAt",
  "failedAt",
  "suppressionKey",
  "suppressionReason",
  "customerVisibleTitle",
  "customerVisibleBody",
  "primaryPath",
  "auditEventId",
  "rawPayloadStored: false",
  "rawEvidenceStored: false",
  "rawSecurityPayloadStored: false",
  "rawBillingDataStored: false",
  "internalNotesStored: false",
  "secretsStored: false",
  "idempotent per customerIdHash, supportRequestId, notificationKey, channel, and status",
  "must not claim audit records were deleted",
  "customer-owned notification APIs",
  "no support notification record without customer ownership, verified session context, safe support status projection, and a known lifecycle notification contract",
  "no support notification record stores raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
  "no support notification record exposes customer email addresses, billing identifiers, account existence signals, support admin keys, or customer support context secrets to the browser",
  "no support notification record promises refunds, legal outcomes, report changes, billing changes, security outcomes, ROI, or business results without approval",
]);

expect(notificationContractsPath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS",
  "CustomerSupportLifecycleNotificationKey",
  "support-request-received-status-ready",
  "support-request-reviewing",
  "support-request-waiting-on-customer",
  "support-request-specialist-review",
  "support-request-resolved",
  "support-request-closed",
]);

expect(statusContractsPath, [
  "CUSTOMER_SUPPORT_STATUS_CONTRACTS",
  "CustomerSupportCustomerVisibleStatus",
  "waiting-on-customer",
  "in-specialist-review",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-notification-record-contracts.mjs",
]);

forbidden(recordContractsPath, [
  "rawPayloadStored: true",
  "rawEvidenceStored: true",
  "rawSecurityPayloadStored: true",
  "rawBillingDataStored: true",
  "internalNotesStored: true",
  "secretsStored: true",
  "passwordStored: true",
  "adminKeyStored: true",
  "sessionTokenStored: true",
  "csrfTokenStored: true",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "fake urgency allowed",
  "audit deletion claim allowed",
]);

if (failures.length) {
  console.error("Customer support notification record contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support notification record contracts validation passed.");

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
