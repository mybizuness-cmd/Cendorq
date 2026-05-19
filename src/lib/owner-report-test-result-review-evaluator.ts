import { getOwnerReportTestResultReviewContract } from "./owner-report-test-result-review-contract";

export type OwnerReportTestResultReviewEvaluation = {
  score: number;
  status: "pass" | "blocked";
  checks: readonly {
    key: string;
    label: string;
    passed: boolean;
  }[];
  ownerOnly: true;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  checkoutRequired: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
  rawEvidenceAllowed: false;
  privateDataAllowed: false;
};

export function evaluateOwnerReportTestResultReview(result: Record<string, unknown>): OwnerReportTestResultReviewEvaluation {
  const contract = getOwnerReportTestResultReviewContract();
  const checks = contract.checks.map((check) => ({
    key: check.key,
    label: check.label,
    passed: evaluateCheck(check.key, result),
  }));
  const passed = checks.filter((check) => check.passed).length;
  const score = Math.round((passed / checks.length) * 100);

  return {
    score,
    status: score >= contract.passThreshold ? "pass" : "blocked",
    checks,
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

function evaluateCheck(key: string, result: Record<string, unknown>) {
  switch (key) {
    case "urlSafety": return isRecord(result.urlSafety) && result.urlSafety.ok === true;
    case "acquisition": return isRecord(result.acquisition) && result.acquisition.ok === true;
    case "findings": return isRecord(result.findings) && Array.isArray(result.findings.findings) && result.findings.findings.length > 0;
    case "previewPackages": return isRecord(result.previewPackages) && Array.isArray(result.previewPackages.packages) && result.previewPackages.packages.length > 0;
    case "exportProjection": return isRecord(result.exportProjection) && result.exportProjection.ok === true;
    case "readinessScore": return isRecord(result.readinessScore) && result.readinessScore.score === 100;
    case "executionReceipt": return isRecord(result.executionReceipt) && typeof result.executionReceipt.receiptId === "string";
    case "mutationSafety": return mutationSafety(result);
    default: return false;
  }
}

function mutationSafety(result: Record<string, unknown>) {
  return result.customerDeliveryApproved !== true
    && result.reportReleaseApproved !== true
    && result.checkoutRequired !== true
    && result.billingMutationAllowed !== true
    && result.entitlementMutationAllowed !== true
    && !containsTrueFlag(result, ["rawEvidenceReturned", "rawEvidenceAllowed", "rawEvidenceIncluded", "privateDataReturned", "privateDataAllowed", "privateDataIncluded"]);
}

function containsTrueFlag(value: unknown, keys: readonly string[]): boolean {
  if (Array.isArray(value)) return value.some((item) => containsTrueFlag(item, keys));
  if (!isRecord(value)) return false;
  return Object.entries(value).some(([key, nested]) => keys.includes(key) && nested === true || containsTrueFlag(nested, keys));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}
