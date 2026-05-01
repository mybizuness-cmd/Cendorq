import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/plan-delivery-orchestration-contracts.ts";
const matrixPath = "src/lib/complete-plan-fulfillment-matrix.ts";
const runtimePath = "src/lib/complete-plan-fulfillment-runtime.ts";
const entitlementPath = "src/lib/plan-entitlement-routing-contracts.ts";
const matrixValidatorPath = "src/scripts/validate-complete-plan-fulfillment-matrix.mjs";
const runtimeValidatorPath = "src/scripts/validate-complete-plan-fulfillment-runtime.mjs";
const entitlementValidatorPath = "src/scripts/validate-plan-entitlement-routing-contracts.mjs";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(contractPath, [
  "PLAN_DELIVERY_ORCHESTRATION_CONTRACT",
  "Cendorq Plan Delivery Orchestration Contract",
  "getPlanDeliveryOrchestrationContract",
  "intake, evidence, report creation, email delivery, follow-up, agent ownership, customer handoffs, and upgrade paths",
]);

expect(contractPath, [
  "free-scan",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "Free Scan",
  "Deep Review / Full Scan",
  "Build Fix / Optimization",
  "Ongoing Control / Monthly",
]);

expect(contractPath, [
  "Every plan must define intake, evidence requirements, customer deliverables, operator deliverables, email lifecycle, notification lifecycle, follow-up lifecycle, agent ownership, handoff destinations, and release-captain approval gates.",
  "Every report and customer-facing deliverable must separate verified facts, customer-provided context, external evidence, assumptions, inferences, limitations, confidence, and next actions.",
  "Every plan must deliver value beyond generic advice by converting evidence into practical actions, clear priorities, safer decisions, and plan-appropriate implementation support.",
  "Every plan must avoid fake urgency, unsupported ROI claims, guaranteed revenue, guaranteed accuracy, absolute security, and liability-free language.",
]);

expect(contractPath, [
  "free scan report",
  "report ready",
  "non-pressure follow-up if no upgrade",
  "expanded diagnostic questionnaire",
  "full diagnostic report",
  "priority blocker map",
  "optimization plan",
  "before-after evidence record",
  "customer approval checkpoints",
  "monthly command summary",
  "change forecast",
  "controlled updates",
]);

expect(contractPath, [
  "chief-report-truth-agent",
  "report-truth-research-scout",
  "customer-journey-scout",
  "conversion-luxury-ui-scout",
  "evidence-conflict-scout",
  "industry-context-scout",
  "report-design-quality-scout",
  "chief-product-experience-agent",
  "chief-security-command-agent",
  "chief-growth-forecast-agent",
  "business-change-forecasting-scout",
  "analytics-and-growth-scout",
]);

expect(contractPath, [
  "release-captain-review-required-before-public-report-language-expands-beyond-safe-free-scan-output",
  "release-captain-report-release-review-required",
  "customer-output-and-release-captain-approval-required-before-customer-facing-delivery",
  "controlled-maintenance-and-release-captain-review-required-before-production-impacting-change",
]);

expect(contractPath, [
  "Free Scan follow-up must be useful and calm, not pressure-based.",
  "Paid-plan recommendations must be evidence-supported and plan-fit labeled.",
  "Deep Review may ask additional questions after payment when more detail improves accuracy, but must not request passwords, tokens, private keys, card numbers, bank details, or raw security payloads.",
  "Build Fix / Optimization must define concrete scope, required customer assets, approval checkpoints, and rollback/revision posture before delivery claims.",
  "Ongoing Control must use controlled monitoring and approval gates, not uncontrolled production mutation or autonomous business changes.",
  "All plan emails must preserve truthful status, privacy, safe next action, and no fake urgency.",
]);

expect(contractPath, [
  "planWithoutIntake",
  "planWithoutEvidence",
  "planWithoutReportOrDeliverable",
  "planWithoutEmailLifecycle",
  "planWithoutFollowUp",
  "planWithoutAgentOwner",
  "planWithoutApprovalGate",
  "freeScanPresentedAsFinalCompleteDiagnosis",
  "customerClaimTreatedAsVerifiedFact",
  "paidRecommendationWithoutEvidence",
  "optimizationWithoutScopeApproval",
  "monthlyControlWithoutApprovalGate",
  "uncontrolledAgentPlanDelivery",
  "rawPayloadPlanDelivery",
  "rawEvidencePlanDelivery",
  "privateCredentialPlanDelivery",
  "paymentDataPlanDelivery",
  "crossCustomerPlanDelivery",
  "fakeUrgencyPlanFollowUp",
  "guaranteedOutcomePlanClaim",
  "guaranteedRevenuePlanClaim",
  "guaranteedAccuracyPlanClaim",
]);

