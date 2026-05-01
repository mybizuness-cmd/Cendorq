import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/admin-command-center-control-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(panelPath, [
  "AdminCommandCenterControlPanel",
  "projectAdminCommandCenterAccess",
  "projectAdminCommandCenterAuditEvent",
  "projectAdminCommandCenterMissionBrief",
  "projectAdminCommandCenterAgentFinding",
  "projectAdminCommandCenterForecastEscalation",
  "getAdminCommandCenterFoundation",
  "Deny-by-default cockpit",
  "Private operator visibility only",
  "Access posture",
  "Chief-agent brief",
  "Structured findings",
  "Forecast and escalation",
  "Safe audit projection",
]);

expect(panelPath, [
  "role: \"release-captain\"",
  "area: \"agent-orchestration\"",
  "action: \"approve-chief-agent-mission-brief\"",
  "sessionFresh: true",
  "auditContextPresent: true",
  "releaseCaptainApprovalPresent: true",
  "missionBriefApproved: true",
  "structuredFindingsPresent: true",
  "forecastReviewPresent: true",
]);

expect(panelPath, [
  "verified facts",
  "source refs",
  "assumptions",
  "gaps",
  "risks",
  "recommendations",
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

expect(panelPath, [
  "does not grant live provider, billing, report-release, launch, or production authority by itself",
  "Expansion is allowed only after risk coverage, mitigation, and escalation ownership are visible",
  "High-risk cases escalate to owner or release-captain review before expansion",
  "safe command chain posture without granting direct authority",
]);

expect(pagePath, [
  "AdminCommandCenterControlPanel",
  "./admin-command-center-control-panel",
  "<AdminCommandCenterControlPanel />",
  "<OperatorControlInterfacePanel />",
  "<PlatformLaunchReadinessPanel />",
]);

expect(routesChainPath, [
  "src/scripts/validate-command-center-admin-control-panel.mjs",
]);

forbidden(panelPath, [
  "localStorage.setItem",
  "sessionStorage.setItem",
  "customerFacingOutputAllowedWithoutReview: true",
  "productionMutationAllowedWithoutReview: true",
  "unsupportedOutcomePromiseAllowed: true",
  "directProviderSendFromAdminAllowed: true",
]);

if (failures.length) {
  console.error("Command center admin control panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center admin control panel validation passed.");

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
