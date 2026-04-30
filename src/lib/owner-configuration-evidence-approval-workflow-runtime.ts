import type { OwnerConfigurationEvidencePersistenceRecord } from "./owner-configuration-evidence-persistence-runtime";

export type OwnerConfigurationEvidenceApprovalDecision = "not-ready" | "owner-approved-pending-release-review" | "release-reviewed-not-launch-approved";

export type OwnerConfigurationEvidenceApprovalWorkflowInput = {
  records: readonly OwnerConfigurationEvidencePersistenceRecord[];
  ownerApprovalRecorded?: boolean;
  releaseCaptainReviewed?: boolean;
  releaseCaptainDecisionNote?: string;
  reviewedByRole?: string;
  requestIdHash?: string;
};

export type OwnerConfigurationEvidenceApprovalWorkflowProjection = {
  ok: boolean;
  decision: OwnerConfigurationEvidenceApprovalDecision;
  evidenceRecorded: boolean;
  safeSummaryAvailable: boolean;
  ownerApprovalRecorded: boolean;
  releaseCaptainReviewed: boolean;
  missingAreaKeys: readonly string[];
  pendingAreaKeys: readonly string[];
  blockedAreaKeys: readonly string[];
  approvedAreaKeys: readonly string[];
  finalValidator: "release-captain";
  launchApprovalDerivedFromEvidence: false;
  publicLaunchAllowed: false;
  paidLaunchAllowed: false;
  reportLaunchAllowed: false;
  securityReadinessApproved: false;
  reviewedByRole: string;
  releaseCaptainDecisionNote: string;
  requestIdHash: string;
};

export function projectOwnerConfigurationEvidenceApprovalWorkflow(
  input: OwnerConfigurationEvidenceApprovalWorkflowInput,
): OwnerConfigurationEvidenceApprovalWorkflowProjection {
  const records = input.records.map(sanitizeRecordForWorkflow);
  const evidenceRecorded = records.length > 0;
  const safeSummaryAvailable = records.every((record) => Boolean(record.safeSummaryHash));
  const approvedAreaKeys = records.filter((record) => record.approvalStatus === "approved").map((record) => record.areaKey);
  const pendingAreaKeys = records.filter((record) => record.approvalStatus === "pending").map((record) => record.areaKey);
  const missingAreaKeys = records.filter((record) => record.approvalStatus === "missing").map((record) => record.areaKey);
  const blockedAreaKeys = records.filter((record) => record.approvalStatus === "blocked").map((record) => record.areaKey);
  const ownerApprovalRecorded = Boolean(input.ownerApprovalRecorded && records.some((record) => record.ownerApprovalRecorded));
  const releaseCaptainReviewed = Boolean(input.releaseCaptainReviewed && records.some((record) => record.releaseCaptainReviewed));

  return {
    ok: evidenceRecorded && safeSummaryAvailable && ownerApprovalRecorded && releaseCaptainReviewed && missingAreaKeys.length === 0 && pendingAreaKeys.length === 0 && blockedAreaKeys.length === 0,
    decision: getDecision(evidenceRecorded, ownerApprovalRecorded, releaseCaptainReviewed),
    evidenceRecorded,
    safeSummaryAvailable,
    ownerApprovalRecorded,
    releaseCaptainReviewed,
    missingAreaKeys,
    pendingAreaKeys,
    blockedAreaKeys,
    approvedAreaKeys,
    finalValidator: "release-captain",
    launchApprovalDerivedFromEvidence: false,
    publicLaunchAllowed: false,
    paidLaunchAllowed: false,
    reportLaunchAllowed: false,
    securityReadinessApproved: false,
    reviewedByRole: safeRole(input.reviewedByRole),
    releaseCaptainDecisionNote: safeText(input.releaseCaptainDecisionNote ?? "Release captain review is required before any launch readiness claim."),
    requestIdHash: safeText(input.requestIdHash ?? "owner-config-approval-workflow"),
  };
}

function getDecision(
  evidenceRecorded: boolean,
  ownerApprovalRecorded: boolean,
  releaseCaptainReviewed: boolean,
): OwnerConfigurationEvidenceApprovalDecision {
  if (!evidenceRecorded || !ownerApprovalRecorded) return "not-ready";
  if (!releaseCaptainReviewed) return "owner-approved-pending-release-review";
  return "release-reviewed-not-launch-approved";
}

function sanitizeRecordForWorkflow(record: OwnerConfigurationEvidencePersistenceRecord): OwnerConfigurationEvidencePersistenceRecord {
  return {
    ...record,
    ownerApprovalRecorded: Boolean(record.ownerApprovalRecorded && record.approvalStatus === "approved"),
    releaseCaptainReviewed: Boolean(record.releaseCaptainReviewed),
    launchApprovalDerivedFromEvidence: false,
    publicLaunchAllowed: false,
    paidLaunchAllowed: false,
    reportLaunchAllowed: false,
    securityReadinessApproved: false,
    safeSummaryHash: safeText(record.safeSummaryHash),
    recordedByRole: safeRole(record.recordedByRole),
    requestIdHash: safeText(record.requestIdHash),
  };
}

function safeRole(role?: string | null) {
  const normalized = safeText(role ?? "release-captain").toLowerCase();
  if (["owner", "admin", "operator", "auditor", "release-captain"].includes(normalized)) return normalized;
  return "release-captain";
}

function safeText(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().slice(0, 240);
  if (!normalized) return "redacted-safe-empty";
  const lower = normalized.toLowerCase();
  if (["secret=", "password=", "token=", "key=", "rawpayload=", "rawevidence=", "credential="].some((fragment) => lower.includes(fragment))) return "redacted-safe-value";
  return normalized;
}
