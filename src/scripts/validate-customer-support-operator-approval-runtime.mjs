import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const runtimePath = "src/lib/customer-support-operator-approval-runtime.ts";
const contractsPath = "src/lib/customer-support-operator-approval-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(runtimePath, [
  "CUSTOMER_SUPPORT_OPERATOR_APPROVAL_RUNTIME_GUARDS",
  "buildCustomerSupportOperatorApproval",
  "authorizeApprovalGate",
  "mergeCustomerSupportOperatorApprovals",
  "projectCustomerSupportOperatorApproval",
  "loadCustomerSupportOperatorApprovalEnvelope",
  "saveCustomerSupportOperatorApprovalEnvelope",
  "CustomerSupportOperatorApprovalBuildInput",
  "CustomerSupportOperatorApprovalBuildResult",
  "CustomerSupportOperatorApprovalProjection",
  "customer-support-operator-approvals.v1.json",
  "required approval fields missing",
  "approval enum value is not allowed",
  "approved support outcome requires customer-safe outcome copy",
  "safe correction approval requires specialist or support admin gate",
  "billing action approval requires billing gate",
  "security outcome approval requires security gate",
  "support closure approval requires support admin gate",
  "billing gate requires billing approver role",
  "security gate requires security reviewer role",
  "support admin gate requires support admin role",
  "specialist gate requires specialist or support admin role",
  "immutableAuditRequired: true",
  "customerVisibleOperatorIdentity: false",
  "rawPayloadStored: false",
  "rawEvidenceStored: false",
  "rawSecurityPayloadStored: false",
  "rawBillingDataStored: false",
  "rawPaymentDataStored: false",
  "internalNotesCustomerVisible: false",
  "unsupportedPromiseAllowed: false",
  "secretsStored: false",
  "projects no customerIdHash, requestedByRole, raw flags, internal notes, secrets, or authorization internals",
  "storage-only and does not create approval mutation endpoints or customer-visible operator identities",
]);

expect(contractsPath, [
  "CustomerSupportOperatorApprovalContract",
  "CUSTOMER_SUPPORT_OPERATOR_APPROVAL_GUARDS",
  "immutableAuditRequired: true",
  "unsupportedPromiseAllowed: false",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-approval-runtime.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(runtimePath, [
  "immutableAuditRequired: false",
  "customerVisibleOperatorIdentity: true",
  "rawPayloadStored: true",
  "rawEvidenceStored: true",
  "rawSecurityPayloadStored: true",
  "rawBillingDataStored: true",
  "rawPaymentDataStored: true",
  "internalNotesCustomerVisible: true",
  "unsupportedPromiseAllowed: true",
  "secretsStored: true",
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "SUPPORT_CONSOLE_READ_KEY",
  "console.log",
  "approval mutation API",
  "operator identity visible",
  "approval gate bypass allowed",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
  "audit deletion claim allowed",
]);

if (failures.length) {
  console.error("Customer support operator approval runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator approval runtime validation passed with owner posture coverage.");

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
