import { existsSync, readFileSync } from "node:fs";
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
];

for (const path of canonicalRoutes) {
  if (!existsSync(join(root, path))) failures.push(`Missing canonical route dependency: ${path}`);
}

expect("src/app/plans/page.tsx", ["CENDORQ_PLAN_PRICES"]);
expect("src/app/dashboard/page.tsx", ["Private revenue workspace"]);
expect("src/app/checkout/start/page.tsx", ["Start checkout"]);
expect("src/app/checkout/success/page.tsx", ["Checkout complete"]);
expect("src/app/login/page.tsx", ["Customer login"]);
expect("src/app/verify-email/page.tsx", ["Confirm your email"]);
expect("src/lib/pricing-checkout-orchestration.ts", ["amountCents: 49700", "amountCents: 149700", "amountCents: 59700"]);
expect("src/lib/customer-platform-route-map.ts", ["/login", "/verify-email", "verification click redirects to dashboard"]);

if (failures.length) {
  console.error("Canonical route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Canonical route validation passed for ${canonicalRoutes.length} route and orchestration dependencies.`);

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

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
