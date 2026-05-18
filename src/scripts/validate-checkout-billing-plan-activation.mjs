import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const legacyPlanLabels = ["AI" + " Readiness Review", "Signal" + " Repair", "Readiness" + " Control"];

const checkoutSuccessPath = "src/app/checkout/success/page.tsx";
const billingPath = "src/app/dashboard/billing/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-checkout-billing-plan-activation.mjs";

expect(checkoutSuccessPath, [
  "Payment complete | Cendorq",
  "CheckoutDashboardRedirect",
  "resolveCustomerAccountContinuation",
  "resolveCendorqCustomerJourney",
  "resolvePaidPlanContinuationAction",
  "CENDORQ_PAID_PLAN_KEYS",
  "getPaidCendorqPlanPrice",
  "PLAN_COPY",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "One next step",
  "Payment confirmed",
  "Delivery starts only when the required ownership, intake, evidence, diagnosis, and approval state fit the selected stage.",
  "Open your inbox",
  "Request a fresh access link",
  "journey.deliveryCanStart",
  "journey.backendWorkState",
  "continuation.href",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(billingPath, [
  "Readiness plan depth",
  "Know what is active, what unlocked, and what depth comes next.",
  "BILLING_STATUS",
  "PAID_PLAN_COMMANDS",
  "BILLING_ACTIONS",
  "BILLING_SAFETY_RULES",
  "Current access",
  "Next depth",
  "Safety",
  "Payment should unlock the right readiness layer.",
  "Review",
  "Repair",
  "Control",
  "Activation must preserve the same includes, exclusions, workflow, and post-payment next step shown in checkout success.",
  "getCendorqRevenueStage",
  "getPlanValueDelivery",
  "PLAN_VALUE_SEPARATION_RULES",
  "projectCustomerPlatformHandoff",
  "CENDORQ_POST_PAYMENT_EMAILS",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(checkoutSuccessPath, [
  ...legacyPlanLabels,
  "const PLAN = getPaidCendorqPlanPrice(\"deep-review\")",
  "const PLAN_VALUE = getPlanValueDelivery(\"deep-review\")",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
  "unlimited build fix included",
]);

forbidden(billingPath, [
  ...legacyPlanLabels,
  "submit card number",
  "paste your password",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
  "unlimited build fix included",
]);

if (failures.length) {
  console.error("Checkout and billing plan activation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Checkout and billing plan activation validation passed with current checkout success continuation and billing readiness-depth coverage.");

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

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
