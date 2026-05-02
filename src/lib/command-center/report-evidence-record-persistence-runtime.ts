import {
  buildReportEvidenceRecordRuntime,
  type ReportEvidenceRecordRuntimeInput,
  type ReportEvidenceRecordRuntimeSummary,
} from "./report-evidence-record-runtime";

export type ReportEvidenceRecordPersistenceAccess = {
  commandCenterAllowed?: boolean;
  releaseCaptainReviewed?: boolean;
  recordedByRole?: string;
  sourceRoute?: string;
  requestIdHash?: string;
};

export type ReportEvidencePersistedRecordClass =
  | "source"
  | "confidence"
  | "conflict"
  | "plan-fit"
  | "blocked-pattern"
  | "release-review";

export type ReportEvidenceRecordPersistenceRecord = {
  recordId: string;
  reportId: string;
  businessId: string;
  recordClass: ReportEvidencePersistedRecordClass;
  sourceRecordCount: number;
  confidenceRecordCount: number;
  conflictRecordCount: number;
  planFitRecordCount: number;
  blockedPatternRecordCount: number;
  runtimeStatus: ReportEvidenceRecordRuntimeSummary["status"];
  safeSummaryHash: string;
  appendOnly: true;
  releaseCaptainReviewed: boolean;
  evidenceSeparationChecked: boolean;
  confidenceLabelsChecked: boolean;
  conflictsChecked: boolean;
  planFitChecked: boolean;
  blockedPatternsChecked: boolean;
  rawPrivateExposureChecked: boolean;
  rawEvidenceStored: false;
  rawProviderPayloadStored: false;
  privateCredentialStored: false;
  customerDataStored: false;
  privateAuditPayloadStored: false;
  customerFacingOutputApproved: false;
  publicReportReleaseApproved: false;
  paidPlanRecommendationApproved: false;
  recordedByRole: string;
  recordedAt: string;
  sourceRoute: string;
  requestIdHash: string;
};

export type ReportEvidenceRecordPersistenceResponse = {
  ok: boolean;
  status: number;
  cache: "no-store";
  error?: "not_available" | "not_recorded";
  runtimeSummary?: ReportEvidenceRecordRuntimeSummary;
  records?: readonly ReportEvidenceRecordPersistenceRecord[];
  appendOnly: true;
  rawEvidenceStored: false;
  rawProviderPayloadStored: false;
  privateCredentialStored: false;
  customerDataStored: false;
  privateAuditPayloadStored: false;
  customerFacingOutputApproved: false;
  publicReportReleaseApproved: false;
  paidPlanRecommendationApproved: false;
};

export function recordReportEvidenceRecordBatch(
  input: ReportEvidenceRecordRuntimeInput,
  access: ReportEvidenceRecordPersistenceAccess,
): ReportEvidenceRecordPersistenceResponse {
  if (!access.commandCenterAllowed) return deniedPersistenceResponse();
  if (!input.evidence.length) return notRecordedResponse();

  const runtimeSummary = buildReportEvidenceRecordRuntime(input);
  const records = makePersistenceRecords(runtimeSummary, access);

  return {
    ok: true,
    status: 202,
    cache: "no-store",
    runtimeSummary,
    records,
    appendOnly: true,
    rawEvidenceStored: false,
    rawProviderPayloadStored: false,
    privateCredentialStored: false,
    customerDataStored: false,
    privateAuditPayloadStored: false,
    customerFacingOutputApproved: false,
    publicReportReleaseApproved: false,
    paidPlanRecommendationApproved: false,
  };
}

export function getReportEvidenceRecordHistoryResponse(
  access: ReportEvidenceRecordPersistenceAccess,
  history: readonly ReportEvidenceRecordPersistenceRecord[],
): ReportEvidenceRecordPersistenceResponse {
  if (!access.commandCenterAllowed) return deniedPersistenceResponse();

  return {
    ok: true,
    status: 200,
    cache: "no-store",
    records: history.map(sanitizePersistenceRecord),
    appendOnly: true,
    rawEvidenceStored: false,
    rawProviderPayloadStored: false,
    privateCredentialStored: false,
    customerDataStored: false,
    privateAuditPayloadStored: false,
    customerFacingOutputApproved: false,
    publicReportReleaseApproved: false,
    paidPlanRecommendationApproved: false,
  };
}

