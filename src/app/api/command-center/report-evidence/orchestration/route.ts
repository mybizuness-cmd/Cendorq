import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import {
  REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS,
  type ReportEvidencePlanFit,
  type ReportEvidenceSourceTier,
  type ReportEvidenceTrustLevel,
} from "@/lib/command-center/report-evidence-orchestration";
import {
  projectReportEvidenceRuntime,
  type ReportEvidenceRuntimeInput,
} from "@/lib/command-center/report-evidence-orchestration-runtime";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const sourceRoute = "/api/command-center/report-evidence/orchestration";

const defaultEvidenceInputs: readonly ReportEvidenceRuntimeInput[] = [
  {
    evidenceKey: "customer-claim-check",
    sourceTier: "customer-context",
    trustLevel: "limited",
    planFit: "deep-review",
    summary: "Customer-provided claim requires supporting evidence before report use.",
    customerClaimPresent: true,
    customerClaimSupported: false,
    limitationsVisible: true,
    safeNextActionVisible: true,
    planFitEvidencePresent: true,
    releaseCaptainReviewed: false,
  },
  {
    evidenceKey: "owned-surface-observation",
    sourceTier: "owned-business-surface",
    trustLevel: "strong",
    planFit: "build-fix",
    summary: "Owned surface observation can support a blocker only after release-captain review.",
    limitationsVisible: true,
    safeNextActionVisible: true,
    planFitEvidencePresent: true,
    releaseCaptainReviewed: false,
  },
  {
    evidenceKey: "conflict-resolution-path",
    sourceTier: "safe-public-signal",
    trustLevel: "conflicted",
    planFit: "ongoing-control",
    summary: "Public signal conflict requires disclosure and resolution before stronger output.",
    hasEvidenceConflict: true,
    limitationsVisible: true,
    safeNextActionVisible: true,
    planFitEvidencePresent: true,
    releaseCaptainReviewed: false,
  },
];

export async function GET() {
  if (!(await hasCommandCenterAccess())) return deniedResponse();

  const summary = projectReportEvidenceRuntime(defaultEvidenceInputs);

  return NextResponse.json(
    {
      ok: true,
      status: 200,
      cache: "no-store" as const,
      route: sourceRoute,
      commandCenterOnly: true,
      acceptedInput: "safe-summary-only" as const,
      persistenceMode: "safe-projection-only" as const,
      customerFacingOutputApproved: false,
      publicReportReleaseApproved: false,
      paidPlanRecommendationApproved: false,
      rawEvidenceExposed: false,
      summary,
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

  const summary = projectReportEvidenceRuntime(inputs);

  return NextResponse.json(
    {
      ok: true,
      status: 200,
      cache: "no-store" as const,
      route: sourceRoute,
      commandCenterOnly: true,
      acceptedInput: "safe-summary-only" as const,
      persistenceMode: "safe-projection-only" as const,
      customerFacingOutputApproved: false,
      publicReportReleaseApproved: false,
      paidPlanRecommendationApproved: false,
      rawEvidenceExposed: false,
      summary,
    },
    { status: 200, headers: safeHeaders() },
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
        evidenceKey: getString(record, "evidenceKey") ?? `${sourceTier}-${trustLevel}-evidence`,
        sourceTier,
        trustLevel,
        planFit: safePlanFit(record.planFit),
        summary: getString(record, "summary") ?? "Safe report evidence summary pending review.",
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
  if (value === "verified" || value === "strong" || value === "moderate" || value === "limited" || value === "missing" || value === "conflicted") {
    return value;
  }

  return null;
}

function safePlanFit(value: unknown): ReportEvidencePlanFit | undefined {
  if (value === "free-scan" || value === "deep-review" || value === "build-fix" || value === "ongoing-control") return value;
  return undefined;
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
