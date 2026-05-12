import { CENDORQ_REVENUE_OPERATING_SYSTEM, type CendorqRevenueStageKey } from "@/lib/cendorq-revenue-operating-system";
import { CENDORQ_PAID_PLAN_KEYS, type CendorqPaidPlanKey, type CendorqPlanKey } from "@/lib/pricing-checkout-orchestration";

export type CendorqCustomerJourneyStage =
  | "unknown"
  | "new-customer"
  | "scan-started"
  | "scan-complete"
  | "review-intake"
  | "review-complete"
  | "repair-intake"
  | "repair-complete"
  | "control-active";

export type CendorqFulfillmentState =
  | "ready-for-intake"
  | "ready-for-work-queue"
  | "held-prerequisite-required"
  | "held-intake-required"
  | "held-evidence-required"
  | "held-ownership-required"
  | "held-human-review-required";

export type CendorqBackendWorkState =
  | "do-not-start"
  | "collect-intake"
  | "verify-evidence"
  | "ready-for-review-queue"
  | "ready-for-repair-queue"
  | "ready-for-control-setup";

export type CendorqJourneyEvidenceKey =
  | "emailVerified"
  | "businessProfileExists"
  | "freeScanStarted"
  | "freeScanComplete"
  | "deepReviewPurchased"
  | "deepReviewIntakeComplete"
  | "deepReviewComplete"
  | "supportedDiagnosisApproved"
  | "repairPurchased"
  | "repairScopeApproved"
  | "repairComplete"
  | "controlPurchased"
  | "controlBaselineApproved"
  | "controlActive"
  | "customerOwnershipVerified";

export type CendorqCustomerJourneyInput = {
  purchasedPlan: CendorqPlanKey;
  customerEmail?: string;
  customerId?: string;
  businessId?: string;
  completedEvidence?: readonly CendorqJourneyEvidenceKey[];
  completedIntake?: readonly string[];
  source?: "stripe-webhook" | "checkout-success" | "dashboard" | "operator" | "support";
  sessionId?: string;
};

export type CendorqCustomerJourneyDecision = {
  purchasedPlan: CendorqPlanKey;
  customerStage: CendorqCustomerJourneyStage;
  revenueStageKey: CendorqRevenueStageKey;
  fulfillmentState: CendorqFulfillmentState;
  backendWorkState: CendorqBackendWorkState;
  dashboardDestination: string;
  emailTemplateKey: string;
  customerNextAction: string;
  operatorNextAction: string;
  missingRequirements: readonly string[];
  prerequisitePlan?: CendorqPlanKey;
  deliveryCanStart: boolean;
  paidWorkCanStart: boolean;
  shouldCreateEntitlement: boolean;
  shouldCreateBackendWorkItem: boolean;
  safeCustomerMessage: string;
  auditTags: readonly string[];
};

type PlanRule = {
  revenueStageKey: CendorqRevenueStageKey;
  dashboardDestination: string;
  emailTemplateKey: string;
  requiredIntake: readonly string[];
  requiredEvidenceBeforeWork: readonly CendorqJourneyEvidenceKey[];
  prerequisitePlan?: CendorqPlanKey;
  blockedIfMissingPrerequisite: boolean;
  readyBackendWorkState: CendorqBackendWorkState;
};

const PLAN_RULES: Record<CendorqPlanKey, PlanRule> = {
  "free-scan": {
    revenueStageKey: "first-signal",
    dashboardDestination: "/dashboard/reports/free-scan",
    emailTemplateKey: "free-scan-started",
    requiredIntake: ["business name", "business URL or primary link", "primary offer", "target customer", "main concern"],
    requiredEvidenceBeforeWork: ["emailVerified", "businessProfileExists"],
    blockedIfMissingPrerequisite: false,
    readyBackendWorkState: "collect-intake",
  },
  "deep-review": {
    revenueStageKey: "paid-review",
    dashboardDestination: "/dashboard/reports",
    emailTemplateKey: "deep-review-kickoff",
    requiredIntake: ["business URL or main page", "review focus", "top customer type", "main concern", "competitors or alternatives"],
    requiredEvidenceBeforeWork: ["customerOwnershipVerified"],
    blockedIfMissingPrerequisite: false,
    readyBackendWorkState: "ready-for-review-queue",
  },
  "build-fix": {
    revenueStageKey: "paid-repair",
    dashboardDestination: "/dashboard/support/request",
    emailTemplateKey: "build-fix-kickoff",
    requiredIntake: ["repair target", "approved business description", "primary CTA", "brand constraints", "available assets", "approval contact"],
    requiredEvidenceBeforeWork: ["customerOwnershipVerified", "repairScopeApproved"],
    prerequisitePlan: "deep-review",
    blockedIfMissingPrerequisite: true,
    readyBackendWorkState: "ready-for-repair-queue",
  },
  "ongoing-control": {
    revenueStageKey: "recurring-control",
    dashboardDestination: "/dashboard/billing",
    emailTemplateKey: "ongoing-control-kickoff",
    requiredIntake: ["monthly priority", "channels to watch", "competitor set", "reporting preference", "approval contact", "known market changes"],
    requiredEvidenceBeforeWork: ["customerOwnershipVerified", "controlBaselineApproved"],
    prerequisitePlan: "deep-review",
    blockedIfMissingPrerequisite: true,
    readyBackendWorkState: "ready-for-control-setup",
  },
};

