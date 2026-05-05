export type BuildFixOptimizationStage = "scope-required" | "approval-required" | "implementation-ready" | "in-progress" | "summary-pending-approval" | "summary-ready";

export type BuildFixOptimizationInput = {
  entitlementActive: boolean;
  customerScopeApproved: boolean;
  requiredAssetsConfirmed: boolean;
  implementationStarted: boolean;
  beforeAfterEvidenceReviewed: boolean;
  releaseApproved: boolean;
};

export type BuildFixOptimizationProjection = {
  ok: boolean;
  planKey: "build-fix";
  planLabel: "Build Fix / Optimization";
  stage: BuildFixOptimizationStage;
  dashboardPath: "/dashboard";
  summaryPath: "/dashboard/reports";
  customerMessage: string;
  requiredNextAction: string;
  deliverables: readonly string[];
  approvalCheckpoints: readonly string[];
  beforeAfterEvidenceRequired: true;
  customerSafeProgressReportsRequired: true;
  monthlyRecommendationAllowed: boolean;
  deepReviewReportIncluded: false;
  unpaidDeliverableLeaked: false;
  optimizationWithoutScopeApproval: false;
  uncontrolledProductionMutation: false;
  customerApprovalRequiredBeforeMaterialChange: true;
  rollbackPostureRequired: true;
  rawPayloadExposed: false;
  rawEvidenceExposed: false;
  rawSecurityPayloadExposed: false;
  rawBillingDataExposed: false;
  internalNotesExposed: false;
  operatorIdentityExposed: false;
  riskInternalsExposed: false;
  promptExposed: false;
  secretExposed: false;
  tokenExposed: false;
  unsupportedOutcomePromise: false;
};

const BUILD_FIX_DELIVERABLES = [
  "approved optimization scope",
  "priority implementation task list",
  "customer approval checkpoints",
  "before-after evidence record",
  "customer-safe progress summary",
  "remaining risks and monthly-control recommendation",
] as const;

const APPROVAL_CHECKPOINTS = [
  "scope approval before implementation",
  "asset and access readiness confirmation",
  "material change approval before production-impacting work",
  "before-after evidence review",
  "release-captain summary approval before customer-facing delivery",
] as const;

export const BUILD_FIX_OPTIMIZATION_ORCHESTRATION_RULES = [
  "Build Fix requires active entitlement, approved scope, required asset confirmation, and customer approval checkpoints before implementation",
  "Build Fix must produce concrete implementation work or a scoped implementation task list, not just commentary",
  "Build Fix may use internal orientation analysis but must not deliver a standalone Deep Review report unless Deep Review entitlement exists",
  "Build Fix must preserve before-after evidence, customer-safe progress summaries, remaining risks, and rollback or revision posture",
  "Build Fix must not perform unapproved production changes or material changes without customer approval",
  "Build Fix completion may recommend Ongoing Control through remaining risks and baseline tracking, not fake urgency or guaranteed outcomes",
  "Build Fix output must not expose private payloads, evidence, security material, billing material, internal notes, operator identities, risk internals, prompts, secrets, or tokens",
] as const;

export function projectBuildFixOptimizationOrchestration(
  input: BuildFixOptimizationInput,
): BuildFixOptimizationProjection {
  const stage = deriveStage(input);
  return {
    ok: stage === "summary-ready",
    planKey: "build-fix",
    planLabel: "Build Fix / Optimization",
    stage,
    dashboardPath: "/dashboard",
    summaryPath: "/dashboard/reports",
    customerMessage: getCustomerMessage(stage),
    requiredNextAction: getRequiredNextAction(stage),
    deliverables: BUILD_FIX_DELIVERABLES,
    approvalCheckpoints: APPROVAL_CHECKPOINTS,
    beforeAfterEvidenceRequired: true,
    customerSafeProgressReportsRequired: true,
    monthlyRecommendationAllowed: stage === "summary-ready",
    deepReviewReportIncluded: false,
    unpaidDeliverableLeaked: false,
    optimizationWithoutScopeApproval: false,
    uncontrolledProductionMutation: false,
    customerApprovalRequiredBeforeMaterialChange: true,
    rollbackPostureRequired: true,
    rawPayloadExposed: false,
    rawEvidenceExposed: false,
    rawSecurityPayloadExposed: false,
    rawBillingDataExposed: false,
    internalNotesExposed: false,
    operatorIdentityExposed: false,
    riskInternalsExposed: false,
    promptExposed: false,
    secretExposed: false,
    tokenExposed: false,
    unsupportedOutcomePromise: false,
  };
}

export function getBuildFixOptimizationOrchestrationRules() {
  return BUILD_FIX_OPTIMIZATION_ORCHESTRATION_RULES;
}

function deriveStage(input: BuildFixOptimizationInput): BuildFixOptimizationStage {
  if (!input.entitlementActive || !input.customerScopeApproved) return "scope-required";
  if (!input.requiredAssetsConfirmed) return "approval-required";
  if (!input.implementationStarted) return "implementation-ready";
  if (!input.beforeAfterEvidenceReviewed) return "in-progress";
  if (!input.releaseApproved) return "summary-pending-approval";
  return "summary-ready";
}

function getCustomerMessage(stage: BuildFixOptimizationStage) {
  if (stage === "scope-required") return "Build Fix requires a paid entitlement and approved optimization scope before implementation begins.";
  if (stage === "approval-required") return "Cendorq needs required assets and approval checkpoints confirmed before implementation work proceeds.";
  if (stage === "implementation-ready") return "Your approved Build Fix scope is ready for controlled implementation.";
  if (stage === "in-progress") return "Your Build Fix work is in progress with customer-safe progress tracking and before-after evidence review.";
  if (stage === "summary-pending-approval") return "Your Build Fix summary is awaiting release approval before customer-facing delivery.";
  return "Your Build Fix summary is ready with completed work, remaining risks, and the next safe action.";
}

function getRequiredNextAction(stage: BuildFixOptimizationStage) {
  if (stage === "scope-required") return "Approve a paid Build Fix scope before implementation begins.";
  if (stage === "approval-required") return "Confirm required assets, access boundaries, and customer approval checkpoints.";
  if (stage === "implementation-ready") return "Begin controlled work only within approved scope and approval gates.";
  if (stage === "in-progress") return "Track progress and review before-after evidence without treating unfinished work as final.";
  if (stage === "summary-pending-approval") return "Wait for release approval before showing the customer-facing implementation summary.";
  return "Review the completed summary and consider Ongoing Control if remaining risks need monitoring.";
}
