import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const registryPath = "src/lib/admin-command-center-safe-projection-registry.ts";
const apiValidatorPath = "src/scripts/validate-admin-command-center-api-index.mjs";
const panelValidatorPath = "src/scripts/validate-command-center-admin-control-panel.mjs";
const failures = [];

expect(registryPath, [
  "AdminCommandCenterProjectionLink",
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_ROUTE_CONTRACT",
  "getAdminCommandCenterSafeProjectionRouteContract",
  "getAdminCommandCenterSafeProjectionRouteContractSummary",
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_LINKS",
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_LINK_COUNT",
  "ADMIN_COMMAND_CENTER_EXPECTED_SAFE_PROJECTION_LINK_COUNT = 6",
  "getAdminCommandCenterSafeProjectionLinkCount",
  "getAdminCommandCenterExpectedSafeProjectionLinkCount",
  "getAdminCommandCenterSafeProjectionLinksComplete",
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_BOUNDARIES",
  "ADMIN_COMMAND_CENTER_SAFE_METHODS",
  "methodCount: contract.methods.length",
  "allHelpersRequired",
  "requiresSafeAccessHelper: true",
  "requiresSafeResponseHelper: true",
  "requiresSafeOptionsHelper: true",
  "getAdminCommandCenterSafeProjectionLinks",
  "getAdminCommandCenterSafeProjectionBoundaries",
  "admin-command-center-api-index",
  "admin-command-center-safe-summary",
  "admin-command-center-audit-trail",
  "admin-command-center-mission-brief",
  "admin-command-center-agent-findings",
  "admin-command-center-forecast-escalation",
]);

expect(registryPath, [
  "/api/admin/command-center",
  "/api/admin/command-center/summary",
  "/api/admin/command-center/audit",
  "/api/admin/command-center/mission-brief",
  "/api/admin/command-center/agent-findings",
  "/api/admin/command-center/forecast-escalation",
  "preview-gated command-center access",
  "no-store responses",
  "safe options helper",
  "safe projections only",
  "read-only index",
  "review-only operating posture",
  "separate approval gates for action lanes",
]);

expect(apiValidatorPath, [
  "src/lib/admin-command-center-safe-projection-registry.ts",
  "getAdminCommandCenterSafeProjectionLinks",
  "getAdminCommandCenterSafeProjectionBoundaries",
]);

expect(panelValidatorPath, [
  "src/lib/admin-command-center-safe-projection-registry.ts",
  "getAdminCommandCenterSafeProjectionLinks",
]);

forbidden(registryPath, [
  "grantsLiveAuthority: true",
  "readOnly: false",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
]);

if (failures.length) {
  console.error("Admin command center projection registry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center projection registry validation passed with link count helper coverage.");

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
