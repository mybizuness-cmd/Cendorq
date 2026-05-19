import { getOwnerReportTestApiResponseContract } from "./owner-report-test-api-response-contract";
import { buildOwnerReportTestBatchManifest } from "./owner-report-test-batch-manifest";
import { getOwnerReportTestResultReviewContract } from "./owner-report-test-result-review-contract";
import { getOwnerReportTestTerminalRunbook } from "./owner-report-test-terminal-runbook";

export type OwnerReportTestCommandCenterHandoff = {
  handoffId: string;
  title: "Owner report test command center handoff";
  terminalRunbookReady: true;
  apiResponseContractReady: true;
  resultReviewReady: true;
  batchManifestReady: true;
  expectedOutputs: number;
  ownerOnly: true;
  checkoutRequired: false;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

export function buildOwnerReportTestCommandCenterHandoff(): OwnerReportTestCommandCenterHandoff {
  const runbook = getOwnerReportTestTerminalRunbook();
  const apiContract = getOwnerReportTestApiResponseContract();
  const review = getOwnerReportTestResultReviewContract();
  const manifest = buildOwnerReportTestBatchManifest();

  return {
    handoffId: `owner-report-test-handoff-${manifest.fixtureCount}-${apiContract.requiredTopLevelKeys.length}-${review.checks.length}`,
    title: "Owner report test command center handoff",
    terminalRunbookReady: runbook.ownerOnly,
    apiResponseContractReady: apiContract.ownerOnly,
    resultReviewReady: review.ownerOnly,
    batchManifestReady: manifest.readyForCommandCenterReview,
    expectedOutputs: runbook.expectedOutputs.length,
    ownerOnly: true,
    checkoutRequired: false,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  };
}
