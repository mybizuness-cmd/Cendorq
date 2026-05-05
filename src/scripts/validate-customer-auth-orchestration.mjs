import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const orchestrationPath = "src/lib/customer-auth-orchestration.ts";
const pricingContractPath = "src/lib/pricing-checkout-orchestration.ts";
const routeMapPath = "src/lib/customer-platform-route-map.ts";
const loginPath = "src/app/login/page.tsx";
const signupPath = "src/app/signup/page.tsx";
const verifyPath = "src/app/verify-email/page.tsx";
const dashboardPath = "src/app/dashboard/page.tsx";
const pricingPath = "src/app/plans/page.tsx";
const planTemplatePath = "src/components/plans/conversion-plan-page.tsx";
const billingPath = "src/app/dashboard/billing/page.tsx";
const checkoutStartPath = "src/app/checkout/start/page.tsx";
const checkoutSuccessPath = "src/app/checkout/success/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-customer-auth-orchestration.mjs";

for (const path of [orchestrationPath, pricingContractPath, routeMapPath, loginPath, signupPath, verifyPath, dashboardPath, pricingPath, planTemplatePath, billingPath, checkoutStartPath, checkoutSuccessPath, routesChainPath]) {
  if (!existsSync(join(root, path))) failures.push(`Missing customer orchestration dependency: ${path}`);
}

expect(orchestrationPath, [
  "CUSTOMER_AUTH_METHODS",
  "CUSTOMER_EMAIL_ORCHESTRATION_STEPS",
  "CUSTOMER_EMAIL_DELIVERABILITY_STANDARD",
  "CUSTOMER_EMAIL_REVENUE_SEQUENCE",
  "Email magic link",
  "Passkey-ready access",
  "Email and password fallback",
  "Click confirms and redirects to dashboard",
  "Returning customers use magic link first",
  "Transactional emails continue",
  "SPF, DKIM, and DMARC",
  "one-click unsubscribe",
  "dashboard opened",
  "paid-plan click events",
]);

expect(pricingContractPath, [
  "CENDORQ_PLAN_PRICES",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "amountCents: 49700",
  "amountCents: 149700",
  "amountCents: 59700",
  "stripeMode: \"payment\"",
  "stripeMode: \"subscription\"",
  "/checkout/start?plan=deep-review",
  "/checkout/start?plan=build-fix",
  "/checkout/start?plan=ongoing-control",
  "CENDORQ_CHECKOUT_ORCHESTRATION",
  "CENDORQ_CHECKOUT_METADATA_KEYS",
  "CENDORQ_POST_PAYMENT_EMAILS",
]);

expect(routeMapPath, [
  "| \"login\"",
  "path: \"/login\"",
  "Customer re-entry",
  "verification click redirects to dashboard",
  "login uses magic link first with passkey-ready path and password fallback",
  "provider signup, email magic link, and email/password fallback must remain available",
  "transactional and marketing email consent must stay separated",
  "SPF DKIM DMARC and suppression handling are required before scaling lifecycle email",
]);

expect(loginPath, [
  "Customer login | Cendorq",
  "path: \"/login\"",
  "noIndex: true",
  "Magic link first",
  "Send magic link",
  "Use passkey when available",
  "Create account instead",
  "Customer re-entry guardrails",
]);

expect(signupPath, [
  "Create your Cendorq account | Cendorq",
  "path: \"/signup\"",
  "noIndex: true",
  "Email confirmation before dashboard and result access",
  "Magic-link-first re-entry",
  "Return by magic link when you come back later",
  "Send a magic link",
]);

expect(verifyPath, [
  "Confirm your email | Cendorq",
  "path: \"/verify-email\"",
  "noIndex: true",
  "Confirm once. Land inside the dashboard.",
  "Open dashboard after confirmation",
  "Send a magic link",
  "verification click redirects to dashboard",
]);

expect(dashboardPath, [
  "Private revenue workspace",
  "Next best action",
  "Continue Free Scan",
  "See Deep Review",
  "Manage billing and plans",
  "Open report vault",
]);

expect(pricingPath, [
  "CENDORQ_PLAN_PRICES",
  "Choose the depth that can move revenue next.",
  "$497 Deep Review",
  "$1,497 Build Fix",
  "$597/month Ongoing Control",
  "Unlock Deep Review",
  "Unlock Build Fix",
  "Start Ongoing Control",
]);

expect(planTemplatePath, [
  "getCendorqPlanPrice",
  "PLAN_KEY_BY_TITLE",
  "Unlock ${plan.name} ${plan.price}",
  "After payment:",
  "Deep Review $497",
  "Build Fix $1,497",
  "Ongoing Control $597/month",
]);

expect(billingPath, [
  "getPaidCendorqPlanPrice",
  "CENDORQ_POST_PAYMENT_EMAILS",
  "Unlock Deep Review",
  "Fix what is costing choices",
  "Keep monthly control",
  "After payment:",
  "Deep Review $497",
  "Build Fix $1,497",
  "Ongoing Control $597/month",
]);

expect(checkoutStartPath, [
  "Start checkout | Cendorq",
  "Secure checkout",
  "Stripe link coming next",
  "Checkout start",
  "CENDORQ_CHECKOUT_ORCHESTRATION",
  "CENDORQ_CHECKOUT_METADATA_KEYS",
]);

expect(checkoutSuccessPath, [
  "Checkout complete | Cendorq",
  "Payment complete",
  "Deep Review is unlocked.",
  "Build Fix is unlocked.",
  "Ongoing Control is active.",
  "Post-payment dashboard activation",
  "Plan entitlement",
  "Billing record",
  "Dashboard notification",
  "Backend work queue",
  "Post-payment email",
]);

expect(routesChainPath, [validatorPath]);

forbidden([loginPath, signupPath, verifyPath, pricingPath, planTemplatePath, billingPath, checkoutStartPath, checkoutSuccessPath], [
  "$750+",
  "$300/mo",
  "starting at",
  "lorem ipsum",
  "template page",
  "generic page",
  "guaranteed revenue",
  "guaranteed ROI",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "password in email",
  "account exists",
  "no unsubscribe",
  "skip verification",
]);

forbidden([orchestrationPath, pricingContractPath], [
  "marketing emails continue after unsubscribe",
  "ignore suppression",
  "skip DMARC",
  "magic links never expire",
  "show account exists",
  "store password in localStorage",
]);

if (failures.length) {
  console.error("Customer auth and checkout orchestration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer auth and checkout orchestration validation passed. Signup, verification, re-entry, dashboard activation, final pricing, checkout, billing, and post-payment flow stay synchronized.");

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
