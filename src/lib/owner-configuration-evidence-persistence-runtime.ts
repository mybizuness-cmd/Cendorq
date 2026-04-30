import {
  summarizeOwnerConfigurationEvidence,
  type OwnerConfigurationEvidenceInput,
  type OwnerConfigurationEvidenceProjection,
  type OwnerConfigurationEvidenceSummary,
} from "./owner-configuration-evidence-runtime";

export type OwnerConfigurationEvidencePersistenceAccess = {
  commandCenterAllowed?: boolean;
  ownerApprovalRecorded?: boolean;
  releaseCaptainReviewed?: boolean;
  recordedByRole?: string;
  requestIdHash?: string;
};

export type OwnerConfigurationEvidencePersistenceRecord = {
  recordId: string;
  projectionEvidenceId: string;
  areaKey: OwnerConfigurationEvidenceProjection["areaKey"];
  approvalStatus: OwnerConfigurationEvidenceProjection["approvalStatus"];
  complete: boolean;
  safeSummaryHash: string;
  ownerApprovalRecorded: boolean;
  releaseCaptainReviewed: boolean;
  launchApprovalDerivedFromEvidence: false;
  publicLaunchAllowed: false;
  paidLaunchAllowed: false;
  reportLaunchAllowed: false;
  securityReadinessApproved: false;
  recordedByRole: string;
  recordedAt: string;
  sourceRoute: string;
  requestIdHash: string;
};

export type OwnerConfigurationEvidencePersistenceResponse = {
  ok: boolean;
  status: number;
  cache: "no-store";
  error?: "not_available" | "not_recorded";
  summary?: OwnerConfigurationEvidenceSummary;
  records?: readonly OwnerConfigurationEvidencePersistenceRecord[];
  publicLaunchAllowed: false;
  paidLaunchAllowed: false;
  reportLaunchAllowed: false;
  securityReadinessApproved: false;
};

export function recordOwnerConfigurationEvidenceBatch(
  inputs: readonly OwnerConfigurationEvidenceInput[],
  access: OwnerConfigurationEvidencePersistenceAccess,
): OwnerConfigurationEvidencePersistenceResponse {
  if (!access.commandCenterAllowed) return deniedPersistenceResponse();
  if (!inputs.length) return notRecordedResponse();

  const summary = summarizeOwnerConfigurationEvidence(inputs);
  const records = summary.projections.map((projection) => makePersistenceRecord(projection, access));

  return {
    ok: true,
    status: 202,
    cache: "no-store",
    summary,
    records,
    publicLaunchAllowed: false,
    paidLaunchAllowed: false,
    reportLaunchAllowed: false,
    securityReadinessApproved: false,
  };
}

export function getOwnerConfigurationEvidenceHistoryResponse(
  access: OwnerConfigurationEvidencePersistenceAccess,
  history: readonly OwnerConfigurationEvidencePersistenceRecord[],
): OwnerConfigurationEvidencePersistenceResponse {
  if (!access.commandCenterAllowed) return deniedPersistenceResponse();

  return {
    ok: true,
    status: 200,
    cache: "no-store",
    records: history.map(sanitizePersistenceRecord),
    publicLaunchAllowed: false,
    paidLaunchAllowed: false,
    reportLaunchAllowed: false,
    securityReadinessApproved: false,
  };
}

function makePersistenceRecord(
  projection: OwnerConfigurationEvidenceProjection,
  access: OwnerConfigurationEvidencePersistenceAccess,
): OwnerConfigurationEvidencePersistenceRecord {
  return sanitizePersistenceRecord({
    recordId: `owner-config-record-${stableHash(`${projection.evidenceId}:${projection.approvalStatus}:${access.requestIdHash ?? "missing-request-id-hash"}`)}`,
    projectionEvidenceId: projection.evidenceId,
    areaKey: projection.areaKey,
    approvalStatus: projection.approvalStatus,
    complete: projection.complete,
    safeSummaryHash: stableHash(projection.safeSummary),
    ownerApprovalRecorded: Boolean(access.ownerApprovalRecorded && projection.approvalStatus === "approved"),
    releaseCaptainReviewed: Boolean(access.releaseCaptainReviewed),
    launchApprovalDerivedFromEvidence: false,
    publicLaunchAllowed: false,
    paidLaunchAllowed: false,
    reportLaunchAllowed: false,
    securityReadinessApproved: false,
    recordedByRole: safeRole(access.recordedByRole),
    recordedAt: new Date(0).toISOString(),
    sourceRoute: projection.sourceRoute,
    requestIdHash: safeText(access.requestIdHash ?? projection.requestIdHash),
  });
}

function deniedPersistenceResponse(): OwnerConfigurationEvidencePersistenceResponse {
  return {
    ok: false,
    status: 404,
    cache: "no-store",
    error: "not_available",
    publicLaunchAllowed: false,
    paidLaunchAllowed: false,
    reportLaunchAllowed: false,
    securityReadinessApproved: false,
  };
}

function notRecordedResponse(): OwnerConfigurationEvidencePersistenceResponse {
  return {
    ok: false,
    status: 400,
    cache: "no-store",
    error: "not_recorded",
    publicLaunchAllowed: false,
    paidLaunchAllowed: false,
    reportLaunchAllowed: false,
    securityReadinessApproved: false,
  };
}

function sanitizePersistenceRecord(record: OwnerConfigurationEvidencePersistenceRecord): OwnerConfigurationEvidencePersistenceRecord {
  return {
    recordId: safeText(record.recordId),
    projectionEvidenceId: safeText(record.projectionEvidenceId),
    areaKey: record.areaKey,
    approvalStatus: record.approvalStatus,
    complete: record.complete,
    safeSummaryHash: safeText(record.safeSummaryHash),
    ownerApprovalRecorded: Boolean(record.ownerApprovalRecorded && record.approvalStatus === "approved"),
    releaseCaptainReviewed: Boolean(record.releaseCaptainReviewed),
    launchApprovalDerivedFromEvidence: false,
    publicLaunchAllowed: false,
    paidLaunchAllowed: false,
    reportLaunchAllowed: false,
    securityReadinessApproved: false,
    recordedByRole: safeRole(record.recordedByRole),
    recordedAt: safeText(record.recordedAt),
    sourceRoute: safeRoute(record.sourceRoute),
    requestIdHash: safeText(record.requestIdHash),
  };
}

function safeRole(role?: string | null) {
  const normalized = safeText(role ?? "operator").toLowerCase();
  if (["owner", "admin", "operator", "auditor", "release-captain"].includes(normalized)) return normalized;
  return "operator";
}

function safeRoute(route: string) {
  const normalized = safeText(route);
  if (normalized.startsWith("/api/command-center/")) return normalized;
  return "/api/command-center/owner-configuration/evidence";
}

function safeText(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().slice(0, 240);
  if (!normalized) return "redacted-safe-empty";
  const lower = normalized.toLowerCase();
  if (["secret=", "password=", "token=", "key=", "rawpayload=", "rawevidence=", "credential="].some((fragment) => lower.includes(fragment))) {
    return "redacted-safe-value";
  }
  return normalized;
}

function stableHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}
