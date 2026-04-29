import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/page.tsx";
const packagePath = "package.json";
const failures = [];

expect(pagePath, [
  "projectCustomerPlatformHandoff",
  "DASHBOARD_HANDOFFS",
  "Dashboard handoff runtime integration",
  "Connected dashboard handoffs",
  "Every dashboard card now carries a safe state, next action, and recovery path.",
  "customer-owned projection",
  "never strand the customer",
  "treat pending work as final",
  "raw or internal data",
  "unsupported outcome promise",
  "handoff.currentState",
  "handoff.safeNextAction",
  "handoff.recoveryPath",
  "handoff.connectedDestination",
  "handoff.decision",
]);

expect(pagePath, [
  "dashboard-to-report-vault",
  "dashboard-to-billing",
  "dashboard-to-notifications",
  "dashboard-to-support",
  "dashboard-to-plans",
  "customerOwned: true",
  "verifiedAccess: true",
  "safeProjectionReady: true",
]);

expect(pagePath, [
  "/dashboard/reports",
  "/dashboard/billing",
  "/dashboard/notifications",
  "/dashboard/support",
  "/dashboard/support/status",
  "/plans",
  "Continue Free Scan",
  "Safe state rules",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-dashboard-handoff-runtime-integration.mjs",
]);

forbidden(pagePath, [
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
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
  console.error("Dashboard handoff runtime integration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard handoff runtime integration validation passed.");

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
