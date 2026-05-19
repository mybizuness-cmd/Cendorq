import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const summaryPath = "src/lib/owner-report-test-control-summary.ts";
const panelPath = "src/app/command-center/owner-report-test-mode-panel.tsx";
const failures = [];

expect(summaryPath, [
  "OwnerReportTestControlSummary",
  "getOwnerReportTestControlSummary",
  "OWNER_PUBLIC_PAGE_ACQUISITION_STANDARD",
  "OWNER_REPORT_FINDING_ENGINE_STANDARD",
  "OWNER_REPORT_PREVIEW_PACKAGE_STANDARD",
  "OWNER_REPORT_TERMINAL_TEST_COMMAND_STANDARD",
  "OWNER_REPORT_TEST_RESULT_EXPORT_STANDARD",
  "command-center-ui",
  "backend-terminal-api",
  "owner-json-preview-export",
  "ownerCanRunWithoutCheckout: true",
  "publicCompanyUrlOnly: true",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
  "rawEvidenceReturned: false",
  "privateDataReturned: false",
]);

expect(panelPath, [
  "getOwnerReportTestControlSummary",
  "controlSummary",
  "Control standards",
  "Runnable surfaces",
  "Customer mutation",
]);

forbidden(summaryPath, [
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "rawEvidenceReturned: true",
  "privateDataReturned: true",
  "localStorage",
  "sessionStorage",
]);

if (failures.length) {
  console.error("Owner report test control summary validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test control summary validation passed.");

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
