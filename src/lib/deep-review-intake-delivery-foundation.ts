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
  planLabel: "AI Readiness Review";
  stage: DeepReviewIntakeStage;
  dashboardPath: "/dashboard/reports";
  intakePath: "/dashboard";
  reportType: "ai-readiness-review-report";
  customerMessage: string;
  requiredNextAction: string;
  deliverables: readonly string[];
  requiredEvidenceSeparation: readonly string[];
  releaseApprovalRequired: true;
  emailVerificationRequired: true;
  entitlementRequired: true;
  dashboardMessageMirrorRequired: true;
  vaultFirstDeliveryRequired: true;
  safePdfDeliveryGated: true;
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
  "expanded AI Readiness Review questionnaire",
  "AI Readiness Review report",
  "priority blocker map",
  "confidence-labeled findings",
  "limitations and assumptions section",
  "plan-fit next actions",
  "dashboard message mirror",
  "vault-first released report state",
  "safe PDF delivery state when gates pass",
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
  "AI Readiness Review delivery requires active entitlement, verified email, completed paid intake, research review, and release approval",
  "AI Readiness Review may ask additional business questions after payment when more detail improves report precision",
  "AI Readiness Review must not request passwords, tokens, private keys, payment details, raw security payloads, or unrestricted private evidence",
  "AI Readiness Review must separate verified facts, customer context, observed evidence, assumptions, inferences, limitations, recommendations, and next actions",
  "AI Readiness Review report delivery must not be presented as final before research review and release approval",
  "AI Readiness Review is a paid deeper review and must not leak through Free Scan, Signal Repair, or Readiness Control without entitlement",
  "AI Readiness Review conversion language must be educational, evidence-led, and free of fake urgency or guaranteed outcome claims",
  "AI Readiness Review email delivery must mirror into the dashboard so the customer can recover the same safe message after verified login",
  "AI Readiness Review PDF delivery must stay vault-first and gated by verification, entitlement, release approval, no-leak checks, and document safety",
] as const;

export function projectDeepReviewIntakeDeliveryFoundation(input: DeepReviewIntakeDeliveryInput): DeepReviewIntakeDeliveryProjection {
  const stage = deriveStage(input);
  return {
    ok: stage === "ready-for-delivery",
    planKey: "deep-review",
    planLabel: "AI Readiness Review",
    stage,
    dashboardPath: "/dashboard/reports",
    intakePath: "/dashboard",
    reportType: "ai-readiness-review-report",
    customerMessage: getCustomerMessage(stage),
    requiredNextAction: getRequiredNextAction(stage),
    deliverables: DEEP_REVIEW_DELIVERABLES,
    requiredEvidenceSeparation: EVIDENCE_SEPARATION,
    releaseApprovalRequired: true,
    emailVerificationRequired: true,
    entitlementRequired: true,
    dashboardMessageMirrorRequired: true,
    vaultFirstDeliveryRequired: true,
    safePdfDeliveryGated: true,
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
  if (stage === "payment-required") return "AI Readiness Review requires an active paid entitlement before the evidence-backed report can begin.";
  if (stage === "intake-needed") return "Complete the protected AI Readiness Review intake so Cendorq can build the deeper report with the right context.";
  if (stage === "research-in-progress") return "Your AI Readiness Review is in progress. Cendorq is separating facts, assumptions, limitations, and recommendations before release.";
  if (stage === "report-pending-approval") return "Your AI Readiness Review is awaiting release approval and is not final until the safe report checks pass.";
  return "Your AI Readiness Review is ready in the protected report vault.";
}

function getRequiredNextAction(stage: DeepReviewIntakeStage) {
  if (stage === "payment-required") return "Choose AI Readiness Review from the plans page if you want the paid evidence-backed report.";
  if (stage === "intake-needed") return "Complete the paid intake questions from your dashboard.";
  if (stage === "research-in-progress") return "Watch the report vault for status without treating in-progress work as final.";
  if (stage === "report-pending-approval") return "Wait for approved delivery or use support for safe status questions.";
  return "Open the report vault and review findings, limitations, confidence labels, and next actions.";
}
