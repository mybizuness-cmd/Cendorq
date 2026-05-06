import {
  getPlanValueDelivery,
  PLAN_VALUE_SEPARATION_RULES,
  type PlanValueKey,
} from "@/lib/plan-value-delivery-architecture";

export type PlanFulfillmentBoundary = {
  planKey: PlanValueKey;
  planName: string;
  allowedDeliverables: readonly string[];
  blockedOverlap: readonly string[];
  requiredBeforeDelivery: readonly string[];
  approvalGate: string;
  customerFacingSummary: string;
  escalationRule: string;
};

export const PLAN_VALUE_FULFILLMENT_BOUNDARIES = [
  {
    planKey: "free-scan",
    planName: "Free Scan",
    allowedDeliverables: [
      "protected dashboard Free Scan result",
      "first visible signal summary",
      "confidence posture",
      "evidence boundary",
      "visible limitations",
      "best next move guidance",
    ],
    blockedOverlap: [
      "full diagnostic report",
      "implementation-ready work order",
      "monthly monitoring summary",
      "unlimited recommendations",
      "private investigation output",
    ],
    requiredBeforeDelivery: [
      "customer-owned intake",
      "verified email gate",
      "safe release posture",
      "Free Scan scope label",
      "confidence and limitation labels",
    ],
    approvalGate: "free-scan-safe-result-release",
    customerFacingSummary: "Free Scan delivers the first visible signal and next best move, not a full diagnosis or implementation plan.",
    escalationRule: "Escalate to Deep Review when the customer needs cause-level diagnosis before spending on fixes or ads.",
  },
  {
    planKey: "deep-review",
    planName: "Deep Review",
    allowedDeliverables: [
      "diagnostic report",
      "evidence-backed cause analysis",
      "priority blocker map",
      "confidence-labeled findings",
      "fix direction and plan-fit recommendation",
    ],
    blockedOverlap: [
      "done-for-you implementation",
      "unlimited revisions",
      "monthly monitoring loop",
      "ad spend management",
      "guaranteed revenue claim",
    ],
    requiredBeforeDelivery: [
      "payment confirmation",
      "verified customer ownership",
      "expanded context or evidence review",
      "report evidence separation",
      "release-captain review",
    ],
    approvalGate: "deep-review-report-release",
    customerFacingSummary: "Deep Review delivers cause-level diagnosis and decision clarity, not implementation work.",
    escalationRule: "Escalate to Build Fix only when the diagnosis identifies a scoped improvement ready for implementation.",
  },
  {
    planKey: "build-fix",
    planName: "Build Fix",
    allowedDeliverables: [
      "scoped implementation intake",
      "fix target confirmation",
      "customer-facing improvement work",
      "before-after delivery summary",
      "approval checkpoint and support handoff",
    ],
    blockedOverlap: [
      "full diagnostic report unless purchased separately",
      "unlimited site rebuild",
      "monthly monitoring loop",
      "unapproved production changes",
      "guaranteed revenue claim",
    ],
    requiredBeforeDelivery: [
      "payment confirmation",
      "scope confirmation",
      "approved business details",
      "customer output approval posture",
      "safe delivery summary",
    ],
    approvalGate: "build-fix-customer-output-approval",
    customerFacingSummary: "Build Fix delivers scoped improvement work, not a full diagnosis or recurring monitoring.",
    escalationRule: "Escalate to Ongoing Control when the customer needs recurring watch, priorities, and monthly decision support after the fix.",
  },
  {
    planKey: "ongoing-control",
    planName: "Ongoing Control",
    allowedDeliverables: [
      "monthly priority selection",
      "recurring review cycle",
      "dashboard status and alerts",
      "trend-aware summaries",
      "monthly decision support",
    ],
    blockedOverlap: [
      "unlimited Build Fix implementation",
      "standalone Deep Review every month unless scoped",
      "ad spend management",
      "guaranteed ranking",
      "guaranteed AI answer placement",
    ],
    requiredBeforeDelivery: [
      "active subscription confirmation",
      "monitoring scope",
      "monthly priority",
      "approved notification preferences",
      "controlled review cadence",
    ],
    approvalGate: "ongoing-control-monthly-review-gate",
    customerFacingSummary: "Ongoing Control delivers recurring monitoring and monthly decision support, not unlimited implementation.",
    escalationRule: "Escalate to Build Fix when monitoring identifies a concrete improvement that needs scoped implementation.",
  },
] as const satisfies readonly PlanFulfillmentBoundary[];

export const PLAN_VALUE_FULFILLMENT_RULES = [
  "Fulfillment must preserve the same plan boundary the customer saw in pricing, billing, checkout, and email.",
  "Allowed deliverables must match the plan value architecture before any customer-facing output is released.",
  "Blocked overlap must be checked before fulfillment work is marked complete.",
  "Free Scan fulfillment must not produce full diagnosis, implementation, or monthly monitoring deliverables.",
  "Deep Review fulfillment must not produce implementation work unless Build Fix is purchased or separately scoped.",
  "Build Fix fulfillment must not behave like unlimited implementation or recurring monitoring.",
  "Ongoing Control fulfillment must not behave like unlimited Build Fix work or guaranteed ranking/AI placement.",
  "Every fulfillment handoff must have an approval gate, customer-facing summary, and escalation rule.",
  ...PLAN_VALUE_SEPARATION_RULES,
] as const;

export function getPlanValueFulfillmentBoundary(planKey: PlanValueKey) {
  return PLAN_VALUE_FULFILLMENT_BOUNDARIES.find((boundary) => boundary.planKey === planKey) || PLAN_VALUE_FULFILLMENT_BOUNDARIES[0];
}

export function projectPlanValueFulfillment(planKey: PlanValueKey) {
  const boundary = getPlanValueFulfillmentBoundary(planKey);
  const value = getPlanValueDelivery(planKey);

  return {
    planKey,
    planName: boundary.planName,
    primaryValue: value.primaryValue,
    customerOutcome: value.customerOutcome,
    allowedDeliverables: boundary.allowedDeliverables,
    blockedOverlap: boundary.blockedOverlap,
    requiredBeforeDelivery: boundary.requiredBeforeDelivery,
    approvalGate: boundary.approvalGate,
    customerFacingSummary: boundary.customerFacingSummary,
    escalationRule: boundary.escalationRule,
    valueBoundary: value.reportBoundary,
    includedValue: value.includes,
    excludedValue: value.doesNotInclude,
  } as const;
}
