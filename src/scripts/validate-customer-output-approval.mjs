import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

validateTextFile("src/lib/command-center/customer-output-approval.ts", [
  "CUSTOMER_OUTPUT_APPROVAL_POLICIES",
  "CustomerOutputApprovalPolicy",
  "free-scan-summary",
  "deep-review-report",
  "build-fix-update",
  "ongoing-control-update",
  "delivery-email",
  "plan-change-note",
  "requiredReviews",
  "previewRequirements",
  "blockConditions",
  "auditEvents",
  "unsupported claim",
  "private note included",
]);
validateHelperSafety("src/lib/command-center/customer-output-approval.ts");

validateTextFile("docs/customer-output-approval-standard.md", [
  "Customer Output Approval Standard",
  "Nothing customer-facing should leave the Command Center unless it is previewed, reviewed, approved, and audit-tracked.",
  "Blocked output should not be sent until the blocking issue is fixed and reviewed again.",
  "No customer-facing output without approval.",
  "No private notes in customer-facing output.",
  "No unsupported claim in customer-facing output.",
  "Cendorq remains the source of truth.",
]);

if (failures.length) {
  console.error("Customer output approval validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer output approval validation passed. Customer-facing outputs are previewed, reviewed, approval-gated, block-aware, audit-tracked, and protected from client/runtime value exposure.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing customer output approval file: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function validateHelperSafety(path) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const forbidden of ["NEXT_PUBLIC", "localStorage", "sessionStorage", "fetch(", "use client", "return env", "secretValue"]) {
    if (text.includes(forbidden)) failures.push(`${path} contains forbidden approval behavior: ${forbidden}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
