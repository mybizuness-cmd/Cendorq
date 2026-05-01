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
  "preview-gated",
  "no-store",
  "read-only review surfaces",
  "posture only",
  "src/lib/admin-command-center-safe-projection-registry.ts",
  "src/lib/admin-command-center-safe-access.ts",
  "src/lib/admin-command-center-safe-response.ts",
]);

expect(docPath, [
  "getAdminCommandCenterSafeProjectionRouteContract",
  "getAdminCommandCenterSafeProjectionRouteContractSummary",
  "route-contract strip",
  "routeContractSummary",
  "method count",
  "all-helpers-required",
  "resolveAdminCommandCenterSafeAccess",
  "adminCommandCenterAccessDeniedPayload",
  "adminCommandCenterJsonNoStore",
  "adminCommandCenterOptions",
  "ADMIN_COMMAND_CENTER_SAFE_METHODS",
]);

expect(docPath, [
  "/api/admin/command-center",
  "/api/admin/command-center/summary",
  "/api/admin/command-center/audit",
  "/api/admin/command-center/mission-brief",
  "/api/admin/command-center/agent-findings",
  "/api/admin/command-center/forecast-escalation",
  "validate-admin-command-center-projection-registry.mjs",
  "validate-admin-command-center-safe-response.mjs",
  "validate-admin-command-center-api-index.mjs",
  "validate-command-center-admin-control-panel.mjs",
  "validate-routes-chain.mjs",
]);

expect(registryPath, [
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_LINKS",
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_BOUNDARIES",
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_ROUTE_CONTRACT",
  "getAdminCommandCenterSafeProjectionRouteContract",
  "getAdminCommandCenterSafeProjectionRouteContractSummary",
  "methodCount: contract.methods.length",
  "allHelpersRequired",
  "requiresSafeAccessHelper: true",
  "requiresSafeResponseHelper: true",
  "requiresSafeOptionsHelper: true",
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

console.log("Admin command center safe projections runbook validation passed with restored route, helper, contract, and docs coverage.");

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
