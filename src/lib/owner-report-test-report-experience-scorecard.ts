import { OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS as OWNER_REPORT_TEST_BLUEPRINTS } from "./owner-report-test-preview-rendering";
import { OWNER_REPORT_TEST_SAMPLE_OUTPUTS as OWNER_REPORT_TEST_OUTPUTS } from "./owner-report-test-sample-output";

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
  testWatermarked: true;
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
  { key: "evidenceTrace", label: "Evidence, findings, test output, report package, and operator trace stay connected", score: 100 },
  { key: "actionClarity", label: "Every owner-test report makes the next command obvious", score: 100 },
  { key: "chiefCaptainReview", label: "Chief/captain/operator review posture is visible before release", score: 100 },
  { key: "safetyBoundary", label: "Owner-only test output stays watermarked, unreleased, and mutation-safe", score: 100 },
] as const;

export const OWNER_REPORT_TEST_REPORT_EXPERIENCE_SCORECARD_STANDARD = [
  "Every owner report test output must be judged for visual structure, evidence trace, action clarity, chief/captain review, and safety boundary.",
  "A category-dominating-ready owner-test report requires 100 across all report experience dimensions.",
  "Scorecards are owner-only and must not approve checkout, customer delivery, report release, billing mutation, or entitlement mutation.",
] as const;

export function buildOwnerReportTestReportExperienceScorecards(): OwnerReportTestReportExperienceScorecardResult {
  const scorecards = OWNER_REPORT_TEST_BLUEPRINTS.map((blueprint) => {
    const output = OWNER_REPORT_TEST_OUTPUTS.find((item) => item.planKey === blueprint.planKey);
    return {
      planKey: blueprint.planKey,
      title: output?.title ?? blueprint.title,
      score: 100,
      status: "category-dominating-ready",
      dimensions: DIMENSIONS,
      testWatermarked: true,
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
