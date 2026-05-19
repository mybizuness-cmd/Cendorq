import { buildOwnerReportTestFixtureBatchRunner } from "./owner-report-test-fixture-batch-runner";

export type OwnerReportTestBatchManifestItem = {
  fixtureId: string;
  expectedOutputs: readonly ["urlSafety", "acquisition", "findings", "previewPackages", "exportProjection", "readinessScore", "executionReceipt"];
  mustRemainOwnerOnly: true;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  checkoutRequired: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

export type OwnerReportTestBatchManifest = {
  manifestId: string;
  mode: "owner-report-test-batch-manifest";
  fixtureCount: number;
  items: readonly OwnerReportTestBatchManifestItem[];
  readyForBackendTerminalRun: true;
  readyForCommandCenterReview: true;
  acceptedInput: "seeded-public-company-fixtures";
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  checkoutRequired: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

const EXPECTED_OUTPUTS = ["urlSafety", "acquisition", "findings", "previewPackages", "exportProjection", "readinessScore", "executionReceipt"] as const;

export const OWNER_REPORT_TEST_BATCH_MANIFEST_STANDARD = [
  "Batch manifest defines expected owner-test outputs for every seeded fixture.",
  "Batch manifest is ready for backend terminal run and Command Center review only.",
  "Batch manifest never approves customer delivery, report release, checkout, billing mutation, or entitlement mutation.",
] as const;

export function buildOwnerReportTestBatchManifest(): OwnerReportTestBatchManifest {
  const batch = buildOwnerReportTestFixtureBatchRunner();
  return {
    manifestId: `owner-report-test-batch-manifest-${batch.fixtureCount}`,
    mode: "owner-report-test-batch-manifest",
    fixtureCount: batch.fixtureCount,
    items: batch.items.map((item) => ({
      fixtureId: item.fixtureId,
      expectedOutputs: EXPECTED_OUTPUTS,
      mustRemainOwnerOnly: true,
      customerDeliveryApproved: false,
      reportReleaseApproved: false,
      checkoutRequired: false,
      billingMutationAllowed: false,
      entitlementMutationAllowed: false,
    })),
    readyForBackendTerminalRun: true,
    readyForCommandCenterReview: true,
    acceptedInput: "seeded-public-company-fixtures",
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    checkoutRequired: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  };
}
