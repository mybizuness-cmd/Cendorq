import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const routeMapPath = "src/lib/customer-platform-route-map.ts";
const shieldPath = "src/lib/cendorq-shield-standard.ts";
const authOrchestrationPath = "src/lib/customer-auth-orchestration.ts";
const pricingOrchestrationPath = "src/lib/pricing-checkout-orchestration.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

const requiredRouteFiles = [
  "src/app/signup/page.tsx",
  "src/app/login/page.tsx",
  "src/app/verify-email/page.tsx",
  "src/app/dashboard/page.tsx",
  "src/app/dashboard/reports/page.tsx",
  "src/app/dashboard/billing/page.tsx",
  "src/app/checkout/start/page.tsx",
  "src/app/checkout/success/page.tsx",
];

for (const file of [routeMapPath, shieldPath, authOrchestrationPath, pricingOrchestrationPath, ownerMaximumProtectionPath, ownerMaximumProtectionValidatorPath, packagePath, ...requiredRouteFiles]) validateFileExists(file);

expect(routeMapPath, [
  "CUSTOMER_PLATFORM_ROUTES",
  "CUSTOMER_PLATFORM_STAGES",
  "CUSTOMER_PLATFORM_ROUTE_GUARDS",
  "getCustomerPlatformRouteMap",
  "/signup",
  "/login",
  "/verify-email",
  "/dashboard",
  "/dashboard/reports",
  "/dashboard/billing",
  "dashboard access requires verified email",
  "verification click redirects to dashboard",
  "login uses magic link first with passkey-ready path and password fallback",
  "transactional and marketing email consent must stay separated",
  "SPF DKIM DMARC and suppression handling are required before scaling lifecycle email",
  "Cendorq Support <support@cendorq.com>",
]);

expect(authOrchestrationPath, [
  "CUSTOMER_AUTH_METHODS",
  "CUSTOMER_EMAIL_ORCHESTRATION_STEPS",
  "CUSTOMER_EMAIL_DELIVERABILITY_STANDARD",
  "CUSTOMER_EMAIL_REVENUE_SEQUENCE",
]);

expect(pricingOrchestrationPath, [
  "CENDORQ_PLAN_PRICES",
  "amountCents: 49700",
  "amountCents: 149700",
  "amountCents: 59700",
  "CENDORQ_CHECKOUT_ORCHESTRATION",
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

expect("src/app/signup/page.tsx", [
  "Create your Cendorq account",
  "noIndex: true",
  "Continue with Google",
  "Continue with Microsoft",
  "Continue with Apple",
  "Work email",
  "Password",
  "Create account and confirm email",
  "Dashboard and result access require email confirmation",
  "Send a magic link",
]);

expect("src/app/login/page.tsx", [
  "Customer login",
  "noIndex: true",
  "Magic link first",
  "Send magic link",
  "Use passkey when available",
  "Create account instead",
]);

expect("src/app/verify-email/page.tsx", [
  "Confirm your email",
  "noIndex: true",
  "Cendorq Support <support@cendorq.com>",
  "support@cendorq.com",
  "Open dashboard after confirmation",
  "Send a magic link",
  "Use a different email",
]);

expect("src/app/dashboard/page.tsx", [
  "Customer dashboard",
  "noIndex: true",
  "Private revenue workspace",
  "Find the next move that can turn hesitation into revenue.",
  "Next best action",
  "Continue Free Scan",
  "Proof and trust center",
  "Strategic conversation",
  "Open report vault",
  "Manage billing and plans",
]);

expect("src/app/dashboard/reports/page.tsx", [
  "Report vault",
  "noIndex: true",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "confidence labels",
  "Compare plans",
]);

expect("src/app/dashboard/billing/page.tsx", [
  "Billing and plans",
  "noIndex: true",
  "Billing and plan center",
  "Turn the first read into the right paid next step.",
  "Best revenue move",
  "Deep Review $497",
  "Build Fix $1,497",
  "Ongoing Control $597/month",
  "Compare plan options",
]);

expect("src/app/checkout/start/page.tsx", [
  "Start checkout",
  "noIndex: true",
  "Secure checkout",
  "Stripe link coming next",
]);

expect("src/app/checkout/success/page.tsx", [
  "Checkout complete",
  "noIndex: true",
  "Payment complete",
  "Post-payment dashboard activation",
]);

expect(shieldPath, [
  "CENDORQ_SHIELD_RULES",
  "HOSTILE_INPUT_CONTROLS",
  "Device and session fortress",
  "Hostile input rejection",
  "AI prompt injection shield",
  "compromised-device-or-risky-session",
  "phishing-resistant MFA readiness",
  "server-side authorization",
  "server-side schema validation",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-platform-routes.mjs",
  "validate-cendorq-shield-standard.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden("src/app/signup/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "password in email"]);
forbidden("src/app/login/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "password in email"]);
forbidden("src/app/verify-email/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "account exists"]);
forbidden("src/app/dashboard/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "raw evidence"]);
forbidden("src/app/dashboard/reports/page.tsx", ["dangerouslySetInnerHTML", "raw evidence", "guaranteed outcome"]);
forbidden("src/app/dashboard/billing/page.tsx", ["dangerouslySetInnerHTML", "paid access without entitlement", "guaranteed outcome"]);
forbidden("src/app/checkout/start/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "guaranteed outcome"]);
forbidden("src/app/checkout/success/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "guaranteed outcome"]);

if (failures.length) {
  console.error("Customer platform route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer platform route validation passed with owner posture, customer re-entry, final pricing, checkout activation, signup, email verification, dashboard, report vault, billing center, route map, and Cendorq Shield synchronized.");

function validateFileExists(path) {
  if (!existsSync(join(root, path))) failures.push(`Missing customer platform route dependency: ${path}`);
}

function expect(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required customer platform phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden customer platform phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
