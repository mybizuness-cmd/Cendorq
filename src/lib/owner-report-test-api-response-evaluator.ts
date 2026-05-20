import { getOwnerReportTestApiResponseContract } from "./owner-report-test-api-response-contract";

export type OwnerReportTestApiResponseEvaluation = {
  score: number;
  status: "pass" | "blocked";
  missingTopLevelKeys: readonly string[];
  failedSafetyFlags: readonly string[];
  ownerOnly: true;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  checkoutRequired: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
  rawEvidenceAllowed: false;
  privateDataAllowed: false;
};

export function evaluateOwnerReportTestApiResponse(response: Record<string, unknown>): OwnerReportTestApiResponseEvaluation {
  const contract = getOwnerReportTestApiResponseContract();
  const missingTopLevelKeys = contract.requiredTopLevelKeys.filter((key) => !(key in response));
  const failedSafetyFlags = contract.requiredSafetyFlags.filter((key) => !safetyFlagPasses(key, response[key]));
  const totalChecks = contract.requiredTopLevelKeys.length + contract.requiredSafetyFlags.length;
  const failedChecks = missingTopLevelKeys.length + failedSafetyFlags.length;
  const score = Math.round(((totalChecks - failedChecks) / totalChecks) * 100);

  return {
    score,
    status: failedChecks === 0 ? "pass" : "blocked",
    missingTopLevelKeys,
    failedSafetyFlags,
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

function safetyFlagPasses(key: string, value: unknown) {
  if (key === "previewOnly") return value === true;
  if (key === "checkoutBypassedForOwnerTestOnly") return value === true;
  if (key === "customerDeliveryApproved") return value === false;
  if (key === "reportReleaseApproved") return value === false;
  if (key === "billingMutationAllowed") return value === false;
  if (key === "entitlementMutationAllowed") return value === false;
  return false;
}
