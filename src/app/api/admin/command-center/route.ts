import { NextRequest } from "next/server";

import {
  getAdminCommandCenterSafeProjectionBoundaries,
  getAdminCommandCenterSafeProjectionLinks,
} from "@/lib/admin-command-center-safe-projection-registry";
import { adminCommandCenterJsonNoStore } from "@/lib/admin-command-center-safe-response";
import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return adminCommandCenterJsonNoStore({ ok: true, methods: ["GET", "OPTIONS"], projection: "admin-command-center-api-index" }, 200);
}

export async function GET(request: NextRequest) {
  const accessState = resolveCommandCenterAccessState(request.headers.get(commandCenterPreviewHeaderName()));
  if (!accessState.allowed) {
    return adminCommandCenterJsonNoStore({ ok: false, error: "Command center access is closed.", projection: "admin-command-center-api-index" }, 403);
  }

  return adminCommandCenterJsonNoStore(
    {
      ok: true,
      projection: "admin-command-center-api-index",
      accessMode: accessState.mode,
      closedByDefault: true,
      noStoreRequired: true,
      readOnly: true,
      grantsLiveAuthority: false,
      endpoints: getAdminCommandCenterSafeProjectionLinks().map((endpoint) => ({
        key: endpoint.key,
        path: endpoint.href,
        projection: endpoint.projection,
        purpose: endpoint.purpose,
      })),
      boundaries: getAdminCommandCenterSafeProjectionBoundaries(),
    },
    200,
  );
}
