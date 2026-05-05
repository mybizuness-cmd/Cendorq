import { COMPLETE_PLAN_FULFILLMENT_MATRIX } from "./complete-plan-fulfillment-matrix";

export type CompletePlanKey = (typeof COMPLETE_PLAN_FULFILLMENT_MATRIX.planMatrix)[number]["planKey"];
export type FulfillmentStageState = "not-started" | "ready" | "in-progress" | "blocked" | "complete";

export type CompletePlanFulfillmentInput = {
  planKey: CompletePlanKey;
  completedStages?: readonly string[];
  completedArtifacts?: readonly string[];
  releaseCaptainApproved?: boolean;
  customerEducationReviewed?: boolean;
  valueExceedsPriceReviewed?: boolean;
  planBoundaryProtected?: boolean;
  conversionMethodApproved?: boolean;
  safeSummary?: string;
};

export type CompletePlanFulfillmentProjection = {
  planKey: CompletePlanKey;
  planName: string;
  completionGoal: string;
  valuePromise: string;
  educationDepth: string;
  planBoundary: string;
  conversionMethod: string;
  stageState: FulfillmentStageState;
  completedStageCount: number;
  totalStageCount: number;
  missingStages: readonly string[];
  missingArtifacts: readonly string[];
  requiredOwners: readonly string[];
  releaseCaptainApproved: boolean;
  customerEducationReviewed: boolean;
  valueExceedsPriceReviewed: boolean;
  planBoundaryProtected: boolean;
  conversionMethodApproved: boolean;
  customerFacingDeliveryAllowed: boolean;
  upgradeOrRetentionAllowed: boolean;
  nextAction: string;
  educationalCustomerExplanation: string;
  valueBoundaryExplanation: string;
  blockedPatterns: readonly string[];
};

export type CompletePlanFulfillmentSummary = {
  ok: boolean;
  planCount: number;
  blockedCount: number;
  deliveryAllowedCount: number;
  reviewRequiredCount: number;
  projections: readonly CompletePlanFulfillmentProjection[];
};

type PlanMatrixEntry = (typeof COMPLETE_PLAN_FULFILLMENT_MATRIX.planMatrix)[number];

export function projectCompletePlanFulfillment(inputs: readonly CompletePlanFulfillmentInput[]): CompletePlanFulfillmentSummary {
  const projections = inputs.map(projectCompletePlan);
  const blockedCount = projections.filter((projection) => projection.blockedPatterns.length > 0 || projection.stageState === "blocked").length;
  const deliveryAllowedCount = projections.filter((projection) => projection.customerFacingDeliveryAllowed).length;
  const reviewRequiredCount = projections.filter(
    (projection) =>
      !projection.releaseCaptainApproved ||
      !projection.customerEducationReviewed ||
      !projection.valueExceedsPriceReviewed ||
      !projection.planBoundaryProtected ||
      !projection.conversionMethodApproved,
  ).length;

  return {
    ok: blockedCount === 0,
    planCount: projections.length,
    blockedCount,
    deliveryAllowedCount,
    reviewRequiredCount,
    projections,
  };
}

export function projectCompletePlan(input: CompletePlanFulfillmentInput): CompletePlanFulfillmentProjection {
  const plan = COMPLETE_PLAN_FULFILLMENT_MATRIX.planMatrix.find((candidate) => candidate.planKey === input.planKey) ?? COMPLETE_PLAN_FULFILLMENT_MATRIX.planMatrix[0];
  const completedStages = new Set((input.completedStages ?? []).map((stage) => stage.toLowerCase()));
  const completedArtifacts = new Set((input.completedArtifacts ?? []).map((artifact) => artifact.toLowerCase()));
  const stageNames = COMPLETE_PLAN_FULFILLMENT_MATRIX.universalStages;
  const artifactNames = buildArtifactNames(plan);
  const missingStages = stageNames.filter((stage) => !completedStages.has(stage.toLowerCase()));
  const missingArtifacts = artifactNames.filter((artifact) => !completedArtifacts.has(artifact.toLowerCase()));
  const blockedPatterns = detectFulfillmentBlocks(input, missingStages, missingArtifacts);
  const allReviewsClear = Boolean(
    input.releaseCaptainApproved &&
      input.customerEducationReviewed &&
      input.valueExceedsPriceReviewed &&
      input.planBoundaryProtected &&
      input.conversionMethodApproved,
  );
  const customerFacingDeliveryAllowed = missingStages.length === 0 && missingArtifacts.length === 0 && allReviewsClear && blockedPatterns.length === 0;
  const stageState = getStageState(missingStages, blockedPatterns, customerFacingDeliveryAllowed);

  return {
    planKey: plan.planKey,
    planName: formatPlanName(plan.planKey),
    completionGoal: buildCompletionGoal(plan),
    valuePromise: plan.valuePromise,
    educationDepth: plan.educationDepth,
    planBoundary: plan.planBoundary,
    conversionMethod: plan.conversionMethod,
    stageState,
    completedStageCount: stageNames.length - missingStages.length,
    totalStageCount: stageNames.length,
    missingStages,
    missingArtifacts,
    requiredOwners: getRequiredOwners(plan),
    releaseCaptainApproved: Boolean(input.releaseCaptainApproved),
    customerEducationReviewed: Boolean(input.customerEducationReviewed),
    valueExceedsPriceReviewed: Boolean(input.valueExceedsPriceReviewed),
    planBoundaryProtected: Boolean(input.planBoundaryProtected),
    conversionMethodApproved: Boolean(input.conversionMethodApproved),
    customerFacingDeliveryAllowed,
    upgradeOrRetentionAllowed: customerFacingDeliveryAllowed && input.planKey !== "free-scan",
    nextAction: getNextAction(missingStages, missingArtifacts, input, blockedPatterns),
    educationalCustomerExplanation: safeText(input.safeSummary ?? buildEducationalExplanation(plan.educationDepth, plan.valuePromise)),
    valueBoundaryExplanation: safeText(buildValueBoundaryExplanation(plan.valuePromise, plan.planBoundary)),
    blockedPatterns,
  };
}

