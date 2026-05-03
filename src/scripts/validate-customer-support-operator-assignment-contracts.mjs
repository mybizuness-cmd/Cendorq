import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractsPath = "src/lib/customer-support-operator-assignment-contracts.ts";
const accessRuntimePath = "src/lib/customer-support-operator-access-runtime.ts";
const auditRuntimePath = "src/lib/customer-support-operator-audit-runtime.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(contractsPath, [
  "CustomerSupportOperatorAssignmentContract",
  "CustomerSupportOperatorAssignmentState",
  "CustomerSupportOperatorAssignmentDecision",
  "CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_REQUIRED_FIELDS",
  "CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_STATE_RULES",
  "CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_DECISION_RULES",
  "CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_ROLE_RULES",
  "CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_BLOCKED_CONTENT",
  "CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_GUARDS",
  "getCustomerSupportOperatorAssignmentContracts",
  "assignmentId",
  "supportRequestId",
  "customerIdHash",
  "assignedRole",
  "assignedActorRef",
  "assignmentState",
  "decision",
  "reasonCode",
  "customerSafeSummary",
  "auditEventId",
  "immutableAuditRequired: true",
  "customerVisibleOperatorIdentity: false",
  "rawPayloadStored: false",
  "rawEvidenceStored: false",
  "rawSecurityPayloadStored: false",
  "rawBillingDataStored: false",
  "rawPaymentDataStored: false",
  "internalNotesCustomerVisible: false",
  "secretsStored: false",
  "triage-assigned means support triage may view safe summaries, classify, hold, or request a safer customer update",
  "billing-assigned means a billing approver may review safe summaries for billing action but may not view raw payment data",
  "security-assigned means a security reviewer may review safe summaries for security escalation but may not expose attacker details or exploit instructions",
  "assign requires server-only operator access, role authorization, fresh admin reauth for mutation, and immutable audit record creation",
  "deny is used when assignment cannot be authorized safely and must not reveal role inventory, customer existence, support request existence, or internal authorization details",
  "no support operator assignment without server-only operator access, role authorization, fresh admin reauth for mutation, and immutable audit creation",
  "no support operator assignment may bypass billing, security, correction, or support-admin approval gates",
  "no support operator assignment may claim Cendorq is impossible to hack, risk-free, liability-free, or perfectly secure",
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

expect(accessRuntimePath, [
  "requireCustomerSupportOperatorAccess",
  "support operator access runtime requires fresh admin reauth for mutations before returning allow",
  "owner posture coverage",
]);

expect(auditRuntimePath, [
  "buildCustomerSupportOperatorAuditRecord",
  "authorizeOperatorAuditAction",
  "owner posture coverage",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-assignment-contracts.mjs",
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
  "secretsStored: true",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "assignment without audit allowed",
  "approval gate bypass allowed",
  "operator identity visible",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
  "audit deletion claim allowed",
]);

if (failures.length) {
  console.error("Customer support operator assignment contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator assignment contracts validation passed with owner posture coverage.");

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
