import type {
  ReportEvidenceBlockedPatternRecordContract,
  ReportEvidenceConfidenceRecordContract,
  ReportEvidenceConflictRecordContract,
  ReportEvidencePlanFitRecordContract,
  ReportEvidenceRecordStatus,
  ReportEvidenceReleaseReviewRecordContract,
  ReportEvidenceRetentionClass,
  ReportEvidenceReviewRole,
  ReportEvidenceSourceRecordContract,
} from "./report-evidence-record-contracts";
import {
  projectReportEvidenceRuntime,
  type ReportEvidenceRuntimeInput,
  type ReportEvidenceRuntimeProjection,
} from "./report-evidence-orchestration-runtime";

export type ReportEvidenceRecordRuntimeInput = {
  reportId: string;
  businessId: string;
  evidence: readonly ReportEvidenceRuntimeInput[];
  capturedAt?: string;
  retentionClass?: ReportEvidenceRetentionClass;
  reviewedByRole?: ReportEvidenceReviewRole;
};

export type ReportEvidenceRecordRuntimeSummary = {
  reportId: string;
  businessId: string;
  status: ReportEvidenceRecordStatus;
  sourceRecords: readonly ReportEvidenceSourceRecordContract[];
  confidenceRecords: readonly ReportEvidenceConfidenceRecordContract[];
  conflictRecords: readonly ReportEvidenceConflictRecordContract[];
  planFitRecords: readonly ReportEvidencePlanFitRecordContract[];
  blockedPatternRecords: readonly ReportEvidenceBlockedPatternRecordContract[];
  releaseReviewRecord: ReportEvidenceReleaseReviewRecordContract;
  rawEvidenceStored: false;
  customerFacingOutputApproved: false;
  publicReportReleaseApproved: false;
  paidPlanRecommendationApproved: false;
};

export function buildReportEvidenceRecordRuntime(input: ReportEvidenceRecordRuntimeInput): ReportEvidenceRecordRuntimeSummary {
  const capturedAt = safeTimestamp(input.capturedAt);
  const retentionClass = input.retentionClass ?? "audit-defense";
  const runtimeSummary = projectReportEvidenceRuntime(input.evidence);
  const sourceRecords = runtimeSummary.projections.map((projection) => buildSourceRecord(input, projection, capturedAt, retentionClass));
  const confidenceRecords = runtimeSummary.projections.map((projection) => buildConfidenceRecord(input, projection));
  const conflictRecords = runtimeSummary.projections
    .filter((projection) => projection.trustLevel === "conflicted" || projection.blockedPatterns.includes("ignoredEvidenceConflict"))
    .map((projection) => buildConflictRecord(input, projection));
  const planFitRecords = runtimeSummary.projections.filter((projection) => projection.planFit).map((projection) => buildPlanFitRecord(input, projection));
  const blockedPatternRecords = runtimeSummary.projections.flatMap((projection) => buildBlockedPatternRecords(input, projection));
  const status: ReportEvidenceRecordStatus = blockedPatternRecords.length ? "blocked" : runtimeSummary.releaseCaptainRequired ? "pending-release-captain-review" : "reviewed";

  return {
    reportId: safeToken(input.reportId),
    businessId: safeToken(input.businessId),
    status,
    sourceRecords,
    confidenceRecords,
    conflictRecords,
    planFitRecords,
    blockedPatternRecords,
    releaseReviewRecord: buildReleaseReviewRecord(input, status, runtimeSummary.releaseCaptainRequired, blockedPatternRecords.length > 0),
    rawEvidenceStored: false,
    customerFacingOutputApproved: false,
    publicReportReleaseApproved: false,
    paidPlanRecommendationApproved: false,
  };
}

function buildSourceRecord(
  input: ReportEvidenceRecordRuntimeInput,
  projection: ReportEvidenceRuntimeProjection,
  capturedAt: string,
  retentionClass: ReportEvidenceRetentionClass,
): ReportEvidenceSourceRecordContract {
  return {
    recordType: "report-evidence-source",
    evidenceId: evidenceId(input.reportId, projection.evidenceKey),
    reportId: safeToken(input.reportId),
    businessId: safeToken(input.businessId),
    sourceTier: projection.sourceTier,
    sourceLabel: projection.sourceLabel,
    safeSummary: safeRecordSummary(projection.safeSummary),
    capturedAt,
    freshnessLabel: "unknown",
    retentionClass,
    rawEvidenceStored: false,
    rawProviderPayloadStored: false,
    privateCredentialStored: false,
    customerDataStored: false,
    publicOutputAllowed: false,
  };
}

function buildConfidenceRecord(input: ReportEvidenceRecordRuntimeInput, projection: ReportEvidenceRuntimeProjection): ReportEvidenceConfidenceRecordContract {
  return {
    recordType: "report-evidence-confidence",
    confidenceId: `${evidenceId(input.reportId, projection.evidenceKey)}:confidence`,
    evidenceId: evidenceId(input.reportId, projection.evidenceKey),
    reportId: safeToken(input.reportId),
    trustLevel: projection.trustLevel,
    confidenceReason: safeRecordSummary(projection.safeNextActions[0] ?? "Confidence remains evidence-scoped until release-captain review."),
    limitationsVisible: projection.trustLevel === "limited" || projection.trustLevel === "missing" || projection.trustLevel === "conflicted" || projection.customerOutputState !== "allowed",
    safeNextActionVisible: projection.safeNextActions.length > 0,
    customerClaimPresent: projection.blockedPatterns.includes("customerClaimAsVerifiedFact"),
    customerClaimSupported: !projection.blockedPatterns.includes("customerClaimAsVerifiedFact"),
    confidenceRaisedByReviewOnly: projection.trustLevel === "verified" || projection.trustLevel === "strong",
  };
}

