import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import {
  REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS,
  type ReportEvidencePlanFit,
  type ReportEvidenceSourceTier,
  type ReportEvidenceTrustLevel,
} from "@/lib/command-center/report-evidence-orchestration";
import { recordReportEvidenceRecordBatch } from "@/lib/command-center/report-evidence-record-persistence-runtime";
import type { ReportEvidenceRuntimeInput } from "@/lib/command-center/report-evidence-orchestration-runtime";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const sourceRoute = "/api/command-center/report-evidence/records";

const defaultEvidenceInputs: readonly ReportEvidenceRuntimeInput[] = [
  {
    evidenceKey: "record-customer-claim-check",
    sourceTier: "customer-context",
    trustLevel: "limited",
    planFit: "deep-review",
    summary: "Customer-provided claim is recorded only as limited context until supporting evidence and release-captain review exist.",
    customerClaimPresent: true,
    customerClaimSupported: false,
    limitationsVisible: true,
    safeNextActionVisible: true,
    planFitEvidencePresent: true,
    releaseCaptainReviewed: false,
  },
  {
    evidenceKey: "record-owned-surface-observation",
    sourceTier: "owned-business-surface",
    trustLevel: "strong",
    planFit: "build-fix",
    summary: "Owned surface observation can be persisted as a safe summary record without raw evidence or customer-facing approval.",
    limitationsVisible: true,
    safeNextActionVisible: true,
    planFitEvidencePresent: true,
    releaseCaptainReviewed: false,
  },
  {
    evidenceKey: "record-conflict-resolution-path",
    sourceTier: "safe-public-signal",
    trustLevel: "conflicted",
    planFit: "ongoing-control",
    summary: "Conflicting evidence remains visible as a blocked or downgraded persistence record until reviewed.",
    hasEvidenceConflict: true,
    limitationsVisible: true,
    safeNextActionVisible: true,
    planFitEvidencePresent: true,
    releaseCaptainReviewed: false,
  },
];

export async function GET() {
  if (!(await hasCommandCenterAccess())) return deniedResponse();

  const persistence = recordReportEvidenceRecordBatch(
    {
      reportId: "command-center-sample-report",
      businessId: "command-center-sample-business",
      evidence: defaultEvidenceInputs,
      capturedAt: "2026-01-01T00:00:00.000Z",
      retentionClass: "audit-defense",
      reviewedByRole: "release-captain",
    },
    {
      commandCenterAllowed: true,
      releaseCaptainReviewed: false,
      recordedByRole: "operator",
      sourceRoute,
      requestIdHash: "report-evidence-records-sample",
    },
  );

  return NextResponse.json(
    {
      ...persistence,
      status: 200,
      route: sourceRoute,
      commandCenterOnly: true,
      acceptedInput: "safe-summary-only" as const,
      persistenceMode: "append-only-safe-projection" as const,
      rawEvidenceExposed: false,
    },
    { status: 200, headers: safeHeaders() },
  );
}

export async function POST(request: Request) {
  if (!(await hasCommandCenterAccess())) return deniedResponse();

  const body = await readJson(request);
  if (!body || containsBlockedEvidenceShape(body)) return rejectedResponse();

  const inputs = parseEvidenceInputs(body);
  if (!inputs.length) return rejectedResponse();

  const persistence = recordReportEvidenceRecordBatch(
    {
      reportId: getRootString(body, "reportId") ?? "report-evidence-safe-record",
      businessId: getRootString(body, "businessId") ?? "business-safe-record",
      evidence: inputs,
      capturedAt: getRootString(body, "capturedAt") ?? "2026-01-01T00:00:00.000Z",
      retentionClass: "audit-defense",
      reviewedByRole: "release-captain",
    },
    {
      commandCenterAllowed: true,
      releaseCaptainReviewed: getRootBoolean(body, "releaseCaptainReviewed"),
      recordedByRole: getRootString(body, "recordedByRole") ?? "operator",
      sourceRoute,
      requestIdHash: getRootString(body, "requestIdHash") ?? "report-evidence-records-request",
    },
  );

  if (!persistence.ok) return rejectedResponse();

  return NextResponse.json(
    {
      ...persistence,
      status: 202,
      route: sourceRoute,
      commandCenterOnly: true,
      acceptedInput: "safe-summary-only" as const,
      persistenceMode: "append-only-safe-projection" as const,
      rawEvidenceExposed: false,
    },
    { status: 202, headers: safeHeaders() },
  );
}

async function hasCommandCenterAccess() {
  const headerList = await headers();
  const accessState = resolveCommandCenterAccessState(headerList.get(commandCenterPreviewHeaderName()));
  return accessState.allowed;
}

