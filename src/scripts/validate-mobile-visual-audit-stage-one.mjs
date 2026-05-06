import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const homepagePath = "src/app/page.tsx";
const plansPath = "src/app/plans/page.tsx";
const checkoutPath = "src/app/checkout/start/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-mobile-visual-audit-stage-one.mjs";

expect(homepagePath, [
  "Mobile visual audit homepage",
  "Sharper first impression",
  "Above fold decision panel",
  "Find why customers do not choose you.",
  "Start with the safest read.",
  "First screen decision",
  "ABOVE_FOLD_DECISION",
  "Unclear in seconds",
  "Not trusted yet",
  "Found incorrectly",
  "Hard to act",
  "text-4xl",
  "gap-3",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(plansPath, [
  "Mobile visual audit pricing",
  "Compressed pricing mobile decision flow",
  "Pick the stage. Not the biggest package.",
  "Use the plan that matches the current decision.",
  "Unknown cause",
  "Need the real reason",
  "Know the fix target",
  "Need monthly watch",
  "slice(0, 2)",
  "text-4xl",
  "gap-3",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(checkoutPath, [
  "Mobile visual audit checkout",
  "Secure plan handoff",
  "Choose the checkout path that matches the work.",
  "No unfinished Stripe placeholder",
  "Start secure handoff",
  "CHECKOUT_HANDOFFS",
  "Deep Review checkout",
  "Build Fix checkout",
  "Ongoing Control checkout",
  "What happens after payment",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(homepagePath, [
  "Become the business customers understand, trust, find, and choose.",
  "Can they understand you quickly?",
  "Can search and AI describe you correctly?",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
]);

forbidden(plansPath, [
  "Choose the depth that can move revenue next.",
  "Pick the stage, not the biggest package.",
  "slice(0, 3)",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
]);

forbidden(checkoutPath, [
  "Checkout is being connected to Cendorq plan links.",
  "Stripe link coming next",
  "While the Stripe links are being added",
  "cursor-not-allowed",
  "disabled",
]);

boundedLength(homepagePath, 18000);
boundedLength(plansPath, 18500);
boundedLength(checkoutPath, 14500);

if (failures.length) {
  console.error("Mobile visual audit stage one validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Mobile visual audit stage one validation passed with sharper homepage, compressed pricing, and finished checkout handoff coverage.");

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

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for mobile visual audit stage one: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
