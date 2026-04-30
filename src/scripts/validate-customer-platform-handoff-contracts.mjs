import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/customer-platform-handoff-contracts.ts";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-customer-platform-handoff-contracts.mjs";
const failures = [];

expect(contractPath, [
  "CUSTOMER_PLATFORM_HANDOFF_CONTRACT",
  "CUSTOMER_PLATFORM_HANDOFF_HARD_LOCKS",
  "CUSTOMER_PLATFORM_HANDOFF_BLOCKED_PATTERNS",
  "customer-platform-handoff-contract",
  "currentState",
  "safeNextAction",
  "recoveryPath",
  "connectedDestination",
  "privacyPosture",
  "current state",
  "one safe next action",
  "recovery path",
  "connected destination",
  "privacy posture",
  "No customer journey dead end.",
  "No pending state presented as final truth.",
  "No customer handoff without one safe next action.",
  "No handoff that exposes raw or internal data.",
  "No browser-stored authority",
  "No fake urgency",
  "No duplicate-submission path without status, notification, dashboard, or support follow-through.",
]);

expect(contractPath, [
  "free-scan-to-dashboard",
  "free-scan-to-notifications",
  "free-scan-to-report-vault",
  "dashboard-to-report-vault",
  "dashboard-to-billing",
  "dashboard-to-notifications",
  "dashboard-to-support",
  "dashboard-to-plans",
  "report-vault-to-support",
  "report-vault-to-plans",
  "billing-to-plans",
  "billing-to-support",
  "notifications-to-status",
  "support-request-to-status",
  "support-status-to-safe-update",
  "plans-to-free-scan-or-dashboard",
]);

expect(contractPath, [
  "raw payloads",
  "raw evidence",
  "raw security payloads",
  "raw billing data",
  "internal notes",
  "operator identities",
  "risk-scoring internals",
  "attacker details",
  "prompt/system/developer messages",
  "secrets",
  "passwords",
  "API keys",
  "private keys",
  "session tokens",
  "CSRF tokens",
  "admin keys",
  "support context keys",
  "cross-customer data",
  "localStorage secrets",
  "sessionStorage secrets",
  "browser-stored authority",
  "fake urgency",
  "dark-pattern conversion",
  "guaranteed outcomes",
]);

expect(contractPath, [
  "customerJourneyDeadEnd",
  "pendingStateFinalTruth",
  "handoffWithoutNextAction",
  "rawPayloadHandoff",
  "rawEvidenceHandoff",
  "rawSecurityPayloadHandoff",
  "rawBillingDataHandoff",
  "internalNotesHandoff",
  "operatorIdentityHandoff",
  "riskInternalsHandoff",
  "attackerDetailsHandoff",
  "promptHandoff",
  "systemMessageHandoff",
  "developerMessageHandoff",
  "secretHandoff",
  "passwordHandoff",
  "apiKeyHandoff",
  "privateKeyHandoff",
  "sessionTokenHandoff",
  "csrfTokenHandoff",
  "adminKeyHandoff",
  "supportContextKeyHandoff",
  "browserStoredAuthority",
  "localStorageSecret",
  "sessionStorageSecret",
  "fakeUrgencyHandoff",
  "guaranteedOutcomeHandoff",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  validatorPath,
]);

forbidden(contractPath, [
  "impossible to hack",
  "never liable",
  "liability-free",
  "guaranteed safe",
  "delete audit records",
  "delete all audit records",
  "store session tokens in localStorage",
  "store session tokens in sessionStorage",
  "collect card numbers through support",
  "collect bank details through support",
  "paste your password",
  "paste your private key",
]);

if (failures.length) {
  console.error("Customer platform handoff contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer platform handoff contracts validation passed. validate:routes delegates through the orchestrator and the handoff contract validator remains wired into the route chain.");

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
