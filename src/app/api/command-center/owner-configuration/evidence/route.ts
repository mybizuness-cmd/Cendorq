import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { OWNER_CONFIGURATION_EVIDENCE_CONTRACT } from "@/lib/owner-configuration-evidence-contracts";
import {
  summarizeOwnerConfigurationEvidence,
  type OwnerConfigurationApprovalStatus,
  type OwnerConfigurationAreaKey,
  type OwnerConfigurationEvidenceInput,
} from "@/lib/owner-configuration-evidence-runtime";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const sourceRoute = "/api/command-center/owner-configuration/evidence";

const defaultEvidenceInputs: readonly OwnerConfigurationEvidenceInput[] = [
  {
    areaKey: "auth-provider-configuration",
    approvalStatus: "pending",
    safeSummary: "Auth provider evidence is pending owner approval and does not create launch readiness.",
    recordedByRole: "operator",
    sourceRoute,
    requestIdHash: "owner-auth-provider-evidence",
  },
  {
    areaKey: "payment-mapping-configuration",
    approvalStatus: "pending",
    safeSummary: "Payment mapping evidence is pending owner approval and does not create paid launch readiness.",
    recordedByRole: "operator",
    sourceRoute,
    requestIdHash: "owner-payment-mapping-evidence",
  },
  {
    areaKey: "protected-runtime-configuration",
    approvalStatus: "pending",
    safeSummary: "Protected runtime evidence is pending owner approval and must stay server-side without browser exposure.",
    recordedByRole: "operator",
    sourceRoute,
    requestIdHash: "owner-protected-runtime-evidence",
  },
  {
    areaKey: "launch-contact-configuration",
    approvalStatus: "missing",
    safeSummary: "Launch contact evidence is missing and must be recorded before launch review.",
    recordedByRole: "operator",
    sourceRoute,
    requestIdHash: "owner-launch-contact-evidence",
  },
  {
    areaKey: "support-identity-configuration",
    approvalStatus: "pending",
    safeSummary: "Support identity evidence is pending owner approval and must preserve safe support language.",
    recordedByRole: "operator",
    sourceRoute,
    requestIdHash: "owner-support-identity-evidence",
  },
];

export async function GET() {
  if (!(await hasCommandCenterAccess())) return deniedResponse();

  const summary = summarizeOwnerConfigurationEvidence(defaultEvidenceInputs);

  return NextResponse.json(
    {
      ok: true,
      status: 200,
      cache: "no-store" as const,
      route: sourceRoute,
      commandCenterOnly: true,
      publicLaunchAllowed: false,
      paidLaunchAllowed: false,
      reportLaunchAllowed: false,
      securityReadinessApproved: false,
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

  const summary = summarizeOwnerConfigurationEvidence(inputs);

  return NextResponse.json(
    {
      ok: true,
      status: 202,
      cache: "no-store" as const,
      route: sourceRoute,
      commandCenterOnly: true,
      acceptedInput: "safe-summary-only" as const,
      publicLaunchAllowed: false,
      paidLaunchAllowed: false,
      reportLaunchAllowed: false,
      securityReadinessApproved: false,
      summary,
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

function parseEvidenceInputs(body: unknown): OwnerConfigurationEvidenceInput[] {
  const records = Array.isArray(body) ? body : isRecord(body) && Array.isArray(body.evidence) ? body.evidence : [];

  return records.flatMap((record) => {
    if (!isRecord(record)) return [];

    const areaKey = safeAreaKey(record.areaKey);
    if (!areaKey) return [];

    return [
      {
        areaKey,
        approvalStatus: safeApprovalStatus(record.approvalStatus),
        safeSummary: typeof record.safeSummary === "string" ? record.safeSummary : undefined,
        recordedByRole: typeof record.recordedByRole === "string" ? record.recordedByRole : "operator",
        sourceRoute,
        requestIdHash: typeof record.requestIdHash === "string" ? record.requestIdHash : `owner-config-${areaKey}`,
      },
    ];
  });
}

function safeAreaKey(value: unknown): OwnerConfigurationAreaKey | null {
  if (typeof value !== "string") return null;
  const area = OWNER_CONFIGURATION_EVIDENCE_CONTRACT.evidenceAreas.find((candidate) => candidate.key === value);
  return area?.key ?? null;
}

function safeApprovalStatus(value: unknown): OwnerConfigurationApprovalStatus {
  if (value === "approved" || value === "pending" || value === "missing" || value === "blocked") return value;
  return "missing";
}

function containsBlockedEvidenceShape(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(containsBlockedEvidenceShape);
  if (!isRecord(value)) return false;

  for (const [key, nestedValue] of Object.entries(value)) {
    const normalizedKey = key.toLowerCase();
    const blockedField = OWNER_CONFIGURATION_EVIDENCE_CONTRACT.blockedProjectionFields.some((field) => normalizedKey.includes(field.toLowerCase()));
    if (blockedField) return true;
    if (typeof nestedValue === "string" && containsUnsafeFragment(nestedValue)) return true;
    if (containsBlockedEvidenceShape(nestedValue)) return true;
  }

  return false;
}

function containsUnsafeFragment(value: string) {
  const normalized = value.toLowerCase();
  return ["secret=", "password=", "token=", "key=", "rawpayload=", "rawevidence="].some((fragment) => normalized.includes(fragment));
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
