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
  "Result opens in dashboard",
  "Free Scan form visible within the first quarter of the page",
  "Dedicated dashboard Free Scan result path after verification",
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
  "requestedDestination: \"/dashboard/reports/free-scan\"",
  "verificationTokenIssued: true",
  "safeReleaseReady: false",
  "handoff.senderDisplay",
  "handoff.checkInboxCopy",
  "handoff.subject",
  "handoff.preheader",
  "handoff.safeCustomerMessage",
  "handoff.reportVisibilityRule",
  "Compare all plans",
  "SUCCESS_NEXT_STEPS",
  "RECOVERY_TILES",
  "validateFields",
  "buildQualityScore",
  "buildNextMove",
  "No passwords, cards, keys, or tokens",
  "Current step only. No noisy four-step badge row.",
  "Free Scan form v3 preserves API payload, validation, signal quality, routing hint, verify-to-view handoff, dashboard Free Scan result path, inbox guidance, plan-fit CTA, compare plans CTA, recovery guidance, and safe-data warnings. It removes the visible four-step badge row.",
]);

reject(formPath, [
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

console.log("Elevated Free Scan form v3 validation passed with old setup preserved, stronger questions, dashboard result handoff, recovery guidance, and no noisy four-step badge row.");

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
