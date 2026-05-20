import type { OwnerReportTestPlanKey, OwnerReportTestModeProjection } from "./owner-report-test-mode-standard";
import type { OwnerReportTestRunnerState } from "./owner-report-test-runner-contract";

export type OwnerReportTestRunPersistenceAccess = {
  commandCenterAllowed?: boolean;
  ownerAccessVerified?: boolean;
  recordedByRole?: "owner" | "operator" | "auditor";
  sourceRoute?: string;
  requestIdHash?: string;
};

export type OwnerReportTestRunRecord = {
  runId: string;
  mode: "owner-only-report-test-mode";
  companyHash: string;
  urlHash: string;
  requestedPlanCount: number;
  allowedPlans: readonly OwnerReportTestPlanKey[];
  previewBlueprintsRequired: boolean;
  sampleOutputsRequired: boolean;
  agentTraceRequired: boolean;
  chiefReviewRequired: boolean;
  releaseCaptainGateRequired: boolean;
  visualReportStructureRequired: boolean;
  appendOnly: true;
  ownerAccessVerified: boolean;
  checkoutRequired: false;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
  customerEmailSent: false;
  rawCompanyInputStored: false;
  rawPublicPageStored: false;
  rawEvidenceStored: false;
  rawSecretsStored: false;
  privateCredentialStored: false;
  recordedByRole: string;
  recordedAt: string;
  sourceRoute: string;
  requestIdHash: string;
};

export type OwnerReportTestRunPersistenceResponse = {
  ok: boolean;
  status: number;
  cache: "no-store";
  error?: "not_available" | "not_recorded";
  records?: readonly OwnerReportTestRunRecord[];
  appendOnly: true;
  checkoutRequired: false;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
  customerEmailSent: false;
  rawCompanyInputStored: false;
  rawPublicPageStored: false;
  rawEvidenceStored: false;
  rawSecretsStored: false;
  privateCredentialStored: false;
};

export function recordOwnerReportTestRun(
  runner: OwnerReportTestRunnerState,
  projection: OwnerReportTestModeProjection,
  access: OwnerReportTestRunPersistenceAccess,
): OwnerReportTestRunPersistenceResponse {
  if (!access.commandCenterAllowed || !access.ownerAccessVerified) return deniedPersistenceResponse();
  if (!projection.ok || !projection.allowedPlans.length || !runner.input.companyUrl) return notRecordedResponse();

  const record = sanitizeRecord({
    runId: `owner-report-test-run-${stableHash(`${runner.input.companyName}:${runner.input.companyUrl}:${projection.allowedPlans.join("|")}:${access.requestIdHash ?? "missing-request-id-hash"}`)}`,
    mode: "owner-only-report-test-mode",
    companyHash: stableHash(runner.input.companyName),
    urlHash: stableHash(runner.input.companyUrl),
    requestedPlanCount: runner.input.requestedPlans.length,
    allowedPlans: projection.allowedPlans,
    previewBlueprintsRequired: runner.output.previewBlueprintsRequired,
    sampleOutputsRequired: runner.output.sampleOutputsRequired,
    agentTraceRequired: runner.output.agentTraceRequired,
    chiefReviewRequired: runner.output.chiefReviewRequired,
    releaseCaptainGateRequired: runner.output.releaseCaptainGateRequired,
    visualReportStructureRequired: runner.output.visualReportStructureRequired,
    appendOnly: true,
    ownerAccessVerified: true,
    checkoutRequired: false,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    customerEmailSent: false,
    rawCompanyInputStored: false,
    rawPublicPageStored: false,
    rawEvidenceStored: false,
    rawSecretsStored: false,
    privateCredentialStored: false,
    recordedByRole: safeRole(access.recordedByRole),
    recordedAt: new Date(0).toISOString(),
    sourceRoute: safeRoute(access.sourceRoute),
    requestIdHash: safeText(access.requestIdHash ?? "missing-request-id-hash"),
  });

  return {
    ok: true,
    status: 202,
    cache: "no-store",
    records: [record],
    appendOnly: true,
    checkoutRequired: false,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    customerEmailSent: false,
    rawCompanyInputStored: false,
    rawPublicPageStored: false,
    rawEvidenceStored: false,
    rawSecretsStored: false,
    privateCredentialStored: false,
  };
}

