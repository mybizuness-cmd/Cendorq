import { PRODUCTION_SMOKE_TARGET_CONTRACT } from "./production-smoke-target-contracts";

export type ProductionSmokeObservedPosture =
  | "reachable-public-safe"
  | "safe-auth-boundary-or-safe-render"
  | "generic-safe-denial-without-session"
  | "closed-by-default"
  | "operator-only-safe-projection"
  | "unexpected";

export type ProductionSmokeRouteInput = {
  routeGroupKey: string;
  route: string;
  observedPosture?: ProductionSmokeObservedPosture;
  safeSummary?: string;
  evidenceId?: string;
  requestIdHash?: string;
};

export type ProductionSmokeRouteProjection = {
  smokeRunId: string;
  targetName: string;
  routeGroupKey: string;
  route: string;
  expectedPosture: string;
  observedPosture: ProductionSmokeObservedPosture;
  result: "pass" | "blocked";
  checkedAt: string;
  safeSummary: string;
  evidenceId: string;
  requestIdHash: string;
};

export type ProductionSmokeTargetSummary = {
  ok: boolean;
  targetName: string;
  passCount: number;
  blockedCount: number;
  publicLaunchAllowed: false;
  records: readonly ProductionSmokeRouteProjection[];
};

export function projectProductionSmokeTarget(inputs: readonly ProductionSmokeRouteInput[]): ProductionSmokeTargetSummary {
  const records = inputs.map(projectProductionSmokeRoute);
  const blockedCount = records.filter((record) => record.result === "blocked").length;

  return {
    ok: blockedCount === 0,
    targetName: PRODUCTION_SMOKE_TARGET_CONTRACT.name,
    passCount: records.length - blockedCount,
    blockedCount,
    publicLaunchAllowed: false,
    records,
  };
}

export function projectProductionSmokeRoute(input: ProductionSmokeRouteInput): ProductionSmokeRouteProjection {
  const group = PRODUCTION_SMOKE_TARGET_CONTRACT.routeGroups.find((candidate) => candidate.key === input.routeGroupKey);
  const expectedPosture = group?.expectedPosture ?? "unexpected";
  const observedPosture = input.observedPosture ?? "unexpected";
  const allowedRoute = Boolean(group?.routes.includes(input.route));
  const matchesExpectedPosture = observedPosture === expectedPosture;

  return {
    smokeRunId: `production-smoke-${stableHash(`${input.routeGroupKey}:${input.route}`)}`,
    targetName: PRODUCTION_SMOKE_TARGET_CONTRACT.name,
    routeGroupKey: safeText(input.routeGroupKey),
    route: safeRoute(input.route),
    expectedPosture,
    observedPosture,
    result: allowedRoute && matchesExpectedPosture ? "pass" : "blocked",
    checkedAt: new Date(0).toISOString(),
    safeSummary: safeText(input.safeSummary ?? getDefaultSummary(matchesExpectedPosture, expectedPosture, observedPosture)),
    evidenceId: safeText(input.evidenceId ?? `smoke-evidence-${stableHash(input.route)}`),
    requestIdHash: safeText(input.requestIdHash ?? `smoke-request-${stableHash(input.routeGroupKey)}`),
  };
}

function getDefaultSummary(matchesExpectedPosture: boolean, expectedPosture: string, observedPosture: string) {
  if (matchesExpectedPosture) return `Observed posture matches expected posture: ${expectedPosture}.`;
  return `Observed posture ${observedPosture} does not match expected posture ${expectedPosture}.`;
}

function safeRoute(value: string) {
  const normalized = safeText(value);
  if (normalized.startsWith("/")) return normalized;
  return "/";
}

function safeText(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().slice(0, 240);
  if (!normalized) return "redacted-safe-empty";
  const lower = normalized.toLowerCase();
  const blocked = PRODUCTION_SMOKE_TARGET_CONTRACT.blockedSmokeRecordFields;
  if (blocked.some((field) => lower.includes(field.toLowerCase()))) return "redacted-safe-value";
  if (["secret=", "password=", "token=", "key=", "rawpayload=", "rawevidence="].some((fragment) => lower.includes(fragment))) return "redacted-safe-value";
  return normalized;
}

function stableHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}
