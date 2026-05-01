import { NextRequest, NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const safeProjectionEndpoints = [
  {
    key: "summary",
    path: "/api/admin/command-center/summary",
    projection: "admin-command-center-safe-summary",
    purpose: "Foundation, access, mission, findings, forecast, and audit posture.",
  },
  {
    key: "audit-trail",
    path: "/api/admin/command-center/audit",
    projection: "admin-command-center-audit-trail",
    purpose: "Safe audit event projections for operator review.",
  },
  {
    key: "mission-brief",
    path: "/api/admin/command-center/mission-brief",
    projection: "admin-command-center-mission-brief",
    purpose: "Chief-agent mission brief readiness before dispatch.",
  },
  {
    key: "agent-findings",
    path: "/api/admin/command-center/agent-findings",
    projection: "admin-command-center-agent-findings",
    purpose: "Structured agent and scout findings posture.",
  },
  {
    key: "forecast-escalation",
    path: "/api/admin/command-center/forecast-escalation",
    projection: "admin-command-center-forecast-escalation",
    purpose: "Expansion, hardening, risk coverage, and escalation posture.",
  },
] as const;

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
      endpoints: safeProjectionEndpoints,
      boundaries: [
        "preview-gated command-center access",
        "no-store responses",
        "safe projections only",
        "read-only index",
        "review-only operating posture",
        "separate approval gates for action lanes",
      ],
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
