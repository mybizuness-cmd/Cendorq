import { buildOwnerReportTestBatchManifest } from "./owner-report-test-batch-manifest";
import { buildOwnerReportTestFixtureBatchRunner } from "./owner-report-test-fixture-batch-runner";

export type OwnerReportTestTerminalRunbook = {
  title: "Owner report test terminal runbook";
  route: "/api/command-center/owner-report-test-mode";
  helperScript: "node ./src/scripts/print-owner-report-test-fixtures.mjs";
  fixtureCount: number;
  expectedOutputs: readonly string[];
  steps: readonly string[];
  ownerOnly: true;
  publicCompanyUrlOnly: true;
  checkoutRequired: false;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

export const OWNER_REPORT_TEST_TERMINAL_RUNBOOK_STANDARD = [
  "Use the Command Center owner runner for visual review or the backend terminal/API route for structured JSON review.",
  "Run node ./src/scripts/print-owner-report-test-fixtures.mjs to print seeded public-company fixture commands.",
  "GET /api/command-center/owner-report-test-mode returns fixture discovery, batch manifest, preview blueprints, and sample outputs.",
  "POST /api/command-center/owner-report-test-mode with public company URL input returns safety, acquisition, findings, preview packages, export projection, readiness score, execution receipt, and persistence projection.",
  "No owner test command may approve checkout, customer delivery, report release, billing mutation, or entitlement mutation.",
] as const;

export function getOwnerReportTestTerminalRunbook(): OwnerReportTestTerminalRunbook {
  const batch = buildOwnerReportTestFixtureBatchRunner();
  const manifest = buildOwnerReportTestBatchManifest();

  return {
    title: "Owner report test terminal runbook",
    route: "/api/command-center/owner-report-test-mode",
    helperScript: "node ./src/scripts/print-owner-report-test-fixtures.mjs",
    fixtureCount: batch.fixtureCount,
    expectedOutputs: manifest.items[0]?.expectedOutputs ?? [],
    steps: [
      "Open Command Center owner report test mode to visually review the fixture list and report preview structure.",
      "Run the helper script from the backend terminal to print seeded fixture commands.",
      "Call the GET route to inspect fixture discovery and batch manifest output.",
      "POST a public company URL and plan set to inspect the owner-only structured result.",
      "Review readiness score, execution receipt, preview package quality gate, findings, and export projection before any real customer delivery work exists.",
    ],
    ownerOnly: true,
    publicCompanyUrlOnly: true,
    checkoutRequired: false,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  };
}
