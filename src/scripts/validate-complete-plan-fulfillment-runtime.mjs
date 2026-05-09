import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/complete-plan-fulfillment-runtime.ts";
const matrixPath = "src/lib/complete-plan-fulfillment-matrix.ts";
const planValidatorPath = "src/scripts/validate-plan-delivery-orchestration-contracts.mjs";
const failures = [];

expect(runtimePath, [
  "projectCompletePlanFulfillment",
  "projectCompletePlan",
  "CompletePlanFulfillmentInput",
  "CompletePlanFulfillmentProjection",
  "CompletePlanFulfillmentSummary",
  "FulfillmentStageState",
  "COMPLETE_PLAN_FULFILLMENT_MATRIX",
]);

expect(runtimePath, [
  "valuePromise",
  "educationDepth",
  "planBoundary",
  "conversionMethod",
  "stageState",
  "missingStages",
  "missingArtifacts",
  "requiredOwners",
  "releaseCaptainApproved",
  "customerEducationReviewed",
  "valueExceedsPriceReviewed",
  "planBoundaryProtected",
  "conversionMethodApproved",
  "dashboardMessageMirrorReviewed",
  "safeDocumentDeliveryReviewed",
  "customerFacingDeliveryAllowed",
  "upgradeOrRetentionAllowed",
  "educationalCustomerExplanation",
  "valueBoundaryExplanation",
  "blockedPatterns",
]);

expect(runtimePath, [
  "fulfillmentStageIncomplete",
  "fulfillmentArtifactIncomplete",
  "releaseCaptainApprovalMissing",
  "customerEducationReviewMissing",
  "valueAbovePriceReviewMissing",
  "planBoundaryProtectionMissing",
  "conversionMethodReviewMissing",
  "dashboardMessageMirrorReviewMissing",
  "safeDocumentDeliveryReviewMissing",
  "Review educational explanation so the customer understands what the finding means and why it matters.",
  "Verify the plan deliverable provides practical value above the price paid without overstating results.",
  "Confirm the plan gives full promised value without giving away higher-tier revenue streams.",
  "Approve the business-appropriate conversion method before customer-facing follow-up.",
  "Confirm every important customer message mirrors into the dashboard with the same safe next action.",
  "Confirm report or billing PDF delivery stays vault-first, gated, and not a separate source of truth.",
]);

expect(runtimePath, [
  "not-started",
  "ready",
  "in-progress",
  "blocked",
  "complete",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "dashboard message mirror artifact",
  "safe document delivery artifact",
  "Deliver through dashboard, report vault, mirrored dashboard message, email, safe document path when gates pass, and support handoff with plan-appropriate next step.",
  "Fulfillment explanation redacted to preserve safe projection.",
]);

expect(matrixPath, [
  "COMPLETE_PLAN_FULFILLMENT_MATRIX",
  "valueArchitecture",
  "educationalReportStandard",
  "planBoundaryRules",
  "conversionStandards",
  "category-defining experience",
  "dashboard message mirror",
  "safe PDF or billing document delivery when gates pass",
]);

expect(planValidatorPath, [
  "complete-plan-fulfillment-runtime.ts",
  "projectCompletePlanFulfillment",
  "customerEducationReviewed",
  "valueExceedsPriceReviewed",
  "planBoundaryProtected",
  "conversionMethodApproved",
]);

forbidden(runtimePath, [
  "customerFacingDeliveryAllowed: true",
  "upgradeOrRetentionAllowed: true",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency",
  "password=",
  "token=",
  "privateKey=",
  "cardNumber=",
  "bankDetail=",
  "rawPayload=",
  "rawEvidence=",
  "operatorIdentity=",
  "internalNote=",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "Deliver through dashboard, report vault, email, notification",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Complete plan fulfillment runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Complete plan fulfillment runtime validation passed with current plan names, dashboard message mirror review, safe document delivery review, vault-first PDF posture, and release-captain delivery gates.");

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
