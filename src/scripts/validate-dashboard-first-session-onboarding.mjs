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
  "Private AI readiness control center",
  "Your Cendorq account is ready.",
  "Cendorq keeps your scan, reports, plans, billing, support, and one clear next action in one protected dashboard.",
  "One next step.",
  "start the scan, continue the scan, open the result, or choose the next plan",
  "Dashboard decision summary",
  "Next best move",
  "Finish the first signal.",
  "Open what is ready",
  "Get unstuck fast",
  "Command path",
  "Scan. Review. Repair. Control.",
  "No cheap dashboard blocks",
  "No clutter wall",
  "No internal conversion role labels",
  "Reports",
  "Billing",
  "Notifications",
  "Support",
  "Sign out",
  "Resolve blockers without sharing private passwords.",
  "Open protected scan and review outputs when they are ready.",
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
  "Visibility command center",
  "Private visibility command center",
  "Know what the market can see, trust, and act on next.",
  "This is not an account page.",
  "Scan. Diagnose. Fix. Control.",
  "A workspace can exist before a scan.",
  "Your Cendorq workspace is ready.",
  "safeProjectionReady",
  "projectCustomerPlatformHandoff",
  "resolveCendorqCustomerJourney",
  "fulfillmentState",
  "backendWorkState",
  "missingRequirements",
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

console.log("Dashboard first session onboarding validation passed with account-ready dashboard copy, one next action, recovery links, and owner posture coverage.");

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
