import type { CustomerSupportLifecycleNotificationKey } from "@/lib/customer-support-lifecycle-notification-contracts";
import type { CustomerSupportCustomerVisibleStatus } from "@/lib/customer-support-status-contracts";

export type CustomerSupportNotificationRecordChannel = "dashboard-notification" | "email" | "support-status";
export type CustomerSupportNotificationRecordState = "queued" | "displayed" | "sent" | "read" | "suppressed" | "failed";

export type CustomerSupportNotificationRecordContract = {
  notificationId: string;
  customerIdHash: string;
  supportRequestId: string;
  notificationKey: CustomerSupportLifecycleNotificationKey;
  status: CustomerSupportCustomerVisibleStatus;
  channel: CustomerSupportNotificationRecordChannel;
  state: CustomerSupportNotificationRecordState;
  createdAt: string;
  queuedAt?: string;
  displayedAt?: string;
  sentAt?: string;
  readAt?: string;
  suppressedAt?: string;
  failedAt?: string;
  suppressionKey?: string;
  suppressionReason?: string;
  failureReason?: string;
  customerVisibleTitle: string;
  customerVisibleBody: string;
  primaryPath: "/dashboard/support/status" | "/dashboard/support/request" | "/dashboard/support";
  auditEventId: string;
  rawPayloadStored: false;
  rawEvidenceStored: false;
  rawSecurityPayloadStored: false;
  rawBillingDataStored: false;
  internalNotesStored: false;
  secretsStored: false;
};

export const CUSTOMER_SUPPORT_NOTIFICATION_RECORD_REQUIRED_FIELDS = [
  "notificationId",
  "customerIdHash",
  "supportRequestId",
  "notificationKey",
  "status",
  "channel",
  "state",
  "createdAt",
  "customerVisibleTitle",
  "customerVisibleBody",
  "primaryPath",
  "auditEventId",
  "rawPayloadStored=false",
  "rawEvidenceStored=false",
  "rawSecurityPayloadStored=false",
  "rawBillingDataStored=false",
  "internalNotesStored=false",
  "secretsStored=false",
] as const;

export const CUSTOMER_SUPPORT_NOTIFICATION_RECORD_STORAGE_RULES = [
  "support lifecycle notification records require customerIdHash ownership before creation, display, read-state update, suppression, or failure projection",
  "support lifecycle notification records link one customer-owned supportRequestId to one lifecycle notificationKey and one customer-visible support status",
  "support lifecycle notification records store timestamps for queued, displayed, sent, read, suppressed, and failed states without storing unsafe customer input",
  "support lifecycle notification records may store suppressionKey and safe suppressionReason but never raw rejected content or internal reviewer notes",
  "support lifecycle notification records must be idempotent per customerIdHash, supportRequestId, notificationKey, channel, and status to prevent duplicate anxiety or spam",
  "support lifecycle notification records preserve auditEventId and must not claim audit records were deleted",
  "support lifecycle notification records are customer-visible only through customer-owned notification APIs and never through public routes or browser-exposed secrets",
] as const;

export const CUSTOMER_SUPPORT_NOTIFICATION_RECORD_BLOCKED_CONTENT = [
  "raw payload",
  "raw evidence",
  "raw security payload",
  "raw billing data",
  "internal notes",
  "operator identity",
  "risk-scoring internals",
  "attacker details",
  "prompt content",
  "developer message",
  "system message",
  "password",
  "secret",
  "session token",
  "CSRF token",
  "admin key",
  "support context key",
  "unsupported refund promise",
  "unsupported legal outcome",
  "unsupported report change",
  "unsupported billing change",
  "unsupported security outcome",
  "guaranteed business result",
  "fake urgency",
] as const;

export const CUSTOMER_SUPPORT_NOTIFICATION_RECORD_GUARDS = [
  "no support notification record without customer ownership, verified session context, safe support status projection, and a known lifecycle notification contract",
  "no support notification record stores raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
  "no support notification record exposes customer email addresses, billing identifiers, account existence signals, support admin keys, or customer support context secrets to the browser",
  "no support notification record promises refunds, legal outcomes, report changes, billing changes, security outcomes, ROI, or business results without approval",
  "no support notification record duplicates an unchanged lifecycle status across the same channel when suppression or idempotency guards apply",
  "every support notification record keeps a customer-safe title, customer-safe body, approved support path, audit event reference, and suppression state",
] as const;

export function getCustomerSupportNotificationRecordContracts() {
  return {
    requiredFields: CUSTOMER_SUPPORT_NOTIFICATION_RECORD_REQUIRED_FIELDS,
    storageRules: CUSTOMER_SUPPORT_NOTIFICATION_RECORD_STORAGE_RULES,
    blockedContent: CUSTOMER_SUPPORT_NOTIFICATION_RECORD_BLOCKED_CONTENT,
    guards: CUSTOMER_SUPPORT_NOTIFICATION_RECORD_GUARDS,
  };
}
