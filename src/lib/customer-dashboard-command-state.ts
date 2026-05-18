export type CustomerDashboardStage =
  | "account-created"
  | "free-scan-needed"
  | "free-scan-in-progress"
  | "free-scan-submitted"
  | "free-scan-result-ready"
  | "review-ready"
  | "repair-ready"
  | "control-ready";

export type CustomerDashboardNextActionKey =
  | "confirm-email"
  | "start-free-scan"
  | "continue-free-scan"
  | "open-free-scan-result"
  | "open-report-vault"
  | "review-billing"
  | "open-support-status"
  | "open-notifications"
  | "compare-plans";

export type CustomerDashboardCommandStateInput = {
  customerSessionVerified: boolean;
  emailVerified: boolean;
  hasFreeScanDraft?: boolean;
  hasSubmittedFreeScan?: boolean;
  freeScanResultReady?: boolean;
  reportReady?: boolean;
  unreadNotifications?: number;
  openSupportItems?: number;
  billingNeedsAttention?: boolean;
  activePlan?: "free-scan" | "deep-review" | "build-fix" | "ongoing-control" | "none";
};

export type CustomerDashboardCommandState = {
  ok: boolean;
  commandMode: "customer-safe-dashboard-projection";
  stage: CustomerDashboardStage;
  nextAction: {
    key: CustomerDashboardNextActionKey;
    label: string;
    href:
      | "/login"
      | "/verify-email"
      | "/free-check"
      | "/dashboard/reports/free-scan"
      | "/dashboard/reports"
      | "/dashboard/billing"
      | "/dashboard/support/status"
      | "/dashboard/notifications"
      | "/plans";
    reason: string;
  };
  dashboardModules: {
    reports: "hidden" | "available" | "ready";
    billing: "available" | "attention-needed";
    support: "available" | "open-items";
    notifications: "empty" | "unread";
  };
  customerSafeBoundaries: {
    rawEmailReturned: false;
    rawSessionReturned: false;
    rawReportReturned: false;
    rawEvidenceReturned: false;
    rawBillingProviderPayloadReturned: false;
    internalNotesReturned: false;
    unsupportedGuaranteesReturned: false;
  };
};

export const CUSTOMER_DASHBOARD_COMMAND_STATE_STANDARD = [
  "Dashboard state must be computed from safe customer-owned projections, not raw provider payloads.",
  "Dashboard next action must choose one clear action before showing secondary options.",
  "Email verification comes before protected customer value.",
  "Free Scan draft, submitted state, and result-ready state must be separated.",
  "Reports, billing, support, and notifications must remain visible as modules without leaking raw records.",
  "Billing attention must not imply payment failure details unless the billing provider state is approved for display.",
  "Support status must show customer-safe status, not operator notes or internal triage data.",
  "Notifications must show unread state without exposing private report internals.",
  "Dashboard command state must never return raw email, raw sessions, raw reports, raw evidence, raw billing provider payloads, internal notes, or guaranteed outcomes.",
] as const;

export function projectCustomerDashboardCommandState(input: CustomerDashboardCommandStateInput): CustomerDashboardCommandState {
  if (!input.customerSessionVerified) {
    return buildState(input, "account-created", "confirm-email", "Confirm account", "/login", "Customer session must be verified before protected dashboard value is shown.");
  }

  if (!input.emailVerified) {
    return buildState(input, "account-created", "confirm-email", "Confirm email", "/verify-email", "Email verification is required before reports, billing, support, and protected results become available.");
  }

  if (input.unreadNotifications && input.unreadNotifications > 0) {
    return buildState(input, resolveStage(input), "open-notifications", "Open notifications", "/dashboard/notifications", "There are customer-safe updates that need attention.");
  }

  if (input.openSupportItems && input.openSupportItems > 0) {
    return buildState(input, resolveStage(input), "open-support-status", "Open support status", "/dashboard/support/status", "Support has an open customer-safe status update.");
  }

  if (input.billingNeedsAttention) {
    return buildState(input, resolveStage(input), "review-billing", "Review billing", "/dashboard/billing", "Billing or entitlement state needs customer attention.");
  }

  if (input.reportReady) {
    return buildState(input, resolveStage(input), "open-report-vault", "Open report vault", "/dashboard/reports", "A customer-safe report is ready or available to review.");
  }

  if (input.freeScanResultReady) {
    return buildState(input, "free-scan-result-ready", "open-free-scan-result", "Open Free Scan result", "/dashboard/reports/free-scan", "The Free Scan result is ready in the protected account dashboard.");
  }

  if (input.hasSubmittedFreeScan) {
    return buildState(input, "free-scan-submitted", "open-free-scan-result", "Check Free Scan result", "/dashboard/reports/free-scan", "The Free Scan was submitted and should route to protected result status.");
  }

  if (input.hasFreeScanDraft) {
    return buildState(input, "free-scan-in-progress", "continue-free-scan", "Continue Free Scan", "/free-check", "Saved Free Scan progress exists.");
  }

  return buildState(input, "free-scan-needed", "start-free-scan", "Start Free Scan", "/free-check", "Cendorq needs business context before deeper guidance is useful.");
}

function resolveStage(input: CustomerDashboardCommandStateInput): CustomerDashboardStage {
  if (input.activePlan === "ongoing-control") return "control-ready";
  if (input.activePlan === "build-fix") return "repair-ready";
  if (input.activePlan === "deep-review") return "review-ready";
  if (input.freeScanResultReady) return "free-scan-result-ready";
  if (input.hasSubmittedFreeScan) return "free-scan-submitted";
  if (input.hasFreeScanDraft) return "free-scan-in-progress";
  return "free-scan-needed";
}

function buildState(
  input: CustomerDashboardCommandStateInput,
  stage: CustomerDashboardStage,
  key: CustomerDashboardNextActionKey,
  label: CustomerDashboardCommandState["nextAction"]["label"],
  href: CustomerDashboardCommandState["nextAction"]["href"],
  reason: string,
): CustomerDashboardCommandState {
  return {
    ok: input.customerSessionVerified,
    commandMode: "customer-safe-dashboard-projection",
    stage,
    nextAction: { key, label, href, reason },
    dashboardModules: {
      reports: input.reportReady ? "ready" : input.freeScanResultReady || input.hasSubmittedFreeScan ? "available" : "hidden",
      billing: input.billingNeedsAttention ? "attention-needed" : "available",
      support: input.openSupportItems && input.openSupportItems > 0 ? "open-items" : "available",
      notifications: input.unreadNotifications && input.unreadNotifications > 0 ? "unread" : "empty",
    },
    customerSafeBoundaries: {
      rawEmailReturned: false,
      rawSessionReturned: false,
      rawReportReturned: false,
      rawEvidenceReturned: false,
      rawBillingProviderPayloadReturned: false,
      internalNotesReturned: false,
      unsupportedGuaranteesReturned: false,
    },
  };
}
