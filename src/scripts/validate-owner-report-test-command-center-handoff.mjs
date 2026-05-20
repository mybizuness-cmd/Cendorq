import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const handoffPath = "src/lib/owner-report-test-command-center-handoff.ts";
const apiPath = "src/app/api/command-center/owner-report-test-mode/route.ts";
const panelPath = "src/app/command-center/owner-report-test-mode-panel.tsx";
const failures = [];

expect(handoffPath, [
  "OwnerReportTestCommandCenterHandoff",
  "buildOwnerReportTestCommandCenterHandoff",
  "terminalRunbookReady: true",
  "apiResponseContractReady: true",
  "resultReviewReady: true",
  "batchManifestReady: true",
  "ownerOnly: true",
  "checkoutRequired: false",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
]);

expect(apiPath, [
  "buildOwnerReportTestCommandCenterHandoff",
  "commandCenterHandoff",
]);

expect(panelPath, [
  "buildOwnerReportTestCommandCenterHandoff",
  "commandCenterHandoff",
  "Handoff ready",
  "Handoff:",
]);

forbidden(handoffPath, [
  "ownerOnly: false",
  "checkoutRequired: true",
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
]);

if (failures.length) {
  console.error("Owner report test command center handoff validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test command center handoff validation passed.");

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
