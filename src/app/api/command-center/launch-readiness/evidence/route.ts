import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { projectLaunchEvidenceBatch, summarizeLaunchEvidenceReadiness } from "@/lib/launch-evidence-persistence-runtime";
import { safeDeniedResponse, safeLaunchReadinessHeaders } from "@/lib/platform-launch-readiness-api-runtime";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const evidenceInputs = [
  {
    evidenceType: "owner-configuration-evidence" as const,
    status: "pending" as const,
    safeSummary: "Owner configuration evidence requires review before launch claim review.",
    blockerKey: "owner-configuration",
    checklistKey: "auth-provider",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/launch-readiness/evidence",
    requestIdHash: "owner-configuration-evidence",
  },
  {
    evidenceType: "production-smoke-evidence" as const,
    status: "pending" as const,
    safeSummary: "Production smoke evidence requires review before launch claim review.",
    blockerKey: "production-smoke-target",
    checklistKey: "production-smoke",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/launch-readiness/evidence",
    requestIdHash: "production-smoke-evidence",
  },
  {
    evidenceType: "rollback-evidence" as const,
    status: "pending" as const,
    safeSummary: "Rollback evidence requires review before launch claim review.",
    blockerKey: "rollback-evidence",
    checklistKey: "rollback-plan",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/launch-readiness/evidence",
    requestIdHash: "rollback-evidence",
  },
  {
    evidenceType: "audit-evidence" as const,
    status: "pending" as const,
    safeSummary: "Audit evidence requires review before launch claim review.",
    blockerKey: "audit-evidence",
    checklistKey: "audit-plan",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/launch-readiness/evidence",
    requestIdHash: "audit-evidence",
  },
  {
    evidenceType: "hard-lock-clearance-evidence" as const,
    status: "blocked" as const,
    safeSummary: "Hard-lock clearance evidence remains blocked until release review confirms clearance.",
    blockerKey: "hard-lock-clearance",
    checklistKey: "controlled-maintenance",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/launch-readiness/evidence",
    requestIdHash: "hard-lock-clearance-evidence",
  },
];

export async function GET() {
  const headerList = await headers();
  const accessState = resolveCommandCenterAccessState(headerList.get(commandCenterPreviewHeaderName()));

  if (!accessState.allowed) {
    const denied = safeDeniedResponse();
    return NextResponse.json(denied, {
      status: denied.status,
      headers: safeLaunchReadinessHeaders(),
    });
  }

  const response = {
    ok: true,
    status: 200,
    cache: "no-store" as const,
    summary: summarizeLaunchEvidenceReadiness(evidenceInputs),
    evidence: projectLaunchEvidenceBatch(evidenceInputs),
  };

  return NextResponse.json(response, {
    status: response.status,
    headers: safeLaunchReadinessHeaders(),
  });
}
