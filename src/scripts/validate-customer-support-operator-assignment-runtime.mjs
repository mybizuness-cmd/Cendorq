import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const runtimePath = "src/lib/customer-support-operator-assignment-runtime.ts";
const contractsPath = "src/lib/customer-support-operator-assignment-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(runtimePath, [
  "CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_RUNTIME_GUARDS",
  "buildCustomerSupportOperatorAssignment",
  "authorizeAssignmentState",
  "mergeCustomerSupportOperatorAssignments",
  "projectCustomerSupportOperatorAssignment",
  "loadCustomerSupportOperatorAssignmentEnvelope",
  "saveCustomerSupportOperatorAssignmentEnvelope",
  "CustomerSupportOperatorAssignmentBuildInput",
  "CustomerSupportOperatorAssignmentBuildResult",
  "CustomerSupportOperatorAssignmentProjection",
  "customer-support-operator-assignments.v1.json",
  "required assignment fields missing",
  "assignment enum value is not allowed",
  "triage assignment requires support triage or support admin role",
  "specialist assignment requires support specialist or support admin role",
  "billing assignment requires billing approver or support admin role",
  "security assignment requires security reviewer or support admin role",
  "admin review assignment requires support admin role",
  "immutableAuditRequired: true",
  "customerVisibleOperatorIdentity: false",
  "rawPayloadStored: false",
  "rawEvidenceStored: false",
  "rawSecurityPayloadStored: false",
  "rawBillingDataStored: false",
  "rawPaymentDataStored: false",
  "internalNotesCustomerVisible: false",
  "secretsStored: false",
  "projects no customerIdHash, assignedActorRef, raw flags, internal notes, secrets, or authorization internals",
  "storage-only and does not create assignment mutation endpoints or customer-visible operator identities",
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

expect(contractsPath, [
  "CustomerSupportOperatorAssignmentContract",
  "CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_GUARDS",
  "immutableAuditRequired: true",
  "customerVisibleOperatorIdentity: false",
  "owner posture coverage",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-assignment-runtime.mjs",
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
  "secretsStored: true",
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "SUPPORT_CONSOLE_READ_KEY",
  "console.log",
  "assignment mutation API",
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
  console.error("Customer support operator assignment runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator assignment runtime validation passed with owner posture coverage.");

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
