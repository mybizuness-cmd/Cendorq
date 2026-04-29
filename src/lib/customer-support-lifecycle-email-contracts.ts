export type CustomerSupportLifecycleEmailKey =
  | "support-email-received-status-ready"
  | "support-email-reviewing"
  | "support-email-waiting-on-customer"
  | "support-email-specialist-review"
  | "support-email-resolved"
  | "support-email-closed";

export type CustomerSupportLifecycleEmailPriority = "normal" | "high" | "critical";
export type CustomerSupportLifecycleEmailTone = "calm" | "supportive" | "proof-first" | "strategic";

export type CustomerSupportLifecycleEmailContract = {
  key: CustomerSupportLifecycleEmailKey;
  label: string;
  priority: CustomerSupportLifecycleEmailPriority;
  senderName: "Cendorq Support";
  fromAddress: "support@cendorq.com";
  subject: string;
  preheader: string;
  trigger: string;
  purpose: string;
  primaryCta: string;
  dashboardPath: "/dashboard/support/status" | "/dashboard/support/request" | "/dashboard/support";
  tone: readonly CustomerSupportLifecycleEmailTone[];
  requiredPersonalization: readonly string[];
  requiredTrustElements: readonly string[];
  requiredComplianceControls: readonly string[];
  suppressionRules: readonly string[];
  blockedContent: readonly string[];
};

