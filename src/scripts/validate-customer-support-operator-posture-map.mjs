import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/admin/support/page.tsx";
const packagePath = "package.json";

expect(pagePath, [
  "SUPPORT_OPERATOR_POSTURE_MAP",
  "Operator posture map",
  "Posture map",
  "Read and write surfaces at a glance.",
  "This map is informational only. It separates read-only surfaces from guarded write surfaces without changing authorization, review gates, stored records, or projections.",
  "Safe summaries",
  "Assignments",
  "Reviews",
  "History",
  "Read-only",
  "Guarded mutation",
  "Gate-specific mutation",
  "No mutation",
  "Operator record required",
  "Operator record before stored result",
  "Projection query only",
  "safe-summary-only projection",
  "assignment projection",
  "safe approval projection",
  "bounded safe list",
  "GateMapDetail",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-posture-map.mjs",
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
  console.error("Customer support operator posture map validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator posture map validation passed.");

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
