import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const apiPath = "src/app/api/admin/command-center/route.ts";
const registryPath = "src/lib/admin-command-center-safe-projection-registry.ts";
const responsePath = "src/lib/admin-command-center-safe-response.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(apiPath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "NextRequest",
  "getAdminCommandCenterSafeProjectionLinks",
  "getAdminCommandCenterSafeProjectionBoundaries",
  "@/lib/admin-command-center-safe-projection-registry",
  "resolveAdminCommandCenterSafeAccess",
  "adminCommandCenterAccessDeniedPayload",
  "adminCommandCenterJsonNoStore",
  "adminCommandCenterOptions",
  "@/lib/admin-command-center-safe-response",
  "commandCenterPreviewHeaderName",
  "resolveCommandCenterAccessState",
  "Command center access is closed.",
  "projection: \"admin-command-center-api-index\"",
]);

expect(apiPath, [
  "endpoints: getAdminCommandCenterSafeProjectionLinks().map",
  "path: endpoint.href",
  "projection: endpoint.projection",
  "purpose: endpoint.purpose",
  "methods: endpoint.methods",
  "requiresSafeAccessHelper: endpoint.requiresSafeAccessHelper",
  "requiresSafeResponseHelper: endpoint.requiresSafeResponseHelper",
  "requiresSafeOptionsHelper: endpoint.requiresSafeOptionsHelper",
  "boundaries: getAdminCommandCenterSafeProjectionBoundaries()",
]);

expect(apiPath, [
  "closedByDefault: true",
  "noStoreRequired: true",
  "readOnly: true",
  "grantsLiveAuthority: false",
]);

expect(registryPath, [
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_LINKS",
  "ADMIN_COMMAND_CENTER_SAFE_PROJECTION_BOUNDARIES",
  "ADMIN_COMMAND_CENTER_SAFE_METHODS",
  "safeProjectionRouteContract",
  "requiresSafeAccessHelper: true",
  "requiresSafeResponseHelper: true",
  "requiresSafeOptionsHelper: true",
  "admin-command-center-safe-summary",
  "admin-command-center-audit-trail",
  "admin-command-center-mission-brief",
  "admin-command-center-agent-findings",
  "admin-command-center-forecast-escalation",
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

expect(responsePath, [
  "ADMIN_COMMAND_CENTER_SAFE_RESPONSE_HEADERS",
  "ADMIN_COMMAND_CENTER_SAFE_METHODS",
  "adminCommandCenterJsonNoStore",
  "adminCommandCenterOptions",
  "no-store, max-age=0",
  "noindex, nofollow, noarchive",
]);

expect(routesChainPath, [
  "src/scripts/validate-admin-command-center-api-index.mjs",
]);

forbidden(apiPath, unsafePhrases());
forbidden(registryPath, unsafePhrases());
forbidden(responsePath, unsafePhrases());

if (failures.length) {
  console.error("Admin command center API index validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center API index validation passed with route contract metadata coverage.");

function unsafePhrases() {
  return [
    "localStorage",
    "sessionStorage",
    "dangerouslySetInnerHTML",
    "console.log",
    "rawPayload",
    "grantsLiveAuthority: true",
    "readOnly: false",
  ];
}

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
