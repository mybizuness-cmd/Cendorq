import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const manifestPath = "src/lib/owner-report-test-batch-manifest.ts";
const panelPath = "src/app/command-center/owner-report-test-mode-panel.tsx";
const failures = [];

expect(manifestPath, [
  "OwnerReportTestBatchManifestItem",
  "OwnerReportTestBatchManifest",
  "OWNER_REPORT_TEST_BATCH_MANIFEST_STANDARD",
  "buildOwnerReportTestBatchManifest",
  "owner-report-test-batch-manifest",
  "urlSafety",
  "acquisition",
  "findings",
  "previewPackages",
  "exportProjection",
  "readinessScore",
  "executionReceipt",
  "readyForBackendTerminalRun: true",
  "readyForCommandCenterReview: true",
  "seeded-public-company-fixtures",
  "mustRemainOwnerOnly: true",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "checkoutRequired: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
]);

expect(panelPath, [
  "buildOwnerReportTestBatchManifest",
  "batchManifest",
  "Manifest ID:",
  "Expected outputs per fixture",
]);

forbidden(manifestPath, [
  "mustRemainOwnerOnly: false",
  "readyForBackendTerminalRun: false",
  "readyForCommandCenterReview: false",
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "checkoutRequired: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
]);

if (failures.length) {
  console.error("Owner report test batch manifest validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test batch manifest validation passed.");

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
