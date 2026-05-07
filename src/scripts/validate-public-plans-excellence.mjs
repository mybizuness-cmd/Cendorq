import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const componentPath = "src/components/plans/conversion-plan-page.tsx";
const plansPath = "src/app/plans/page.tsx";
const pricingContractPath = "src/lib/pricing-checkout-orchestration.ts";
const checkoutStartPath = "src/app/checkout/start/page.tsx";
const checkoutSuccessPath = "src/app/checkout/success/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-plans-excellence.mjs";

expect(pricingContractPath, [
  "CENDORQ_PLAN_PRICES",
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
  "Compare pricing",
  "Best for",
  "Not for",
  "Plan guardrails",
  "Buy the right depth.",
  "Use Deep Review at $497 when the business needs the real reason.",
  "Use Build Fix at $1,497 when the direction is clear enough to improve.",
  "Use Ongoing Control at $597/month when the business needs monthly attention.",
  "No fake urgency.",
  "No unsupported revenue promise.",
  "No paid push before stage fit is clear.",
  "No protected result before verification.",
]);

expect(plansPath, [
  "Visibility command path",
  "Choose the depth that matches the business risk.",
  "Scan first. Diagnose when the cause matters. Fix only when the target is clear. Keep control when visibility, trust, and customer choice need monthly attention.",
  "Scan",
  "Diagnose",
  "Fix",
  "Control",
  "Start Free Scan",
  "Unlock Deep Review",
  "Unlock Build Fix",
  "Start Ongoing Control",
  "Each plan buys a different level of control.",
  "Free Scan $0",
  "Deep Review $497",
  "Build Fix $1,497",
  "Ongoing Control $597/mo",
]);

expect(checkoutStartPath, [
  "Start checkout | Cendorq",
  "Secure checkout",
  "Stripe link coming next",
  "Checkout metadata",
]);

expect(checkoutSuccessPath, [
  "Command activated | Cendorq",
  "Payment complete",
  "Activate the command path",
  "Payment is complete. The command path starts now.",
  "Command activation",
  "Diagnose",
  "Fix",
  "Control",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(packagePath, ["validate:routes"]);
expect(routesChainPath, [validatorPath, "validate-owner-maximum-protection-posture.mjs"]);

boundedLength(componentPath, 15500);
boundedLength(plansPath, 16000);

forbidden(componentPath, blockedPlanPhrases());
forbidden(plansPath, [...blockedPlanPhrases(), "$750+", "$300/mo", "starting at", "Best first move", "Start free if the cause is unclear. Pay when the next depth is obvious.", "Choose the depth that can move revenue next."]);

if (failures.length) {
  console.error("Public plans command alignment validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public plans command alignment validation passed with Scan, Diagnose, Fix, Control positioning and command activation checkout success.");

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
