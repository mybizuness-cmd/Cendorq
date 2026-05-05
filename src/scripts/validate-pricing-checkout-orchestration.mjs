import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const contractPath = "src/lib/pricing-checkout-orchestration.ts";
const pricingPath = "src/app/plans/page.tsx";
const planTemplatePath = "src/components/plans/conversion-plan-page.tsx";
const billingPath = "src/app/dashboard/billing/page.tsx";
const checkoutStartPath = "src/app/checkout/start/page.tsx";
const checkoutSuccessPath = "src/app/checkout/success/page.tsx";

for (const path of [contractPath, pricingPath, planTemplatePath, billingPath, checkoutStartPath, checkoutSuccessPath]) {
  if (!existsSync(join(root, path))) failures.push(`Missing pricing checkout dependency: ${path}`);
}

expect(contractPath, [
  "CENDORQ_PLAN_PRICES",
  "amountCents: 49700",
  "amountCents: 149700",
  "amountCents: 59700",
  "stripeMode: \"payment\"",
  "stripeMode: \"subscription\"",
  "/checkout/start?plan=deep-review",
  "/checkout/start?plan=build-fix",
  "/checkout/start?plan=ongoing-control",
  "CENDORQ_CHECKOUT_ORCHESTRATION",
  "CENDORQ_CHECKOUT_METADATA_KEYS",
  "CENDORQ_POST_PAYMENT_EMAILS",
]);

expect(pricingPath, ["CENDORQ_PLAN_PRICES", "Unlock Deep Review", "Unlock Build Fix", "Start Ongoing Control"]);
expect(planTemplatePath, ["getCendorqPlanPrice", "After payment:"]);
expect(billingPath, ["getPaidCendorqPlanPrice", "Unlock Deep Review", "After payment:"]);
expect(checkoutStartPath, ["Start checkout | Cendorq", "Secure checkout", "Stripe link coming next"]);
expect(checkoutSuccessPath, ["Checkout complete | Cendorq", "Payment complete", "Post-payment dashboard activation"]);

forbidden([pricingPath, planTemplatePath, billingPath, checkoutStartPath, checkoutSuccessPath], [
  "$750+",
  "$300/mo",
  "starting at",
  "lorem ipsum",
  "template page",
  "generic page",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed result",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Pricing checkout orchestration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Pricing checkout orchestration validation passed. Final prices, checkout start, checkout success, dashboard billing, plan pages, metadata, and post-payment emails stay synchronized.");

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
