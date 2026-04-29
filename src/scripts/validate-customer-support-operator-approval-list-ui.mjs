import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/admin/support/page.tsx";
const componentPath = "src/components/customer-support/operator-approval-list.tsx";
const apiPath = "src/app/api/admin/support/approvals/list/route.ts";
const packagePath = "package.json";

expect(pagePath, [
  "OperatorApprovalList",
  "safe approval history",
  "Assignment and approval history use safe projections only.",
  "Review, assign, approve, and track support with protected audit controls.",
]);

expect(componentPath, [
  "use client",
  "OperatorApprovalList",
  "/api/admin/support/approvals/list?limit=50",
  "Approval records",
  "Safe approval history.",
  "operator approval projections only",
  "Customer ownership hashes, requester roles, raw storage flags, internal notes, secrets, and authorization internals are intentionally absent.",
  "Refresh approvals",
  "No approval records are visible yet.",
  "Safe projection",
  "approvalId",
  "supportRequestId",
  "approvalType",
  "approvalGate",
  "reviewerRole",
  "decision",
  "state",
  "reasonCode",
  "customerSafeSummary",
  "customerSafeOutcomeCopy",
  "auditEventId",
]);

expect(apiPath, [
  "requireCustomerSupportOperatorAccess",
  "projectCustomerSupportOperatorApproval",
  "operator-approval-safe-list",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-approval-list-ui.mjs",
]);

forbidden(componentPath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "SUPPORT_CONSOLE_READ_KEY",
  "customerIdHash",
  "requestedByRole",
  "rawPayloadStored",
  "rawEvidenceStored",
  "rawSecurityPayloadStored",
  "rawBillingDataStored",
  "rawPaymentDataStored",
  "internalNotesCustomerVisible",
  "unsupportedPromiseAllowed",
  "secretsStored",
  "operatorIdentity",
  "riskScoringInternals",
  "attackerDetails",
  "console.log",
  "guaranteed refund",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Customer support operator approval list UI validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator approval list UI validation passed.");

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
