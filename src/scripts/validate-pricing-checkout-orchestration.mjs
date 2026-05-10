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

for (const path of [architecturePath, contractPath, pricingPath, planTemplatePath, billingPath, checkoutStartPath, checkoutSuccessPath]) {
  if (!existsSync(join(root, path))) failures.push(`Missing pricing checkout dependency: ${path}`);
}

expect(architecturePath, [
  "CENDORQ_REVENUE_OPERATING_SYSTEM",
  "CENDORQ_BUSINESS_ARCHITECTURE_RULES",
  "CENDORQ_PLAN_PERSONALIZATION_FIELDS",
  "Free Scan",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "Turn anonymous interest into a verified customer account, a protected report-vault result, and a dashboard relationship.",
  "Convert uncertainty into evidence-backed AI-readiness review",
  "Turn a known weak page, message, proof, or action path into scoped customer-facing improvement work.",
  "Create recurring value by keeping clarity, proof, search posture, AI-readiness, customer friction, and market movement under monthly watch.",
  "Every paid plan must unlock a workflow",
  "Every checkout must return to a Cendorq success state",
  "Every important email must mirror into the dashboard",
  "Every report or billing PDF must stay gated by verification, ownership, release/provider authority, no-leak checks, and document safety.",
  "Every mobile screen must lead with the action",
]);

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
  "CENDORQ_POST_PAYMENT_SERVICE_SEQUENCE",
  "CENDORQ_REPORT_TRIGGER_MATRIX",
  "CENDORQ_CHECKOUT_METADATA_KEYS",
  "CENDORQ_POST_PAYMENT_EMAILS",
  "getCendorqReportTrigger",
  "idempotent-fulfillment",
  "branded-report-release",
  "follow-up-satisfaction-retention",
]);

expect(pricingPath, [
  "CENDORQ_PLAN_PRICES",
  "Choose the level of command your business is ready for.",
  "The command path",
  "Scan. Review. Repair. Control.",
  "After purchase access standard",
  "Vault first",
  "Messages mirrored",
  "PDFs gated",
]);

expect(planTemplatePath, [
  "getCendorqPlanPrice",
  "Homepage-aligned plan detail",
  "Choose this when",
  "Do not choose this when",
  "PLAN_AFTER_PURCHASE_STANDARDS",
  "Vault first",
  "Messages mirrored",
  "PDFs gated",
]);

expect(billingPath, ["getPaidCendorqPlanPrice", "After payment:"]);

expect(checkoutStartPath, [
  "Start checkout | Cendorq",
  "Secure plan handoff",
  "Choose the checkout path that matches the work.",
  "Checkout handoff paths",
  "Checkout metadata",
  "Payment should unlock the exact readiness layer.",
  "Released reports and billing documents stay vault-first inside the verified dashboard/report vault or billing center.",
  "Important checkout, report, billing, and lifecycle emails mirror into dashboard messages.",
  "Downloadable or attached PDFs activate only after verification, entitlement or provider authority, release, no-leak, and document-safety gates pass.",
  "Vault-first report access",
  "Dashboard message mirror",
  "Safe PDF delivery gates",
  "No PDF-only access path",
]);

expect(checkoutSuccessPath, [
  "Readiness activated | Cendorq",
  "Payment complete",
  "getCendorqRevenueStage",
  "What Cendorq needs next",
  "Paid report delivery confirmation",
  "dashboard report vault first",
  "dashboard message mirror",
  "downloadable PDF",
  "PDF attachment delivery",
  "verification, entitlement, release, and document-safety gates pass",
]);

forbidden([pricingPath, planTemplatePath, billingPath, checkoutStartPath, checkoutSuccessPath, architecturePath, contractPath], [
  "$750+",
  "$300/mo",
  "starting at",
  "lorem ipsum",
  "template page",
  "generic page",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed result",
  "guaranteed deliverability",
  "guaranteed inbox",
  "from pricing, dashboard",
  "from pricing",
  "pricing page",
  "Stripe link coming next",
  "Secure checkout",
  "PDF-only access path",
  "pdf-only access path",
  "separate truth source allowed",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "Deep Review is unlocked",
  "Build Fix is unlocked",
  "Ongoing Control is active",
  "Deep Review / Full Scan",
  "Build Fix / Optimization",
  "Ongoing Control / Monthly",
]);

if (failures.length) {
  console.error("Pricing checkout orchestration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Pricing checkout orchestration validation passed. Current plan names, final prices, Cendorq revenue operating system, checkout start, checkout success, dashboard billing, Plans surfaces, metadata, post-payment service sequence, report triggers, vault-first access, safe PDF delivery, and dashboard message mirror stay synchronized.");

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
