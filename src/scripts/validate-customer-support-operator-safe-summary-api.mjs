import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const apiPath = "src/app/api/admin/support/requests/route.ts";
const accessRuntimePath = "src/lib/customer-support-operator-access-runtime.ts";
const auditRuntimePath = "src/lib/customer-support-operator-audit-runtime.ts";
const packagePath = "package.json";

expect(apiPath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "requireCustomerSupportOperatorAccess",
  "operatorAccessJsonNoStore",
  "operatorAccessOptionsNoStore",
  "surface: \"admin-support-api\"",
  "action: \"view-safe-summary\"",
  "buildCustomerSupportOperatorAuditRecord",
  "loadCustomerSupportOperatorAuditEnvelope",
  "mergeCustomerSupportOperatorAuditRecords",
  "saveCustomerSupportOperatorAuditEnvelope",
  "customer-support-requests.v3.json",
  "SupportOperatorSafeSummary",
  "projectSupportRequestForOperator",
  "riskFlagCount",
  "rawPayloadStored: false",
  "customerOwnershipRequired: true",
  "supportAuditRequired: true",
  "projection: \"safe-summary-only\"",
  "auditRecorded: auditBuild.ok",
  "No authorized safe support summary was found.",
  "Unable to load safe support summaries.",
  "Operator viewed one customer-owned safe support summary.",
  "Operator viewed a bounded list of customer-safe support summaries.",
]);

expect(accessRuntimePath, [
  "requireCustomerSupportOperatorAccess",
  "operatorAccessJsonNoStore",
  "operatorAccessOptionsNoStore",
  "support operator access runtime denies by default",
]);

expect(auditRuntimePath, [
  "buildCustomerSupportOperatorAuditRecord",
  "mergeCustomerSupportOperatorAuditRecords",
  "saveCustomerSupportOperatorAuditEnvelope",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-safe-summary-api.mjs",
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
  "customerIdHash:",
  "safeDescription:",
  "riskFlags:",
  "rawPayloadStored: true",
  "rawEvidenceStored: true",
  "rawSecurityPayloadStored: true",
  "rawBillingDataStored: true",
  "internalNotes",
  "operatorId",
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
  "audit deletion claim allowed",
]);

if (failures.length) {
  console.error("Customer support operator safe summary API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator safe summary API validation passed.");

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
