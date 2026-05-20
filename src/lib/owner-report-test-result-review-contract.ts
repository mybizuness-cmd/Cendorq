export type OwnerReportTestResultReviewCheck = {
  key:
    | "urlSafety"
    | "acquisition"
    | "findings"
    | "previewPackages"
    | "exportProjection"
    | "readinessScore"
    | "executionReceipt"
    | "mutationSafety";
  label: string;
  required: true;
};

export type OwnerReportTestResultReviewContract = {
  title: "Owner report test result review contract";
  mode: "owner-result-review";
  checks: readonly OwnerReportTestResultReviewCheck[];
  passThreshold: 100;
  ownerOnly: true;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  checkoutRequired: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
  rawEvidenceAllowed: false;
  privateDataAllowed: false;
};

const CHECKS: readonly OwnerReportTestResultReviewCheck[] = [
  { key: "urlSafety", label: "URL safety result is present and safe", required: true },
  { key: "acquisition", label: "Public acquisition projection is present", required: true },
  { key: "findings", label: "Findings are present and customer-safe", required: true },
  { key: "previewPackages", label: "Preview packages exist for requested plans", required: true },
  { key: "exportProjection", label: "Owner-only export projection is present", required: true },
  { key: "readinessScore", label: "Readiness score is present and complete", required: true },
  { key: "executionReceipt", label: "Execution receipt is present", required: true },
  { key: "mutationSafety", label: "No delivery, release, checkout, billing, entitlement, raw evidence, or private data approval exists", required: true },
];

export const OWNER_REPORT_TEST_RESULT_REVIEW_STANDARD = [
  "Every owner terminal/API test result must be reviewed against the same result contract.",
  "A passing owner test result must include URL safety, acquisition, findings, preview packages, export projection, readiness score, and execution receipt.",
  "A passing owner test result must remain owner-only and must not approve customer delivery, report release, checkout, billing mutation, entitlement mutation, raw evidence, or private data.",
] as const;

export function getOwnerReportTestResultReviewContract(): OwnerReportTestResultReviewContract {
  return {
    title: "Owner report test result review contract",
    mode: "owner-result-review",
    checks: CHECKS,
    passThreshold: 100,
    ownerOnly: true,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    checkoutRequired: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    rawEvidenceAllowed: false,
    privateDataAllowed: false,
  };
}
