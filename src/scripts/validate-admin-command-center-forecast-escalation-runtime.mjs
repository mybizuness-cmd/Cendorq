import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/admin-command-center-forecast-escalation-runtime.ts";
const findingsValidatorPath = "src/scripts/validate-admin-command-center-agent-findings-runtime.mjs";
const failures = [];

expect(runtimePath, [
  "AdminCommandCenterForecastRiskKey",
  "AdminCommandCenterForecastEscalationInput",
  "AdminCommandCenterForecastEscalationProjection",
  "ADMIN_COMMAND_CENTER_FORECAST_ESCALATION_RULES",
  "projectAdminCommandCenterForecastEscalation",
  "getAdminCommandCenterForecastEscalationRules",
  "allow-expansion",
  "hold-for-hardening",
  "drift-risk",
  "stale-assumption-risk",
  "duplicate-scope-risk",
  "overclaim-risk",
  "under-validation-risk",
  "customer-journey-confusion-risk",
  "production-readiness-blocker-risk",
  "handoff-misunderstanding-risk",
  "forecast-risk-coverage-incomplete",
  "mitigations-missing",
  "owner-escalation-required",
  "release-captain-escalation-required",
  "captainReviewRequired: true",
  "hardenBeforeExpansion",
  "safeProjectionOnly: true",
  "customerFacingOutputAllowedWithoutReview: false",
  "productionMutationAllowedWithoutReview: false",
  "unsupportedOutcomePromiseAllowed: false",
]);

expect(findingsValidatorPath, [
  "src/scripts/validate-admin-command-center-forecast-escalation-runtime.mjs",
  "src/lib/admin-command-center-forecast-escalation-runtime.ts",
  "projectAdminCommandCenterForecastEscalation",
]);

forbidden(runtimePath, [
  "captainReviewRequired: false",
  "safeProjectionOnly: false",
  "customerFacingOutputAllowedWithoutReview: true",
  "productionMutationAllowedWithoutReview: true",
  "unsupportedOutcomePromiseAllowed: true",
]);

if (failures.length) {
  console.error("Admin command center forecast escalation runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center forecast escalation runtime validation passed.");

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
