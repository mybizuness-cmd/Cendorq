import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const batchPath = "src/lib/owner-report-test-fixture-batch-runner.ts";
const panelPath = "src/app/command-center/owner-report-test-mode-panel.tsx";
const failures = [];

expect(batchPath, [
  "OwnerReportTestFixtureBatchItem",
  "OwnerReportTestFixtureBatchRunner",
  "OWNER_REPORT_TEST_FIXTURE_BATCH_STANDARD",
  "buildOwnerReportTestFixtureBatchRunner",
  "owner-fixture-batch-runner",
  "seeded-public-company-fixtures",
  "fixtureCount",
  "terminalCommand",
  "ownerOnly: true",
  "checkoutRequired: false",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
]);

expect(panelPath, [
  "buildOwnerReportTestFixtureBatchRunner",
  "fixtureBatch",
  "Batch ID:",
]);

forbidden(batchPath, [
  "ownerOnly: false",
  "checkoutRequired: true",
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
]);

if (failures.length) {
  console.error("Owner report fixture batch runner validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report fixture batch runner validation passed.");

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
