import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const apiPath = "src/app/api/admin/command-center/summary/route.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(apiPath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "NextRequest",
  "NextResponse",
  "commandCenterPreviewHeaderName",
  "resolveCommandCenterAccessState",
  "Command center access is closed.",
  "projection: \"admin-command-center-safe-summary\"",
  "jsonNoStore",
  "Cache-Control",
  "no-store, max-age=0",
  "X-Robots-Tag",
]);

expect(apiPath, [
  "projectAdminCommandCenterAccess",
  "projectAdminCommandCenterAuditEvent",
  "getAdminCommandCenterFoundation",
  "projectAdminCommandCenterMissionBrief",
  "projectAdminCommandCenterAgentFinding",
  "projectAdminCommandCenterForecastEscalation",
  "role: \"release-captain\"",
  "area: \"agent-orchestration\"",
  "action: \"approve-chief-agent-mission-brief\"",
]);

expect(apiPath, [
  "safe JSON projection only",
  "closed access gate",
  "safe projection only",
  "validator coverage",
  "safe-read-reviewed",
  "Admin command center safe summary API returned private no-store posture only.",
  "accessMode: accessState.mode",
  "defaultDecision: foundation.foundation.defaultDecision",
  "approvalGateCount: foundation.approvalGates.length",
  "hardenBeforeExpansion: forecast.hardenBeforeExpansion",
  "immutable: audit.immutable",
]);

expect(routesChainPath, [
  "src/scripts/validate-admin-command-center-safe-summary-api.mjs",
]);

forbidden(apiPath, [
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "console.log",
  "rawPayload",
  "privateKey",
  "sessionToken",
  "csrfToken",
  "customerFacingOutputAllowedWithoutReview: true",
  "productionMutationAllowedWithoutReview: true",
  "unsupportedOutcomePromiseAllowed: true",
]);

if (failures.length) {
  console.error("Admin command center safe summary API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center safe summary API validation passed.");

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
