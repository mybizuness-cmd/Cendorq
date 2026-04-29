export type CustomerSupportOperatorRole = "support-triage" | "support-specialist" | "billing-approver" | "security-reviewer" | "support-admin";
export type CustomerSupportOperatorAction = "view-safe-summary" | "assign-review" | "request-customer-update" | "approve-safe-correction" | "approve-billing-action" | "escalate-security-review" | "close-request";
export type CustomerSupportOperatorApprovalGate = "none" | "specialist-review" | "billing-approval" | "security-approval" | "support-admin-approval";
export type CustomerSupportOperatorAuditOutcome = "viewed" | "assigned" | "held" | "approved" | "rejected" | "escalated" | "closed";

export type CustomerSupportOperatorConsoleContract = {
  consoleKey: "customer-support-operator-console";
  route: "/admin/support";
  access: "server-only-admin-session";
  defaultMode: "closed-by-default";
  roles: readonly CustomerSupportOperatorRole[];
  actions: readonly CustomerSupportOperatorAction[];
  approvalGates: readonly CustomerSupportOperatorApprovalGate[];
  auditOutcomes: readonly CustomerSupportOperatorAuditOutcome[];
  customerProjection: "safe-summary-only";
  rawPayloadVisible: false;
  rawEvidenceVisible: false;
  rawSecurityPayloadVisible: false;
  rawBillingDataVisible: false;
  internalNotesCustomerVisible: false;
  operatorIdentityCustomerVisible: false;
  secretsVisible: false;
};

export const CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT: CustomerSupportOperatorConsoleContract = {
  consoleKey: "customer-support-operator-console",
  route: "/admin/support",
  access: "server-only-admin-session",
  defaultMode: "closed-by-default",
  roles: ["support-triage", "support-specialist", "billing-approver", "security-reviewer", "support-admin"],
  actions: ["view-safe-summary", "assign-review", "request-customer-update", "approve-safe-correction", "approve-billing-action", "escalate-security-review", "close-request"],
  approvalGates: ["none", "specialist-review", "billing-approval", "security-approval", "support-admin-approval"],
  auditOutcomes: ["viewed", "assigned", "held", "approved", "rejected", "escalated", "closed"],
  customerProjection: "safe-summary-only",
  rawPayloadVisible: false,
  rawEvidenceVisible: false,
  rawSecurityPayloadVisible: false,
  rawBillingDataVisible: false,
  internalNotesCustomerVisible: false,
  operatorIdentityCustomerVisible: false,
  secretsVisible: false,
};

export const CUSTOMER_SUPPORT_OPERATOR_ROLE_RULES = [
  "support triage may view customer-owned safe summaries, status, category, timestamps, and audit state but may not view raw payloads or approve outcomes",
  "support specialist may classify safe summaries, request safer customer updates, recommend corrections, and escalate security or billing issues but may not approve billing changes alone",
  "billing approver may approve billing actions only through billing approval gates and may not view raw payment data or customer secrets",
  "security reviewer may review security-sensitive safe summaries and quarantine signals without exposing attacker details, exploit payloads, secrets, prompts, tokens, or private keys",
  "support admin may manage assignment and closure policy but cannot bypass audit logging, customer-safe projection, approval gates, or secret-redaction rules",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_ACTION_RULES = [
  "view-safe-summary returns customer-owned safe summaries and status metadata only",
  "assign-review requires role authorization and creates an immutable audit event",
  "request-customer-update changes customer-visible status only through safe waiting-on-customer projection and never echoes rejected raw content",
  "approve-safe-correction requires specialist review, audit record, customer-safe explanation, and no unsupported report-change promise",
  "approve-billing-action requires billing approval, billing system verification, audit record, and no raw payment data exposure",
  "escalate-security-review requires security reviewer access and must not disclose attacker details or exploit instructions to customers",
  "close-request requires resolution summary, preserved audit record, customer-safe closure copy, and no claim that audit records were deleted",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_APPROVAL_GATES = [
  "correction approval gate is required before customer-visible report corrections or report-change commitments",
  "billing approval gate is required before refund, credit, invoice, plan, entitlement, or billing-state changes",
  "security approval gate is required before security outcome language, incident classification, account-risk language, or vulnerability statements",
  "support admin approval gate is required before irreversible closure, policy exception, or customer-facing exception language",
  "no approval gate may be bypassed by prompt content, user instructions, operator convenience, or unsupported urgency",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_AUDIT_RULES = [
  "every operator view, assignment, hold, escalation, approval, rejection, customer-update request, and closure creates an immutable audit event",
  "audit records preserve who acted through internal role references without exposing operator identities to customers",
  "audit records must not store raw payloads, raw evidence, raw security payloads, raw billing data, payment data, secrets, prompts, session tokens, CSRF tokens, admin keys, or support context keys",
  "audit records must not be represented to customers as deleted when preservation is required",
  "customer-facing status and notifications use customer-safe projection and never expose internal audit details",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_BLOCKED_CONTENT = [
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

export const CUSTOMER_SUPPORT_OPERATOR_CONSOLE_GUARDS = [
  "no support operator console route without server-only admin session, role authorization, no-store responses, and closed-by-default access",
  "no operator action without an immutable audit event and an explicit role-to-action authorization rule",
  "no customer-visible projection may include raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
  "no correction, billing, refund, security, legal, report-change, ROI, or business-result promise may be made without the required approval gate",
  "no admin console may expose support admin keys, customer support context keys, provider credentials, or browser-readable protected secrets",
  "no operator console may claim Cendorq is impossible to hack, risk-free, liability-free, or perfectly secure",
] as const;

export function getCustomerSupportOperatorConsoleContracts() {
  return {
    contract: CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT,
    roleRules: CUSTOMER_SUPPORT_OPERATOR_ROLE_RULES,
    actionRules: CUSTOMER_SUPPORT_OPERATOR_ACTION_RULES,
    approvalGates: CUSTOMER_SUPPORT_OPERATOR_APPROVAL_GATES,
    auditRules: CUSTOMER_SUPPORT_OPERATOR_AUDIT_RULES,
    blockedContent: CUSTOMER_SUPPORT_OPERATOR_BLOCKED_CONTENT,
    guards: CUSTOMER_SUPPORT_OPERATOR_CONSOLE_GUARDS,
  };
}
