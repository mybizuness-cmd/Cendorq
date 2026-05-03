import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const auditContractsPath = "src/lib/customer-support-operator-audit-contracts.ts";
const operatorContractsPath = "src/lib/customer-support-operator-console-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(auditContractsPath, [
  "CustomerSupportOperatorAuditRecord",
  "CUSTOMER_SUPPORT_OPERATOR_AUDIT_REQUIRED_FIELDS",
  "CUSTOMER_SUPPORT_OPERATOR_AUDIT_EVENT_RULES",
  "CUSTOMER_SUPPORT_OPERATOR_AUDIT_APPROVAL_RULES",
  "CUSTOMER_SUPPORT_OPERATOR_AUDIT_BLOCKED_CONTENT",
  "CUSTOMER_SUPPORT_OPERATOR_AUDIT_GUARDS",
  "getCustomerSupportOperatorAuditContracts",
  "auditEventId",
  "supportRequestId",
  "customerIdHash",
  "operatorRole",
  "operatorActorRef",
  "CustomerSupportOperatorRole",
  "CustomerSupportOperatorAction",
  "CustomerSupportOperatorApprovalGate",
  "CustomerSupportOperatorAuditOutcome",
  "reasonCode",
  "customerSafeSummary",
  "internalSafeNoteRef",
  "previousCustomerStatus",
  "nextCustomerStatus",
  "immutable: true",
  "preservedForCompliance: true",
  "rawPayloadStored: false",
  "rawEvidenceStored: false",
  "rawSecurityPayloadStored: false",
  "rawBillingDataStored: false",
  "rawPaymentDataStored: false",
  "promptsStored: false",
  "secretsStored: false",
  "operatorIdentityCustomerVisible: false",
  "internalNotesCustomerVisible: false",
  "every support operator audit event is append-only and immutable after creation",
  "operatorActorRef is an internal actor reference and must never be projected as a customer-visible operator identity",
  "customerSafeSummary is the only text field allowed for future customer-safe projection",
  "audit records must be preserved for compliance and must not be represented to customers as deleted when preservation is required",
  "request-customer-update must record the waiting-on-customer status transition and must not echo rejected raw content",
  "approve-safe-correction requires specialist-review or support-admin-approval before customer-visible correction language",
  "approve-billing-action requires billing-approval before refund, credit, invoice, plan, entitlement, or billing-state language",
  "escalate-security-review requires security-approval before customer-visible security outcome language",
  "no support operator action may occur without an immutable audit record contract",
  "no audit record may be created from browser-exposed support admin keys or customer support context keys",
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

expect(operatorContractsPath, [
  "CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT",
  "CustomerSupportOperatorRole",
  "CustomerSupportOperatorAction",
  "CustomerSupportOperatorApprovalGate",
  "CustomerSupportOperatorAuditOutcome",
  "no operator action without an immutable audit event",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-audit-contracts.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(auditContractsPath, [
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
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "support admin key visible",
  "customer support context key visible",
  "approval gate bypass allowed",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
  "audit deletion claim allowed",
]);

if (failures.length) {
  console.error("Customer support operator audit contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator audit contracts validation passed with owner posture coverage.");

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
