export type CustomerPlatformHandoffSurfaceKey =
  | "free-scan-to-dashboard"
  | "free-scan-to-notifications"
  | "free-scan-to-report-vault"
  | "dashboard-to-report-vault"
  | "dashboard-to-billing"
  | "dashboard-to-notifications"
  | "dashboard-to-support"
  | "dashboard-to-plans"
  | "report-vault-to-support"
  | "report-vault-to-plans"
  | "billing-to-plans"
  | "billing-to-support"
  | "notifications-to-status"
  | "support-request-to-status"
  | "support-status-to-safe-update"
  | "plans-to-free-scan-or-dashboard";

export type CustomerPlatformHandoffSurface = {
  key: CustomerPlatformHandoffSurfaceKey;
  from: string;
  to: string;
  currentState: string;
  safeNextAction: string;
  recoveryPath: string;
  connectedDestination: string;
  privacyPosture: string;
  requiredGuards: readonly string[];
  blockedPatterns: readonly string[];
};

export type CustomerPlatformHandoffContract = {
  id: "customer-platform-handoff-contract";
  name: string;
  purpose: string;
  operatingStandard: readonly string[];
  handoffSurfaces: readonly CustomerPlatformHandoffSurface[];
  stateRules: readonly string[];
  safetyRules: readonly string[];
  recoveryRules: readonly string[];
  releaseRules: readonly string[];
};

export const CUSTOMER_PLATFORM_HANDOFF_HARD_LOCKS = [
  "No customer journey dead end.",
  "No pending state presented as final truth.",
  "No customer handoff without one safe next action.",
  "No handoff that exposes raw or internal data.",
  "No browser-stored authority, localStorage secrets, sessionStorage secrets, URL secrets, or client-owned session tokens.",
  "No fake urgency, dark-pattern pressure, unsupported outcome promise, guaranteed ROI promise, guaranteed refund promise, guaranteed report-change promise, guaranteed billing-change promise, guaranteed legal outcome, or guaranteed security outcome.",
  "No duplicate-submission path without status, notification, dashboard, or support follow-through.",
] as const;

export const CUSTOMER_PLATFORM_HANDOFF_BLOCKED_PATTERNS = [
  "customerJourneyDeadEnd",
  "pendingStateFinalTruth",
  "handoffWithoutNextAction",
  "rawPayloadHandoff",
  "rawEvidenceHandoff",
  "rawSecurityPayloadHandoff",
  "rawBillingDataHandoff",
  "internalNotesHandoff",
  "operatorIdentityHandoff",
  "riskInternalsHandoff",
  "attackerDetailsHandoff",
  "promptHandoff",
  "systemMessageHandoff",
  "developerMessageHandoff",
  "secretHandoff",
  "passwordHandoff",
  "apiKeyHandoff",
  "privateKeyHandoff",
  "sessionTokenHandoff",
  "csrfTokenHandoff",
  "adminKeyHandoff",
  "supportContextKeyHandoff",
  "browserStoredAuthority",
  "localStorageSecret",
  "sessionStorageSecret",
  "fakeUrgencyHandoff",
  "darkPatternHandoff",
  "guaranteedOutcomeHandoff",
  "unsupportedLegalPromiseHandoff",
  "unsupportedRefundPromiseHandoff",
  "unsupportedReportChangePromiseHandoff",
  "unsupportedBillingChangePromiseHandoff",
] as const;

const platformLeakageBlocks = [
  "raw payloads",
  "raw evidence",
  "raw security payloads",
  "raw billing data",
  "internal notes",
  "operator identities",
  "risk-scoring internals",
  "attacker details",
  "prompt/system/developer messages",
  "secrets",
  "passwords",
  "API keys",
  "private keys",
  "session tokens",
  "CSRF tokens",
  "admin keys",
  "support context keys",
  "cross-customer data",
] as const;

