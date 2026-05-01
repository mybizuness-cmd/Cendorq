import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/admin-command-center-agent-findings-runtime.ts";
const forecastPath = "src/lib/admin-command-center-forecast-escalation-runtime.ts";
const forecastValidatorPath = "src/scripts/validate-admin-command-center-forecast-escalation-runtime.mjs";
const missionValidatorPath = "src/scripts/validate-admin-command-center-mission-brief-runtime.mjs";
const failures = [];

expect(runtimePath, [
  "AdminCommandCenterAgentFindingInput",
  "AdminCommandCenterAgentFindingProjection",
  "ADMIN_COMMAND_CENTER_AGENT_FINDINGS_RULES",
  "projectAdminCommandCenterAgentFinding",
  "getAdminCommandCenterAgentFindingsRules",
  "deriveReasonCodes",
  "mission-brief-not-approved",
  "verified-facts-missing",
  "source-refs-missing",
  "assumptions-missing",
  "gaps-missing",
  "risks-missing",
  "recommendations-missing",
  "forecasted-failure-modes-missing",
  "escalation-needs-missing",
]);

expect(runtimePath, [
  "verified facts",
  "source references",
  "assumptions",
  "gaps",
  "risks",
  "recommendations",
  "forecasted failure modes",
  "escalation needs",
  "structured research outputs",
  "captain review is required",
]);

expect(runtimePath, [
  "structuredFindingAccepted",
  "requiresCaptainReview: true",
  "missionBriefRequired: true",
  "sourceRefsRequired: true",
  "forecastRequired: true",
  "escalationReviewRequired: true",
  "safeProjectionOnly: true",
  "customerFacingOutputAllowedWithoutReview: false",
  "productionMutationAllowedWithoutReview: false",
  "billingActionAllowedWithoutReview: false",
  "providerActionAllowedWithoutReview: false",
  "reportReleaseAllowedWithoutReview: false",
  "launchActionAllowedWithoutReview: false",
  "unsupportedOutcomePromiseAllowed: false",
]);

expect(forecastPath, [
  "projectAdminCommandCenterForecastEscalation",
  "getAdminCommandCenterForecastEscalationRules",
  "allow-expansion",
  "hold-for-hardening",
  "forecast-risk-coverage-incomplete",
  "mitigations-missing",
  "owner-escalation-required",
  "release-captain-escalation-required",
  "hardenBeforeExpansion",
  "safeProjectionOnly: true",
]);

expect(forecastValidatorPath, [
  "Admin command center forecast escalation runtime validation passed.",
  "src/lib/admin-command-center-forecast-escalation-runtime.ts",
  "projectAdminCommandCenterForecastEscalation",
]);

expect(missionValidatorPath, [
  "src/scripts/validate-admin-command-center-agent-findings-runtime.mjs",
  "src/lib/admin-command-center-agent-findings-runtime.ts",
  "projectAdminCommandCenterAgentFinding",
]);

forbidden(runtimePath, unsafePhrases());
forbidden(forecastPath, unsafePhrases());

if (failures.length) {
  console.error("Admin command center agent findings runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center agent findings runtime validation passed with forecast escalation coverage.");

function unsafePhrases() {
  return [
    "requiresCaptainReview: false",
    "missionBriefRequired: false",
    "sourceRefsRequired: false",
    "forecastRequired: false",
    "escalationReviewRequired: false",
    "safeProjectionOnly: false",
    "customerFacingOutputAllowedWithoutReview: true",
    "productionMutationAllowedWithoutReview: true",
    "billingActionAllowedWithoutReview: true",
    "providerActionAllowedWithoutReview: true",
    "reportReleaseAllowedWithoutReview: true",
    "launchActionAllowedWithoutReview: true",
    "unsupportedOutcomePromiseAllowed: true",
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
