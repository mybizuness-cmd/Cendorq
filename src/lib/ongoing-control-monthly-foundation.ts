export type OngoingControlMonthlyStage =
  | "subscription-required"
  | "scope-required"
  | "monitoring-active"
  | "monthly-review"
  | "summary-pending-approval"
  | "summary-ready";

export type OngoingControlMonthlyInput = {
  entitlementActive: boolean;
  emailVerified: boolean;
  monitoringScopeApproved: boolean;
  baselineEstablished: boolean;
  monthlyReviewComplete: boolean;
  releaseApproved: boolean;
  foundationalOptimizationRecommended?: boolean;
};

export type OngoingControlMonthlyProjection = {
  ok: boolean;
  planKey: "ongoing-control";
  planLabel: "Ongoing Control / Monthly";
  stage: OngoingControlMonthlyStage;
  dashboardPath: "/dashboard";
  inboxPath: "/dashboard/notifications";
  reportPath: "/dashboard/reports";
  customerMessage: string;
  requiredNextAction: string;
  recurringDeliverables: readonly string[];
  approvalGates: readonly string[];
  monthlyStatusRequired: true;
  periodicReportRequired: true;
  controlledMonitoringRequired: true;
  dashboardInboxRequired: true;
  emailFollowUpAllowed: true;
  planFitGuidanceRequired: true;
  optimizationRecommendationAllowed: boolean;
  buildFixIncluded: false;
  deepReviewReportIncluded: false;
  uncontrolledAutoMutation: false;
  fakeUrgencyAllowed: false;
  unsupportedOutcomePromise: false;
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
};

const ONGOING_CONTROL_DELIVERABLES = [
  "monthly status summary",
  "approved periodic report",
  "controlled monitoring notices",
  "dashboard inbox messages",
  "email follow-up when appropriate",
  "plan-fit guidance",
  "optimization recommendation when implementation gaps are found",
] as const;

const APPROVAL_GATES = [
  "active subscription entitlement",
  "verified customer account",
  "approved monitoring scope",
  "baseline established before comparison",
  "monthly review completed before customer-facing summary",
  "release-captain approval before monthly report delivery",
] as const;

export const ONGOING_CONTROL_MONTHLY_RULES = [
  "Ongoing Control requires active entitlement, verified account, approved monitoring scope, baseline, monthly review, and release approval before customer-facing monthly summary",
  "Ongoing Control provides recurring status, approved monthly summary, monitoring notices, dashboard inbox messages, email follow-ups, plan-fit guidance, and optimization recommendations when implementation gaps are found",
  "Ongoing Control is not a substitute for Build Fix implementation or a standalone Deep Review report unless the matching entitlement exists",
  "Ongoing Control must use controlled monitoring and approval gates, not uncontrolled production mutation or autonomous business changes",
  "Ongoing Control must preserve truthful status, comparable baselines, visible regressions, limitations, and safe next actions",
  "Ongoing Control recommendations must be evidence-led and calm, without fake urgency or guaranteed growth claims",
  "Ongoing Control output must not expose private payloads, evidence, security material, billing material, internal notes, operator identities, risk internals, prompts, secrets, or tokens",
] as const;

export function projectOngoingControlMonthlyFoundation(input: OngoingControlMonthlyInput): OngoingControlMonthlyProjection {
  const stage = deriveStage(input);
  return {
    ok: stage === "summary-ready",
    planKey: "ongoing-control",
    planLabel: "Ongoing Control / Monthly",
    stage,
    dashboardPath: "/dashboard",
    inboxPath: "/dashboard/notifications",
    reportPath: "/dashboard/reports",
    customerMessage: getCustomerMessage(stage),
    requiredNextAction: getRequiredNextAction(stage),
    recurringDeliverables: ONGOING_CONTROL_DELIVERABLES,
    approvalGates: APPROVAL_GATES,
    monthlyStatusRequired: true,
    periodicReportRequired: true,
    controlledMonitoringRequired: true,
    dashboardInboxRequired: true,
    emailFollowUpAllowed: true,
    planFitGuidanceRequired: true,
    optimizationRecommendationAllowed: input.foundationalOptimizationRecommended === true,
    buildFixIncluded: false,
    deepReviewReportIncluded: false,
    uncontrolledAutoMutation: false,
    fakeUrgencyAllowed: false,
    unsupportedOutcomePromise: false,
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
  };
}

export function getOngoingControlMonthlyRules() {
  return ONGOING_CONTROL_MONTHLY_RULES;
}

function deriveStage(input: OngoingControlMonthlyInput): OngoingControlMonthlyStage {
  if (!input.entitlementActive || !input.emailVerified) return "subscription-required";
  if (!input.monitoringScopeApproved || !input.baselineEstablished) return "scope-required";
  if (!input.monthlyReviewComplete) return "monitoring-active";
  if (!input.releaseApproved) return "summary-pending-approval";
  return "summary-ready";
}

function getCustomerMessage(stage: OngoingControlMonthlyStage) {
  if (stage === "subscription-required") return "Ongoing Control requires an active subscription and verified account before monthly command summaries can begin.";
  if (stage === "scope-required") return "Cendorq needs an approved monitoring scope and baseline before monthly comparisons are useful.";
  if (stage === "monitoring-active") return "Your Ongoing Control workspace is active and monitoring is being reviewed for the next approved summary.";
  if (stage === "monthly-review") return "Your monthly review is being prepared with controlled status, regressions, opportunities, and limitations.";
  if (stage === "summary-pending-approval") return "Your monthly summary is awaiting release approval before customer-facing delivery.";
  return "Your Ongoing Control monthly summary is ready in your command center.";
}

function getRequiredNextAction(stage: OngoingControlMonthlyStage) {
  if (stage === "subscription-required") return "Activate Ongoing Control and verify your account before monthly status begins.";
  if (stage === "scope-required") return "Confirm monitoring scope and baseline so future monthly reports are comparable.";
  if (stage === "monitoring-active") return "Watch dashboard inbox and email updates while the monthly review is prepared.";
  if (stage === "monthly-review") return "Review pending status without treating unreleased analysis as final.";
  if (stage === "summary-pending-approval") return "Wait for approved delivery or use support for safe status questions.";
  return "Open your monthly summary, review progress and regressions, and choose the next safe action.";
}
