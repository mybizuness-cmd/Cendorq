import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checkoutSuccessPath = "src/app/checkout/success/page.tsx";
const billingPath = "src/app/dashboard/billing/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-checkout-billing-plan-activation.mjs";

expect(checkoutSuccessPath, [
  "Plan-aware checkout success",
  "Query plan selection",
  "normalizePaidPlanKey",
  "CENDORQ_PAID_PLAN_KEYS",
  "PLAN_ACTIVATION_COPY",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "Diagnosis activation",
  "Implementation activation",
  "Monthly control activation",
  "activation.unlockedState",
  "activation.boundaryReminder",
  "What Cendorq needs next",
  "Plan value delivery architecture",
  "PLAN_VALUE_SEPARATION_RULES",
  "getCendorqRevenueStage",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(billingPath, [
  "Billing plan activation matrix",
  "Checkout should unlock the right workflow, not just a receipt.",
  "BILLING_PLAN_ACTIVATION",
  "ENTITLEMENT_STANDARDS",
  "Diagnosis entitlement",
  "Scoped implementation entitlement",
  "Recurring control entitlement",
  "Current access",
  "Invoice path",
  "Activation path",
  "Upgrade path",
  "Billing activation must preserve the same includes, exclusions, workflow, and post-payment next step shown in checkout success.",
  "getCendorqRevenueStage",
  "getPlanValueDelivery",
  "PLAN_VALUE_SEPARATION_RULES",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(checkoutSuccessPath, [
  "const PLAN = getPaidCendorqPlanPrice(\"deep-review\")",
  "const PLAN_VALUE = getPlanValueDelivery(\"deep-review\")",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
  "unlimited build fix included",
]);

forbidden(billingPath, [
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

console.log("Checkout and billing plan activation validation passed with plan-aware success and billing entitlement coverage.");

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
