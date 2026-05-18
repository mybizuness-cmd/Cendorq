import { resolveCendorqCustomerJourney } from "@/lib/customer-journey-orchestrator";
import type { CendorqPaidPlanKey } from "@/lib/pricing-checkout-orchestration";

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
    customerPromise: "Cendorq can begin the Deep Review only after the business, page, audience, concern, and competitor context are clear enough to review.",
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
    customerPromise: "Cendorq can begin Build Fix only after there is a completed Deep Review or an approved supported diagnosis plus a confirmed fix target.",
    requiredBeforeQueue: ["completed Deep Review or approved supported diagnosis", "approved fix target", "approved business description", "primary CTA", "brand constraints", "available assets", "approval contact"],
    backendStartRule: "Hold fix as do-not-start until diagnosis and scope are approved; never turn Build Fix into unpaid review work.",
    customerSafeAction: "Confirm an existing diagnosis or complete the review path before Build Fix starts.",
    blockedPattern: "Do not let a direct Build Fix purchase bypass diagnosis.",
    dashboardHref: "/dashboard/support/request",
  },
  {
    key: "control-baseline",
    planKey: "ongoing-control",
    customerTitle: "Control baseline gate",
    customerPromise: "Cendorq can begin Ongoing Control only after there is a baseline review, supported diagnosis, or prior fix history plus a monthly priority.",
    requiredBeforeQueue: ["baseline review, supported diagnosis, or prior fix history", "approved monthly control baseline", "monthly priority", "channels to watch", "competitor set", "reporting preference", "approval contact"],
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
