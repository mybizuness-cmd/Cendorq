import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const apiPath = "src/app/api/customer/notifications/route.ts";
const runtimePath = "src/lib/customer-support-notification-record-runtime.ts";
const recordsPath = "src/lib/customer-support-notification-record-contracts.ts";
const pageValidationPath = "src/scripts/validate-customer-notification-center.mjs";
const packagePath = "package.json";

expect(apiPath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "jsonNoStore",
  "optionsNoStore",
  "requireCustomerSession",
  "requireVerifiedEmail: true",
  "loadCustomerSupportNotificationRecordEnvelope",
  "projectCustomerSupportNotificationRecord",
  "CustomerNotificationApiEntry",
  "source: \"support-lifecycle\"",
  "MAX_NOTIFICATION_LIMIT = 100",
  "Open notifications from the authenticated customer dashboard and try again.",
  "entry.customerIdHash === sessionAccess.customerIdHash",
  "Unable to load notifications safely.",
  "The customer notification storage layer could not be read cleanly.",
  "cleanState",
  "cleanSource",
  "clampInteger",
]);

expect(runtimePath, [
  "projectCustomerSupportNotificationRecord",
  "projects records without customerIdHash, auditEventId, suppressionReason, failureReason, raw payload flags, or internal storage fields",
]);

expect(recordsPath, [
  "CustomerSupportNotificationRecordContract",
  "customerIdHash",
  "rawPayloadStored: false",
  "internalNotesStored: false",
  "secretsStored: false",
]);

expect(pageValidationPath, [
  "Notification center",
  "notification center access requires authenticated customer ownership and route authorization",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-notification-center-api.mjs",
]);

forbidden(apiPath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "SUPPORT_CONSOLE_READ_KEY",
  "customerIdHash:",
  "auditEventId:",
  "suppressionReason:",
  "failureReason:",
  "rawPayloadStored",
  "rawEvidenceStored",
  "rawSecurityPayloadStored",
  "rawBillingDataStored",
  "internalNotesStored",
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
  console.error("Customer notification center API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer notification center API validation passed.");

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
