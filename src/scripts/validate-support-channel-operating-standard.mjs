import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["docs/support-channel-operating-standard.md", [
    "Support Channel Operating Standard",
    "right source of truth",
    "support@cendorq.com",
    "billing@cendorq.com",
    "reports@cendorq.com",
    "security@cendorq.com",
    "partners@cendorq.com",
    "legal@cendorq.com",
    "Dashboard-first support",
    "Billing support",
    "Report support",
    "AI-assisted support posture",
    "Owner setup checklist",
    "confirm SPF, DKIM, and DMARC posture",
  ]],
  ["src/app/dashboard/support/page.tsx", ["support", "dashboard"]],
  ["src/app/dashboard/support/status/page.tsx", ["support", "status"]],
  ["src/app/dashboard/billing/page.tsx", ["billing"]],
  ["src/app/dashboard/reports/page.tsx", ["Readiness proof vault", "Vault is source"]],
  ["docs/owner-operating-manual.md", ["dashboard/report vault is the canonical protected display location"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Support channel operating standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Support channel operating standard validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.toLowerCase().includes(String(phrase).toLowerCase())) failures.push(`${path} missing phrase: ${phrase}`);
}
