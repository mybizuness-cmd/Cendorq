import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/admin/support/page.tsx";
const panelPath = "src/components/customer-support/operator-approval-panel.tsx";
const apiPath = "src/app/api/admin/support/approvals/route.ts";
const packagePath = "package.json";

expect(pagePath, [
  "OperatorApprovalPanel",
  "guarded safe-correction approval",
  "Assignments and safe-correction approvals require guarded APIs, fresh reauthentication, and immutable audit creation.",
  "Billing, security, and closure controls require separate approval gates and are intentionally not added to this panel.",
  "Review, assign, approve corrections, and track support with protected audit controls.",
]);

expect(panelPath, [
  "use client",
  "OperatorApprovalPanel",
  "/api/admin/support/approvals",
  "approvalType: \"safe-correction\"",
  "Guarded approval",
  "Approve safe corrections with audit.",
  "safe-correction approvals only",
  "protected operator access, fresh reauthentication, immutable audit creation, and safe approval projection",
  "supportRequestId",
  "customerIdHash",
  "approvalGate",
  "requestedByRole",
  "reviewerRole",
  "decision",
  "state",
  "reasonCode",
  "customerSafeSummary",
  "customerSafeOutcomeCopy",
  "Submit guarded approval",
  "Only safe-correction approval records are created by this panel.",
  "Approval stored with safe projection.",
  "auditRecorded",
  "operator-approval-safe",
]);

expect(apiPath, [
  "requireCustomerSupportOperatorAccess",
  "action: \"approve-safe-correction\"",
  "mutation: true",
  "buildCustomerSupportOperatorAuditRecord",
  "buildCustomerSupportOperatorApproval",
  "projection: \"operator-approval-safe\"",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-approval-panel-ui.mjs",
]);

forbidden(pagePath, [
  "approve-billing-action panel",
  "security outcome panel",
  "closure approval panel",
  "guaranteed refund",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
]);

forbidden(panelPath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "SUPPORT_CONSOLE_READ_KEY",
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "rawPaymentData",
  "internalNotes",
  "operatorIdentity",
  "riskScoringInternals",
  "attackerDetails",
  "sessionToken",
  "csrfToken",
  "console.log",
  "billing-action",
  "security-outcome",
  "support-closure",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Customer support operator approval panel UI validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator approval panel UI validation passed.");

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
