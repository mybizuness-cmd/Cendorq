import { resolveCendorqCustomerJourney, type CendorqPaidPlanKey } from "@/lib/customer-journey-orchestrator";

export type CendorqWorkStartGateKey = "review-intake" | "repair-prerequisite" | "control-baseline";

export type CendorqWorkStartGate = {
  key: CendorqWorkStartGateKey;
  planKey: CendorqPaidPlanKey;
  customerTitle: string;
  customerPromise: string;
  requiredBeforeQueue: readonly string[];
  backendStartRule: string;
  customerSafeAction: string;
  blockedPattern: string;
  dashboardHref: string;
};

export const CENDORQ_WORK_START_GATES: readonly CendorqWorkStartGate[] = [
  {
    key: "review-intake",
    planKey: "deep-review",
    customerTitle: "Review intake gate",
    customerPromise: "Cendorq can begin the AI Readiness Review only after the business, page, audience, concern, and competitor context are clear enough to review.",
    requiredBeforeQueue: ["business URL or main page", "review focus", "top customer type", "main concern", "competitors or alternatives", "verified customer/business ownership"],
    backendStartRule: "Create review queue only after ownership is verified and review intake is complete enough to avoid guessing.",
    customerSafeAction: "Complete review intake so Cendorq knows what to evaluate first.",
    blockedPattern: "Do not start a broad audit from a payment receipt alone.",
    dashboardHref: "/dashboard/reports",
  },
  {
    key: "repair-prerequisite",
    planKey: "build-fix",
    customerTitle: "Repair prerequisite gate",
    customerPromise: "Cendorq can begin Signal Repair only after there is a completed AI Readiness Review or an approved supported diagnosis plus a confirmed repair target.",
    requiredBeforeQueue: ["completed AI Readiness Review or approved supported diagnosis", "approved repair target", "approved business description", "primary CTA", "brand constraints", "available assets", "approval contact"],
    backendStartRule: "Hold repair as do-not-start until diagnosis and repair scope are approved; never turn repair into unpaid review work.",
    customerSafeAction: "Confirm an existing diagnosis or complete the review path before repair starts.",
    blockedPattern: "Do not let a direct Signal Repair purchase bypass diagnosis.",
    dashboardHref: "/dashboard/support/request",
  },
  {
    key: "control-baseline",
    planKey: "ongoing-control",
    customerTitle: "Control baseline gate",
    customerPromise: "Cendorq can begin Readiness Control only after there is a baseline review, supported diagnosis, or prior repair history plus a monthly priority.",
    requiredBeforeQueue: ["baseline review, supported diagnosis, or prior repair history", "approved monthly control baseline", "monthly priority", "channels to watch", "competitor set", "reporting preference", "approval contact"],
    backendStartRule: "Hold control setup until the baseline and monthly control scope are approved.",
    customerSafeAction: "Confirm the baseline and first monthly priority before monitoring starts.",
    blockedPattern: "Do not start monthly monitoring with no known baseline.",
    dashboardHref: "/dashboard/billing",
  },
] as const;

export const CENDORQ_WORK_START_GATE_PROJECTIONS = CENDORQ_WORK_START_GATES.map((gate) => ({
  ...gate,
  decision: resolveCendorqCustomerJourney({
    purchasedPlan: gate.planKey,
    source: "support",
    completedEvidence: ["customerOwnershipVerified"],
    completedIntake: [],
  }),
}));

export function getCendorqWorkStartGate(planKey: CendorqPaidPlanKey) {
  return CENDORQ_WORK_START_GATES.find((gate) => gate.planKey === planKey) ?? CENDORQ_WORK_START_GATES[0];
}
