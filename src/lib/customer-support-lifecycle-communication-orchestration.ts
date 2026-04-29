import { CUSTOMER_SUPPORT_LIFECYCLE_EMAIL_CONTRACTS, type CustomerSupportLifecycleEmailKey } from "@/lib/customer-support-lifecycle-email-contracts";
import { CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS, type CustomerSupportLifecycleNotificationKey } from "@/lib/customer-support-lifecycle-notification-contracts";
import type { CustomerSupportCustomerVisibleStatus } from "@/lib/customer-support-status-contracts";

export type CustomerSupportLifecycleChannel = "dashboard-notification" | "email" | "support-status";

export type CustomerSupportLifecycleCommunicationRule = {
  key: string;
  status: CustomerSupportCustomerVisibleStatus;
  notificationKey: CustomerSupportLifecycleNotificationKey;
  emailKey: CustomerSupportLifecycleEmailKey;
  primaryPath: "/dashboard/support/status" | "/dashboard/support/request" | "/dashboard/support";
  channels: readonly CustomerSupportLifecycleChannel[];
  sendWhen: readonly string[];
  holdWhen: readonly string[];
  suppressionRules: readonly string[];
  requiredGuards: readonly string[];
  blockedContent: readonly string[];
};

export const CUSTOMER_SUPPORT_LIFECYCLE_COMMUNICATION_RULES = [
  {
    key: "communicate-support-received",
    status: "received",
    notificationKey: "support-request-received-status-ready",
    emailKey: "support-email-received-status-ready",
    primaryPath: "/dashboard/support/status",
    channels: ["dashboard-notification", "email", "support-status"],
    sendWhen: ["support request created", "customer ownership verified", "customer-safe status projection exists", "received notification/email not already sent"],
    holdWhen: ["missing customer ownership", "missing safe status projection", "request is already closed", "suppression window active"],
    suppressionRules: ["send received email once per supportRequestId", "show received notification once per supportRequestId", "do not duplicate after status advances"],
    requiredGuards: ["customer ownership", "verified session", "safe support status projection", "no raw payload", "no internal notes", "audit event"],
    blockedContent: ["raw payload", "raw evidence", "internal notes", "operator identity", "risk-scoring internals", "refund promise", "legal promise"],
  },
  {
    key: "communicate-support-reviewing",
    status: "reviewing",
    notificationKey: "support-request-reviewing",
    emailKey: "support-email-reviewing",
    primaryPath: "/dashboard/support/status",
    channels: ["dashboard-notification", "email", "support-status"],
    sendWhen: ["status changes to reviewing", "customer-safe status projection exists", "reviewing status was not already communicated"],
    holdWhen: ["unchanged reviewing status already communicated", "request is resolved", "request is closed", "approval boundary is missing"],
    suppressionRules: ["do not repeat for unchanged reviewing status", "hide after resolved or closed", "do not show internal queue details"],
    requiredGuards: ["customer ownership", "safe status projection", "approval boundary", "no unapproved commitments", "no internal notes"],
    blockedContent: ["exact queue position", "operator assignment", "internal review notes", "unapproved report change", "unapproved refund promise"],
  },
  {
    key: "communicate-support-waiting-on-customer",
    status: "waiting-on-customer",
    notificationKey: "support-request-waiting-on-customer",
    emailKey: "support-email-waiting-on-customer",
    primaryPath: "/dashboard/support/request",
    channels: ["dashboard-notification", "email", "support-status"],
    sendWhen: ["status changes to waiting-on-customer", "safe resubmission path is available", "unsafe content is not included in the communication"],
    holdWhen: ["safe resubmission accepted", "reminder cadence suppressed", "request is resolved", "request is closed"],
    suppressionRules: ["hide after safe resubmission accepted", "do not repeat more than allowed reminder cadence", "do not include rejected raw content"],
    requiredGuards: ["customer ownership", "safe resubmission path", "customer acknowledgement", "no secrets", "no raw payment data", "no raw evidence"],
    blockedContent: ["paste password", "paste token", "paste card number", "paste raw evidence", "rejected raw payload"],
  },
  {
    key: "communicate-support-specialist-review",
    status: "in-specialist-review",
    notificationKey: "support-request-specialist-review",
    emailKey: "support-email-specialist-review",
    primaryPath: "/dashboard/support/status",
    channels: ["dashboard-notification", "email", "support-status"],
    sendWhen: ["status changes to specialist review", "specialist review path is customer-safe", "approval boundary is visible"],
    holdWhen: ["unchanged specialist review already communicated", "request is waiting on customer", "request is resolved", "request is closed"],
    suppressionRules: ["do not repeat for unchanged specialist-review status", "hide after resolved or waiting-on-customer", "do not show internal queue or operator identity"],
    requiredGuards: ["customer ownership", "customer-safe escalation status", "private internal notes", "approval boundary", "no risk scoring internals", "no attacker details"],
    blockedContent: ["internal escalation queue", "operator identity", "risk score", "attacker details", "legal conclusion", "billing provider internals"],
  },
  {
    key: "communicate-support-resolved",
    status: "resolved",
    notificationKey: "support-request-resolved",
    emailKey: "support-email-resolved",
    primaryPath: "/dashboard/support/status",
    channels: ["dashboard-notification", "email", "support-status"],
    sendWhen: ["status changes to resolved", "customer-safe resolution summary exists", "resolved communication not already sent"],
    holdWhen: ["resolution summary is not customer-safe", "request is closed without resolution", "resolved communication already sent"],
    suppressionRules: ["notify once per resolved supportRequestId", "send resolved email once per supportRequestId", "do not hide correction or follow-up path"],
    requiredGuards: ["customer ownership", "safe resolution summary", "no unsupported promise", "audit record", "support path visible"],
    blockedContent: ["hidden limitation", "unapproved guarantee", "private internal notes", "raw evidence", "operator blame"],
  },
  {
    key: "communicate-support-closed",
    status: "closed",
    notificationKey: "support-request-closed",
    emailKey: "support-email-closed",
    primaryPath: "/dashboard/support/request",
    channels: ["dashboard-notification", "email", "support-status"],
    sendWhen: ["status changes to closed", "safe close reason exists when needed", "closed communication not already sent"],
    holdWhen: ["closed communication already sent", "safe close reason is not approved", "audit preservation is missing"],
    suppressionRules: ["notify once per closed supportRequestId", "send closed email once per supportRequestId", "do not claim audit deletion", "do not blame customer or operator"],
    requiredGuards: ["customer ownership", "audit preserved", "safe close reason", "support path visible", "no deletion promise"],
    blockedContent: ["case deletion claim", "audit deletion claim", "private internal notes", "operator blame", "raw evidence"],
  },
] as const satisfies readonly CustomerSupportLifecycleCommunicationRule[];

export const CUSTOMER_SUPPORT_LIFECYCLE_COMMUNICATION_GLOBAL_GUARDS = [
  "no support lifecycle communication without customer ownership, verified session, and customer-safe status projection",
  "no support lifecycle communication sends before both the dashboard notification contract and email contract exist for the status",
  "no support lifecycle communication sends if suppression, preference, unsubscribe, bounce, complaint, or duplicate guards block the channel",
  "no support lifecycle communication contains raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, support context keys, or rejected unsafe content",
  "no support lifecycle communication promises refunds, legal outcomes, report changes, billing changes, security outcomes, or guaranteed business results without approval",
  "every support lifecycle communication routes to support status, safe resubmission, support center, or new request paths only",
] as const;

export function getCustomerSupportLifecycleCommunicationOrchestration() {
  return {
    rules: CUSTOMER_SUPPORT_LIFECYCLE_COMMUNICATION_RULES,
    notifications: CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS,
    emails: CUSTOMER_SUPPORT_LIFECYCLE_EMAIL_CONTRACTS,
    guards: CUSTOMER_SUPPORT_LIFECYCLE_COMMUNICATION_GLOBAL_GUARDS,
  };
}
