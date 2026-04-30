import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/platform-launch-readiness-contracts.ts";
const runtimePath = "src/lib/platform-launch-readiness-runtime.ts";
const runtimeValidatorPath = "src/scripts/validate-platform-launch-readiness-runtime.mjs";
const packagePath = "package.json";
const failures = [];

expect(contractPath, [
  "PLATFORM_LAUNCH_READINESS_CONTRACT",
  "PLATFORM_LAUNCH_READINESS_BLOCKED_PATTERNS",
  "Platform Launch Readiness Contract",
  "public-entry-and-free-scan",
  "auth-session-and-welcome",
  "customer-platform-handoffs",
  "reports-and-vault",
  "billing-and-entitlements",
  "support-and-command-center",
  "maintenance-and-smoke",
]);

expect(contractPath, [
  "production auth provider contracts validated",
  "one-time verified welcome email is validated",
  "customer platform handoff contracts validated",
  "report generation rendering contracts validation",
  "billing checkout contracts validation",
  "command center control interface validation",
  "controlled maintenance contracts validation",
  "production smoke finalization validation",
]);

expect(contractPath, [
  "latest main commit is verified before release branch creation",
  "all validators are wired into validate:routes",
  "Vercel deployment is green for the release PR",
  "production smoke target is configured before production launch declaration",
  "owner-provided payment links or provider checkout config exist before paid checkout launch",
  "server-only secrets are configured outside browser-accessible code",
  "rollback plan exists for auth, billing, reports, support, and public conversion changes",
  "audit plan exists for auth, support, billing, report release, operator actions, and maintenance actions",
]);

expect(contractPath, [
  "No launch with browser-stored session tokens, CSRF tokens, provider tokens, admin keys, support context keys, or private keys.",
  "No launch with account-existence leakage",
  "No launch with customer routes exposing raw payloads",
  "No launch with pending, draft, incomplete, or unapproved reports presented as final customer truth.",
  "No launch with paid report access without entitlement, customer ownership, verified access, and report release approval.",
  "No launch with billing entitlement activated from client-only success redirect or unverified webhook.",
  "No launch with support copy asking for card numbers",
  "No launch with fake urgency, dark patterns, guaranteed ROI",
  "No launch with uncontrolled AI or scheduled maintenance mutating production without validation, approval, rollback, and audit.",
]);

expect(contractPath, [
  "ready-for-owner-review",
  "ready-for-production-smoke",
  "ready-for-limited-launch",
  "ready-for-public-launch",
  "Ready-for-production-smoke requires all route validators to be wired and passing in the release branch.",
  "Ready-for-public-launch requires production smoke completion, owner payment/auth configuration where applicable, rollback plan, audit plan, and no active hard launch locks.",
]);

expect(contractPath, [
  "launchWithoutVerifiedMain",
  "launchWithoutValidateRoutes",
  "launchWithoutVercelGreen",
  "launchWithoutProductionSmoke",
  "launchWithoutAuthProvider",
  "launchWithoutVerifiedWelcomeEmail",
  "launchWithoutCustomerHandoffs",
  "launchWithoutReportApproval",
  "launchWithoutBillingWebhookVerification",
  "launchWithoutPaymentLinkMapping",
  "browserStoredAuthorityLaunch",
  "accountExistenceLeakLaunch",
  "rawPayloadLaunchExposure",
  "crossCustomerDataLaunchExposure",
  "pendingReportFinalLaunch",
  "clientBillingAuthorityLaunch",
  "unverifiedWebhookLaunch",
  "fakeUrgencyLaunch",
  "guaranteedOutcomeLaunch",
  "uncontrolledAiMutationLaunch",
]);

expect(runtimePath, [
  "projectPlatformLaunchReadiness",
  "PlatformLaunchReadinessInput",
  "PlatformLaunchReadinessProjection",
  "PlatformLaunchDecisionState",
  "safeSummary",
  "readyGroups",
  "blockedGroups",
  "evidenceGaps",
  "safeNextActions",
  "hardLaunchLocks",
  "blockedPatterns",
  "ready-for-owner-review",
  "ready-for-production-smoke",
  "ready-for-limited-launch",
  "ready-for-public-launch",
  "Blocked unsafe launch readiness value.",
]);

expect(runtimePath, [
  "latest main commit verification is missing",
  "validate:routes wiring is missing",
  "green Vercel deployment is missing",
  "server-only secret configuration evidence is missing",
  "rollback plan evidence is missing",
  "audit plan evidence is missing",
  "billing checkout and entitlement readiness evidence is missing",
  "controlled maintenance and smoke readiness evidence is missing",
  "critical hard launch lock is active",
]);

expect(runtimeValidatorPath, [
  "Platform launch readiness runtime validation passed.",
  "projectPlatformLaunchReadiness",
  "PlatformLaunchReadinessInput",
  "PlatformLaunchReadinessProjection",
  "rawPayload=",
  "sessionToken=",
  "csrfToken=",
  "supportContextKey=",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-platform-launch-readiness-contracts.mjs",
]);

forbidden(contractPath, [
  "launch without validation",
  "launch without vercel",
  "launch without smoke",
  "fake urgency is allowed",
  "guaranteed outcome is allowed",
  "client-only success redirect activates entitlement",
  "unverified webhook activates entitlement",
  "browser-stored session token allowed",
  "delete audit records",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
]);

forbidden(runtimePath, [
  "return rawPayload",
  "return rawEvidence",
  "return rawBillingData",
  "return secret",
  "return password",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed revenue",
  "impossible to hack",
  "never liable",
  "liability-free",
  "delete audit records",
]);

if (failures.length) {
  console.error("Platform launch readiness contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Platform launch readiness contracts validation passed, including runtime projection coverage.");

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
