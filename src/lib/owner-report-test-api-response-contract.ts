export type OwnerReportTestApiResponseContract = {
  title: "Owner report test API response contract";
  route: "/api/command-center/owner-report-test-mode";
  method: "POST";
  requiredTopLevelKeys: readonly [
    "urlSafety",
    "acquisition",
    "findings",
    "previewPackages",
    "exportProjection",
    "readinessScore",
    "executionReceipt",
    "resultReview",
    "persistence",
    "sampleOutputs",
    "previewBlueprints"
  ];
  requiredSafetyFlags: readonly [
    "previewOnly",
    "checkoutBypassedForOwnerTestOnly",
    "customerDeliveryApproved",
    "reportReleaseApproved",
    "billingMutationAllowed",
    "entitlementMutationAllowed"
  ];
  ownerOnly: true;
  publicCompanyUrlOnly: true;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  checkoutRequired: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
  rawEvidenceAllowed: false;
  privateDataAllowed: false;
};

export const OWNER_REPORT_TEST_API_RESPONSE_CONTRACT_STANDARD = [
  "Owner report test POST response must have a stable shape for backend-terminal and Command Center review.",
  "Required top-level response keys include safety, acquisition, findings, preview packages, export projection, readiness score, execution receipt, result review, persistence, sample outputs, and preview blueprints.",
  "Required safety flags must show preview-only, owner-test checkout bypass, no customer delivery, no report release, no billing mutation, and no entitlement mutation.",
  "The API response contract is owner-only and public-company-URL-only.",
] as const;

export function getOwnerReportTestApiResponseContract(): OwnerReportTestApiResponseContract {
  return {
    title: "Owner report test API response contract",
    route: "/api/command-center/owner-report-test-mode",
    method: "POST",
    requiredTopLevelKeys: [
      "urlSafety",
      "acquisition",
      "findings",
      "previewPackages",
      "exportProjection",
      "readinessScore",
      "executionReceipt",
      "resultReview",
      "persistence",
      "sampleOutputs",
      "previewBlueprints",
    ],
    requiredSafetyFlags: [
      "previewOnly",
      "checkoutBypassedForOwnerTestOnly",
      "customerDeliveryApproved",
      "reportReleaseApproved",
      "billingMutationAllowed",
      "entitlementMutationAllowed",
    ],
    ownerOnly: true,
    publicCompanyUrlOnly: true,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    checkoutRequired: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    rawEvidenceAllowed: false,
    privateDataAllowed: false,
  };
}
