import type { OwnerReportTestReadinessScore } from "./owner-report-test-readiness-score";
import type { OwnerReportTestResultExportProjection } from "./owner-report-test-result-export-contract";
import type { OwnerReportTestRunPersistenceResponse } from "./owner-report-test-run-persistence-runtime";

export type OwnerReportTestExecutionReceipt = {
  receiptId: string;
  mode: "owner-report-test";
  status: "completed" | "blocked";
  readinessScore: number;
  exportId: string;
  runRecordId: string;
  visibleToOwnerOnly: true;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  checkoutRequired: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
  rawEvidenceReturned: false;
  privateDataReturned: false;
  summary: string;
};

export function buildOwnerReportTestExecutionReceipt(input: {
  companyName: string;
  companyUrl: string;
  readinessScore: OwnerReportTestReadinessScore;
  exportProjection: OwnerReportTestResultExportProjection;
  persistence: OwnerReportTestRunPersistenceResponse;
}): OwnerReportTestExecutionReceipt {
  const runRecordId = input.persistence.records?.[0]?.runId ?? "owner-report-test-run-not-recorded";
  const exportId = input.exportProjection.exportRecord.exportId;
  const receiptId = `owner-test-receipt-${hash(`${runRecordId}:${exportId}:${input.readinessScore.score}`)}`;

  return {
    receiptId,
    mode: "owner-report-test",
    status: input.readinessScore.status === "ready" && input.exportProjection.ok && input.persistence.ok ? "completed" : "blocked",
    readinessScore: input.readinessScore.score,
    exportId,
    runRecordId,
    visibleToOwnerOnly: true,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    checkoutRequired: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    rawEvidenceReturned: false,
    privateDataReturned: false,
    summary: `${input.companyName} owner test completed for ${input.companyUrl} with ${input.readinessScore.score}% readiness.`,
  };
}

function hash(value: string) {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) result = (result * 31 + value.charCodeAt(index)) >>> 0;
  return result.toString(16).padStart(8, "0");
}
