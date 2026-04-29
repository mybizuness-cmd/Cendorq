import type { CustomerSupportOperatorApprovalGate, CustomerSupportOperatorRole } from "@/lib/customer-support-operator-console-contracts";

export type CustomerSupportOperatorApprovalType = "safe-correction" | "billing-action" | "security-outcome" | "support-closure";
export type CustomerSupportOperatorApprovalDecision = "approve" | "reject" | "hold" | "escalate";
export type CustomerSupportOperatorApprovalState = "requested" | "in-review" | "approved" | "rejected" | "held" | "escalated";

export type CustomerSupportOperatorApprovalContract = {
  approvalId: string;
  supportRequestId: string;
  customerIdHash: string;
  approvalType: CustomerSupportOperatorApprovalType;
  approvalGate: CustomerSupportOperatorApprovalGate;
  requestedByRole: CustomerSupportOperatorRole;
  reviewerRole: CustomerSupportOperatorRole;
  decision: CustomerSupportOperatorApprovalDecision;
  state: CustomerSupportOperatorApprovalState;
  reasonCode: string;
  customerSafeSummary: string;
  customerSafeOutcomeCopy?: string;
  auditEventId: string;
  createdAt: string;
  updatedAt: string;
  immutableAuditRequired: true;
  customerVisibleOperatorIdentity: false;
  rawPayloadStored: false;
  rawEvidenceStored: false;
  rawSecurityPayloadStored: false;
  rawBillingDataStored: false;
  rawPaymentDataStored: false;
  internalNotesCustomerVisible: false;
  unsupportedPromiseAllowed: false;
  secretsStored: false;
};

export const CUSTOMER_SUPPORT_OPERATOR_APPROVAL_REQUIRED_FIELDS = [
  "approvalId",
  "supportRequestId",
  "customerIdHash",
  "approvalType",
  "approvalGate",
  "requestedByRole",
  "reviewerRole",
  "decision",
  "state",
  "reasonCode",
  "customerSafeSummary",
  "auditEventId",
  "createdAt",
  "updatedAt",
  "immutableAuditRequired=true",
  "customerVisibleOperatorIdentity=false",
  "rawPayloadStored=false",
  "rawEvidenceStored=false",
  "rawSecurityPayloadStored=false",
  "rawBillingDataStored=false",
  "rawPaymentDataStored=false",
  "internalNotesCustomerVisible=false",
  "unsupportedPromiseAllowed=false",
  "secretsStored=false",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_APPROVAL_TYPE_RULES = [
  "safe-correction approval requires specialist-review or support-admin-approval before customer-visible correction language",
  "billing-action approval requires billing-approval before refund, credit, invoice, entitlement, plan, or billing-state language",
  "security-outcome approval requires security-approval before customer-visible security outcome language, incident classification, or account-risk language",
  "support-closure approval requires support-admin-approval before irreversible closure, policy exception, or customer-facing exception language",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_APPROVAL_DECISION_RULES = [
  "approve requires role authorization, required approval gate, immutable audit record, and customer-safe outcome copy when the result will be shown to a customer",
  "reject requires customer-safe reason copy and must not expose internal notes, operator identity, role inventory, or authorization details",
  "hold requires a customer-safe reason and must not imply approval, billing change, report change, security outcome, refund, legal outcome, ROI, or business result",
  "escalate requires target reviewer role compatibility and must preserve the original audit chain",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_APPROVAL_ROLE_RULES = [
  "support-specialist may request safe-correction approval and review safe-correction approvals when specialist-review gate applies",
  "billing-approver may review billing-action approvals only and must not view raw payment data",
  "security-reviewer may review security-outcome approvals only and must not expose attacker details or exploit instructions",
  "support-admin may review support-closure approvals, exception language, and support-admin approval gates",
  "support-triage may request approval escalation but may not approve correction, billing, security, or closure outcomes",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_APPROVAL_BLOCKED_CONTENT = [
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
  "guaranteed business result",
  "fake urgency",
  "audit deletion claim",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_APPROVAL_GUARDS = [
  "no support approval without server-only operator access, reviewer role authorization, required approval gate, fresh admin reauth for mutation, and immutable audit creation",
  "no support approval stores raw payloads, raw evidence, raw security payloads, raw billing data, raw payment data, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
  "no support approval exposes customer-visible operator identity, internal notes, risk-scoring internals, attacker details, exploit instructions, role inventory, customer existence, support request existence, or internal authorization details on denial",
  "no support approval permits refund, correction, report-change, billing, legal, security, ROI, or business-result commitments without the required approval gate and customer-safe outcome copy",
  "no support approval may claim audit records are deleted when preservation is required",
  "no support approval may claim Cendorq is impossible to hack, risk-free, liability-free, or perfectly secure",
] as const;

export function getCustomerSupportOperatorApprovalContracts() {
  return {
    requiredFields: CUSTOMER_SUPPORT_OPERATOR_APPROVAL_REQUIRED_FIELDS,
    typeRules: CUSTOMER_SUPPORT_OPERATOR_APPROVAL_TYPE_RULES,
    decisionRules: CUSTOMER_SUPPORT_OPERATOR_APPROVAL_DECISION_RULES,
    roleRules: CUSTOMER_SUPPORT_OPERATOR_APPROVAL_ROLE_RULES,
    blockedContent: CUSTOMER_SUPPORT_OPERATOR_APPROVAL_BLOCKED_CONTENT,
    guards: CUSTOMER_SUPPORT_OPERATOR_APPROVAL_GUARDS,
  };
}
