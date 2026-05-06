import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/plan-delivery-orchestration-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const runtimePath = "src/lib/plan-delivery-orchestration-runtime.ts";
const fulfillmentPath = "src/lib/plan-value-fulfillment-boundaries.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(panelPath, [
  "PlanDeliveryOrchestrationPanel",
  "projectPlanDeliveryRuntime",
  "projectPlanValueFulfillment",
  "fulfillmentByPlan",
  "Plan delivery orchestration",
  "Private lifecycle and fulfillment-boundary posture for every plan.",
  "Operator-only view of intake, evidence, deliverables, lifecycle status, allowed outputs, blocked overlaps, required delivery checks, approval gates, and escalation rules.",
  "Delivery is blocked until evidence, ownership, release-captain review, customer-output approval, and fulfillment-boundary checks clear.",
  "planDelivery.planCount",
  "planDelivery.readyCount",
  "planDelivery.blockedCount",
  "planDelivery.reviewRequiredCount",
  "planDelivery.projections",
]);

expect(panelPath, [
  "free-scan",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "Free Scan has enough intake",
  "Deep Review needs expanded diagnostic intake",
  "Build Fix remains blocked",
  "Ongoing Control needs monitoring evidence",
  "releaseCaptainReviewRequired",
  "customerOutputApproved",
  "deliveryAllowed",
  "paidRecommendationAllowed",
]);

expect(panelPath, [
  "Allowed deliverables",
  "Blocked overlap",
  "Required checks",
  "Excluded value",
  "Fulfillment gate",
  "Escalation rule",
  "customerFacingSummary",
  "allowedDeliverables",
  "blockedOverlap",
  "requiredBeforeDelivery",
  "excludedValue",
  "No cross-plan deliverable leakage",
]);

expect(pagePath, [
  "PlanDeliveryOrchestrationPanel",
  "./plan-delivery-orchestration-panel",
  "<PlanControlPanel plans={planControls} />",
  "<PlanDeliveryOrchestrationPanel />",
  "<OptimizationLibraryPanel methods={optimizationMethods} />",
  "ClosedCommandCenterPanel",
  "resolveCommandCenterAccessState",
]);

expect(runtimePath, [
  "projectPlanDeliveryRuntime",
  "projectPlanDeliveryLifecycle",
  "releaseCaptainReviewRequired",
  "customerOutputApproved",
  "deliveryAllowed",
  "paidRecommendationAllowed",
  "blockedPatterns",
]);

expect(fulfillmentPath, [
  "PLAN_VALUE_FULFILLMENT_BOUNDARIES",
  "PLAN_VALUE_FULFILLMENT_RULES",
  "projectPlanValueFulfillment",
  "allowedDeliverables",
  "blockedOverlap",
  "requiredBeforeDelivery",
  "approvalGate",
  "customerFacingSummary",
  "escalationRule",
]);

expect(routesChainPath, [
  "src/scripts/validate-command-center-plan-delivery-orchestration-panel.mjs",
]);

forbidden(panelPath, [
  "deliveryAllowed: true",
  "paidRecommendationAllowed: true",
  "customerOutputApproved: true",
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
  console.error("Command center plan delivery orchestration panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center plan delivery orchestration panel validation passed.");

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
