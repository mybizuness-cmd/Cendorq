import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/page.tsx";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-dashboard-handoff-runtime-integration.mjs";
const failures = [];

expect(pagePath, [
  "projectCustomerPlatformHandoff",
  "DASHBOARD_HANDOFFS",
  "Connected dashboard handoffs",
  "Show pending states as pending, not as live truth.",
  "Do not expose private payloads, private files, private workflow details, or risk internals.",
  "Give the customer one obvious next action before offering deeper plan decisions.",
  "Keep support, report, billing, and notification links visible when a customer needs recovery.",
  "Start with the clearest available signal. Do not treat pending work as final.",
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
  "/plans",
  "Continue Free Scan",
  "Safe state rules",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  validatorPath,
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
  "session" + "Token=",
  "csrf" + "Token=",
  "admin" + "Key=",
  "support" + "Context" + "Key=",
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

console.log("Dashboard handoff runtime integration validation passed. validate:routes delegates through the orchestrator and the dashboard handoff integration validator remains wired into the route chain.");

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
