import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const pricingContractPath = "src/lib/pricing-checkout-orchestration.ts";
const plansPath = "src/app/plans/page.tsx";
const planTemplatePath = "src/components/plans/conversion-plan-page.tsx";
const billingPath = "src/app/dashboard/billing/page.tsx";
const dashboardPath = "src/app/dashboard/page.tsx";
const checkoutStartPath = "src/app/checkout/start/page.tsx";
const checkoutSuccessPath = "src/app/checkout/success/page.tsx";

for (const path of [pricingContractPath, plansPath, planTemplatePath, billingPath, dashboardPath, checkoutStartPath, checkoutSuccessPath]) {
  if (!existsSync(join(root, path))) failures.push(`Missing conversion moat dependency: ${path}`);
}

expect(pricingContractPath, [
  "CENDORQ_PLAN_PRICES",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "amountCents: 49700",
  "amountCents: 149700",
  "amountCents: 59700",
  "CENDORQ_CHECKOUT_ORCHESTRATION",
  "CENDORQ_POST_PAYMENT_EMAILS",
]);

expect(plansPath, [
  "Choose the depth that can move revenue next.",
  "Every paid plan has a fixed price",
  "Unlock Deep Review",
  "Unlock Build Fix",
  "Start Ongoing Control",
  "Final fixed plan prices",
]);

expect(planTemplatePath, [
  "Unlock ${plan.name} ${plan.price}",
  "After payment:",
  "Use Deep Review at $497",
  "Use Build Fix at $1,497",
  "Use Ongoing Control at $597/month",
]);

expect(billingPath, [
  "Turn the first read into the right paid next step.",
  "Best revenue move",
  "Unlock Deep Review",
  "Fix what is costing choices",
  "Keep monthly control",
  "After payment:",
]);

expect(dashboardPath, [
  "Private revenue workspace",
  "Find the next move that can turn hesitation into revenue.",
  "Next best action",
  "Get the full reason",
  "Fix what costs choices",
]);

expect(checkoutStartPath, [
  "Secure checkout",
  "Unlock {plan.name} for {plan.price}",
  "Stripe link coming next",
]);

expect(checkoutSuccessPath, [
  "Payment complete",
  "Post-payment dashboard activation",
  "Backend work queue",
]);

forbidden([pricingContractPath, plansPath, planTemplatePath, billingPath, dashboardPath, checkoutStartPath, checkoutSuccessPath], [
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
  console.error("Conversion moat standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Conversion moat standard validation passed with fixed pricing, customer-facing checkout, dashboard revenue path, and post-payment activation coverage.");

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
