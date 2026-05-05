export type CustomerSupportLifecycleNotificationKey =
  | "support-request-received-status-ready"
  | "support-request-reviewing"
  | "support-request-waiting-on-customer"
  | "support-request-specialist-review"
  | "support-request-resolved"
  | "support-request-closed";

export type CustomerSupportLifecycleNotificationPriority = "normal" | "high" | "critical";

export type CustomerSupportLifecycleNotificationContract = {
  key: CustomerSupportLifecycleNotificationKey;
  label: string;
  priority: CustomerSupportLifecycleNotificationPriority;
  trigger: string;
  title: string;
  body: string;
  primaryCta: string;
  primaryPath: "/dashboard/support/status" | "/dashboard/support/request" | "/dashboard/support";
  secondaryCta?: string;
  secondaryPath?: "/dashboard/support/status" | "/dashboard/support/request" | "/dashboard/support";
  requiredState: readonly string[];
  requiredGuards: readonly string[];
  suppressionRules: readonly string[];
  blockedContent: readonly string[];
};

export const CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS = [
  {
    key: "support-request-received-status-ready",
    label: "Support request received and status ready",
    priority: "normal",
    trigger: "Customer creates a protected support request and a customer-safe status projection is available.",
    title: "Cendorq received your request",
    body: "Your request is recorded with a safe summary. You can track status from the support status page.",
    primaryCta: "Track request status",
    primaryPath: "/dashboard/support/status",
    secondaryCta: "Open support center",
    secondaryPath: "/dashboard/support",
    requiredState: ["supportRequestId", "customer ownership", "safe summary", "customerVisibleStatus=received"],
    requiredGuards: ["customer ownership", "session authorization", "safe status projection", "no raw payload", "no internal notes"],
    suppressionRules: ["do not duplicate received notification for the same supportRequestId", "hide after request is closed", "do not show before customer-safe status projection exists"],
    blockedContent: ["raw evidence", "raw payload", "internal notes", "operator identity", "risk-scoring internals", "refund promise", "legal promise"],
  },
  {
    key: "support-request-reviewing",
    label: "Support request reviewing",
    priority: "normal",
    trigger: "Support request status maps to customerVisibleStatus=reviewing.",
    title: "Your request is under review",
    body: "Cendorq is reviewing the request through the correct support path while keeping the proof trail protected.",
    primaryCta: "View support status",
    primaryPath: "/dashboard/support/status",
    secondaryCta: "Open support center",
    secondaryPath: "/dashboard/support",
    requiredState: ["supportRequestId", "customerVisibleStatus=reviewing", "customerSafeStatus", "safe summary"],
    requiredGuards: ["no unapproved commitments", "no internal notes", "no raw evidence", "approval boundary visible"],
    suppressionRules: ["do not notify repeatedly for unchanged reviewing status", "hide after resolved or closed", "do not show internal queue details"],
    blockedContent: ["exact queue position", "operator assignment", "internal review notes", "unapproved report change", "unapproved refund promise"],
  },
  {
    key: "support-request-waiting-on-customer",
    label: "Support request waiting on customer",
    priority: "high",
    trigger: "Support request needs a safer or clearer customer summary before review can continue.",
    title: "Your request needs a safer summary",
    body: "Please update the request without passwords, tokens, payment data, raw evidence dumps, or private report internals.",
    primaryCta: "Update request safely",
    primaryPath: "/dashboard/support/request",
    secondaryCta: "View support status",
    secondaryPath: "/dashboard/support/status",
    requiredState: ["supportRequestId", "customerVisibleStatus=waiting-on-customer", "safe resubmission path"],
    requiredGuards: ["no secrets", "no raw payment data", "no raw evidence", "customer acknowledgement", "safe resubmission path"],
    suppressionRules: ["hide after safe resubmission accepted", "do not repeat more than allowed reminder cadence", "do not expose rejected raw content"],
    blockedContent: ["paste password", "paste token", "paste card number", "paste raw evidence", "rejected raw payload"],
  },
  {
    key: "support-request-specialist-review",
    label: "Support request specialist review",
    priority: "normal",
    trigger: "Support request enters correction, billing, security, legal-sensitive, or operator specialist review.",
    title: "Your request is in specialist review",
    body: "This request needs the correct review path before any customer-facing change or commitment can be made.",
    primaryCta: "View support status",
    primaryPath: "/dashboard/support/status",
    secondaryCta: "Open support center",
    secondaryPath: "/dashboard/support",
    requiredState: ["supportRequestId", "customerVisibleStatus=in-specialist-review", "specialist review path", "customer-safe escalation status"],
    requiredGuards: ["private internal notes", "approval boundary", "no risk scoring internals", "no attacker details", "no legal conclusion"],
    suppressionRules: ["do not notify repeatedly for unchanged specialist-review status", "hide after resolved or waiting-on-customer", "do not show internal queue or operator identity"],
    blockedContent: ["internal escalation queue", "operator identity", "risk score", "attacker details", "legal conclusion", "billing provider internals"],
  },
  {
    key: "support-request-resolved",
    label: "Support request resolved",
    priority: "normal",
    trigger: "Support request receives a customer-safe resolution or answer.",
    title: "Your support request is resolved",
    body: "Your request has been handled through the appropriate support path. Start a new protected request if you need more help.",
    primaryCta: "View support status",
    primaryPath: "/dashboard/support/status",
    secondaryCta: "Start new request",
    secondaryPath: "/dashboard/support/request",
    requiredState: ["supportRequestId", "customerVisibleStatus=resolved", "customer-safe resolution summary"],
    requiredGuards: ["safe resolution summary", "no unsupported promise", "audit record", "support path visible"],
    suppressionRules: ["notify once per resolved supportRequestId", "hide after closure acknowledgement", "do not hide correction or follow-up path"],
    blockedContent: ["hidden limitation", "unapproved guarantee", "private internal notes", "raw evidence", "operator blame"],
  },
  {
    key: "support-request-closed",
    label: "Support request closed",
    priority: "normal",
    trigger: "Support request is closed or no longer active.",
    title: "Your support request is closed",
    body: "This request is no longer active. You can start a new protected request if you need additional help.",
    primaryCta: "Start new request",
    primaryPath: "/dashboard/support/request",
    secondaryCta: "View support status",
    secondaryPath: "/dashboard/support/status",
    requiredState: ["supportRequestId", "customerVisibleStatus=closed", "safe close reason"],
    requiredGuards: ["audit preserved", "safe close reason", "support path visible", "no deletion promise"],
    suppressionRules: ["notify once per closed supportRequestId", "do not claim audit deletion", "do not blame customer or operator"],
    blockedContent: ["case deletion claim", "audit deletion claim", "private internal notes", "operator blame", "raw evidence"],
  },
] as const satisfies readonly CustomerSupportLifecycleNotificationContract[];

export const CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_GLOBAL_GUARDS = [
  "no support lifecycle notification without customer ownership and session authorization",
  "no support lifecycle notification before customer-safe support status projection exists",
  "no support lifecycle notification renders raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
  "no support lifecycle notification promises refunds, legal outcomes, report changes, billing changes, security outcomes, or unsupported business-result promises without approval",
  "every support lifecycle notification must point to support status, safe resubmission, support center, or new request path",
  "every support lifecycle notification must have suppression rules to prevent duplicate anxiety or spam",
] as const;

export function getCustomerSupportLifecycleNotificationContracts() {
  return {
    notifications: CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS,
    guards: CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_GLOBAL_GUARDS,
  };
}
