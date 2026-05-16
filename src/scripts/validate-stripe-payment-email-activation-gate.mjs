import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const webhookPath = "src/app/api/stripe/webhook/route.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-stripe-payment-email-activation-gate.mjs";

expect(webhookPath, [
  "HeldConfirmationEmailProjection",
  "buildHeldConfirmationEmailProjection",
  "durable-entitlement-activation-required",
  "providerDelivery",
  "attempted: false",
  "sent: false",
  "skipped: true",
  "entitlementDecision.activationAllowed",
  "projectCustomerConfirmationEmailSafeResponse(await issueCustomerConfirmationEmail",
  "createdOrReturnedByPaymentEmail: entitlementDecision.activationAllowed",
  "rawTokenReturnedToBrowser: false",
  "rawEmailReturnedToBrowser: false",
  "providerPayloadReturnedToBrowser: false",
]);

expect(routesChainPath, [validatorPath]);

forbidden(webhookPath, [
  "const confirmationEmail = await issueCustomerConfirmationEmail",
  "createdOrReturnedByPaymentEmail: true",
  "entitlementActivated: journey.paidWorkCanStart",
  "rawTokenReturnedToBrowser: true",
  "rawEmailReturnedToBrowser: true",
  "providerPayloadReturnedToBrowser: true",
  "localStorage",
  "sessionStorage",
]);

if (failures.length) {
  console.error("Stripe payment email activation gate validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Stripe payment email activation gate validation passed with confirmation email held until durable entitlement activation is allowed.");

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
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
