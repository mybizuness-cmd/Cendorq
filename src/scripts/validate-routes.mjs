import { existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const canonicalRoutes = [
  "src/app/page.tsx",
  "src/app/free-check/page.tsx",
  "src/app/plans/page.tsx",
  "src/app/signup/page.tsx",
  "src/app/login/page.tsx",
  "src/app/verify-email/page.tsx",
  "src/app/dashboard/page.tsx",
  "src/app/dashboard/reports/page.tsx",
  "src/app/dashboard/reports/free-scan/page.tsx",
  "src/app/dashboard/billing/page.tsx",
  "src/app/dashboard/notifications/page.tsx",
  "src/app/dashboard/support/page.tsx",
  "src/app/dashboard/support/request/page.tsx",
  "src/app/dashboard/support/status/page.tsx",
  "src/app/checkout/start/page.tsx",
  "src/app/checkout/success/page.tsx",
  "src/lib/customer-platform-route-map.ts",
  "src/lib/customer-auth-orchestration.ts",
  "src/lib/pricing-checkout-orchestration.ts",
  "src/lib/cendorq-revenue-operating-system.ts",
  "src/lib/customer-revenue-workflow-runtime.ts",
  "src/lib/free-scan-report-methodology.ts",
];

for (const path of canonicalRoutes) {
  if (!existsSync(join(root, path))) failures.push(`Missing canonical route dependency: ${path}`);
}

if (failures.length) {
  console.error("Canonical route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Canonical route validation passed for ${canonicalRoutes.length} route and orchestration dependencies.`);
