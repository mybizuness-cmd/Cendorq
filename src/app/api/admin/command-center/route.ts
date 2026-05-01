import { NextRequest, NextResponse } from "next/server";

import {
  getAdminCommandCenterSafeProjectionBoundaries,
  getAdminCommandCenterSafeProjectionLinks,
} from "@/lib/admin-command-center-safe-projection-registry";
import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return jsonNoStore({ ok: true, methods: ["GET", "OPTIONS"], projection: "admin-command-center-api-index" }, 200);
}

export async function GET(request: NextRequest) {
  const accessState = resolveCommandCenterAccessState(request.headers.get(commandCenterPreviewHeaderName()));
  if (!accessState.allowed) {
    return jsonNoStore({ ok: false, error: "Command center access is closed.", projection: "admin-command-center-api-index" }, 403);
  }

  return jsonNoStore(
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

function jsonNoStore(payload: unknown, status: number) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
