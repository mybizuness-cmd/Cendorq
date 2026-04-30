import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/verified-welcome-email-contracts.ts";
const packagePath = "package.json";
const failures = [];

expect(contractPath, [
  "VERIFIED_WELCOME_EMAIL_CONTRACT",
  "VERIFIED_WELCOME_EMAIL_BLOCKED_PATTERNS",
  "welcome-verified",
  "Cendorq Support <support@cendorq.com>",
  "Send exactly one welcome email after verified account creation",
  "email verified flag is true",
  "welcome sent flag is false",
  "safe customer projection is ready",
  "dashboard route is available",
]);

expect(contractPath, [
  "welcome sent flag is true",
  "email verified flag is false",
  "verification token is pending, expired, invalid, consumed, or mismatched",
  "account is locked or disabled",
  "customer id mapping is missing",
  "suppression key blocks transactional welcome",
]);

expect(contractPath, [
  "Open dashboard",
  "/dashboard",
  "Start Free Scan",
  "/free-check",
  "dashboard is private",
  "notifications and report vault will show status",
  "support center is available for safe questions",
  "billing and plans remain separate from support-message payment collection",
]);

expect(contractPath, [
  "welcome-email-evaluated",
  "welcome-email-sent",
  "welcome-email-suppressed",
  "welcome-email-delivery-failed",
  "set welcome sent flag true only after accepted provider send result",
  "store provider message id hash when available",
  "store sent timestamp",
  "store template version",
  "store audit reason",
]);

expect(contractPath, [
  "Do not promise ROI, revenue, legal outcomes, refund outcomes, billing changes, security outcomes, or report changes.",
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
  "rawProviderPayloadInEmail",
  "sessionTokenInEmail",
  "csrfTokenInEmail",
  "guaranteedOutcomeEmail",
  "guaranteedRoiEmail",
  "fakeUrgencyEmail",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-verified-welcome-email-contracts.mjs",
]);

forbidden(contractPath, [
  "send before verification",
  "send duplicate welcome",
  "set welcome sent flag before accepted provider send result",
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

console.log("Verified welcome email contracts validation passed.");

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
