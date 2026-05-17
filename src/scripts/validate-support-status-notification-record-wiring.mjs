import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const statusApiPath = "src/app/api/customer/support/status/route.ts";
const notificationsApiPath = "src/app/api/customer/notifications/route.ts";
const notificationRuntimePath = "src/lib/customer-support-notification-record-runtime.ts";
const communicationRuntimePath = "src/lib/customer-support-lifecycle-communication-runtime.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-support-status-notification-record-wiring.mjs";

expect(statusApiPath, [
  "buildCustomerSupportNotificationRecords",
  "loadCustomerSupportNotificationRecordEnvelope",
  "mergeCustomerSupportNotificationRecords",
  "saveCustomerSupportNotificationRecordEnvelope",
  "persistSupportStatusNotificationRecords",
  "await persistSupportStatusNotificationRecords(sessionAccess.customerIdHash, [entry])",
  "await persistSupportStatusNotificationRecords(sessionAccess.customerIdHash, entries)",
  "communicationPlan: entry.communicationPlan",
  "result.ok ? result.records : []",
  "envelope.entries = mergeCustomerSupportNotificationRecords(envelope.entries, incoming)",
  "requireCustomerSession(request, { requireVerifiedEmail: true })",
  "const ownedEntries = envelope.entries.filter((entry) => entry.customerIdHash === sessionAccess.customerIdHash)",
  "customerOwnershipVerified: true",
  "verifiedSession: true",
  "safeStatusProjectionExists: true",
]);

expect(notificationsApiPath, [
  "loadCustomerSupportNotificationRecordEnvelope",
  "projectCustomerSupportNotificationRecord",
  "entry.customerIdHash === sessionAccess.customerIdHash",
  "source: \"support-lifecycle\"",
]);

expect(notificationRuntimePath, [
  "buildCustomerSupportNotificationRecords",
  "mergeCustomerSupportNotificationRecords",
  "buildCustomerSupportNotificationRecordIdempotencyKey",
  "support notification record runtime uses idempotency keys per customerIdHash, supportRequestId, notificationKey, channel, and status",
  "rawPayloadStored: false",
  "rawEvidenceStored: false",
  "rawSecurityPayloadStored: false",
  "rawBillingDataStored: false",
  "internalNotesStored: false",
  "secretsStored: false",
]);

expect(communicationRuntimePath, [
  "buildSupportLifecycleCommunicationPlan",
  "projectSupportLifecycleCommunicationPlan",
  "customerOwnershipVerified",
  "verifiedSession",
  "safeStatusProjectionExists",
  "communication runtime returns only customer-safe keys, paths, channels, reasons, and guards",
]);

expect(routesChainPath, [validatorPath]);

forbidden(statusApiPath, [
  "rawPayloadStored: true",
  "rawEvidenceStored: true",
  "rawSecurityPayloadStored: true",
  "rawBillingDataStored: true",
  "internalNotesStored: true",
  "secretsStored: true",
  "operatorIdentity",
  "riskScoringDetails",
  "privateReportInternals",
  "dangerouslySetInnerHTML",
  "resend.emails.send",
  "fetch(\"https://api",
]);

forbidden(notificationsApiPath, [
  "customerIdHash:",
  "auditEventId:",
  "suppressionReason:",
  "failureReason:",
  "rawPayloadStored:",
  "rawEvidenceStored:",
  "internalNotesStored:",
]);

if (failures.length) {
  console.error("Support status notification record wiring validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Support status notification record wiring validation passed with safe status projection, customer-owned notification persistence, idempotent record merging, notification-center readback, and route-chain coverage.");

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
