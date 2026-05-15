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

expect(surfaces.home, ["Start Free Scan", "View Plans", "Scan. Review. Repair. Control.", "Start with the first signal. Move deeper only when it makes sense."]);
expect(surfaces.freeCheck, ["GuidedFreeCheckForm", "Free Scan", "AI-readiness", "business"]);
expect(surfaces.plans, ["Choose the right AI-readiness depth.", "CENDORQ_PLAN_PRICES", "Open Review page", "Open Repair page", "Open Control page"]);
expect(surfaces.planTemplate, ["getCendorqPlanPrice", "What this helps you decide", "Review all plans", "`${data.ctaLabel} — ${plan.price}`"]);
expect(surfaces.dashboard, ["Your Cendorq workspace is ready.", "one clear next action", "Start, Continue, or Open Result", "Open Review page"]);
expect(surfaces.billing, ["Payment should unlock the right readiness layer.", "Open Review page", "Open plan page", "Checkout success parity"]);
expect(surfaces.checkoutStart, ["Start checkout | Cendorq", "secure Stripe payment", "redirect(buildCheckoutDestination(plan.paymentLink, planKey, searchParams))", "client_reference_id", "cendorq_plan"]);
expect(surfaces.checkoutSuccess, ["Payment complete", "Payment confirmed", "CheckoutDashboardRedirect", "One next step", "Open your inbox"]);
expect(surfaces.pricingContract, ["amountCents: 49700", "amountCents: 149700", "amountCents: 59700", "CENDORQ_CHECKOUT_METADATA_KEYS"]);
expect(surfaces.authContract, ["Email magic link", "Click confirms and redirects to dashboard", "CUSTOMER_EMAIL_REVENUE_SEQUENCE"]);

forbidden(Object.values(surfaces), [
  "$750+",
  "$300/mo",
  "starting at",
  "template page",
  "generic page",
  "outcome warranty",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Front-to-back conversion standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Front-to-back conversion standard validation passed with Free Scan, fixed pricing, dashboard revenue path, checkout activation, and email re-entry synchronized.");

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
      if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains blocked phrase: ${phrase}`);
    }
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
