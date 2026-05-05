import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const surfaces = {
  home: "src/app/page.tsx",
  freeCheck: "src/app/free-check/page.tsx",
  plans: "src/app/plans/page.tsx",
  planTemplate: "src/components/plans/conversion-plan-page.tsx",
  dashboard: "src/app/dashboard/page.tsx",
  billing: "src/app/dashboard/billing/page.tsx",
  checkoutStart: "src/app/checkout/start/page.tsx",
  checkoutSuccess: "src/app/checkout/success/page.tsx",
  pricingContract: "src/lib/pricing-checkout-orchestration.ts",
  authContract: "src/lib/customer-auth-orchestration.ts",
};

for (const path of Object.values(surfaces)) {
  if (!existsSync(join(root, path))) failures.push(`Missing front-to-back conversion dependency: ${path}`);
}

expect(surfaces.home, ["Start free scan", "View pricing"]);
expect(surfaces.freeCheck, ["Find the decision break before you buy the wrong fix.", "GuidedFreeCheckForm"]);
expect(surfaces.plans, ["Choose the depth that can move revenue next.", "CENDORQ_PLAN_PRICES", "Unlock Deep Review", "Unlock Build Fix", "Start Ongoing Control"]);
expect(surfaces.planTemplate, ["getCendorqPlanPrice", "After payment:", "Unlock ${plan.name} ${plan.price}"]);
expect(surfaces.dashboard, ["Private revenue workspace", "Next best action", "Continue Free Scan", "See Deep Review"]);
expect(surfaces.billing, ["Turn the first read into the right paid next step.", "Best revenue move", "Unlock Deep Review", "After payment:"]);
expect(surfaces.checkoutStart, ["Start checkout", "Secure checkout", "Stripe link coming next"]);
expect(surfaces.checkoutSuccess, ["Checkout complete", "Payment complete", "Post-payment dashboard activation"]);
expect(surfaces.pricingContract, ["amountCents: 49700", "amountCents: 149700", "amountCents: 59700", "CENDORQ_CHECKOUT_METADATA_KEYS"]);
expect(surfaces.authContract, ["Email magic link", "Click confirms and redirects to dashboard", "CUSTOMER_EMAIL_REVENUE_SEQUENCE"]);

forbidden(Object.values(surfaces), [
  "$750+",
  "$300/mo",
  "starting at",
  "template page",
  "generic page",
  "guaranteed ROI",
  "guaranteed revenue",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Front-to-back conversion standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Front-to-back conversion standard validation passed with free scan, fixed pricing, dashboard revenue path, checkout activation, and email re-entry synchronized.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) return;
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
