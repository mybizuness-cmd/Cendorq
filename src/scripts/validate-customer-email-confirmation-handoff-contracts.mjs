import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/customer-email-confirmation-handoff-contracts.ts";
const welcomePath = "src/lib/verified-welcome-email-contracts.ts";
const ownerManualPath = "docs/owner-operating-manual.md";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(contractPath, [
  "CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT",
  "Cendorq Customer Email Confirmation and Report Access Handoff Contract",
  "getCustomerEmailConfirmationHandoffContract",
  "verify-to-view flow",
  "confirms the signup email",
  "routed back into the exact private dashboard, report vault, or plan state they earned",
  "without showing protected results before verification",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(contractPath, [
  "senderIdentity",
  "Cendorq Support",
  "support@cendorq.com",
  "Cendorq Support <support@cendorq.com>",
  "Check your inbox for an email from Cendorq Support <support@cendorq.com>.",
  "check spam or promotions once",
  "move Cendorq to your main inbox",
  "save support@cendorq.com as a trusted sender",
]);

expect(contractPath, [
  "recommendedSubjects",
  "free-scan-results",
  "dashboard-access",
  "paid-plan-access",
  "Confirm your email to open your Cendorq results",
  "Confirm your email and enter your Cendorq command center",
  "Confirm your email to continue your Cendorq plan",
  "Your private dashboard is ready after this one-time confirmation.",
]);

expect(contractPath, [
  "Use verification as a trust and access step, not as a dark pattern.",
  "After Free Scan or paid intake submission, show a calm check-your-inbox gate that names Cendorq Support <support@cendorq.com> instead of revealing protected report results before email verification.",
  "The check-your-inbox gate should include a gentle fallback: if the email is not visible, check spam or promotions once, then move Cendorq to the main inbox or save support@cendorq.com as a trusted sender.",
  "Confirm email and open your results",
  "verify the email server-side",
  "consume the verification token once",
  "route the customer to the correct protected dashboard destination",
  "must never promise guaranteed inbox placement or provider-level deliverability control",
]);

expect(contractPath, [
  "free-scan-submitted",
  "deep-review-purchased-or-submitted",
  "build-fix-purchased-or-submitted",
  "ongoing-control-started",
  "support-or-billing-entry",
  "Confirm email and open your Free Scan results",
  "Confirm email and open your Deep Review dashboard",
  "Confirm email and open your Optimization workspace",
  "Confirm email and open your Monthly command center",
  "Confirm email and return to your dashboard",
]);

expect(contractPath, [
  "Do not show Free Scan findings before email verification and safe release state.",
  "After verification, show the report state in the dashboard/report vault and send the report email when release rules allow.",
  "Show pending diagnostic status until the Deep Review is released. Do not present pending analysis as final truth.",
  "without exposing a standalone Deep Review report unless Deep Review entitlement exists",
  "without delivering unpaid Build Fix or standalone Deep Review artifacts",
  "Do not reveal account existence or protected records before safe verification.",
]);

expect(contractPath, [
  "The customer command center is the canonical protected place to display current report state, report vault entries, next actions, plan scope, support status, and billing handoffs.",
  "Free Scan results should be available inside the dashboard/report vault after verification and safe release state, with email used as a delivery and return channel.",
  "Full reports should have dedicated report-vault views for readability, evidence separation, visual sections, downloadable assets when allowed, and next-step conversion guidance.",
  "The dashboard should summarize the report and route into the dedicated report view rather than cramming every report detail into the dashboard home.",
  "Each report view should preserve the command-center feeling",
]);

expect(contractPath, [
  "Verification tokens must be single-use, short-lived, server-validated, and never stored in localStorage or sessionStorage.",
  "After token consumption, issue the safe customer session through secure httpOnly cookies or the approved auth provider flow.",
  "If verification fails or expires, use a safe resend flow without revealing whether another account exists.",
  "Redirect only to allowlisted customer destinations and never to arbitrary URLs.",
]);

expect(contractPath, [
  "The verification email should be transactional, plain, recognizable, low-link-density, and sent from Cendorq Support <support@cendorq.com> using the approved sender identity.",
  "The check-your-inbox screen must name support@cendorq.com so the customer knows exactly which sender to find and trust.",
  "If the customer does not see the email, tell them to check spam or promotions once, then move Cendorq to the main inbox or save support@cendorq.com as a trusted sender.",
  "Lifecycle and follow-up emails to the signup address remain active after dashboard action inbox setup; dashboard inbox supplements email and does not replace it.",
]);

expect(contractPath, [
  "showReportBeforeEmailVerification",
  "emailVerificationDarkPattern",
  "verificationWithoutSenderIdentity",
  "verificationWithoutSpamPromotionsFallback",
  "verificationWithoutReportDestination",
  "verificationWithoutDashboardReturn",
  "verificationTokenInLocalStorage",
  "verificationTokenInSessionStorage",
  "arbitraryRedirectAfterVerification",
  "accountExistenceLeakage",
  "reportAttachmentBeforeSafeRelease",
  "pendingReportPresentedAsFinal",
  "dashboardInboxReplacesEmailOrchestration",
  "guaranteedInboxPlacement",
  "guaranteedDeliverability",
]);

expect(contractPath, [
  "Every intake completion path must define a pre-verification screen, verification email CTA, sender identity, spam/promotions fallback, verified destination, dashboard module, and report visibility rule.",
  "Every report display path must keep dashboard summary, report-vault detail, email delivery, and plan next step synchronized.",
  "Every confirmation email must route to the customer-owned dashboard destination after verification, not to a generic dead end.",
  "Release-captain review must reject verification flows that reveal protected results before verification, omit support@cendorq.com from the check-your-inbox instruction, omit spam/promotions fallback guidance, or replace lifecycle email orchestration with dashboard-only messaging.",
]);

expect(welcomePath, [
  "VERIFIED_WELCOME_EMAIL_CONTRACT",
  "Confirm this inbox",
  "Cendorq sends important report, billing, support, and plan-status messages from the approved sender identity",
]);

expect(ownerManualPath, [
  "verify-to-view",
  "Cendorq Support <support@cendorq.com>",
  "Confirm email and open your results",
  "dashboard/report vault",
  "check spam/promotions once",
]);

expect(routesChainPath, [
  "src/scripts/validate-customer-email-confirmation-handoff-contracts.mjs",
]);

forbidden(contractPath, [
  "show protected results before verification",
  "skip email verification for reports",
  "verification token in localStorage",
  "verification token in sessionStorage",
  "guaranteed inbox placement",
  "guaranteed deliverability",
  "guaranteed primary inbox",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency is allowed",
  "raw payloads are allowed before verification",
  "raw evidence is allowed before verification",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Customer email confirmation handoff contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email confirmation handoff contracts validation passed with owner posture coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
