import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/app/dashboard/reports/page.tsx", ["projectCustomerPlatformHandoff", "REPORT_VAULT_HANDOFFS", "AI Visibility proof vault", "Paid plan report delivery operating system", "Pending, draft, or unavailable reports must never look final.", "handoff.currentState", "handoff.safeNextAction", "handoff.recoveryPath", "handoff.connectedDestination", "handoff.decision", "free-scan-to-report-vault", "dashboard-to-report-vault", "report-vault-to-support", "report-vault-to-plans", "customerOwned: true", "verifiedAccess: true", "safeProjectionReady: true", "pendingAsFinalRisk: true", "Scan, Review, Repair, and Control report types must remain visibly separate.", "Paid report actions route to plan detail pages before payment."]],
  ["docs/owner-maximum-protection-posture.md", ["# Owner Maximum Protection Posture", "Protected customer and report surfaces require the correct verified access path."]],
  ["package.json", ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-report-vault-handoff-runtime-integration.mjs"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Report vault handoff runtime integration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report vault handoff runtime integration validation passed.");

function expect(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
