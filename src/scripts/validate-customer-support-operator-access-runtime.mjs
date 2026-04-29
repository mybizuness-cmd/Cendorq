import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const runtimePath = "src/lib/customer-support-operator-access-runtime.ts";
const contractsPath = "src/lib/customer-support-operator-access-contracts.ts";
const auditRuntimePath = "src/lib/customer-support-operator-audit-runtime.ts";
const packagePath = "package.json";

expect(runtimePath, [
  "CUSTOMER_SUPPORT_OPERATOR_ACCESS_RUNTIME_GUARDS",
  "requireCustomerSupportOperatorAccess",
  "operatorAccessJsonNoStore",
  "operatorAccessOptionsNoStore",
  "CustomerSupportOperatorAccessInput",
  "CustomerSupportOperatorAccessResult",
  "CUSTOMER_SUPPORT_OPERATOR_ACCESS_CONTRACT",
  "authorizeOperatorAuditAction",
  "jsonNoStore",
  "optionsNoStore",
  "OPERATOR_SESSION_COOKIE",
  "OPERATOR_REAUTH_COOKIE",
  "OPERATOR_ROLE_HEADER",
  "OPERATOR_ACTOR_HEADER",
  "The requested operator surface or action is not allowlisted.",
  "Operator access requires a verified admin session.",
  "Operator access could not be authorized safely.",
  "Fresh admin reauthentication is required before this support action.",
  "The operator role is not permitted to perform the requested action.",
  "Operator access was authorized with customer-safe projection and audit requirements.",
  "requiresAudit: true",
  "input.mutation",
  "reauthCookie",
  "safeReasons",
  "deny({ decision: \"deny\"",
  "deny({ decision: \"challenge\"",
  "support operator access runtime denies by default when server-only admin session context is missing, expired, unverified, or role-missing",
  "support operator access runtime accepts only allowlisted support operator surfaces, roles, and protected actions",
  "support operator access runtime requires fresh admin reauth for mutations before returning allow",
  "support operator access runtime delegates role-to-action and approval-gate checks to the support operator audit runtime before privileged decisions",
  "support operator access runtime returns no-store JSON and OPTIONS helpers without exposing operator identities, role inventory, customer existence, support request existence, or internal authorization details",
  "support operator access runtime does not read localStorage, sessionStorage, browser-readable admin secrets, browser-readable support context keys, query-string secrets, or public JavaScript secrets",
]);

expect(contractsPath, [
  "CUSTOMER_SUPPORT_OPERATOR_ACCESS_CONTRACT",
  "defaultDecision: \"deny\"",
  "sessionLocation: \"server-only-http-only-cookie\"",
  "fresh-admin-reauth-required-for-mutations",
  "browserReadableAdminSecretAllowed: false",
]);

expect(auditRuntimePath, [
  "authorizeOperatorAuditAction",
  "support operator audit runtime enforces role-to-action authorization before record creation",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-access-runtime.mjs",
]);

forbidden(runtimePath, [
  "defaultDecision: \"allow\"",
  "browserReadableAdminSecretAllowed: true",
  "browserReadableSupportContextAllowed: true",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "window.",
  "document.",
  "query-string secrets allowed",
  "support admin key visible",
  "customer support context key visible",
  "customerIdHash:",
  "supportRequestId:",
  "operatorActorRef:",
  "operatorRole:",
  "role inventory",
  "console.log",
  "approval gate bypass allowed",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
  "audit deletion claim allowed",
]);

if (failures.length) {
  console.error("Customer support operator access runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator access runtime validation passed.");

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
