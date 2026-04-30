import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/plan-delivery-orchestration-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const runtimePath = "src/lib/plan-delivery-orchestration-runtime.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(panelPath, [
  "PlanDeliveryOrchestrationPanel",
  "projectPlanDeliveryRuntime",
  "Plan delivery orchestration",
  "Private lifecycle posture for Free Scan, Deep Review, Build Fix, and Ongoing Control.",
  "Operator-only view of intake, evidence, deliverables, email lifecycle, follow-up, agent ownership, approval gates, and safe next actions.",
  "Delivery is blocked until evidence, ownership, release-captain review, and customer-output approval gates clear.",
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
