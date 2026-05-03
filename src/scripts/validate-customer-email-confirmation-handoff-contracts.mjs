import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/customer-email-confirmation-handoff-contracts.ts";
const welcomePath = "src/lib/verified-welcome-email-contracts.ts";
const ownerManualPath = "docs/owner-operating-manual.md";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const packagePath = "package.json";
const failures = [];

expect(contractPath, [
  "CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT",
  "Cendorq Customer Email Confirmation and Report Access Handoff Contract",
  "getCustomerEmailConfirmationHandoffContract",
  "verify-to-view flow",
  "confirms the signup email",
  "without showing protected results before verification",
  "senderIdentity",
  "Cendorq Support",
  "support@cendorq.com",
  "Cendorq Support <support@cendorq.com>",
  "Check your inbox for an email from Cendorq Support <support@cendorq.com>.",
  "check spam or promotions once",
  "move Cendorq to your main inbox",
  "save support@cendorq.com as a trusted sender",
  "Confirm your email to open your Cendorq results",
  "Confirm your email and enter your Cendorq command center",
  "Confirm your email to continue your Cendorq plan",
  "Your private dashboard is ready after this one-time confirmation.",
]);

expect(contractPath, [
  "Use verification as a trust and access step, not as a dark pattern.",
  "Confirm email and open your results",
  "verify the email server-side",
  "consume the verification token once",
  "route the customer to the correct protected dashboard destination",
  "must never promise guaranteed inbox placement or provider-level deliverability control",
  "Do not show Free Scan findings before email verification and safe release state.",
  "Do not reveal account existence or protected records before safe verification.",
  "The customer command center is the canonical protected place to display current report state, report vault entries, next actions, plan scope, support status, and billing handoffs.",
  "Verification tokens must be single-use, short-lived, server-validated, and never stored in localStorage or sessionStorage.",
  "Redirect only to allowlisted customer destinations and never to arbitrary URLs.",
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

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);
expect(ownerMaximumProtectionValidatorPath, ["Owner maximum protection posture validation passed", "docs/owner-maximum-protection-posture.md", "validate:routes"]);
expect(packagePath, ["validate:routes", "validate-customer-email-confirmation-handoff-contracts.mjs", "validate-owner-maximum-protection-posture.mjs"]);

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

expect(routesChainPath, ["src/scripts/validate-customer-email-confirmation-handoff-contracts.mjs"]);

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
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Customer email confirmation handoff contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email confirmation handoff contracts validation passed with owner posture and package wiring coverage.");

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
