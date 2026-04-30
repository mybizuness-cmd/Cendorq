import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { recordLaunchReadinessAudit, safeDeniedResponse, safeLaunchReadinessHeaders } from "@/lib/platform-launch-readiness-api-runtime";

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

  const body = await readSafeAuditBody(request);
  const response = recordLaunchReadinessAudit(
    {
      verifiedMain: true,
      validateRoutesWired: true,
      validateRoutesPassing: true,
      vercelGreen: true,
      productionSmokeConfigured: false,
      productionSmokePassed: false,
      ownerPaymentConfigReady: false,
      authProviderConfigured: false,
      serverOnlySecretsConfigured: false,
      rollbackPlanReady: false,
      auditPlanReady: false,
      publicEntryReady: true,
      freeScanReady: true,
      customerHandoffsReady: true,
      reportsReady: true,
      billingReady: true,
      supportAndCommandCenterReady: true,
      maintenanceReady: true,
      criticalLockActive: false,
    },
    {
      commandCenterAllowed: true,
      operatorApproved: accessState.mode === "preview",
      reviewedByRole: "operator",
      requestIdHash: "launch-readiness-audit-route",
    },
    {
      decision: body.decision,
      reviewReason: body.reviewReason,
      sourceRoute: "/api/command-center/launch-readiness/audit",
      idempotencyKeyHash: body.idempotencyKeyHash,
    },
  );

  return NextResponse.json(response, {
    status: response.status,
    headers: safeLaunchReadinessHeaders(),
  });
}

async function readSafeAuditBody(request: Request) {
  try {
    const parsed = (await request.json()) as {
      decision?: "blocked" | "ready-for-owner-review" | "ready-for-production-smoke" | "ready-for-limited-launch" | "ready-for-public-launch";
      reviewReason?: string;
      idempotencyKeyHash?: string;
    };

    return {
      decision: parsed.decision ?? "blocked",
      reviewReason: typeof parsed.reviewReason === "string" ? parsed.reviewReason : "operator review recorded",
      idempotencyKeyHash: typeof parsed.idempotencyKeyHash === "string" ? parsed.idempotencyKeyHash : undefined,
    };
  } catch {
    return {
      decision: "blocked" as const,
      reviewReason: "operator review parse failure",
      idempotencyKeyHash: undefined,
    };
  }
}
