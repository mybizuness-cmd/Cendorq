import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const activePublicFiles = [
  "src/app/page.tsx",
  "src/app/free-check/page.tsx",
  "src/components/free-check/guided-free-check-form-v3.tsx",
  "src/app/plans/page.tsx",
  "src/app/plans/deep-review/page.tsx",
  "src/app/plans/build-fix/page.tsx",
  "src/app/plans/ongoing-control/page.tsx",
  "src/components/plans/conversion-plan-page.tsx",
  "src/layout/site-header.tsx",
  "src/layout/site-header-conversion.tsx",
  "src/layout/site-footer.tsx",
  "src/lib/pricing-checkout-orchestration.ts",
];

const requiredCurrentLanguage = [
  "AI Engine Readiness",
  "Free Scan",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "Scan",
  "Review",
  "Repair",
  "Control",
];

const forbiddenActiveLanguage = [
  "Free Market Signal Scan",
  "Free Search Presence Scan",
  "Search Presence OS",
  "Visibility Blueprint",
  "Presence Infrastructure",
  "Presence Command",
  "Market Command Intelligence",
  "Deep Review is",
  "Build Fix is",
  "Ongoing Control is",
  "Diagnose before fixing",
  "Unlock Build Fix",
  "Unlock Ongoing Control",
  "Compare pricing",
  "After payment:",
  "Do not treat this",
  "Business context only",
  "No private credentials or payment details",
  "Protected dashboard result after verification",
  "Dashboard result preview",
  "A signal you can actually use",
  "Business seen by customers",
  "First read",
  "Cause proof",
  "Focused change",
  "Monthly watch",
];

const forbiddenActiveRoutes = [
  "/pricing",
  "/pricing/full-diagnosis",
  "/pricing/optimization",
  "/pricing/monthly-partner",
  "/diagnosis",
  "/contact",
  "/profile",
  "/faq",
];

for (const file of activePublicFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing active public drift file: ${file}`);
}

const combined = activePublicFiles
  .filter((file) => existsSync(join(root, file)))
  .map((file) => `\n/* ${file} */\n${read(file)}`)
  .join("\n");

for (const phrase of requiredCurrentLanguage) {
  if (!combined.includes(phrase)) failures.push(`Missing current public language: ${phrase}`);
}

for (const phrase of forbiddenActiveLanguage) {
  if (combined.includes(phrase)) failures.push(`Forbidden old public language found in active surfaces: ${phrase}`);
}

for (const route of forbiddenActiveRoutes) {
  if (combined.includes(route)) failures.push(`Forbidden old public route found in active surfaces: ${route}`);
}

expect("src/app/page.tsx", [
  "If AI engines cannot understand your business",
  "Start with the Free Scan.",
  "See the first place your business may be unclear, under-trusted, or harder to choose.",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
]);

expect("src/app/free-check/page.tsx", [
  "See the first signal before you buy deeper work.",
  "Cendorq checks whether your business is clear enough for AI engines and customers",
  "GuidedFreeCheckFormV3",
]);

expect("src/components/free-check/guided-free-check-form-v3.tsx", [
  "Start with what customers see.",
  "requestFreeScanVerifyToViewHandoff",
  "requestedDestination: \"/dashboard/reports/free-scan\"",
  "See AI Readiness Review",
  "See Signal Repair",
  "See Readiness Control",
]);

expect("src/app/plans/page.tsx", [
  "Choose the right AI-readiness depth.",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "AI Readiness Review $497",
  "Signal Repair $1,497",
  "Readiness Control $597/mo",
]);

expect("src/components/plans/conversion-plan-page.tsx", [
  "What this helps you decide",
  "Best when",
  "Not the right first step when",
  "AI Readiness Review $497",
  "Signal Repair $1,497",
  "Readiness Control $597/mo",
]);

expect("src/layout/site-header-conversion.tsx", [
  "label: \"AI Readiness\"",
  "label: \"Plans\"",
  "Sign in",
  "Start Free Scan",
]);

expect("src/lib/pricing-checkout-orchestration.ts", [
  "name: \"AI Readiness Review\"",
  "name: \"Signal Repair\"",
  "name: \"Readiness Control\"",
  "key: \"deep-review\"",
  "key: \"build-fix\"",
  "key: \"ongoing-control\"",
]);

if (failures.length) {
  console.error("Public drift validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public drift validation passed with AI Engine Readiness naming, clean public pages, preserved internal checkout keys, and no stale public plan clutter.");

function expect(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
