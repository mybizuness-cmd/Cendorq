import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const apiPath = "src/app/api/admin/support/assignments/route.ts";
const accessRuntimePath = "src/lib/customer-support-operator-access-runtime.ts";
const auditRuntimePath = "src/lib/customer-support-operator-audit-runtime.ts";
const assignmentRuntimePath = "src/lib/customer-support-operator-assignment-runtime.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(apiPath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "requireCustomerSupportOperatorAccess",
  "operatorAccessJsonNoStore",
  "operatorAccessOptionsNoStore",
  "surface: \"operator-assignment\"",
  "action: \"assign-review\"",
  "mutation: true",
  "MAX_ASSIGNMENT_BYTES = 12_000",
  "buildCustomerSupportOperatorAuditRecord",
  "saveCustomerSupportOperatorAuditEnvelope",
  "buildCustomerSupportOperatorAssignment",
  "projectCustomerSupportOperatorAssignment",
  "saveCustomerSupportOperatorAssignmentEnvelope",
  "Customer ownership hash is required server-side.",
  "Customer-safe assignment summary of at least 20 characters is required.",
  "auditRecorded: true",
  "projection: \"operator-assignment-safe\"",
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
  "saveCustomerSupportOperatorAuditEnvelope",
  "owner posture coverage",
]);

expect(assignmentRuntimePath, [
  "buildCustomerSupportOperatorAssignment",
  "projectCustomerSupportOperatorAssignment",
  "saveCustomerSupportOperatorAssignmentEnvelope",
  "owner posture coverage",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-assignment-api.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(apiPath, [
  "verifyAdminReadAccess",
  "SUPPORT_CONSOLE_READ_KEY",
  "INTAKE_ADMIN_KEY",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "console.log",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
  "audit deletion claim allowed",
]);

if (failures.length) {
  console.error("Customer support operator assignment API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator assignment API validation passed with owner posture coverage.");

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
