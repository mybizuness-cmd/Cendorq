import { NextRequest, NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { getCommandCenterConfigStatus, summarizeCommandCenterConfigStatus } from "@/lib/command-center/config-status";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
} as const;

export async function GET(request: NextRequest) {
  const accessState = resolveCommandCenterAccessState(request.headers.get(commandCenterPreviewHeaderName()));

  if (!accessState.allowed) {
    return jsonNoStore({ ok: false, error: "The Command Center readiness endpoint is not authorized." }, 401);
  }

  const checks = getCommandCenterConfigStatus();
  const summary = summarizeCommandCenterConfigStatus(checks);

  return jsonNoStore({ ok: true, summary, checks }, 200);
}

function jsonNoStore(payload: unknown, status: number) {
  return NextResponse.json(payload, { status, headers: NO_STORE_HEADERS });
}
