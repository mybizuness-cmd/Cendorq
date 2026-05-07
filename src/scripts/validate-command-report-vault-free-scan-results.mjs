import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const reportVaultPath = "src/app/dashboard/reports/page.tsx";
const freeScanResultPath = "src/app/dashboard/reports/free-scan/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-command-report-vault-free-scan-results.mjs";

expect(reportVaultPath, [
  "Visibility report vault",
  "Proof layer",
  "See the proof layer without confusing report types.",
  "The vault should feel like intelligence, not storage.",
  "Report state summary",
  "Separated report library",
  "Four report types. Four different customer decisions.",
  "Free Scan result",
  "Deep Review report",
  "Build Fix summary",
  "Ongoing Control monthly summary",
  "Useful only when report depth is impossible to confuse.",
  "hover:-translate-y-0.5",
  "shadow-[0_28px_100px_rgba(2,8,23,0.42)]",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(freeScanResultPath, [
  "Protected dashboard result",
  "Protected dashboard result",
  "Dashboard-only Free Scan result route",
  "Free Scan result page must remain under /dashboard/reports/free-scan and not public.",
  "Your first decision signal is ready.",
  "This Free Scan result belongs inside the customer dashboard.",
  "First signal",
  "Bounded confidence",
  "Result intelligence",
  "The first signal is useful because it is bounded.",
  "Evidence, confidence, and priority stay separate.",
  "What this result includes",
  "What stays outside Free Scan",
  "Deep Review $497",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(reportVaultPath, [
  "REPORT_VAULT_FIRST_USE_SNAPSHOT",
  "Report vault readiness standards",
  "MiniVaultList",
  "Available after checkout and expanded review",
  "Monthly subscription output",
  "First signal path",
]);

forbidden(freeScanResultPath, [
  "Free Scan results",
  "See what may be costing customer choices first.",
  "How your result is organized",
  "How the first read is produced",
  "ResultCard",
  "MethodPanel",
  "FREE_SCAN_RESULT_SECTIONS",
  "RESULT_TIMELINE",
]);

forbiddenPathFragments([
  "src/app/free-scan-results/page.tsx",
  "src/app/free-check/results/page.tsx",
  "src/app/free-check/free-scan-results/page.tsx",
  "src/app/results/free-scan/page.tsx",
  "src/app/reports/free-scan/page.tsx",
]);

boundedLength(reportVaultPath, 14500);
boundedLength(freeScanResultPath, 14500);

if (failures.length) {
  console.error("Command report vault and Free Scan result validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command report vault and Free Scan result validation passed with dashboard-only result route and clear report type separation.");

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

function forbiddenPathFragments(paths) {
  for (const path of paths) {
    if (existsSync(join(root, path))) failures.push(`Free Scan result route must stay dashboard-only; remove public route: ${path}`);
  }
}

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for the command report standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
