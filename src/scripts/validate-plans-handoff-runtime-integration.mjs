import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/plans/page.tsx";
const packagePath = "package.json";
const failures = [];

expect(pagePath, [
  "projectCustomerPlatformHandoff",
  "PLANS_HANDOFFS",
  "Plans handoff runtime integration",
  "Connected plan handoffs",
  "Plan movement stays stage-aware, evidence-led, and connected to the customer platform.",
  "Free Scan, dashboard, billing, report vault, and support context",
  "without fake urgency",
  "dark patterns",
  "guaranteed ROI",
  "guaranteed outcomes",
  "raw/internal data exposure",
  "disconnected plan decisions",
  "handoff.currentState",
  "handoff.safeNextAction",
  "handoff.recoveryPath",
  "handoff.connectedDestination",
  "handoff.decision",
]);

expect(pagePath, [
  "plans-to-free-scan-or-dashboard",
  "dashboard-to-plans",
  "billing-to-plans",
  "report-vault-to-plans",
  "customerOwned: true",
  "verifiedAccess: true",
  "safeProjectionReady: true",
]);

expect(pagePath, [
  "Customers should start with diagnosis when readiness is unclear",
  "return to dashboard when private customer context exists",
  "/free-check",
  "/dashboard",
  "/plans",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-plans-handoff-runtime-integration.mjs",
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
  "guaranteed refund",
  "guaranteed billing change",
  "impossible to hack",
  "never liable",
  "liability-free",
]);

if (failures.length) {
  console.error("Plans handoff runtime integration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plans handoff runtime integration validation passed.");

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
