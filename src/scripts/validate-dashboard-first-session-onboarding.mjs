import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const dashboardPath = "src/app/dashboard/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-dashboard-first-session-onboarding.mjs";

expect(dashboardPath, [
  "Your Cendorq workspace is ready.",
  "Cendorq checks this device for scan progress and shows one clear next action",
  "One next step.",
  "The dashboard should not force a purchase or assume a scan exists.",
  "Workspace state",
  "Access ready",
  "Recommended first move",
  "One clear action",
  "Unlocked now",
  "Account access",
  "Not forced",
  "Paid depth",
  "Cendorq keeps the next step separate.",
  "A workspace can exist before a scan.",
  "A scan can exist before a paid review.",
  "A purchase can exist before delivery starts.",
  "Reports",
  "Billing",
  "Notifications",
  "Support",
  "Open protected scan and review outputs when they are ready.",
  "See plan access, invoices, and checkout recovery paths.",
  "Resolve blockers without sending private details.",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(packagePath, ["validate:routes", "validate-owner-maximum-protection-posture.mjs"]);
expect(routesChainPath, [validatorPath]);

forbidden(dashboardPath, [
  "guaranteed outcome",
  "make unsupported promises",
  "use fake urgency",
  "browser storage for protected state",
]);

if (failures.length) {
  console.error("Dashboard first session onboarding validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard first session onboarding validation passed with current one-action dashboard, recovery links, route-chain, and owner posture coverage.");

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
