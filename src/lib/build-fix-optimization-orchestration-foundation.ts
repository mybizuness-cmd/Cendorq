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
  planLabel: "Signal Repair";
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
  aiReadinessReviewReportIncluded: false;
  dashboardMessageMirrorRequired: true;
  vaultFirstDeliveryRequired: true;
  safePdfDeliveryGated: true;
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
  "approved Signal Repair scope",
  "priority implementation task list",
  "customer approval checkpoints",
  "before-after evidence record",
  "customer-safe progress summary",
  "dashboard message mirror",
  "vault-first delivery summary state",
  "safe PDF delivery state when gates pass",
  "remaining risks and Readiness Control recommendation when justified",
] as const;

const APPROVAL_CHECKPOINTS = [
  "scope approval before implementation",
  "asset and access readiness confirmation",
  "material change approval before production-impacting work",
  "before-after evidence review",
  "release-captain summary approval before customer-facing delivery",
] as const;

export const BUILD_FIX_OPTIMIZATION_ORCHESTRATION_RULES = [
  "Signal Repair requires active entitlement, approved scope, required asset confirmation, and customer approval checkpoints before implementation",
  "Signal Repair must produce concrete scoped improvement work or a scoped implementation task list, not just commentary",
  "Signal Repair may use internal orientation analysis but must not deliver a standalone AI Readiness Review report unless AI Readiness Review entitlement exists",
  "Signal Repair must preserve before-after evidence, customer-safe progress summaries, remaining risks, and rollback or revision posture",
  "Signal Repair must not perform unapproved production changes or material changes without customer approval",
  "Signal Repair completion may recommend Readiness Control through remaining risks and baseline tracking, not fake urgency or guaranteed outcomes",
  "Signal Repair output must not expose private payloads, evidence, security material, billing material, internal notes, operator identities, risk internals, prompts, secrets, or tokens",
  "Signal Repair email delivery must mirror into the dashboard so the customer can recover the same safe message after verified login",
  "Signal Repair PDF delivery must stay vault-first and gated by verification, entitlement, release approval, no-leak checks, and document safety",
] as const;

export function projectBuildFixOptimizationOrchestration(
  input: BuildFixOptimizationInput,
): BuildFixOptimizationProjection {
  const stage = deriveStage(input);
  return {
    ok: stage === "summary-ready",
    planKey: "build-fix",
    planLabel: "Signal Repair",
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
    aiReadinessReviewReportIncluded: false,
    dashboardMessageMirrorRequired: true,
    vaultFirstDeliveryRequired: true,
    safePdfDeliveryGated: true,
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
  if (stage === "scope-required") return "Signal Repair requires a paid entitlement and approved repair scope before implementation begins.";
  if (stage === "approval-required") return "Cendorq needs required assets and approval checkpoints confirmed before Signal Repair work proceeds.";
  if (stage === "implementation-ready") return "Your approved Signal Repair scope is ready for controlled implementation.";
  if (stage === "in-progress") return "Your Signal Repair work is in progress with customer-safe progress tracking and before-after evidence review.";
  if (stage === "summary-pending-approval") return "Your Signal Repair delivery summary is awaiting release approval before customer-facing delivery.";
  return "Your Signal Repair delivery summary is ready with completed work, remaining risks, and the next safe action.";
}

function getRequiredNextAction(stage: BuildFixOptimizationStage) {
  if (stage === "scope-required") return "Approve a paid Signal Repair scope before implementation begins.";
  if (stage === "approval-required") return "Confirm required assets, access boundaries, and customer approval checkpoints.";
  if (stage === "implementation-ready") return "Begin controlled work only within approved scope and approval gates.";
  if (stage === "in-progress") return "Track progress and review before-after evidence without treating unfinished work as final.";
  if (stage === "summary-pending-approval") return "Wait for release approval before showing the customer-facing delivery summary.";
  return "Review the completed summary and consider Readiness Control if remaining risks need monitoring.";
}
