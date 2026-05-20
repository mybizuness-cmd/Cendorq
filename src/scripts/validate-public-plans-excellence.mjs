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
const legacyPlanLabels = ["AI" + " Readiness Review", "Signal" + " Repair", "Readiness" + " Control"];

expect(pricingContractPath, [
  "CENDORQ_PLAN_PRICES",
  "name: \"Deep Review\"",
  "name: \"Build Fix\"",
  "name: \"Ongoing Control\"",
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
  "Use this when evidence should guide the next investment.",
  "Use this when the weak point is clear enough to improve.",
  "Use this when the business needs ongoing attention and readiness control.",
]);

expect(plansPath, [
  "Choose the right visibility and readiness depth.",
  "Free Scan shows the first signal.",
  "Deep Review explains the cause.",
  "Build Fix improves the weak point.",
  "Ongoing Control keeps visibility and readiness from drifting.",
  "\"build-fix\": \"Repair\"",
  "Start Free Scan",
  "Open Deep Review",
  "Open Build Fix",
  "Open Ongoing Control",
  "One path. Four depths.",
]);

expect(checkoutStartPath, [
  "Start checkout | Cendorq",
  "secure Stripe payment",
  "redirect(buildCheckoutDestination(plan.paymentLink, planKey, searchParams))",
  "client_reference_id",
  "cendorq_plan",
]);

expect(checkoutSuccessPath, [
  "Payment complete | Cendorq",
  "Payment complete",
  "CheckoutDashboardRedirect",
  "One next step",
  "Payment confirmed",
]);

expect(packagePath, ["validate:routes"]);
expect(routesChainPath, [validatorPath]);

boundedLength(componentPath, 15500);
boundedLength(plansPath, 16000);

forbidden(componentPath, [...blockedPlanPhrases(), ...legacyPlanLabels]);
forbidden(plansPath, [...blockedPlanPhrases(), ...legacyPlanLabels, "$750+", "$300/mo", "starting at", "Unlock Build Fix", "Compare pricing", "\"build-fix\": \"Fix\""]);

if (failures.length) {
  console.error("Public plans command alignment validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public plans command alignment validation passed with Scan, Review, Repair, Control positioning and current public plan names.");

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
