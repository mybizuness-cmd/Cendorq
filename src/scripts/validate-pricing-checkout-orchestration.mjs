import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/lib/pricing-checkout-orchestration.ts", ["CENDORQ_PLAN_PRICES", "name: \"Deep Review\"", "name: \"Build Fix\"", "name: \"Ongoing Control\"", "amountCents: 49700", "amountCents: 149700", "amountCents: 59700", "CENDORQ_CHECKOUT_ORCHESTRATION", "CENDORQ_CHECKOUT_METADATA_KEYS", "CENDORQ_POST_PAYMENT_EMAILS"]],
  ["src/app/plans/page.tsx", ["CENDORQ_PLAN_PRICES", "Open Review page", "Open Repair page", "Open Control page"]],
  ["src/components/plans/conversion-plan-page.tsx", ["getCendorqPlanPrice", "What this helps you decide"]],
  ["src/app/dashboard/billing/page.tsx", ["getPaidCendorqPlanPrice", "Payment should unlock the right AI Visibility layer", "Checkout success parity"]],
  ["src/app/checkout/start/page.tsx", ["Start checkout | Cendorq", "secure Stripe payment", "client_reference_id", "prefilled_email", "cendorq_plan", "cendorq_source"]],
  ["src/app/checkout/success/page.tsx", ["Payment complete | Cendorq", "Payment complete", "CheckoutDashboardRedirect", "One next step", "Payment confirmed", "Open your inbox", "Request a fresh access link"]],
  ["src/app/api/stripe/webhook/route.ts", ["checkout.session.completed", "verifyStripeSignature", "issueCustomerConfirmationEmail", "projectCustomerConfirmationEmailSafeResponse", "resolveCendorqCustomerJourney", "getPaidCendorqPlanPrice"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

forbidden(["src/app/dashboard/billing/page.tsx"], ["Payment should unlock the right readiness layer"]);

if (failures.length) {
  console.error("Pricing checkout orchestration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Pricing checkout orchestration validation passed.");

function expect(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing pricing checkout dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(paths, phrases) {
  for (const path of paths) {
    const absolute = join(root, path);
    if (!existsSync(absolute)) continue;
    const text = readFileSync(absolute, "utf8").toLowerCase();
    for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains blocked phrase: ${phrase}`);
  }
}
