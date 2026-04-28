import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

expect("src/app/dashboard/support/page.tsx", [
  "Start protected request",
  "/dashboard/support/request",
  "Open protected request intake",
  "passwords, raw tokens, payment details, or unrelated secrets",
]);

expect("src/app/dashboard/support/request/page.tsx", [
  "Start support request",
  "noIndex: true",
  "Protected support intake",
  "Start with a safe summary, then route the request correctly.",
  "SupportRequestForm",
  "CUSTOMER_SUPPORT_INTAKE_FLOWS",
  "CUSTOMER_SUPPORT_INTAKE_RISK_RULES",
  "Do not paste passwords, raw tokens, secret keys, private keys, or payment details.",
  "Do not paste raw evidence dumps, raw security payloads, or private report internals.",
  "Correction, refund, billing, report-change, legal, or outcome commitments require the correct approval path.",
  "Safety before submit",
  "Risk routing",
]);

expect("src/components/customer-support/support-request-form.tsx", [
  "use client",
  "SupportRequestForm",
  "CUSTOMER_SUPPORT_INTAKE_FLOWS",
  "requestType",
  "businessContext",
  "safeDescription",
  "customerAcknowledgement",
  "/api/customer/support/request",
  "Submit protected request",
  "Track this request safely",
  "/dashboard/support/status",
  "Back to support center",
  "Status tracking uses customer-safe projection only and never reveals internal notes, operator identities, risk-scoring details, raw evidence, billing data, session tokens, or support secrets.",
  "The support request service could not be reached right now.",
  "Do not include passwords, raw tokens, payment data, secrets, private keys, raw evidence dumps, raw security payloads, or private report internals.",
  "I confirm this request does not include passwords, raw tokens, payment details, secrets, private keys, raw evidence dumps, raw security payloads, or private report internals.",
]);

expect("src/lib/customer-support-intake-architecture.ts", [
  "CUSTOMER_SUPPORT_INTAKE_FLOWS",
  "CUSTOMER_SUPPORT_INTAKE_RISK_RULES",
  "no support intake accepts passwords, raw tokens, payment data, secrets, or private keys",
]);

expect("package.json", [
  "validate:routes",
  "validate-customer-support-request-page.mjs",
]);

forbidden("src/app/dashboard/support/request/page.tsx", [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "guaranteed ROI",
  "refund approved",
  "legal outcome guaranteed",
  "raw evidence is shown",
  "passwords are accepted",
  "payment data is accepted",
]);

forbidden("src/components/customer-support/support-request-form.tsx", [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "NEXT_PUBLIC_CUSTOMER_SUPPORT_CONTEXT_KEY",
  "x-support-admin-key",
  "password accepted",
  "payment data accepted",
  "refund approved",
  "legal outcome guaranteed",
]);

if (failures.length) {
  console.error("Customer support request page validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support request page validation passed.");

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
