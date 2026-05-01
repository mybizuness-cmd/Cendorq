import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/verified-welcome-email-contracts.ts";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-verified-welcome-email-contracts.mjs";
const failures = [];

expect(contractPath, [
  "VERIFIED_WELCOME_EMAIL_CONTRACT",
  "VERIFIED_WELCOME_EMAIL_BLOCKED_PATTERNS",
  "welcome-verified",
  "Cendorq Support <support@cendorq.com>",
  "Send exactly one welcome and inbox-confirmation email after verified account creation",
  "every free or paid customer",
  "email verified flag is true",
  "welcome sent flag is false",
  "inbox confirmation sent flag is false",
  "safe customer projection is ready",
  "dashboard route is available",
]);

expect(contractPath, [
  "planCoverage",
  "Applies once to every customer identity across Free Scan, Deep Review, Build Fix, Ongoing Control, direct purchase, linear purchase, late add-on, and support-only entry paths.",
  "Do not require a second inbox confirmation when the customer later buys another plan.",
  "inboxPlacementStandard",
  "Treat first verified welcome as the one-time inbox confirmation handshake for every customer, free or paid.",
  "Optimize for primary inbox delivery with authenticated sender identity, plain trustworthy copy, clear customer-recognized purpose, low-link density, no hype, no fake urgency, and no promotional overload.",
  "Ask the customer once to confirm they can receive Cendorq messages",
  "Never promise guaranteed inbox placement because mailbox providers and customer settings are outside Cendorq's absolute control.",
  "Use in-app dashboard reminders if the first inbox confirmation is not completed, but do not create repeated email confirmation loops.",
]);

expect(contractPath, [
  "welcome sent flag is true",
  "inbox confirmation sent flag is true",
  "email verified flag is false",
  "verification token is pending, expired, invalid, consumed, or mismatched",
  "account is locked or disabled",
  "customer id mapping is missing",
  "suppression key blocks transactional welcome",
]);

expect(contractPath, [
  "Open dashboard",
  "/dashboard",
  "Confirm this inbox",
  "/dashboard/notifications",
  "Start Free Scan",
  "/free-check",
  "dashboard is private",
  "notifications and report vault will show status",
  "support center is available for safe questions",
  "billing and plans remain separate from support-message payment collection",
  "Cendorq sends important report, billing, support, and plan-status messages from the approved sender identity",
]);

expect(contractPath, [
  "welcome-email-evaluated",
  "welcome-email-sent",
  "welcome-email-suppressed",
  "welcome-email-delivery-failed",
  "inbox-confirmation-evaluated",
  "inbox-confirmation-sent",
  "inbox-confirmation-completed",
  "inbox-confirmation-suppressed",
  "set welcome sent flag true only after accepted provider send result",
  "set inbox confirmation sent flag true only after accepted provider send result",
  "set inbox confirmation completed flag true only after customer confirmation signal or dashboard confirmation action",
  "store provider message id hash when available",
  "store sent timestamp",
  "store template version",
  "store audit reason",
  "store plan at first confirmation without exposing raw plan provider payload",
]);

expect(contractPath, [
  "Explain that confirming this inbox helps future report, billing, support, and plan-status messages arrive where the customer can see them.",
  "If needed, ask the customer to move the message to the main inbox or save Cendorq Support as a trusted sender, without claiming provider-level inbox placement control.",
  "Do not promise ROI, revenue, legal outcomes, refund outcomes, billing changes, security outcomes, report changes, inbox placement, or deliverability outcomes.",
  "raw provider payloads",
  "raw customer payloads",
  "raw evidence",
  "raw security payloads",
  "raw billing data",
  "internal notes",
  "operator identities",
  "risk-scoring internals",
  "attacker details",
  "prompts",
  "secrets",
  "session tokens",
  "CSRF tokens",
  "admin keys",
  "support context keys",
]);

expect(contractPath, [
  "welcomeEmailDuplicate",
  "welcomeEmailBeforeVerification",
  "welcomeEmailWithoutDashboardPath",
  "welcomeEmailWithoutFreeScanPath",
  "welcomeEmailWithoutAuditEvent",
  "welcomeSentFlagBeforeProviderAcceptance",
  "inboxConfirmationDuplicate",
  "inboxConfirmationRequiredPerPlan",
  "inboxConfirmationBeforeVerification",
  "inboxConfirmationWithoutDashboardPath",
  "inboxConfirmationWithoutAuditEvent",
  "inboxConfirmationSentFlagBeforeProviderAcceptance",
  "guaranteedInboxPlacement",
  "primaryInboxGuarantee",
  "rawProviderPayloadInEmail",
  "sessionTokenInEmail",
  "csrfTokenInEmail",
  "guaranteedOutcomeEmail",
  "guaranteedRoiEmail",
  "fakeUrgencyEmail",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  validatorPath,
]);

forbidden(contractPath, [
  "send before verification",
  "send duplicate welcome",
  "require confirmation every plan",
  "require inbox confirmation per plan",
  "set welcome sent flag before accepted provider send result",
  "set inbox confirmation sent flag before accepted provider send result",
  "guaranteed inbox placement",
  "guaranteed primary inbox",
  "guaranteed deliverability",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed business results",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
]);

if (failures.length) {
  console.error("Verified welcome email contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Verified welcome email contracts validation passed with one-time inbox confirmation coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;

  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
