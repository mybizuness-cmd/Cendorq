import type { NextRequest } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";

export type AdminCommandCenterSafeAccessProjection = ReturnType<typeof resolveCommandCenterAccessState>;

export function resolveAdminCommandCenterSafeAccess(request: NextRequest): AdminCommandCenterSafeAccessProjection {
  return resolveCommandCenterAccessState(request.headers.get(commandCenterPreviewHeaderName()));
}

export function adminCommandCenterAccessDeniedPayload(projection: string) {
  return {
    ok: false,
    error: "Command center access is closed.",
    projection,
  } as const;
}
