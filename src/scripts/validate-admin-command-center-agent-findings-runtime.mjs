import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/admin-command-center-agent-findings-runtime.ts";
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
  "finding-id-missing",
  "agent-role-missing",
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
  "must not convert assumptions into verified facts or hide gaps and risks",
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

expect(missionValidatorPath, [
  "src/scripts/validate-admin-command-center-agent-findings-runtime.mjs",
  "src/lib/admin-command-center-agent-findings-runtime.ts",
  "projectAdminCommandCenterAgentFinding",
]);

forbidden(runtimePath, [
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
]);

if (failures.length) {
  console.error("Admin command center agent findings runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center agent findings runtime validation passed.");

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
