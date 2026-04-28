import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const runtimePath = "src/lib/customer-access-gateway-runtime.ts";
const contractsPath = "src/lib/customer-access-gateway-contracts.ts";
const packagePath = "package.json";

expect(runtimePath, [
  "CUSTOMER_ACCESS_NO_STORE_HEADERS",
  "CUSTOMER_ACCESS_GATEWAY_RUNTIME_GUARDS",
  "jsonNoStore",
  "optionsNoStore",
  "cleanGatewayString",
  "safeGatewayEqual",
  "hashGatewaySecret",
  "checkServerSecretHeader",
  "verifyCustomerSupportContext",
  "verifyAdminReadAccess",
  "allowGatewayAccess",
  "denyGatewayAccess",
  "challengeGatewayAccess",
  "projectGatewaySafeRecord",
  "firstConfiguredSecret",
  "buildGatewaySafeFailure",
  "timingSafeEqual",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "x-support-admin-key",
  "gateway responses use no-store headers",
  "gateway secret comparisons use constant-time checks",
  "gateway customer context is server-verified before protected API work",
  "gateway admin reads require server-only secret headers",
  "gateway safe failure messages do not disclose account existence, attacker details, risk-scoring internals, raw evidence, raw billing IDs, prompts, secrets, or private report internals",
  "gateway projection removes customer secret hashes and server-only context before returning data",
  "gateway string cleaning strips markup, control characters, invisible characters, and excessive whitespace",
  "gateway runtime does not expose support context keys, admin keys, session tokens, or entitlement provider secrets to clients",
]);

expect(contractsPath, [
  "CUSTOMER_ACCESS_GATEWAY_RULES",
  "CUSTOMER_ACCESS_TOKEN_BOUNDARIES",
  "no admin or support context key in browser JavaScript, public environment variables, HTML, analytics, logs, emails, or URLs",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-access-gateway-runtime.mjs",
]);

forbidden(runtimePath, [
  "localStorage",
  "sessionStorage",
  "NEXT_PUBLIC_CUSTOMER_SUPPORT_CONTEXT_KEY",
  "NEXT_PUBLIC_SUPPORT_CONSOLE_READ_KEY",
  "console.log(process.env",
  "console.log(request.headers",
  "customerIdHash: record.customerIdHash",
  "risk-scoring internals disclosed",
  "account existence disclosed",
]);

if (failures.length) {
  console.error("Customer access gateway runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer access gateway runtime validation passed.");

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
