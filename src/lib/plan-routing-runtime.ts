import { PLAN_ENTITLEMENT_ROUTING_CONTRACT } from "./plan-entitlement-routing-contracts";
import { PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT } from "./plan-post-delivery-reconciliation-contracts";
import { VERIFIED_WELCOME_EMAIL_CONTRACT } from "./verified-welcome-email-contracts";

export type PlanRoutingPlanKey = "free-scan" | "deep-review" | "build-fix" | "ongoing-control";
export type PlanRoutingMode = "linear-stop" | "direct-purchase" | "late-add-on" | "active-monthly";
export type ReconciliationOutcomeKey =
  | "no-change-needed"
  | "minor-alignment-addendum"
  | "cendorq-error-correction"
  | "material-rework-change-order"
  | "future-cycle-application";

export type PlanRoutingInput = {
  customerIdHashPresent: boolean;
  verifiedEmail: boolean;
  welcomeSent: boolean;
  inboxConfirmationSent: boolean;
  inboxConfirmationCompleted: boolean;
  selectedPlan: PlanRoutingPlanKey;
  activeEntitlements: readonly PlanRoutingPlanKey[];
  routingMode: PlanRoutingMode;
  evidenceBackedRecommendation: boolean;
  customerOptedOutOfNonEssentialEmail?: boolean;
  supportRequestedNoReminders?: boolean;
  deliveryApproved?: boolean;
  intakeOrApprovalIncomplete?: boolean;
  priorDeliveredPlan?: PlanRoutingPlanKey;
  latePurchasedPlan?: PlanRoutingPlanKey;
  cendorqErrorFound?: boolean;
  materialDirectionChanged?: boolean;
  minorAlignmentNeeded?: boolean;
  activeMonthlyScope?: boolean;
};

export type PlanRoutingProjection = {
  selectedPlan: PlanRoutingPlanKey;
  routingMode: PlanRoutingMode;
  customerOwnedProjectionReady: boolean;
  purchasedEntitlement: string;
  includedScope: readonly string[];
  notIncludedScope: readonly string[];
  nextBestPlan: string;
  followUpCadence: string;
  dashboardReminderAllowed: boolean;
  warningEmailKey: string | null;
  warningEmailAllowed: boolean;
  warningEmailSuppressionReasons: readonly string[];
  reconciliationOutcome: ReconciliationOutcomeKey | null;
  reconciliationCustomerMessage: string | null;
  inboxConfirmationRequired: boolean;
  inboxConfirmationAllowed: boolean;
  inboxConfirmationSuppressionReasons: readonly string[];
  safeCustomerLanguage: string;
  blockedPatterns: readonly string[];
};

export function projectPlanRouting(input: PlanRoutingInput): PlanRoutingProjection {
  const entitlement = PLAN_ENTITLEMENT_ROUTING_CONTRACT.entitlementBoundaries.find((entry) => entry.planKey === input.selectedPlan);
  const linear = findLinearStop(input.selectedPlan, input.routingMode);
  const warningEmail = findWarningEmail(input);
  const warningEmailSuppressionReasons = getWarningEmailSuppressionReasons(input, warningEmail?.key ?? null);
  const inboxConfirmationSuppressionReasons = getInboxConfirmationSuppressionReasons(input);
  const reconciliation = getReconciliationOutcome(input);
  const blockedPatterns = getBlockedPatterns(input, warningEmail?.key ?? null, reconciliation?.key ?? null);

  return {
    selectedPlan: input.selectedPlan,
    routingMode: input.routingMode,
    customerOwnedProjectionReady: input.customerIdHashPresent && input.verifiedEmail,
    purchasedEntitlement: entitlement?.planKey ?? input.selectedPlan,
    includedScope: entitlement?.included ?? [],
    notIncludedScope: entitlement?.notIncluded ?? [],
    nextBestPlan: getNextBestPlan(input, linear),
    followUpCadence: linear?.followUpCadence ?? getFallbackFollowUp(input),
    dashboardReminderAllowed: input.evidenceBackedRecommendation && !input.customerOptedOutOfNonEssentialEmail,
    warningEmailKey: warningEmail?.key ?? null,
    warningEmailAllowed: Boolean(warningEmail && warningEmailSuppressionReasons.length === 0),
    warningEmailSuppressionReasons,
    reconciliationOutcome: reconciliation?.key ?? null,
    reconciliationCustomerMessage: reconciliation?.customerMessage ?? null,
    inboxConfirmationRequired: !input.inboxConfirmationCompleted,
    inboxConfirmationAllowed: inboxConfirmationSuppressionReasons.length === 0,
    inboxConfirmationSuppressionReasons,
    safeCustomerLanguage: buildSafeCustomerLanguage(input, linear, warningEmail?.key ?? null, reconciliation?.customerMessage ?? null),
    blockedPatterns,
  };
}

