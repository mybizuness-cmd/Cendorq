import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const billingPath = "src/app/dashboard/billing/page.tsx";
const checkoutSuccessPath = "src/app/checkout/success/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-command-billing-checkout-success.mjs";

expect(billingPath, [
  "Readiness plan depth",
  "Know what is active, what unlocked, and what depth comes next.",
  "readiness-depth control point",
  "Billing status summary",
  "Paid readiness depth",
  "Payment should unlock the right readiness layer.",
  "Money moments should feel calm, exact, and recoverable.",
  "Current access",
  "Next layer",
  "Safety",
  "No private payment details",
  "AI Readiness Review $497",
  "Signal Repair $1,497",
  "Readiness Control $597/month",
  "Checkout success parity",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(checkoutSuccessPath, [
  "Readiness activated | Cendorq",
  "Plan unlocked. Activate the readiness path.",
  "Payment should unlock a workflow, not just confirmation.",
  "Activation path",
  "Payment is complete. The readiness path starts now.",
  "Dashboard state",
  "Workflow started",
  "Confirmation email",
  "What this unlocks",
  "What this does not unlock",
  "What Cendorq needs next",
  "Paid report delivery confirmation",
  "Every paid report must appear in the dashboard report vault and be delivered by email with the approved PDF attachment.",
  "Checkout success parity with billing",
  "Billing activation must preserve the same includes, exclusions, workflow, and post-payment next step shown in checkout success.",
  "AI Readiness Review $497",
  "Signal Repair $1,497",
  "Readiness Control $597/month",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(billingPath, [
  "Billing plan activation matrix",
  "Checkout should unlock the right workflow, not just a receipt.",
  "BILLING_PLAN_ACTIVATION",
  "ENTITLEMENT_STANDARDS",
  "BILLING_FIRST_USE_SNAPSHOT",
  "Invoice access: Available after checkout",
  "Billing support: support@cendorq.com",
]);

forbidden(checkoutSuccessPath, [
  "Legacy checkout success activation",
  "Plan-aware checkout success",
  "What happens after checkout",
  "1. Dashboard updates",
  "2. Cendorq starts the right workflow",
  "3. Email keeps the path clear",
  "Send magic link",
  "min-h-11 rounded-2xl bg-cyan-300 px-5 py-3 text-center",
]);

boundedLength(billingPath, 15500);
boundedLength(checkoutSuccessPath, 15000);

if (failures.length) {
  console.error("Billing and checkout success validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Billing and checkout success validation passed with readiness plan depth, activation-based checkout success, and paid report delivery confirmation.");

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

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for the billing/checkout standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
