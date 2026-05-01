export type DashboardInboxMessageCategory = "scan" | "report" | "plan" | "support" | "billing" | "security" | "command-center";
export type DashboardInboxMessagePriority = "low" | "normal" | "high" | "critical";
export type DashboardInboxMessageStatus = "unread" | "read" | "resolved" | "suppressed";

export type DashboardInboxMessageContract = {
  key: string;
  category: DashboardInboxMessageCategory;
  priority: DashboardInboxMessagePriority;
  status: DashboardInboxMessageStatus;
  title: string;
  body: string;
  primaryCta: string;
  primaryPath: "/dashboard" | "/dashboard/reports" | "/dashboard/notifications" | "/dashboard/support" | "/dashboard/support/status" | "/dashboard/billing" | "/plans" | "/free-check";
  conversionRole: string;
  requiredState: readonly string[];
  requiredGuards: readonly string[];
  suppressionRules: readonly string[];
  blockedContent: readonly string[];
  rawCustomerEmailExposed: false;
  rawPayloadExposed: false;
  rawEvidenceExposed: false;
  rawSecurityPayloadExposed: false;
  rawBillingDataExposed: false;
  internalNotesExposed: false;
  operatorIdentityExposed: false;
  riskInternalsExposed: false;
  attackerDetailsExposed: false;
  promptExposed: false;
  secretExposed: false;
  tokenExposed: false;
  crossCustomerDataExposed: false;
};

export const DASHBOARD_INBOX_FOUNDATION_CONTRACTS: readonly DashboardInboxMessageContract[] = [
  buildInboxMessage({
    key: "scan-results-protected",
    category: "scan",
    priority: "high",
    title: "Your scan path is protected",
    body: "Cendorq keeps scan results inside your verified dashboard so your next step stays connected to your business record.",
    primaryCta: "Open scan status",
    primaryPath: "/dashboard/reports",
    conversionRole: "Moves scan momentum into protected report viewing without showing results before verification.",
    requiredState: ["customer ownership", "verified email", "scan status projection"],
    requiredGuards: ["no pending scan treated as final", "safe report path only", "no private intake details"],
    suppressionRules: ["hide after final report opened", "suppress while email verification missing"],
    blockedContent: ["private intake", "unverified result", "complete diagnosis claim"],
  }),
  buildInboxMessage({
    key: "report-vault-next-action",
    category: "report",
    priority: "normal",
    title: "Your report vault is your source of truth",
    body: "Open approved reports, visible limits, confidence labels, and next recommended actions from one protected place.",
    primaryCta: "Open report vault",
    primaryPath: "/dashboard/reports",
    conversionRole: "Turns report delivery into a command-center habit through clarity and proof.",
    requiredState: ["verified email", "customer-owned report projection"],
    requiredGuards: ["approved reports only", "limitations visible", "no private evidence"],
    suppressionRules: ["hide when no report path is available", "do not duplicate report-ready notifications"],
    blockedContent: ["private evidence", "internal notes", "guaranteed outcome"],
  }),
  buildInboxMessage({
    key: "plan-fit-guidance",
    category: "plan",
    priority: "normal",
    title: "Your next plan should match the evidence",
    body: "Cendorq explains recommended prior steps without blocking your ability to choose a plan that fits your business.",
    primaryCta: "Compare plans",
    primaryPath: "/plans",
    conversionRole: "Educates plan selection without pressure, loopholes, or unpaid deliverable leakage.",
    requiredState: ["plan stage", "available report limitations", "customer-owned progress"],
    requiredGuards: ["no fake urgency", "no unpaid deliverables", "no guaranteed ROI"],
    suppressionRules: ["hide after active plan review acknowledged", "do not show during billing dispute"],
    blockedContent: ["fake urgency", "guaranteed revenue", "unpaid full scan report"],
  }),
  buildInboxMessage({
    key: "support-status-command-center",
    category: "support",
    priority: "normal",
    title: "Track support from your command center",
    body: "Your support path shows safe status, next steps, and recovery options without exposing private review details.",
    primaryCta: "Track support status",
    primaryPath: "/dashboard/support/status",
    conversionRole: "Reduces uncertainty by connecting support progress to the customer dashboard.",
    requiredState: ["customer-owned support request", "safe status projection"],
    requiredGuards: ["no internal notes", "no operator identity", "no private evidence"],
    suppressionRules: ["hide after support request closed and acknowledged", "do not show duplicate lifecycle message"],
    blockedContent: ["internal notes", "operator identity", "unapproved refund promise"],
  }),
  buildInboxMessage({
    key: "billing-center-safe-recovery",
    category: "billing",
    priority: "high",
    title: "Billing actions stay in the billing center",
    body: "Use the billing center for invoices, entitlement status, and safe recovery steps. Cendorq will not request sensitive payment details in inbox messages.",
    primaryCta: "Open billing center",
    primaryPath: "/dashboard/billing",
    conversionRole: "Protects retention and billing trust through calm, safe recovery routing.",
    requiredState: ["safe billing projection", "customer ownership", "entitlement boundary"],
    requiredGuards: ["no private payment data", "no shame copy", "support path visible"],
    suppressionRules: ["hide after billing status resolved", "do not pressure during dispute"],
    blockedContent: ["private payment details", "private billing data", "shame copy"],
  }),
  buildInboxMessage({
    key: "security-sensitive-action",
    category: "security",
    priority: "critical",
    title: "Sensitive actions require extra verification",
    body: "For account, report, billing, or support-sensitive actions, Cendorq may ask you to reconfirm safely before continuing.",
    primaryCta: "Review security step",
    primaryPath: "/dashboard/notifications",
    conversionRole: "Protects account trust without exposing security internals or threat details.",
    requiredState: ["reauth needed", "safe security projection"],
    requiredGuards: ["no threat details", "no risk scoring internals", "no secret collection"],
    suppressionRules: ["hide after reauth complete", "do not reveal sensitive action until verified"],
    blockedContent: ["threat payload", "risk scoring internals", "password", "session authority"],
  }),
  buildInboxMessage({
    key: "command-center-next-step",
    category: "command-center",
    priority: "normal",
    title: "Your command center keeps the next action clear",
    body: "Use this inbox for dashboard messages, plan nudges, report readiness, support status, billing reminders, and safe recovery paths.",
    primaryCta: "Return to dashboard",
    primaryPath: "/dashboard",
    conversionRole: "Makes the dashboard feel central without replacing external email confirmation and lifecycle messages.",
    requiredState: ["verified customer session", "safe customer-owned projection"],
    requiredGuards: ["not a substitute for external email", "one safe CTA", "no private or internal leakage"],
    suppressionRules: ["hide duplicate command-center reminders", "suppress when account access is denied"],
    blockedContent: ["private payload", "internal notes", "cross-customer data"],
  }),
] as const;

