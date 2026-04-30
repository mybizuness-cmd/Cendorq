import { PLAN_DELIVERY_ORCHESTRATION_CONTRACT } from "./plan-delivery-orchestration-contracts";

export type PlanDeliveryKey = (typeof PLAN_DELIVERY_ORCHESTRATION_CONTRACT.planLifecycles)[number]["key"];
export type PlanDeliveryState = "not-started" | "intake-needed" | "evidence-needed" | "in-progress" | "approval-needed" | "ready-for-delivery" | "delivered" | "blocked";
export type PlanDeliveryChannel = "dashboard" | "email" | "notification" | "report-vault" | "support" | "billing" | "command-center";

export type PlanDeliveryRuntimeInput = {
  planKey: PlanDeliveryKey;
  state?: PlanDeliveryState;
  completedIntake?: readonly string[];
  completedEvidence?: readonly string[];
  completedDeliverables?: readonly string[];
  completedEmails?: readonly string[];
  completedFollowUps?: readonly string[];
  releaseCaptainReviewed?: boolean;
  customerOutputApproved?: boolean;
  customerPaymentConfirmed?: boolean;
  customerOwnershipVerified?: boolean;
  safeSummary?: string;
  allowedChannels?: readonly PlanDeliveryChannel[];
};

export type PlanDeliveryRuntimeProjection = {
  planKey: PlanDeliveryKey;
  planName: string;
  state: PlanDeliveryState;
  safeSummary: string;
  missingIntake: readonly string[];
  missingEvidence: readonly string[];
  missingDeliverables: readonly string[];
  missingEmails: readonly string[];
  missingFollowUps: readonly string[];
  requiredAgents: readonly string[];
  approvalGate: string;
  releaseCaptainReviewRequired: boolean;
  customerOutputApproved: boolean;
  customerPaymentConfirmed: boolean;
  customerOwnershipVerified: boolean;
  deliveryAllowed: boolean;
  paidRecommendationAllowed: boolean;
  customerFacingClaimAllowed: boolean;
  nextAction: string;
  followUpAction: string;
  connectedDestinations: readonly PlanDeliveryChannel[];
  blockedPatterns: readonly string[];
};

export type PlanDeliveryRuntimeSummary = {
  ok: boolean;
  planCount: number;
  readyCount: number;
  blockedCount: number;
  reviewRequiredCount: number;
  projections: readonly PlanDeliveryRuntimeProjection[];
};

export function projectPlanDeliveryRuntime(inputs: readonly PlanDeliveryRuntimeInput[]): PlanDeliveryRuntimeSummary {
  const projections = inputs.map(projectPlanDeliveryLifecycle);
  const blockedCount = projections.filter((projection) => projection.blockedPatterns.length > 0 || projection.state === "blocked").length;
  const reviewRequiredCount = projections.filter((projection) => projection.releaseCaptainReviewRequired).length;
  const readyCount = projections.filter((projection) => projection.deliveryAllowed).length;

  return {
    ok: blockedCount === 0,
    planCount: projections.length,
    readyCount,
    blockedCount,
    reviewRequiredCount,
    projections,
  };
}

export function projectPlanDeliveryLifecycle(input: PlanDeliveryRuntimeInput): PlanDeliveryRuntimeProjection {
  const lifecycle = PLAN_DELIVERY_ORCHESTRATION_CONTRACT.planLifecycles.find((candidate) => candidate.key === input.planKey) ?? PLAN_DELIVERY_ORCHESTRATION_CONTRACT.planLifecycles[0];
  const state = input.state ?? inferState(input, lifecycle);
  const missingIntake = difference(lifecycle.intake, input.completedIntake);
  const missingEvidence = difference(lifecycle.requiredEvidence, input.completedEvidence);
  const missingDeliverables = difference(lifecycle.deliverables, input.completedDeliverables);
  const missingEmails = difference(lifecycle.emailLifecycle, input.completedEmails);
  const missingFollowUps = difference(lifecycle.followUpLifecycle, input.completedFollowUps);
  const blockedPatterns = detectBlockedPatterns(input, state, missingIntake, missingEvidence, missingDeliverables, missingEmails, missingFollowUps);
  const releaseCaptainReviewRequired = !input.releaseCaptainReviewed || state === "approval-needed" || blockedPatterns.length > 0;
  const customerOutputApproved = Boolean(input.customerOutputApproved) && !releaseCaptainReviewRequired && blockedPatterns.length === 0;
  const paidRecommendationAllowed = Boolean(input.customerPaymentConfirmed && input.customerOwnershipVerified && customerOutputApproved && input.planKey !== "free-scan");
  const deliveryAllowed = state === "ready-for-delivery" && customerOutputApproved && blockedPatterns.length === 0;

  return {
    planKey: lifecycle.key,
    planName: lifecycle.name,
    state,
    safeSummary: safeText(input.safeSummary ?? lifecycle.customerPromise),
    missingIntake,
    missingEvidence,
    missingDeliverables,
    missingEmails,
    missingFollowUps,
    requiredAgents: lifecycle.agentOwnership,
    approvalGate: lifecycle.approvalGate,
    releaseCaptainReviewRequired,
    customerOutputApproved,
    customerPaymentConfirmed: Boolean(input.customerPaymentConfirmed),
    customerOwnershipVerified: Boolean(input.customerOwnershipVerified),
    deliveryAllowed,
    paidRecommendationAllowed,
    customerFacingClaimAllowed: customerOutputApproved && blockedPatterns.length === 0,
    nextAction: getNextAction(state, missingIntake, missingEvidence, missingDeliverables, releaseCaptainReviewRequired),
    followUpAction: getFollowUpAction(missingEmails, missingFollowUps, state),
    connectedDestinations: normalizeChannels(input.allowedChannels),
    blockedPatterns,
  };
}

