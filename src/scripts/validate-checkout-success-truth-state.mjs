import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const checkoutSuccessPath = "src/app/checkout/success/page.tsx";
const dashboardRedirectPath = "src/app/checkout/success/dashboard-redirect.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-checkout-success-truth-state.mjs";

expect(checkoutSuccessPath, [
  "CheckoutSuccessTruthState",
  "stripe-session-present",
  "session-verification-needed",
  "resolveCheckoutSuccessTruthState",
  "isSafeCheckoutSessionId",
  "Cendorq needs the checkout session to confirm this plan.",
  "Payment status check",
  "Verification needed",
  "Session check needed",
  "If payment completed, use the secure account link or billing support path",
  "account access",
  "Find the message from Cendorq Support and confirm once to open your dashboard.",
  "sessionTruthState === \"stripe-session-present\" ? <CheckoutDashboardRedirect destination={continuation.href} /> : null",
  "completedEvidence: sessionTruthState === \"stripe-session-present\" ? [\"customerOwnershipVerified\"] : []",
]);

expect(dashboardRedirectPath, [
  "ALLOWED_CHECKOUT_DESTINATIONS",
  "router.replace(safeDestination)",
  "REDIRECT_DELAY_MS",
]);

expect(routesChainPath, [validatorPath]);

forbidden(checkoutSuccessPath, [
  "pending-session",
  "secure workspace link",
  "workspace access",
  "open your workspace",
  "raw stripe payload",
  "rawPaymentData",
  "sessionStorage",
  "localStorage",
  "guaranteed ROI",
  "guaranteed revenue",
]);

if (failures.length) {
  console.error("Checkout success truth-state validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Checkout success truth-state validation passed with account/dashboard confirmation copy, safe checkout session state, no auto-redirect without a checkout session, and route-chain coverage.");

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
