import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/app/dashboard/page.tsx", ["Support", "/dashboard/support"]],
  ["src/app/dashboard/support/status/page.tsx", ["SupportStatusList", "CUSTOMER_SUPPORT_STATUS_CONTRACTS", "Review status", "Send safe update", "support-status-list", "focus:outline-none", "focus:ring-2"]],
  ["src/components/customer-support/support-status-list.tsx", ["SupportStatusList", "fetch(\"/api/customer/support/status\"", "Refresh status", "WorkStartGatePanel", "CommunicationPlanPanel", "buildSafeSupportUpdatePath", "encodeURIComponent(supportRequestId)"]],
  ["src/lib/customer-platform-route-map.ts", ["dashboardSupportStatus", "/dashboard/support/status", "Support status", "support-status-visible"]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-dashboard-support-status-entry.mjs"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Dashboard support status entry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard support status entry validation passed.");

function expect(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
