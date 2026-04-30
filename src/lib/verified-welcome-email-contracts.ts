export const VERIFIED_WELCOME_EMAIL_CONTRACT = {
  id: "verified-welcome-email-contract",
  templateKey: "welcome-verified",
  sender: "Cendorq Support <support@cendorq.com>",
  purpose:
    "Send exactly one welcome email after verified account creation so the customer reaches the dashboard, Free Scan, notifications, report vault, billing, plans, and support without unsafe promises or duplicate noise.",
  sendWhen: [
    "customer account exists server-side",
    "email verified flag is true",
    "welcome sent flag is false",
    "account is not locked or disabled",
    "safe customer projection is ready",
    "dashboard route is available",
  ],
  suppressWhen: [
    "welcome sent flag is true",
    "email verified flag is false",
    "verification token is pending, expired, invalid, consumed, or mismatched",
    "account is locked or disabled",
    "customer id mapping is missing",
    "dashboard route is unavailable",
    "suppression key blocks transactional welcome",
  ],
  requiredPersonalization: [
    "customer first name when available",
    "business name when available",
    "dashboard path",
    "Free Scan path",
    "support contact",
  ],
  requiredCtas: [
    { label: "Open dashboard", path: "/dashboard" },
    { label: "Start Free Scan", path: "/free-check" },
  ],
  requiredTrustElements: [
    "dashboard is private",
    "Free Scan is the first guided step",
    "notifications and report vault will show status",
    "support center is available for safe questions",
    "billing and plans remain separate from support-message payment collection",
  ],
  requiredAuditEvents: [
    "welcome-email-evaluated",
    "welcome-email-sent",
    "welcome-email-suppressed",
    "welcome-email-delivery-failed",
  ],
  postSendState: [
    "set welcome sent flag true only after accepted provider send result",
    "store provider message id hash when available",
    "store sent timestamp",
    "store template version",
    "store audit reason",
  ],
  safeCopyRules: [
    "Use calm luxury onboarding language, not fake urgency.",
    "Explain that dashboard, notifications, and report vault keep the customer journey connected.",
    "Do not imply the Free Scan is final analysis before submission and release state exist.",
    "Do not promise ROI, revenue, legal outcomes, refund outcomes, billing changes, security outcomes, or report changes.",
    "Do not include raw provider payloads, raw customer payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, passwords, API keys, private keys, session tokens, CSRF tokens, admin keys, or support context keys.",
  ],
} as const;

export const VERIFIED_WELCOME_EMAIL_BLOCKED_PATTERNS = [
  "welcomeEmailDuplicate",
  "welcomeEmailBeforeVerification",
  "welcomeEmailWithoutDashboardPath",
  "welcomeEmailWithoutFreeScanPath",
  "welcomeEmailWithoutAuditEvent",
  "welcomeSentFlagBeforeProviderAcceptance",
  "rawProviderPayloadInEmail",
  "rawCustomerPayloadInEmail",
  "rawEvidenceInEmail",
  "rawBillingDataInEmail",
  "internalNotesInEmail",
  "operatorIdentityInEmail",
  "riskInternalsInEmail",
  "attackerDetailsInEmail",
  "promptInEmail",
  "secretInEmail",
  "sessionTokenInEmail",
  "csrfTokenInEmail",
  "adminKeyInEmail",
  "supportContextKeyInEmail",
  "guaranteedOutcomeEmail",
  "guaranteedRoiEmail",
  "fakeUrgencyEmail",
] as const;

export function getVerifiedWelcomeEmailContract() {
  return VERIFIED_WELCOME_EMAIL_CONTRACT;
}
