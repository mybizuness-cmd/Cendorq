import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/owner-report-test-mode-panel.tsx";
const failures = [];

expect(panelPath, [
  "import Link from \"next/link\"",
  "OwnerReportTestModePanel",
  "Owner report test mode",
  "Run every plan preview without checkout.",
  "Owner-only report testing for public companies",
  "Open owner test runner",
  "href=\"/command-center/owner-report-test\"",
  "OWNER_REPORT_TEST_MODE_STANDARD",
  "OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS",
  "OWNER_REPORT_TEST_PREVIEW_STANDARD",
  "OWNER_REPORT_TEST_SAMPLE_OUTPUTS",
  "Sample report output structure",
  "Trace:",
  "No billing, customer delivery, entitlement mutation, or customer email.",
]);

forbidden(panelPath, [
  "checkoutRequired: true",
  "customerDeliveryApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "guaranteed ranking",
  "guaranteed ROI",
  "guaranteed revenue",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
]);

if (failures.length) {
  console.error("Owner report test mode panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test mode panel validation passed.");

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
