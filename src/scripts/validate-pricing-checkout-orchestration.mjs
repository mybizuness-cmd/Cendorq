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
  "name: \"Deep Review\"",
  "name: \"Build Fix\"",
  "name: \"Ongoing Control\"",
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

expect(pricingPath, ["CENDORQ_PLAN_PRICES", "Open Review page", "Open Repair page", "Open Control page"]);
expect(planTemplatePath, ["getCendorqPlanPrice", "What this helps you decide"]);
expect(billingPath, ["getPaidCendorqPlanPrice", "Payment should unlock the right readiness layer", "Checkout success parity"]);
expect(checkoutStartPath, [
  "Start checkout | Cendorq",
  "secure Stripe payment",
  "redirect(buildCheckoutDestination(plan.paymentLink, planKey, searchParams))",
  "client_reference_id",
  "prefilled_email",
  "cendorq_plan",
  "cendorq_source",
]);
expect(checkoutSuccessPath, [
  "Payment complete | Cendorq",
  "Payment complete",
  "CheckoutDashboardRedirect",
  "One next step",
  "Payment confirmed",
  "Open your inbox",
  "Request a fresh access link",
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
  "issueCustomerConfirmationEmail",
  "projectCustomerConfirmationEmailSafeResponse",
  "resolveCendorqCustomerJourney",
  "getPaidCendorqPlanPrice",
  "planName: plan.name",
  "journey.dashboardDestination",
  "deliveryCanStart",
  "paidWorkCanStart",
  "rawEmailReturned: false",
  "rawTokenReturned: false",
]);

forbidden([pricingPath, planTemplatePath, billingPath, checkoutStartPath, checkoutSuccessPath, architecturePath, contractPath, stripeWebhookPath, emailSenderPath, confirmationEmailPath], [
  "$750+",
  "$300/mo",
  "starting at",
  "lorem ipsum",
  "template page",
  "generic page",
  "outcome warranty",
  "from pricing, dashboard",
  "from pricing",
  "pricing page",
  "Stripe link coming next",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
]);

if (failures.length) {
  console.error("Pricing checkout orchestration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Pricing checkout orchestration validation passed. Final prices, live Stripe payment links, checkout start/success, Resend email sender, Stripe webhook confirmation, plan pages, metadata, current Plans wording, and post-payment emails stay synchronized.");

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
