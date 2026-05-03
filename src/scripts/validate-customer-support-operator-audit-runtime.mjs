import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const runtimePath = "src/lib/customer-support-operator-audit-runtime.ts";
const auditContractsPath = "src/lib/customer-support-operator-audit-contracts.ts";
const operatorContractsPath = "src/lib/customer-support-operator-console-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(runtimePath, [
  "CUSTOMER_SUPPORT_OPERATOR_AUDIT_RUNTIME_GUARDS",
  "buildCustomerSupportOperatorAuditRecord",
  "authorizeOperatorAuditAction",
  "mergeCustomerSupportOperatorAuditRecords",
  "projectCustomerSupportOperatorAuditRecord",
  "loadCustomerSupportOperatorAuditEnvelope",
  "saveCustomerSupportOperatorAuditEnvelope",
  "CustomerSupportOperatorAuditBuildInput",
  "CustomerSupportOperatorAuditBuildResult",
  "CustomerSupportOperatorAuditProjection",
  "customer-support-operator-audit.v1.json",
  "FileBackedEnvelope",
  "loadFileBackedEnvelope",
  "saveFileBackedEnvelope",
  "required safe audit fields missing",
  "operator audit enum value is not allowed",
  "support triage cannot perform privileged support action",
  "support specialist cannot approve billing action",
  "billing approver can only view safe summaries or approve billing actions",
  "security reviewer can only view safe summaries or escalate security review",
  "safe correction requires specialist or support admin approval gate",
  "billing action requires billing approval gate",
  "security review requires security approval gate",
  "support closure requires support admin approval gate",
  "rawPayloadStored: false",
  "rawEvidenceStored: false",
  "rawSecurityPayloadStored: false",
  "rawBillingDataStored: false",
  "rawPaymentDataStored: false",
  "promptsStored: false",
  "secretsStored: false",
  "operatorIdentityCustomerVisible: false",
  "internalNotesCustomerVisible: false",
  "projects no customerIdHash, operatorActorRef, internalSafeNoteRef, raw storage flags, prompt flags, secret flags, or customer-visible internal notes",
  "never stores raw payloads, raw evidence, raw security payloads, raw billing data, raw payment data, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
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

expect(auditContractsPath, [
  "CustomerSupportOperatorAuditRecord",
  "immutable: true",
  "preservedForCompliance: true",
  "rawPayloadStored: false",
  "secretsStored: false",
  "owner posture coverage",
]);

expect(operatorContractsPath, [
  "CustomerSupportOperatorRole",
  "CustomerSupportOperatorAction",
  "CustomerSupportOperatorApprovalGate",
  "CustomerSupportOperatorAuditOutcome",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-audit-runtime.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(runtimePath, [
  "immutable: false",
  "preservedForCompliance: false",
  "rawPayloadStored: true",
  "rawEvidenceStored: true",
  "rawSecurityPayloadStored: true",
  "rawBillingDataStored: true",
  "rawPaymentDataStored: true",
  "promptsStored: true",
  "secretsStored: true",
  "operatorIdentityCustomerVisible: true",
  "internalNotesCustomerVisible: true",
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "SUPPORT_CONSOLE_READ_KEY",
  "console.log",
  "approval gate bypass allowed",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
  "audit deletion claim allowed",
]);

if (failures.length) {
  console.error("Customer support operator audit runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator audit runtime validation passed with owner posture coverage.");

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
