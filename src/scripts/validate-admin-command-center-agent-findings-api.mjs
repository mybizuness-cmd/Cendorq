import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const apiPath = "src/app/api/admin/command-center/agent-findings/route.ts";
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
  "projection: \"admin-command-center-agent-findings\"",
]);

expect(apiPath, [
  "projectAdminCommandCenterAccess",
  "projectAdminCommandCenterAuditEvent",
  "projectAdminCommandCenterMissionBrief",
  "projectAdminCommandCenterAgentFinding",
  "review-agent-output",
  "mutationRequested: false",
  "auditContextPresent: true",
  "missionBriefApproved: true",
  "structuredFindingsPresent: true",
  "forecastReviewPresent: true",
]);

expect(apiPath, [
  "Review structured agent and scout findings before any escalation or expansion.",
  "read-only structured findings projection",
  "agent-output-reviewed",
  "Agent findings API returned read-only structured findings posture.",
  "structuredFindingAccepted: finding.structuredFindingAccepted",
  "requiresCaptainReview: finding.requiresCaptainReview",
]);

expect(apiPath, [
  "verifiedFactCount: finding.verifiedFactCount",
  "sourceRefCount: finding.sourceRefCount",
  "assumptionCount: finding.assumptionCount",
  "gapCount: finding.gapCount",
  "riskCount: finding.riskCount",
  "recommendationCount: finding.recommendationCount",
  "forecastedFailureModeCount: finding.forecastedFailureModeCount",
  "escalationNeedCount: finding.escalationNeedCount",
  "immutable: audit.immutable",
]);

expect(responsePath, [
  "ADMIN_COMMAND_CENTER_SAFE_RESPONSE_HEADERS",
  "adminCommandCenterJsonNoStore",
  "no-store, max-age=0",
  "noindex, nofollow, noarchive",
]);

expect(routesChainPath, [
  "src/scripts/validate-admin-command-center-agent-findings-api.mjs",
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
  console.error("Admin command center agent findings API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center agent findings API validation passed with shared safe response coverage.");

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