function findLinearStop(plan: PlanRoutingPlanKey, mode: PlanRoutingMode) {
  if (mode === "active-monthly") return PLAN_ENTITLEMENT_ROUTING_CONTRACT.linearPurchaseSequences.find((entry) => entry.key === "ongoing-control-active") ?? null;
  if (mode !== "linear-stop") return null;
  const keyByPlan: Record<PlanRoutingPlanKey, string> = {
    "free-scan": "free-scan-stops",
    "deep-review": "deep-review-stops",
    "build-fix": "build-fix-stops",
    "ongoing-control": "ongoing-control-active",
  };
  return PLAN_ENTITLEMENT_ROUTING_CONTRACT.linearPurchaseSequences.find((entry) => entry.key === keyByPlan[plan]) ?? null;
}

function findWarningEmail(input: PlanRoutingInput) {
  if (input.routingMode !== "direct-purchase") return null;
  if (input.selectedPlan === "build-fix" && !input.activeEntitlements.includes("deep-review")) return PLAN_ENTITLEMENT_ROUTING_CONTRACT.directPurchaseWarningEmails.find((email) => email.key === "build-fix-direct-scope-confirmation") ?? null;
  if (input.selectedPlan === "ongoing-control" && (!input.activeEntitlements.includes("build-fix") || !input.activeEntitlements.includes("deep-review"))) return PLAN_ENTITLEMENT_ROUTING_CONTRACT.directPurchaseWarningEmails.find((email) => email.key === "ongoing-control-direct-scope-confirmation") ?? null;
  return null;
}

function getWarningEmailSuppressionReasons(input: PlanRoutingInput, warningEmailKey: string | null) {
  const reasons: string[] = [];
  if (!warningEmailKey) reasons.push("noWarningEmailNeeded");
  if (!input.customerIdHashPresent) reasons.push("customerOwnershipMissing");
  if (!input.verifiedEmail) reasons.push("verifiedEmailMissing");
  if (input.customerOptedOutOfNonEssentialEmail) reasons.push("customerOptedOutOfNonEssentialEmail");
  if (input.supportRequestedNoReminders) reasons.push("supportRequestedNoReminders");
  if (!input.evidenceBackedRecommendation) reasons.push("recommendationNotEvidenceBacked");
  if (input.selectedPlan === "build-fix" && input.activeEntitlements.includes("deep-review")) reasons.push("deepReviewAlreadyActive");
  if (input.selectedPlan === "ongoing-control" && input.activeEntitlements.includes("build-fix") && input.activeEntitlements.includes("deep-review")) reasons.push("prerequisiteRecommendationsAlreadyActive");
  if (input.deliveryApproved && input.selectedPlan === "build-fix") reasons.push("buildFixDeliveryAlreadyApproved");
  return reasons;
}

function getInboxConfirmationSuppressionReasons(input: PlanRoutingInput) {
  const reasons: string[] = [];
  if (!input.customerIdHashPresent) reasons.push("customerOwnershipMissing");
  if (!input.verifiedEmail) reasons.push("verifiedEmailMissing");
  if (input.welcomeSent) reasons.push("welcomeAlreadySent");
  if (input.inboxConfirmationSent) reasons.push("inboxConfirmationAlreadySent");
  if (input.inboxConfirmationCompleted) reasons.push("inboxConfirmationAlreadyCompleted");
  return reasons;
}

