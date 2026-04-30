import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { projectProductionSmokeTarget } from "@/lib/production-smoke-target-runtime";
import { safeDeniedResponse, safeLaunchReadinessHeaders } from "@/lib/platform-launch-readiness-api-runtime";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const smokeInputs = [
  {
    routeGroupKey: "public-conversion-routes",
    route: "/",
    observedPosture: "reachable-public-safe" as const,
    safeSummary: "Homepage route posture matches expected smoke posture without creating launch approval.",
    evidenceId: "smoke-public-home",
    requestIdHash: "smoke-public-home",
  },
  {
    routeGroupKey: "public-conversion-routes",
    route: "/free-check",
    observedPosture: "reachable-public-safe" as const,
    safeSummary: "Free Scan route posture matches expected smoke posture while keeping pending analysis bounded.",
    evidenceId: "smoke-free-check",
    requestIdHash: "smoke-free-check",
  },
  {
    routeGroupKey: "protected-api-routes",
    route: "/api/customer/support/status",
    observedPosture: "generic-safe-denial-without-session" as const,
    safeSummary: "Protected support status route returns expected safe denial posture without customer session.",
    evidenceId: "smoke-support-status-api",
    requestIdHash: "smoke-support-status-api",
  },
  {
    routeGroupKey: "command-center-routes",
    route: "/command-center",
    observedPosture: "closed-by-default" as const,
    safeSummary: "Command center route stays closed by default without operator posture.",
    evidenceId: "smoke-command-center",
    requestIdHash: "smoke-command-center",
  },
  {
    routeGroupKey: "launch-evidence-routes",
    route: "/api/command-center/launch-readiness/evidence",
    observedPosture: "operator-only-safe-projection" as const,
    safeSummary: "Launch evidence route keeps operator-only projection posture and no launch claim from evidence alone.",
    evidenceId: "smoke-launch-evidence",
    requestIdHash: "smoke-launch-evidence",
  },
];

export async function GET() {
  const headerList = await headers();
  const accessState = resolveCommandCenterAccessState(headerList.get(commandCenterPreviewHeaderName()));

  if (!accessState.allowed) {
    const denied = safeDeniedResponse();
    return NextResponse.json(denied, {
      status: denied.status,
      headers: safeLaunchReadinessHeaders(),
    });
  }

  const projection = projectProductionSmokeTarget(smokeInputs);
  const response = {
    ok: true,
    status: 200,
    cache: "no-store" as const,
    smoke: projection,
  };

  return NextResponse.json(response, {
    status: response.status,
    headers: safeLaunchReadinessHeaders(),
  });
}
