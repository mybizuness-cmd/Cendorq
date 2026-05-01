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
  "Do not duplicate route contract metadata in UI or API routes.",
  "methods and helper requirements",
  "resolveAdminCommandCenterSafeAccess",
  "adminCommandCenterAccessDeniedPayload",
  "adminCommandCenterJsonNoStore",
  "adminCommandCenterOptions",
  "ADMIN_COMMAND_CENTER_SAFE_METHODS",
  "safe-projections validator must enforce shared `OPTIONS` helper coverage across every admin command-center projection route",
  "registry validator and API-index validator must enforce route contract metadata",
]);

expect(registryPath, [
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_LINKS",
  "ADMIN_COMMAND_CENTER_SAFE_METHODS",
  "safeProjectionRouteContract",
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
]);

if (failures.length) {
  console.error("Admin command center safe projections runbook validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center safe projections runbook validation passed with full shared access, response, options, registry contract, and route coverage.");

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
