import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/app/page.tsx", ["Start Free Scan", "Review Plans", "No card prices", "AI Readiness anchor"]],
  ["src/app/plans/page.tsx", ["Scan. Review. Repair. Control.", "Free Scan $0", "AI Readiness Review $497", "Signal Repair $1,497", "Readiness Control $597/mo"]],
  ["src/app/dashboard/dashboard-business-command-center.tsx", ["Conversion command center", "This is where Free Scan turns into the right paid depth.", "Every lane should lead to proof, scope, or the next paid depth"]],
  ["src/app/dashboard/billing/page.tsx", ["Readiness plan depth", "Billing center first", "Safe PDFs"]],
  ["src/app/dashboard/reports/page.tsx", ["Readiness proof vault", "Vault is source", "Messages mirrored", "PDFs gated"]],
  ["src/app/dashboard/support/page.tsx", ["Readiness resolution routing", "Acknowledge first", "One next move", "Mirror continuity", "Document-safe recovery"]],
  ["src/lib/unified-experience-alignment.ts", ["UNIFIED_EXPERIENCE_ALIGNMENT", "homepage pricing clutter", "cheap-looking generic blocks", "disconnected dashboard surface"]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-surface-level-alignment.mjs"]],
  ["src/scripts/validate-routes-chain-integrity.mjs", ["src/scripts/validate-surface-level-alignment.mjs"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Surface level alignment validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Surface level alignment validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
