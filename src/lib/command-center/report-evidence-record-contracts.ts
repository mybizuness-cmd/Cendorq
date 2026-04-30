import type {
  ReportEvidencePlanFit,
  ReportEvidenceSourceTier,
  ReportEvidenceTrustLevel,
} from "./report-evidence-orchestration";

export type ReportEvidenceRecordStatus = "draft" | "pending-release-captain-review" | "reviewed" | "blocked" | "archived";
export type ReportEvidenceRetentionClass = "short-review-window" | "customer-contract" | "audit-defense" | "legal-hold" | "delete-requested";
export type ReportEvidenceReviewRole = "operator" | "chief-report-truth-agent" | "release-captain";

export type ReportEvidenceSourceRecordContract = {
  recordType: "report-evidence-source";
  evidenceId: string;
  reportId: string;
  businessId: string;
  sourceTier: ReportEvidenceSourceTier;
  sourceLabel: string;
  safeSummary: string;
  capturedAt: string;
  freshnessLabel: "fresh" | "recent" | "stale" | "unknown";
  retentionClass: ReportEvidenceRetentionClass;
  rawEvidenceStored: false;
  rawProviderPayloadStored: false;
  privateCredentialStored: false;
  customerDataStored: false;
  publicOutputAllowed: false;
};

export type ReportEvidenceConfidenceRecordContract = {
  recordType: "report-evidence-confidence";
  confidenceId: string;
  evidenceId: string;
  reportId: string;
  trustLevel: ReportEvidenceTrustLevel;
  confidenceReason: string;
  limitationsVisible: boolean;
  safeNextActionVisible: boolean;
  customerClaimPresent: boolean;
  customerClaimSupported: boolean;
  confidenceRaisedByReviewOnly: boolean;
};

export type ReportEvidenceConflictRecordContract = {
  recordType: "report-evidence-conflict";
  conflictId: string;
  reportId: string;
  evidenceIds: readonly string[];
  conflictSummary: string;
  conflictStatus: "unresolved" | "disclosed" | "resolved" | "blocked";
  confidenceDowngraded: boolean;
  resolutionPath: string;
  customerFacingLanguageAllowed: false;
};

export type ReportEvidencePlanFitRecordContract = {
  recordType: "report-evidence-plan-fit";
  planFitId: string;
  reportId: string;
  evidenceIds: readonly string[];
  planFit: ReportEvidencePlanFit;
  blockerDepth: "early-signal" | "diagnostic-needed" | "implementation-ready" | "monitoring-needed";
  planFitEvidencePresent: boolean;
  recommendationSummary: string;
  unsupportedUpsellBlocked: boolean;
  paidRecommendationApproved: false;
};

export type ReportEvidenceBlockedPatternRecordContract = {
  recordType: "report-evidence-blocked-pattern";
  blockedPatternId: string;
  reportId: string;
  evidenceIds: readonly string[];
  patternKey: string;
  blockedReason: string;
  customerFacingOutputBlocked: true;
  releaseCaptainReviewRequired: true;
};

export type ReportEvidenceReleaseReviewRecordContract = {
  recordType: "report-evidence-release-review";
  reviewId: string;
  reportId: string;
  businessId: string;
  reviewedByRole: ReportEvidenceReviewRole;
  status: ReportEvidenceRecordStatus;
  evidenceSeparationChecked: boolean;
  confidenceLabelsChecked: boolean;
  conflictsChecked: boolean;
  planFitChecked: boolean;
  blockedPatternsChecked: boolean;
  rawPrivateExposureChecked: boolean;
  customerFacingOutputApproved: false;
  publicReportReleaseApproved: false;
  paidPlanRecommendationApproved: false;
  reviewedAt?: string;
};

export const REPORT_EVIDENCE_RECORD_CONTRACTS = [
  "report-evidence-source",
  "report-evidence-confidence",
  "report-evidence-conflict",
  "report-evidence-plan-fit",
  "report-evidence-blocked-pattern",
  "report-evidence-release-review",
] as const;

export const REPORT_EVIDENCE_RECORD_REQUIRED_GUARDS = [
  "no raw evidence in report evidence records",
  "no provider payloads in report evidence records",
  "no private credentials in report evidence records",
  "no customer data copied into safe summaries",
  "no customer claim upgraded without support",
  "no conflict hidden from confidence scoring",
  "no plan recommendation without evidence posture",
  "no paid recommendation approval inside evidence records",
  "no customer-facing output approval inside evidence records",
  "release-captain review remains separate from launch approval",
] as const;

export function getReportEvidenceRecordContracts() {
  return {
    recordContracts: REPORT_EVIDENCE_RECORD_CONTRACTS,
    requiredGuards: REPORT_EVIDENCE_RECORD_REQUIRED_GUARDS,
  };
}
