import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/admin/support/page.tsx";
const componentPath = "src/components/customer-support/operator-assignment-list.tsx";
const apiPath = "src/app/api/admin/support/assignments/list/route.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(pagePath, [
  "OperatorAssignmentList",
  "safe assignment history",
  "Assignment history uses safe assignment projections only.",
  "Review, assign, and track support with protected audit controls.",
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

expect(componentPath, [
  "use client",
  "OperatorAssignmentList",
  "/api/admin/support/assignments/list?limit=50",
  "Assignment records",
  "Safe assignment history.",
  "safe assignment projections only",
  "Customer ownership hashes, actor references, raw storage flags, internal notes, and authorization internals are intentionally absent.",
  "Refresh assignments",
  "No assignment records are visible yet.",
  "Safe projection",
  "assignmentId",
  "supportRequestId",
  "assignedRole",
  "assignmentState",
  "decision",
  "reasonCode",
  "customerSafeSummary",
  "auditEventId",
]);

expect(apiPath, [
  "requireCustomerSupportOperatorAccess",
  "projectCustomerSupportOperatorAssignment",
  "operator-assignment-safe-list",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-assignment-list-ui.mjs",
  "validate-owner-maximum-protection-posture.mjs",
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
  "assignedActorRef",
  "rawPayloadStored",
  "rawEvidenceStored",
  "rawSecurityPayloadStored",
  "rawBillingDataStored",
  "rawPaymentDataStored",
  "internalNotesCustomerVisible",
  "secretsStored",
  "operatorIdentity",
  "riskScoringInternals",
  "console.log",
  "guaranteed refund",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Customer support operator assignment list UI validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator assignment list UI validation passed with owner posture coverage.");

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
