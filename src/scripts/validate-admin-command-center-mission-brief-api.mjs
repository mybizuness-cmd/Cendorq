import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const apiPath = "src/app/api/admin/command-center/mission-brief/route.ts";
const responsePath = "src/lib/admin-command-center-safe-response.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(apiPath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "NextRequest",
  "adminCommandCenterJsonNoStore",
  "@/lib/admin-command-center-safe-response",
  "commandCenterPreviewHeaderName",
  "resolveCommandCenterAccessState",
  "Command center access is closed.",
  "projection: \"admin-command-center-mission-brief\"",
]);

expect(apiPath, [
  "projectAdminCommandCenterAccess",
  "projectAdminCommandCenterAuditEvent",
  "projectAdminCommandCenterMissionBrief",
  "approve-chief-agent-mission-brief",
  "mutationRequested: false",
  "auditContextPresent: true",
  "missionBriefApproved: true",
  "structuredFindingsPresent: true",
  "forecastReviewPresent: true",
]);

expect(apiPath, [
  "Review a chief-agent mission brief before dispatching agents or scouts.",
  "read-only mission brief projection",
  "preview gate",
  "no-store response",
  "validator coverage",
  "route-chain coverage",
  "mission-brief-reviewed",
  "Mission brief API returned read-only chief-agent dispatch posture.",
]);

expect(apiPath, [
  "chiefAgentMayDispatch: mission.chiefAgentMayDispatch",
  "agentMayResearch: mission.agentMayResearch",
  "scoutMayCompare: mission.scoutMayCompare",
  "outputRequiresCaptainReview: mission.outputRequiresCaptainReview",
  "immutable: audit.immutable",
]);

expect(responsePath, [
  "ADMIN_COMMAND_CENTER_SAFE_RESPONSE_HEADERS",
  "adminCommandCenterJsonNoStore",
  "no-store, max-age=0",
  "noindex, nofollow, noarchive",
]);

expect(routesChainPath, [
  "src/scripts/validate-admin-command-center-mission-brief-api.mjs",
]);

forbidden(apiPath, [
  "NextResponse.json",
  "function jsonNoStore",
  "headers: {",
  "Cache-Control",
  "X-Robots-Tag",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "console.log",
  "rawPayload",
  "privateKey",
  "sessionToken",
  "csrfToken",
  "mutationRequested: true",
]);

if (failures.length) {
  console.error("Admin command center mission brief API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center mission brief API validation passed with shared safe response coverage.");

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
