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
const routeChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-pricing-checkout-orchestration.mjs";

for (const path of [contractPath, pricingPath, planTemplatePath, billingPath, checkoutStartPath, checkoutSuccessPath, routeChainPath]) {
  if (!existsSync(join(root, path))) failures.push(`Missing pricing checkout dependency: ${path}`);
}

expect(contractPath, [
  "CENDORQ_PLAN_PRICES",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "amountCents: 49700",
  "amountCents: 149700",
  "amountCents: 59700",
  "stripeMode: \"payment\"",
  "stripeMode: \"subscription\"",
  "/checkout/start?plan=deep-review",
  "/checkout/start?plan=build-fix",
  "/checkout/start?plan=ongoing-control",
  "/checkout/success?plan=deep-review&session_id={CHECKOUT_SESSION_ID}",
  "/checkout/success?plan=build-fix&session_id={CHECKOUT_SESSION_ID}",
  "/checkout/success?plan=ongoing-control&session_id={CHECKOUT_SESSION_ID}",
  "CENDORQ_CHECKOUT_ORCHESTRATION",
  "CENDORQ_CHECKOUT_METADATA_KEYS",
  "CENDORQ_POST_PAYMENT_EMAILS",
  "deep-review-kickoff",
  "build-fix-kickoff",
  "ongoing-control-kickoff",
]);

expect(pricingPath, [
  "CENDORQ_PLAN_PRICES",
  "getCendorqPlanPrice",
  "Choose the depth that can move revenue next.",
  "fixed price",
  "$497 Deep Review",
  "$1,497 Build Fix",
  "$597/month Ongoing Control",
  "Unlock Deep Review",
  "Unlock Build Fix",
  "Start Ongoing Control",
  "Checkout success",
]);

expect(planTemplatePath, [
  "getCendorqPlanPrice",
  "PLAN_KEY_BY_TITLE",
  "Unlock ${plan.name} ${plan.price}",
  "After payment:",
  "Deep Review $497",
  "Build Fix $1,497",
  "Ongoing Control $597/month",
  "Checkout start",
  "Checkout success",
  "Stripe session metadata",
]);

expect(billingPath, [
  "getPaidCendorqPlanPrice",
  "CENDORQ_POST_PAYMENT_EMAILS",
  "Unlock Deep Review",
  "Fix what is costing choices",
  "Keep monthly control",
  "After payment:",
  "Deep Review $497",
  "Build Fix $1,497",
  "Ongoing Control $597/month",
  "Post-payment emails",
]);

expect(checkoutStartPath, [
  "Start checkout | Cendorq",
  "Secure checkout",
  "Unlock {plan.name} for {plan.price}",
  "Stripe link coming next",
  "success URL includes session_id",
  "CENDORQ_CHECKOUT_ORCHESTRATION",
  "CENDORQ_CHECKOUT_METADATA_KEYS",
]);

expect(checkoutSuccessPath, [
  "Checkout complete | Cendorq",
  "Payment complete",
  "Deep Review is unlocked.",
  "Build Fix is unlocked.",
  "Ongoing Control is active.",
  "Post-payment dashboard activation",
  "Checkout webhook fulfillment",
  "Plan entitlement",
  "Billing record",
  "Dashboard notification",
  "Backend work queue",
  "Post-payment email",
  "Send magic link",
]);

expect(routeChainPath, [validatorPath]);

forbidden([pricingPath, planTemplatePath, billingPath, checkoutStartPath, checkoutSuccessPath], [
  "$750+",
  "$300/mo",
  "starting at",
  "cheap",
  "lorem ipsum",
  "template",
  "badge-heavy",
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
