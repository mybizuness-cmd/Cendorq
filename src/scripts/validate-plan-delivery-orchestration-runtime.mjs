import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/plan-delivery-orchestration-runtime.ts";
const contractPath = "src/lib/plan-delivery-orchestration-contracts.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(runtimePath, [
  "projectPlanDeliveryRuntime",
  "projectPlanDeliveryLifecycle",
  "PlanDeliveryRuntimeInput",
  "PlanDeliveryRuntimeProjection",
  "PlanDeliveryRuntimeSummary",
  "PlanDeliveryState",
  "PlanDeliveryChannel",
  "PLAN_DELIVERY_ORCHESTRATION_CONTRACT",
]);

expect(runtimePath, [
  "missingIntake",
  "missingEvidence",
  "missingDeliverables",
  "missingEmails",
  "missingFollowUps",
  "requiredAgents",
  "approvalGate",
  "releaseCaptainReviewRequired",
  "customerOutputApproved",
  "customerPaymentConfirmed",
  "customerOwnershipVerified",
  "deliveryAllowed",
  "paidRecommendationAllowed",
  "customerFacingClaimAllowed",
  "connectedDestinations",
  "blockedPatterns",
]);

expect(runtimePath, [
  "not-started",
  "intake-needed",
  "evidence-needed",
  "in-progress",
  "approval-needed",
  "ready-for-delivery",
  "delivered",
  "blocked",
  "dashboard",
  "email",
  "notification",
  "report-vault",
  "support",
  "billing",
  "command-center",
]);

expect(runtimePath, [
  "planWithoutIntake",
  "planWithoutEvidence",
  "planWithoutReportOrDeliverable",
  "planWithoutEmailLifecycle",
  "planWithoutFollowUp",
  "planWithoutApprovalGate",
  "freeScanPresentedAsFinalCompleteDiagnosis",
  "paidRecommendationWithoutEvidence",
  "optimizationWithoutScopeApproval",
  "monthlyControlWithoutApprovalGate",
]);

expect(runtimePath, [
  "Route plan output through release-captain review before delivery.",
  "Deliver through dashboard, report vault, notification, and email handoff with safe support path.",
  "Queue safe email lifecycle step",
  "Queue non-pressure follow-up",
  "Plan delivery summary redacted to preserve safe projection.",
]);

expect(contractPath, [
  "PLAN_DELIVERY_ORCHESTRATION_CONTRACT",
  "free-scan",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "release-captain-review-required-before-public-report-language-expands-beyond-safe-free-scan-output",
  "release-captain-report-release-review-required",
  "customer-output-and-release-captain-approval-required-before-customer-facing-delivery",
  "controlled-maintenance-and-release-captain-review-required-before-production-impacting-change",
]);

expect(routesChainPath, [
  "src/scripts/validate-plan-delivery-orchestration-runtime.mjs",
]);

forbidden(runtimePath, [
  "deliveryAllowed: true",
  "paidRecommendationAllowed: true",
  "customerFacingClaimAllowed: true",
  "rawPayload=",
  "rawEvidence=",
  "providerPayload=",
  "customerData=",
  "internalNotes=",
  "operatorIdentity=",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "100% accurate",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Plan delivery orchestration runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plan delivery orchestration runtime validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;

  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
