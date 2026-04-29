import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/admin/support/page.tsx";
const packagePath = "package.json";

expect(pagePath, [
  "SUPPORT_OPERATOR_COMPLETION_CHECKLIST",
  "Operator completion checklist",
  "Completion checklist",
  "Check before review action.",
  "This checklist is informational only. It does not approve, deny, store, or expose support data.",
  "Safe summary reviewed",
  "Customer-owned context confirmed",
  "Correct review gate selected",
  "Customer-safe copy prepared",
  "Use the safe-summary projection before assigning or reviewing.",
  "Use only customer-owned support context from guarded APIs.",
  "Match the panel to correction, billing, security, or closure.",
  "Write bounded status or outcome copy before submitting a review.",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-completion-checklist.mjs",
]);

forbidden(pagePath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "SUPPORT_CONSOLE_READ_KEY",
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "rawPaymentData",
  "internalNotes:",
  "operatorIdentity:",
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
]);

if (failures.length) {
  console.error("Customer support operator completion checklist validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator completion checklist validation passed.");

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