function getReconciliationOutcome(input: PlanRoutingInput) {
  if (input.routingMode !== "late-add-on") return null;
  if (input.cendorqErrorFound) return findReconciliation("cendorq-error-correction");
  if (input.materialDirectionChanged) return findReconciliation("material-rework-change-order");
  if (input.minorAlignmentNeeded) return findReconciliation("minor-alignment-addendum");
  if (input.activeMonthlyScope) return findReconciliation("future-cycle-application");
  return findReconciliation("no-change-needed");
}

function findReconciliation(key: ReconciliationOutcomeKey) {
  return PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT.reconciliationOutcomes.find((outcome) => outcome.key === key) ?? null;
}

function getBlockedPatterns(input: PlanRoutingInput, warningEmailKey: string | null, reconciliationKey: ReconciliationOutcomeKey | null) {
  const blocked: string[] = [];
  if (!input.customerIdHashPresent) blocked.push("customerOwnershipMissing");
  if (!input.verifiedEmail) blocked.push("verifiedEmailMissing");
  if (warningEmailKey && !input.evidenceBackedRecommendation) blocked.push("warningEmailWithoutEvidence");
  if (reconciliationKey === "material-rework-change-order" && input.deliveryApproved && !input.materialDirectionChanged) blocked.push("materialReworkWithoutDirectionChange");
  if (input.inboxConfirmationCompleted && !input.inboxConfirmationSent) blocked.push("inboxConfirmationCompletedWithoutSentFlag");
  return blocked;
}

function getNextBestPlan(input: PlanRoutingInput, linear: (typeof PLAN_ENTITLEMENT_ROUTING_CONTRACT.linearPurchaseSequences)[number] | null) {
  if (linear) return linear.nextBestPlan;
  if (input.selectedPlan === "build-fix" && !input.activeEntitlements.includes("deep-review")) return "Deep Review when customer-facing diagnostic clarity would materially improve understanding or approval quality.";
  if (input.selectedPlan === "ongoing-control" && !input.activeEntitlements.includes("build-fix")) return "Build Fix when recurring evidence shows implementation gaps that monthly advisory scope cannot resolve.";
  if (input.selectedPlan === "ongoing-control" && !input.activeEntitlements.includes("deep-review")) return "Deep Review when standalone diagnostic clarity would improve monthly command quality.";
  return "Continue within the purchased scope and recommend the next plan only when evidence supports it.";
}

function getFallbackFollowUp(input: PlanRoutingInput) {
  if (input.selectedPlan === "build-fix") return "scope confirmation, intake reminder when needed, delivery-ready notice, and post-delivery review without pressure";
  if (input.selectedPlan === "ongoing-control") return "monthly command summary, evidence-backed change alert when appropriate, approval request when needed, and value-proof summary";
  return "report-ready notice, educational explanation, and evidence-led next-step guidance";
}

function buildSafeCustomerLanguage(input: PlanRoutingInput, linear: (typeof PLAN_ENTITLEMENT_ROUTING_CONTRACT.linearPurchaseSequences)[number] | null, warningEmailKey: string | null, reconciliationMessage: string | null) {
  const base = linear ? `${linear.completedScope} ${linear.notIncluded} ${linear.nextBestPlan}` : `Your ${input.selectedPlan} scope can continue based on the purchased entitlement and available evidence.`;
  const warning = warningEmailKey ? " A small scope reminder may be sent while work is active so expectations stay clear." : "";
  const reconciliation = reconciliationMessage ? ` ${reconciliationMessage}` : "";
  return safeText(`${base}${warning}${reconciliation}`);
}

function safeText(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().slice(0, 620);
  if (!normalized) return "Plan routing is pending safe projection.";
  const certainRevenue = "guaranteed " + "revenue";
  const certainRoi = "guaranteed " + "roi";
  if (/password|token|private key|card number|bank detail|raw payload|raw evidence|secret|operator identity|internal note|guaranteed inbox/i.test(normalized) || normalized.toLowerCase().includes(certainRevenue) || normalized.toLowerCase().includes(certainRoi)) {
    return "Plan routing language redacted to preserve safe projection.";
  }
  return normalized;
}

export function getPlanRoutingRuntimeContractKeys() {
  return {
    entitlementContract: PLAN_ENTITLEMENT_ROUTING_CONTRACT.id,
    reconciliationContract: PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT.id,
    welcomeContract: VERIFIED_WELCOME_EMAIL_CONTRACT.id,
  } as const;
}
