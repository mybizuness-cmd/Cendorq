import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const apiPath = "src/app/api/admin/support/assignments/list/route.ts";
const runtimePath = "src/lib/customer-support-operator-assignment-runtime.ts";
const accessPath = "src/lib/customer-support-operator-access-runtime.ts";
const packagePath = "package.json";

expect(apiPath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "requireCustomerSupportOperatorAccess",
  "operatorAccessJsonNoStore",
  "operatorAccessOptionsNoStore",
  "surface: \"operator-assignment\"",
  "action: \"view-safe-summary\"",
  "loadCustomerSupportOperatorAssignmentEnvelope",
  "projectCustomerSupportOperatorAssignment",
  "operator-assignment-safe-list",
  "Unable to load safe assignment records.",
  "cleanQuery",
  "clampInteger",
]);

expect(runtimePath, [
  "projectCustomerSupportOperatorAssignment",
  "projects no customerIdHash, assignedActorRef, raw flags, internal notes, secrets, or authorization internals",
]);

expect(accessPath, [
  "requireCustomerSupportOperatorAccess",
  "support operator access runtime denies by default",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-assignment-list-api.mjs",
]);

forbidden(apiPath, [
  "verifyAdminReadAccess",
  "SUPPORT_CONSOLE_READ_KEY",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "customerIdHash:",
  "assignedActorRef:",
  "rawPayloadStored",
  "rawEvidenceStored",
  "rawSecurityPayloadStored",
  "rawBillingDataStored",
  "rawPaymentDataStored",
  "internalNotesCustomerVisible",
  "secretsStored",
  "console.log",
  "guaranteed refund",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Customer support operator assignment list API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator assignment list API validation passed.");

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
