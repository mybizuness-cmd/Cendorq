import type { CustomerSupportOperatorAction, CustomerSupportOperatorRole } from "@/lib/customer-support-operator-console-contracts";

export type CustomerSupportOperatorAccessDecision = "allow" | "deny" | "challenge";
export type CustomerSupportOperatorSessionState = "missing" | "expired" | "unverified" | "role-missing" | "role-allowed" | "reauth-required";
export type CustomerSupportOperatorAccessSurface = "admin-support-route" | "admin-support-api" | "operator-audit-store" | "operator-assignment" | "operator-approval";

export type CustomerSupportOperatorAccessContract = {
  accessKey: "customer-support-operator-access";
  route: "/admin/support";
  defaultDecision: "deny";
  sessionLocation: "server-only-http-only-cookie";
  reauthMode: "fresh-admin-reauth-required-for-mutations";
  responseMode: "no-store";
  allowedSurfaces: readonly CustomerSupportOperatorAccessSurface[];
  allowedRoles: readonly CustomerSupportOperatorRole[];
  protectedActions: readonly CustomerSupportOperatorAction[];
  browserReadableAdminSecretAllowed: false;
  browserReadableSupportContextAllowed: false;
  localStorageAllowed: false;
  sessionStorageAllowed: false;
  rawCustomerDataAllowed: false;
};

export const CUSTOMER_SUPPORT_OPERATOR_ACCESS_CONTRACT: CustomerSupportOperatorAccessContract = {
  accessKey: "customer-support-operator-access",
  route: "/admin/support",
  defaultDecision: "deny",
  sessionLocation: "server-only-http-only-cookie",
  reauthMode: "fresh-admin-reauth-required-for-mutations",
  responseMode: "no-store",
  allowedSurfaces: ["admin-support-route", "admin-support-api", "operator-audit-store", "operator-assignment", "operator-approval"],
  allowedRoles: ["support-triage", "support-specialist", "billing-approver", "security-reviewer", "support-admin"],
  protectedActions: ["view-safe-summary", "assign-review", "request-customer-update", "approve-safe-correction", "approve-billing-action", "escalate-security-review", "close-request"],
  browserReadableAdminSecretAllowed: false,
  browserReadableSupportContextAllowed: false,
  localStorageAllowed: false,
  sessionStorageAllowed: false,
  rawCustomerDataAllowed: false,
};

export const CUSTOMER_SUPPORT_OPERATOR_ACCESS_REQUIRED_CHECKS = [
  "operator access is denied by default until server-only admin session verification passes",
  "operator access requires httpOnly secure SameSite admin session cookies and must not use browser-readable admin secrets",
  "operator access requires role authorization before any support operator action is displayed, executed, stored, or audited",
  "operator mutations require fresh admin reauthentication and immutable audit creation before success responses",
  "operator access returns no-store responses for route, API, challenge, deny, and error states",
  "operator access failures must not leak customer existence, support request existence, operator identities, role inventory, or internal authorization details",
  "operator access may only project customer-owned safe summaries, customer-visible statuses, timestamps, request IDs, and approved audit projections",
  "owner posture coverage keeps protected customer and report surfaces aligned with verified access while operator access surfaces stay private and review-gated",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_ACCESS_ROLE_RULES = [
  "support-triage may view safe summaries, assign review, and request customer updates after role authorization",
  "support-specialist may view safe summaries, assign review, request customer updates, approve safe corrections through the required gate, escalate security review, and close approved requests",
  "billing-approver may view safe summaries and approve billing actions through the billing approval gate only",
  "security-reviewer may view safe summaries and escalate security review through the security approval gate only",
  "support-admin may manage assignments, approvals, closures, and policy exceptions only with immutable audit records and required approval gates",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_ACCESS_MUTATION_RULES = [
  "assign-review requires role authorization, fresh admin reauth, immutable audit record, and no customer-visible operator identity",
  "request-customer-update requires role authorization, fresh admin reauth, immutable audit record, waiting-on-customer customer-safe projection, and no rejected raw content echo",
  "approve-safe-correction requires specialist-review or support-admin-approval gate, immutable audit record, and customer-safe correction language",
  "approve-billing-action requires billing-approval gate, immutable audit record, billing-system verification, and no raw payment data exposure",
  "escalate-security-review requires security-approval gate, immutable audit record, and no attacker details or exploit instructions in customer projection",
  "close-request requires support-admin-approval when closure is irreversible, exception-based, or customer-facing exception language is used",
] as const;

export const CUSTOMER_SUPPORT_OPERATOR_ACCESS_BLOCKED_CONTENT = [
  "browser-readable admin secret",
  "browser-readable support context key",
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

export const CUSTOMER_SUPPORT_OPERATOR_ACCESS_GUARDS = [
  "no support operator access without server-only admin session verification, role authorization, no-store response controls, and closed-by-default denial",
  "no support operator mutation without fresh admin reauth, immutable audit record, role-to-action authorization, and required approval gate",
  "no support operator access uses localStorage, sessionStorage, browser-readable admin secrets, browser-readable support context keys, query-string secrets, or public JavaScript secrets",
  "no support operator projection exposes raw payloads, raw evidence, raw security payloads, raw billing data, raw payment data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
  "no support operator action may promise refunds, legal outcomes, report changes, billing changes, security outcomes, ROI, or business results without the required approval gate",
  "no support operator route may claim absolute security, risk-free operation, liability removal, or perfect protection",
] as const;

export function getCustomerSupportOperatorAccessContracts() {
  return {
    contract: CUSTOMER_SUPPORT_OPERATOR_ACCESS_CONTRACT,
    requiredChecks: CUSTOMER_SUPPORT_OPERATOR_ACCESS_REQUIRED_CHECKS,
    roleRules: CUSTOMER_SUPPORT_OPERATOR_ACCESS_ROLE_RULES,
    mutationRules: CUSTOMER_SUPPORT_OPERATOR_ACCESS_MUTATION_RULES,
    blockedContent: CUSTOMER_SUPPORT_OPERATOR_ACCESS_BLOCKED_CONTENT,
    guards: CUSTOMER_SUPPORT_OPERATOR_ACCESS_GUARDS,
  };
}
