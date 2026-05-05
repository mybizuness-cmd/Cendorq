import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const orchestrationPath = "src/lib/customer-auth-orchestration.ts";
const routeMapPath = "src/lib/customer-platform-route-map.ts";
const loginPath = "src/app/login/page.tsx";
const signupPath = "src/app/signup/page.tsx";
const verifyPath = "src/app/verify-email/page.tsx";
const dashboardPath = "src/app/dashboard/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-customer-auth-orchestration.mjs";

for (const path of [orchestrationPath, routeMapPath, loginPath, signupPath, verifyPath, dashboardPath, routesChainPath]) {
  if (!existsSync(join(root, path))) failures.push(`Missing auth orchestration dependency: ${path}`);
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
  "Verified welcome",
  "Scan incomplete nudge",
  "Report-ready nudge",
  "Deep Review fit nudge",
  "Support recovered nudge",
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
  "CUSTOMER_AUTH_METHODS",
  "CUSTOMER_EMAIL_ORCHESTRATION_STEPS",
  "CUSTOMER_EMAIL_DELIVERABILITY_STANDARD",
  "CUSTOMER_EMAIL_REVENUE_SEQUENCE",
]);

expect(signupPath, [
  "Create your Cendorq account | Cendorq",
  "path: \"/signup\"",
  "noIndex: true",
  "Email confirmation before dashboard and result access",
  "Magic-link-first re-entry",
  "Return by magic link when you come back later",
  "Send a magic link",
  "CUSTOMER_AUTH_METHODS",
  "CUSTOMER_EMAIL_ORCHESTRATION_STEPS",
  "CUSTOMER_EMAIL_DELIVERABILITY_STANDARD",
]);

expect(verifyPath, [
  "Confirm your email | Cendorq",
  "path: \"/verify-email\"",
  "noIndex: true",
  "Confirm once. Land inside the dashboard.",
  "Select the confirmation link to confirm email ownership and open the customer dashboard.",
  "Open dashboard after confirmation",
  "Send a magic link",
  "verification click redirects to dashboard",
  "CUSTOMER_EMAIL_ORCHESTRATION_STEPS",
  "CUSTOMER_EMAIL_REVENUE_SEQUENCE",
]);

expect(dashboardPath, [
  "Private revenue workspace",
  "Next best action",
  "Continue Free Scan",
  "See Deep Review",
  "Manage billing and plans",
  "Open report vault",
]);

expect(routesChainPath, [validatorPath]);

forbidden(loginPath, unsafeAuthImplementationPhrases());
forbidden(signupPath, unsafeAuthImplementationPhrases());
forbidden(verifyPath, unsafeAuthImplementationPhrases());
forbidden(orchestrationPath, [
  "marketing emails continue after unsubscribe",
  "ignore suppression",
  "skip DMARC",
  "magic links never expire",
  "show account exists",
  "store password in localStorage",
]);

if (failures.length) {
  console.error("Customer auth orchestration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer auth orchestration validation passed. Signup, verification, magic-link re-entry, dashboard activation, deliverability, consent separation, and paid lifecycle email follow-up stay synchronized.");

function unsafeAuthImplementationPhrases() {
  return [
    "localStorage.setItem",
    "sessionStorage.setItem",
    "password in email",
    "guaranteed revenue",
    "guaranteed ROI",
    "account exists",
    "no unsubscribe",
    "skip verification",
  ];
}

function expect(path, phrases) {
  if (!existsSync(join(root, path))) return;
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
