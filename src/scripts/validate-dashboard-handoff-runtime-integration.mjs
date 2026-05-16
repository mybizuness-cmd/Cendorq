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
  "Your Cendorq workspace is ready.",
  "Cendorq checks this device for scan progress and shows one clear next action: start the Free Scan, continue it, or open the protected result.",
  "The dashboard should not force a purchase or assume a scan exists.",
  "A workspace can exist before a scan. A scan can exist before a paid review. A purchase can exist before delivery starts.",
  "Open protected scan and review outputs when they are ready.",
  "Resolve blockers without sending private details.",
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
  "Open Free Scan path",
  "One clear action",
  "One next step.",
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

console.log("Dashboard handoff runtime integration validation passed with current dashboard projection, handoff surfaces, safe customer next-step copy, and route-chain coverage.");

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
