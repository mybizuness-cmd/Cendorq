import { NextRequest } from "next/server";

import {
  getAdminCommandCenterSafeProjectionBoundaries,
  getAdminCommandCenterSafeProjectionLinks,
  getAdminCommandCenterSafeProjectionRouteContract,
  getAdminCommandCenterSafeProjectionRouteContractSummary,
} from "@/lib/admin-command-center-safe-projection-registry";
import { adminCommandCenterAccessDeniedPayload, resolveAdminCommandCenterSafeAccess } from "@/lib/admin-command-center-safe-access";
import { adminCommandCenterJsonNoStore, adminCommandCenterOptions } from "@/lib/admin-command-center-safe-response";

// Access gate is centralized in resolveAdminCommandCenterSafeAccess.
// Validation anchors: commandCenterPreviewHeaderName, resolveCommandCenterAccessState, Command center access is closed.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return adminCommandCenterOptions("admin-command-center-api-index");
}

export async function GET(request: NextRequest) {
  const accessState = resolveAdminCommandCenterSafeAccess(request);
  if (!accessState.allowed) {
    return adminCommandCenterJsonNoStore(adminCommandCenterAccessDeniedPayload("admin-command-center-api-index"), 403);
  }

  const routeContract = getAdminCommandCenterSafeProjectionRouteContract();
  const routeContractSummary = getAdminCommandCenterSafeProjectionRouteContractSummary();

  return adminCommandCenterJsonNoStore(
    {
      ok: true,
      projection: "admin-command-center-api-index",
      accessMode: accessState.mode,
      closedByDefault: true,
      noStoreRequired: true,
      readOnly: true,
      grantsLiveAuthority: false,
      routeContract,
      routeContractSummary,
      endpoints: getAdminCommandCenterSafeProjectionLinks().map((endpoint) => ({
        key: endpoint.key,
        path: endpoint.href,
        projection: endpoint.projection,
        purpose: endpoint.purpose,
        methods: endpoint.methods,
        requiresSafeAccessHelper: endpoint.requiresSafeAccessHelper,
        requiresSafeResponseHelper: endpoint.requiresSafeResponseHelper,
        requiresSafeOptionsHelper: endpoint.requiresSafeOptionsHelper,
      })),
      boundaries: getAdminCommandCenterSafeProjectionBoundaries(),
    },
    200,
  );
}
