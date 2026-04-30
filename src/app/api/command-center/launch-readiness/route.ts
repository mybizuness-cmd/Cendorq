import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { getLaunchReadinessProjectionResponse, safeDeniedResponse, safeLaunchReadinessHeaders } from "@/lib/platform-launch-readiness-api-runtime";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const headerList = await headers();
  const accessState = resolveCommandCenterAccessState(headerList.get(commandCenterPreviewHeaderName()));

  const response = accessState.allowed
    ? getLaunchReadinessProjectionResponse(
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
          requestIdHash: "launch-readiness-route",
        },
      )
    : safeDeniedResponse();

  return NextResponse.json(response, {
    status: response.status,
    headers: safeLaunchReadinessHeaders(),
  });
}
