export type ReportVaultVerifyToViewStatus = "verification-required" | "verified-report-vault-ready" | "pending-release" | "safe-recovery";

export type ReportVaultVerifyToViewInput = {
  emailVerified: boolean;
  customerOwned: boolean;
  reportReleaseApproved: boolean;
  reportStatus: "pending" | "draft" | "approved" | "released" | "correction-requested" | "unavailable";
  requestedDestination?: string | null;
};

export type ReportVaultVerifyToViewProjection = {
  ok: boolean;
  status: ReportVaultVerifyToViewStatus;
  verifiedDestination: "/dashboard/reports";
  dashboardModule: "report vault";
  customerMessage: string;
  safeNextAction: string;
  reportVisibilityRule: string;
  pendingReportPresentedAsFinal: false;
  emailVerificationRequiredBeforeProtectedResults: boolean;
  customerOwnershipRequired: true;
  safeReleaseRequired: true;
  rawPayloadExposed: false;
  rawEvidenceExposed: false;
  rawBillingDataExposed: false;
  internalNotesExposed: false;
  operatorIdentityExposed: false;
  riskInternalsExposed: false;
  promptExposed: false;
  secretExposed: false;
  tokenExposed: false;
  arbitraryRedirectAllowed: false;
  unsupportedOutcomePromise: false;
};

export const REPORT_VAULT_VERIFY_TO_VIEW_RULES = [
  "verified email unlock routes for Free Scan and Deep Review must land in /dashboard/reports",
  "the report vault is the canonical protected place for report state, limitations, confidence labels, and next actions",
  "pending, draft, unavailable, or correction-requested reports must not be presented as final truth",
  "released report views must preserve verified facts, assumptions, inferences, recommendations, limitations, and next actions",
  "report vault verify-to-view output must use customer-owned safe projections only",
  "report vault verify-to-view output must not expose private payloads, evidence, billing material, internal notes, operator identities, risk internals, prompts, secrets, tokens, or arbitrary redirects",
  "report vault copy must convert through clarity and plan-fit education, not fake urgency or unsupported promises",
] as const;

export function projectReportVaultVerifyToViewIntegration(input: ReportVaultVerifyToViewInput): ReportVaultVerifyToViewProjection {
  const customerOwned = input.customerOwned === true;
  const emailVerified = input.emailVerified === true;
  const reportReleased = input.reportReleaseApproved === true && (input.reportStatus === "approved" || input.reportStatus === "released");
  const destination = "/dashboard/reports" as const;

  if (!customerOwned) {
    return buildProjection({
      ok: false,
      status: "safe-recovery",
      destination,
      customerMessage: "Cendorq could not confirm this report vault access path safely.",
      safeNextAction: "Return to your dashboard or support center for a safe recovery path.",
      reportVisibilityRule: "Only customer-owned safe report projections can be shown in the report vault.",
      emailVerificationRequiredBeforeProtectedResults: true,
    });
  }

  if (!emailVerified) {
    return buildProjection({
      ok: false,
      status: "verification-required",
      destination,
      customerMessage: "Confirm your email to open your protected Cendorq report vault.",
      safeNextAction: "Use the confirmation email from Cendorq Support support@cendorq.com, then return to your report vault.",
      reportVisibilityRule: "Protected report findings stay hidden until email verification succeeds.",
      emailVerificationRequiredBeforeProtectedResults: true,
    });
  }

  if (!reportReleased) {
    return buildProjection({
      ok: true,
      status: "pending-release",
      destination,
      customerMessage: "Your report vault is open, and this report is still pending safe release.",
      safeNextAction: "Review report status, limitations, and next available actions without treating pending work as final.",
      reportVisibilityRule: "Show report status and plan-fit guidance, but do not present pending or draft analysis as final truth.",
      emailVerificationRequiredBeforeProtectedResults: false,
    });
  }

  return buildProjection({
    ok: true,
    status: "verified-report-vault-ready",
    destination,
    customerMessage: "Your protected report vault is ready.",
    safeNextAction: "Open approved findings, limitations, confidence labels, and the next evidence-supported action.",
    reportVisibilityRule: "Approved report content may be shown as a customer-owned safe projection with limitations and next actions visible.",
    emailVerificationRequiredBeforeProtectedResults: false,
  });
}

export function getReportVaultVerifyToViewIntegrationRules() {
  return REPORT_VAULT_VERIFY_TO_VIEW_RULES;
}

function buildProjection({
  ok,
  status,
  destination,
  customerMessage,
  safeNextAction,
  reportVisibilityRule,
  emailVerificationRequiredBeforeProtectedResults,
}: {
  ok: boolean;
  status: ReportVaultVerifyToViewStatus;
  destination: "/dashboard/reports";
  customerMessage: string;
  safeNextAction: string;
  reportVisibilityRule: string;
  emailVerificationRequiredBeforeProtectedResults: boolean;
}): ReportVaultVerifyToViewProjection {
  return {
    ok,
    status,
    verifiedDestination: destination,
    dashboardModule: "report vault",
    customerMessage,
    safeNextAction,
    reportVisibilityRule,
    pendingReportPresentedAsFinal: false,
    emailVerificationRequiredBeforeProtectedResults,
    customerOwnershipRequired: true,
    safeReleaseRequired: true,
    rawPayloadExposed: false,
    rawEvidenceExposed: false,
    rawBillingDataExposed: false,
    internalNotesExposed: false,
    operatorIdentityExposed: false,
    riskInternalsExposed: false,
    promptExposed: false,
    secretExposed: false,
    tokenExposed: false,
    arbitraryRedirectAllowed: false,
    unsupportedOutcomePromise: false,
  };
}
