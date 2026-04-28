import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const routeMapPath = "src/lib/customer-platform-route-map.ts";
const shieldPath = "src/lib/cendorq-shield-standard.ts";
const packagePath = "package.json";

const requiredRouteFiles = [
  "src/app/signup/page.tsx",
  "src/app/verify-email/page.tsx",
  "src/app/dashboard/page.tsx",
  "src/app/dashboard/reports/page.tsx",
  "src/app/dashboard/billing/page.tsx",
];

for (const file of [routeMapPath, shieldPath, packagePath, ...requiredRouteFiles]) validateFileExists(file);

expect(routeMapPath, [
  "CUSTOMER_PLATFORM_ROUTES",
  "CUSTOMER_PLATFORM_STAGES",
  "CUSTOMER_PLATFORM_ROUTE_GUARDS",
  "getCustomerPlatformRouteMap",
  "/signup",
  "/verify-email",
  "/dashboard",
  "/dashboard/reports",
  "/dashboard/billing",
  "dashboard access requires verified email",
  "scan results require account ownership",
  "billing access requires authenticated customer",
  "Cendorq Support <support@cendorq.com>",
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
]);

expect("src/app/verify-email/page.tsx", [
  "Confirm your email",
  "noIndex: true",
  "Cendorq Support <support@cendorq.com>",
  "support@cendorq.com",
  "Continue to Free Scan after confirmation",
  "Use a different email",
]);

expect("src/app/dashboard/page.tsx", [
  "Customer dashboard",
  "noIndex: true",
  "Customer command room",
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
  "Entitlement status: Free Scan",
  "Invoice access: Available after checkout",
  "support@cendorq.com",
  "Compare plan options",
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
]);

forbidden("src/app/signup/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "password in email"]);
forbidden("src/app/verify-email/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "account exists"]);
forbidden("src/app/dashboard/page.tsx", ["dangerouslySetInnerHTML", "localStorage", "sessionStorage", "raw evidence"]);
forbidden("src/app/dashboard/reports/page.tsx", ["dangerouslySetInnerHTML", "raw evidence", "guaranteed outcome"]);
forbidden("src/app/dashboard/billing/page.tsx", ["dangerouslySetInnerHTML", "paid access without entitlement", "guaranteed outcome"]);

if (failures.length) {
  console.error("Customer platform route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer platform route validation passed. Signup, email verification, dashboard, report vault, billing center, route map, and Cendorq Shield remain synchronized and no-indexed where appropriate.");

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
