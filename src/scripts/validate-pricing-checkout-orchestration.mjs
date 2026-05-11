import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const architecturePath = "src/lib/cendorq-revenue-operating-system.ts";
const contractPath = "src/lib/pricing-checkout-orchestration.ts";
const pricingPath = "src/app/plans/page.tsx";
const planTemplatePath = "src/components/plans/conversion-plan-page.tsx";
const billingPath = "src/app/dashboard/billing/page.tsx";
const checkoutStartPath = "src/app/checkout/start/page.tsx";
const checkoutSuccessPath = "src/app/checkout/success/page.tsx";
const stripeWebhookPath = "src/app/api/stripe/webhook/route.ts";
const emailSenderPath = "src/lib/cendorq-email-sender.ts";
const confirmationEmailPath = "src/lib/customer-confirmation-email-issuance-runtime.ts";

for (const path of [architecturePath, contractPath, pricingPath, planTemplatePath, billingPath, checkoutStartPath, checkoutSuccessPath, stripeWebhookPath, emailSenderPath, confirmationEmailPath]) {
  if (!existsSync(join(root, path))) failures.push(`Missing pricing checkout dependency: ${path}`);
}

expect(contractPath, [
  "CENDORQ_PLAN_PRICES",
  "paymentLink: \"https://buy.stripe.com/9B64gAa28eGwdiIbdhcZa05\"",
  "paymentLink: \"https://buy.stripe.com/dRm5kE0ry2XObaA2GLcZa06\"",
  "paymentLink: \"https://buy.stripe.com/28EcN65LSaqgdiI1CHcZa07\"",
  "name: \"AI Readiness Review\"",
  "name: \"Signal Repair\"",
  "name: \"Readiness Control\"",
  "amountCents: 49700",
  "amountCents: 149700",
  "amountCents: 59700",
  "stripeMode: \"payment\"",
  "stripeMode: \"subscription\"",
  "/checkout/start?plan=deep-review",
  "/checkout/start?plan=build-fix",
  "/checkout/start?plan=ongoing-control",
  "Cendorq confirms the selected plan, price, and next step before handing the customer to secure Stripe payment.",
  "CENDORQ_CHECKOUT_ORCHESTRATION",
  "CENDORQ_CHECKOUT_METADATA_KEYS",
  "CENDORQ_POST_PAYMENT_EMAILS",
]);

expect(pricingPath, ["CENDORQ_PLAN_PRICES", "Start AI Readiness Review", "Start Signal Repair", "Start Readiness Control"]);
expect(planTemplatePath, ["getCendorqPlanPrice", "What this helps you decide"]);
expect(billingPath, ["getPaidCendorqPlanPrice"]);
expect(checkoutStartPath, [
  "Start checkout | Cendorq",
  "Secure payment",
  "Continue to secure payment",
  "Confirm AI Readiness Review before payment.",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "No fake urgency",
  "No ranking guarantee",
  "No AI placement guarantee",
]);
expect(checkoutSuccessPath, [
  "Payment complete | Cendorq",
  "Payment complete",
  "Automatic dashboard redirect",
  "Open review dashboard",
  "Open repair intake",
  "Open control dashboard",
  "Post-payment dashboard activation",
]);
expect(emailSenderPath, [
  "RESEND_ENDPOINT",
  "RESEND_API_KEY",
  "Cendorq Support <support@cendorq.com>",
  "sendCendorqEmail",
  "buildCendorqEmailLayout",
  "buildCendorqEmailText",
]);
expect(confirmationEmailPath, [
  "sendCendorqEmail",
  "customerEmail?: string | null",
  "providerDelivery",
  "rawEmailReturnedToBrowser: false",
]);
expect(stripeWebhookPath, [
  "STRIPE_WEBHOOK_SECRET",
  "checkout.session.completed",
  "verifyStripeSignature",
  "sendCendorqEmail",
  "paid-plan-kickoff",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "/dashboard/reports",
  "/dashboard/support/request",
  "/dashboard/billing",
]);

forbidden([pricingPath, planTemplatePath, billingPath, checkoutStartPath, checkoutSuccessPath, architecturePath, contractPath, stripeWebhookPath, emailSenderPath, confirmationEmailPath], [
  "$750+",
  "$300/mo",
  "starting at",
  "lorem ipsum",
  "template page",
  "generic page",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed result",
  "from pricing, dashboard",
  "from pricing",
  "pricing page",
  "Stripe link coming next",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Pricing checkout orchestration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Pricing checkout orchestration validation passed. Final prices, live Stripe payment links, Cendorq confirmation checkout start, dashboard success redirect, Resend email sender, Stripe webhook, plan pages, metadata, AI-readiness Plans wording, and post-payment emails stay synchronized.");

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
