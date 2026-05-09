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
    primaryValue: "Reveal the first visible AI-readiness signal without pretending to be a full review.",
    customerOutcome: "The customer sees where public clarity, proof, trust, or action may be weak before spending on deeper work.",
    includes: [
      "Protected dashboard Free Scan result",
      "First-read signal across clarity, trust, proof, action, visibility, and AI-readiness",
      "Evidence boundary and confidence posture",
      "Visible limitations",
      "Best next move guidance",
    ],
    doesNotInclude: [
      "Full root-cause review",
      "Implementation work",
      "Monthly monitoring",
      "Private-data investigation",
      "Guaranteed ranking, AI placement, leads, or revenue",
    ],
    reportBoundary: "Directional first-read result only. It can identify the first visible risk but must not present itself as final review.",
    upgradeLogic: "Upgrade to AI Readiness Review when the first signal matters enough that guessing would be more expensive than evidence-backed review.",
    bestWhen: "The customer needs a safe first read before spending money.",
    avoidWhen: "The customer already knows the exact repair and needs implementation only.",
  },
  {
    key: "deep-review",
    customerName: "AI Readiness Review",
    price: "$497",
    primaryValue: "Prove why AI engines and customers may not understand, trust, or choose the business yet.",
    customerOutcome: "The customer gets an evidence-backed review with cause-level clarity and a prioritized readiness path.",
    includes: [
      "AI-readiness review",
      "Evidence-backed cause analysis",
      "Customer-friction explanation",
      "Signal priority map",
      "Repair direction and plan-fit recommendation",
    ],
    doesNotInclude: [
      "Done-for-you implementation",
      "Ongoing monthly monitoring",
      "Unlimited revisions",
      "Ad spend management",
      "Guaranteed ranking, AI placement, leads, or revenue",
    ],
    reportBoundary: "Review and decision clarity. It should not be sold as implementation or recurring management.",
    upgradeLogic: "Upgrade to Signal Repair when the review identifies a fixable page, message, proof, or action-path issue ready for implementation.",
    bestWhen: "The customer needs evidence before making bigger changes.",
    avoidWhen: "The customer wants continuous monitoring or already has a reviewed repair target and only needs execution.",
  },
  {
    key: "build-fix",
    customerName: "Signal Repair",
    price: "$1,497",
    primaryValue: "Repair the weak page, message, proof, or action path that makes the business harder to understand or choose.",
    customerOutcome: "The customer receives scoped implementation work focused on a clearly identified readiness weakness.",
    includes: [
      "Scoped implementation intake",
      "Repair target confirmation",
      "Customer-facing improvement work",
      "Approved business details alignment",
      "Delivery progress inside dashboard",
    ],
    doesNotInclude: [
      "Full review report unless purchased separately",
      "Unlimited site rebuild",
      "Monthly monitoring",
      "Advertising management",
      "Guaranteed ranking, AI placement, leads, or revenue",
    ],
    reportBoundary: "Implementation of a defined repair. It should not replace AI Readiness Review when the root cause is unclear.",
    upgradeLogic: "Move into Readiness Control when the customer needs repeated review, monitoring, and monthly decision support after repair.",
    bestWhen: "The weak signal is clear enough to improve safely.",
    avoidWhen: "The cause is still unknown and the repair target would be guesswork.",
  },
  {
    key: "ongoing-control",
    customerName: "Readiness Control",
    price: "$597/mo",
    primaryValue: "Keep clarity, trusted proof, public signals, AI/search posture, and monthly priorities under active watch.",
    customerOutcome: "The customer gets a recurring control loop, not a one-time review or one-time repair.",
    includes: [
      "Monthly priority selection",
      "Recurring readiness review cycle",
      "Dashboard status and alerts",
      "Report history and trend awareness",
      "Support path for monthly control decisions",
    ],
    doesNotInclude: [
      "Unlimited Signal Repair implementation",
      "Standalone AI Readiness Review every month unless scoped",
      "Ad spend management",
      "Guaranteed ranking or AI answer placement",
      "Guaranteed leads or revenue",
    ],
    reportBoundary: "Recurring control and monitoring. It should not be confused with unlimited implementation or repeated full review reports.",
    upgradeLogic: "Use Signal Repair when monitoring identifies a concrete improvement that needs implementation.",
    bestWhen: "The business needs ongoing readiness attention after the first issue is understood or stabilized.",
    avoidWhen: "The customer only needs one first read or one specific repair.",
  },
] as const satisfies readonly PlanValueDelivery[];

export const PLAN_VALUE_SEPARATION_RULES = [
  "Free Scan identifies a first visible signal; AI Readiness Review proves the reason; Signal Repair implements a scoped improvement; Readiness Control monitors and guides monthly decisions.",
  "Never sell Free Scan as a full review.",
  "Never sell AI Readiness Review as done-for-you implementation.",
  "Never sell Signal Repair as unlimited implementation or recurring monitoring.",
  "Never sell Readiness Control as unlimited repair work or guaranteed ranking, AI placement, leads, or revenue.",
  "Every plan must state what it includes and what it does not include.",
  "Every upgrade path must explain why the next plan is different, not just more expensive.",
  "Every customer-facing plan block must avoid duplicate deliverable language that makes two plans feel the same.",
] as const;

export const PLAN_VALUE_NO_OVERLAP_MATRIX = [
  {
    from: "Free Scan",
    notTheSameAs: "AI Readiness Review",
    boundary: "Free Scan is a first visible signal; AI Readiness Review is evidence-backed review.",
  },
  {
    from: "AI Readiness Review",
    notTheSameAs: "Signal Repair",
    boundary: "AI Readiness Review explains the cause; Signal Repair performs scoped improvement work.",
  },
  {
    from: "Signal Repair",
    notTheSameAs: "Readiness Control",
    boundary: "Signal Repair is one scoped implementation; Readiness Control is recurring monitoring and monthly decision support.",
  },
  {
    from: "Readiness Control",
    notTheSameAs: "AI Readiness Review",
    boundary: "Readiness Control watches and guides over time; AI Readiness Review creates a one-time cause-level review.",
  },
] as const;

export function getPlanValueDelivery(planKey: PlanValueKey) {
  return PLAN_VALUE_DELIVERY_ARCHITECTURE.find((plan) => plan.key === planKey) || PLAN_VALUE_DELIVERY_ARCHITECTURE[0];
}
