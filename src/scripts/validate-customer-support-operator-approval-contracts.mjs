import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractsPath = "src/lib/customer-support-operator-approval-contracts.ts";
const consolePath = "src/lib/customer-support-operator-console-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(contractsPath, [
  "CustomerSupportOperatorApprovalContract",
  "CustomerSupportOperatorApprovalType",
  "CustomerSupportOperatorApprovalDecision",
  "CustomerSupportOperatorApprovalState",
  "CUSTOMER_SUPPORT_OPERATOR_APPROVAL_REQUIRED_FIELDS",
  "CUSTOMER_SUPPORT_OPERATOR_APPROVAL_TYPE_RULES",
  "CUSTOMER_SUPPORT_OPERATOR_APPROVAL_DECISION_RULES",
  "CUSTOMER_SUPPORT_OPERATOR_APPROVAL_ROLE_RULES",
  "CUSTOMER_SUPPORT_OPERATOR_APPROVAL_BLOCKED_CONTENT",
  "CUSTOMER_SUPPORT_OPERATOR_APPROVAL_GUARDS",
  "getCustomerSupportOperatorApprovalContracts",
  "approvalId",
  "supportRequestId",
  "customerIdHash",
  "approvalType",
  "approvalGate",
  "requestedByRole",
  "reviewerRole",
  "decision",
  "state",
  "reasonCode",
  "customerSafeSummary",
  "customerSafeOutcomeCopy",
  "auditEventId",
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
  "safe-correction approval requires specialist-review or support-admin-approval before customer-visible correction language",
  "billing-action approval requires billing-approval before refund, credit, invoice, entitlement, plan, or billing-state language",
  "security-outcome approval requires security-approval before customer-visible security outcome language, incident classification, or account-risk language",
  "support-closure approval requires support-admin-approval before irreversible closure, policy exception, or customer-facing exception language",
  "approve requires role authorization, required approval gate, immutable audit record, and customer-safe outcome copy when the result will be shown to a customer",
  "no support approval without server-only operator access, reviewer role authorization, required approval gate, fresh admin reauth for mutation, and immutable audit creation",
  "no support approval permits refund, correction, report-change, billing, legal, security, ROI, or business-result commitments without the required approval gate and customer-safe outcome copy",
  "no support approval may claim absolute security, risk-free operation, liability removal, or perfect protection",
]);

expect(consolePath, [
  "CustomerSupportOperatorApprovalGate",
  "CustomerSupportOperatorRole",
  "billing-approval",
  "security-approval",
  "support-admin-approval",
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
  "validate-customer-support-operator-approval-contracts.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(contractsPath, [
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
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "approval gate bypass allowed",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
  "audit deletion claim allowed",
]);

if (failures.length) {
  console.error("Customer support operator approval contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator approval contracts validation passed with owner posture coverage.");

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
