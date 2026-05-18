import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/free-check/page.tsx";
const formPath = "src/components/free-check/guided-free-check-form-v3.tsx";
const progressGuardPath = "src/components/free-check/free-check-progress-guard.tsx";
const analyticsPath = "src/components/free-check/free-check-analytics.tsx";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-free-check-command-route-elevation.mjs";
const failures = [];

expect(pagePath, [
  "Free Scan | Cendorq",
  "Start the Cendorq Free Scan to see where your business may be missing, unclear, under-trusted, or harder for AI engines and customers to choose.",
  "Cendorq Free Scan",
  "AI visibility and readiness free scan",
  "FreeCheckProgressGuard",
  "FreeCheckAnalytics",
  "GuidedFreeCheckFormV3",
  "See where your business may be missing or unclear.",
  "Cendorq checks the signals around your business and shows where AI engines or customers may hesitate first.",
  "How the Free Scan moves from intake to protected results",
  "Start with what is already visible.",
  "Share what customers can see now.",
  "Cendorq checks the first visibility and readiness signal.",
  "Open the result in your account.",
  "After verification, the result opens inside your Cendorq account so your business details and next step stay connected.",
  "{ name: \"Free Scan\", path: \"/free-check\" }",
]);

expect(formPath, [
  "use client",
  "GuidedFreeCheckFormV3",
  "requestFreeScanVerifyToViewHandoff",
  "resolveCustomerAccountContinuation",
  "source: \"free-check\"",
  "preferredDestination: \"/dashboard/reports/free-scan\"",
  "requestedDestination: accountContinuation.primaryDestination",
  "FREE_SCAN_SUBMITTED_KEY",
  "Scan strength",
  "hasStarted ? buildQualityScore(values) : 0",
  "First-use progress starts at zero until the customer types.",
  "Use business context only. Do not enter private credentials.",
  "Submit Free Scan",
  "Confirm your email to open the result.",
  "dashboard Free Scan result path",
  "account continuation standard",
  "safe-data warnings",
  "recordFreeScanSubmitted",
  "window.localStorage.setItem(FREE_SCAN_SUBMITTED_KEY",
  "window.dispatchEvent(new Event(\"cendorq:free-check:submitted\"))",
]);

expect(progressGuardPath, [
  "FreeCheckProgressGuard",
  "cendorq.free-check.progress.v1",
  "cendorq:free-check:submitted",
  "free_scan_progress_restored",
  "free_scan_progress_cleared",
  "window.localStorage.removeItem(STORAGE_KEY)",
  "window.localStorage.setItem(STORAGE_KEY",
]);

expect(analyticsPath, [
  "FreeCheckAnalytics",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  validatorPath,
]);

forbidden(pagePath, [
  "Premium Free Scan room",
  "Open the result in your workspace.",
  "workspace access",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed business results",
  "guaranteed safe",
  "impossible to hack",
  "never liable",
  "liability-free",
  "rawPayload=",
  "rawEvidence=",
  "rawSecurityPayload=",
  "rawBillingData=",
  "internalNotes=",
  "operatorIdentity=",
  "riskScoringInternals=",
  "attackerDetails=",
  "session" + "Token=",
  "csrf" + "Token=",
  "admin" + "Key=",
  "support" + "Context" + "Key=",
]);

forbidden(formPath, [
  "dangerouslySetInnerHTML",
  "FREE_SCAN_PROGRESS_KEY",
  "recordFreeScanProgress",
  "readSavedFreeScanProgress",
  "workspace access",
  "rawPayload=",
  "rawEvidence=",
  "rawSecurityPayload=",
  "rawBillingData=",
  "internalNotes=",
  "operatorIdentity=",
  "riskScoringInternals=",
  "attackerDetails=",
  "session" + "Token=",
  "csrf" + "Token=",
  "admin" + "Key=",
  "support" + "Context" + "Key=",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed business results",
]);

if (failures.length) {
  console.error("Free Check command route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Free Check command route validation passed with current Free Scan page, protected verify-to-view handoff, account continuation, zero first-use progress, and route-chain coverage.");

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
