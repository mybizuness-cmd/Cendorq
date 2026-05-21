import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/app/plans/page.tsx", ["Choose the right AI Visibility and Readiness depth.", "Start with what you need now.", "PLAN_CARDS", "CENDORQ_PLAN_PRICES", "CTA_LABEL_BY_PLAN", "STAGE_BY_PLAN", "PURPOSE_BY_PLAN", "PLAN_ROUTE_BY_KEY", "One path. Four depths.", "free-scan", "deep-review", "build-fix", "ongoing-control", "/free-check", "/plans/deep-review", "/plans/build-fix", "/plans/ongoing-control", "Start Free Scan", "Open Review page", "Open Repair page", "Open Control page", "\"build-fix\": \"Repair\"", "Cendorq does not guarantee rankings, leads, revenue, or AI placement."]],
  ["src/app/plans/plan-data.ts", ["Start with the first AI Visibility and Readiness signal", "A clearer AI Visibility and Readiness signal before paid work.", "Find what is weakening AI Visibility and Readiness", "Diagnosis evidence, readiness gaps, priorities, and a clearer next command.", "Repair the signal", "Focused repair matters more than more activity.", "Keep AI Visibility and Readiness from drifting"]],
  ["package.json", ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-plans-handoff-runtime-integration.mjs"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Plans handoff runtime integration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plans handoff runtime integration validation passed.");

function expect(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
