import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/admin/support/page.tsx";
const panelPath = "src/components/customer-support/operator-assignment-panel.tsx";
const apiPath = "src/app/api/admin/support/assignments/route.ts";
const packagePath = "package.json";

expect(pagePath, [
  "OperatorAssignmentPanel",
  "Review and assign support with protected audit controls.",
  "guarded assignment",
  "Assignments require the guarded operator assignment API, fresh reauthentication, and immutable audit creation.",
  "Correction, billing, security, and closure controls are intentionally not available here.",
  "Raw customer materials, private financial details, internal notes, operator identity, risk internals, and unsafe promise language are not rendered.",
]);

expect(panelPath, [
  "use client",
  "OperatorAssignmentPanel",
  "/api/admin/support/assignments",
  "Guarded assignment",
  "Assign support safely with audit.",
  "server-side operator access, fresh reauthentication, immutable audit creation, and safe assignment projection",
  "supportRequestId",
  "customerIdHash",
  "assignedRole",
  "assignmentState",
  "decision",
  "reasonCode",
  "customerSafeSummary",
  "Submit guarded assignment",
  "No customer-visible operator identity is created by this panel.",
  "Assignment stored with safe projection.",
  "auditRecorded",
  "operator-assignment-safe",
]);

expect(apiPath, [
  "requireCustomerSupportOperatorAccess",
  "mutation: true",
  "buildCustomerSupportOperatorAuditRecord",
  "buildCustomerSupportOperatorAssignment",
  "projection: \"operator-assignment-safe\"",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-assignment-ui.mjs",
]);

forbidden(pagePath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "approve-billing-action",
  "approve-safe-correction",
  "close-request",
  "escalate-security-review",
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
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Customer support operator assignment UI validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator assignment UI validation passed.");

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
