import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/app/free-check/page.tsx", ["Free Scan | Cendorq", "first Presence Report and AI Visibility signal", "Cendorq Free Scan", "FreeCheckProgressGuard", "FreeCheckAnalytics", "GuidedFreeCheckFormV3", "Get the first signal before buying the deeper fix.", "What the first signal looks for", "Findability", "Understanding", "Trust", "Choice", "Action", "Open the result in your account."]],
  ["src/components/free-check/guided-free-check-form-v3.tsx", ["use client", "GuidedFreeCheckFormV3", "requestFreeScanVerifyToViewHandoff", "resolveCustomerAccountContinuation", "source: \"free-check\"", "preferredDestination: \"/dashboard/reports/free-scan\"", "FREE_SCAN_SUBMITTED_KEY", "Scan strength", "hasStarted ? buildQualityScore(values) : 0", "First-use progress starts at zero until the customer types.", "Submit Free Scan", "Confirm your email to open the result."]],
  ["src/components/free-check/free-check-progress-guard.tsx", ["FreeCheckProgressGuard", "cendorq.free-check.progress.v1", "cendorq:free-check:submitted", "free_scan_progress_restored", "free_scan_progress_cleared"]],
  ["src/components/free-check/free-check-analytics.tsx", ["FreeCheckAnalytics"]],
  ["package.json", ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-free-check-command-route-elevation.mjs"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Free Check command route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Free Check command route validation passed.");

function expect(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
