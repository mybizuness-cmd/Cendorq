import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const canonicalRoutes = [
  { path: "src/app/page.tsx", label: "home" },
  { path: "src/app/free-check/page.tsx", label: "free check" },
  { path: "src/app/plans/page.tsx", label: "plans" },
  { path: "src/app/plans/deep-review/page.tsx", label: "deep review" },
  { path: "src/app/plans/build-fix/page.tsx", label: "build fix" },
  { path: "src/app/plans/ongoing-control/page.tsx", label: "ongoing control" },
  { path: "src/app/connect/page.tsx", label: "contact" },
  { path: "src/app/signup/page.tsx", label: "signup" },
  { path: "src/app/login/page.tsx", label: "login" },
  { path: "src/app/verify-email/page.tsx", label: "verify email" },
  { path: "src/app/dashboard/page.tsx", label: "dashboard" },
  { path: "src/app/dashboard/reports/page.tsx", label: "report vault" },
  { path: "src/app/dashboard/billing/page.tsx", label: "billing" },
  { path: "src/app/dashboard/notifications/page.tsx", label: "notifications" },
  { path: "src/app/dashboard/support/page.tsx", label: "support" },
  { path: "src/app/dashboard/support/request/page.tsx", label: "support request" },
  { path: "src/app/dashboard/support/status/page.tsx", label: "support status" },
  { path: "src/app/checkout/start/page.tsx", label: "checkout start" },
  { path: "src/app/checkout/success/page.tsx", label: "checkout success" },
  { path: "src/app/api/customer/notifications/route.ts", label: "customer notifications api" },
  { path: "src/app/api/customer/support/request/route.ts", label: "customer support request api" },
  { path: "src/app/api/customer/support/request/update/route.ts", label: "customer support request update api" },
  { path: "src/app/api/customer/support/status/route.ts", label: "customer support status api" },
];

for (const route of canonicalRoutes) {
  if (!existsSync(join(root, route.path))) failures.push(`Missing canonical route: ${route.label} at ${route.path}`);
}

expect("src/app/plans/page.tsx", ["CENDORQ_PLAN_PRICES", "Unlock Deep Review", "Unlock Build Fix", "Start Ongoing Control"]);
expect("src/app/dashboard/page.tsx", ["Private revenue workspace", "Next best action", "Continue Free Scan"]);
expect("src/app/checkout/start/page.tsx", ["Start checkout", "Secure checkout"]);
expect("src/app/checkout/success/page.tsx", ["Checkout complete", "Payment complete"]);
expect("src/app/login/page.tsx", ["Customer login", "Magic link first"]);
expect("src/app/verify-email/page.tsx", ["Confirm your email", "Open dashboard after confirmation"]);
expect("src/lib/pricing-checkout-orchestration.ts", ["amountCents: 49700", "amountCents: 149700", "amountCents: 59700"]);
expect("src/lib/customer-platform-route-map.ts", ["/login", "/checkout", "verification click redirects to dashboard"]);

forbidden(canonicalRoutes.map((route) => route.path), [
  "$750+",
  "$300/mo",
  "starting at",
  "generic page",
  "template page",
  "guaranteed ROI",
  "guaranteed revenue",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Canonical route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Canonical route validation passed for ${canonicalRoutes.length} routes, including customer re-entry and checkout activation.`);

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

function forbidden(paths, phrases) {
  for (const path of paths) {
    if (!existsSync(join(root, path))) continue;
    const text = read(path).toLowerCase();
    for (const phrase of phrases) {
      if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
    }
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
