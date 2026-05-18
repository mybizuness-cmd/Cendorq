export type PlanValueKey = "free-scan" | "deep-review" | "build-fix" | "ongoing-control";

export type PlanValueDelivery = {
  key: PlanValueKey;
  customerName: string;
  price: string;
  primaryValue: string;
  customerOutcome: string;
  includes: readonly string[];
  doesNotInclude: readonly string[];
  reportBoundary: string;
  upgradeLogic: string;
  bestWhen: string;
  avoidWhen: string;
};

export const PLAN_VALUE_DELIVERY_ARCHITECTURE = [
  {
    key: "free-scan",
    customerName: "Free Scan",
    price: "$0",
    primaryValue: "Reveal the first visible customer-decision signal without pretending to be a full review.",
    customerOutcome: "The customer understands what may be costing choices first and why deeper review may or may not be needed.",
    includes: [
      "Protected dashboard Free Scan result",
      "First signal across clarity, trust, choice, action, visibility, and proof",
      "Evidence boundary and confidence posture",
      "Visible limitations",
      "Best next move guidance",
    ],
    doesNotInclude: [
      "Full root-cause review",
      "Implementation work",
      "Monthly monitoring",
      "Private-data investigation",
      "Guaranteed revenue outcome",
    ],
    reportBoundary: "Directional first signal only. It can identify visible risk but must not present itself as a final review.",
    upgradeLogic: "Upgrade to Deep Review when the first signal matters enough that guessing would be more expensive than evidence-backed review.",
    bestWhen: "The customer needs a safe first read before spending money.",
    avoidWhen: "The customer already knows the exact fix and needs implementation only.",
  },
  {
    key: "deep-review",
    customerName: "Deep Review",
    price: "$497",
    primaryValue: "Find the reason customers or AI engines may hesitate before the customer pays for fixing, ads, or redesign work.",
    customerOutcome: "The customer gets evidence-backed review with cause-level clarity and a prioritized decision path.",
    includes: [
      "Evidence-backed Deep Review",
      "Cause analysis across clarity, trust, proof, and action",
      "Customer-friction explanation",
      "Prioritized issue map",
      "Build Fix direction and plan-fit recommendation",
    ],
    doesNotInclude: [
      "Done-for-you implementation",
      "Ongoing monthly monitoring",
      "Unlimited revisions",
      "Ad spend management",
      "Guaranteed revenue outcome",
    ],
    reportBoundary: "Review and decision clarity. It should not be sold as implementation or recurring management.",
    upgradeLogic: "Upgrade to Build Fix when the review identifies a fixable page, message, proof, or action-path issue ready for implementation.",
    bestWhen: "The customer needs to know the real cause before spending more.",
    avoidWhen: "The customer wants continuous monitoring or already has a reviewed priority and only needs execution.",
  },
  {
    key: "build-fix",
    customerName: "Build Fix",
    price: "$1,497",
    primaryValue: "Improve the specific weak page, message, proof, or action path that is costing customer choices.",
    customerOutcome: "The customer receives implementation work focused on a clearly scoped visibility, readiness, or conversion weakness.",
    includes: [
      "Scoped Build Fix intake",
      "Fix target confirmation",
      "Customer-facing improvement work",
      "Approved business details alignment",
      "Delivery progress inside dashboard",
    ],
    doesNotInclude: [
      "Full Deep Review unless purchased separately",
      "Unlimited site rebuild",
      "Monthly monitoring",
      "Advertising management",
      "Guaranteed revenue outcome",
    ],
    reportBoundary: "Implementation of a defined fix. It should not replace Deep Review when the root cause is unclear.",
    upgradeLogic: "Move into Ongoing Control when the customer needs repeated review, monitoring, and monthly decision support after the fix.",
    bestWhen: "The weak part is clear enough to improve safely.",
    avoidWhen: "The cause is still unknown and the fix target would be guesswork.",
  },
  {
    key: "ongoing-control",
    customerName: "Ongoing Control",
    price: "$597/mo",
    primaryValue: "Keep customer-friction, visibility, trust, AI/search posture, and monthly priorities under active watch.",
    customerOutcome: "The customer gets a recurring control loop, not a one-time review or one-time fix.",
    includes: [
      "Monthly priority selection",
      "Recurring review cycle",
      "Dashboard status and alerts",
      "Report history and trend awareness",
      "Support path for monthly control decisions",
    ],
    doesNotInclude: [
      "Unlimited Build Fix implementation",
      "Standalone Deep Review every month unless scoped",
      "Ad spend management",
      "Guaranteed ranking or AI answer placement",
      "Guaranteed revenue outcome",
    ],
    reportBoundary: "Recurring control and monitoring. It should not be confused with unlimited implementation or repeated full review reports.",
    upgradeLogic: "Use Build Fix when monitoring identifies a concrete improvement that needs implementation.",
    bestWhen: "The business needs ongoing visibility and decision support after the first issue is understood or stabilized.",
    avoidWhen: "The customer only needs one first signal or one specific fix.",
  },
] as const satisfies readonly PlanValueDelivery[];

export const PLAN_VALUE_SEPARATION_RULES = [
  "Free Scan identifies a first visible signal; Deep Review explains the reason; Build Fix implements a scoped improvement; Ongoing Control monitors and guides monthly decisions.",
  "Never sell Free Scan as a full review.",
  "Never sell Deep Review as done-for-you implementation.",
  "Never sell Build Fix as unlimited implementation or recurring monitoring.",
  "Never sell Ongoing Control as unlimited Build Fix work or guaranteed ranking, AI placement, or revenue.",
  "Every plan must state what it includes and what it does not include.",
  "Every upgrade path must explain why the next plan is different, not just more expensive.",
  "Every customer-facing plan block must avoid duplicate deliverable language that makes two plans feel the same.",
] as const;

export const PLAN_VALUE_NO_OVERLAP_MATRIX = [
  {
    from: "Free Scan",
    notTheSameAs: "Deep Review",
    boundary: "Free Scan is a first visible signal; Deep Review is evidence-backed review.",
  },
  {
    from: "Deep Review",
    notTheSameAs: "Build Fix",
    boundary: "Deep Review explains the cause; Build Fix performs scoped improvement work.",
  },
  {
    from: "Build Fix",
    notTheSameAs: "Ongoing Control",
    boundary: "Build Fix is one scoped implementation; Ongoing Control is recurring monitoring and monthly decision support.",
  },
  {
    from: "Ongoing Control",
    notTheSameAs: "Deep Review",
    boundary: "Ongoing Control watches and guides over time; Deep Review creates one evidence-backed cause-level review.",
  },
] as const;

export function getPlanValueDelivery(planKey: PlanValueKey) {
  return PLAN_VALUE_DELIVERY_ARCHITECTURE.find((plan) => plan.key === planKey) || PLAN_VALUE_DELIVERY_ARCHITECTURE[0];
}
