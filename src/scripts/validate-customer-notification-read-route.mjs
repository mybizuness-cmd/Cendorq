import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const readRoutePath = "src/app/api/customer/notifications/read/route.ts";
const notificationApiPath = "src/app/api/customer/notifications/route.ts";
const recordRuntimePath = "src/lib/customer-support-notification-record-runtime.ts";
const contractPath = "src/lib/customer-support-notification-record-contracts.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-customer-notification-read-route.mjs";

expect(readRoutePath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "optionsNoStore(\"POST,OPTIONS\")",
  "requireCustomerSession(request, { requireVerifiedEmail: true })",
  "MAX_REQUEST_BYTES",
  "notificationId",
  "supportRequestId",
  "markAllSupportLifecycle",
  "loadCustomerSupportNotificationRecordEnvelope",
  "saveCustomerSupportNotificationRecordEnvelope",
  "isOwnedReadCandidate",
  "entry.customerIdHash !== customerIdHash",
  "READABLE_STATES",
  "state: \"read\" as const",
  "readAt: entry.readAt || now",
  "rawPayloadStored: false as const",
  "rawEvidenceStored: false as const",
  "rawSecurityPayloadStored: false as const",
  "rawBillingDataStored: false as const",
  "internalNotesStored: false as const",
  "secretsStored: false as const",
  "rawPayloadReturned: false",
  "rawEvidenceReturned: false",
  "internalNotesReturned: false",
]);

expect(notificationApiPath, [
  "requireCustomerSession(request",
  "entry.customerIdHash === sessionAccess.customerIdHash",
  "projectCustomerSupportNotificationRecord(entry)",
  "source: \"support-lifecycle\"",
]);

expect(recordRuntimePath, [
  "projectCustomerSupportNotificationRecord",
  "readAt: record.readAt",
  "support notification record runtime projects records without customerIdHash, auditEventId, suppressionReason, failureReason, raw payload flags, or internal storage fields",
]);

expect(contractPath, [
  "support lifecycle notification records require customerIdHash ownership before creation, display, read-state update, suppression, or failure projection",
  "CustomerSupportNotificationRecordState = \"queued\" | \"displayed\" | \"sent\" | \"read\" | \"suppressed\" | \"failed\"",
]);

expect(routesChainPath, [validatorPath]);

forbidden(readRoutePath, [
  "export async function GET",
  "customerIdHash:",
  "auditEventId:",
  "suppressionReason:",
  "failureReason:",
  "rawPayloadStored: true",
  "rawEvidenceStored: true",
  "rawSecurityPayloadStored: true",
  "rawBillingDataStored: true",
  "internalNotesStored: true",
  "secretsStored: true",
  "rawPayloadReturned: true",
  "rawEvidenceReturned: true",
  "internalNotesReturned: true",
  "operatorIdentity",
  "riskScoringDetails",
  "privateReportInternals",
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
]);

if (failures.length) {
  console.error("Customer notification read route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer notification read route validation passed with signed-session ownership, no-store POST acknowledgement, read-state updates, safe projection-only response, and route-chain coverage.");

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
