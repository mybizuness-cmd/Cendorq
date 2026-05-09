import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const foundationPath = "src/lib/build-fix-optimization-orchestration-foundation.ts";
const planValidatorPath = "src/scripts/validate-plan-delivery-orchestration-contracts.mjs";
const failures = [];

expect(foundationPath, [
  "BuildFixOptimizationStage",
  "BuildFixOptimizationInput",
  "BuildFixOptimizationProjection",
  "projectBuildFixOptimizationOrchestration",
  "getBuildFixOptimizationOrchestrationRules",
  "BUILD_FIX_OPTIMIZATION_ORCHESTRATION_RULES",
  "scope-required",
  "approval-required",
  "implementation-ready",
  "in-progress",
  "summary-pending-approval",
  "summary-ready",
]);

expect(foundationPath, [
  "build-fix",
  "Signal Repair",
  "approved Signal Repair scope",
  "priority implementation task list",
  "customer approval checkpoints",
  "before-after evidence record",
  "customer-safe progress summary",
  "dashboard message mirror",
  "vault-first delivery summary state",
  "safe PDF delivery state when gates pass",
  "remaining risks and Readiness Control recommendation when justified",
]);

expect(foundationPath, [
  "active entitlement",
  "approved scope",
  "required asset confirmation",
  "customer approval checkpoints before implementation",
  "concrete scoped improvement work or a scoped implementation task list",
  "must not deliver a standalone AI Readiness Review report unless AI Readiness Review entitlement exists",
  "must not perform unapproved production changes or material changes without customer approval",
  "completion may recommend Readiness Control through remaining risks and baseline tracking",
  "email delivery must mirror into the dashboard",
  "PDF delivery must stay vault-first and gated by verification, entitlement, release approval, no-leak checks, and document safety",
]);

expect(foundationPath, [
  "beforeAfterEvidenceRequired: true",
  "customerSafeProgressReportsRequired: true",
  "customerApprovalRequiredBeforeMaterialChange: true",
  "rollbackPostureRequired: true",
  "aiReadinessReviewReportIncluded: false",
  "dashboardMessageMirrorRequired: true",
  "vaultFirstDeliveryRequired: true",
  "safePdfDeliveryGated: true",
  "unpaidDeliverableLeaked: false",
  "optimizationWithoutScopeApproval: false",
  "uncontrolledProductionMutation: false",
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
  "src/lib/build-fix-optimization-orchestration-foundation.ts",
  "validate-build-fix-optimization-orchestration-foundation.mjs",
  "projectBuildFixOptimizationOrchestration",
]);

forbidden(foundationPath, [
  "Build Fix / Optimization",
  "standalone Deep Review",
  "Deep Review entitlement",
  "Ongoing Control",
  "monthly-control recommendation",
  "deepReviewReportIncluded: true",
  "unpaidDeliverableLeaked: true",
  "optimizationWithoutScopeApproval: true",
  "uncontrolledProductionMutation: true",
  "customerApprovalRequiredBeforeMaterialChange: false",
  "rollbackPostureRequired: false",
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
  "guaranteed accuracy",
  "100% accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency is allowed",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Signal Repair orchestration foundation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Signal Repair orchestration foundation validation passed with current plan language, dashboard message mirror, vault-first delivery, safe PDF gates, approval checkpoints, before-after evidence, and no-leak coverage.");

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
