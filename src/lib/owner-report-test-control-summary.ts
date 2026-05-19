import { OWNER_PUBLIC_PAGE_ACQUISITION_STANDARD } from "./owner-public-page-acquisition-contract";
import { OWNER_REPORT_FINDING_ENGINE_STANDARD } from "./owner-report-finding-engine-contract";
import { OWNER_REPORT_PREVIEW_PACKAGE_STANDARD } from "./owner-report-preview-package-runtime";
import { OWNER_REPORT_TERMINAL_TEST_COMMAND_STANDARD } from "./owner-report-terminal-test-command-contract";
import { OWNER_REPORT_TEST_RESULT_EXPORT_STANDARD } from "./owner-report-test-result-export-contract";

export type OwnerReportTestControlSummary = {
  title: "Owner report test control summary";
  surfaces: readonly ["command-center-ui", "backend-terminal-api", "owner-json-preview-export"];
  standardsLoaded: number;
  ownerCanRunWithoutCheckout: true;
  publicCompanyUrlOnly: true;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
  rawEvidenceReturned: false;
  privateDataReturned: false;
};

export function getOwnerReportTestControlSummary(): OwnerReportTestControlSummary {
  const standardsLoaded = [
    ...OWNER_PUBLIC_PAGE_ACQUISITION_STANDARD,
    ...OWNER_REPORT_FINDING_ENGINE_STANDARD,
    ...OWNER_REPORT_PREVIEW_PACKAGE_STANDARD,
    ...OWNER_REPORT_TERMINAL_TEST_COMMAND_STANDARD,
    ...OWNER_REPORT_TEST_RESULT_EXPORT_STANDARD,
  ].length;

  return {
    title: "Owner report test control summary",
    surfaces: ["command-center-ui", "backend-terminal-api", "owner-json-preview-export"],
    standardsLoaded,
    ownerCanRunWithoutCheckout: true,
    publicCompanyUrlOnly: true,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    rawEvidenceReturned: false,
    privateDataReturned: false,
  };
}
