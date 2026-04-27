export type CustomerOutputType =
  | "free-scan-summary"
  | "deep-review-report"
  | "build-fix-update"
  | "ongoing-control-update"
  | "delivery-email"
  | "plan-change-note";

export type CustomerOutputApprovalState = "draft" | "reviewing" | "approved" | "blocked" | "sent";

export type CustomerOutputApprovalPolicy = {
  outputType: CustomerOutputType;
  label: string;
  defaultState: CustomerOutputApprovalState;
  requiredReviews: readonly string[];
  previewRequirements: readonly string[];
  blockConditions: readonly string[];
  auditEvents: readonly string[];
};

export const CUSTOMER_OUTPUT_APPROVAL_POLICIES = [
  {
    outputType: "free-scan-summary",
    label: "Free Scan Summary",
    defaultState: "draft",
    requiredReviews: ["truth review", "score-tier review", "customer-safe language review"],
    previewRequirements: ["summary preview", "recommendation preview", "private notes excluded"],
    blockConditions: ["unsupported claim", "missing score rationale", "private note included"],
    auditEvents: ["draft created", "preview generated", "review completed", "approved", "sent"],
  },
  {
    outputType: "deep-review-report",
    label: "Deep Review Report",
    defaultState: "draft",
    requiredReviews: ["truth review", "evidence review", "methodology review", "delivery review"],
    previewRequirements: ["report preview", "claim evidence map", "executive summary preview", "delivery email preview"],
    blockConditions: ["unsupported claim", "missing evidence link", "unreviewed recommendation", "private note included"],
    auditEvents: ["draft created", "evidence checked", "preview generated", "approved", "delivered"],
  },
  {
    outputType: "build-fix-update",
    label: "Build Fix Update",
    defaultState: "draft",
    requiredReviews: ["scope review", "proof review", "customer-safe language review"],
    previewRequirements: ["work summary preview", "before-after proof preview", "next action preview"],
    blockConditions: ["scope mismatch", "missing proof", "unsupported result claim", "private note included"],
    auditEvents: ["draft created", "proof checked", "preview generated", "approved", "sent"],
  },
  {
    outputType: "ongoing-control-update",
    label: "Ongoing Control Update",
    defaultState: "draft",
    requiredReviews: ["monthly progress review", "risk review", "next action review", "customer-safe language review"],
    previewRequirements: ["monthly summary preview", "risk brief preview", "next-month recommendation preview"],
    blockConditions: ["missing progress evidence", "unsupported improvement claim", "unclear next action", "private note included"],
    auditEvents: ["draft created", "monthly evidence checked", "preview generated", "approved", "sent"],
  },
  {
    outputType: "delivery-email",
    label: "Delivery Email",
    defaultState: "draft",
    requiredReviews: ["copy review", "recipient review", "link review"],
    previewRequirements: ["subject preview", "body preview", "attachment or report link preview"],
    blockConditions: ["missing recipient", "unapproved attachment", "private note included", "broken report link"],
    auditEvents: ["draft created", "preview generated", "approved", "sent", "delivery status recorded"],
  },
  {
    outputType: "plan-change-note",
    label: "Plan Change Note",
    defaultState: "draft",
    requiredReviews: ["plan scope review", "billing state review", "customer-safe language review"],
    previewRequirements: ["change summary preview", "customer impact preview", "internal note separation"],
    blockConditions: ["unapproved plan change", "billing mismatch", "private note included"],
    auditEvents: ["draft created", "preview generated", "approved", "customer notified"],
  },
] as const satisfies readonly CustomerOutputApprovalPolicy[];

export function getCustomerOutputApprovalPolicies() {
  return CUSTOMER_OUTPUT_APPROVAL_POLICIES;
}

export function getCustomerOutputApprovalPolicy(outputType: CustomerOutputType) {
  return CUSTOMER_OUTPUT_APPROVAL_POLICIES.find((policy) => policy.outputType === outputType) ?? null;
}
