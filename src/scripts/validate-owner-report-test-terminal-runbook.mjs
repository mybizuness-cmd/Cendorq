import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runbookPath = "src/lib/owner-report-test-terminal-runbook.ts";
const panelPath = "src/app/command-center/owner-report-test-mode-panel.tsx";
const failures = [];

expect(runbookPath, [
  "OwnerReportTestTerminalRunbook",
  "OWNER_REPORT_TEST_TERMINAL_RUNBOOK_STANDARD",
  "getOwnerReportTestTerminalRunbook",
  "node ./src/scripts/print-owner-report-test-fixtures.mjs",
  "/api/command-center/owner-report-test-mode",
  "fixture discovery",
  "readiness score",
  "execution receipt",
  "ownerOnly: true",
  "publicCompanyUrlOnly: true",
  "checkoutRequired: false",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
]);

expect(panelPath, [
  "getOwnerReportTestTerminalRunbook",
  "terminalRunbook",
  "Runbook helper:",
  "Expected outputs:",
]);

forbidden(runbookPath, [
  "ownerOnly: false",
  "publicCompanyUrlOnly: false",
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
  console.error("Owner report terminal runbook validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report terminal runbook validation passed.");

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
