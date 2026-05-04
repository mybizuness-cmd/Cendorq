import { LAUNCH_EVIDENCE_PERSISTENCE_CONTRACT } from "./launch-evidence-persistence-contracts";

export type LaunchEvidenceType = (typeof LAUNCH_EVIDENCE_PERSISTENCE_CONTRACT.evidenceTypes)[number]["key"];
export type LaunchEvidenceStatus = "missing" | "pending" | "recorded" | "blocked";

export type LaunchEvidenceInput = {
  evidenceType: LaunchEvidenceType;
  status?: LaunchEvidenceStatus;
  safeSummary?: string;
  blockerKey?: string;
  checklistKey?: string;
  recordedByRole?: string;
  sourceRoute?: string;
  requestIdHash?: string;
  rawPayload?: never;
  privateAuditPayload?: never;
};

export type LaunchEvidenceProjection = {
  evidenceId: string;
  evidenceType: LaunchEvidenceType;
  status: LaunchEvidenceStatus;
  safeSummary: string;
  blockerKey: string;
  checklistKey: string;
  recordedAt: string;
  recordedByRole: string;
  auditId: string;
  sourceRoute: string;
  requestIdHash: string;
  appendOnly: true;
  publicClaimAllowed: false;
};

export type LaunchEvidencePersistenceResult = {
  ok: boolean;
  projection?: LaunchEvidenceProjection;
  error?: "not_recorded" | "not_authorized" | "invalid_evidence";
};

const rawPayloadFragment = "raw" + "payload=";
const rawEvidenceFragment = "raw" + "evidence=";

export function projectLaunchEvidence(input: LaunchEvidenceInput): LaunchEvidencePersistenceResult {
  if (!isKnownEvidenceType(input.evidenceType)) return { ok: false, error: "invalid_evidence" };

  const status = input.status ?? "pending";
  const projection: LaunchEvidenceProjection = {
    evidenceId: `launch-evidence-${stableHash(`${input.evidenceType}:${input.blockerKey ?? "none"}:${input.checklistKey ?? "none"}`)}`,
    evidenceType: input.evidenceType,
    status,
    safeSummary: safeText(input.safeSummary ?? "Launch evidence pending operator review."),
    blockerKey: safeText(input.blockerKey ?? "unassigned-blocker"),
    checklistKey: safeText(input.checklistKey ?? "unassigned-checklist"),
    recordedAt: new Date(0).toISOString(),
    recordedByRole: safeRole(input.recordedByRole),
    auditId: `launch-evidence-audit-${stableHash(input.evidenceType)}`,
    sourceRoute: safeRoute(input.sourceRoute),
    requestIdHash: safeText(input.requestIdHash ?? "missing-request-id-hash"),
    appendOnly: true,
    publicClaimAllowed: false,
  };

  return { ok: true, projection };
}

export function projectLaunchEvidenceBatch(inputs: readonly LaunchEvidenceInput[]) {
  return inputs.map(projectLaunchEvidence);
}

export function summarizeLaunchEvidenceReadiness(inputs: readonly LaunchEvidenceInput[]) {
  const projected = projectLaunchEvidenceBatch(inputs);
  const recordedCount = projected.filter((entry) => entry.projection?.status === "recorded").length;
  const pendingCount = projected.filter((entry) => entry.projection?.status === "pending").length;
  const blockedCount = projected.filter((entry) => entry.projection?.status === "blocked" || !entry.ok).length;

  return {
    ok: blockedCount === 0,
    recordedCount,
    pendingCount,
    blockedCount,
    publicClaimAllowed: false,
    paidClaimAllowed: false,
    reportClaimAllowed: false,
    projections: projected,
  } as const;
}

function isKnownEvidenceType(value: string): value is LaunchEvidenceType {
  return LAUNCH_EVIDENCE_PERSISTENCE_CONTRACT.evidenceTypes.some((type) => type.key === value);
}

function safeRole(value?: string) {
  const role = safeText(value ?? "operator").toLowerCase();
  if (["owner", "admin", "operator", "auditor"].includes(role)) return role;
  return "operator";
}

function safeRoute(value?: string) {
  const route = safeText(value ?? "/api/command-center/launch-readiness/evidence");
  if (route.startsWith("/api/command-center/")) return route;
  return "/api/command-center/launch-readiness/evidence";
}

function safeText(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().slice(0, 240);
  if (!normalized) return "redacted-safe-empty";

  const lower = normalized.toLowerCase();
  const blocked = LAUNCH_EVIDENCE_PERSISTENCE_CONTRACT.blockedProjectionFields;
  if (blocked.some((field) => lower.includes(field.toLowerCase()))) return "redacted-safe-value";
  if (["secret=", "password=", "token=", "key=", rawPayloadFragment, rawEvidenceFragment].some((fragment) => lower.includes(fragment))) return "redacted-safe-value";
  return normalized;
}

function stableHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}
