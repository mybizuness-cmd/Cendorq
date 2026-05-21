import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/app/dashboard/billing/page.tsx", ["projectCustomerPlatformHandoff", "BILLING_HANDOFFS", "Know what is active, what unlocked, and what depth comes next.", "AI Visibility depth control point", "Payment should unlock the right AI Visibility layer.", "Money moments should feel calm, exact, and recoverable.", "handoff.currentState", "handoff.safeNextAction", "handoff.recoveryPath", "handoff.connectedDestination", "handoff.decision", "dashboard-to-billing", "billing-to-plans", "billing-to-support", "customerOwned: true", "verifiedAccess: true", "safeProjectionReady: true", "No private payment details", "future AI Visibility depth"]],
  ["docs/owner-maximum-protection-posture.md", ["# Owner Maximum Protection Posture", "Protected customer and report surfaces require the correct verified access path."]],
  ["package.json", ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-billing-handoff-runtime-integration.mjs"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Billing handoff runtime integration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Billing handoff runtime integration validation passed.");

function expect(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
