import type { OwnerReportPreviewPackageRuntimeResult } from "./owner-report-preview-package-runtime";

export type OwnerReportTestResultExport = {
  exportId: string;
  format: "owner-json-preview";
  generatedFor: "owner-test-mode";
  includes: readonly ["safety", "acquisition", "findings", "previewPackages", "sampleOutputs", "qualityGate"];
  downloadableFromCustomerDashboard: false;
  emailedToCustomer: false;
  checkoutRequired: false;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
  rawEvidenceIncluded: false;
  privateDataIncluded: false;
};

export type OwnerReportTestResultExportProjection = {
  ok: boolean;
  status: "ready" | "blocked";
  reason: string;
  exportRecord: OwnerReportTestResultExport;
};

export const OWNER_REPORT_TEST_RESULT_EXPORT_STANDARD = [
  "Owner report test exports are for internal test review only.",
  "Exports may include safety, acquisition, findings, preview packages, sample outputs, and quality gate posture.",
  "Exports must not be downloadable from the customer dashboard, emailed to customers, or treated as released reports.",
  "Exports must not include raw evidence or private data.",
] as const;

export function buildOwnerReportTestResultExportProjection(input: {
  previewPackages: OwnerReportPreviewPackageRuntimeResult;
  companyName: string;
  companyUrl: string;
}): OwnerReportTestResultExportProjection {
  const exportRecord: OwnerReportTestResultExport = {
    exportId: `owner-test-export-${hash(`${input.companyName}:${input.companyUrl}:${input.previewPackages.packages.length}`)}`,
    format: "owner-json-preview",
    generatedFor: "owner-test-mode",
    includes: ["safety", "acquisition", "findings", "previewPackages", "sampleOutputs", "qualityGate"],
    downloadableFromCustomerDashboard: false,
    emailedToCustomer: false,
    checkoutRequired: false,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    rawEvidenceIncluded: false,
    privateDataIncluded: false,
  };

  return {
    ok: input.previewPackages.packages.length > 0,
    status: input.previewPackages.packages.length > 0 ? "ready" : "blocked",
    reason: input.previewPackages.packages.length > 0 ? "owner-test-export-ready" : "no-preview-packages-to-export",
    exportRecord,
  };
}

function hash(value: string) {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) result = (result * 31 + value.charCodeAt(index)) >>> 0;
  return result.toString(16).padStart(8, "0");
}
