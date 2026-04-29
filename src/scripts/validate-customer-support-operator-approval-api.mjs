import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const apiPath = "src/app/api/admin/support/approvals/route.ts";
const accessRuntimePath = "src/lib/customer-support-operator-access-runtime.ts";
const auditRuntimePath = "src/lib/customer-support-operator-audit-runtime.ts";
const approvalRuntimePath = "src/lib/customer-support-operator-approval-runtime.ts";
const packagePath = "package.json";

expect(apiPath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "requireCustomerSupportOperatorAccess",
  "operatorAccessJsonNoStore",
  "operatorAccessOptionsNoStore",
  "surface: \"operator-approval\"",
  "mutation: true",
  "MAX_APPROVAL_BYTES = 14_000",
  "buildCustomerSupportOperatorAuditRecord",
  "loadCustomerSupportOperatorAuditEnvelope",
  "mergeCustomerSupportOperatorAuditRecords",
  "saveCustomerSupportOperatorAuditEnvelope",
  "buildCustomerSupportOperatorApproval",
  "loadCustomerSupportOperatorApprovalEnvelope",
  "mergeCustomerSupportOperatorApprovals",
  "projectCustomerSupportOperatorApproval",
  "saveCustomerSupportOperatorApprovalEnvelope",
  "Customer-safe outcome copy is required before approval.",
  "The approval audit record could not be created safely.",
  "The approval record could not be created safely.",
  "auditRecorded: true",
  "projection: \"operator-approval-safe\"",
  "actionForApprovalType",
  "approve-billing-action",
  "escalate-security-review",
  "close-request",
  "approve-safe-correction",
  "The support approval storage layer could not complete the safe mutation.",
]);

expect(accessRuntimePath, [
  "requireCustomerSupportOperatorAccess",
  "support operator access runtime requires fresh admin reauth for mutations before returning allow",
]);

expect(auditRuntimePath, [
  "buildCustomerSupportOperatorAuditRecord",
  "saveCustomerSupportOperatorAuditEnvelope",
]);

expect(approvalRuntimePath, [
  "buildCustomerSupportOperatorApproval",
  "projectCustomerSupportOperatorApproval",
  "saveCustomerSupportOperatorApprovalEnvelope",
  "approved support outcome requires customer-safe outcome copy",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-approval-api.mjs",
]);

forbidden(apiPath, [
  "verifyAdminReadAccess",
  "SUPPORT_CONSOLE_READ_KEY",
  "INTAKE_ADMIN_KEY",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "rawPayloadStored: true",
  "rawEvidenceStored: true",
  "rawSecurityPayloadStored: true",
  "rawBillingDataStored: true",
  "rawPaymentDataStored: true",
  "internalNotesCustomerVisible: true",
  "unsupportedPromiseAllowed: true",
  "secretsStored: true",
  "rawPayload:",
  "rawEvidence:",
  "rawSecurityPayload:",
  "rawBillingData:",
  "rawPaymentData:",
  "internalNotes:",
  "operatorIdentity:",
  "riskScoringInternals",
  "attackerDetails",
  "sessionToken",
  "csrfToken",
  "console.log",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
  "audit deletion claim allowed",
]);

if (failures.length) {
  console.error("Customer support operator approval API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator approval API validation passed.");

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