export const DASHBOARD_INBOX_GLOBAL_GUARDS = [
  "dashboard inbox messages are command-center notifications and must not replace external email confirmation or lifecycle email orchestration",
  "each inbox message must have one safe primary CTA and a customer-owned projection",
  "inbox messages must not expose private payloads, evidence, security material, billing material, internal notes, operator identities, risk internals, threat details, prompts, secrets, tokens, or cross-customer data",
  "inbox conversion must use proof, clarity, limitations, plan fit, and next safe action rather than fake urgency or dark patterns",
  "billing inbox messages must route to the billing center and must not request sensitive payment details",
  "support inbox messages must route to support status or support center and must not expose internal review details",
  "security inbox messages must avoid threat details, risk scoring internals, sensitive security material, and secret collection",
] as const;

export function getDashboardInboxContracts() {
  return {
    messages: DASHBOARD_INBOX_FOUNDATION_CONTRACTS,
    guards: DASHBOARD_INBOX_GLOBAL_GUARDS,
  };
}

export function projectDashboardInboxFoundationSummary() {
  return {
    inboxAvailable: true,
    externalEmailStillRequired: true,
    categories: ["scan", "report", "plan", "support", "billing", "security", "command-center"] as const,
    oneSafePrimaryCtaRequired: true,
    commandCenterRole: "customer-owned dashboard messages, plan nudges, report readiness, support status, billing reminders, and safe recovery paths" as const,
    rawCustomerEmailExposed: false,
    rawPayloadExposed: false,
    rawEvidenceExposed: false,
    rawSecurityPayloadExposed: false,
    rawBillingDataExposed: false,
    internalNotesExposed: false,
    operatorIdentityExposed: false,
    riskInternalsExposed: false,
    attackerDetailsExposed: false,
    promptExposed: false,
    secretExposed: false,
    tokenExposed: false,
    crossCustomerDataExposed: false,
  };
}

function buildInboxMessage(
  input: Omit<DashboardInboxMessageContract, "status" | "rawCustomerEmailExposed" | "rawPayloadExposed" | "rawEvidenceExposed" | "rawSecurityPayloadExposed" | "rawBillingDataExposed" | "internalNotesExposed" | "operatorIdentityExposed" | "riskInternalsExposed" | "attackerDetailsExposed" | "promptExposed" | "secretExposed" | "tokenExposed" | "crossCustomerDataExposed">,
): DashboardInboxMessageContract {
  return {
    ...input,
    status: "unread",
    rawCustomerEmailExposed: false,
    rawPayloadExposed: false,
    rawEvidenceExposed: false,
    rawSecurityPayloadExposed: false,
    rawBillingDataExposed: false,
    internalNotesExposed: false,
    operatorIdentityExposed: false,
    riskInternalsExposed: false,
    attackerDetailsExposed: false,
    promptExposed: false,
    secretExposed: false,
    tokenExposed: false,
    crossCustomerDataExposed: false,
  };
}
