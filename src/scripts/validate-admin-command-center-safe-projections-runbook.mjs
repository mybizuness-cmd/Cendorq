import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const docPath = "docs/admin-command-center-safe-projections.md";
const registryPath = "src/lib/admin-command-center-safe-projection-registry.ts";
const accessPath = "src/lib/admin-command-center-safe-access.ts";
const responsePath = "src/lib/admin-command-center-safe-response.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(docPath, [
  "# Admin Command Center Safe Projections",
  "Operating posture",
  "Source of truth",
  "Endpoint map",
  "Operator sequence",
  "Validation requirements",
  "preview-gated",
  "All access checks must resolve through the shared safe-access helper.",
  "no-store",
  "read-only review surfaces",
  "posture only",
  "src/lib/admin-command-center-safe-projection-registry.ts",
  "src/lib/admin-command-center-safe-access.ts",
  "src/lib/admin-command-center-safe-response.ts",
  "Do not duplicate the endpoint list in UI or API routes.",
  "Do not duplicate preview-gate access checks in individual projection routes.",
  "resolveAdminCommandCenterSafeAccess",
  "adminCommandCenterAccessDeniedPayload",
  "Do not duplicate response headers in individual projection routes.",
  "adminCommandCenterJsonNoStore",
  "no-store and noindex behavior remains consistent",
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
  "shared safe-response validator",
  "shared access helper through route-level validation anchors",
]);

expect(registryPath, [
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_LINKS",
  "getAdminCommandCenterSafeProjectionLinks",
  "/api/admin/command-center",
  "/api/admin/command-center/summary",
  "/api/admin/command-center/audit",
  "/api/admin/command-center/mission-brief",
  "/api/admin/command-center/agent-findings",
  "/api/admin/command-center/forecast-escalation",
]);

expect(accessPath, [
  "resolveAdminCommandCenterSafeAccess",
  "adminCommandCenterAccessDeniedPayload",
  "Command center access is closed.",
]);

expect(responsePath, [
  "ADMIN_COMMAND_CENTER_SAFE_RESPONSE_HEADERS",
  "adminCommandCenterJsonNoStore",
  "no-store, max-age=0",
  "noindex, nofollow, noarchive",
]);

expect(routesChainPath, [
  "src/scripts/validate-admin-command-center-safe-projections-runbook.mjs",
  "src/scripts/validate-admin-command-center-safe-response.mjs",
]);

forbidden(docPath, [
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
]);

if (failures.length) {
  console.error("Admin command center safe projections runbook validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center safe projections runbook validation passed with shared access and response helper coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
