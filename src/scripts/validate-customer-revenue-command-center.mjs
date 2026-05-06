import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const dashboardPath = "src/app/dashboard/page.tsx";
const reportVaultPath = "src/app/dashboard/reports/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-customer-revenue-command-center.mjs";

expect(dashboardPath, [
  "Private revenue command center",
  "Customer revenue command path",
  "Customer command summary",
  "Most valuable next action",
  "Unlocked now",
  "Blocked until the right depth",
  "Four stages. Four different jobs. One clear next action.",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "What Cendorq needs next",
  "Unlocked here",
  "Not unlocked here",
  "finish the first signal",
  "choose the right paid depth",
  "PLAN_VALUE_SEPARATION_RULES",
  "getPlanValueDelivery",
  "getCendorqPlanPrice",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(reportVaultPath, [
  "Separated report library",
  "Each report type has a different job.",
  "Free Scan result",
  "Deep Review diagnostic report",
  "Build Fix delivery summary",
  "Ongoing Control monthly summary",
  "Ready reports only",
  "Not a full diagnosis",
  "Not implementation",
  "Not monthly monitoring",
  "Not unlimited Build Fix",
  "REPORT_LIBRARY",
  "REPORT_VAULT_RULES",
  "PLAN_VALUE_SEPARATION_RULES",
  "getPlanValueDelivery",
  "getCendorqPlanPrice",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(dashboardPath, [
  "unlimited implementation",
  "guaranteed ranking",
  "guaranteed ai placement",
  "guaranteed revenue",
  "full diagnosis included in free scan",
]);

forbidden(reportVaultPath, [
  "free scan diagnostic report",
  "deep review implementation",
  "build fix monthly monitoring",
  "ongoing control unlimited fixes",
  "guaranteed ranking",
  "guaranteed ai placement",
  "guaranteed revenue",
]);

if (failures.length) {
  console.error("Customer revenue command center validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer revenue command center validation passed with dashboard and report-vault plan separation coverage.");

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
