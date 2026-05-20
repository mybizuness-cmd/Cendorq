import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/plans/page.tsx";
const planDataPath = "src/app/plans/plan-data.ts";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-plans-handoff-runtime-integration.mjs";
const failures = [];

expect(pagePath, [
  "Choose the right AI Visibility and Readiness depth.",
  "Start with what you need now.",
  "Free Scan shows the first signal. Deep Review explains the cause. Build Fix repairs the weak point. Ongoing Control keeps AI Visibility and Readiness from drifting.",
  "PLAN_CARDS",
  "CENDORQ_PLAN_PRICES",
  "CTA_LABEL_BY_PLAN",
  "STAGE_BY_PLAN",
  "PURPOSE_BY_PLAN",
  "PLAN_ROUTE_BY_KEY",
  "One path. Four depths.",
  "Free Scan shows the first signal.",
  "Deep Review explains the cause.",
  "Build Fix repairs the selected weak point.",
  "Ongoing Control keeps the business watched.",
  "Cendorq does not guarantee rankings, leads, revenue, or AI placement.",
]);

expect(pagePath, [
  "free-scan",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "/free-check",
  "/plans/deep-review",
  "/plans/build-fix",
  "/plans/ongoing-control",
  "Start Free Scan",
  "Open Deep Review",
  "Open Build Fix",
  "Open Ongoing Control",
  "\"build-fix\": \"Repair\"",
]);

expect(pagePath, [
  "See the first place the business may be missing, unclear, under-trusted, less ready, or harder to choose.",
  "Understand what is weakening AI Visibility, Readiness, clarity, trust, proof, or choice before bigger work begins.",
  "Improve the page, message, proof, readiness gap, or action path that matters most.",
  "Keep AI Visibility and Readiness from drifting as search, AI answers, competitors, and customers change.",
]);

expect(planDataPath, [
  "Start with the first AI Visibility and Readiness signal",
  "A clearer AI Visibility and Readiness signal before paid work.",
  "Find what is weakening AI Visibility and Readiness",
  "Diagnosis evidence, readiness gaps, priorities, and a clearer next command.",
  "Repair the signal",
  "Focused Repair matters more than more activity.",
  "Keep AI Visibility and Readiness from drifting",
  "Ongoing Control keeps visibility, readiness, clarity, trusted proof, public signals, AI understanding, and customer action paths under ongoing review.",
]);

expect(packagePath, ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);
expect(routesChainPath, [validatorPath]);

forbidden(pagePath, [
  "Choose the right AI-readiness depth.",
  "Choose the right AI Visibility depth.",
  "Start with the level that matches what you already know.",
  "Scan finds the first signal, Review explains the cause, Repair improves a clear weak point, and Control keeps readiness from drifting.",
  "Keep AI Visibility from drifting as search, AI answers, competitors, and customers change.",
  "guaranteed ROI",
  "guaranteed outcome",
  "guaranteed refund",
  "guaranteed billing change",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

forbidden(planDataPath, [
  "Find what is weakening AI Visibility\",",
  "A clearer AI Visibility signal before paid work.",
  "Keep AI Visibility from drifting\",",
  "Focused repair matters more than more activity.",
  "AI Visibility only",
]);

if (failures.length) {
  console.error("Plans handoff runtime integration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plans handoff runtime integration validation passed with balanced AI Visibility and Readiness language, Scan Review Repair Control path, plan routes, stage labels, and route-chain coverage.");

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