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
  "Readiness Control",
  "monthly status summary",
  "approved periodic report",
  "controlled monitoring notices",
  "mirrored dashboard messages",
  "email follow-up when appropriate",
  "plan-fit guidance",
  "safe PDF delivery state when gates pass",
  "Signal Repair recommendation when implementation gaps are found",
  "feature adoption or renewal recommendation when evidence supports it",
]);

expect(foundationPath, [
  "active entitlement",
  "verified account",
  "approved monitoring scope",
  "baseline",
  "monthly review",
  "release approval",
  "not a substitute for Signal Repair implementation or a standalone AI Readiness Review report unless the matching entitlement exists",
  "controlled monitoring and approval gates",
  "not unapproved production changes or autonomous business changes",
  "email delivery must mirror into the dashboard",
  "PDF delivery must stay vault-first and gated by verification, entitlement, release approval, no-leak checks, and document safety",
  "future-feature and renewal recommendations must be tied to plan state, report history, evidence freshness, movement, or real customer relevance",
]);

expect(foundationPath, [
  "monthlyStatusRequired: true",
  "periodicReportRequired: true",
  "controlledMonitoringRequired: true",
  "dashboardMessageMirrorRequired: true",
  "emailFollowUpAllowed: true",
  "planFitGuidanceRequired: true",
  "signalRepairRecommendationAllowed",
  "safePdfDeliveryGated: true",
  "vaultFirstDeliveryRequired: true",
  "signalRepairIncluded: false",
  "aiReadinessReviewReportIncluded: false",
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
  "Ongoing Control / Monthly",
  "Build Fix implementation",
  "standalone Deep Review",
  "dashboard inbox messages",
  "optimization recommendation",
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
  console.error("Readiness Control monthly foundation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Readiness Control monthly foundation validation passed with current plan language, mirrored dashboard messages, vault-first monthly summaries, safe PDF gates, controlled monitoring, feature/renewal relevance, and no-leak coverage.");

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