function inferState(input: PlanDeliveryRuntimeInput, lifecycle: (typeof PLAN_DELIVERY_ORCHESTRATION_CONTRACT.planLifecycles)[number]): PlanDeliveryState {
  if (!input.customerOwnershipVerified && input.planKey !== "free-scan") return "blocked";
  if (difference(lifecycle.intake, input.completedIntake).length) return "intake-needed";
  if (difference(lifecycle.requiredEvidence, input.completedEvidence).length) return "evidence-needed";
  if (!input.releaseCaptainReviewed || !input.customerOutputApproved) return "approval-needed";
  if (difference(lifecycle.deliverables, input.completedDeliverables).length) return "in-progress";
  return "ready-for-delivery";
}

function detectBlockedPatterns(
  input: PlanDeliveryRuntimeInput,
  state: PlanDeliveryState,
  missingIntake: readonly string[],
  missingEvidence: readonly string[],
  missingDeliverables: readonly string[],
  missingEmails: readonly string[],
  missingFollowUps: readonly string[],
) {
  const patterns: string[] = [];
  if (missingIntake.length) patterns.push("planWithoutIntake");
  if (missingEvidence.length) patterns.push("planWithoutEvidence");
  if (missingDeliverables.length && state === "ready-for-delivery") patterns.push("planWithoutReportOrDeliverable");
  if (missingEmails.length) patterns.push("planWithoutEmailLifecycle");
  if (missingFollowUps.length) patterns.push("planWithoutFollowUp");
  if (!input.releaseCaptainReviewed) patterns.push("planWithoutApprovalGate");
  if (input.planKey === "free-scan" && state === "delivered" && !input.releaseCaptainReviewed) patterns.push("freeScanPresentedAsFinalCompleteDiagnosis");
  if (input.planKey !== "free-scan" && !input.customerPaymentConfirmed) patterns.push("paidRecommendationWithoutEvidence");
  if ((input.planKey === "build-fix" || input.planKey === "ongoing-control") && !input.customerOutputApproved) patterns.push(input.planKey === "build-fix" ? "optimizationWithoutScopeApproval" : "monthlyControlWithoutApprovalGate");
  return patterns;
}

function getNextAction(
  state: PlanDeliveryState,
  missingIntake: readonly string[],
  missingEvidence: readonly string[],
  missingDeliverables: readonly string[],
  releaseCaptainReviewRequired: boolean,
) {
  if (state === "blocked") return "Resolve ownership, payment, or approval blockers before customer-facing delivery.";
  if (missingIntake.length) return `Collect safe intake: ${missingIntake[0]}.`;
  if (missingEvidence.length) return `Collect or verify evidence: ${missingEvidence[0]}.`;
  if (releaseCaptainReviewRequired) return "Route plan output through release-captain review before delivery.";
  if (missingDeliverables.length) return `Complete deliverable: ${missingDeliverables[0]}.`;
  return "Deliver through dashboard, report vault, notification, and email handoff with safe support path.";
}

function getFollowUpAction(missingEmails: readonly string[], missingFollowUps: readonly string[], state: PlanDeliveryState) {
  if (missingEmails.length) return `Queue safe email lifecycle step: ${missingEmails[0]}.`;
  if (missingFollowUps.length) return `Queue non-pressure follow-up: ${missingFollowUps[0]}.`;
  if (state === "delivered") return "Monitor support questions, correction requests, and next-step fit without pressure.";
  return "Keep customer informed with truthful status and one safe next action.";
}

function difference(required: readonly string[], completed: readonly string[] | undefined) {
  const completedSet = new Set((completed ?? []).map((value) => value.toLowerCase()));
  return required.filter((value) => !completedSet.has(value.toLowerCase()));
}

function normalizeChannels(channels: readonly PlanDeliveryChannel[] | undefined) {
  const defaults: PlanDeliveryChannel[] = ["dashboard", "email", "notification", "report-vault", "support", "billing"];
  const allowed = channels?.length ? channels : defaults;
  return allowed.filter((channel, index, list) => list.indexOf(channel) === index);
}

function safeText(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().slice(0, 360);
  if (!normalized) return "Plan delivery state is pending safe summary.";
  if (/raw|payload|secret|token|password|private key|card number|bank detail|customer data|internal note|operator identity/i.test(normalized)) return "Plan delivery summary redacted to preserve safe projection.";
  return normalized;
}
