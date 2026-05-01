import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const foundationPath = "src/lib/ongoing-control-monthly-foundation.ts";
const planValidatorPath = "src/scripts/validate-plan-delivery-orchestration-contracts.mjs";
const failures = [];

expect(foundationPath, [
  "OngoingControlMonthlyStage",
  "OngoingControlMonthlyInput",
  "OngoingControlMonthlyProjection",
  "projectOngoingControlMonthlyFoundation",
  "getOngoingControlMonthlyRules",
  "ONGOING_CONTROL_MONTHLY_RULES",
  "subscription-required",
  "scope-required",
  "monitoring-active",
  "monthly-review",
  "summary-pending-approval",
  "summary-ready",
]);

expect(foundationPath, [
  "ongoing-control",
  "Ongoing Control / Monthly",
  "monthly status summary",
  "approved periodic report",
  "controlled monitoring notices",
  "dashboard inbox messages",
  "email follow-up when appropriate",
  "plan-fit guidance",
  "optimization recommendation when implementation gaps are found",
]);

expect(foundationPath, [
  "active entitlement",
  "verified account",
  "approved monitoring scope",
  "baseline",
  "monthly review",
  "release approval",
  "not a substitute for Build Fix implementation or a standalone Deep Review report unless the matching entitlement exists",
  "controlled monitoring and approval gates",
  "not uncontrolled production mutation or autonomous business changes",
]);

expect(foundationPath, [
  "monthlyStatusRequired: true",
  "periodicReportRequired: true",
  "controlledMonitoringRequired: true",
  "dashboardInboxRequired: true",
  "emailFollowUpAllowed: true",
  "planFitGuidanceRequired: true",
  "buildFixIncluded: false",
  "deepReviewReportIncluded: false",
  "uncontrolledAutoMutation: false",
  "fakeUrgencyAllowed: false",
]);

expect(foundationPath, [
  "rawPayloadExposed: false",
  "rawEvidenceExposed: false",
  "rawSecurityPayloadExposed: false",
  "rawBillingDataExposed: false",
  "internalNotesExposed: false",
  "operatorIdentityExposed: false",
  "riskInternalsExposed: false",
  "promptExposed: false",
  "secretExposed: false",
  "tokenExposed: false",
  "unsupportedOutcomePromise: false",
]);

expect(planValidatorPath, [
  "src/lib/ongoing-control-monthly-foundation.ts",
  "validate-ongoing-control-monthly-foundation.mjs",
  "projectOngoingControlMonthlyFoundation",
]);

forbidden(foundationPath, [
  "buildFixIncluded: true",
  "deepReviewReportIncluded: true",
  "uncontrolledAutoMutation: true",
  "fakeUrgencyAllowed: true",
  "rawPayloadExposed: true",
  "rawEvidenceExposed: true",
  "rawSecurityPayloadExposed: true",
  "rawBillingDataExposed: true",
  "internalNotesExposed: true",
  "operatorIdentityExposed: true",
  "riskInternalsExposed: true",
  "promptExposed: true",
  "secretExposed: true",
  "tokenExposed: true",
  "unsupportedOutcomePromise: true",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed growth",
  "guaranteed accuracy",
  "100% accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Ongoing Control monthly foundation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Ongoing Control monthly foundation validation passed.");

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
