import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/notifications/page.tsx";
const packagePath = "package.json";
const failures = [];

expect(pagePath, [
  "projectCustomerPlatformHandoff",
  "NOTIFICATION_HANDOFFS",
  "Notification center handoff runtime integration",
  "Connected notification handoffs",
  "Every alert should connect to status, recovery, or the next safe route.",
  "customer-owned safe projection",
  "Alerts can route, recover, hold, or suppress",
  "handoff.currentState",
  "handoff.safeNextAction",
  "handoff.recoveryPath",
  "handoff.connectedDestination",
  "handoff.decision",
]);

expect(pagePath, [
  "dashboard-to-notifications",
  "free-scan-to-notifications",
  "notifications-to-status",
  "support-request-to-status",
  "customerOwned: true",
  "verifiedAccess: true",
  "safeProjectionReady: true",
]);

expect(pagePath, [
  "account/security",
  "scan/report",
  "billing/support",
  "support lifecycle",
  "raw payloads",
  "raw evidence",
  "raw security payloads",
  "raw billing data",
  "internal notes",
  "risk internals",
  "attacker details",
  "secrets",
  "unsupported promises",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-notification-center-handoff-runtime-integration.mjs",
]);

forbidden(pagePath, [
  "rawPayload=",
  "rawEvidence=",
  "rawSecurityPayload=",
  "rawBillingData=",
  "internalNotes=",
  "operatorIdentity=",
  "riskScoringInternals=",
  "attackerDetails=",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed outcome",
  "impossible to hack",
  "never liable",
  "liability-free",
]);

if (failures.length) {
  console.error("Notification center handoff runtime integration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Notification center handoff runtime integration validation passed.");

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
