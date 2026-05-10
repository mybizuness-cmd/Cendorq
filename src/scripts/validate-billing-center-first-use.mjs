import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/billing/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(pagePath, [
  "Readiness plan depth",
  "provider-backed billing documents",
  "BILLING_HANDOFFS",
  "BILLING_STATUS",
  "PAID_PLAN_COMMANDS",
  "BILLING_ACTIONS",
  "BILLING_SAFETY_RULES",
  "BILLING_DOCUMENT_RULES",
  "getPaidCendorqPlanPrice",
  "CENDORQ_POST_PAYMENT_EMAILS",
  "PLAN_VALUE_SEPARATION_RULES",
  "getCendorqRevenueStage",
  "Payment should unlock the right readiness layer.",
  "Activation must preserve the same includes, exclusions, workflow, and post-payment next step shown in checkout success.",
]);

expect(pagePath, [
  "AI Readiness Review $497",
  "Signal Repair $1,497",
  "Readiness Control $597/month",
  "Review",
  "Repair",
  "Control",
  "Use AI Readiness Review when the first signal matters enough that guessing is too expensive.",
  "Unlocks review workflow, required context, report status, and report-vault destination.",
  "Unlocks scoped implementation intake, repair-target confirmation, approved details, and delivery progress.",
  "Unlocks recurring review, monthly priority selection, alerts, trend awareness, and decision support.",
]);

expect(pagePath, [
  "Billing document access standard",
  "Provider authority",
  "Receipts, invoices, and payment confirmations should come from verified provider state before any billing PDF is shown or attached.",
  "Billing center first",
  "Billing documents should remain available here after verified login, even if an email is missed, filtered, or suppressed.",
  "Mirrored messages",
  "Important billing emails should mirror into dashboard messages with the same safe action, document state, and support path.",
  "Safe PDFs",
  "Billing PDFs must use safe filenames, Cendorq context, no raw provider data, and no card, bank, secret, token, or internal risk details.",
]);

expect(pagePath, [
  "No private payment details",
  "Support can help without card numbers, private keys, bank details, passwords, or tokens.",
  "Account access should show a safe customer projection, not raw provider payloads or internal IDs.",
  "Recovery should feel calm, clear, and recoverable with no fake urgency.",
  "Plan guidance must separate current access, pending actions, and future readiness depth.",
  "Provider-authoritative receipts, invoices, and payment confirmations.",
  "Billing center first.",
  "Mirrored dashboard messages.",
  "Safe billing PDFs.",
  "No raw provider payloads.",
  "No card numbers, bank details, secrets, tokens, internal risk details, or unsafe document projection.",
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

expect(packagePath, [
  "validate:routes",
  "validate-billing-center-first-use.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

expect(routesChainPath, [
  "validate-billing-center-first-use.mjs",
]);

forbidden(pagePath, [
  "BILLING_FIRST_USE_SNAPSHOT",
  "REVENUE_ACTIONS",
  "Deep Review",
  "Unlock Deep Review",
  "Build Fix",
  "Ongoing Control",
  "monthly control",
  "$750+",
  "$300/mo",
  "starting at",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "guaranteed deliverability",
  "guaranteed inbox",
  "PDF-only access path",
  "pdf-only access path",
  "separate truth source allowed",
  "card number required",
  "rawProviderPayload=",
  "rawBillingData=",
  "providerSecret=",
  "webhookSecret=",
  "localStorage",
  "sessionStorage",
]);

if (failures.length) {
  console.error("Billing center first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Billing center first use validation passed with current plan depth, provider-authoritative billing documents, billing-center-first recovery, mirrored dashboard messages, safe billing PDFs, owner posture coverage, and safe revenue-path billing flow.");

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
