export type CustomerSupportCustomerVisibleStatus =
  | "received"
  | "reviewing"
  | "waiting-on-customer"
  | "in-specialist-review"
  | "resolved"
  | "closed";

export type CustomerSupportStatusCategory = "support" | "correction" | "billing" | "security" | "plan-guidance";

export type CustomerSupportStatusContract = {
  key: CustomerSupportCustomerVisibleStatus;
  label: string;
  customerMeaning: string;
  allowedCustomerCopy: string;
  allowedPrimaryCta: string;
  allowedPrimaryPath: string;
  blockedCustomerCopy: readonly string[];
  requiredGuards: readonly string[];
};

export type CustomerSupportStatusProjectionContract = {
  customerVisibleFields: readonly string[];
  internalOnlyFields: readonly string[];
  requiredProjectionGuards: readonly string[];
};

export const CUSTOMER_SUPPORT_STATUS_CONTRACTS = [
  {
    key: "received",
    label: "Received",
    customerMeaning: "Cendorq received the request and created a safe support record.",
    allowedCustomerCopy: "Your request is recorded with a safe summary and is ready for the correct review path.",
    allowedPrimaryCta: "View support center",
    allowedPrimaryPath: "/dashboard/support",
    blockedCustomerCopy: ["exact queue position", "operator assignment", "internal notes", "guaranteed outcome"],
    requiredGuards: ["customer ownership", "safe summary only", "no raw payload", "support audit event"],
  },
  {
    key: "reviewing",
    label: "Reviewing",
    customerMeaning: "The request is being evaluated through the right support path.",
    allowedCustomerCopy: "Your request is under review. Cendorq will use approved records and safe summaries while avoiding unapproved commitments.",
    allowedPrimaryCta: "Open support center",
    allowedPrimaryPath: "/dashboard/support",
    blockedCustomerCopy: ["unapproved refund promise", "unapproved report change", "legal ruling", "operator private notes"],
    requiredGuards: ["safe status only", "no internal notes", "approval boundary visible", "support path visible"],
  },
  {
    key: "waiting-on-customer",
    label: "Waiting on customer",
    customerMeaning: "Cendorq needs a safer or clearer customer summary before the request can continue.",
    allowedCustomerCopy: "Add a clearer safe summary without passwords, tokens, payment data, raw evidence dumps, or private report internals.",
    allowedPrimaryCta: "Update request safely",
    allowedPrimaryPath: "/dashboard/support/request",
    blockedCustomerCopy: ["paste password", "paste payment data", "paste raw token", "paste raw evidence"],
    requiredGuards: ["safe resubmission path", "no secrets", "no raw evidence", "customer acknowledgement"],
  },
  {
    key: "in-specialist-review",
    label: "Specialist review",
    customerMeaning: "The request needs a correction, billing, security, legal-sensitive, or operator review path.",
    allowedCustomerCopy: "This request is in a specialist review path. Customer-facing changes or commitments require approval first.",
    allowedPrimaryCta: "Review support safety",
    allowedPrimaryPath: "/dashboard/support",
    blockedCustomerCopy: ["internal escalation queue", "operator identity", "risk score", "attacker details", "legal conclusion"],
    requiredGuards: ["customer-safe escalation status", "private internal notes", "no risk scoring internals", "approval boundary"],
  },
  {
    key: "resolved",
    label: "Resolved",
    customerMeaning: "The request has a customer-safe resolution or answer.",
    allowedCustomerCopy: "Your request has been resolved through the appropriate support path. You can open a new request if more help is needed.",
    allowedPrimaryCta: "Start another request",
    allowedPrimaryPath: "/dashboard/support/request",
    blockedCustomerCopy: ["hidden limitation", "unapproved guarantee", "private internal notes", "raw evidence"],
    requiredGuards: ["resolution summary", "support path visible", "no unsupported promise", "audit record"],
  },
  {
    key: "closed",
    label: "Closed",
    customerMeaning: "The support request is no longer active.",
    allowedCustomerCopy: "This request is closed. Start a new protected request if you need additional support.",
    allowedPrimaryCta: "Start new request",
    allowedPrimaryPath: "/dashboard/support/request",
    blockedCustomerCopy: ["case deletion claim", "audit deletion claim", "private internal notes", "operator blame"],
    requiredGuards: ["audit preserved", "support path visible", "safe close reason", "no deletion promise"],
  },
] as const satisfies readonly CustomerSupportStatusContract[];

export const CUSTOMER_SUPPORT_STATUS_PROJECTION = {
  customerVisibleFields: [
    "supportRequestId",
    "requestType",
    "businessContext",
    "safeSummary",
    "customerVisibleStatus",
    "createdAt",
    "updatedAt",
    "operatorReviewRequired",
    "downstreamProcessingAllowed",
    "customerSafeStatus",
  ],
  internalOnlyFields: [
    "customerIdHash",
    "rawPayload",
    "rawEvidence",
    "rawSecurityPayload",
    "rawBillingData",
    "internalNotes",
    "operatorId",
    "operatorIdHash",
    "riskScoringInternals",
    "attackerDetails",
    "adminReadKey",
    "supportContextKey",
    "sessionToken",
    "csrfToken",
  ],
  requiredProjectionGuards: [
    "customer ownership before projection",
    "safe status mapping before customer display",
    "no raw payload storage",
    "no internal-only fields in customer response",
    "no cross-customer support status access",
    "no account existence disclosure through status lookup",
  ],
} as const satisfies CustomerSupportStatusProjectionContract;

export const CUSTOMER_SUPPORT_STATUS_GLOBAL_GUARDS = [
  "no customer support status without customer ownership and session authorization",
  "no support status page or API reveals raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
  "no support status copy promises refunds, legal outcomes, report changes, billing changes, security outcomes, or guaranteed business results without approval",
  "no support status hides correction paths, billing help, security review, support escalation, or safe resubmission options",
  "no support status lookup discloses whether an account, request, report, billing object, or customer exists when authorization fails",
] as const;

export function getCustomerSupportStatusContracts() {
  return {
    statuses: CUSTOMER_SUPPORT_STATUS_CONTRACTS,
    projection: CUSTOMER_SUPPORT_STATUS_PROJECTION,
    guards: CUSTOMER_SUPPORT_STATUS_GLOBAL_GUARDS,
  };
}
