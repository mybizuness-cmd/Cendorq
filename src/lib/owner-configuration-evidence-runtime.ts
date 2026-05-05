import { OWNER_CONFIGURATION_EVIDENCE_CONTRACT } from "./owner-configuration-evidence-contracts";

const REQUIRED_OWNER_CONFIGURATION_AREAS = [
  "auth-provider-configuration",
  "payment-mapping-configuration",
  "protected-runtime-configuration",
  "launch-contact-configuration",
  "support-identity-configuration",
] as const;

export type OwnerConfigurationAreaKey = (typeof OWNER_CONFIGURATION_EVIDENCE_CONTRACT.evidenceAreas)[number]["key"];
export type OwnerConfigurationApprovalStatus = "missing" | "pending" | "approved" | "blocked";

export type OwnerConfigurationEvidenceInput = {
  areaKey: OwnerConfigurationAreaKey;
  approvalStatus?: OwnerConfigurationApprovalStatus;
  safeSummary?: string;
  recordedByRole?: string;
  sourceRoute?: string;
  requestIdHash?: string;
};

export type OwnerConfigurationEvidenceProjection = {
  evidenceId: string;
  areaKey: OwnerConfigurationAreaKey;
  approvalStatus: OwnerConfigurationApprovalStatus;
  complete: boolean;
  publicLaunchAllowed: false;
  paidLaunchAllowed: false;
  safeSummary: string;
  recordedAt: string;
  recordedByRole: string;
  auditId: string;
  sourceRoute: string;
  requestIdHash: string;
};

export type OwnerConfigurationEvidenceSummary = {
  ok: boolean;
  approvedCount: number;
  pendingCount: number;
  missingCount: number;
  blockedCount: number;
  requiredAreaKeys: typeof REQUIRED_OWNER_CONFIGURATION_AREAS;
  publicLaunchAllowed: false;
  paidLaunchAllowed: false;
  projections: readonly OwnerConfigurationEvidenceProjection[];
};

export function projectOwnerConfigurationEvidence(input: OwnerConfigurationEvidenceInput): OwnerConfigurationEvidenceProjection {
  const area = OWNER_CONFIGURATION_EVIDENCE_CONTRACT.evidenceAreas.find((candidate) => candidate.key === input.areaKey && REQUIRED_OWNER_CONFIGURATION_AREAS.includes(candidate.key));
  const approvalStatus = input.approvalStatus ?? "missing";

  return {
    evidenceId: `owner-config-${stableHash(`${input.areaKey}:${approvalStatus}`)}`,
    areaKey: area?.key ?? "auth-provider-configuration",
    approvalStatus,
    complete: approvalStatus === "approved",
    publicLaunchAllowed: false,
    paidLaunchAllowed: false,
    safeSummary: safeText(input.safeSummary ?? getDefaultSummary(input.areaKey, approvalStatus)),
    recordedAt: new Date(0).toISOString(),
    recordedByRole: safeRole(input.recordedByRole),
    auditId: `owner-config-audit-${stableHash(input.areaKey)}`,
    sourceRoute: safeRoute(input.sourceRoute),
    requestIdHash: safeText(input.requestIdHash ?? `owner-config-${stableHash(input.areaKey)}`),
  };
}

export function summarizeOwnerConfigurationEvidence(inputs: readonly OwnerConfigurationEvidenceInput[]): OwnerConfigurationEvidenceSummary {
  const projections = inputs.map(projectOwnerConfigurationEvidence);
  const approvedCount = projections.filter((projection) => projection.approvalStatus === "approved").length;
  const pendingCount = projections.filter((projection) => projection.approvalStatus === "pending").length;
  const missingCount = projections.filter((projection) => projection.approvalStatus === "missing").length;
  const blockedCount = projections.filter((projection) => projection.approvalStatus === "blocked").length;

  return {
    ok: missingCount === 0 && pendingCount === 0 && blockedCount === 0,
    approvedCount,
    pendingCount,
    missingCount,
    blockedCount,
    requiredAreaKeys: REQUIRED_OWNER_CONFIGURATION_AREAS,
    publicLaunchAllowed: false,
    paidLaunchAllowed: false,
    projections,
  };
}

function getDefaultSummary(areaKey: string, status: OwnerConfigurationApprovalStatus) {
  if (status === "approved") return `${areaKey} has owner approval evidence recorded for operator review.`;
  if (status === "pending") return `${areaKey} owner approval evidence is pending and not complete.`;
  if (status === "blocked") return `${areaKey} owner approval evidence is blocked and cannot be used for launch review.`;
  return `${areaKey} owner approval evidence is missing and not complete.`;
}

function safeRole(value?: string) {
  const role = safeText(value ?? "operator").toLowerCase();
  if (["owner", "admin", "operator", "auditor"].includes(role)) return role;
  return "operator";
}

function safeRoute(value?: string) {
  const route = safeText(value ?? "/api/command-center/owner-configuration/evidence");
  if (route.startsWith("/api/command-center/")) return route;
  return "/api/command-center/owner-configuration/evidence";
}

function safeText(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().slice(0, 240);
  if (!normalized) return "redacted-safe-empty";
  const lower = normalized.toLowerCase();
  const blocked = OWNER_CONFIGURATION_EVIDENCE_CONTRACT.blockedProjectionFields;
  if (blocked.some((field) => lower.includes(field.toLowerCase()))) return "redacted-safe-value";
  if (["secret=", "password=", "token=", "key=", "rawpayload=", "rawevidence="].some((fragment) => lower.includes(fragment))) return "redacted-safe-value";
  return normalized;
}

function stableHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}
