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
const clickTrackerPath = "src/components/conversion/conversion-click-tracker.tsx";

for (const path of [pricingContractPath, plansPath, planTemplatePath, billingPath, dashboardPath, checkoutStartPath, checkoutSuccessPath, clickTrackerPath]) {
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
  "Choose the right AI-readiness depth.",
  "Start with the level that matches what you already know.",
  "Open Review page",
  "Open Repair page",
  "Open Control page",
  "One path. Four depths.",
]);

expect(planTemplatePath, [
  "`${data.ctaLabel} — ${plan.price}`",
  "Review all plans",
  "What this helps you decide",
  "Use this when evidence should guide the next investment.",
  "Use this when the weak point is clear enough to improve.",
  "Use this when the business needs ongoing attention and readiness control.",
]);

expect(billingPath, [
  "Know what is active, what unlocked, and what depth comes next.",
  "Payment should unlock the right readiness layer.",
  "Open Review page",
  "Open plan page",
  "Checkout success parity",
  "Activation must preserve the same includes, exclusions, workflow, and post-payment next step shown in checkout success.",
]);

expect(dashboardPath, [
  "Your Cendorq workspace is ready.",
  "one clear next action",
  "One next step.",
  "Cendorq keeps the next step separate.",
  "Scan. Review. Repair. Control.",
  "Open Review page",
  "Open Repair page",
]);

expect(checkoutStartPath, [
  "Start checkout | Cendorq",
  "secure Stripe payment",
  "redirect(buildCheckoutDestination(plan.paymentLink, planKey, searchParams))",
  "client_reference_id",
  "cendorq_plan",
]);

expect(checkoutSuccessPath, [
  "Payment complete",
  "Payment confirmed",
  "CheckoutDashboardRedirect",
  "One next step",
  "Open your inbox",
]);

expect(clickTrackerPath, [
  "ConversionClickTracker",
  "classifyClickIntent",
  "free_scan",
  "deep_review",
  "build_fix",
  "ongoing_control",
  "customer_access",
  "education",
  "contact",
  "parsed.search",
]);

forbidden([pricingContractPath, plansPath, planTemplatePath, billingPath, dashboardPath, checkoutStartPath, checkoutSuccessPath], [
  "$750+",
  "$300/mo",
  "starting at",
  "generic page",
  "template page",
  "outcome warranty",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
]);

if (failures.length) {
  console.error("Conversion moat standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Conversion moat standard validation passed with current plan names, fixed pricing, click intent tracking, checkout, dashboard revenue path, and post-payment activation coverage.");

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
