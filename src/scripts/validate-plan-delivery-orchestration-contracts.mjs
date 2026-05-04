import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const contractPath = "src/lib/plan-delivery-orchestration-contracts.ts";
const deepReviewFoundationPath = "src/lib/deep-review-intake-delivery-foundation.ts";
const buildFixFoundationPath = "src/lib/build-fix-optimization-orchestration-foundation.ts";
const ongoingControlMonthlyPath = "src/lib/ongoing-control-monthly-foundation.ts";
const matrixPath = "src/lib/complete-plan-fulfillment-matrix.ts";
const runtimePath = "src/lib/complete-plan-fulfillment-runtime.ts";
const routingRuntimePath = "src/lib/plan-routing-runtime.ts";
const entitlementPath = "src/lib/plan-entitlement-routing-contracts.ts";
const reconciliationPath = "src/lib/plan-post-delivery-reconciliation-contracts.ts";
const panelPath = "src/app/command-center/complete-plan-fulfillment-panel.tsx";
const routingPanelPath = "src/app/command-center/plan-routing-runtime-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";

for (const path of [
  contractPath,
  deepReviewFoundationPath,
  buildFixFoundationPath,
  ongoingControlMonthlyPath,
  matrixPath,
  runtimePath,
  routingRuntimePath,
  entitlementPath,
  reconciliationPath,
  panelPath,
  routingPanelPath,
  pagePath,
  routesChainPath,
]) validateFileExists(path);

if (!failures.length) {
  expect(contractPath, [
    "PLAN_DELIVERY_ORCHESTRATION_CONTRACT",
    "Cendorq Plan Delivery Orchestration Contract",
    "getPlanDeliveryOrchestrationContract",
    "intake, evidence, report creation, email delivery, follow-up, agent ownership, customer handoffs, and upgrade paths",
    "free-scan",
    "deep-review",
    "build-fix",
    "ongoing-control",
    "release-captain-review-required-before-public-report-language-expands-beyond-safe-free-scan-output",
    "release-captain-report-release-review-required",
    "customer-output-and-release-captain-approval-required-before-customer-facing-delivery",
    "controlled-maintenance-and-release-captain-review-required-before-production-impacting-change",
  ]);

  expect(deepReviewFoundationPath, [
    "projectDeepReviewIntakeDeliveryFoundation",
    "getDeepReviewIntakeDeliveryRules",
    "deep-review-report",
    "expanded diagnostic questionnaire",
    "full diagnostic report",
    "priority blocker map",
    "unpaidDeliverableLeaked: false",
    "pendingReportPresentedAsFinal: false",
  ]);

  expect(buildFixFoundationPath, [
    "projectBuildFixOptimizationOrchestration",
    "getBuildFixOptimizationOrchestrationRules",
    "Build Fix / Optimization",
    "approved optimization scope",
    "priority implementation task list",
    "customer approval checkpoints",
    "before-after evidence record",
    "deepReviewReportIncluded: false",
    "unpaidDeliverableLeaked: false",
    "optimizationWithoutScopeApproval: false",
  ]);

  expect(ongoingControlMonthlyPath, [
    "projectOngoingControlMonthlyFoundation",
    "getOngoingControlMonthlyRules",
    "Ongoing Control / Monthly",
    "monthly status summary",
    "approved periodic report",
    "controlled monitoring notices",
    "dashboard inbox messages",
    "buildFixIncluded: false",
    "deepReviewReportIncluded: false",
    "fakeUrgencyAllowed: false",
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
    "loopholeProtections",
  ]);

  expect(reconciliationPath, [
    "PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT",
    "Cendorq Post-Delivery Plan Reconciliation Contract",
    "scoped reconciliation addendum",
    "no-change-needed",
    "minor-alignment-addendum",
    "cendorq-error-correction",
    "material-rework-change-order",
    "future-cycle-application",
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
  ]);

  expect(routingPanelPath, [
    "PlanRoutingRuntimePanel",
    "projectPlanRouting",
    "Decision matrix",
    "safe projection",
    "warningEmailAllowed",
    "inboxConfirmationAllowed",
    "reconciliationOutcome",
    "Safe customer language",
  ]);

  expect(pagePath, [
    "PlanRoutingRuntimePanel",
    "./plan-routing-runtime-panel",
    "<PlanDeliveryOrchestrationPanel />",
    "<PlanRoutingRuntimePanel />",
  ]);

  expect(routesChainPath, ["src/scripts/validate-plan-delivery-orchestration-contracts.mjs"]);

  for (const guardedPath of [
    contractPath,
    deepReviewFoundationPath,
    buildFixFoundationPath,
    ongoingControlMonthlyPath,
    matrixPath,
    runtimePath,
    routingRuntimePath,
    entitlementPath,
    reconciliationPath,
    panelPath,
    routingPanelPath,
  ]) forbidden(guardedPath, unsafePhrases());
}

if (failures.length) {
  console.error("Plan delivery orchestration contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plan delivery orchestration contracts validation passed, including Deep Review intake delivery, Build Fix optimization orchestration, Ongoing Control monthly foundation, fulfillment, entitlement routing, routing runtime, routing panel, linear paths, warning emails, post-delivery reconciliation, and command-center panel coverage.");

function unsafePhrases() {
  return [
    "guaranteed " + "ROI",
    "guaranteed " + "revenue",
    "guaranteed " + "growth",
    "guaranteed " + "accuracy",
    "100% accurate",
    "100 percent accurate",
    "impossible to " + "hack",
    "never " + "liable",
    "liability" + "-free",
    "fake urgency is allowed",
    "customer claims are verified facts",
    "agents may approve delivery",
    "agents can approve delivery",
    "uncontrolled production " + "mutation",
    "passwords requested",
    "tokens requested",
    "private keys requested",
    "card numbers requested",
    "bank details requested",
    "raw payloads are exposed",
    "customerFacingDeliveryAllowed: true",
    "upgradeOrRetentionAllowed: true",
    "unpaidDeliverableLeaked: true",
    "freeScanSubstitute: true",
    "deepReviewReportIncluded: true",
    "buildFixIncluded: true",
    "optimizationWithoutScopeApproval: true",
    "uncontrolledProductionMutation: true",
    "uncontrolledAutoMutation: true",
    "fakeUrgencyAllowed: true",
    "customerApprovalRequiredBeforeMaterialChange: false",
    "rollbackPostureRequired: false",
    "pendingReportPresentedAsFinal: true",
    "customerClaimTreatedAsVerifiedFact: true",
    "rawPayloadExposed: true",
    "rawEvidenceExposed: true",
    "rawSecurityPayloadExposed: true",
    "rawBillingDataExposed: true",
    "internalNotesExposed: true",
    "operatorIdentityExposed: true",
    "riskInternalsExposed: true",
    "secretExposed: true",
    "tokenExposed: true",
    "unsupportedOutcomePromise: true",
    "localStorage.setItem",
    "sessionStorage.setItem",
  ];
}

function validateFileExists(path) {
  if (!existsSync(join(root, path))) failures.push(`Missing dependency: ${path}`);
}

function expect(path, phrases) {
  if (!existsSync(join(root, path))) return;
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
