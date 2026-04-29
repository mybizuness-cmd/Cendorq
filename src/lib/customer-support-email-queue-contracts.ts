import type { CustomerSupportLifecycleEmailKey } from "@/lib/customer-support-lifecycle-email-contracts";
import type { CustomerSupportCustomerVisibleStatus } from "@/lib/customer-support-status-contracts";

export type CustomerSupportEmailQueueState = "queued" | "held" | "suppressed" | "sending" | "sent" | "failed" | "bounced" | "complained" | "cancelled";
export type CustomerSupportEmailQueuePriority = "normal" | "high" | "critical";

export type CustomerSupportEmailQueueContract = {
  queueId: string;
  customerIdHash: string;
  recipientEmailRef: string;
  supportRequestId: string;
  templateKey: CustomerSupportLifecycleEmailKey;
  status: CustomerSupportCustomerVisibleStatus;
  senderName: "Cendorq Support";
  fromAddress: "support@cendorq.com";
  priority: CustomerSupportEmailQueuePriority;
  state: CustomerSupportEmailQueueState;
  createdAt: string;
  queuedAt?: string;
  heldAt?: string;
  suppressedAt?: string;
  sendingAt?: string;
  sentAt?: string;
  failedAt?: string;
  bouncedAt?: string;
  complainedAt?: string;
  cancelledAt?: string;
  retryCount: number;
  nextRetryAt?: string;
  suppressionKey?: string;
  suppressionReason?: string;
  bounceReason?: string;
  complaintReason?: string;
  failureReason?: string;
  subject: string;
  preheader: string;
  dashboardPath: "/dashboard/support/status" | "/dashboard/support/request" | "/dashboard/support";
  auditEventId: string;
  rawPayloadStored: false;
  rawEvidenceStored: false;
  rawSecurityPayloadStored: false;
  rawBillingDataStored: false;
  internalNotesStored: false;
  recipientEmailStored: false;
  providerPayloadStored: false;
  secretsStored: false;
};

export const CUSTOMER_SUPPORT_EMAIL_QUEUE_REQUIRED_FIELDS = [
  "queueId",
  "customerIdHash",
  "recipientEmailRef",
  "supportRequestId",
  "templateKey",
  "status",
  "senderName=Cendorq Support",
  "fromAddress=support@cendorq.com",
  "priority",
  "state",
  "createdAt",
  "retryCount",
  "subject",
  "preheader",
  "dashboardPath",
  "auditEventId",
  "rawPayloadStored=false",
  "rawEvidenceStored=false",
  "rawSecurityPayloadStored=false",
  "rawBillingDataStored=false",
  "internalNotesStored=false",
  "recipientEmailStored=false",
  "providerPayloadStored=false",
  "secretsStored=false",
] as const;

export const CUSTOMER_SUPPORT_EMAIL_QUEUE_STATE_RULES = [
  "queued means customer ownership, customer-safe status projection, lifecycle email template, and recipientEmailRef are present but no provider send has started",
  "held means required customer ownership, verified session context, consent, suppression, bounce, complaint, or safe projection checks are incomplete",
  "suppressed means unsubscribe, bounce, complaint, duplicate, preference, or lifecycle suppression controls prevent sending without deleting audit history",
  "sending means a future provider integration has accepted a safe send attempt without storing provider payloads or exposed secrets",
  "sent means the approved templateKey was sent from Cendorq Support <support@cendorq.com> with a customer-safe dashboard path",
  "failed means a safe retryable failure occurred and only a sanitized failureReason and retry state may be stored",
  "bounced and complained states prevent repeated support lifecycle email attempts until compliance controls allow a safe retry or permanent suppression",
  "cancelled means the queued email is no longer appropriate because the status changed, request closed, or suppression became active while preserving auditEventId",
] as const;

export const CUSTOMER_SUPPORT_EMAIL_QUEUE_STORAGE_RULES = [
  "support lifecycle email queue records require customerIdHash ownership before creation, read, send attempt, retry, suppression, bounce, complaint, or cancellation",
  "support lifecycle email queue records store recipientEmailRef rather than raw customer email addresses",
  "support lifecycle email queue records reference templateKey and supportRequestId instead of storing generated email bodies or raw support content",
  "support lifecycle email queue records are idempotent per customerIdHash, supportRequestId, templateKey, status, and recipientEmailRef to prevent duplicate anxiety or spam",
  "support lifecycle email queue records preserve auditEventId and must not claim audit records were deleted",
  "support lifecycle email queue records must respect preference, unsubscribe, bounce, complaint, suppression, and retry controls before any send attempt",
  "support lifecycle email queue records do not send email by themselves; provider sending requires a future guarded runtime with explicit validation",
] as const;

export const CUSTOMER_SUPPORT_EMAIL_QUEUE_BLOCKED_CONTENT = [
  "raw customer email address",
  "raw payload",
  "raw evidence",
  "raw security payload",
  "raw billing data",
  "raw payment data",
  "internal notes",
  "operator identity",
  "risk-scoring internals",
  "attacker details",
  "prompt content",
  "developer message",
  "system message",
  "password",
  "token",
  "secret",
  "session token",
  "CSRF token",
  "admin key",
  "support context key",
  "provider API key",
  "provider payload",
  "unsupported refund promise",
  "unsupported legal outcome",
  "unsupported report change",
  "unsupported billing change",
  "unsupported security outcome",
  "guaranteed business result",
  "guaranteed ROI",
  "fake urgency",
  "audit deletion claim",
] as const;

export const CUSTOMER_SUPPORT_EMAIL_QUEUE_GUARDS = [
  "no support lifecycle email queue record without customer ownership, customer-safe support status projection, known lifecycle email contract, and recipientEmailRef",
  "no support lifecycle email queue record stores raw customer email addresses, raw payloads, raw evidence, raw security payloads, raw billing data, raw payment data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, support context keys, provider API keys, or provider payloads",
  "no support lifecycle email queue record sends email directly or calls an external email provider",
  "no support lifecycle email queue record promises refunds, legal outcomes, report changes, billing changes, security outcomes, ROI, or business results without approval",
  "no support lifecycle email queue record duplicates an unchanged lifecycle status when idempotency, unsubscribe, bounce, complaint, or suppression controls apply",
  "every support lifecycle email queue record keeps Cendorq Support <support@cendorq.com>, customer-safe subject, customer-safe preheader, approved dashboard path, retry state, compliance state, and auditEventId",
] as const;

export function getCustomerSupportEmailQueueContracts() {
  return {
    requiredFields: CUSTOMER_SUPPORT_EMAIL_QUEUE_REQUIRED_FIELDS,
    stateRules: CUSTOMER_SUPPORT_EMAIL_QUEUE_STATE_RULES,
    storageRules: CUSTOMER_SUPPORT_EMAIL_QUEUE_STORAGE_RULES,
    blockedContent: CUSTOMER_SUPPORT_EMAIL_QUEUE_BLOCKED_CONTENT,
    guards: CUSTOMER_SUPPORT_EMAIL_QUEUE_GUARDS,
  };
}