const PREREQUISITE_EVIDENCE: Record<Exclude<CendorqPaidPlanKey, "deep-review">, readonly CendorqJourneyEvidenceKey[]> = {
  "build-fix": ["deepReviewComplete", "supportedDiagnosisApproved"],
  "ongoing-control": ["deepReviewComplete", "supportedDiagnosisApproved", "repairComplete"],
};

export function resolveCendorqCustomerJourney(input: CendorqCustomerJourneyInput): CendorqCustomerJourneyDecision {
  const rule = PLAN_RULES[input.purchasedPlan];
  const evidence = new Set(input.completedEvidence ?? []);
  const completedIntake = new Set((input.completedIntake ?? []).map((item) => normalize(item)));
  const customerStage = inferCustomerStage(evidence);
  const missingOwnership = input.purchasedPlan !== "free-scan" && !evidence.has("customerOwnershipVerified");
  const missingIntake = rule.requiredIntake.filter((item) => !completedIntake.has(normalize(item)));
  const missingEvidence = rule.requiredEvidenceBeforeWork.filter((item) => !evidence.has(item));
  const missingPrerequisite = getMissingPrerequisite(input.purchasedPlan, evidence);
  const revenueStage = CENDORQ_REVENUE_OPERATING_SYSTEM.find((stage) => stage.key === rule.revenueStageKey) ?? CENDORQ_REVENUE_OPERATING_SYSTEM[0];

  let fulfillmentState: CendorqFulfillmentState = "ready-for-work-queue";
  let backendWorkState: CendorqBackendWorkState = rule.readyBackendWorkState;
  let customerNextAction = revenueStage.nextBestAction;
  let operatorNextAction = revenueStage.backendWorkflow;
  const missingRequirements: string[] = [];

  if (missingOwnership) {
    fulfillmentState = "held-ownership-required";
    backendWorkState = "do-not-start";
    missingRequirements.push("verified customer/business ownership");
    customerNextAction = "Confirm this purchase belongs to the right business workspace before Cendorq starts paid work.";
    operatorNextAction = "Hold fulfillment until customer ownership is verified and the purchase is attached to the correct business profile.";
  } else if (missingPrerequisite) {
    fulfillmentState = "held-prerequisite-required";
    backendWorkState = "do-not-start";
    missingRequirements.push(...missingPrerequisite.missing);
    customerNextAction = missingPrerequisite.customerNextAction;
    operatorNextAction = missingPrerequisite.operatorNextAction;
  } else if (missingIntake.length) {
    fulfillmentState = "held-intake-required";
    backendWorkState = "collect-intake";
    missingRequirements.push(...missingIntake);
    customerNextAction = `Complete the ${revenueStage.customerName} intake so Cendorq knows exactly what to work on.`;
    operatorNextAction = `Do not start delivery. Request missing intake: ${missingIntake.join(", ")}.`;
  } else if (missingEvidence.length) {
    fulfillmentState = "held-evidence-required";
    backendWorkState = "verify-evidence";
    missingRequirements.push(...missingEvidence.map(formatEvidenceKey));
    customerNextAction = "Cendorq is verifying the evidence needed before paid work can safely begin.";
    operatorNextAction = `Verify required evidence before queueing work: ${missingEvidence.map(formatEvidenceKey).join(", ")}.`;
  }

  if (input.purchasedPlan === "free-scan" && missingIntake.length) {
    fulfillmentState = "ready-for-intake";
    backendWorkState = "collect-intake";
  }

  const deliveryCanStart = fulfillmentState === "ready-for-work-queue";
  const paidWorkCanStart = input.purchasedPlan !== "free-scan" && deliveryCanStart;
  const shouldCreateEntitlement = CENDORQ_PAID_PLAN_KEYS.includes(input.purchasedPlan as CendorqPaidPlanKey);
  const shouldCreateBackendWorkItem = deliveryCanStart || fulfillmentState === "held-intake-required" || fulfillmentState === "held-prerequisite-required";

  return {
    purchasedPlan: input.purchasedPlan,
    customerStage,
    revenueStageKey: rule.revenueStageKey,
    fulfillmentState,
    backendWorkState,
    dashboardDestination: rule.dashboardDestination,
    emailTemplateKey: rule.emailTemplateKey,
    customerNextAction,
    operatorNextAction,
    missingRequirements,
    prerequisitePlan: missingPrerequisite?.prerequisitePlan,
    deliveryCanStart,
    paidWorkCanStart,
    shouldCreateEntitlement,
    shouldCreateBackendWorkItem,
    safeCustomerMessage: buildSafeCustomerMessage(input.purchasedPlan, fulfillmentState, customerNextAction),
    auditTags: buildAuditTags(input, fulfillmentState, backendWorkState, customerStage),
  };
}