export const CUSTOMER_PLATFORM_HANDOFF_CONTRACT = {
  id: "customer-platform-handoff-contract",
  name: "Customer Platform Handoff Contract",
  purpose:
    "Standardize every customer surface so the platform always shows the current state, one safe next action, a recovery path, a connected destination, and a privacy posture without disconnected journeys, duplicate-submission anxiety, pending-as-final state, raw/internal data exposure, fake urgency, or unsupported outcome promises.",
  operatingStandard: [
    "Every customer handoff must name the current state in customer-safe language before asking for action.",
    "Every customer handoff must provide exactly one primary safe next action plus a calmer secondary recovery path when recovery is relevant.",
    "Every customer handoff must point to a connected destination inside dashboard, notifications, report vault, billing, support, status, plans, or Free Scan.",
    "Every customer handoff must state or imply a privacy posture that relies on safe projection, customer ownership, verified access, and no-store behavior where applicable.",
    "Every customer handoff must preserve conversion through proof, clarity, readiness, and stage fit rather than fake urgency or unsupported business-result promises.",
  ],
  handoffSurfaces: [
    surface("free-scan-to-dashboard", "Free Scan", "Dashboard", "Free Scan submitted or ready to resume", "Open dashboard to see the private next action after verification.", "Resume or restart the scan safely without browser-stored authority or local/session storage secrets.", "/dashboard"),
    surface("free-scan-to-notifications", "Free Scan", "Notification center", "Free Scan captured, pending, ready, or needing follow-up", "Check notifications for scan, report, account, billing, support, or security updates.", "Use dashboard if notifications are empty or suppressed for safety.", "/dashboard/notifications"),
    surface("free-scan-to-report-vault", "Free Scan", "Report vault", "Scan result may be pending, ready, or not yet released", "Open the report vault to see safe report availability state.", "Return to dashboard or support if the vault shows unavailable, pending, or needs-follow-up state.", "/dashboard/reports"),
    surface("dashboard-to-report-vault", "Dashboard", "Report vault", "Customer has a report-related next step", "Open report vault for released, pending, or correction-eligible report state.", "Use support center for bounded report questions without raw evidence dumps.", "/dashboard/reports"),
    surface("dashboard-to-billing", "Dashboard", "Billing center", "Customer has plan, entitlement, invoice, or payment-recovery context", "Open billing center for safe plan and entitlement projection.", "Use billing support path without submitting card numbers, bank details, passwords, or tokens.", "/dashboard/billing"),
    surface("dashboard-to-notifications", "Dashboard", "Notification center", "Customer needs an account, scan, report, billing, support, or security update", "Open notifications for the latest customer-owned safe projection.", "Use dashboard or support status when notifications are held or suppressed for safety.", "/dashboard/notifications"),
    surface("dashboard-to-support", "Dashboard", "Support center", "Customer needs help, correction, billing help, security concern, or plan guidance", "Choose the correct support path and submit only safe summaries.", "Track status instead of creating duplicate requests unless an update is needed.", "/dashboard/support"),
    surface("dashboard-to-plans", "Dashboard", "Plans", "Customer is ready to compare stage-fit plan options", "Review plan fit from evidence, readiness, and entitlement needs.", "Return to dashboard, Free Scan, billing, or support when plan readiness is unclear.", "/plans"),
    surface("report-vault-to-support", "Report vault", "Support center", "Customer has a report question, correction request, or release concern", "Start a bounded report question or correction path with safe summaries only.", "Keep audit proof preserved while customer-facing explanations stay calm and bounded.", "/dashboard/support"),
    surface("report-vault-to-plans", "Report vault", "Plans", "Released report indicates stage-appropriate growth or protection needs", "Compare plans only when report state is ready and recommendations are bounded.", "Return to report vault or support if the report is pending, disputed, or incomplete.", "/plans"),
    surface("billing-to-plans", "Billing center", "Plans", "Customer is comparing current plan, future entitlement, or upgrade posture", "Open plans to compare current access, pending action, and future entitlement separately.", "Use billing support when payment recovery, invoice, or entitlement state is unclear.", "/plans"),
    surface("billing-to-support", "Billing center", "Support center", "Customer needs billing help without raw payment collection", "Open billing help and submit only safe billing summaries.", "Use billing center for payment portal actions; support must not collect card numbers or bank details.", "/dashboard/support"),
    surface("notifications-to-status", "Notification center", "Support status", "A support lifecycle notification has status context", "Open support status to see received, reviewing, waiting, specialist review, resolved, or closed state.", "Use safe update only when the status asks for customer input or a bounded next step.", "/dashboard/support/status"),
    surface("support-request-to-status", "Support request", "Support status", "Support request was submitted or updated", "Track the request status before sending another submission.", "Use support center for a safe update if status shows waiting on customer or a bounded next step.", "/dashboard/support/status"),
    surface("support-status-to-safe-update", "Support status", "Support request update", "Customer has a status that allows safe follow-up", "Send a safe update only when requested or materially helpful.", "Avoid duplicate support noise; keep secrets, raw payloads, and private evidence out of updates.", "/dashboard/support/request"),
    surface("plans-to-free-scan-or-dashboard", "Plans", "Free Scan or Dashboard", "Visitor or customer needs readiness-specific next step", "Start Free Scan if not yet diagnosed, or return to dashboard when customer context exists.", "Use support or billing when plan selection depends on entitlement, payment, report, or support state.", "/free-check"),
  ],
  stateRules: [
    "Current state must distinguish unavailable, pending, ready, needs follow-up, waiting on customer, specialist review, resolved, and closed states without presenting pending state as final truth.",
    "Current state must separate verified facts, assumptions, inferences, recommendations, limitations, and next actions where reports or scan outcomes are involved.",
    "Current state must not leak account existence, cross-customer data, private report internals, security posture details, or billing provider internals.",
  ],
  safetyRules: [
    ...platformLeakageBlocks.map((item) => `Block customer handoff exposure of ${item}.`),
    "Block localStorage secrets, sessionStorage secrets, browser-stored authority, URL-carried secrets, analytics-carried secrets, and public JavaScript authority.",
    "Block fake urgency, dark-pattern conversion, guaranteed outcomes, unsupported ROI, unsupported legal promises, refund promises, report-change promises, billing-change promises, security-outcome promises, and claims that audit records are deleted when preservation is required.",
    "Use defense-in-depth, least privilege, customer ownership, safe projection, auditability, secret minimization, and reduced attack surface language instead of impossible-to-hack, never-liable, guaranteed-safe, or no-responsibility claims.",
  ],
  recoveryRules: [
    "Recovery must give a calm route back to dashboard, notifications, report vault, billing, support, status, plans, or Free Scan instead of stranding the customer.",
    "Recovery must tell customers when to wait, track status, safely update, resume, reauthenticate, verify email, or use support without creating duplicate-submission anxiety.",
    "Recovery must never ask customers to paste passwords, card numbers, bank details, private keys, session tokens, CSRF tokens, admin keys, support context keys, raw attack strings, raw evidence dumps, raw security payloads, or private report internals.",
  ],
  releaseRules: [
    "A customer surface cannot be released unless every handoff has current state, safe next action, recovery path, connected destination, privacy posture, and required guards.",
    "Route validation must fail when a handoff surface omits customer ownership, verified access where applicable, safe projection, no-store posture where applicable, or blocked leakage language.",
    "Release approval must preserve truthful/verifiable analysis, stage-aware conversion, legal/liability risk reduction, auditability, and front-to-back customer-platform synchronization.",
  ],
} as const satisfies CustomerPlatformHandoffContract;

export function getCustomerPlatformHandoffContract() {
  return CUSTOMER_PLATFORM_HANDOFF_CONTRACT;
}

function surface(
  key: CustomerPlatformHandoffSurfaceKey,
  from: string,
  to: string,
  currentState: string,
  safeNextAction: string,
  recoveryPath: string,
  connectedDestination: string,
): CustomerPlatformHandoffSurface {
  return {
    key,
    from,
    to,
    currentState,
    safeNextAction,
    recoveryPath,
    connectedDestination,
    privacyPosture:
      "Customer-owned safe projection only; no raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompt/system/developer messages, secrets, passwords, API keys, private keys, session tokens, CSRF tokens, admin keys, support context keys, or cross-customer data.",
    requiredGuards: ["current-state", "one-safe-next-action", "recovery-path", "connected-destination", "privacy-posture", "safe-projection", "no-pending-as-final", "no-fake-urgency", "no-unsupported-outcome-promise"],
    blockedPatterns: CUSTOMER_PLATFORM_HANDOFF_BLOCKED_PATTERNS,
  };
}
