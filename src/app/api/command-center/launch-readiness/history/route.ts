import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { getLaunchReadinessAuditHistoryResponse, safeDeniedResponse, safeLaunchReadinessHeaders, type LaunchReadinessSafeAuditRecord } from "@/lib/platform-launch-readiness-api-runtime";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const safeHistory: readonly LaunchReadinessSafeAuditRecord[] = [
  {
    auditId: "launch-readiness-bootstrap",
    decision: "ready-for-production-smoke",
    safeSummaryHash: "bootstrap",
    readyGroupKeys: ["public-entry-and-free-scan", "customer-platform-handoffs", "reports-and-vault", "billing-and-entitlements", "support-and-command-center", "maintenance-and-smoke"],
    blockedGroupKeys: ["auth-session-and-welcome"],
    evidenceGapKeys: ["production-smoke", "owner-auth-payment-config", "rollback-plan", "audit-plan"],
    safeNextActionKeys: ["configure-production-smoke", "confirm-owner-configuration", "record-rollback-and-audit-plan"],
    hardLaunchLockKeys: ["no-public-launch-without-smoke", "no-browser-stored-authority", "no-raw-internal-exposure"],
    blockedPatternKeys: ["launchWithoutProductionSmoke", "launchWithoutAuthProvider", "launchWithoutPaymentLinkMapping"],
    reviewedByRole: "operator",
    reviewReason: "bootstrap safe launch readiness history projection",
    reviewedAt: new Date(0).toISOString(),
    sourceRoute: "/api/command-center/launch-readiness/history",
    requestIdHash: "launch-readiness-history-bootstrap",
  },
];

export async function GET() {
  const headerList = await headers();
  const accessState = resolveCommandCenterAccessState(headerList.get(commandCenterPreviewHeaderName()));
  const response = accessState.allowed
    ? getLaunchReadinessAuditHistoryResponse(
        {
          commandCenterAllowed: true,
          operatorApproved: accessState.mode === "preview",
          reviewedByRole: "operator",
          requestIdHash: "launch-readiness-history-route",
        },
        safeHistory,
      )
    : safeDeniedResponse();

  return NextResponse.json(response, {
    status: response.status,
    headers: safeLaunchReadinessHeaders(),
  });
}
