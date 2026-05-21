import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/lib/customer-platform-route-map.ts", ["dashboardSupport", "/dashboard/support", "Support and corrections"]],
  ["src/app/dashboard/page.tsx", ["Support", "/dashboard/support"]],
  ["src/app/dashboard/support/page.tsx", ["SUPPORT_ROUTES", "PLAN_SUPPORT", "SUPPORT_RULES", "Track status", "Start protected request", "Scan", "Review", "Repair", "Control", "focus:outline-none", "focus:ring-2"]],
  ["docs/owner-maximum-protection-posture.md", ["# Owner Maximum Protection Posture", "Protected customer and report surfaces require the correct verified access path."]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-customer-support-center.mjs"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Customer support center validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support center validation passed.");

function expect(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
