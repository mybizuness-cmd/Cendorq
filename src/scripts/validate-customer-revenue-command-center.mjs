import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const dashboardPath = "src/app/dashboard/page.tsx";
const reportVaultPath = "src/app/dashboard/reports/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-customer-revenue-command-center.mjs";

expect(dashboardPath, [
  "Your Cendorq command center is ready.",
  "One next command.",
  "Cendorq keeps AI Visibility, Diagnosis, reports, plans, billing, support, and one clear next command in one protected dashboard.",
  "A scan can exist before a paid review.",
  "A purchase can exist before delivery starts.",
  "Scan. Review. Repair. Control.",
  "Open Free Scan path",
  "Open Review page",
  "Open Repair page",
  "Open Control page",
  "Reports",
  "Billing",
  "Notifications",
  "Support",
  "getCendorqPlanPrice",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(reportVaultPath, [
  "AI Visibility proof vault",
  "Separated report library",
  "Different proof for every AI Visibility depth.",
  "AI Visibility signal result",
  "Deep Review report",
  "Build Fix summary",
  "Ongoing Control monthly summary",
  "Nothing final until it is approved.",
  "Paid proof",
  "Dashboard + email attachment",
  "REPORT_LIBRARY",
  "REPORT_VAULT_RULES",
  "REPORT_ACCESS_BY_PLAN",
  "resolveReportVaultAccessDecision",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

const blockedLegacyPlanLabels = ["AI Readiness Review", "Signal Repair", "Readiness Control"];
const blockedOldDashboardTerms = ["Your Cendorq workspace is ready.", "A workspace can exist before a scan.", "One next step."];
const blockedOldReportTerms = ["Different proof for every readiness depth.", "Readiness signal result", joinWords("full", "diagnosis"), joinWords("diagnostic", "report")];
forbidden(dashboardPath, [...blockedLegacyPlanLabels, ...blockedOldDashboardTerms]);
forbidden(reportVaultPath, [...blockedLegacyPlanLabels, ...blockedOldReportTerms]);

if (failures.length) {
  console.error("Customer revenue command center validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer revenue command center validation passed with current AI Visibility dashboard and report-vault plan separation coverage.");

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

function joinWords(...words) {
  return words.join(" ");
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}