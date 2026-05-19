import type { OwnerPublicPageAcquisitionProjection } from "./owner-public-page-acquisition-contract";
import type { OwnerReportFindingEngineProjection } from "./owner-report-finding-engine-contract";
import type { OwnerReportPreviewPackageRuntimeResult } from "./owner-report-preview-package-runtime";
import type { OwnerReportTestResultExportProjection } from "./owner-report-test-result-export-contract";

export type OwnerReportTestReadinessScore = {
  score: number;
  status: "ready" | "blocked";
  checks: readonly {
    key: "acquisition" | "findings" | "previewPackages" | "exportProjection" | "mutationSafety";
    passed: boolean;
    label: string;
  }[];
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

export function buildOwnerReportTestReadinessScore(input: {
  acquisition: OwnerPublicPageAcquisitionProjection;
  findings: OwnerReportFindingEngineProjection;
  previewPackages: OwnerReportPreviewPackageRuntimeResult;
  exportProjection: OwnerReportTestResultExportProjection;
}): OwnerReportTestReadinessScore {
  const checks = [
    { key: "acquisition" as const, passed: input.acquisition.ok, label: "Public acquisition projection ready" },
    { key: "findings" as const, passed: input.findings.ok && input.findings.findings.length > 0, label: "Owner-safe findings generated" },
    { key: "previewPackages" as const, passed: input.previewPackages.packages.length > 0, label: "Preview packages assembled" },
    { key: "exportProjection" as const, passed: input.exportProjection.ok, label: "Owner export projection ready" },
    { key: "mutationSafety" as const, passed: mutationSafety(input), label: "No customer delivery, release, billing, or entitlement mutation" },
  ] as const;
  const passed = checks.filter((check) => check.passed).length;
  const score = Math.round((passed / checks.length) * 100);

  return {
    score,
    status: score === 100 ? "ready" : "blocked",
    checks,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  };
}

function mutationSafety(input: {
  findings: OwnerReportFindingEngineProjection;
  previewPackages: OwnerReportPreviewPackageRuntimeResult;
  exportProjection: OwnerReportTestResultExportProjection;
}) {
  return !input.findings.customerDeliveryApproved
    && !input.findings.reportReleaseApproved
    && !input.previewPackages.customerDeliveryApproved
    && !input.previewPackages.reportReleaseApproved
    && !input.previewPackages.billingMutationAllowed
    && !input.previewPackages.entitlementMutationAllowed
    && !input.exportProjection.exportRecord.customerDeliveryApproved
    && !input.exportProjection.exportRecord.reportReleaseApproved
    && !input.exportProjection.exportRecord.billingMutationAllowed
    && !input.exportProjection.exportRecord.entitlementMutationAllowed;
}
