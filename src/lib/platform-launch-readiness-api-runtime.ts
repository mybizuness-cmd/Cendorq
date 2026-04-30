import { PLATFORM_LAUNCH_READINESS_AUDIT_API_CONTRACT } from "./platform-launch-readiness-audit-api-contracts";
import { projectPlatformLaunchReadiness, type PlatformLaunchReadinessInput, type PlatformLaunchReadinessProjection } from "./platform-launch-readiness-runtime";

export type LaunchReadinessApiAccess = {
  commandCenterAllowed?: boolean;
  operatorApproved?: boolean;
  requestIdHash?: string;
  reviewedByRole?: string;
};

export type LaunchReadinessAuditInput = {
  decision: PlatformLaunchReadinessProjection["decision"];
  reviewReason: string;
  sourceRoute: string;
  idempotencyKeyHash?: string;
};

export type LaunchReadinessSafeApiResponse = {
  ok: boolean;
  status: number;
  cache: "no-store";
  error?: "not_available" | "not_authorized" | "not_recorded";
  projection?: PlatformLaunchReadinessProjection & {
    auditStatus: "not-recorded" | "recordable" | "recorded";
    lastReviewedAt: string | null;
    reviewedByRole: string | null;
    auditId: string | null;
  };
  auditRecord?: LaunchReadinessSafeAuditRecord;
  history?: readonly LaunchReadinessSafeAuditRecord[];
};

export type LaunchReadinessSafeAuditRecord = {
  auditId: string;
  decision: PlatformLaunchReadinessProjection["decision"];
  safeSummaryHash: string;
  readyGroupKeys: readonly string[];
  blockedGroupKeys: readonly string[];
  evidenceGapKeys: readonly string[];
  safeNextActionKeys: readonly string[];
  hardLaunchLockKeys: readonly string[];
  blockedPatternKeys: readonly string[];
  reviewedByRole: string;
  reviewReason: string;
  reviewedAt: string;
  sourceRoute: string;
  requestIdHash: string;
};

export function getLaunchReadinessProjectionResponse(input: PlatformLaunchReadinessInput, access: LaunchReadinessApiAccess): LaunchReadinessSafeApiResponse {
  if (!access.commandCenterAllowed) return safeDeniedResponse();

  const projection = projectPlatformLaunchReadiness(input);
  return {
    ok: true,
    status: 200,
    cache: "no-store",
    projection: {
      ...projection,
      auditStatus: access.operatorApproved ? "recordable" : "not-recorded",
      lastReviewedAt: null,
      reviewedByRole: safeRole(access.reviewedByRole),
      auditId: null,
    },
  };
}

export function recordLaunchReadinessAudit(input: PlatformLaunchReadinessInput, access: LaunchReadinessApiAccess, audit: LaunchReadinessAuditInput): LaunchReadinessSafeApiResponse {
  if (!access.commandCenterAllowed || !access.operatorApproved) return safeDeniedResponse();
  if (!audit.idempotencyKeyHash || !audit.reviewReason.trim() || !audit.sourceRoute.startsWith("/api/command-center/")) {
    return { ok: false, status: 400, cache: "no-store", error: "not_recorded" };
  }

  const projection = projectPlatformLaunchReadiness(input);
  const auditRecord = makeAuditRecord(projection, access, audit);
  return {
    ok: true,
    status: 202,
    cache: "no-store",
    auditRecord,
    projection: {
      ...projection,
      auditStatus: "recorded",
      lastReviewedAt: auditRecord.reviewedAt,
      reviewedByRole: auditRecord.reviewedByRole,
      auditId: auditRecord.auditId,
    },
  };
}

export function getLaunchReadinessAuditHistoryResponse(access: LaunchReadinessApiAccess, history: readonly LaunchReadinessSafeAuditRecord[]): LaunchReadinessSafeApiResponse {
  if (!access.commandCenterAllowed) return safeDeniedResponse();

  return {
    ok: true,
    status: 200,
    cache: "no-store",
    history: history.map(sanitizeAuditRecord),
  };
}

export function safeLaunchReadinessHeaders() {
  return {
    "Cache-Control": "no-store, max-age=0",
    "Content-Type": "application/json; charset=utf-8",
    "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
  } as const;
}

export function safeDeniedResponse(): LaunchReadinessSafeApiResponse {
  return {
    ok: false,
    status: 404,
    cache: "no-store",
    error: "not_available",
  };
}

function makeAuditRecord(projection: PlatformLaunchReadinessProjection, access: LaunchReadinessApiAccess, audit: LaunchReadinessAuditInput): LaunchReadinessSafeAuditRecord {
  return sanitizeAuditRecord({
    auditId: `launch-readiness-${stableHash(`${audit.idempotencyKeyHash}:${projection.decision}:${audit.reviewReason}`)}`,
    decision: audit.decision,
    safeSummaryHash: stableHash(projection.safeSummary),
    readyGroupKeys: projection.readyGroups.map(stableHash),
    blockedGroupKeys: projection.blockedGroups.map(stableHash),
    evidenceGapKeys: projection.evidenceGaps.map(stableHash),
    safeNextActionKeys: projection.safeNextActions.map(stableHash),
    hardLaunchLockKeys: projection.hardLaunchLocks.map(stableHash),
    blockedPatternKeys: projection.blockedPatterns.map(stableHash),
    reviewedByRole: safeRole(access.reviewedByRole) ?? "operator",
    reviewReason: safeText(audit.reviewReason),
    reviewedAt: new Date(0).toISOString(),
    sourceRoute: safeRoute(audit.sourceRoute),
    requestIdHash: safeText(access.requestIdHash ?? "missing-request-id-hash"),
  });
}

function sanitizeAuditRecord(record: LaunchReadinessSafeAuditRecord): LaunchReadinessSafeAuditRecord {
  return {
    auditId: safeText(record.auditId),
    decision: record.decision,
    safeSummaryHash: safeText(record.safeSummaryHash),
    readyGroupKeys: record.readyGroupKeys.map(safeText),
    blockedGroupKeys: record.blockedGroupKeys.map(safeText),
    evidenceGapKeys: record.evidenceGapKeys.map(safeText),
    safeNextActionKeys: record.safeNextActionKeys.map(safeText),
    hardLaunchLockKeys: record.hardLaunchLockKeys.map(safeText),
    blockedPatternKeys: record.blockedPatternKeys.map(safeText),
    reviewedByRole: safeRole(record.reviewedByRole) ?? "operator",
    reviewReason: safeText(record.reviewReason),
    reviewedAt: safeText(record.reviewedAt),
    sourceRoute: safeRoute(record.sourceRoute),
    requestIdHash: safeText(record.requestIdHash),
  };
}

function safeRole(role?: string | null) {
  if (!role) return null;
  const normalized = safeText(role).toLowerCase();
  if (["owner", "admin", "operator", "auditor"].includes(normalized)) return normalized;
  return "operator";
}

function safeRoute(route: string) {
  const normalized = safeText(route);
  if (normalized.startsWith("/api/command-center/")) return normalized;
  return "/api/command-center/launch-readiness";
}

function safeText(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().slice(0, 240);
  if (!normalized) return "redacted-safe-empty";
  const blocked = PLATFORM_LAUNCH_READINESS_AUDIT_API_CONTRACT.blockedProjectionFields;
  if (blocked.some((field) => normalized.toLowerCase().includes(field.toLowerCase()))) return "redacted-safe-value";
  if (["secret=", "password=", "token=", "key=", "rawpayload=", "rawevidence="].some((fragment) => normalized.toLowerCase().includes(fragment))) return "redacted-safe-value";
  return normalized;
}

function stableHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}
