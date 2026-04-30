import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { projectLaunchEvidence, type LaunchEvidenceInput } from "@/lib/launch-evidence-persistence-runtime";
import { safeDeniedResponse, safeLaunchReadinessHeaders } from "@/lib/platform-launch-readiness-api-runtime";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const headerList = await headers();
  const accessState = resolveCommandCenterAccessState(headerList.get(commandCenterPreviewHeaderName()));

  if (!accessState.allowed) {
    const denied = safeDeniedResponse();
    return NextResponse.json(denied, {
      status: denied.status,
      headers: safeLaunchReadinessHeaders(),
    });
  }

  const body = await readSafeEvidenceBody(request);
  const projected = projectLaunchEvidence(body);
  const response = {
    ok: projected.ok,
    status: projected.ok ? 202 : 400,
    cache: "no-store" as const,
    evidence: projected,
  };

  return NextResponse.json(response, {
    status: response.status,
    headers: safeLaunchReadinessHeaders(),
  });
}

async function readSafeEvidenceBody(request: Request): Promise<LaunchEvidenceInput> {
  try {
    const body = (await request.json()) as Partial<LaunchEvidenceInput>;
    return {
      evidenceType: body.evidenceType ?? "owner-configuration-evidence",
      status: body.status ?? "pending",
      safeSummary: typeof body.safeSummary === "string" ? body.safeSummary : "Launch evidence submitted for operator review.",
      blockerKey: typeof body.blockerKey === "string" ? body.blockerKey : "owner-configuration",
      checklistKey: typeof body.checklistKey === "string" ? body.checklistKey : "auth-provider",
      recordedByRole: typeof body.recordedByRole === "string" ? body.recordedByRole : "operator",
      sourceRoute: "/api/command-center/launch-readiness/evidence/record",
      requestIdHash: typeof body.requestIdHash === "string" ? body.requestIdHash : "launch-evidence-record-route",
    };
  } catch {
    return {
      evidenceType: "owner-configuration-evidence",
      status: "blocked",
      safeSummary: "Launch evidence submission could not be parsed safely.",
      blockerKey: "owner-configuration",
      checklistKey: "auth-provider",
      recordedByRole: "operator",
      sourceRoute: "/api/command-center/launch-readiness/evidence/record",
      requestIdHash: "launch-evidence-record-parse-failure",
    };
  }
}
