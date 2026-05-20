import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const reportVaultPath = "src/app/dashboard/reports/page.tsx";
const freeScanResultPath = "src/app/dashboard/reports/free-scan/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-command-report-vault-free-scan-results.mjs";

expect(reportVaultPath, [
  "Readiness proof vault",
  "Keep the record of what customers and AI search can understand.",
  "AI/Search posture",
  "Signal, proof, risk, limit",
  "Reports explain what is visible, what it may mean, what is limited, and which step comes next.",
  "Different proof for every readiness depth.",
  "First AI/search signal only.",
  "AI Readiness Review report",
  "Signal Repair summary",
  "Readiness Control monthly summary",
  "Useful only when report depth, AI/search posture, and delivery are impossible to confuse.",
  "no guaranteed ranking, guaranteed AI placement, guaranteed leads, or algorithm control",
  "paidAiPosture",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(freeScanResultPath, [
  "Market signal result | Cendorq",
  "The first AI/search market signal is ready.",
  "This is the Scan layer inside the customer dashboard.",
  "Signal",
  "Proof",
  "Risk",
  "Limit",
  "Next command",
  "AI/Search posture",
  "First signal only",
  "The result can show visibility risk without claiming ranking, placement, or full diagnosis.",
  "Evidence, confidence, AI/search posture, and priority stay separate.",
  "AI/Search: {finding.aiVisibilityImpact}",
  "Open Review page — {DEEP_REVIEW.price}",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(reportVaultPath, [
  "Visibility report vault",
  "Proof layer",
  "See the proof layer without confusing report types.",
  "The vault should feel like intelligence, not storage.",
  "Four report types. Four different customer decisions.",
  "Useful only when report depth is impossible to confuse.",
  "Protected Customer-owned vault",
  "guaranteed leads.",
  "algorithm control.",
]);

forbidden(freeScanResultPath, [
  "Your first decision signal is ready.",
  "This Free Scan result belongs inside the customer dashboard.",
  "The first signal is useful because it is bounded.",
  "What this result includes",
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

boundedLength(reportVaultPath, 18500);
boundedLength(freeScanResultPath, 18500);

if (failures.length) {
  console.error("Command report vault and Free Scan AI command result validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command report vault and Free Scan AI command result validation passed with dashboard-only route, AI/search posture, bounded claims, and clear report type separation.");

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
