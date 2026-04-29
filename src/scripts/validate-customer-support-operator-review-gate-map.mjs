import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/admin/support/page.tsx";
const packagePath = "package.json";

expect(pagePath, [
  "SUPPORT_OPERATOR_REVIEW_GATE_MAP",
  "Operator review gate map",
  "Review gate map",
  "Separated review paths.",
  "This map is informational only. It lists the endpoint, approval gate, reviewer role, and safe projection for each review path without changing protected API behavior.",
  "/api/admin/support/approvals",
  "/api/admin/support/approvals/billing",
  "/api/admin/support/approvals/security",
  "/api/admin/support/approvals/closure",
  "specialist-review",
  "billing-approval",
  "security-approval",
  "support-admin-approval",
  "support-specialist",
  "billing-approver",
  "security-reviewer",
  "support-admin",
  "operator-approval-safe",
  "operator-billing-approval-safe",
  "operator-security-approval-safe",
  "operator-closure-approval-safe",
  "GateMapDetail",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-review-gate-map.mjs",
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
  console.error("Customer support operator review gate map validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator review gate map validation passed.");

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
