import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const receiptPath = "src/lib/owner-report-test-execution-receipt.ts";
const apiPath = "src/app/api/command-center/owner-report-test-mode/route.ts";
const failures = [];

expect(receiptPath, [
  "OwnerReportTestExecutionReceipt",
  "buildOwnerReportTestExecutionReceipt",
  "owner-report-test",
  "visibleToOwnerOnly: true",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "checkoutRequired: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
  "rawEvidenceReturned: false",
  "privateDataReturned: false",
]);

expect(apiPath, ["buildOwnerReportTestExecutionReceipt", "executionReceipt"]);
forbidden(receiptPath, ["visibleToOwnerOnly: false", "customerDeliveryApproved: true", "reportReleaseApproved: true", "checkoutRequired: true"]);

if (failures.length) {
  console.error("Owner report test execution receipt validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test execution receipt validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
