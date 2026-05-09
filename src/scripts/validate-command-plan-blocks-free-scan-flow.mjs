import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const homepagePath = "src/app/page.tsx";
const plansPath = "src/app/plans/page.tsx";
const freeScanPath = "src/app/free-check/page.tsx";
const footerPath = "src/layout/site-footer.tsx";
const planTemplatePath = "src/components/plans/conversion-plan-page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-command-plan-blocks-free-scan-flow.mjs";

expect(homepagePath, [
  "AI Engine Readiness",
  "AI-readiness starts with business clarity.",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "Free Scan",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "Start Free Scan",
  "No AI placement promises",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(plansPath, [
  "AI readiness plans",
  "Choose the depth that matches the evidence.",
  "Each plan buys a different level of readiness.",
  "Start with the signal. Pay for deeper work only when the stage fits: Review, Repair, then Control.",
  "Free Scan $0",
  "AI Readiness Review $497",
  "Signal Repair $1,497",
  "Readiness Control $597/mo",
  "Start Free Scan",
  "Start Review",
  "Start Repair",
  "Start Control",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(freeScanPath, [
  "Free Scan",
  "See the first signal before you buy the fix.",
  "Cendorq checks whether your business is clear enough for AI engines and customers to understand, trust, and choose before deeper work begins.",
  "Business context only",
  "No private credentials or payment details",
  "Protected dashboard result after verification",
  "Result opens in dashboard",
  "Can AI engines understand you?",
  "Can buyers believe you?",
  "Can customers choose you?",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(footerPath, [
  "AI engine readiness for businesses that need to be understood, trusted, and chosen.",
  "Free Scan is an entry signal, not a guarantee of rankings, leads, revenue, or AI placement.",
  "Privacy",
  "Terms",
  "Disclaimer",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(planTemplatePath, [
  "Customer-led plan page",
  "Speak directly to the customer",
  "Is this the right layer?",
  "Best for you if",
  "Do not choose this if",
  "CUSTOMER_DECISION_PROMPTS",
  "You need the first signal before you spend deeper.",
  "You need evidence before bigger changes.",
  "The weak signal is clear enough to repair.",
  "Readiness needs to be watched over time.",
  "Free Scan is a first read, not full review, implementation, monitoring, or a guaranteed outcome.",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(homepagePath, [
  "Visibility command path",
  "Scan. Diagnose. Fix. Control.",
  "Four levels. Four different jobs. No cheap bundle confusion.",
  "Homepage plan boundary rules",
  "Free Scan is a first signal, not a full diagnosis.",
  "Build Fix is scoped implementation, not unlimited site work.",
  "cheap tiles",
  "cheap cards",
]);

forbidden(plansPath, [
  "Visibility command path",
  "Buy the right depth. Nothing extra. Nothing vague.",
  "Each plan buys a different level of control.",
  "Cause-level diagnosis",
  "Compressed pricing mobile decision flow",
  "Pick the stage. Not the biggest package.",
  "PLAN_VALUE_NO_OVERLAP_MATRIX",
]);

forbidden(freeScanPath, [
  "Start the scan.",
  "Answer the form now.",
  "Free Scan journey",
  "From safe context to a protected first result.",
  "Free Scan boundary standards",
  "View Free Scan result path",
  "No passwords, cards, private keys, or tokens",
]);

forbidden(footerPath, [
  "Do not buy the wrong fix.",
  "Move into diagnosis",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "Start with a first signal. Move deeper only when the stage fits.",
]);

forbidden(planTemplatePath, [
  "full diagnosis",
  "full root-cause diagnosis",
  "Best for\"",
  "Not for\"",
  "data.painTitle}</h2>",
]);

boundedLength(homepagePath, 18000);
boundedLength(plansPath, 18500);
boundedLength(freeScanPath, 14500);
boundedLength(footerPath, 12500);
boundedLength(planTemplatePath, 14500);

if (failures.length) {
  console.error("AI readiness plan blocks and Free Scan flow validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("AI readiness plan blocks and Free Scan flow validation passed with Scan, Review, Repair, Control positioning, early Free Scan clarity, strong footer boundaries, and customer-led plan pages.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for the AI readiness visual-flow standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