function buildConflictRecord(input: ReportEvidenceRecordRuntimeInput, projection: ReportEvidenceRuntimeProjection): ReportEvidenceConflictRecordContract {
  return {
    recordType: "report-evidence-conflict",
    conflictId: `${evidenceId(input.reportId, projection.evidenceKey)}:conflict`,
    reportId: safeToken(input.reportId),
    evidenceIds: [evidenceId(input.reportId, projection.evidenceKey)],
    conflictSummary: safeRecordSummary("Evidence conflict must be resolved or disclosed before stronger confidence or customer-facing output."),
    conflictStatus: projection.customerOutputState === "blocked" ? "blocked" : "unresolved",
    confidenceDowngraded: true,
    resolutionPath: safeRecordSummary("Route evidence back through release-captain review before final report language."),
    customerFacingLanguageAllowed: false,
  };
}

function buildPlanFitRecord(input: ReportEvidenceRecordRuntimeInput, projection: ReportEvidenceRuntimeProjection): ReportEvidencePlanFitRecordContract {
  const unsupportedUpsellBlocked = projection.blockedPatterns.includes("unsupportedPlanRecommendation") || projection.blockedPatterns.includes("fixWithoutDiagnosis");

  return {
    recordType: "report-evidence-plan-fit",
    planFitId: `${evidenceId(input.reportId, projection.evidenceKey)}:plan-fit`,
    reportId: safeToken(input.reportId),
    evidenceIds: [evidenceId(input.reportId, projection.evidenceKey)],
    planFit: projection.planFit ?? "free-scan",
    blockerDepth: blockerDepthForPlanFit(projection.planFit),
    planFitEvidencePresent: !unsupportedUpsellBlocked,
    recommendationSummary: safeRecordSummary(projection.safeNextActions.find((action) => action.includes("plan")) ?? "Plan-fit recommendation remains evidence-scoped and review-gated."),
    unsupportedUpsellBlocked,
    paidRecommendationApproved: false,
  };
}

function buildBlockedPatternRecords(input: ReportEvidenceRecordRuntimeInput, projection: ReportEvidenceRuntimeProjection): ReportEvidenceBlockedPatternRecordContract[] {
  return projection.blockedPatterns.map((patternKey) => ({
    recordType: "report-evidence-blocked-pattern",
    blockedPatternId: `${evidenceId(input.reportId, projection.evidenceKey)}:${safeToken(patternKey)}`,
    reportId: safeToken(input.reportId),
    evidenceIds: [evidenceId(input.reportId, projection.evidenceKey)],
    patternKey,
    blockedReason: safeRecordSummary(`Blocked pattern ${patternKey} requires release-captain review before customer-facing output.`),
    customerFacingOutputBlocked: true,
    releaseCaptainReviewRequired: true,
  }));
}

function buildReleaseReviewRecord(
  input: ReportEvidenceRecordRuntimeInput,
  status: ReportEvidenceRecordStatus,
  releaseCaptainRequired: boolean,
  hasBlockedPatterns: boolean,
): ReportEvidenceReleaseReviewRecordContract {
  const reviewedByRole = input.reviewedByRole ?? "release-captain";

  return {
    recordType: "report-evidence-release-review",
    reviewId: `${safeToken(input.reportId)}:release-review`,
    reportId: safeToken(input.reportId),
    businessId: safeToken(input.businessId),
    reviewedByRole,
    status,
    evidenceSeparationChecked: true,
    confidenceLabelsChecked: true,
    conflictsChecked: true,
    planFitChecked: true,
    blockedPatternsChecked: true,
    rawPrivateExposureChecked: true,
    customerFacingOutputApproved: false,
    publicReportReleaseApproved: false,
    paidPlanRecommendationApproved: false,
    reviewedAt: releaseCaptainRequired || hasBlockedPatterns ? undefined : safeTimestamp(input.capturedAt),
  };
}

function blockerDepthForPlanFit(planFit: ReportEvidenceRuntimeProjection["planFit"]): ReportEvidencePlanFitRecordContract["blockerDepth"] {
  if (planFit === "build-fix") return "implementation-ready";
  if (planFit === "ongoing-control") return "monitoring-needed";
  if (planFit === "deep-review") return "diagnostic-needed";
  return "early-signal";
}

function evidenceId(reportId: string, evidenceKey: string) {
  return `${safeToken(reportId)}:${safeToken(evidenceKey)}`;
}

function safeTimestamp(value: string | undefined) {
  const parsed = value ? new Date(value) : new Date("2026-01-01T00:00:00.000Z");
  if (Number.isNaN(parsed.getTime())) return "2026-01-01T00:00:00.000Z";
  return parsed.toISOString();
}

function safeRecordSummary(value: string) {
  return value
    .replace(/raw|payload|secret|token|password|credential|private key|customer data|provider payload|internal note|operator identity/gi, "redacted-safe-record")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 420);
}

function safeToken(value: string) {
  return value.replace(/[^a-zA-Z0-9._:-]/g, "-").slice(0, 96) || "report-evidence-record";
}
