import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

expect("src/app/api/customer/support/request/route.ts", [
  "export async function OPTIONS",
  "export async function GET",
  "export async function POST",
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "GET,POST,OPTIONS",
  "NO_STORE_HEADERS",
  "MAX_REQUEST_BYTES = 20_000",
  "CUSTOMER_CONTEXT_HEADER",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "Verified customer context is required before submitting support requests.",
  "CUSTOMER_SUPPORT_INTAKE_FLOWS",
  "customerOwnershipRequired: true",
  "supportAuditRequired: true",
  "rawPayloadStored: false",
  "downstreamProcessingAllowed",
  "operatorReviewRequired",
  "secret-or-token-submission",
  "payment-data-submission",
  "prompt-injection-or-agent-override",
  "raw-evidence-dump",
  "unsafe-promise-demand",
  "security-sensitive-content",
  "Do not send payment details here. Use the billing center or support path instead.",
  "The support request was captured with a safe summary and routed through the protected support path.",
  "projectEntryForConsole",
  "customerIdHash: _customerIdHash",
]);

expect("src/lib/customer-support-intake-architecture.ts", [
  "CUSTOMER_SUPPORT_INTAKE_FLOWS",
  "CUSTOMER_SUPPORT_INTAKE_RISK_RULES",
]);

expect("src/lib/customer-support-record-contracts.ts", [
  "CUSTOMER_SUPPORT_RECORD_CONTRACTS",
  "rawPayloadStored: false",
]);

expect("package.json", [
  "validate:routes",
  "validate-customer-support-request-api.mjs",
]);

forbidden("src/app/api/customer/support/request/route.ts", [
  "rawPayloadStored: true",
  "customerOwnershipRequired: false",
  "supportAuditRequired: false",
  "password accepted",
  "payment data accepted",
  "refund approved automatically",
  "guaranteed outcome allowed",
  "console.log(rawBody)",
  "console.log(payload)",
]);

if (failures.length) {
  console.error("Customer support request API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support request API validation passed.");

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
