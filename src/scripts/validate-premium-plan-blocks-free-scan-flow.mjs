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
const validatorPath = "src/scripts/validate-premium-plan-blocks-free-scan-flow.mjs";

expect(homepagePath, [
  "Premium plan blocks",
  "Premium plan stage system",
  "Four levels. Four different jobs. No cheap bundle confusion.",
  "Remove useless final boundary block before footer",
  "Plan path",
  "01",
  "02",
  "03",
  "04",
  "Monthly decision support",
  "shadow-[0_28px_100px_rgba(2,8,23,0.42)]",
  "hover:-translate-y-0.5",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(plansPath, [
  "Premium pricing decision system",
  "Buy the right depth. Nothing extra. Nothing vague.",
  "Four premium pricing cards",
  "Each plan buys a different business action.",
  "First signal",
  "Cause-level diagnosis",
  "Scoped implementation",
  "Monthly decision support",
  "BUYER_MOMENT_BY_PLAN",
  "shadow-[0_28px_100px_rgba(2,8,23,0.42)]",
  "hover:-translate-y-0.5",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(freeScanPath, [
  "Free Scan form should be visible within the first quarter of the page.",
  "Free Scan form first",
  "Start the scan.",
  "Answer the form now.",
  "lg:grid-cols-[0.52fr_1.48fr]",
  "FREE_SCAN_PROMISE",
  "Form visible early",
  "Business context only",
  "No passwords, cards, private keys, or tokens",
  "Result path after verification",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(footerPath, [
  "Do not buy the wrong fix.",
  "Start with the first signal. Move into diagnosis, scoped implementation, or monthly control only when the stage fits.",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "$597/mo",
  "shadow-[0_28px_100px_rgba(2,8,23,0.45)]",
  "hover:-translate-y-0.5",
  "Start Free Scan",
  "Compare plans",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(planTemplatePath, [
  "Customer-led plan page",
  "Speak directly to the customer",
  "Is this the right plan?",
  "Best for you if",
  "Do not choose this if",
  "CUSTOMER_DECISION_PROMPTS",
  "You know something is off, but not what to fix first.",
  "You need the real reason before spending bigger money.",
  "You know the weak point and need it improved.",
  "You need the business watched and guided monthly.",
  "customerPrompt.warning",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(homepagePath, [
  "Homepage plan boundary rules",
  "Free Scan is a first signal, not a full diagnosis.",
  "Build Fix is scoped implementation, not unlimited site work.",
  "cheap tiles",
  "cheap cards",
]);

forbidden(plansPath, [
  "Compressed pricing mobile decision flow",
  "Pick the stage. Not the biggest package.",
  "PLAN_VALUE_NO_OVERLAP_MATRIX",
  "slice(0, 2)",
  "system-surface rounded-[1.25rem] p-4 transition hover:scale",
]);

forbidden(freeScanPath, [
  "Free Scan journey",
  "From safe context to a protected first result.",
  "Free Scan boundary standards",
  "View Free Scan result path",
  "mt-8 grid gap-4 md:grid-cols-3",
]);

forbidden(footerPath, [
  "rounded-[1.35rem] border border-white/8 bg-white/[0.025]",
  "Start with a first signal. Move deeper only when the stage fits.",
]);

forbidden(planTemplatePath, [
  "Best for\"",
  "Not for\"",
  "data.painTitle}</h2>",
]);

boundedLength(homepagePath, 18000);
boundedLength(plansPath, 17500);
boundedLength(freeScanPath, 14500);
boundedLength(footerPath, 12500);
boundedLength(planTemplatePath, 14500);

if (failures.length) {
  console.error("Premium plan blocks and Free Scan flow validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Premium plan blocks and Free Scan flow validation passed with stronger stage cards, premium pricing, higher form, stronger footer, and customer-led plan pages.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for the premium visual-flow standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
