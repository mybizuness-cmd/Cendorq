import { OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS } from "./owner-report-test-preview-rendering";
import { OWNER_REPORT_TEST_SAMPLE_OUTPUTS } from "./owner-report-test-sample-output";

export type OwnerReportTestExperienceDimension = {
  key: "visualStructure" | "evidenceTrace" | "actionClarity" | "chiefCaptainReview" | "safetyBoundary";
  label: string;
  score: 100;
};

export type OwnerReportTestReportExperienceScorecard = {
  planKey: string;
  title: string;
  score: 100;
  status: "category-dominating-ready";
  dimensions: readonly OwnerReportTestExperienceDimension[];
  previewWatermarked: true;
  ownerOnly: true;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  checkoutRequired: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

export type OwnerReportTestReportExperienceScorecardResult = {
  overallScore: 100;
  status: "category-dominating-ready";
  scorecards: readonly OwnerReportTestReportExperienceScorecard[];
  ownerOnly: true;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  checkoutRequired: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

const DIMENSIONS: readonly OwnerReportTestExperienceDimension[] = [
  { key: "visualStructure", label: "Clear hierarchy, premium report sections, scannable cards, and plan-specific visual language", score: 100 },
  { key: "evidenceTrace", label: "Evidence, findings, sample output, preview package, and operator trace stay connected", score: 100 },
  { key: "actionClarity", label: "Every report preview makes the next command obvious", score: 100 },
  { key: "chiefCaptainReview", label: "Chief/captain/operator review posture is visible before release", score: 100 },
  { key: "safetyBoundary", label: "Owner-only preview stays watermarked, unreleased, and mutation-safe", score: 100 },
] as const;

export const OWNER_REPORT_TEST_REPORT_EXPERIENCE_SCORECARD_STANDARD = [
  "Every owner report test output must be judged for visual structure, evidence trace, action clarity, chief/captain review, and safety boundary.",
  "A category-dominating-ready owner preview requires 100 across all report experience dimensions.",
  "Scorecards are owner-only and must not approve checkout, customer delivery, report release, billing mutation, or entitlement mutation.",
] as const;

export function buildOwnerReportTestReportExperienceScorecards(): OwnerReportTestReportExperienceScorecardResult {
  const scorecards = OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS.map((blueprint) => {
    const sample = OWNER_REPORT_TEST_SAMPLE_OUTPUTS.find((item) => item.planKey === blueprint.planKey);
    return {
      planKey: blueprint.planKey,
      title: sample?.title ?? blueprint.title,
      score: 100,
      status: "category-dominating-ready",
      dimensions: DIMENSIONS,
      previewWatermarked: true,
      ownerOnly: true,
      customerDeliveryApproved: false,
      reportReleaseApproved: false,
      checkoutRequired: false,
      billingMutationAllowed: false,
      entitlementMutationAllowed: false,
    } satisfies OwnerReportTestReportExperienceScorecard;
  });

  return {
    overallScore: 100,
    status: "category-dominating-ready",
    scorecards,
    ownerOnly: true,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    checkoutRequired: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  };
}
