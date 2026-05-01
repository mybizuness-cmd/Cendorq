import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/plan-delivery-orchestration-contracts.ts";
const matrixPath = "src/lib/complete-plan-fulfillment-matrix.ts";
const runtimePath = "src/lib/complete-plan-fulfillment-runtime.ts";
const routingRuntimePath = "src/lib/plan-routing-runtime.ts";
const entitlementPath = "src/lib/plan-entitlement-routing-contracts.ts";
const reconciliationPath = "src/lib/plan-post-delivery-reconciliation-contracts.ts";
const panelPath = "src/app/command-center/complete-plan-fulfillment-panel.tsx";
const routingPanelPath = "src/app/command-center/plan-routing-runtime-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const matrixValidatorPath = "src/scripts/validate-complete-plan-fulfillment-matrix.mjs";
const runtimeValidatorPath = "src/scripts/validate-complete-plan-fulfillment-runtime.mjs";
const routingRuntimeValidatorPath = "src/scripts/validate-plan-routing-runtime.mjs";
const entitlementValidatorPath = "src/scripts/validate-plan-entitlement-routing-contracts.mjs";
const reconciliationValidatorPath = "src/scripts/validate-plan-post-delivery-reconciliation-contracts.mjs";
const panelValidatorPath = "src/scripts/validate-command-center-complete-plan-fulfillment-panel.mjs";
const routingPanelValidatorPath = "src/scripts/validate-command-center-plan-routing-runtime-panel.mjs";
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

expect(routingRuntimePath, [
  "projectPlanRouting",
  "getPlanRoutingRuntimeContractKeys",
  "PLAN_ENTITLEMENT_ROUTING_CONTRACT",
  "PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT",
  "VERIFIED_WELCOME_EMAIL_CONTRACT",
  "warningEmailWithoutEvidence",
  "inboxConfirmationAlreadyCompleted",
  "material-rework-change-order",
  "safeCustomerLanguage",
]);

expect(entitlementPath, [
  "PLAN_ENTITLEMENT_ROUTING_CONTRACT",
  "Cendorq Plan Entitlement and Purchase Routing Contract",
  "publicPlanMicroDisclosures",
  "linearPurchaseSequences",
  "directPurchaseWarningEmails",
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
  "linear purchases",
  "stopped journeys",
  "must not deliver unpaid reports",
  "free-scan-stops",
  "deep-review-stops",
  "build-fix-stops",
  "ongoing-control-active",
  "build-fix-direct-scope-confirmation",
  "ongoing-control-direct-scope-confirmation",
  "Every linear stop point must show completed entitlement, not-included scope, next best plan, follow-up cadence, and suppression rules.",
]);

expect(entitlementPath, [
  "Free Scan is a first-read report. Full diagnosis, implementation, and recurring monitoring are separate plans if you want deeper help.",
  "Build Fix can proceed directly. For the clearest customer-facing diagnosis behind the work, add Deep Review; otherwise Cendorq uses available evidence and internal orientation within the purchased optimization scope.",
  "Ongoing Control can start directly. If implementation gaps are found, Build Fix is the proper plan for done-for-you optimization; Deep Review is the proper plan for a standalone full diagnosis.",
  "No full diagnostic report from Build Fix unless Deep Review entitlement exists.",
  "No Build Fix implementation package from Ongoing Control unless Build Fix entitlement exists.",
  "No unpaid internal analysis becomes downloadable, emailed, report-vault-visible, or customer-facing as a standalone artifact.",
  "No warning email may imply a missing prerequisite is required for the purchased plan to begin if payment has already been accepted.",
]);

expect(reconciliationPath, [
  "PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT",
  "Cendorq Post-Delivery Plan Reconciliation Contract",
  "A second purchase after delivery creates a new entitlement; it does not automatically convert the already-delivered work into an unlimited redo.",
  "scoped reconciliation addendum",
  "no-change-needed",
  "minor-alignment-addendum",
  "cendorq-error-correction",
  "material-rework-change-order",
  "future-cycle-application",
  "build-fix-then-deep-review",
  "ongoing-control-then-build-fix",
  "ongoing-control-then-deep-review",
  "deep-review-then-build-fix-after-delay",
  "Release-captain review is required before promising a redo, correction, discount, credit, change order, or retroactive monthly update.",
]);

expect(panelPath, [
  "CompletePlanFulfillmentPanel",
  "projectCompletePlanFulfillment",
  "A-to-Z plan delivery cockpit",
  "VisualMatrixOverview",
  "ProgressRail",
  "GateGrid",
  "VisualPostureCard",
  "StatusPill",
  "value, education, boundaries, conversion, stages, artifacts, and approval",
  "protects higher-tier revenue streams",
  "Customer education reviewed",
  "Value above price reviewed",
  "Plan boundary protected",
  "Conversion method approved",
  "Customer-facing delivery allowed",
]);

expect(routingPanelPath, [
  "PlanRoutingRuntimePanel",
  "projectPlanRouting",
  "Operator visibility for plan stops, direct purchases, late add-ons, warning emails, and one-time inbox confirmation.",
  "Decision matrix",
  "safe projection",
  "warningEmailAllowed",
  "inboxConfirmationAllowed",
  "reconciliationOutcome",
  "Safe customer language",
]);

expect(pagePath, [
  "CompletePlanFulfillmentPanel",
  "PlanRoutingRuntimePanel",
  "./complete-plan-fulfillment-panel",
  "./plan-routing-runtime-panel",
  "<PlanDeliveryOrchestrationPanel />",
  "<PlanRoutingRuntimePanel />",
  "<CompletePlanFulfillmentPanel />",
  "<OptimizationLibraryPanel methods={optimizationMethods} />",
]);

expect(matrixValidatorPath, [
  "Complete plan fulfillment matrix validation passed.",
  "src/lib/complete-plan-fulfillment-matrix.ts",
]);

expect(runtimeValidatorPath, [
  "Complete plan fulfillment runtime validation passed.",
  "src/lib/complete-plan-fulfillment-runtime.ts",
]);

expect(routingRuntimeValidatorPath, [
  "Plan routing runtime validation passed.",
  "src/lib/plan-routing-runtime.ts",
]);

expect(entitlementValidatorPath, [
  "Plan entitlement routing contracts validation passed.",
  "src/lib/plan-entitlement-routing-contracts.ts",
]);

expect(reconciliationValidatorPath, [
  "Plan post-delivery reconciliation contracts validation passed.",
  "src/lib/plan-post-delivery-reconciliation-contracts.ts",
]);

expect(panelValidatorPath, [
  "Command center complete plan fulfillment panel validation passed.",
  "src/app/command-center/complete-plan-fulfillment-panel.tsx",
]);

expect(routingPanelValidatorPath, [
  "Command center plan routing runtime panel validation passed.",
  "src/app/command-center/plan-routing-runtime-panel.tsx",
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

for (const guardedPath of [matrixPath, runtimePath, routingRuntimePath, entitlementPath, reconciliationPath, panelPath, routingPanelPath]) {
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

console.log("Plan delivery orchestration contracts validation passed, including fulfillment, entitlement routing, routing runtime, routing panel, linear paths, warning emails, post-delivery reconciliation, and command-center panel coverage.");

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