expect(matrixPath, [
  "COMPLETE_PLAN_FULFILLMENT_MATRIX",
  "Complete Cendorq Plan Fulfillment Matrix",
  "valueArchitecture",
  "educationalReportStandard",
  "planBoundaryRules",
  "conversionStandards",
  "valuePromise",
  "educationDepth",
  "planBoundary",
  "conversionMethod",
]);

expect(runtimePath, [
  "projectCompletePlanFulfillment",
  "projectCompletePlan",
  "customerEducationReviewed",
  "valueExceedsPriceReviewed",
  "planBoundaryProtected",
  "conversionMethodApproved",
  "customerFacingDeliveryAllowed",
  "upgradeOrRetentionAllowed",
  "educationalCustomerExplanation",
  "valueBoundaryExplanation",
  "fulfillmentStageIncomplete",
  "valueAbovePriceReviewMissing",
  "planBoundaryProtectionMissing",
  "conversionMethodReviewMissing",
]);

expect(entitlementPath, [
  "PLAN_ENTITLEMENT_ROUTING_CONTRACT",
  "Cendorq Plan Entitlement and Nonlinear Purchase Routing Contract",
  "publicPlanMicroDisclosures",
  "dashboardReminderRules",
  "reportLimitationRules",
  "entitlementBoundaries",
  "nonlinearPurchaseScenarios",
  "limitationLanguageRules",
  "loopholeProtections",
  "getPlanEntitlementRoutingContract",
]);

expect(entitlementPath, [
  "Customers may purchase any public plan directly",
  "must not deliver unpaid reports",
  "Free Scan is a first-read report. Full diagnosis, implementation, and recurring monitoring are separate plans if you want deeper help.",
  "Build Fix can proceed directly. For the clearest customer-facing diagnosis behind the work, add Deep Review; otherwise Cendorq uses available evidence and internal orientation within the purchased optimization scope.",
  "Ongoing Control can start directly. If implementation gaps are found, Build Fix is the proper plan for done-for-you optimization; Deep Review is the proper plan for a standalone full diagnosis.",
  "No full diagnostic report from Build Fix unless Deep Review entitlement exists.",
  "No Build Fix implementation package from Ongoing Control unless Build Fix entitlement exists.",
  "No unpaid internal analysis becomes downloadable, emailed, report-vault-visible, or customer-facing as a standalone artifact.",
]);

expect(matrixValidatorPath, [
  "Complete plan fulfillment matrix validation passed.",
  "src/lib/complete-plan-fulfillment-matrix.ts",
]);

expect(runtimeValidatorPath, [
  "Complete plan fulfillment runtime validation passed.",
  "src/lib/complete-plan-fulfillment-runtime.ts",
]);

expect(entitlementValidatorPath, [
  "Plan entitlement routing contracts validation passed.",
  "src/lib/plan-entitlement-routing-contracts.ts",
]);

expect(routesChainPath, [
  "src/scripts/validate-plan-delivery-orchestration-contracts.mjs",
]);

forbidden(contractPath, [
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency is allowed",
  "customer claims are verified facts",
  "agents may approve delivery",
  "uncontrolled production mutation",
  "passwords requested",
  "tokens requested",
  "private keys requested",
  "card numbers requested",
  "bank details requested",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

for (const guardedPath of [matrixPath, runtimePath, entitlementPath]) {
  forbidden(guardedPath, [
    "guaranteed ROI",
    "guaranteed revenue",
    "guaranteed accuracy",
    "100% accurate",
    "100 percent accurate",
    "impossible to hack",
    "never liable",
    "liability-free",
    "fake urgency is allowed",
    "agents can approve delivery",
    "agents may approve delivery",
    "passwords requested",
    "tokens requested",
    "private keys requested",
    "card numbers requested",
    "bank details requested",
    "raw payloads are exposed",
    "customer claims are verified facts",
    "uncontrolled production mutation",
    "customerFacingDeliveryAllowed: true",
    "upgradeOrRetentionAllowed: true",
    "localStorage.setItem",
    "sessionStorage.setItem",
  ]);
}

if (failures.length) {
  console.error("Plan delivery orchestration contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plan delivery orchestration contracts validation passed, including complete fulfillment and entitlement routing coverage.");

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
