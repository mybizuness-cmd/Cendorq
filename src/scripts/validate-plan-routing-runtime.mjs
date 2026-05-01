import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/plan-routing-runtime.ts";
const entitlementPath = "src/lib/plan-entitlement-routing-contracts.ts";
const reconciliationPath = "src/lib/plan-post-delivery-reconciliation-contracts.ts";
const welcomePath = "src/lib/verified-welcome-email-contracts.ts";
const planValidatorPath = "src/scripts/validate-plan-delivery-orchestration-contracts.mjs";
const failures = [];

expect(runtimePath, [
  "projectPlanRouting",
  "getPlanRoutingRuntimeContractKeys",
  "PLAN_ENTITLEMENT_ROUTING_CONTRACT",
  "PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT",
  "VERIFIED_WELCOME_EMAIL_CONTRACT",
  "PlanRoutingInput",
  "PlanRoutingProjection",
  "PlanRoutingMode",
  "ReconciliationOutcomeKey",
]);

expect(runtimePath, [
  "linear-stop",
  "direct-purchase",
  "late-add-on",
  "active-monthly",
  "free-scan",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "no-change-needed",
  "minor-alignment-addendum",
  "cendorq-error-correction",
  "material-rework-change-order",
  "future-cycle-application",
]);

expect(runtimePath, [
  "customerOwnedProjectionReady",
  "purchasedEntitlement",
  "includedScope",
  "notIncludedScope",
  "nextBestPlan",
  "followUpCadence",
  "dashboardReminderAllowed",
  "warningEmailKey",
  "warningEmailAllowed",
  "warningEmailSuppressionReasons",
  "reconciliationOutcome",
  "reconciliationCustomerMessage",
  "inboxConfirmationRequired",
  "inboxConfirmationAllowed",
  "inboxConfirmationSuppressionReasons",
  "safeCustomerLanguage",
  "blockedPatterns",
]);

expect(runtimePath, [
  "free-scan-stops",
  "deep-review-stops",
  "build-fix-stops",
  "ongoing-control-active",
  "build-fix-direct-scope-confirmation",
  "ongoing-control-direct-scope-confirmation",
  "noWarningEmailNeeded",
  "customerOwnershipMissing",
  "verifiedEmailMissing",
  "customerOptedOutOfNonEssentialEmail",
  "supportRequestedNoReminders",
  "recommendationNotEvidenceBacked",
  "deepReviewAlreadyActive",
  "prerequisiteRecommendationsAlreadyActive",
  "buildFixDeliveryAlreadyApproved",
]);

expect(runtimePath, [
  "welcomeAlreadySent",
  "inboxConfirmationAlreadySent",
  "inboxConfirmationAlreadyCompleted",
  "inboxConfirmationCompletedWithoutSentFlag",
  "warningEmailWithoutEvidence",
  "materialReworkWithoutDirectionChange",
  "Plan routing language redacted to preserve safe projection.",
]);

expect(entitlementPath, [
  "PLAN_ENTITLEMENT_ROUTING_CONTRACT",
  "linearPurchaseSequences",
  "directPurchaseWarningEmails",
  "loopholeProtections",
]);

expect(reconciliationPath, [
  "PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT",
  "material-rework-change-order",
  "Second purchase unlocks the purchased plan, not unlimited re-performance of earlier paid work.",
]);

expect(welcomePath, [
  "VERIFIED_WELCOME_EMAIL_CONTRACT",
  "inboxPlacementStandard",
  "Treat first verified welcome as the one-time inbox confirmation handshake for every customer, free or paid.",
]);

expect(planValidatorPath, [
  "src/lib/plan-routing-runtime.ts",
  "projectPlanRouting",
  "warningEmailWithoutEvidence",
  "inboxConfirmationAlreadyCompleted",
  "material-rework-change-order",
]);

forbidden(runtimePath, [
  "warningEmailAllowed: true",
  "inboxConfirmationAllowed: true",
  "customerFacingDeliveryAllowed: true",
  "upgradeOrRetentionAllowed: true",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "guaranteed inbox",
  "guaranteed primary inbox",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency is allowed",
  "password=",
  "token=",
  "privateKey=",
  "cardNumber=",
  "bankDetail=",
  "rawPayload=",
  "rawEvidence=",
  "operatorIdentity=",
  "internalNote=",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Plan routing runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plan routing runtime validation passed.");

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
