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
  "Source of truth",
  "Operator sequence",
  "Validation requirements",
  "The canonical route contract accessor is `getAdminCommandCenterSafeProjectionRouteContract`.",
  "The canonical route contract summary accessor is `getAdminCommandCenterSafeProjectionRouteContractSummary`.",
  "route-contract strip from `getAdminCommandCenterSafeProjectionRouteContract` and `getAdminCommandCenterSafeProjectionRouteContractSummary`",
  "canonical `routeContract` and `routeContractSummary` blocks",
  "method count and all-helpers-required posture",
  "admin-control-panel validator must enforce the canonical route-contract strip and compact route-contract summary",
]);

expect(registryPath, [
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_ROUTE_CONTRACT",
  "getAdminCommandCenterSafeProjectionRouteContract",
  "getAdminCommandCenterSafeProjectionRouteContractSummary",
  "methodCount: contract.methods.length",
  "allHelpersRequired",
  "requiresSafeAccessHelper: true",
  "requiresSafeResponseHelper: true",
  "requiresSafeOptionsHelper: true",
]);

expect(accessPath, ["resolveAdminCommandCenterSafeAccess", "adminCommandCenterAccessDeniedPayload"]);
expect(responsePath, ["ADMIN_COMMAND_CENTER_SAFE_METHODS", "adminCommandCenterJsonNoStore", "adminCommandCenterOptions"]);

for (const routePath of projectionRoutes) {
  expect(routePath, [
    "resolveAdminCommandCenterSafeAccess",
    "adminCommandCenterJsonNoStore",
    "adminCommandCenterOptions",
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

console.log("Admin command center safe projections runbook validation passed with route contract summary docs coverage.");

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
