export type AuditRecordStatus = "draft" | "pending-review" | "approved" | "delivered" | "corrected" | "archived" | "blocked";
export type EvidenceRetentionClass = "short-review-window" | "customer-contract" | "audit-defense" | "legal-hold" | "delete-requested";
export type ReportClaimType = "score" | "diagnosis" | "comparison" | "recommendation" | "guarantee" | "marketing" | "pricing" | "footer";
export type ReportPlanStage = "free-scan" | "full-diagnosis" | "optimization" | "monthly-control";
export type ConfidenceLabel = "verified" | "strong" | "moderate" | "weak" | "unknown";

export type BusinessIdentityRecordContract = {
  recordType: "business-identity";
  businessId: string;
  resolvedName: string;
  submittedName?: string;
  canonicalWebsite?: string;
  submittedWebsite?: string;
  address?: string;
  country?: string;
  locale?: string;
  language?: string;
  identityConfidence: ConfidenceLabel;
  ambiguityNotes?: string;
  createdAt: string;
  updatedAt: string;
};

export type EvidenceRecordContract = {
  recordType: "evidence";
  evidenceId: string;
  businessId: string;
  sourceClass: "customer-provided" | "business-website" | "public-search-result" | "business-profile" | "directory-listing" | "review-platform" | "social-profile" | "technical-scan" | "calculated-metric" | "operator-reviewed";
  sourceLabel: string;
  capturedAt: string;
  sourceUrlHash?: string;
  evidenceSummary: string;
  confidence: ConfidenceLabel;
  retentionClass: EvidenceRetentionClass;
  rawSecretStored: false;
  publicOutputAllowed: false;
};

export type ReportCalculationRecordContract = {
  recordType: "report-calculation";
  calculationId: string;
  reportId: string;
  metricKey: string;
  formulaVersion: string;
  inputs: readonly string[];
  evidenceIds: readonly string[];
  outputLabel: string;
  roundedValue?: string;
  confidence: ConfidenceLabel;
  explanation: string;
};

export type ReportClaimRecordContract = {
  recordType: "report-claim";
  claimId: string;
  reportId: string;
  claimType: ReportClaimType;
  claimText: string;
  evidenceIds: readonly string[];
  calculationIds: readonly string[];
  methodologyVersion: string;
  confidence: ConfidenceLabel;
  approvedLanguageVersion?: string;
  legalReviewRequired: boolean;
  blockedOutcomeGuaranteeScan: "passed" | "failed" | "not-required";
};

export type CustomerConsentScopeRecordContract = {
  recordType: "customer-consent-scope";
  customerId: string;
  businessId: string;
  authorizedContact: string;
  termsVersion: string;
  privacyVersion: string;
  guaranteeWordingVersion: string;
  acceptedAt: string;
  planStage: ReportPlanStage;
  permittedDataUseScope: readonly string[];
  customerProvidedSnapshotId: string;
};

export type ReportReleaseApprovalRecordContract = {
  recordType: "report-release-approval";
  approvalId: string;
  reportId: string;
  businessId: string;
  planStage: ReportPlanStage;
  status: AuditRecordStatus;
  evidenceSufficiency: "pass" | "limited" | "fail";
  calculationTraceStatus: "pass" | "fail";
  confidenceLabelsPresent: boolean;
  footerSafeguardsPresent: boolean;
  businessLogoStatus: "matched" | "unavailable" | "blocked" | "not-required";
  blockedClaimScan: "passed" | "failed";
  approver: string;
  approvedAt?: string;
  deliveredAt?: string;
};

export type MaterialErrorCorrectionRecordContract = {
  recordType: "material-error-correction";
  correctionId: string;
  reportId: string;
  customerId: string;
  reportedAt: string;
  reviewWindowStatus: "inside-window" | "outside-window" | "unknown";
  issueSummary: string;
  evidenceReviewResult: string;
  correctionDecision: "corrected" | "no-material-error" | "needs-legal-review" | "blocked";
  correctedReportVersion?: string;
  customerCommunicationId?: string;
  owner: string;
  closedAt?: string;
};

export type DisputeReadinessPackageContract = {
  recordType: "dispute-readiness-package";
  packageId: string;
  customerId: string;
  businessId: string;
  reportIds: readonly string[];
  consentScopeRecordId: string;
  termsVersion: string;
  privacyVersion: string;
  evidenceIds: readonly string[];
  calculationIds: readonly string[];
  claimIds: readonly string[];
  approvalIds: readonly string[];
  correctionIds: readonly string[];
  deliveryRecordIds: readonly string[];
  paymentMetadataIds: readonly string[];
  privacySafeExportOnly: true;
};

export const AUDIT_REPORT_RECORD_CONTRACTS = [
  "business-identity",
  "evidence",
  "report-calculation",
  "report-claim",
  "customer-consent-scope",
  "report-release-approval",
  "material-error-correction",
  "dispute-readiness-package",
] as const;

export const AUDIT_REPORT_RECORD_REQUIRED_GUARDS = [
  "no raw secrets in public output",
  "no customer-facing claim without substantiation",
  "no paid report delivery without approval record",
  "no score without calculation trace",
  "no correction without preserved correction history",
  "no dispute package without consent, terms, evidence, approvals, delivery, and correction metadata",
  "no social or platform revenue claim without evidence record",
  "no business logo use without identity-safe match status",
] as const;

export function getAuditReportRecordContracts() {
  return {
    recordContracts: AUDIT_REPORT_RECORD_CONTRACTS,
    requiredGuards: AUDIT_REPORT_RECORD_REQUIRED_GUARDS,
  };
}
