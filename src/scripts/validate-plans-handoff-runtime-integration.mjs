import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/plans/page.tsx";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-plans-handoff-runtime-integration.mjs";
const failures = [];

expect(pagePath, [
  "Choose the right AI-readiness depth.",
  "Start with the level that matches what you already know.",
  "Scan finds the first signal, Review explains the cause, Repair improves a clear weak point, and Control keeps readiness from drifting.",
  "PLAN_CARDS",
  "CENDORQ_PLAN_PRICES",
  "CTA_LABEL_BY_PLAN",
  "STAGE_BY_PLAN",
  "PURPOSE_BY_PLAN",
  "PLAN_ROUTE_BY_KEY",
  "One path. Four depths.",
  "Free Scan finds the first signal.",
  "Review explains the likely cause.",
  "Repair improves the selected weak point.",
  "Control keeps the business watched.",
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
  "Open Review page",
  "Open Repair page",
  "Open Control page",
]);

expect(pagePath, [
  "Find the first place the business may be unclear, under-trusted, or harder to choose.",
  "Understand what is weakening clarity, trust, proof, or choice before bigger work begins.",
  "Improve the page, message, proof, or action path that matters most.",
  "Keep readiness from drifting as search, AI answers, competitors, and customers change.",
]);

expect(packagePath, ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);
expect(routesChainPath, [validatorPath]);

forbidden(pagePath, [
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

if (failures.length) {
  console.error("Plans handoff runtime integration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plans handoff runtime integration validation passed with current plan depth, route, stage, CTA, value-separation, and route-chain coverage.");

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
