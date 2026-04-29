import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const updateApiPath = "src/app/api/customer/support/request/update/route.ts";
const requestApiPath = "src/app/api/customer/support/request/route.ts";
const statusApiPath = "src/app/api/customer/support/status/route.ts";
const packagePath = "package.json";

expect(updateApiPath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "jsonNoStore",
  "optionsNoStore",
  "requireCustomerSession",
  "requireVerifiedEmail: true",
  "loadFileBackedEnvelope",
  "saveFileBackedEnvelope",
  "customer-support-requests.v3.json",
  "MAX_REQUEST_BYTES = 16_000",
  "supportRequestId",
  "safeUpdateSummary",
  "customerAcknowledgement",
  "entry.id === supportRequestId && entry.customerIdHash === sessionAccess.customerIdHash",
  "No authorized support request was found for update.",
  "existing.decision !== \"sanitize\"",
  "This request is not waiting for a safe customer update.",
  "buildSafeUpdateSummary",
  "customer update:",
  "decision: risk.decision === \"allow\" || risk.decision === \"sanitize\" ? \"allow\" : risk.decision",
  "rawPayloadStored: false",
  "customerOwnershipRequired: true",
  "supportAuditRequired: true",
  "customerSafeProjectionOnly: true",
  "The support update was captured with a safe summary and returned to the protected review path.",
  "Do not send payment details here. Use the billing center or protected support path instead.",
  "Remove secrets, credentials, or system-control instructions before continuing.",
  "The update will be routed for review without unsupported commitments.",
  "The update will be routed using a safe summary only.",
]);

expect(requestApiPath, [
  "rawPayloadStored: false",
  "customerOwnershipRequired: true",
  "supportAuditRequired: true",
]);

expect(statusApiPath, [
  "waiting-on-customer",
  "entry.decision === \"sanitize\"",
  "entry.customerIdHash === sessionAccess.customerIdHash",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-request-update-api.mjs",
]);

forbidden(updateApiPath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "SUPPORT_CONSOLE_READ_KEY",
  "rawPayloadStored: true",
  "rawEvidenceStored: true",
  "rawSecurityPayloadStored: true",
  "rawBillingDataStored: true",
  "internalNotesStored: true",
  "rawRejectedContent",
  "rejectedRawContent",
  "operatorId",
  "operatorIdHash",
  "riskScoringInternals",
  "attackerDetails",
  "adminReadKey",
  "supportContextKey",
  "sessionToken",
  "csrfToken",
  "console.log",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
]);

if (failures.length) {
  console.error("Customer support request update API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support request update API validation passed.");

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
