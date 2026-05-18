import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const pagePath = "src/app/free-check/page.tsx";
const formPath = "src/components/free-check/guided-free-check-form-v3.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-elevated-free-scan-form-v3.mjs";

expect(pagePath, [
  "GuidedFreeCheckFormV3",
  "@/components/free-check/guided-free-check-form-v3",
  "FreeCheckAnalytics",
  "FreeCheckProgressGuard",
  "Find the first place your business may be unclear.",
  "Cendorq looks at the signals around your business",
  "Open the result in your workspace.",
]);

reject(pagePath, [
  "GuidedFreeCheckFormFocused",
  "@/components/free-check/guided-free-check-form-focused",
]);

expect(formPath, [
  "GuidedFreeCheckFormV3",
  "ApiResponse",
  "signalQuality",
  "quality: data.signalQuality",
  "requestFreeScanVerifyToViewHandoff",
  "preferredDestination: \"/dashboard/reports/free-scan\"",
  "requestedDestination: accountContinuation.primaryDestination",
  "verificationTokenIssued: true",
  "safeReleaseReady: false",
  "handoff.safeCustomerMessage",
  "handoff.reportVisibilityRule",
  "Compare plans",
  "SUCCESS_NEXT_STEPS",
  "RECOVERY_TILES",
  "validateFields",
  "buildQualityScore",
  "buildNextMove",
  "Use business context only. Do not enter private credentials.",
  "const [values, setValues] = useState<FormValues>(INITIAL_VALUES)",
  "hasStarted ? buildQualityScore(values) : 0",
  "First-use progress starts at zero until the customer types.",
]);

reject(formPath, [
  "readSavedFreeScanProgress",
  "recordFreeScanProgress(values)",
  "Step 01",
  "Step 02",
  "Step 03",
  "Step 04",
  "sm:grid-cols-4",
  "Premium free scan",
]);

expect(routesChainPath, [validatorPath]);

boundedLength(formPath, 26000);
boundedLength(pagePath, 12500);

if (failures.length) {
  console.error("Elevated Free Scan form v3 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Elevated Free Scan form v3 validation passed with customer-safe Free Scan, zero first-use progress, dashboard result handoff, recovery guidance, and no stale saved-progress restore.");

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

function reject(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} should not include phrase: ${phrase}`);
  }
}

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for focused Free Scan form standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
