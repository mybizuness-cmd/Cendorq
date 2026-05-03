import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/admin/support/page.tsx";
const panelPath = "src/components/customer-support/operator-security-approval-panel.tsx";
const apiPath = "src/app/api/admin/support/approvals/security/route.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(pagePath, [
  "OperatorSecurityApprovalPanel",
  "guarded security review",
  "Assignments, correction reviews, billing reviews, and security reviews require guarded APIs, fresh reauthentication, and immutable audit creation.",
  "Closure controls require a separate approval gate and are intentionally not added to this panel.",
  "Review, assign, approve, and track support with protected audit controls.",
]);

expect(panelPath, [
  "use client",
  "OperatorSecurityApprovalPanel",
  "/api/admin/support/approvals/security",
  "Security review",
  "Review security outcomes with audit.",
  "security-outcome reviews only",
  "supportRequestId",
  "customerIdHash",
  "requestedByRole",
  "decision",
  "state",
  "reasonCode",
  "customerSafeSummary",
  "customerSafeOutcomeCopy",
  "Submit security review",
  "operator-security-approval-safe",
  "auditRecorded",
]);

expect(apiPath, [
  "requireCustomerSupportOperatorAccess",
  "action: \"escalate-security-review\"",
  "access.operatorRole !== \"security-reviewer\"",
  "approvalGate: \"security-approval\"",
  "approvalType: \"security-outcome\"",
  "projection: \"operator-security-approval-safe\"",
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
  "validate-customer-support-operator-security-approval-panel-ui.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(pagePath, [
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
  "support-closure",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Customer support operator security approval panel UI validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator security approval panel UI validation passed with owner posture coverage.");

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
