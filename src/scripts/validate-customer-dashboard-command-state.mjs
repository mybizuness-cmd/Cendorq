import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/customer-dashboard-command-state.ts";
const failures = [];

expect(runtimePath, [
  "CustomerDashboardStage",
  "CustomerDashboardNextActionKey",
  "CustomerDashboardCommandStateInput",
  "CustomerDashboardCommandState",
  "CUSTOMER_DASHBOARD_COMMAND_STATE_STANDARD",
  "projectCustomerDashboardCommandState",
  "customer-safe-dashboard-projection",
  "confirm-email",
  "start-free-scan",
  "continue-free-scan",
  "open-free-scan-result",
  "open-report-vault",
  "review-billing",
  "open-support-status",
  "open-notifications",
  "compare-plans",
  "account-created",
  "free-scan-needed",
  "free-scan-in-progress",
  "free-scan-submitted",
  "free-scan-result-ready",
  "review-ready",
  "repair-ready",
  "control-ready",
  "rawEmailReturned: false",
  "rawSessionReturned: false",
  "rawReportReturned: false",
  "rawEvidenceReturned: false",
  "rawBillingProviderPayloadReturned: false",
  "internalNotesReturned: false",
  "unsupportedGuaranteesReturned: false",
]);

expect(runtimePath, [
  "Dashboard state must be computed from safe customer-owned projections, not raw provider payloads.",
  "Dashboard next action must choose one clear action before showing secondary options.",
  "Email verification comes before protected customer value.",
  "Reports, billing, support, and notifications must remain visible as modules without leaking raw records.",
  "Billing attention must not imply payment failure details unless the billing provider state is approved for display.",
  "Support status must show customer-safe status, not operator notes or internal triage data.",
]);

forbidden(runtimePath, [
  "rawEmailReturned: true",
  "rawSessionReturned: true",
  "rawReportReturned: true",
  "rawEvidenceReturned: true",
  "rawBillingProviderPayloadReturned: true",
  "internalNotesReturned: true",
  "unsupportedGuaranteesReturned: true",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed ranking",
  "workspace access",
  "full diagnosis",
  "diagnostic",
]);

if (failures.length) {
  console.error("Customer dashboard command state validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer dashboard command state validation passed with safe next-action projection, module state, and raw data boundaries.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
