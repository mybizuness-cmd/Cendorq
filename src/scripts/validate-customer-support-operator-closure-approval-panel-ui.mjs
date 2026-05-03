import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/admin/support/page.tsx";
const panelPath = "src/components/customer-support/operator-closure-approval-panel.tsx";
const apiPath = "src/app/api/admin/support/approvals/closure/route.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(pagePath, [
  "OperatorClosureApprovalPanel",
  "guarded closure review",
  "Assignments, correction reviews, billing reviews, security reviews, and closure reviews require guarded APIs, fresh reauthentication, and immutable audit creation.",
  "All operator actions remain separated by approval gate and reviewer role.",
  "Review, assign, approve, and track support with protected audit controls.",
]);

expect(panelPath, [
  "use client",
  "OperatorClosureApprovalPanel",
  "/api/admin/support/approvals/closure",
  "Closure review",
  "Review closure outcomes with audit.",
  "support-closure reviews only",
  "supportRequestId",
  "customerIdHash",
  "requestedByRole",
  "decision",
  "state",
  "reasonCode",
  "customerSafeSummary",
  "customerSafeOutcomeCopy",
  "Submit closure review",
  "operator-closure-approval-safe",
  "auditRecorded",
]);

expect(apiPath, [
  "requireCustomerSupportOperatorAccess",
  "action: \"close-request\"",
  "access.operatorRole !== \"support-admin\"",
  "approvalGate: \"support-admin-approval\"",
  "approvalType: \"support-closure\"",
  "projection: \"operator-closure-approval-safe\"",
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
  "validate-customer-support-operator-closure-approval-panel-ui.mjs",
  "validate-owner-maximum-protection-posture.mjs",
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
  console.error("Customer support operator closure approval panel UI validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator closure approval panel UI validation passed with owner posture coverage.");

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
