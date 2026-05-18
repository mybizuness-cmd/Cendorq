import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const dashboardPath = "src/app/dashboard/page.tsx";
const reportVaultPath = "src/app/dashboard/reports/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-customer-revenue-command-center.mjs";

expect(dashboardPath, [
  "Your Cendorq workspace is ready.",
  "One next step.",
  "Cendorq keeps the next step separate.",
  "A workspace can exist before a scan.",
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
  "getPlanValueDelivery",
  "getCendorqPlanPrice",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(reportVaultPath, [
  "Separated report library",
  "Different proof for every readiness depth.",
  "Each one has a different job.",
  "Readiness signal result",
  "Deep Review report",
  "Build Fix summary",
  "Ongoing Control monthly summary",
  "Nothing final until it is approved.",
  "Paid proof",
  "Dashboard + email attachment",
  "Not full diagnosis, implementation, monthly monitoring",
  "Not done-for-you implementation",
  "Not a full diagnostic report",
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
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
  "full diagnosis included in free scan",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
]);

forbidden(reportVaultPath, [
  "free scan diagnostic report",
  "deep review implementation",
  "build fix monthly monitoring",
  "ongoing control unlimited fixes",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
]);

if (failures.length) {
  console.error("Customer revenue command center validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer revenue command center validation passed with current dashboard and report-vault plan separation coverage.");

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