function buildArtifactNames(plan: PlanMatrixEntry) {
  return [
    `${plan.planKey} safe intake artifact`,
    `${plan.planKey} evidence summary artifact`,
    `${plan.planKey} educational explanation artifact`,
    `${plan.planKey} value boundary artifact`,
    `${plan.planKey} release-captain approval artifact`,
  ] as const;
}

function getRequiredOwners(plan: PlanMatrixEntry) {
  if (plan.planKey === "free-scan") return ["automation", "release-captain", "support"];
  if (plan.planKey === "deep-review") return ["research", "report-truth", "release-captain", "support"];
  if (plan.planKey === "build-fix") return ["implementation", "quality-review", "release-captain", "support"];
  return ["ongoing-control", "market-learning", "release-captain", "support"];
}

function formatPlanName(planKey: CompletePlanKey) {
  return planKey
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildCompletionGoal(plan: PlanMatrixEntry) {
  return `${formatPlanName(plan.planKey)} fulfillment complete with customer education, value above price, plan-boundary protection, conversion review, and release-captain approval.`;
}

function detectFulfillmentBlocks(
  input: CompletePlanFulfillmentInput,
  missingStages: readonly string[],
  missingArtifacts: readonly string[],
) {
  const blocks: string[] = [];
  if (missingStages.length) blocks.push("fulfillmentStageIncomplete");
  if (missingArtifacts.length) blocks.push("fulfillmentArtifactIncomplete");
  if (!input.releaseCaptainApproved) blocks.push("releaseCaptainApprovalMissing");
  if (!input.customerEducationReviewed) blocks.push("customerEducationReviewMissing");
  if (!input.valueExceedsPriceReviewed) blocks.push("valueAbovePriceReviewMissing");
  if (!input.planBoundaryProtected) blocks.push("planBoundaryProtectionMissing");
  if (!input.conversionMethodApproved) blocks.push("conversionMethodReviewMissing");
  return blocks;
}

function getStageState(missingStages: readonly string[], blockedPatterns: readonly string[], deliveryAllowed: boolean): FulfillmentStageState {
  if (deliveryAllowed) return "complete";
  if (blockedPatterns.length) return "blocked";
  if (missingStages.length) return "in-progress";
  return "ready";
}

function getNextAction(
  missingStages: readonly string[],
  missingArtifacts: readonly string[],
  input: CompletePlanFulfillmentInput,
  blockedPatterns: readonly string[],
) {
  if (missingStages.length) return `Complete fulfillment stage: ${missingStages[0]}.`;
  if (missingArtifacts.length) return `Complete delivery artifact: ${missingArtifacts[0]}.`;
  if (!input.customerEducationReviewed) return "Review educational explanation so the customer understands what the finding means and why it matters.";
  if (!input.valueExceedsPriceReviewed) return "Verify the plan deliverable provides practical value above the price paid without overstating results.";
  if (!input.planBoundaryProtected) return "Confirm the plan gives full promised value without giving away higher-tier revenue streams.";
  if (!input.conversionMethodApproved) return "Approve the business-appropriate conversion method before customer-facing follow-up.";
  if (!input.releaseCaptainApproved) return "Route the complete fulfillment package through release-captain approval.";
  if (blockedPatterns.length) return "Resolve fulfillment blockers before delivery.";
  return "Deliver through dashboard, report vault, email, notification, and support handoff with plan-appropriate next step.";
}

function buildEducationalExplanation(educationDepth: string, valuePromise: string) {
  return `${educationDepth} ${valuePromise}`;
}

function buildValueBoundaryExplanation(valuePromise: string, planBoundary: string) {
  return `${valuePromise} ${planBoundary}`;
}

function safeText(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().slice(0, 520);
  if (!normalized) return "Fulfillment explanation pending safe review.";
  if (/password|token|private key|card number|bank detail|raw payload|raw evidence|secret|operator identity|internal note/i.test(normalized)) {
    return "Fulfillment explanation redacted to preserve safe projection.";
  }
  return normalized;
}

function unique(values: readonly string[]) {
  return values.filter((value, index, list) => list.indexOf(value) === index);
}
