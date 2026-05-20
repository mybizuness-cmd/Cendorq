import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/page.tsx";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-dashboard-handoff-runtime-integration.mjs";
const failures = [];

expect(pagePath, [
  "Private AI Visibility command center",
  "Your Cendorq command center is ready.",
  "Cendorq keeps AI Visibility, Diagnosis, reports, plans, billing, support, and one clear next command in one protected dashboard.",
  "One next command.",
  "The dashboard should not force a purchase or assume a result exists.",
  "start the Free Scan, continue Diagnosis, open the result, or choose the next plan",
  "DashboardNextBestAction",
  "DashboardActionInbox",
  "DashboardBusinessCommandCenter",
  "DashboardControlRoomReentry",
  "AI Visibility",
  "Reports should connect visibility, diagnosis, evidence, limitations, and the next command path.",
  "Scan. Diagnose. Review. Repair. Control.",
  "Open protected scan, Diagnosis, Review, and evidence outputs when they are ready.",
  "Resolve blockers without sharing private passwords.",
  "/dashboard/reports",
  "/dashboard/billing",
  "/dashboard/notifications",
  "/dashboard/support",
  "/plans",
]);

expect(packagePath, ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);
expect(routesChainPath, [validatorPath]);

forbidden(pagePath, [
  "Private AI readiness control center",
  "Your Cendorq account is ready.",
  "Cendorq keeps your scan, reports, plans, billing, support, and one clear next action in one protected dashboard.",
  "No internal conversion role labels",
  "Your Cendorq workspace is ready.",
  "A workspace can exist before a scan.",
  "Scan. Diagnose. Fix. Control.",
  "DASHBOARD_HANDOFFS",
  "projectCustomerPlatformHandoff",
]);

if (failures.length) {
  console.error("Dashboard handoff runtime integration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard handoff runtime integration validation passed with AI Visibility command language, Diagnosis, evidence outputs, handoff surfaces, and route-chain coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
