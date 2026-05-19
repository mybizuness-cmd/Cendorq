import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const evaluatorPath = "src/lib/owner-report-test-result-review-evaluator.ts";
const apiPath = "src/app/api/command-center/owner-report-test-mode/route.ts";
const failures = [];

expect(evaluatorPath, [
  "OwnerReportTestResultReviewEvaluation",
  "evaluateOwnerReportTestResultReview",
  "getOwnerReportTestResultReviewContract",
  "urlSafety",
  "acquisition",
  "findings",
  "previewPackages",
  "exportProjection",
  "readinessScore",
  "executionReceipt",
  "mutationSafety",
  "ownerOnly: true",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "checkoutRequired: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
  "rawEvidenceAllowed: false",
  "privateDataAllowed: false",
]);

expect(apiPath, [
  "evaluateOwnerReportTestResultReview",
  "resultReview",
]);

forbidden(evaluatorPath, [
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
  console.error("Owner report test result review evaluator validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test result review evaluator validation passed.");

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
