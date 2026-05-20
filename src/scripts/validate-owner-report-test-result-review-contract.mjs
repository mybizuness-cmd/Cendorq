import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const reviewPath = "src/lib/owner-report-test-result-review-contract.ts";
const panelPath = "src/app/command-center/owner-report-test-mode-panel.tsx";
const failures = [];

expect(reviewPath, [
  "OwnerReportTestResultReviewCheck",
  "OwnerReportTestResultReviewContract",
  "OWNER_REPORT_TEST_RESULT_REVIEW_STANDARD",
  "getOwnerReportTestResultReviewContract",
  "urlSafety",
  "acquisition",
  "findings",
  "previewPackages",
  "exportProjection",
  "readinessScore",
  "executionReceipt",
  "mutationSafety",
  "passThreshold: 100",
  "ownerOnly: true",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "checkoutRequired: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
  "rawEvidenceAllowed: false",
  "privateDataAllowed: false",
]);

expect(panelPath, [
  "getOwnerReportTestResultReviewContract",
  "resultReview",
  "Review checks",
  "Review threshold:",
]);

forbidden(reviewPath, [
  "ownerOnly: false",
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "checkoutRequired: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "rawEvidenceAllowed: true",
  "privateDataAllowed: true",
]);

if (failures.length) {
  console.error("Owner report test result review contract validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test result review contract validation passed.");

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