export const CUSTOMER_SUPPORT_LIFECYCLE_EMAIL_CONTRACTS = [
  {
    key: "support-email-received-status-ready",
    label: "Support received status email",
    priority: "normal",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Cendorq received your support request",
    preheader: "Your request is recorded safely. You can track status in your dashboard.",
    trigger: "Customer creates a protected support request and customer-safe status projection is available.",
    purpose: "Confirm receipt and point the customer to safe support status tracking without internal notes or promises.",
    primaryCta: "Track request status",
    dashboardPath: "/dashboard/support/status",
    tone: ["calm", "supportive", "proof-first"],
    requiredPersonalization: ["support request id", "request type", "business context when safe", "dashboard status link"],
    requiredTrustElements: ["safe summary reference", "support status path", "what happens next", "support center path"],
    requiredComplianceControls: ["customer ownership", "verified session", "safe status projection", "no duplicate receipt email", "no raw payload"],
    suppressionRules: ["send once per supportRequestId", "do not send before customer-safe status projection exists", "do not send after request is closed"],
    blockedContent: ["raw payload", "raw evidence", "internal notes", "operator identity", "risk-scoring internals", "refund promise", "legal promise"],
  },
  {
    key: "support-email-reviewing",
    label: "Support reviewing email",
    priority: "normal",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Your Cendorq support request is under review",
    preheader: "Your request is moving through the correct support path.",
    trigger: "Support status changes to reviewing and customer-safe projection is approved.",
    purpose: "Reduce uncertainty while keeping review boundaries and internal notes private.",
    primaryCta: "View support status",
    dashboardPath: "/dashboard/support/status",
    tone: ["calm", "supportive", "strategic"],
    requiredPersonalization: ["support request id", "request type", "customer-safe status", "dashboard status link"],
    requiredTrustElements: ["review path", "approval boundary", "support center link"],
    requiredComplianceControls: ["do not reveal internal queue", "do not identify operator", "do not promise outcome", "do not duplicate unchanged status email"],
    suppressionRules: ["do not send repeatedly for unchanged reviewing status", "hide after resolved or closed", "do not send if customer opted out where required"],
    blockedContent: ["exact queue position", "operator assignment", "internal review notes", "unapproved report change", "unapproved refund promise"],
  },
  {
    key: "support-email-waiting-on-customer",
    label: "Support waiting on customer email",
    priority: "high",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Your Cendorq support request needs a safer summary",
    preheader: "Update the request without passwords, tokens, payment data, or raw evidence.",
    trigger: "Support status changes to waiting-on-customer because a safer or clearer summary is required.",
    purpose: "Ask for a safe resubmission without exposing rejected raw content or encouraging sensitive data sharing.",
    primaryCta: "Update request safely",
    dashboardPath: "/dashboard/support/request",
    tone: ["calm", "supportive", "strategic"],
    requiredPersonalization: ["support request id", "request type", "safe resubmission path"],
    requiredTrustElements: ["what not to include", "safe resubmission instructions", "support status link"],
    requiredComplianceControls: ["do not include rejected raw content", "no secrets", "no raw payment data", "no raw evidence", "customer acknowledgement required"],
    suppressionRules: ["hide after safe resubmission accepted", "do not send more than allowed reminder cadence", "do not include the unsafe content that triggered review"],
    blockedContent: ["paste password", "paste token", "paste card number", "paste raw evidence", "rejected raw payload"],
  },
  {
    key: "support-email-specialist-review",
    label: "Support specialist review email",
    priority: "normal",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Your Cendorq support request is in specialist review",
    preheader: "Some support paths require approval before customer-facing changes or commitments.",
    trigger: "Support request enters correction, billing, security, legal-sensitive, or operator specialist review.",
    purpose: "Explain specialist review without exposing internal escalation queues, risk scores, or legal conclusions.",
    primaryCta: "View support status",
    dashboardPath: "/dashboard/support/status",
    tone: ["calm", "supportive", "proof-first"],
    requiredPersonalization: ["support request id", "request type", "customer-safe specialist status"],
    requiredTrustElements: ["approval boundary", "status tracking path", "support center path"],
    requiredComplianceControls: ["no internal escalation queue", "no operator identity", "no risk scoring internals", "no legal conclusion", "no attacker details"],
    suppressionRules: ["do not send repeatedly for unchanged specialist-review status", "hide after resolved or waiting-on-customer", "do not show internal queue or operator identity"],
    blockedContent: ["internal escalation queue", "operator identity", "risk score", "attacker details", "legal conclusion", "billing provider internals"],
  },
  {
    key: "support-email-resolved",
    label: "Support resolved email",
    priority: "normal",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Your Cendorq support request is resolved",
    preheader: "Review the customer-safe resolution or start a new request if needed.",
    trigger: "Support request receives a customer-safe resolution or answer.",
    purpose: "Notify the customer that the request has a safe resolution while keeping support paths open.",
    primaryCta: "View support status",
    dashboardPath: "/dashboard/support/status",
    tone: ["calm", "supportive", "proof-first"],
    requiredPersonalization: ["support request id", "request type", "customer-safe resolution summary"],
    requiredTrustElements: ["resolution summary", "support status path", "new request path", "support contact"],
    requiredComplianceControls: ["safe resolution summary", "no unsupported promise", "audit record", "support path visible"],
    suppressionRules: ["send once per resolved supportRequestId", "hide after closure acknowledgement", "do not hide correction or follow-up path"],
    blockedContent: ["hidden limitation", "unapproved guarantee", "private internal notes", "raw evidence", "operator blame"],
  },
  {
    key: "support-email-closed",
    label: "Support closed email",
    priority: "normal",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    subject: "Your Cendorq support request is closed",
    preheader: "This request is no longer active. You can start a new protected request if needed.",
    trigger: "Support request is closed or no longer active.",
    purpose: "Close the customer loop without claiming deletion or exposing internal audit details.",
    primaryCta: "Start new request",
    dashboardPath: "/dashboard/support/request",
    tone: ["calm", "supportive"],
    requiredPersonalization: ["support request id", "request type", "safe close reason when approved"],
    requiredTrustElements: ["safe close reason", "new request path", "support center path"],
    requiredComplianceControls: ["audit preserved", "safe close reason", "support path visible", "no deletion promise"],
    suppressionRules: ["send once per closed supportRequestId", "do not claim audit deletion", "do not blame customer or operator"],
    blockedContent: ["case deletion claim", "audit deletion claim", "private internal notes", "operator blame", "raw evidence"],
  },
] as const satisfies readonly CustomerSupportLifecycleEmailContract[];

export const CUSTOMER_SUPPORT_LIFECYCLE_EMAIL_GLOBAL_GUARDS = [
  "all support lifecycle emails use Cendorq Support <support@cendorq.com>",
  "no support lifecycle email sends before customer ownership, verified session, and customer-safe status projection are confirmed",
  "no support lifecycle email contains passwords, raw tokens, payment data, raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
  "no support lifecycle email promises refunds, legal outcomes, report changes, billing changes, security outcomes, or guaranteed business results without approval",
  "every support lifecycle email has suppression rules to prevent duplicate anxiety or spam",
  "every support lifecycle email points to support status, safe resubmission, support center, or new request path",
  "support lifecycle email sending must respect preference, unsubscribe, bounce, complaint, and suppression controls where required",
] as const;

export function getCustomerSupportLifecycleEmailContracts() {
  return {
    emails: CUSTOMER_SUPPORT_LIFECYCLE_EMAIL_CONTRACTS,
    guards: CUSTOMER_SUPPORT_LIFECYCLE_EMAIL_GLOBAL_GUARDS,
  };
}
