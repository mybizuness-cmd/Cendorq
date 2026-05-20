import { buildOwnerReportTerminalTestCommand } from "./owner-report-terminal-test-command-contract";
import type { OwnerReportTestPlanKey } from "./owner-report-test-mode-standard";

export type OwnerReportTestFixture = {
  fixtureId: string;
  companyName: string;
  companyUrl: string;
  requestedPlans: readonly OwnerReportTestPlanKey[];
  testPurpose: "full-stack-preview" | "free-scan-smoke" | "paid-plan-depth" | "ongoing-control-cycle";
  ownerOnly: true;
  checkoutRequired: false;
  customerDeliveryApproved: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

export const OWNER_REPORT_TEST_FIXTURES = [
  {
    fixtureId: "fixture-apple-full-stack-preview",
    companyName: "Apple",
    companyUrl: "https://www.apple.com",
    requestedPlans: ["free-scan", "deep-review", "build-fix", "ongoing-control"],
    testPurpose: "full-stack-preview",
    ownerOnly: true,
    checkoutRequired: false,
    customerDeliveryApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  },
  {
    fixtureId: "fixture-nike-free-scan-smoke",
    companyName: "Nike",
    companyUrl: "https://www.nike.com",
    requestedPlans: ["free-scan"],
    testPurpose: "free-scan-smoke",
    ownerOnly: true,
    checkoutRequired: false,
    customerDeliveryApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  },
  {
    fixtureId: "fixture-shopify-paid-plan-depth",
    companyName: "Shopify",
    companyUrl: "https://www.shopify.com",
    requestedPlans: ["deep-review", "build-fix"],
    testPurpose: "paid-plan-depth",
    ownerOnly: true,
    checkoutRequired: false,
    customerDeliveryApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  },
  {
    fixtureId: "fixture-airbnb-ongoing-control-cycle",
    companyName: "Airbnb",
    companyUrl: "https://www.airbnb.com",
    requestedPlans: ["ongoing-control"],
    testPurpose: "ongoing-control-cycle",
    ownerOnly: true,
    checkoutRequired: false,
    customerDeliveryApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  },
] as const satisfies readonly OwnerReportTestFixture[];

export function getOwnerReportTestFixtures() {
  return OWNER_REPORT_TEST_FIXTURES;
}

export function getOwnerReportTestFixtureCommands() {
  return OWNER_REPORT_TEST_FIXTURES.map((fixture) => ({
    fixtureId: fixture.fixtureId,
    testPurpose: fixture.testPurpose,
    command: buildOwnerReportTerminalTestCommand({
      companyName: fixture.companyName,
      companyUrl: fixture.companyUrl,
      requestedPlans: fixture.requestedPlans,
    }),
  }));
}
