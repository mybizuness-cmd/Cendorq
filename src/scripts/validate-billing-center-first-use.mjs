import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/billing/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-billing-center-first-use.mjs";
const failures = [];

expect(pagePath, [
  "Readiness plan depth",
  "Know what is active, what unlocked, and what depth comes next.",
  "This is the readiness-depth control point: access, boundaries, recovery, and the next business move.",
  "Open Review page",
  "Compare readiness path",
  "Current access",
  "Next depth",
  "Safety",
  "No private payment details",
  "BILLING_STATUS",
  "PAID_PLAN_COMMANDS",
  "BILLING_ACTIONS",
  "BILLING_SAFETY_RULES",
  "BILLING_HANDOFFS",
  "Payment should unlock the right readiness layer.",
  "Review",
  "Repair",
  "Control",
  "Open plan page",
  "Compare readiness depth",
  "Open signal feed",
  "Ask access help",
  "Money moments should feel calm, exact, and recoverable.",
  "Account access should show a safe customer projection, not raw provider payloads or internal IDs.",
  "Plan guidance must separate current access, pending actions, and future readiness depth.",
  "Activation must preserve the same includes, exclusions, workflow, and post-payment next step shown in checkout success.",
  "Billing actions route to plan detail pages before payment.",
  "AI Readiness Review $497",
  "Signal Repair $1,497",
  "Readiness Control $597/month",
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

expect(packagePath, [
  "validate:routes",
  "validate-billing-center-first-use.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

expect(routesChainPath, [validatorPath]);

forbidden(pagePath, [
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage",
  "sessionStorage",
  "card number required",
]);

if (failures.length) {
  console.error("Billing center first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Billing center first use validation passed with current readiness-depth billing flow, safe projection rules, and owner posture coverage.");

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
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
