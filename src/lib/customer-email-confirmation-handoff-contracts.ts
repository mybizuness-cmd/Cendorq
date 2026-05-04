export const CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT = {
  id: "customer-email-confirmation-handoff-contract",
  name: "Cendorq Customer Email Confirmation and Report Access Handoff Contract",
  senderIdentity: {
    fromName: "Cendorq Support",
    fromEmail: "support@cendorq.com",
    display: "Cendorq Support <support@cendorq.com>",
    checkInboxInstruction:
      "Check your inbox for an email from Cendorq Support <support@cendorq.com>. If you do not see it, check spam or promotions once and save support@cendorq.com as a trusted sender.",
  },
  recommendedSubjects: [
    {
      key: "free-scan-results",
      subject: "Confirm your email to open your Cendorq results",
      preheader: "Your private dashboard is ready after this one-time confirmation.",
      useWhen: "Free Scan intake has been submitted and report visibility is gated by email verification.",
    },
    {
      key: "dashboard-access",
      subject: "Confirm your email and enter your Cendorq command center",
      preheader: "One secure step opens your private dashboard and keeps future updates easier to find.",
      useWhen: "The customer needs account verification before accessing the dashboard, report vault, billing, support, or plan state.",
    },
    {
      key: "paid-plan-access",
      subject: "Confirm your email to continue your Cendorq plan",
      preheader: "Your plan workspace, status, and next actions are waiting in your private dashboard.",
      useWhen: "Deep Review, Build Fix, or Ongoing Control intake or purchase requires verification before protected plan access.",
    },
  ],
  purpose:
    "Create the highest-converting verify-to-view flow for Free Scan and paid-plan customers: the customer confirms the signup email, strengthens future email engagement, and is routed back into the exact private dashboard, report vault, or plan state they earned without showing protected results before verification.",
  operatingStandard: [
    "Use verification as a trust and access step, not as a dark pattern.",
    "After Free Scan or paid intake submission, show a calm check-your-inbox gate that names Cendorq Support <support@cendorq.com> instead of revealing protected report results before email verification.",
    "The primary confirmation CTA should combine the customer value and the security action: Confirm email and open your results.",
    "The confirmation click should verify the email server-side, consume the verification token once, mark inbox confirmation progress where appropriate, and route the customer to the correct protected dashboard destination.",
    "The confirmation flow should improve future email engagement through real customer interaction, but must never promise provider-level inbox placement or provider-level deliverability control.",
    "Report email attachments may be sent after verification and release rules allow them, but the dashboard/report vault remains the canonical protected place to view current report state, next actions, and plan-fit guidance.",
  ],
  primaryCta: {
    label: "Confirm email and open your results",
    fallbackLabel: "Confirm email and open your dashboard",
    purpose:
      "Tie the customer's natural motivation to see scan or plan results to the required safety step of verifying the signup email.",
    allowedDestinations: ["/dashboard", "/dashboard/reports", "/dashboard/notifications", "/free-check"],
  },
  journeyDestinations: [
    {
      key: "free-scan-submitted",
      customerMoment: "Customer submits Free Scan intake for the first time.",
      preVerificationScreen:
        "Check your inbox for Cendorq Support <support@cendorq.com>. Confirm your email to unlock your Free Scan result inside your Cendorq dashboard.",
      emailSubjectKey: "free-scan-results",
      emailCta: "Confirm email and open your Free Scan results",
      verifiedDestination: "/dashboard/reports",
      dashboardModule: "report vault plus action inbox",
      reportVisibilityRule:
        "Do not show Free Scan findings before email verification and safe release state. After verification, show the report state in the dashboard/report vault and send the report email when release rules allow.",
    },
    {
      key: "deep-review-purchased-or-submitted",
      customerMoment: "Customer buys or submits Deep Review intake.",
      preVerificationScreen:
        "Check your inbox for Cendorq Support <support@cendorq.com>. Confirm your email so Cendorq can protect your diagnostic report, send status updates, and open your command center.",
      emailSubjectKey: "paid-plan-access",
      emailCta: "Confirm email and open your Deep Review dashboard",
      verifiedDestination: "/dashboard/reports",
      dashboardModule: "report vault plus plan-scope guidance",
      reportVisibilityRule: "Show pending diagnostic status until the Deep Review is released. Do not present pending analysis as final truth.",
    },
    {
      key: "build-fix-purchased-or-submitted",
      customerMoment: "Customer buys or submits Build Fix / Optimization intake.",
      preVerificationScreen:
        "Check your inbox for Cendorq Support <support@cendorq.com>. Confirm your email so optimization scope, approvals, and delivery notes stay connected to your command center.",
      emailSubjectKey: "paid-plan-access",
      emailCta: "Confirm email and open your Optimization workspace",
      verifiedDestination: "/dashboard",
      dashboardModule: "action inbox plus billing and support handoff",
      reportVisibilityRule:
        "Show optimization scope, required approvals, and delivery status without exposing a standalone Deep Review report unless Deep Review entitlement exists.",
    },
    {
      key: "ongoing-control-started",
      customerMoment: "Customer starts Ongoing Control / Monthly.",
      preVerificationScreen:
        "Check your inbox for Cendorq Support <support@cendorq.com>. Confirm your email so monthly command summaries, change alerts, and approval requests can reach you safely.",
      emailSubjectKey: "paid-plan-access",
      emailCta: "Confirm email and open your Monthly command center",
      verifiedDestination: "/dashboard/notifications",
      dashboardModule: "dashboard action inbox plus notification center",
      reportVisibilityRule: "Show monthly status and approved-scope summaries without delivering unpaid Build Fix or standalone Deep Review artifacts.",
    },
    {
      key: "support-or-billing-entry",
      customerMoment: "Customer enters through support, billing, or account recovery.",
      preVerificationScreen:
        "Check your inbox for Cendorq Support <support@cendorq.com>. Confirm your email so Cendorq can route you back to the right private account area.",
      emailSubjectKey: "dashboard-access",
      emailCta: "Confirm email and return to your dashboard",
      verifiedDestination: "/dashboard",
      dashboardModule: "support, billing, or status recovery path",
      reportVisibilityRule: "Only show customer-owned safe projections. Do not reveal account existence or protected records before safe verification.",
    },
  ],
  dashboardDisplayRules: [
    "The customer command center is the canonical protected place to display current report state, report vault entries, next actions, plan scope, support status, and billing handoffs.",
    "Free Scan results should be available inside the dashboard/report vault after verification and safe release state, with email used as a delivery and return channel.",
    "Full reports should have dedicated report-vault views for readability, evidence separation, visual sections, downloadable assets when allowed, and next-step conversion guidance.",
    "The dashboard should summarize the report and route into the dedicated report view rather than cramming every report detail into the dashboard home.",
    "Each report view should preserve the command-center feeling by showing the report, what it means, what is included, what is not included, confidence/limitations, and the next best plan when evidence supports it.",
  ],
  tokenAndSecurityRules: [
    "Verification tokens must be single-use, short-lived, server-validated, and never stored in localStorage or sessionStorage.",
    "Do not expose verification tokens, session tokens, CSRF tokens, admin keys, support context keys, or provider payloads in dashboard copy, report copy, analytics, or client-readable storage.",
    "After token consumption, issue the safe customer session through secure httpOnly cookies or the approved auth provider flow.",
    "If verification fails or expires, use a safe resend flow without revealing whether another account exists.",
    "Redirect only to allowlisted customer destinations and never to arbitrary URLs.",
  ],
  emailDeliverabilityRules: [
    "The verification email should be transactional, plain, recognizable, low-link-density, and sent from Cendorq Support <support@cendorq.com> using the approved sender identity.",
    "The check-your-inbox screen must name support@cendorq.com so the customer knows exactly which sender to find and trust.",
    "Ask the customer to move Cendorq to the main inbox or save the sender only as a helpful instruction, not as a guarantee.",
    "The verification click should count as engagement and help future Cendorq emails be easier to find, but copy must not claim promised placement.",
    "Lifecycle and follow-up emails to the signup address remain active after dashboard action inbox setup; dashboard inbox supplements email and does not replace it.",
  ],
  blockedPatterns: [
    "showReportBeforeEmailVerification",
    "emailVerificationDarkPattern",
    "verificationWithoutSenderIdentity",
    "verificationWithoutReportDestination",
    "verificationWithoutDashboardReturn",
    "verificationTokenInLocalStorage",
    "verificationTokenInSessionStorage",
    "arbitraryRedirectAfterVerification",
    "accountExistenceLeakage",
    "reportAttachmentBeforeSafeRelease",
    "pendingReportPresentedAsFinal",
    "dashboardInboxReplacesEmailOrchestration",
    "promisedInboxPlacement",
    "promisedDeliverability",
    "rawPayloadBeforeVerification",
    "rawEvidenceBeforeVerification",
    "rawBillingDataBeforeVerification",
    "internalNotesBeforeVerification",
    "operatorIdentityBeforeVerification",
    "riskInternalsBeforeVerification",
    "secretBeforeVerification",
    "sessionTokenBeforeVerification",
    "csrfTokenBeforeVerification",
    "adminKeyBeforeVerification",
    "supportContextKeyBeforeVerification",
    "unsupportedOutcomePromise",
    "fakeUrgencyVerification",
  ],
  releaseRules: [
    "Every intake completion path must define a pre-verification screen, verification email CTA, sender identity, verified destination, dashboard module, and report visibility rule.",
    "Every report display path must keep dashboard summary, report-vault detail, email delivery, and plan next step synchronized.",
    "Every confirmation email must route to the customer-owned dashboard destination after verification, not to a generic dead end.",
    "Release-captain review must reject verification flows that reveal protected results before verification, omit support@cendorq.com from the check-your-inbox instruction, or replace lifecycle email orchestration with dashboard-only messaging.",
  ],
} as const;

export function getCustomerEmailConfirmationHandoffContract() {
  return CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT;
}
