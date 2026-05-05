import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/production-smoke-finalization-contracts.ts";
const platformLaunchPath = "src/lib/platform-launch-readiness-contracts.ts";
const platformLaunchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const smokePath = "src/scripts/smoke-production.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(contractPath, [
  "PRODUCTION_SMOKE_FINALIZATION_CONTRACT",
  "Production Smoke Finalization Coverage Contract",
  "public-conversion-routes",
  "customer-platform-routes",
  "closed-command-center-routes",
  "protected-api-boundaries",
  "finalization-contracts",
  "owner configuration evidence/workflow",
  "without requiring live secrets in default smoke runs",
]);

expect(contractPath, [
  "/api/command-center/owner-configuration/evidence",
  "/api/command-center/owner-configuration/workflow",
  "owner evidence/workflow protected denials",
  "owner configuration evidence API validation",
  "owner configuration workflow API validation",
  "owner configuration workflow protections cannot drift silently",
  "command-center preview keys",
  "owner evidence payloads",
]);

expect(contractPath, [
  "production-auth-provider-contracts",
  "verified-welcome-email-contracts",
  "report-generation-rendering-contracts",
  "billing-checkout-contracts",
  "controlled-maintenance-contracts",
  "Default production smoke must not require live customer session tokens, CSRF tokens, provider secrets, webhook secrets, admin keys, support context keys, payment provider keys, command-center preview keys, owner evidence payloads, or real payment links.",
  "Default production smoke must treat protected-route denial as success when the expected safe denial status and copy are returned.",
]);

expect(contractPath, [
  "production auth provider contracts validation",
  "verified welcome email contracts validation",
  "report generation rendering contracts validation",
  "billing checkout contracts validation",
  "controlled maintenance contracts validation",
  "customer platform handoff contracts validation",
  "customer platform handoff runtime validation",
  "production smoke coverage validation",
]);

expect(contractPath, [
  "liveSecretRequiredForDefaultSmoke",
  "rawPayloadLogged",
  "rawEvidenceLogged",
  "rawBillingDataLogged",
  "rawOwnerEvidenceLogged",
  "ownerEvidencePayloadLogged",
  "providerSecretLogged",
  "sessionTokenLogged",
  "csrfTokenLogged",
  "adminKeyLogged",
  "supportContextKeyLogged",
  "commandCenterPreviewKeyLogged",
  "accountExistenceLeakSmoke",
  "commandCenterLeakSmoke",
  "ownerEvidenceLeakSmoke",
  "clientAuthoritativeBillingSmoke",
  "unverifiedWebhookEntitlementSmoke",
  "pendingReportFinalSmoke",
  "paidReportWithoutEntitlementSmoke",
  "fakeUrgencySmoke",
  "guaranteedOutcomeSmoke",
]);

expect(contractPath, [
  "No release is final unless production smoke coverage and all finalization contract validators are wired into validate:routes.",
  "No smoke check may require production mutation, real payment, real customer session, owner evidence payload, command-center preview key, or uncontrolled AI action.",
  "No protected route may pass smoke by exposing internal data; safe denial is acceptable and expected where authorization is absent.",
  "No public conversion route may pass smoke if it relies on fake urgency, guaranteed outcomes, or unsafe data collection.",
  "No owner configuration evidence or workflow route may pass smoke by exposing raw provider payloads, protected config values, private credentials, private customer data, or private audit payloads.",
]);

expect(platformLaunchPath, [
  "PLATFORM_LAUNCH_READINESS_CONTRACT",
  "Platform Launch Readiness Contract",
  "public-entry-and-free-scan",
  "auth-session-and-welcome",
  "customer-platform-handoffs",
  "reports-and-vault",
  "billing-and-entitlements",
  "support-and-command-center",
  "maintenance-and-smoke",
  "No launch with browser-stored session tokens, CSRF tokens, provider tokens, admin keys, support context keys, or private keys.",
  "No launch with billing entitlement activated from client-only success redirect or unverified webhook.",
  "No launch with uncontrolled AI or scheduled maintenance mutating production without validation, approval, rollback, and audit.",
  "ready-for-public-launch",
]);

expect(platformLaunchValidatorPath, [
  "Platform launch readiness contracts validation passed",
  "PLATFORM_LAUNCH_READINESS_CONTRACT",
  "production smoke finalization validation",
  "owner evidence/workflow protected smoke coverage",
  "Vercel deployment is green for the release PR",
  "No launch with owner configuration evidence or workflow routes exposing raw provider payloads",
  "Ready-for-owner-review does not mean public launch",
]);

expect(smokePath, [
  "/api/free-check",
  "/api/command-center/readiness",
  "/api/command-center/owner-configuration/evidence",
  "/api/command-center/owner-configuration/workflow",
  "protected JSON route should return ok=false",
  "checkProtectedJsonErrorRoute",
  "checkClosedCommandCenterRoute",
  "redirect: \"manual\"",
  "payload.ok !== false",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  "node:child_process",
  "validate-production-smoke-finalization-contracts.mjs",
  "validate-command-center-owner-configuration-evidence-api.mjs",
  "validate-command-center-owner-configuration-workflow-api.mjs",
]);

forbidden(contractPath, [
  "default smoke requires live secret",
  "default smoke requires real payment",
  "default smoke requires real customer session",
  "log raw payload",
  "log raw evidence",
  "log raw billing data",
  "log provider secret",
  "log session token",
  "log csrf token",
  "safe denial is failure",
  "fake urgency is allowed",
  "guaranteed outcome is allowed",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
]);

forbidden(platformLaunchPath, [
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

if (failures.length) {
  console.error("Production smoke finalization contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production smoke finalization contracts validation passed. Platform launch readiness contract, owner evidence/workflow protected smoke coverage, and validator wiring are included in the wired smoke finalization route gate.");

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
    if (containsUnsafeClaim(text, phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function containsUnsafeClaim(text, phrase) {
  let index = text.indexOf(phrase);
  while (index !== -1) {
    const paragraphStart = Math.max(0, text.lastIndexOf("\n\n", index));
    const nextParagraphBreak = text.indexOf("\n\n", index);
    const paragraphEnd = nextParagraphBreak === -1 ? text.length : nextParagraphBreak;
    const paragraph = text.slice(paragraphStart, paragraphEnd);
    const window = text.slice(Math.max(0, index - 240), Math.min(text.length, index + phrase.length + 240));
    const context = `${paragraph}\n${window}`;
    const safeProhibition = [
      "must never",
      "must not",
      "do not",
      "does not",
      "not to",
      "not an",
      "not a",
      "never log",
      "never claim",
      "never imply",
      "avoid",
      "without",
      "cannot",
      "blocked",
      "disallowed",
      "no smoke check may",
      "no protected route may",
      "no public conversion route may",
      "no owner configuration",
      "false",
      "allowed: false",
    ].some((marker) => context.includes(marker));

    if (!safeProhibition) return true;
    index = text.indexOf(phrase, index + phrase.length);
  }
  return false;
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
