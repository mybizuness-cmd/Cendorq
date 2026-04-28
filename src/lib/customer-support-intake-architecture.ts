export type CustomerSupportIntakeType =
  | "report-question"
  | "correction-request"
  | "billing-help"
  | "security-concern"
  | "plan-guidance";

export type SupportIntakeFieldType = "select" | "text" | "textarea" | "checkbox" | "hidden";
export type SupportIntakeRiskDecision = "allow" | "sanitize" | "challenge" | "block" | "quarantine";

export type CustomerSupportIntakeField = {
  key: string;
  label: string;
  type: SupportIntakeFieldType;
  required: boolean;
  maxLength?: number;
  helpText: string;
  blockedContent: readonly string[];
};

export type CustomerSupportIntakeFlow = {
  key: CustomerSupportIntakeType;
  label: string;
  purpose: string;
  primaryOutcome: string;
  requiredFields: readonly CustomerSupportIntakeField[];
  safeSummaryRequirements: readonly string[];
  requiredGuards: readonly string[];
  blockedBehaviors: readonly string[];
};

export type CustomerSupportIntakeRiskRule = {
  key: string;
  decision: SupportIntakeRiskDecision;
  trigger: string;
  customerMessage: string;
  internalAction: string;
};

const COMMON_FIELDS = [
  {
    key: "businessContext",
    label: "Business or account context",
    type: "text",
    required: true,
    maxLength: 160,
    helpText: "Name the business, location, or account area this request is about.",
    blockedContent: ["password", "raw token", "payment card", "secret key"],
  },
  {
    key: "safeDescription",
    label: "Safe description",
    type: "textarea",
    required: true,
    maxLength: 1400,
    helpText: "Explain the issue without pasting passwords, payment details, raw tokens, secrets, or unrelated private data.",
    blockedContent: ["password", "raw token", "payment card", "secret key", "private key", "full raw evidence dump"],
  },
  {
    key: "customerAcknowledgement",
    label: "Safety acknowledgement",
    type: "checkbox",
    required: true,
    helpText: "Customer confirms they did not include passwords, payment details, raw tokens, secrets, or unrelated private data.",
    blockedContent: [],
  },
] as const satisfies readonly CustomerSupportIntakeField[];

export const CUSTOMER_SUPPORT_INTAKE_FLOWS = [
  {
    key: "report-question",
    label: "Report question",
    purpose: "Help a customer understand a report section, score, confidence label, visual, limitation, or recommendation.",
    primaryOutcome: "Create a support request that can be answered from approved report records without changing conclusions.",
    requiredFields: [
      ...COMMON_FIELDS,
      {
        key: "reportArea",
        label: "Report area",
        type: "select",
        required: true,
        helpText: "Choose the area of the report the customer is asking about.",
        blockedContent: ["raw evidence", "private report internals"],
      },
    ],
    safeSummaryRequirements: ["request type", "business context", "report area", "safe customer question", "no raw evidence"],
    requiredGuards: ["customer ownership", "report access authorization", "approved report record lookup", "safe support summary", "no conclusion change without correction review"],
    blockedBehaviors: ["inventing evidence", "changing report conclusion", "raw evidence echo", "guaranteed outcome", "unsupported plan push"],
  },
  {
    key: "correction-request",
    label: "Correction request",
    purpose: "Let a customer request review of business identity, evidence, calculation, claim, visual, or recommendation context.",
    primaryOutcome: "Create a correction review that is gated before any customer-facing report change.",
    requiredFields: [
      ...COMMON_FIELDS,
      {
        key: "correctionArea",
        label: "Correction area",
        type: "select",
        required: true,
        helpText: "Choose the report area that may need correction review.",
        blockedContent: ["raw private evidence", "unsupported legal demand"],
      },
    ],
    safeSummaryRequirements: ["request type", "business context", "correction area", "safe correction summary", "affected report when available"],
    requiredGuards: ["customer ownership", "correction review record", "original report preservation", "release approval required", "audit record required"],
    blockedBehaviors: ["instant report mutation", "unapproved report change", "destroying original report", "promise correction outcome", "legal ruling"],
  },
  {
    key: "billing-help",
    label: "Billing help",
    purpose: "Route invoice, failed payment, plan status, upgrade, cancellation-support, or refund-review questions safely.",
    primaryOutcome: "Create a billing support request that checks entitlement and billing state before any customer-facing promise.",
    requiredFields: [
      ...COMMON_FIELDS,
      {
        key: "billingIssueType",
        label: "Billing issue type",
        type: "select",
        required: true,
        helpText: "Choose invoice, failed payment, plan status, upgrade, cancellation support, refund review, or other.",
        blockedContent: ["raw card number", "bank account", "full payment data"],
      },
    ],
    safeSummaryRequirements: ["request type", "billing issue type", "plan when available", "safe billing summary", "no raw payment data"],
    requiredGuards: ["customer ownership", "entitlement check", "billing-state check", "no raw payment data", "refund promise approval required", "cancellation help visible"],
    blockedBehaviors: ["refund promise without approval", "billing change without review", "raw payment data storage", "hiding cancellation help", "paid access without entitlement"],
  },
  {
    key: "security-concern",
    label: "Security concern",
    purpose: "Route suspicious login, new device, email access, billing access, or report access concerns through safe review.",
    primaryOutcome: "Create a security review that can require reauthentication, session rotation, token revocation, or lockout without exposing security internals.",
    requiredFields: [
      ...COMMON_FIELDS,
      {
        key: "securityConcernType",
        label: "Security concern type",
        type: "select",
        required: true,
        helpText: "Choose suspicious login, new device, email access, billing access, report access, or other.",
        blockedContent: ["attacker payload", "malware sample", "secret", "raw session token"],
      },
    ],
    safeSummaryRequirements: ["request type", "security concern type", "safe security summary", "no attacker details", "no raw tokens"],
    requiredGuards: ["customer ownership", "security review record", "operator review", "reauth path", "session rotation path", "token revocation path", "safe customer copy"],
    blockedBehaviors: ["revealing attacker details", "revealing risk scoring internals", "raw security payload storage", "secret exposure", "retaliatory action"],
  },
  {
    key: "plan-guidance",
    label: "Plan guidance",
    purpose: "Help a customer understand which plan fits next based on stage, evidence, limitations, and business goals.",
    primaryOutcome: "Create a plan guidance request that supports conversion through proof without fake urgency or unsupported claims.",
    requiredFields: [
      ...COMMON_FIELDS,
      {
        key: "currentPlanContext",
        label: "Current plan or question",
        type: "text",
        required: true,
        maxLength: 160,
        helpText: "Name the plan or next step the customer is considering.",
        blockedContent: ["guaranteed ROI demand", "unsupported outcome claim"],
      },
    ],
    safeSummaryRequirements: ["request type", "business context", "current plan context", "safe plan question", "stage-aware next step"],
    requiredGuards: ["plan-stage logic", "evidence-backed CTA", "current-plan limits", "support fallback", "no guaranteed outcome"],
    blockedBehaviors: ["fake urgency", "guaranteed outcome", "unsupported ROI", "pressure-only selling", "hiding lower plan option"],
  },
] as const satisfies readonly CustomerSupportIntakeFlow[];

