import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/production-smoke-finalization-contracts.ts";
const smokePath = "src/scripts/smoke-production.mjs";
const packagePath = "package.json";
const failures = [];

expect(contractPath, [
  "PRODUCTION_SMOKE_FINALIZATION_CONTRACT",
  "Production Smoke Finalization Coverage Contract",
  "public-conversion-routes",
  "customer-platform-routes",
  "closed-command-center-routes",
  "protected-api-boundaries",
  "finalization-contracts",
  "without requiring live secrets in default smoke runs",
]);

expect(contractPath, [
  "production-auth-provider-contracts",
  "verified-welcome-email-contracts",
  "report-generation-rendering-contracts",
  "billing-checkout-contracts",
  "controlled-maintenance-contracts",
  "Default production smoke must not require live customer session tokens, CSRF tokens, provider secrets, webhook secrets, admin keys, support context keys, payment provider keys, or real payment links.",
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
  "providerSecretLogged",
  "sessionTokenLogged",
  "csrfTokenLogged",
  "adminKeyLogged",
  "supportContextKeyLogged",
  "accountExistenceLeakSmoke",
  "commandCenterLeakSmoke",
  "clientAuthoritativeBillingSmoke",
  "unverifiedWebhookEntitlementSmoke",
  "pendingReportFinalSmoke",
  "paidReportWithoutEntitlementSmoke",
  "fakeUrgencySmoke",
  "guaranteedOutcomeSmoke",
]);

expect(contractPath, [
  "No release is final unless production smoke coverage and all finalization contract validators are wired into validate:routes.",
  "No smoke check may require production mutation, real payment, real customer session, or uncontrolled AI action.",
  "No protected route may pass smoke by exposing internal data; safe denial is acceptable and expected where authorization is absent.",
  "No public conversion route may pass smoke if it relies on fake urgency, guaranteed outcomes, or unsafe data collection.",
]);

expect(smokePath, [
  "/api/free-check",
  "/api/command-center/readiness",
  "protected JSON route should return ok=false",
  "checkProtectedJsonErrorRoute",
  "checkClosedCommandCenterRoute",
  "redirect: \"manual\"",
  "payload.ok !== false",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-production-smoke-finalization-contracts.mjs",
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

if (failures.length) {
  console.error("Production smoke finalization contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production smoke finalization contracts validation passed.");

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