function makePersistenceRecords(
  runtimeSummary: ReportEvidenceRecordRuntimeSummary,
  access: ReportEvidenceRecordPersistenceAccess,
): readonly ReportEvidenceRecordPersistenceRecord[] {
  const counts = recordCounts(runtimeSummary);
  const releaseReview = runtimeSummary.releaseReviewRecord;
  const safeSummarySeed = [
    runtimeSummary.reportId,
    runtimeSummary.businessId,
    runtimeSummary.status,
    counts.sourceRecordCount,
    counts.confidenceRecordCount,
    counts.conflictRecordCount,
    counts.planFitRecordCount,
    counts.blockedPatternRecordCount,
    access.requestIdHash ?? "missing-request-id-hash",
  ].join(":");

  const shared = {
    reportId: safeToken(runtimeSummary.reportId),
    businessId: safeToken(runtimeSummary.businessId),
    sourceRecordCount: counts.sourceRecordCount,
    confidenceRecordCount: counts.confidenceRecordCount,
    conflictRecordCount: counts.conflictRecordCount,
    planFitRecordCount: counts.planFitRecordCount,
    blockedPatternRecordCount: counts.blockedPatternRecordCount,
    runtimeStatus: runtimeSummary.status,
    safeSummaryHash: stableHash(safeSummarySeed),
    appendOnly: true,
    releaseCaptainReviewed: Boolean(access.releaseCaptainReviewed && releaseReview.reviewedByRole === "release-captain" && runtimeSummary.status === "reviewed"),
    evidenceSeparationChecked: Boolean(releaseReview.evidenceSeparationChecked),
    confidenceLabelsChecked: Boolean(releaseReview.confidenceLabelsChecked),
    conflictsChecked: Boolean(releaseReview.conflictsChecked),
    planFitChecked: Boolean(releaseReview.planFitChecked),
    blockedPatternsChecked: Boolean(releaseReview.blockedPatternsChecked),
    rawPrivateExposureChecked: Boolean(releaseReview.rawPrivateExposureChecked),
    rawEvidenceStored: false,
    rawProviderPayloadStored: false,
    privateCredentialStored: false,
    customerDataStored: false,
    privateAuditPayloadStored: false,
    customerFacingOutputApproved: false,
    publicReportReleaseApproved: false,
    paidPlanRecommendationApproved: false,
    recordedByRole: safeRole(access.recordedByRole),
    recordedAt: new Date(0).toISOString(),
    sourceRoute: safeRoute(access.sourceRoute),
    requestIdHash: safeText(access.requestIdHash ?? "missing-request-id-hash"),
  } as const;

  return ([
    { ...shared, recordClass: "source", recordId: recordId(runtimeSummary, "source", safeSummarySeed) },
    { ...shared, recordClass: "confidence", recordId: recordId(runtimeSummary, "confidence", safeSummarySeed) },
    { ...shared, recordClass: "conflict", recordId: recordId(runtimeSummary, "conflict", safeSummarySeed) },
    { ...shared, recordClass: "plan-fit", recordId: recordId(runtimeSummary, "plan-fit", safeSummarySeed) },
    { ...shared, recordClass: "blocked-pattern", recordId: recordId(runtimeSummary, "blocked-pattern", safeSummarySeed) },
    { ...shared, recordClass: "release-review", recordId: recordId(runtimeSummary, "release-review", safeSummarySeed) },
  ] satisfies readonly ReportEvidenceRecordPersistenceRecord[]).map(sanitizePersistenceRecord);
}

function recordCounts(runtimeSummary: ReportEvidenceRecordRuntimeSummary) {
  return {
    sourceRecordCount: runtimeSummary.sourceRecords.length,
    confidenceRecordCount: runtimeSummary.confidenceRecords.length,
    conflictRecordCount: runtimeSummary.conflictRecords.length,
    planFitRecordCount: runtimeSummary.planFitRecords.length,
    blockedPatternRecordCount: runtimeSummary.blockedPatternRecords.length,
  } as const;
}

function recordId(runtimeSummary: ReportEvidenceRecordRuntimeSummary, recordClass: ReportEvidencePersistedRecordClass, seed: string) {
  return `report-evidence-persistence-${recordClass}-${stableHash(`${runtimeSummary.reportId}:${runtimeSummary.businessId}:${recordClass}:${seed}`)}`;
}

