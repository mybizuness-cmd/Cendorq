import type { CustomerSupportOperatorRole } from "@/lib/customer-support-operator-console-contracts";

export type CustomerSupportOperatorAssignmentState = "unassigned" | "triage-assigned" | "specialist-assigned" | "billing-assigned" | "security-assigned" | "admin-review" | "released";
export type CustomerSupportOperatorAssignmentDecision = "assign" | "hold" | "release" | "escalate" | "deny";

export type CustomerSupportOperatorAssignmentContract = {
  assignmentId: string;
  supportRequestId: string;
  customerIdHash: string;
  assignedRole: CustomerSupportOperatorRole;
  assignedActorRef?: string;
  assignmentState: CustomerSupportOperatorAssignmentState;
  decision: CustomerSupportOperatorAssignmentDecision;
  reasonCode: string;
  customerSafeSummary: string;
  createdAt: string;
  updatedAt: string;
  auditEventId: string;
  immutableAuditRequired: true;
  customerVisibleOperatorIdentity: false;
  rawPayloadStored: false;
  rawEvidenceStored: false;
  rawSecurityPayloadStored: false;
  rawBillingDataStored: false;
  rawPaymentDataStored: false;
  internalNotesCustomerVisible: false;
  secretsStored: false;
};

export const CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_REQUIRED_FIELDS = [
  "assignmentId",
  "supportRequestId",
  "customerIdHash",
  "assignedRole",
  "assignmentState",
  "decision",
  "reasonCode",
  "customerSafeSummary",
  "createdAt",
  "updatedAt",
  "auditEventId",
  "immutableAuditRequired=true",
  "customerVisibleOperatorIdentity=false",
  "rawPayloadStored=false",
  "rawEvidenceStored=false",
  "rawSecurityPayloadStored=false",
  "rawBillingDataStored=false",
  "rawPaymentDataStored=false",
  "internalNotesCustomerVisible=false",
  "secretsStored=false",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_STATE_RULES = [
  "unassigned means no operator role owns the support request yet and no customer-facing operator identity is visible",
  "triage-assigned means support triage may view safe summaries, classify, hold, or request a safer customer update",
  "specialist-assigned means a support specialist may review safe summaries and recommend correction or escalation through required approval gates",
  "billing-assigned means a billing approver may review safe summaries for billing action but may not view raw payment data",
  "security-assigned means a security reviewer may review safe summaries for security escalation but may not expose attacker details or exploit instructions",
  "admin-review means support admin review is required before closure, exception language, or policy-sensitive changes",
  "released means the assignment is no longer active but audit records remain preserved",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_DECISION_RULES = [
  "assign requires server-only operator access, role authorization, fresh admin reauth for mutation, and immutable audit record creation",
  "hold requires a customer-safe reason and must not expose internal notes, risk-scoring internals, customer-visible operator identity, or rejected raw content",
  "release preserves prior audit events and must not claim assignment or audit records were deleted",
  "escalate requires the target role to match billing, security, specialist, or support admin approval path",
  "deny is used when assignment cannot be authorized safely and must not reveal role inventory, customer existence, support request existence, or internal authorization details",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_ROLE_RULES = [
  "support-triage may assign triage review, hold a request, or escalate to specialist, billing, security, or support admin review through audit",
  "support-specialist may accept specialist assignment, recommend correction review, request safer customer update, or escalate billing/security issues through audit",
  "billing-approver may accept billing assignment only for billing-help or billing-state questions and must not view raw payment data",
  "security-reviewer may accept security assignment only for security-sensitive support issues and must not expose attacker details, exploit payloads, prompts, tokens, or private keys",
  "support-admin may accept admin-review assignments and resolve assignment exceptions only with immutable audit and approval gates",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_BLOCKED_CONTENT = [
  "raw payload",
  "raw evidence",
  "raw security payload",
  "raw billing data",
  "raw payment data",
  "internal notes visible to customer",
  "customer-visible operator identity",
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

export const CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_GUARDS = [
  "no support operator assignment without server-only operator access, role authorization, fresh admin reauth for mutation, and immutable audit creation",
  "no support operator assignment exposes customer-visible operator identity, internal notes, raw payloads, raw evidence, raw security payloads, raw billing data, raw payment data, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
  "no support operator assignment may bypass billing, security, correction, or support-admin approval gates",
  "no support operator assignment may reveal role inventory, support request existence, customer existence, or internal authorization details on denial",
  "no support operator assignment may promise refunds, legal outcomes, report changes, billing changes, security outcomes, ROI, or business results without required approval gates",
  "no support operator assignment may claim absolute security, risk-free operation, liability removal, or perfect protection",
] as const;

export function getCustomerSupportOperatorAssignmentContracts() {
  return {
    requiredFields: CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_REQUIRED_FIELDS,
    stateRules: CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_STATE_RULES,
    decisionRules: CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_DECISION_RULES,
    roleRules: CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_ROLE_RULES,
    blockedContent: CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_BLOCKED_CONTENT,
    guards: CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_GUARDS,
  };
}
