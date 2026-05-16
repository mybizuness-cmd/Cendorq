import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const webhookPath = "src/app/api/stripe/webhook/route.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-stripe-webhook-signature-boundary.mjs";

expect(webhookPath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "revalidate = 0",
  "STRIPE_WEBHOOK_SECRET_ENV",
  "STRIPE_SIGNATURE_HEADER",
  "cleanSecret(process.env[STRIPE_WEBHOOK_SECRET_ENV])",
  "if (!webhookSecret)",
  "Stripe webhook is not configured.",
  "accepted: false",
  "entitlementActivated: false",
  "verifyStripeSignature(rawBody, signature, webhookSecret)",
  "createHmac(\"sha256\", secret)",
  "timingSafeEqual",
  "STRIPE_TOLERANCE_SECONDS",
  "checkout.session.completed",
  "rawEmailReturned: false",
  "rawTokenReturned: false",
  "X-Robots-Tag",
  "no-store",
]);

expect(routesChainPath, [validatorPath]);

forbidden(webhookPath, [
  "webhookSecret && !verifyStripeSignature",
  "if (webhookSecret &&",
  "return json({ ok: true, route: \"stripe-webhook\", method: \"POST\" }, 200)",
  "rawBodyReturned: true",
  "rawPayloadReturned: true",
  "rawStripePayload",
  "card number",
  "localStorage",
  "sessionStorage",
]);

if (failures.length) {
  console.error("Stripe webhook signature boundary validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Stripe webhook signature boundary validation passed with required configured secret, signature verification, no-store response headers, safe projections, and route-chain coverage.");

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
