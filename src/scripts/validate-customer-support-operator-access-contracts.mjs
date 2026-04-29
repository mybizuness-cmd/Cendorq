import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const accessContractsPath = "src/lib/customer-support-operator-access-contracts.ts";
const operatorContractsPath = "src/lib/customer-support-operator-console-contracts.ts";
const auditRuntimePath = "src/lib/customer-support-operator-audit-runtime.ts";
const packagePath = "package.json";

expect(accessContractsPath, [
  "CustomerSupportOperatorAccessContract",
  "CustomerSupportOperatorAccessDecision",
  "CustomerSupportOperatorSessionState",
  "CustomerSupportOperatorAccessSurface",
  "CUSTOMER_SUPPORT_OPERATOR_ACCESS_CONTRACT",
  "CUSTOMER_SUPPORT_OPERATOR_ACCESS_REQUIRED_CHECKS",
  "CUSTOMER_SUPPORT_OPERATOR_ACCESS_ROLE_RULES",
  "CUSTOMER_SUPPORT_OPERATOR_ACCESS_MUTATION_RULES",
  "CUSTOMER_SUPPORT_OPERATOR_ACCESS_BLOCKED_CONTENT",
  "CUSTOMER_SUPPORT_OPERATOR_ACCESS_GUARDS",
  "getCustomerSupportOperatorAccessContracts",
  "route: \"/admin/support\"",
  "defaultDecision: \"deny\"",
  "sessionLocation: \"server-only-http-only-cookie\"",
  "reauthMode: \"fresh-admin-reauth-required-for-mutations\"",
  "responseMode: \"no-store\"",
  "browserReadableAdminSecretAllowed: false",
  "browserReadableSupportContextAllowed: false",
  "localStorageAllowed: false",
  "sessionStorageAllowed: false",
  "rawCustomerDataAllowed: false",
  "operator access is denied by default until server-only admin session verification passes",
  "operator mutations require fresh admin reauthentication and immutable audit creation before success responses",
  "operator access failures must not leak customer existence, support request existence, operator identities, role inventory, or internal authorization details",
  "request-customer-update requires role authorization, fresh admin reauth, immutable audit record, waiting-on-customer customer-safe projection, and no rejected raw content echo",
  "approve-billing-action requires billing-approval gate, immutable audit record, billing-system verification, and no raw payment data exposure",
  "no support operator access without server-only admin session verification, role authorization, no-store response controls, and closed-by-default denial",
  "no support operator mutation without fresh admin reauth, immutable audit record, role-to-action authorization, and required approval gate",
  "no support operator access uses localStorage, sessionStorage, browser-readable admin secrets, browser-readable support context keys, query-string secrets, or public JavaScript secrets",
  "no support operator route may claim Cendorq is impossible to hack, risk-free, liability-free, or perfectly secure",
]);

expect(operatorContractsPath, [
  "CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT",
  "CustomerSupportOperatorRole",
  "CustomerSupportOperatorAction",
  "server-only-admin-session",
]);

expect(auditRuntimePath, [
  "buildCustomerSupportOperatorAuditRecord",
  "authorizeOperatorAuditAction",
  "support operator audit runtime enforces role-to-action authorization before record creation",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-access-contracts.mjs",
]);

forbidden(accessContractsPath, [
  "defaultDecision: \"allow\"",
  "browserReadableAdminSecretAllowed: true",
  "browserReadableSupportContextAllowed: true",
  "localStorageAllowed: true",
  "sessionStorageAllowed: true",
  "rawCustomerDataAllowed: true",
  "browser-admin-session",
  "localStorage required",
  "sessionStorage required",
  "query-string secrets allowed",
  "support admin key visible",
  "customer support context key visible",
  "approval gate bypass allowed",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
  "audit deletion claim allowed",
]);

if (failures.length) {
  console.error("Customer support operator access contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator access contracts validation passed.");

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
