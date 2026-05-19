import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/owner-report-test-api-response-contract.ts";
const panelPath = "src/app/command-center/owner-report-test-mode-panel.tsx";
const apiPath = "src/app/api/command-center/owner-report-test-mode/route.ts";
const failures = [];

expect(contractPath, [
  "OwnerReportTestApiResponseContract",
  "OWNER_REPORT_TEST_API_RESPONSE_CONTRACT_STANDARD",
  "getOwnerReportTestApiResponseContract",
  "/api/command-center/owner-report-test-mode",
  "requiredTopLevelKeys",
  "requiredSafetyFlags",
  "urlSafety",
  "acquisition",
  "findings",
  "previewPackages",
  "exportProjection",
  "readinessScore",
  "executionReceipt",
  "resultReview",
  "persistence",
  "sampleOutputs",
  "previewBlueprints",
  "previewOnly",
  "checkoutBypassedForOwnerTestOnly",
  "ownerOnly: true",
  "publicCompanyUrlOnly: true",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "checkoutRequired: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
  "rawEvidenceAllowed: false",
  "privateDataAllowed: false",
]);

expect(panelPath, [
  "getOwnerReportTestApiResponseContract",
  "apiResponseContract",
  "Response keys",
  "Required response keys:",
]);

expect(apiPath, [
  "urlSafety",
  "acquisition",
  "findings",
  "previewPackages",
  "exportProjection",
  "readinessScore",
  "executionReceipt",
  "resultReview",
  "persistence",
]);

forbidden(contractPath, [
  "ownerOnly: false",
  "publicCompanyUrlOnly: false",
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "checkoutRequired: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "rawEvidenceAllowed: true",
  "privateDataAllowed: true",
]);

if (failures.length) {
  console.error("Owner report test API response contract validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test API response contract validation passed.");

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
