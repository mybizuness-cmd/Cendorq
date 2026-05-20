import { evaluateReportQualityReleaseGate } from "./report-quality-release-gate-runtime";
import type { OwnerReportFinding } from "./owner-report-finding-engine-contract";
import type { OwnerReportTestPlanKey } from "./owner-report-test-mode-standard";
import type { OwnerReportTestSampleOutput } from "./owner-report-test-sample-output";

export type OwnerReportPreviewPackage = {
  packageId: string;
  planKey: OwnerReportTestPlanKey;
  title: string;
  watermark: "OWNER TEST MODE - NOT CUSTOMER DELIVERY";
  summary: string;
  sections: readonly {
    heading: string;
    purpose: string;
    visual: string;
    customerSafePreview: string;
    linkedFindings: readonly string[];
  }[];
  findingCount: number;
  qualityGate: ReturnType<typeof evaluateReportQualityReleaseGate>;
  nextCommand: string;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  checkoutRequired: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
  rawEvidenceReturned: false;
  privateDataReturned: false;
};

export type OwnerReportPreviewPackageRuntimeResult = {
  ok: boolean;
  status: "ready" | "blocked";
  reason: string;
  packages: readonly OwnerReportPreviewPackage[];
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  checkoutRequired: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
  rawEvidenceReturned: false;
  privateDataReturned: false;
};

export const OWNER_REPORT_PREVIEW_PACKAGE_STANDARD = [
  "Preview packages combine sample report structure, owner-test findings, quality gate status, and next command into one owner-readable object.",
  "Preview packages remain owner-test-only and must not approve customer delivery, report release, checkout, billing mutation, entitlement mutation, raw evidence return, or private data return.",
  "Every package must preserve the watermark OWNER TEST MODE - NOT CUSTOMER DELIVERY.",
  "Every package must include a quality gate result and at least one next command.",
] as const;

export function buildOwnerReportPreviewPackages(input: {
  samples: readonly OwnerReportTestSampleOutput[];
  findings: readonly OwnerReportFinding[];
}): OwnerReportPreviewPackageRuntimeResult {
  const packages = input.samples.map((sample) => buildPackage(sample, input.findings.filter((finding) => finding.planKey === sample.planKey)));
  const blockedReasons = packages.flatMap((pkg) => pkg.qualityGate.blockedReasons.map((reason) => `${pkg.planKey}:${reason}`));

  return {
    ok: packages.length > 0 && blockedReasons.length === 0,
    status: packages.length > 0 && blockedReasons.length === 0 ? "ready" : "blocked",
    reason: packages.length > 0 ? (blockedReasons.length ? "quality-gate-blocked" : "owner-report-preview-packages-ready") : "no-preview-packages",
    packages,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    checkoutRequired: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    rawEvidenceReturned: false,
    privateDataReturned: false,
  };
}

function buildPackage(sample: OwnerReportTestSampleOutput, findings: readonly OwnerReportFinding[]): OwnerReportPreviewPackage {
  const qualityGate = evaluateReportQualityReleaseGate(sample);
  const nextCommand = findings.find((finding) => finding.findingClass === "next-command")?.nextCommand ?? "Review the preview package and keep it owner-only until real release gates approve delivery.";

  return {
    packageId: `owner-preview-package-${sample.planKey}`,
    planKey: sample.planKey,
    title: sample.title,
    watermark: sample.watermark,
    summary: `${sample.title} combines ${findings.length} owner-test findings with customer-safe visual sections and release-gate posture.`,
    sections: sample.reportSections.map((section) => ({
      heading: section.heading,
      purpose: section.purpose,
      visual: section.visual,
      customerSafePreview: section.customerSafePreview,
      linkedFindings: findings.slice(0, 4).map((finding) => finding.id),
    })),
    findingCount: findings.length,
    qualityGate,
    nextCommand,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    checkoutRequired: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    rawEvidenceReturned: false,
    privateDataReturned: false,
  };
}
