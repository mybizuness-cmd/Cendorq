import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractsPath = "src/lib/customer-support-operator-console-contracts.ts";
const packagePath = "package.json";

expect(contractsPath, [
  "CustomerSupportOperatorConsoleContract",
  "CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT",
  "CUSTOMER_SUPPORT_OPERATOR_ROLE_RULES",
  "CUSTOMER_SUPPORT_OPERATOR_ACTION_RULES",
  "CUSTOMER_SUPPORT_OPERATOR_APPROVAL_GATES",
  "CUSTOMER_SUPPORT_OPERATOR_AUDIT_RULES",
  "CUSTOMER_SUPPORT_OPERATOR_BLOCKED_CONTENT",
  "CUSTOMER_SUPPORT_OPERATOR_CONSOLE_GUARDS",
  "getCustomerSupportOperatorConsoleContracts",
  "route: \"/admin/support\"",
  "access: \"server-only-admin-session\"",
  "defaultMode: \"closed-by-default\"",
  "customerProjection: \"safe-summary-only\"",
  "rawPayloadVisible: false",
  "rawEvidenceVisible: false",
  "rawSecurityPayloadVisible: false",
  "rawBillingDataVisible: false",
  "internalNotesCustomerVisible: false",
  "operatorIdentityCustomerVisible: false",
  "secretsVisible: false",
  "support-triage",
  "support-specialist",
  "billing-approver",
  "security-reviewer",
  "support-admin",
  "view-safe-summary",
  "assign-review",
  "request-customer-update",
  "approve-safe-correction",
  "approve-billing-action",
  "escalate-security-review",
  "close-request",
  "correction approval gate is required before customer-visible report corrections or report-change commitments",
  "billing approval gate is required before refund, credit, invoice, plan, entitlement, or billing-state changes",
  "security approval gate is required before security outcome language, incident classification, account-risk language, or vulnerability statements",
  "every operator view, assignment, hold, escalation, approval, rejection, customer-update request, and closure creates an immutable audit event",
  "audit records must not be represented to customers as deleted when preservation is required",
  "no support operator console route without server-only admin session, role authorization, no-store responses, and closed-by-default access",
  "no operator action without an immutable audit event and an explicit role-to-action authorization rule",
  "no correction, billing, refund, security, legal, report-change, ROI, or business-result promise may be made without the required approval gate",
  "no operator console may claim Cendorq is impossible to hack, risk-free, liability-free, or perfectly secure",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-console-contracts.mjs",
]);

forbidden(contractsPath, [
  "rawPayloadVisible: true",
  "rawEvidenceVisible: true",
  "rawSecurityPayloadVisible: true",
  "rawBillingDataVisible: true",
  "internalNotesCustomerVisible: true",
  "operatorIdentityCustomerVisible: true",
  "secretsVisible: true",
  "browser-admin-session",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "support admin key visible",
  "customer support context key visible",
  "approve without audit",
  "approval gate bypass allowed",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
  "audit deletion claim allowed",
]);

if (failures.length) {
  console.error("Customer support operator console contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator console contracts validation passed.");

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
