import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const fixturePath = "src/lib/owner-report-test-fixture-matrix.ts";
const panelPath = "src/app/command-center/owner-report-test-mode-panel.tsx";
const failures = [];

expect(fixturePath, [
  "OwnerReportTestFixture",
  "OWNER_REPORT_TEST_FIXTURES",
  "getOwnerReportTestFixtures",
  "getOwnerReportTestFixtureCommands",
  "fixture-apple-full-stack-preview",
  "fixture-nike-free-scan-smoke",
  "fixture-shopify-paid-plan-depth",
  "fixture-airbnb-ongoing-control-cycle",
  "full-stack-preview",
  "free-scan-smoke",
  "paid-plan-depth",
  "ongoing-control-cycle",
  "ownerOnly: true",
  "checkoutRequired: false",
  "customerDeliveryApproved: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
]);

expect(panelPath, [
  "getOwnerReportTestFixtureCommands",
  "fixtureCommands",
  "Seeded owner test fixtures",
  "Fixtures",
]);

forbidden(fixturePath, [
  "ownerOnly: false",
  "checkoutRequired: true",
  "customerDeliveryApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
]);

if (failures.length) {
  console.error("Owner report test fixture matrix validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test fixture matrix validation passed.");

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
