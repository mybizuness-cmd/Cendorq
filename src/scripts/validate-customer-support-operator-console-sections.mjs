import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/admin/support/page.tsx";
const packagePath = "package.json";

expect(pagePath, [
  "OperatorSectionHeader",
  "Review intake",
  "Safe intake and routing.",
  "Separated actions",
  "Approval actions by gate.",
  "Safe history",
  "Projection-only history.",
  "organized into safe intake and routing, separated review actions, and safe history",
  "Correction, billing, security, and closure reviews stay separated by endpoint, gate, reviewer role, audit path, and safe projection output.",
  "Assignment and approval history show safe projections only, with filtering and refresh controls that never add customer hashes, raw fields, or internal authorization details to the UI.",
  "OperatorSafeSummaryConsole",
  "OperatorAssignmentPanel",
  "OperatorApprovalPanel",
  "OperatorBillingApprovalPanel",
  "OperatorSecurityApprovalPanel",
  "OperatorClosureApprovalPanel",
  "OperatorAssignmentList",
  "OperatorApprovalList",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-operator-console-sections.mjs",
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
  console.error("Customer support operator console section validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator console section validation passed.");

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
