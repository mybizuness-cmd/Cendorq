import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const docPath = "docs/admin-command-center-safe-projections.md";
const registryPath = "src/lib/admin-command-center-safe-projection-registry.ts";
const accessPath = "src/lib/admin-command-center-safe-access.ts";
const responsePath = "src/lib/admin-command-center-safe-response.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const projectionRoutes = [
  "src/app/api/admin/command-center/route.ts",
  "src/app/api/admin/command-center/summary/route.ts",
  "src/app/api/admin/command-center/audit/route.ts",
  "src/app/api/admin/command-center/mission-brief/route.ts",
  "src/app/api/admin/command-center/agent-findings/route.ts",
  "src/app/api/admin/command-center/forecast-escalation/route.ts",
];
const failures = [];

expect(docPath, [
  "# Admin Command Center Safe Projections",
  "Operating posture",
  "Source of truth",
  "Endpoint map",
  "Operator sequence",
  "Validation requirements",
  "All access checks must resolve through the shared safe-access helper.",
  "OPTIONS responses must resolve through the shared safe-options helper and canonical safe method list.",
  "The canonical endpoint list and route contract metadata live in `src/lib/admin-command-center-safe-projection-registry.ts`.",
  "The canonical route contract accessor is `getAdminCommandCenterSafeProjectionRouteContract`.",
  "The private command-center panel and API index must expose each registry entry's methods and helper requirements",
  "The private API index must also expose a canonical `routeContract` block from `getAdminCommandCenterSafeProjectionRouteContract`",
  "Confirm the panel displays each registry entry's methods and helper requirements.",
  "Review the API index to confirm the endpoint map, canonical `routeContract`, and per-route contract metadata.",
  "methods and helper requirements",
  "resolveAdminCommandCenterSafeAccess",
  "adminCommandCenterAccessDeniedPayload",
  "adminCommandCenterJsonNoStore",
  "adminCommandCenterOptions",
  "ADMIN_COMMAND_CENTER_SAFE_METHODS",
  "safe-projections validator must enforce shared `OPTIONS` helper coverage across every admin command-center projection route",
  "registry validator, API-index validator, and admin-control-panel validator must enforce route contract metadata",
  "API-index validator must enforce the canonical `routeContract` response block from `getAdminCommandCenterSafeProjectionRouteContract`",
]);

expect(registryPath, [
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_LINKS",
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_ROUTE_CONTRACT",
  "getAdminCommandCenterSafeProjectionRouteContract",
  "ADMIN_COMMAND_CENTER_SAFE_METHODS",
  "requiresSafeAccessHelper: true",
  "requiresSafeResponseHelper: true",
  "requiresSafeOptionsHelper: true",
  "getAdminCommandCenterSafeProjectionLinks",
  "/api/admin/command-center/forecast-escalation",
]);

expect(accessPath, [
  "resolveAdminCommandCenterSafeAccess",
  "adminCommandCenterAccessDeniedPayload",
  "Command center access is closed.",
]);

expect(responsePath, [
  "ADMIN_COMMAND_CENTER_SAFE_RESPONSE_HEADERS",
  "ADMIN_COMMAND_CENTER_SAFE_METHODS",
  "adminCommandCenterJsonNoStore",
  "adminCommandCenterOptions",
  "no-store, max-age=0",
  "noindex, nofollow, noarchive",
]);

for (const routePath of projectionRoutes) {
  expect(routePath, [
    "resolveAdminCommandCenterSafeAccess",
    "adminCommandCenterAccessDeniedPayload",
    "@/lib/admin-command-center-safe-access",
    "adminCommandCenterJsonNoStore",
    "adminCommandCenterOptions",
    "return adminCommandCenterOptions(",
    "@/lib/admin-command-center-safe-response",
    "runtime = \"nodejs\"",
    "dynamic = \"force-dynamic\"",
  ]);
}

expect(routesChainPath, [
  "src/scripts/validate-admin-command-center-safe-projections-runbook.mjs",
  "src/scripts/validate-admin-command-center-safe-response.mjs",
  "src/scripts/validate-command-center-admin-control-panel.mjs",
]);

if (failures.length) {
  console.error("Admin command center safe projections runbook validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center safe projections runbook validation passed with API-index routeContract block coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
