import { OWNER_REPORT_TEST_FIXTURES, type OwnerReportTestFixture } from "./owner-report-test-fixture-matrix";
import { buildOwnerReportTerminalTestCommand } from "./owner-report-terminal-test-command-contract";

export type OwnerReportTestFixtureBatchItem = {
  fixtureId: string;
  testPurpose: OwnerReportTestFixture["testPurpose"];
  companyName: string;
  companyUrl: string;
  planCount: number;
  terminalCommand: string;
  ownerOnly: true;
  checkoutRequired: false;
  customerDeliveryApproved: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

export type OwnerReportTestFixtureBatchRunner = {
  batchId: string;
  mode: "owner-fixture-batch-runner";
  fixtureCount: number;
  items: readonly OwnerReportTestFixtureBatchItem[];
  commandCenterOnly: true;
  acceptedInput: "seeded-public-company-fixtures";
  checkoutRequired: false;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

export const OWNER_REPORT_TEST_FIXTURE_BATCH_STANDARD = [
  "Fixture batch runner gives the owner a fast backend-terminal/API smoke set across multiple public companies.",
  "Fixture batch runner is seeded-public-company-fixtures only and remains owner-only.",
  "Fixture batch runner does not approve checkout, customer delivery, report release, billing mutation, or entitlement mutation.",
] as const;

export function buildOwnerReportTestFixtureBatchRunner(): OwnerReportTestFixtureBatchRunner {
  const items = OWNER_REPORT_TEST_FIXTURES.map(toBatchItem);
  return {
    batchId: `owner-fixture-batch-${items.length}`,
    mode: "owner-fixture-batch-runner",
    fixtureCount: items.length,
    items,
    commandCenterOnly: true,
    acceptedInput: "seeded-public-company-fixtures",
    checkoutRequired: false,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  };
}

function toBatchItem(fixture: OwnerReportTestFixture): OwnerReportTestFixtureBatchItem {
  const command = buildOwnerReportTerminalTestCommand({
    companyName: fixture.companyName,
    companyUrl: fixture.companyUrl,
    requestedPlans: fixture.requestedPlans,
  });

  return {
    fixtureId: fixture.fixtureId,
    testPurpose: fixture.testPurpose,
    companyName: fixture.companyName,
    companyUrl: fixture.companyUrl,
    planCount: fixture.requestedPlans.length,
    terminalCommand: command.curlPreview,
    ownerOnly: true,
    checkoutRequired: false,
    customerDeliveryApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  };
}
