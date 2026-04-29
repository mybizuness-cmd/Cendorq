import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const runtimePath = "src/lib/customer-support-notification-record-runtime.ts";
const contractsPath = "src/lib/customer-support-notification-record-contracts.ts";
const communicationRuntimePath = "src/lib/customer-support-lifecycle-communication-runtime.ts";
const lifecycleNotificationsPath = "src/lib/customer-support-lifecycle-notification-contracts.ts";
const packagePath = "package.json";

expect(runtimePath, [
  "CUSTOMER_SUPPORT_NOTIFICATION_RECORD_RUNTIME_GUARDS",
  "buildCustomerSupportNotificationRecords",
  "buildCustomerSupportNotificationRecordIdempotencyKey",
  "mergeCustomerSupportNotificationRecords",
  "projectCustomerSupportNotificationRecord",
  "loadCustomerSupportNotificationRecordEnvelope",
  "saveCustomerSupportNotificationRecordEnvelope",
  "CustomerSupportNotificationRecordBuildInput",
  "CustomerSupportNotificationRecordBuildResult",
  "CustomerSupportNotificationRecordProjection",
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS",
  "CustomerSupportLifecycleCommunicationPlan",
  "CustomerSupportNotificationRecordContract",
  "FileBackedEnvelope",
  "loadFileBackedEnvelope",
  "saveFileBackedEnvelope",
  "customer-support-notification-records.v1.json",
  "customer ownership missing",
  "safe status projection missing",
  "known lifecycle notification contract missing",
  "idempotencyKeys",
  "customerIdHash, supportRequestId, notificationKey, channel, and status",
  "safe lifecycle communication suppression",
  "rawPayloadStored: false",
  "rawEvidenceStored: false",
  "rawSecurityPayloadStored: false",
  "rawBillingDataStored: false",
  "internalNotesStored: false",
  "secretsStored: false",
  "return channel === \"email\" ? \"sent\" : \"displayed\"",
  "projects records without customerIdHash, auditEventId, suppressionReason, failureReason, raw payload flags, or internal storage fields",
]);

expect(contractsPath, [
  "CustomerSupportNotificationRecordContract",
  "CUSTOMER_SUPPORT_NOTIFICATION_RECORD_GUARDS",
  "rawPayloadStored: false",
  "secretsStored: false",
]);

expect(communicationRuntimePath, [
  "CustomerSupportLifecycleCommunicationPlan",
  "buildSupportLifecycleCommunicationPlan",
]);

expect(lifecycleNotificationsPath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS",
  "support-request-received-status-ready",
  "support-request-closed",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-notification-record-runtime.mjs",
]);

forbidden(runtimePath, [
  "rawPayloadStored: true",
  "rawEvidenceStored: true",
  "rawSecurityPayloadStored: true",
  "rawBillingDataStored: true",
  "internalNotesStored: true",
  "secretsStored: true",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "process.env.SUPPORT_CONSOLE_READ_KEY",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "sendGrid",
  "resend.emails.send",
  "fetch(\"https://api",
  "console.log",
]);

if (failures.length) {
  console.error("Customer support notification record runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support notification record runtime validation passed.");

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
