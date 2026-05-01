import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const apiPath = "src/app/api/admin/command-center/forecast-escalation/route.ts";
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
  "projection: \"admin-command-center-forecast-escalation\"",
]);

expect(apiPath, [
  "projectAdminCommandCenterAccess",
  "projectAdminCommandCenterAuditEvent",
  "projectAdminCommandCenterMissionBrief",
  "projectAdminCommandCenterAgentFinding",
  "projectAdminCommandCenterForecastEscalation",
  "review-agent-output",
  "mutationRequested: false",
  "auditContextPresent: true",
  "forecastReviewPresent: true",
]);

expect(apiPath, [
  "Review forecast and escalation posture before expansion.",
  "read-only forecast escalation projection",
  "drift-risk",
  "stale-assumption-risk",
  "duplicate-scope-risk",
  "overclaim-risk",
  "under-validation-risk",
  "customer-journey-confusion-risk",
  "private-material-exposure-risk",
  "production-readiness-blocker-risk",
  "handoff-misunderstanding-risk",
]);

expect(apiPath, [
  "Forecast escalation API returned read-only expansion posture.",
  "decision: forecast.decision",
  "riskCount: forecast.risksReviewed.length",
  "mitigationCount: forecast.mitigationCount",
  "expansionRequested: forecast.expansionRequested",
  "captainReviewRequired: forecast.captainReviewRequired",
  "highRiskEscalationRequired: forecast.highRiskEscalationRequired",
  "hardenBeforeExpansion: forecast.hardenBeforeExpansion",
  "immutable: audit.immutable",
]);

expect(responsePath, [
  "ADMIN_COMMAND_CENTER_SAFE_RESPONSE_HEADERS",
  "adminCommandCenterJsonNoStore",
  "no-store, max-age=0",
  "noindex, nofollow, noarchive",
]);

expect(routesChainPath, [
  "src/scripts/validate-admin-command-center-forecast-escalation-api.mjs",
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
  console.error("Admin command center forecast escalation API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center forecast escalation API validation passed with shared safe response coverage.");

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