function deniedPersistenceResponse(): ReportEvidenceRecordPersistenceResponse {
  return {
    ok: false,
    status: 404,
    cache: "no-store",
    error: "not_available",
    appendOnly: true,
    rawEvidenceStored: false,
    rawProviderPayloadStored: false,
    privateCredentialStored: false,
    customerDataStored: false,
    privateAuditPayloadStored: false,
    customerFacingOutputApproved: false,
    publicReportReleaseApproved: false,
    paidPlanRecommendationApproved: false,
  };
}

function notRecordedResponse(): ReportEvidenceRecordPersistenceResponse {
  return {
    ok: false,
    status: 400,
    cache: "no-store",
    error: "not_recorded",
    appendOnly: true,
    rawEvidenceStored: false,
    rawProviderPayloadStored: false,
    privateCredentialStored: false,
    customerDataStored: false,
    privateAuditPayloadStored: false,
    customerFacingOutputApproved: false,
    publicReportReleaseApproved: false,
    paidPlanRecommendationApproved: false,
  };
}

function sanitizePersistenceRecord(record: ReportEvidenceRecordPersistenceRecord): ReportEvidenceRecordPersistenceRecord {
  return {
    recordId: safeText(record.recordId),
    reportId: safeToken(record.reportId),
    businessId: safeToken(record.businessId),
    recordClass: record.recordClass,
    sourceRecordCount: safeCount(record.sourceRecordCount),
    confidenceRecordCount: safeCount(record.confidenceRecordCount),
    conflictRecordCount: safeCount(record.conflictRecordCount),
    planFitRecordCount: safeCount(record.planFitRecordCount),
    blockedPatternRecordCount: safeCount(record.blockedPatternRecordCount),
    runtimeStatus: record.runtimeStatus,
    safeSummaryHash: safeText(record.safeSummaryHash),
    appendOnly: true,
    releaseCaptainReviewed: Boolean(record.releaseCaptainReviewed && record.runtimeStatus === "reviewed"),
    evidenceSeparationChecked: Boolean(record.evidenceSeparationChecked),
    confidenceLabelsChecked: Boolean(record.confidenceLabelsChecked),
    conflictsChecked: Boolean(record.conflictsChecked),
    planFitChecked: Boolean(record.planFitChecked),
    blockedPatternsChecked: Boolean(record.blockedPatternsChecked),
    rawPrivateExposureChecked: Boolean(record.rawPrivateExposureChecked),
    rawEvidenceStored: false,
    rawProviderPayloadStored: false,
    privateCredentialStored: false,
    customerDataStored: false,
    privateAuditPayloadStored: false,
    customerFacingOutputApproved: false,
    publicReportReleaseApproved: false,
    paidPlanRecommendationApproved: false,
    recordedByRole: safeRole(record.recordedByRole),
    recordedAt: safeText(record.recordedAt),
    sourceRoute: safeRoute(record.sourceRoute),
    requestIdHash: safeText(record.requestIdHash),
  };
}

function safeRole(role?: string | null) {
  const normalized = safeText(role ?? "operator").toLowerCase();
  if (["owner", "admin", "operator", "auditor", "release-captain", "chief-report-truth-agent"].includes(normalized)) return normalized;
  return "operator";
}

function safeRoute(route?: string | null) {
  const normalized = safeText(route ?? "/api/command-center/report-evidence/orchestration");
  if (normalized.startsWith("/api/command-center/")) return normalized;
  return "/api/command-center/report-evidence/orchestration";
}

function safeCount(value: number) {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.floor(value);
}

function safeText(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().slice(0, 240);
  if (!normalized) return "redacted-safe-empty";
  const lower = normalized.toLowerCase();
  if (
    [
      "secret=",
      "password=",
      "token=",
      "key=",
      "rawpayload=",
      "rawevidence=",
      "credential=",
      "privateauditpayload=",
      "customerdata=",
      "providerpayload=",
      "operatoridentity=",
    ].some((fragment) => lower.includes(fragment))
  ) {
    return "redacted-safe-value";
  }
  return normalized;
}

function safeToken(value: string) {
  return safeText(value).replace(/[^a-zA-Z0-9._:-]/g, "-").slice(0, 96) || "report-evidence-persistence";
}

function stableHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}
