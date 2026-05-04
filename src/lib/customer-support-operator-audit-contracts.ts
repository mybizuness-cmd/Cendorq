import type { CustomerSupportOperatorAction, CustomerSupportOperatorApprovalGate, CustomerSupportOperatorAuditOutcome, CustomerSupportOperatorRole } from "@/lib/customer-support-operator-console-contracts";

export type CustomerSupportOperatorAuditRecord = {
  auditEventId: string;
  supportRequestId: string;
  customerIdHash: string;
  operatorRole: CustomerSupportOperatorRole;
  operatorActorRef: string;
  action: CustomerSupportOperatorAction;
  outcome: CustomerSupportOperatorAuditOutcome;
  approvalGate: CustomerSupportOperatorApprovalGate;
  createdAt: string;
  reasonCode: string;
  customerSafeSummary: string;
  internalSafeNoteRef?: string;
  previousCustomerStatus?: string;
  nextCustomerStatus?: string;
  immutable: true;
  preservedForCompliance: true;
  rawPayloadStored: false;
  rawEvidenceStored: false;
  rawSecurityPayloadStored: false;
  rawBillingDataStored: false;
  rawPaymentDataStored: false;
  promptsStored: false;
  secretsStored: false;
  operatorIdentityCustomerVisible: false;
  internalNotesCustomerVisible: false;
};

export const CUSTOMER_SUPPORT_OPERATOR_AUDIT_REQUIRED_FIELDS = [
  "auditEventId",
  "supportRequestId",
  "customerIdHash",
  "operatorRole",
  "operatorActorRef",
  "action",
  "outcome",
  "approvalGate",
  "createdAt",
  "reasonCode",
  "customerSafeSummary",
  "immutable=true",
  "preservedForCompliance=true",
  "rawPayloadStored=false",
  "rawEvidenceStored=false",
  "rawSecurityPayloadStored=false",
  "rawBillingDataStored=false",
  "rawPaymentDataStored=false",
  "promptsStored=false",
  "secretsStored=false",
  "operatorIdentityCustomerVisible=false",
  "internalNotesCustomerVisible=false",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_AUDIT_EVENT_RULES = [
  "every support operator audit event is append-only and immutable after creation",
  "every support operator audit event links one supportRequestId to one customerIdHash and one operatorActorRef",
  "operatorActorRef is an internal actor reference and must never be projected as a customer-visible operator identity",
  "customerSafeSummary is the only text field allowed for future customer-safe projection and must not include raw payloads, raw evidence, raw security payloads, raw billing data, payment data, prompts, secrets, attacker details, or internal notes",
  "internalSafeNoteRef may point to safe internal commentary but must not contain raw content in the audit record itself",
  "previousCustomerStatus and nextCustomerStatus may store customer-visible status keys only",
  "audit records must be preserved for compliance and must not be represented to customers as deleted when preservation is required",
  "owner posture coverage keeps protected customer and report surfaces aligned with verified access while operator audit surfaces stay private and review-gated",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_AUDIT_APPROVAL_RULES = [
  "view-safe-summary may use approvalGate none but still creates an immutable viewed audit event",
  "assign-review may use approvalGate none but still records the assigned or held outcome",
  "request-customer-update must record the waiting-on-customer status transition and must not echo rejected raw content",
  "approve-safe-correction requires specialist-review or support-admin-approval before customer-visible correction language",
  "approve-billing-action requires billing-approval before refund, credit, invoice, plan, entitlement, or billing-state language",
  "escalate-security-review requires security-approval before customer-visible security outcome language",
  "close-request requires support-admin-approval when closure is irreversible, policy-exceptional, or customer-facing exception language is used",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_AUDIT_BLOCKED_CONTENT = [
  "raw payload",
  "raw evidence",
  "raw security payload",
  "raw billing data",
  "raw payment data",
  "internal notes visible to customer",
  "operator identity visible to customer",
  "risk-scoring internals",
  "attacker details",
  "exploit instructions",
  "prompt content",
  "developer message",
  "system message",
  "password",
  "token",
  "secret",
  "private key",
  "session token",
  "CSRF token",
  "admin key",
  "support context key",
  "unsupported refund promise",
  "unsupported legal outcome",
  "unsupported report change",
  "unsupported billing change",
  "unsupported security outcome",
  "unsupported business result",
  "fake urgency",
  "audit deletion claim",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_AUDIT_GUARDS = [
  "no support operator action may occur without an immutable audit record contract",
  "no audit record may store raw payloads, raw evidence, raw security payloads, raw billing data, raw payment data, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
  "no audit record may expose operator identities, internal notes, risk-scoring internals, attacker details, or exploit instructions to customers",
  "no audit record may support refund, correction, report-change, billing, legal, security, ROI, or business-result commitments without an approval gate",
  "no audit record may claim audit records are deleted when preservation is required",
  "no audit record may be created from browser-exposed support admin keys or customer support context keys",
] as const;

export function getCustomerSupportOperatorAuditContracts() {
  return {
    requiredFields: CUSTOMER_SUPPORT_OPERATOR_AUDIT_REQUIRED_FIELDS,
    eventRules: CUSTOMER_SUPPORT_OPERATOR_AUDIT_EVENT_RULES,
    approvalRules: CUSTOMER_SUPPORT_OPERATOR_AUDIT_APPROVAL_RULES,
    blockedContent: CUSTOMER_SUPPORT_OPERATOR_AUDIT_BLOCKED_CONTENT,
    guards: CUSTOMER_SUPPORT_OPERATOR_AUDIT_GUARDS,
  };
}
