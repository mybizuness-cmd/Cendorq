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
    "checkout fulfillment, entitlement, intake, evidence, report creation, report release, email delivery, dashboard retargeting, follow-up, continuous nurturing",
    "Every surface must think in stage, proof, psychology, next action, and long-term value.",
    "Every customer touch should answer: what happened, why it matters, what is next, what is known, what is unknown, and why this stage fits.",
    "Every page, dashboard card, email, report, support path, billing state, checkout state, backend trigger, and operator queue must feel like one command system",
    "stageTargetingStandard",
    "continuousNurturingStandard",
    "stageTargetingMatrix",
    "reportPresentationStandard",
    "planReportStructures",
    "Retargeting must be based on customer stage, plan ownership, report state, behavior, evidence strength, and next-best-action readiness.",
    "The dashboard is the primary conversion command room after Free Scan",
    "Free Scan moves toward AI Readiness Review",
    "AI Readiness Review moves toward Signal Repair only when repair is justified",
    "Signal Repair moves toward Readiness Control only when there is a baseline or watchlist reason",
    "Readiness Control moves toward renewal, expansion, or future feature adoption only when relevant",
    "free-scan-submitted-not-verified",
    "free-scan-opened-no-review",
    "review-purchased-intake-incomplete",
    "review-delivered-no-repair",
    "repair-purchased-scope-incomplete",
    "repair-delivered-no-control",
    "control-active-value-nurture",
    "paused-or-canceled-winback",
    "future-feature-rollout",
    "timingWindow",
    "suppressionRules",
    "proofBoundary",
    "planWithoutStageTargeting",
    "retargetingWithoutStageReason",
    "retargetingWithoutSuppressionRules",
    "No future feature, market-change alert, retention prompt, retargeting message, or expansion recommendation can be sent as customer-facing nurture unless it has a safe reason, plan fit, customer relevance, suppression review, and no-guarantee language.",
  ]);

  expect(contractPath, [
    "Every customer-facing result must look like a Cendorq category-defining business document, not a generic generated report.",
    "Every report/result must include the Cendorq logo or wordmark, report type, plan name, business identity, generated date, methodology version, release status, confidence legend, and support/correction path.",
    "Every report/result must separate verified facts, customer-provided context, observed public evidence, assumptions, inferences, limitations, contradictions, forecast direction, recommendations, next actions, and refresh triggers.",
    "Every report/result must show one strongest next action and one secondary safe path, not a crowded CTA wall.",
    "Every paid report/result must include a plain-English executive command summary, evidence map, priority map, what Cendorq checked, what Cendorq could not verify, what changed or should be watched, and why the next plan stage may or may not fit.",
    "Report vault display and downloadable report/PDF parity must preserve the same structure, logo, status, evidence boundaries, confidence, limitations, next action, and support/correction path.",
    "Protected Free Scan Result",
    "AI Readiness Review Report",
    "Signal Repair Delivery Record",
    "Readiness Control Monthly Report",
    "genericGeneratedReport",
    "unbrandedReport",
    "crowdedCtaWall",
    "downloadableReportDrift",
    "No report vault display, downloadable report, delivery summary, or monthly report can ship without Cendorq branding, plan-specific structure, evidence boundaries, confidence, limitations, next action, release status, and correction/support path.",
  ]);

  expect(deepReviewFoundationPath, [
    "projectDeepReviewIntakeDeliveryFoundation",
    "getDeepReviewIntakeDeliveryRules",
    "ai-readiness-review-report",
    "expanded AI Readiness Review questionnaire",
    "AI Readiness Review report",
    "priority blocker map",
    "dashboardMessageMirrorRequired: true",
    "vaultFirstDeliveryRequired: true",
    "safePdfDeliveryGated: true",
    "unpaidDeliverableLeaked: false",
    "pendingReportPresentedAsFinal: false",
  ]);

  expect(buildFixFoundationPath, [
    "projectBuildFixOptimizationOrchestration",
    "getBuildFixOptimizationOrchestrationRules",
    "Signal Repair",
    "approved Signal Repair scope",
    "priority implementation task list",
    "customer approval checkpoints",
    "before-after evidence record",
    "aiReadinessReviewReportIncluded: false",
    "dashboardMessageMirrorRequired: true",
    "vaultFirstDeliveryRequired: true",
    "safePdfDeliveryGated: true",
    "unpaidDeliverableLeaked: false",
    "optimizationWithoutScopeApproval: false",
  ]);

  expect(ongoingControlMonthlyPath, [
    "projectOngoingControlMonthlyFoundation",
    "getOngoingControlMonthlyRules",
    "Readiness Control",
    "monthly status summary",
    "approved periodic report",
    "controlled monitoring notices",
    "mirrored dashboard messages",
    "dashboardMessageMirrorRequired: true",
    "safePdfDeliveryGated: true",
    "vaultFirstDeliveryRequired: true",
    "signalRepairIncluded: false",
    "aiReadinessReviewReportIncluded: false",
    "fakeUrgencyAllowed: false",
  ]);

  expect(matrixPath, [
    "COMPLETE_PLAN_FULFILLMENT_MATRIX",
    "Complete Cendorq Plan Fulfillment Matrix",
    "valueArchitecture",
    "educationalReportStandard",
    "planBoundaryRules",
    "conversionStandards",
    "category-defining experience",
    "dashboard message mirror",
    "safe PDF or billing document delivery when gates pass",
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

console.log("Plan delivery orchestration contracts validation passed, including category-defining report presentation, report-vault/download parity, post-payment service sequence, stage-targeted retargeting, continuous nurturing, future feature adoption, AI Readiness Review delivery, Signal Repair orchestration, Readiness Control monthly foundation, dashboard message mirrors, safe PDF gates, fulfillment, entitlement routing, routing runtime, routing panel, linear paths, warning emails, post-delivery reconciliation, and command-center panel coverage.");

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
    "aiReadinessReviewReportIncluded: true",
    "signalRepairIncluded: true",
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
    "Deep Review / Full Scan",
    "Build Fix / Optimization",
    "Ongoing Control / Monthly",
    "premium trust",
    "premium presentation",
    "Every plan should feel premium",
    "dashboard inbox messages",
    "localStorage.setItem",
    "sessionStorage.setItem",
    "genericNurtureSpamAllowed",
    "retargetingWithoutStageReasonAllowed",
    "retargetingWithoutSuppressionRulesAllowed",
    "unsupportedFeatureRolloutPressureAllowed",
    "genericGeneratedReportAllowed",
    "unbrandedReportAllowed",
    "crowdedCtaWallAllowed",
    "forecastWithoutEvidenceAllowed",
    "downloadableReportDriftAllowed",
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