export function getOwnerReportTestRunHistoryResponse(
  access: OwnerReportTestRunPersistenceAccess,
  history: readonly OwnerReportTestRunRecord[],
): OwnerReportTestRunPersistenceResponse {
  if (!access.commandCenterAllowed || !access.ownerAccessVerified) return deniedPersistenceResponse();
  return {
    ok: true,
    status: 200,
    cache: "no-store",
    records: history.map(sanitizeRecord),
    appendOnly: true,
    checkoutRequired: false,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    customerEmailSent: false,
    rawCompanyInputStored: false,
    rawPublicPageStored: false,
    rawEvidenceStored: false,
    rawSecretsStored: false,
    privateCredentialStored: false,
  };
}

function deniedPersistenceResponse(): OwnerReportTestRunPersistenceResponse {
  return {
    ok: false,
    status: 404,
    cache: "no-store",
    error: "not_available",
    appendOnly: true,
    checkoutRequired: false,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    customerEmailSent: false,
    rawCompanyInputStored: false,
    rawPublicPageStored: false,
    rawEvidenceStored: false,
    rawSecretsStored: false,
    privateCredentialStored: false,
  };
}

function notRecordedResponse(): OwnerReportTestRunPersistenceResponse {
  return {
    ok: false,
    status: 400,
    cache: "no-store",
    error: "not_recorded",
    appendOnly: true,
    checkoutRequired: false,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    customerEmailSent: false,
    rawCompanyInputStored: false,
    rawPublicPageStored: false,
    rawEvidenceStored: false,
    rawSecretsStored: false,
    privateCredentialStored: false,
  };
}

function sanitizeRecord(record: OwnerReportTestRunRecord): OwnerReportTestRunRecord {
  return {
    runId: safeToken(record.runId),
    mode: "owner-only-report-test-mode",
    companyHash: safeText(record.companyHash),
    urlHash: safeText(record.urlHash),
    requestedPlanCount: safeCount(record.requestedPlanCount),
    allowedPlans: record.allowedPlans.filter(isPlan),
    previewBlueprintsRequired: Boolean(record.previewBlueprintsRequired),
    sampleOutputsRequired: Boolean(record.sampleOutputsRequired),
    agentTraceRequired: Boolean(record.agentTraceRequired),
    chiefReviewRequired: Boolean(record.chiefReviewRequired),
    releaseCaptainGateRequired: Boolean(record.releaseCaptainGateRequired),
    visualReportStructureRequired: Boolean(record.visualReportStructureRequired),
    appendOnly: true,
    ownerAccessVerified: Boolean(record.ownerAccessVerified),
    checkoutRequired: false,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    customerEmailSent: false,
    rawCompanyInputStored: false,
    rawPublicPageStored: false,
    rawEvidenceStored: false,
    rawSecretsStored: false,
    privateCredentialStored: false,
    recordedByRole: safeRole(record.recordedByRole),
    recordedAt: safeText(record.recordedAt),
    sourceRoute: safeRoute(record.sourceRoute),
    requestIdHash: safeText(record.requestIdHash),
  };
}

function isPlan(value: string): value is OwnerReportTestPlanKey {
  return value === "free-scan" || value === "deep-review" || value === "build-fix" || value === "ongoing-control";
}

function safeRole(role?: string | null) {
  const normalized = safeText(role ?? "owner").toLowerCase();
  if (["owner", "operator", "auditor"].includes(normalized)) return normalized;
  return "owner";
}

function safeRoute(route?: string | null) {
  const normalized = safeText(route ?? "/api/command-center/owner-report-test-mode");
  if (normalized.startsWith("/api/command-center/")) return normalized;
  return "/api/command-center/owner-report-test-mode";
}

function safeCount(value: number) {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.floor(value);
}

function safeText(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().slice(0, 240);
  if (!normalized) return "redacted-safe-empty";
  const lower = normalized.toLowerCase();
  if (["secret=", "password=", "token=", "key=", "rawpayload=", "rawevidence=", "credential=", "privateauditpayload=", "customerdata=", "providerpayload=", "operatoridentity="].some((fragment) => lower.includes(fragment))) return "redacted-safe-value";
  return normalized;
}

function safeToken(value: string) {
  return safeText(value).replace(/[^a-zA-Z0-9._:-]/g, "-").slice(0, 96) || "owner-report-test-run";
}

function stableHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  return hash.toString(16).padStart(8, "0");
}
