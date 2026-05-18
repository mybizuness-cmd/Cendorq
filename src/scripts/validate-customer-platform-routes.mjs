import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const legacyPlanLabels = ["AI" + " Readiness Review", "Signal" + " Repair", "Readiness" + " Control"];

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
  "Start with the Free Scan.",
  "noIndex: true",
  "Cendorq checks if AI and search can understand your business clearly enough to trust and recommend it.",
  "Already have an account?",
  "Use customer access",
  "Start Free Scan",
]);

expect("src/app/login/page.tsx", [
  "Access your Cendorq account.",
  "noIndex: true",
  "Use the same email you used for your Free Scan, form, or plan.",
  "Send secure access link",
  "No password needed.",
  "First time here?",
  "Provider sign-in is hidden until it is fully ready.",
]);

expect("src/app/verify-email/page.tsx", [
  "Check your email to continue.",
  "noIndex: true",
  "Request a new link",
  "Start Free Scan",
  "Confirm once.",
  "Find the message from Cendorq Support.",
]);

expect("src/app/dashboard/page.tsx", [
  "AI readiness control center",
  "noIndex: true",
  "Your Cendorq workspace is ready.",
  "one clear next action",
  "One next step.",
  "Scan. Review. Repair. Control.",
  "Open Review page",
  "Open Repair page",
]);

expect("src/app/dashboard/reports/page.tsx", [
  "Readiness proof vault",
  "noIndex: true",
  "Paid plan report delivery operating system",
  "Dashboard + email attachment",
  "Readiness signal result dashboard-only protected result",
  "Deep Review report dashboard plus email attachment",
  "Build Fix summary dashboard plus email attachment",
  "Ongoing Control monthly summary dashboard plus email attachment",
]);

expect("src/app/dashboard/billing/page.tsx", [
  "Readiness plan depth",
  "noIndex: true",
  "Payment should unlock the right readiness layer.",
  "Review",
  "Repair",
  "Control",
  "Open plan page",
  "Checkout success parity",
]);

expect("src/app/checkout/start/page.tsx", [
  "Start checkout | Cendorq",
  "noIndex: true",
  "secure Stripe payment",
  "redirect(buildCheckoutDestination(plan.paymentLink, planKey, searchParams))",
  "client_reference_id",
  "cendorq_plan",
]);

expect("src/app/checkout/success/page.tsx", [
  "Payment complete | Cendorq",
  "noIndex: true",
  "Payment complete",
  "Payment confirmed",
  "CheckoutDashboardRedirect",
  "One next step",
  "Open your inbox",
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

forbidden("src/app/signup/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "password in email", "Create workspace", "Continue with Google", ...legacyPlanLabels]);
forbidden("src/app/login/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "password in email", "Create workspace", "Continue to dashboard", "Continue with Google", ...legacyPlanLabels]);
forbidden("src/app/verify-email/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "account exists", ...legacyPlanLabels]);
forbidden("src/app/dashboard/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "raw evidence", ...legacyPlanLabels]);
forbidden("src/app/dashboard/reports/page.tsx", ["dangerouslySetInnerHTML", "raw evidence", "outcome warranty", ...legacyPlanLabels]);
forbidden("src/app/dashboard/billing/page.tsx", ["dangerouslySetInnerHTML", "paid access without entitlement", "outcome warranty", ...legacyPlanLabels]);
forbidden("src/app/checkout/start/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "outcome warranty", ...legacyPlanLabels]);
forbidden("src/app/checkout/success/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "outcome warranty", ...legacyPlanLabels]);

if (failures.length) {
  console.error("Customer platform route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer platform route validation passed with owner posture, Free Scan-first access, email verification, readiness dashboard, report vault, billing center, checkout activation, route map, and Cendorq Shield synchronized.");

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
    if (text.includes(phrase)) failures.push(`${path} contains blocked customer platform phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
