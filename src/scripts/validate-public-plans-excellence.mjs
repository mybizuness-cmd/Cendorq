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
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "amountCents: 49700",
  "amountCents: 149700",
  "amountCents: 59700",
  "CENDORQ_CHECKOUT_ORCHESTRATION",
  "CENDORQ_CHECKOUT_METADATA_KEYS",
  "CENDORQ_POST_PAYMENT_EMAILS",
  "CENDORQ_POST_PAYMENT_SERVICE_SEQUENCE",
  "CENDORQ_REPORT_TRIGGER_MATRIX",
]);

expect(componentPath, [
  "getCendorqPlanPrice",
  "PLAN_KEY_BY_TITLE",
  "Compare Plans",
  "Choose this when",
  "Do not choose this when",
  "Plan guardrails",
  "Buy the right depth.",
  "Use AI Readiness Review at $497 when the business needs evidence.",
  "Use Signal Repair at $1,497 when the repair target is clear enough to improve.",
  "Use Readiness Control at $597/month when the business needs watch, refresh, and adjustment.",
  "No fake urgency.",
  "No unsupported outcome promise.",
  "No paid push before stage fit is clear.",
  "No protected result before verification.",
]);

expect(componentPath, [
  "PLAN_AFTER_PURCHASE_STANDARDS",
  "After purchase standard",
  "Vault first",
  "Released reports, delivery summaries, and billing documents stay in the verified dashboard/report vault or billing center first.",
  "Messages mirrored",
  "Important email actions mirror into the dashboard with the same safe next step and support path.",
  "PDFs gated",
  "Downloadable or attached PDFs turn on only after verification, entitlement or provider authority, release, no-leak, and document-safety gates pass.",
  "Verified dashboard/report vault or billing center first.",
  "Same safe next step and support path.",
  "Verification, entitlement or provider authority, release, no-leak, and document-safety gates pass.",
]);

expect(plansPath, [
  "AI readiness plans",
  "Choose the level of command your business is ready for.",
  "Cendorq does not sell random packages.",
  "find the signal, prove the cause, repair the weakness, then keep readiness under control.",
  "Start with the safest evidence path. Move deeper only when the stage fits.",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "Start Free Scan",
  "Start Review",
  "Start Repair",
  "Start Control",
  "Each plan buys a different depth.",
  "No stage pretends to be another stage.",
  "No guaranteed rankings, leads, revenue, or AI placement.",
  "Every stronger recommendation must be tied to evidence.",
  "Free Scan $0",
  "AI Readiness Review $497",
  "Signal Repair $1,497",
  "Readiness Control $597/mo",
  "Internal keys preserved: deep-review, build-fix, ongoing-control",
]);

expect(plansPath, [
  "AFTER_PURCHASE_STANDARDS",
  "After purchase access standard",
  "Vault first",
  "Released reports and billing documents live in the verified dashboard, not only in email.",
  "Messages mirrored",
  "Important emails are reflected as dashboard messages so the customer can recover the same next action.",
  "PDFs gated",
  "Downloadable or attached PDFs are enabled only when verification, entitlement, release, and document-safety checks pass.",
  "After purchase access: vault first, dashboard message mirror, safe PDF delivery gates, verified access, entitlement, release, and document-safety checks.",
]);

expect(checkoutStartPath, [
  "Start checkout | Cendorq",
  "Secure plan handoff",
  "Checkout handoff paths",
  "Checkout metadata",
]);

expect(checkoutSuccessPath, [
  "Readiness activated | Cendorq",
  "Payment complete",
  "Activate the readiness path",
  "Payment is complete. The readiness path starts now.",
  "Readiness activation",
  "Review",
  "Repair",
  "Control",
  "AI Readiness Review $497",
  "Signal Repair $1,497",
  "Readiness Control $597/month",
  "dashboard report vault first",
  "dashboard message mirror",
  "downloadable PDF",
  "PDF attachment delivery",
  "document-safety gates pass",
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

boundedLength(componentPath, 22000);
boundedLength(plansPath, 22000);

forbidden(componentPath, [
  ...blockedPlanPhrases(),
  "guaranteed inbox",
  "guaranteed deliverability",
  "PDF-only access path",
  "pdf-only access path",
  "separate truth source allowed",
  "Deep Review / Full Scan",
  "Build Fix / Optimization",
  "Ongoing Control / Monthly",
]);
forbidden(plansPath, [
  ...blockedPlanPhrases(),
  "$750+",
  "$300/mo",
  "starting at",
  "Best first move",
  "Start free if the cause is unclear. Pay when the next depth is obvious.",
  "Choose the depth that can move revenue next.",
  "guaranteed inbox",
  "guaranteed deliverability",
  "PDF-only access path",
  "pdf-only access path",
  "separate truth source allowed",
  "Deep Review / Full Scan",
  "Build Fix / Optimization",
  "Ongoing Control / Monthly",
]);

if (failures.length) {
  console.error("Public plans AI-readiness alignment validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public plans AI-readiness validation passed with Scan, Review, Repair, Control positioning, plan-detail after-purchase access standards, vault-first access, mirrored dashboard messages, safe PDF gates, and preserved internal checkout keys.");

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
  return readFileSync(join(root, path), "utf8" );
}
