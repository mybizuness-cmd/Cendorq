export type DeepReviewIntakeStage = "payment-required" | "intake-needed" | "research-in-progress" | "report-pending-approval" | "ready-for-delivery";

export type DeepReviewIntakeDeliveryInput = {
  entitlementActive: boolean;
  emailVerified: boolean;
  intakeComplete: boolean;
  researchReviewed: boolean;
  releaseApproved: boolean;
};

export type DeepReviewIntakeDeliveryProjection = {
  ok: boolean;
  planKey: "deep-review";
  planLabel: "Deep Review / Full Scan";
  stage: DeepReviewIntakeStage;
  dashboardPath: "/dashboard/reports";
  intakePath: "/dashboard";
  reportType: "deep-review-report";
  customerMessage: string;
  requiredNextAction: string;
  deliverables: readonly string[];
  requiredEvidenceSeparation: readonly string[];
  releaseApprovalRequired: true;
  emailVerificationRequired: true;
  entitlementRequired: true;
  unpaidDeliverableLeaked: false;
  freeScanSubstitute: false;
  pendingReportPresentedAsFinal: false;
  customerClaimTreatedAsVerifiedFact: false;
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

const DEEP_REVIEW_DELIVERABLES = [
  "expanded diagnostic questionnaire",
  "full diagnostic report",
  "priority blocker map",
  "confidence-labeled findings",
  "limitations and assumptions section",
  "plan-fit next actions",
] as const;

const EVIDENCE_SEPARATION = [
  "verified facts",
  "customer-provided context",
  "observed evidence",
  "assumptions",
  "inferences",
  "limitations",
  "recommendations",
  "next actions",
] as const;

export const DEEP_REVIEW_INTAKE_DELIVERY_RULES = [
  "Deep Review delivery requires active entitlement, verified email, completed paid intake, research review, and release approval",
  "Deep Review may ask additional business questions after payment when more detail improves report precision",
  "Deep Review must not request passwords, tokens, private keys, payment details, raw security payloads, or unrestricted private evidence",
  "Deep Review must separate verified facts, customer context, observed evidence, assumptions, inferences, limitations, recommendations, and next actions",
  "Deep Review report delivery must not be presented as final before research review and release approval",
  "Deep Review is a paid deeper diagnosis and must not leak through Free Scan, Build Fix, or Ongoing Control without entitlement",
  "Deep Review conversion language must be educational, evidence-led, and free of fake urgency or guaranteed outcome claims",
] as const;

export function projectDeepReviewIntakeDeliveryFoundation(input: DeepReviewIntakeDeliveryInput): DeepReviewIntakeDeliveryProjection {
  const stage = deriveStage(input);
  return {
    ok: stage === "ready-for-delivery",
    planKey: "deep-review",
    planLabel: "Deep Review / Full Scan",
    stage,
    dashboardPath: "/dashboard/reports",
    intakePath: "/dashboard",
    reportType: "deep-review-report",
    customerMessage: getCustomerMessage(stage),
    requiredNextAction: getRequiredNextAction(stage),
    deliverables: DEEP_REVIEW_DELIVERABLES,
    requiredEvidenceSeparation: EVIDENCE_SEPARATION,
    releaseApprovalRequired: true,
    emailVerificationRequired: true,
    entitlementRequired: true,
    unpaidDeliverableLeaked: false,
    freeScanSubstitute: false,
    pendingReportPresentedAsFinal: false,
    customerClaimTreatedAsVerifiedFact: false,
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

export function getDeepReviewIntakeDeliveryRules() {
  return DEEP_REVIEW_INTAKE_DELIVERY_RULES;
}

function deriveStage(input: DeepReviewIntakeDeliveryInput): DeepReviewIntakeStage {
  if (!input.entitlementActive) return "payment-required";
  if (!input.emailVerified || !input.intakeComplete) return "intake-needed";
  if (!input.researchReviewed) return "research-in-progress";
  if (!input.releaseApproved) return "report-pending-approval";
  return "ready-for-delivery";
}

function getCustomerMessage(stage: DeepReviewIntakeStage) {
  if (stage === "payment-required") return "Deep Review requires an active paid entitlement before the full diagnostic report can begin.";
  if (stage === "intake-needed") return "Complete the protected Deep Review intake so Cendorq can build the deeper diagnostic report with the right context.";
  if (stage === "research-in-progress") return "Your Deep Review is in progress. Cendorq is separating facts, assumptions, limitations, and recommendations before release.";
  if (stage === "report-pending-approval") return "Your Deep Review is awaiting release approval and is not final until the safe report checks pass.";
  return "Your Deep Review is ready in the protected report vault.";
}

function getRequiredNextAction(stage: DeepReviewIntakeStage) {
  if (stage === "payment-required") return "Choose Deep Review from the plans page if you want the paid full diagnostic report.";
  if (stage === "intake-needed") return "Complete the paid intake questions from your dashboard.";
  if (stage === "research-in-progress") return "Watch the report vault for status without treating in-progress work as final.";
  if (stage === "report-pending-approval") return "Wait for approved delivery or use support for safe status questions.";
  return "Open the report vault and review findings, limitations, confidence labels, and next actions.";
}
