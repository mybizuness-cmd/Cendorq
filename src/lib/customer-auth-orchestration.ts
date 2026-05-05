export const CUSTOMER_AUTH_METHODS = [
  {
    key: "magic-link",
    label: "Email magic link",
    priority: "primary",
    customerPromise: "Enter the email, open the link, and return straight to the dashboard without remembering a password.",
    revenueRole: "Lowest-friction return path for customers who need to continue a scan, open a report, or choose a paid plan.",
  },
  {
    key: "passkey-ready",
    label: "Passkey-ready access",
    priority: "best-future",
    customerPromise: "Use device approval later when backend passkeys are enabled.",
    revenueRole: "Fastest repeat access path for customers returning often to dashboard, reports, billing, and support.",
  },
  {
    key: "email-password-fallback",
    label: "Email and password fallback",
    priority: "fallback",
    customerPromise: "Use credentials when magic link or provider access is not available.",
    revenueRole: "Prevents lost revenue from customers who cannot access provider sign-in or email links quickly.",
  },
] as const;

export const CUSTOMER_EMAIL_ORCHESTRATION_STEPS = [
  {
    key: "verification-send",
    label: "Send verification email immediately",
    customerPromise: "The customer receives one clear confirmation message after signup or scan account capture.",
    revenueRole: "Validates inbox ownership early so reports, nudges, billing alerts, and paid next-step emails can reach the customer.",
  },
  {
    key: "verification-click",
    label: "Click confirms and redirects to dashboard",
    customerPromise: "The confirmation link opens the customer dashboard instead of sending them to another dead-end page.",
    revenueRole: "Turns verification into activation by dropping the customer into the next best action.",
  },
  {
    key: "dashboard-reentry",
    label: "Returning customers use magic link first",
    customerPromise: "The customer can return from any device by entering the same email and opening a short-lived link.",
    revenueRole: "Protects paid conversion when the customer leaves and comes back later.",
  },
  {
    key: "lifecycle-followup",
    label: "Lifecycle emails stay consent-aware",
    customerPromise: "Transactional emails continue for account, report, billing, and support while marketing follow-up respects consent and unsubscribe.",
    revenueRole: "Keeps retargeting available without damaging sender reputation or trust.",
  },
] as const;

export const CUSTOMER_EMAIL_DELIVERABILITY_STANDARD = [
  "Use Cendorq Support <support@cendorq.com> for transactional identity and keep sender naming consistent.",
  "Authenticate sending domains with SPF, DKIM, and DMARC before scaling lifecycle email volume.",
  "Separate transactional emails from marketing or retargeting sequences so unsubscribes do not block account-critical messages.",
  "Use one-click unsubscribe and suppression handling for marketing follow-up, not for required transactional account notices.",
  "Track verification sent, verification clicked, dashboard opened, magic link sent, magic link clicked, report-ready email opened, and paid-plan click events.",
  "Use bounded confirmation responses that never expose whether a different customer account exists.",
] as const;

export const CUSTOMER_EMAIL_REVENUE_SEQUENCE = [
  {
    key: "welcome-verified",
    label: "Verified welcome",
    trigger: "email confirmed",
    targetPath: "/dashboard",
    purpose: "Open dashboard and continue the scan.",
  },
  {
    key: "scan-incomplete",
    label: "Scan incomplete nudge",
    trigger: "verified account without completed Free Scan",
    targetPath: "/free-check",
    purpose: "Finish the first read so Cendorq can recommend the next paid depth.",
  },
  {
    key: "report-ready",
    label: "Report-ready nudge",
    trigger: "Free Scan or paid report ready",
    targetPath: "/dashboard/reports",
    purpose: "Bring the customer back to evidence and plan guidance.",
  },
  {
    key: "deep-review-fit",
    label: "Deep Review fit nudge",
    trigger: "scan shows unresolved cause or low-confidence direction",
    targetPath: "/plans/deep-review",
    purpose: "Move the customer from free signal to paid diagnosis.",
  },
  {
    key: "support-recovered",
    label: "Support recovered nudge",
    trigger: "support blocker resolved",
    targetPath: "/dashboard/billing",
    purpose: "Return the customer to billing or plan choice after trust is restored.",
  },
] as const;

export function getCustomerAuthOrchestration() {
  return {
    methods: CUSTOMER_AUTH_METHODS,
    emailSteps: CUSTOMER_EMAIL_ORCHESTRATION_STEPS,
    deliverability: CUSTOMER_EMAIL_DELIVERABILITY_STANDARD,
    revenueSequence: CUSTOMER_EMAIL_REVENUE_SEQUENCE,
  };
}