export const CUSTOMER_SUPPORT_INTAKE_RISK_RULES = [
  {
    key: "secret-or-token-submission",
    decision: "quarantine",
    trigger: "Support intake appears to include password, raw token, secret key, private key, or credentials.",
    customerMessage: "For your protection, remove passwords, tokens, keys, or credentials before submitting.",
    internalAction: "Quarantine the request, redact logs, prevent downstream processing, and require operator review.",
  },
  {
    key: "payment-data-submission",
    decision: "block",
    trigger: "Support intake appears to include raw card, bank, or payment details.",
    customerMessage: "Do not send payment details here. Use the billing center or support path instead.",
    internalAction: "Block the request, preserve safe metadata only, and route customer to billing center guidance.",
  },
  {
    key: "raw-evidence-dump",
    decision: "sanitize",
    trigger: "Support intake includes a long raw evidence dump instead of a safe summary.",
    customerMessage: "Please summarize the issue in your own words instead of pasting raw evidence or private records.",
    internalAction: "Require safe summary, strip raw payload from analytics, and prevent raw evidence echo.",
  },
  {
    key: "hostile-instruction-or-prompt-injection",
    decision: "quarantine",
    trigger: "Support intake includes instructions attempting to override Cendorq systems, agents, policies, or report methods.",
    customerMessage: "This content cannot control Cendorq systems. It may be reviewed as support context only.",
    internalAction: "Treat as data only, block instruction execution, log prompt-injection risk, and require safe review.",
  },
  {
    key: "unsafe-promise-demand",
    decision: "challenge",
    trigger: "Support intake demands refund, legal outcome, guaranteed result, billing change, or report change as a condition.",
    customerMessage: "Cendorq can review the request, but outcomes require the correct review and approval path.",
    internalAction: "Route to escalation review and prevent unsupported commitment language.",
  },
] as const satisfies readonly CustomerSupportIntakeRiskRule[];

export const CUSTOMER_SUPPORT_INTAKE_GLOBAL_GUARDS = [
  "no support intake without authenticated customer ownership and route authorization",
  "no support intake accepts passwords, raw tokens, payment data, secrets, or private keys",
  "no support intake stores raw evidence dumps, raw security payloads, or private report internals",
  "no support intake creates correction, refund, billing, legal, report-change, or outcome promises without approval",
  "every support intake must generate a safe customer summary before downstream routing",
  "every support intake must map to a support request record and audit event",
  "security intake must support reauthentication, session rotation, token revocation, and operator review",
  "billing intake must support entitlement checks, billing-state checks, cancellation help, and refund review boundaries",
] as const;

export function getCustomerSupportIntakeArchitecture() {
  return {
    flows: CUSTOMER_SUPPORT_INTAKE_FLOWS,
    riskRules: CUSTOMER_SUPPORT_INTAKE_RISK_RULES,
    guards: CUSTOMER_SUPPORT_INTAKE_GLOBAL_GUARDS,
  };
}
