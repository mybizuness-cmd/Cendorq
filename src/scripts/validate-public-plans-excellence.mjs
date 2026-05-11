import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const componentPath = "src/components/plans/conversion-plan-page.tsx";
const plansPath = "src/app/plans/page.tsx";
const pricingContractPath = "src/lib/pricing-checkout-orchestration.ts";
const checkoutStartPath = "src/app/checkout/start/page.tsx";
const checkoutSuccessPath = "src/app/checkout/success/page.tsx";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-plans-excellence.mjs";

expect(pricingContractPath, [
  "CENDORQ_PLAN_PRICES",
  "name: \"AI Readiness Review\"",
  "name: \"Signal Repair\"",
  "name: \"Readiness Control\"",
  "amountCents: 49700",
  "amountCents: 149700",
  "amountCents: 59700",
  "CENDORQ_CHECKOUT_ORCHESTRATION",
  "CENDORQ_CHECKOUT_METADATA_KEYS",
  "CENDORQ_POST_PAYMENT_EMAILS",
]);

expect(componentPath, [
  "getCendorqPlanPrice",
  "PLAN_KEY_BY_TITLE",
  "What this helps you decide",
  "Best when",
  "Not the right first step when",
  "Plan guardrails",
  "Buy the right depth.",
  "Use AI Readiness Review when the business needs evidence before repair.",
  "Use Signal Repair when the weak point is clear enough to improve.",
  "Use Readiness Control when the business needs ongoing attention.",
  "No fake urgency.",
  "No unsupported revenue promise.",
  "No guaranteed ranking or AI placement.",
]);

expect(plansPath, [
  "Choose the right AI-readiness depth.",
  "Start with a first signal. Move deeper only when the evidence supports it.",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "Start Free Scan",
  "Start AI Readiness Review",
  "Start Signal Repair",
  "Start Readiness Control",
  "One path. Four depths.",
  "Free Scan $0",
  "AI Readiness Review $497",
  "Signal Repair $1,497",
  "Readiness Control $597/mo",
]);

expect(checkoutStartPath, [
  "Start checkout | Cendorq",
  "Secure checkout",
  "Stripe link coming next",
  "Checkout metadata",
]);

expect(checkoutSuccessPath, [
  "Checkout complete | Cendorq",
  "Payment complete",
  "getCendorqRevenueStage",
  "What Cendorq needs next",
  "Post-payment dashboard activation",
]);

expect(packagePath, ["validate:routes"]);
expect(routesChainPath, [validatorPath]);

boundedLength(componentPath, 15500);
boundedLength(plansPath, 16000);

forbidden(componentPath, blockedPlanPhrases());
forbidden(plansPath, [...blockedPlanPhrases(), "$750+", "$300/mo", "starting at", "Unlock Build Fix", "Compare pricing", "Diagnose"]);

if (failures.length) {
  console.error("Public plans command alignment validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public plans command alignment validation passed with Scan, Review, Repair, Control positioning and AI-readiness plan names.");

function blockedPlanPhrases() {
  return [
    "PLAN_PATH_OPERATING_SNAPSHOT",
    "PLAN_CHANNEL_COVERAGE",
    "guaranteed ROI",
    "guaranteed refund",
    "guaranteed legal outcome",
    "guaranteed security outcome",
    "guaranteed business results",
    "impossible to hack",
    "never liable",
    "liability-free",
    "rawPayload",
    "rawEvidence",
    "rawSecurityPayload",
    "rawBillingData",
    "internalNotes",
    "operatorIdentity",
    "riskScoringInternals",
    "attackerDetails",
    "sessionToken",
    "csrfToken",
    "localStorage.setItem",
    "sessionStorage.setItem",
    "After payment:",
    "Do not treat this",
  ];
}

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for simplified plan standard: ${text.length} > ${maxCharacters}`);
}

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