function getMissingPrerequisite(plan: CendorqPlanKey, evidence: Set<CendorqJourneyEvidenceKey>) {
  if (plan !== "build-fix" && plan !== "ongoing-control") return null;
  const accepted = PREREQUISITE_EVIDENCE[plan];
  if (accepted.some((item) => evidence.has(item))) return null;
  if (plan === "build-fix") {
    return {
      prerequisitePlan: "deep-review" as const,
      missing: ["completed AI Readiness Review or approved supported diagnosis", "approved repair target"],
      customerNextAction: "Your Signal Repair is confirmed, but repair cannot begin until Cendorq has a completed AI Readiness Review or approved supported diagnosis. Confirm an existing diagnosis or start the review path first.",
      operatorNextAction: "Hold Signal Repair. Do not start implementation until Deep Review or supported diagnosis is approved and repair scope is confirmed.",
    };
  }
  return {
    prerequisitePlan: "deep-review" as const,
    missing: ["baseline review, supported diagnosis, or prior repair history", "approved monthly control baseline"],
    customerNextAction: "Your Readiness Control is confirmed, but monthly control needs a baseline first. Confirm an existing review/diagnosis or complete the baseline review before monitoring starts.",
    operatorNextAction: "Hold Readiness Control setup. Do not start monitoring until baseline evidence and monthly priority are approved.",
  };
}

function inferCustomerStage(evidence: Set<CendorqJourneyEvidenceKey>): CendorqCustomerJourneyStage {
  if (evidence.has("controlActive")) return "control-active";
  if (evidence.has("repairComplete")) return "repair-complete";
  if (evidence.has("repairPurchased")) return "repair-intake";
  if (evidence.has("deepReviewComplete") || evidence.has("supportedDiagnosisApproved")) return "review-complete";
  if (evidence.has("deepReviewPurchased")) return "review-intake";
  if (evidence.has("freeScanComplete")) return "scan-complete";
  if (evidence.has("freeScanStarted")) return "scan-started";
  if (evidence.has("emailVerified") || evidence.has("businessProfileExists")) return "new-customer";
  return "unknown";
}

function buildSafeCustomerMessage(plan: CendorqPlanKey, state: CendorqFulfillmentState, nextAction: string) {
  if (state === "ready-for-work-queue") return "Your Cendorq workflow is ready. Continue in the dashboard to track the next step.";
  if (state === "held-prerequisite-required") return nextAction;
  if (state === "held-intake-required" || state === "ready-for-intake") return nextAction;
  if (state === "held-ownership-required") return nextAction;
  if (state === "held-evidence-required") return nextAction;
  return `Cendorq received the ${plan} workflow and is holding it for safe review before work begins.`;
}

function buildAuditTags(input: CendorqCustomerJourneyInput, state: CendorqFulfillmentState, backend: CendorqBackendWorkState, stage: CendorqCustomerJourneyStage) {
  return [
    `plan:${input.purchasedPlan}`,
    `stage:${stage}`,
    `fulfillment:${state}`,
    `backend:${backend}`,
    `source:${input.source ?? "unknown"}`,
    input.sessionId ? `session:${input.sessionId}` : "session:missing",
  ];
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function formatEvidenceKey(value: CendorqJourneyEvidenceKey) {
  return value.replace(/([A-Z])/g, " $1").toLowerCase();
}
