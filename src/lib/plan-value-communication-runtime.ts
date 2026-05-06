import {
  getPlanValueDelivery,
  PLAN_VALUE_SEPARATION_RULES,
  type PlanValueKey,
} from "@/lib/plan-value-delivery-architecture";

export type PlanValueCommunicationMoment =
  | "free-scan-result-ready"
  | "deep-review-kickoff"
  | "build-fix-kickoff"
  | "ongoing-control-kickoff"
  | "billing-upgrade-guidance"
  | "dashboard-next-action";

export type PlanValueCommunicationProjection = {
  planKey: PlanValueKey;
  moment: PlanValueCommunicationMoment;
  subject: string;
  headline: string;
  customerPromise: string;
  includedValue: readonly string[];
  notIncluded: readonly string[];
  boundary: string;
  nextAction: string;
  safeUpgradeExplanation: string;
  prohibitedClaims: readonly string[];
};

const SUBJECT_BY_MOMENT: Record<PlanValueCommunicationMoment, string> = {
  "free-scan-result-ready": "Your Free Scan result is ready",
  "deep-review-kickoff": "Deep Review is unlocked — confirm the focus",
  "build-fix-kickoff": "Build Fix is unlocked — confirm the fix target",
  "ongoing-control-kickoff": "Ongoing Control is active — choose this month’s focus",
  "billing-upgrade-guidance": "Choose the Cendorq depth that matches the moment",
  "dashboard-next-action": "Your next Cendorq action is ready",
};

export const PLAN_VALUE_COMMUNICATION_PROHIBITED_CLAIMS = [
  "Free Scan is a full diagnosis",
  "Deep Review includes implementation",
  "Build Fix includes unlimited implementation",
  "Build Fix includes monthly monitoring",
  "Ongoing Control includes unlimited fixes",
  "Guaranteed revenue outcome",
  "Guaranteed ranking",
  "Guaranteed AI answer placement",
  "100 percent accurate result",
] as const;

export function projectPlanValueCommunication(
  planKey: PlanValueKey,
  moment: PlanValueCommunicationMoment,
): PlanValueCommunicationProjection {
  const plan = getPlanValueDelivery(planKey);

  return {
    planKey,
    moment,
    subject: SUBJECT_BY_MOMENT[moment],
    headline: `${plan.customerName}: ${plan.primaryValue}`,
    customerPromise: plan.customerOutcome,
    includedValue: plan.includes,
    notIncluded: plan.doesNotInclude,
    boundary: plan.reportBoundary,
    nextAction: plan.bestWhen,
    safeUpgradeExplanation: plan.upgradeLogic,
    prohibitedClaims: PLAN_VALUE_COMMUNICATION_PROHIBITED_CLAIMS,
  };
}

export const PLAN_VALUE_COMMUNICATION_RULES = [
  "Every email, notification, and dashboard next action must preserve the plan boundary.",
  "Free Scan communications must educate from a first visible signal without presenting a full diagnosis.",
  "Deep Review communications must focus on diagnosis and cause-level clarity without promising implementation.",
  "Build Fix communications must focus on scoped implementation without implying unlimited fixes or monthly monitoring.",
  "Ongoing Control communications must focus on recurring monitoring and monthly decisions without implying unlimited Build Fix work.",
  "Every paid communication should state what unlocks now and what remains outside the plan when confusion is likely.",
  "Upgrade language must explain a different job, not a vague better tier.",
  ...PLAN_VALUE_SEPARATION_RULES,
] as const;
