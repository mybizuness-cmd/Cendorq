import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/admin-command-center-mission-brief-runtime.ts";
const agentFindingsPath = "src/lib/admin-command-center-agent-findings-runtime.ts";
const agentFindingsValidatorPath = "src/scripts/validate-admin-command-center-agent-findings-runtime.mjs";
const auditValidatorPath = "src/scripts/validate-admin-command-center-audit-runtime.mjs";
const failures = [];

expect(runtimePath, [
  "AdminCommandCenterMissionBriefInput",
  "AdminCommandCenterMissionBriefProjection",
  "ADMIN_COMMAND_CENTER_MISSION_BRIEF_RULES",
  "projectAdminCommandCenterMissionBrief",
  "getAdminCommandCenterMissionBriefRules",
  "deriveReasonCodes",
  "mission-id-missing",
  "chief-agent-role-missing",
  "mission-scope-missing",
  "output-boundary-missing",
  "source-boundaries-missing",
  "evidence-standard-incomplete",
  "escalation-rules-missing",
  "forecast-risks-incomplete",
  "anti-drift-checks-incomplete",
]);

expect(runtimePath, [
  "mission scope",
  "source boundaries",
  "evidence standards",
  "output boundary",
  "escalation rules",
  "forecast risks",
  "anti-drift checks",
  "agents and scouts may research, compare, draft, forecast, and pressure-test only inside the approved mission brief",
  "mission brief output requires captain review",
  "forecast risks must cover drift, stale assumptions, duplicated scope, missing implementation, weak validation, public-claim risk, and handoff risk when relevant",
]);

expect(runtimePath, [
  "chiefAgentMayDispatch",
  "agentMayResearch",
  "scoutMayCompare",
  "outputRequiresCaptainReview: true",
  "ownerCommandAboveCaptain: true",
  "captainAboveChiefAgents: true",
  "chiefAgentsAboveAgents: true",
  "safeProjectionOnly: true",
  "unboundedResearchAllowed: false",
  "customerFacingOutputAllowedWithoutReview: false",
  "productionMutationAllowedWithoutReview: false",
  "unsupportedOutcomePromiseAllowed: false",
]);

expect(agentFindingsPath, [
  "projectAdminCommandCenterAgentFinding",
  "getAdminCommandCenterAgentFindingsRules",
  "verified-facts-missing",
  "source-refs-missing",
  "assumptions-missing",
  "gaps-missing",
  "risks-missing",
  "recommendations-missing",
  "forecasted-failure-modes-missing",
  "escalation-needs-missing",
  "requiresCaptainReview: true",
  "customerFacingOutputAllowedWithoutReview: false",
  "productionMutationAllowedWithoutReview: false",
]);

expect(agentFindingsValidatorPath, [
  "Admin command center agent findings runtime validation passed.",
  "src/lib/admin-command-center-agent-findings-runtime.ts",
  "projectAdminCommandCenterAgentFinding",
]);

expect(auditValidatorPath, [
  "src/scripts/validate-admin-command-center-mission-brief-runtime.mjs",
  "src/lib/admin-command-center-mission-brief-runtime.ts",
  "projectAdminCommandCenterMissionBrief",
]);

forbidden(runtimePath, unsafePhrases());
forbidden(agentFindingsPath, unsafePhrases());

if (failures.length) {
  console.error("Admin command center mission brief runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center mission brief runtime validation passed with agent findings coverage.");

function unsafePhrases() {
  return [
    "unboundedResearchAllowed: true",
    "customerFacingOutputAllowedWithoutReview: true",
    "productionMutationAllowedWithoutReview: true",
    "billingActionAllowedWithoutReview: true",
    "providerActionAllowedWithoutReview: true",
    "reportReleaseAllowedWithoutReview: true",
    "launchActionAllowedWithoutReview: true",
    "unsupportedOutcomePromiseAllowed: true",
    "outputRequiresCaptainReview: false",
    "requiresCaptainReview: false",
    "ownerCommandAboveCaptain: false",
    "captainAboveChiefAgents: false",
    "chiefAgentsAboveAgents: false",
    "guaranteed ROI",
    "guaranteed revenue",
    "guaranteed deliverability",
    "guaranteed inbox placement",
    "100% accurate",
    "impossible to hack",
    "never liable",
    "liability-free",
    "localStorage.setItem",
    "sessionStorage.setItem",
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
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
