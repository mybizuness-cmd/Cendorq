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
  "CUSTOMER_SUPPORT_INTAKE_FLOWS",
  "CUSTOMER_SUPPORT_INTAKE_RISK_RULES",
  "Do not paste passwords, raw tokens, secret keys, private keys, or payment details.",
  "Do not paste raw evidence dumps, raw security payloads, or private report internals.",
  "Correction, refund, billing, report-change, legal, or outcome commitments require the correct approval path.",
  "Request builder",
  "Safety before submit",
  "Risk routing",
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