async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function parseEvidenceInputs(body: unknown): ReportEvidenceRuntimeInput[] {
  const records = Array.isArray(body) ? body : isRecord(body) && Array.isArray(body.evidence) ? body.evidence : [];

  return records.flatMap((record) => {
    if (!isRecord(record)) return [];

    const sourceTier = safeSourceTier(record.sourceTier);
    const trustLevel = safeTrustLevel(record.trustLevel);
    if (!sourceTier || !trustLevel) return [];

    return [
      {
        evidenceKey: getString(record, "evidenceKey") ?? `${sourceTier}-${trustLevel}-evidence-record`,
        sourceTier,
        trustLevel,
        planFit: safePlanFit(record.planFit),
        summary: getString(record, "summary") ?? "Safe report evidence record summary pending release-captain review.",
        customerClaimPresent: getBoolean(record, "customerClaimPresent"),
        customerClaimSupported: getBoolean(record, "customerClaimSupported"),
        hasRawPrivatePayload: false,
        hasEvidenceConflict: getBoolean(record, "hasEvidenceConflict"),
        limitationsVisible: getBoolean(record, "limitationsVisible"),
        safeNextActionVisible: getBoolean(record, "safeNextActionVisible"),
        planFitEvidencePresent: getBoolean(record, "planFitEvidencePresent"),
        releaseCaptainReviewed: getBoolean(record, "releaseCaptainReviewed"),
      },
    ];
  });
}

function safeSourceTier(value: unknown): ReportEvidenceSourceTier | null {
  if (
    value === "customer-context" ||
    value === "owned-business-surface" ||
    value === "safe-public-signal" ||
    value === "technical-observation" ||
    value === "calculated-analysis" ||
    value === "operator-review" ||
    value === "release-captain-review"
  ) {
    return value;
  }

  return null;
}

function safeTrustLevel(value: unknown): ReportEvidenceTrustLevel | null {
  if (value === "verified" || value === "strong" || value === "moderate" || value === "limited" || value === "missing" || value === "conflicted") return value;
  return null;
}

function safePlanFit(value: unknown): ReportEvidencePlanFit | undefined {
  if (value === "free-scan" || value === "deep-review" || value === "build-fix" || value === "ongoing-control") return value;
  return undefined;
}

function getRootBoolean(body: unknown, key: string) {
  return isRecord(body) && body[key] === true;
}

function getRootString(body: unknown, key: string) {
  return isRecord(body) ? getString(body, key) : null;
}

function getBoolean(body: Record<string, unknown>, key: string) {
  return body[key] === true;
}

function getString(body: Record<string, unknown>, key: string) {
  return typeof body[key] === "string" ? body[key] : null;
}

function containsBlockedEvidenceShape(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(containsBlockedEvidenceShape);
  if (!isRecord(value)) return false;

  for (const [key, nestedValue] of Object.entries(value)) {
    const normalizedKey = key.toLowerCase();
    const blockedField = [
      "rawpayload",
      "rawevidence",
      "rawsecuritypayload",
      "rawbillingdata",
      "privatepayload",
      "privateevidence",
      "providerpayload",
      "privateauditpayload",
      "customerdata",
      "internalnotes",
      "operatoridentity",
      "riskscoringinternals",
      "attackerdetails",
      "sessiontoken",
      "csrftoken",
      "adminkey",
      "supportcontextkey",
      "secret",
      "password",
      "credential",
    ].some((field) => normalizedKey.includes(field));

    if (blockedField) return true;
    if (typeof nestedValue === "string" && containsUnsafeFragment(nestedValue)) return true;
    if (containsBlockedEvidenceShape(nestedValue)) return true;
  }

  return false;
}

function containsUnsafeFragment(value: string) {
  const normalized = value.toLowerCase();
  return [
    "secret=",
    "password=",
    "token=",
    "key=",
    "rawpayload=",
    "rawevidence=",
    "credential=",
    "guaranteed roi",
    "guaranteed revenue",
    "guaranteed accuracy",
    "guaranteed security",
    "impossible to hack",
    "liability-free",
    ...REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS,
  ].some((fragment) => normalized.includes(fragment.toLowerCase()));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function deniedResponse() {
  return NextResponse.json(
    { ok: false, status: 404, cache: "no-store" as const, error: "not_available" as const },
    { status: 404, headers: safeHeaders() },
  );
}

function rejectedResponse() {
  return NextResponse.json(
    { ok: false, status: 400, cache: "no-store" as const, error: "safe_summary_required" as const },
    { status: 400, headers: safeHeaders() },
  );
}

function safeHeaders() {
  return {
    "Cache-Control": "no-store, max-age=0",
    "Content-Type": "application/json; charset=utf-8",
    "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
  } as const;
}
