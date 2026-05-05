import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "src/lib/customer-auth-orchestration.ts",
  "src/lib/pricing-checkout-orchestration.ts",
  "src/lib/customer-platform-route-map.ts",
  "src/app/login/page.tsx",
  "src/app/signup/page.tsx",
  "src/app/verify-email/page.tsx",
  "src/app/dashboard/page.tsx",
  "src/app/plans/page.tsx",
  "src/components/plans/conversion-plan-page.tsx",
  "src/app/dashboard/billing/page.tsx",
  "src/app/checkout/start/page.tsx",
  "src/app/checkout/success/page.tsx",
  "src/scripts/validate-routes-chain.mjs",
];

for (const path of requiredFiles) {
  if (!existsSync(join(root, path))) failures.push(`Missing customer orchestration dependency: ${path}`);
}

expect("src/lib/customer-auth-orchestration.ts", [
  "CUSTOMER_AUTH_METHODS",
  "Email magic link",
  "Passkey-ready access",
  "CUSTOMER_EMAIL_DELIVERABILITY_STANDARD",
  "CUSTOMER_EMAIL_REVENUE_SEQUENCE",
  "SPF, DKIM, and DMARC",
]);

expect("src/lib/pricing-checkout-orchestration.ts", [
  "CENDORQ_PLAN_PRICES",
  "amountCents: 49700",
  "amountCents: 149700",
  "amountCents: 59700",
  "CENDORQ_CHECKOUT_ORCHESTRATION",
  "CENDORQ_POST_PAYMENT_EMAILS",
]);

expect("src/lib/customer-platform-route-map.ts", [
  "/login",
  "/verify-email",
  "/dashboard",
  "verification click redirects to dashboard",
  "login uses magic link first with passkey-ready path and password fallback",
]);

expect("src/app/login/page.tsx", ["Customer login", "Magic link first", "Send magic link", "Use passkey when available"]);
expect("src/app/signup/page.tsx", ["Create your Cendorq account", "Create account and confirm email", "Send a magic link"]);
expect("src/app/verify-email/page.tsx", ["Confirm your email", "Open dashboard after confirmation", "Send a magic link"]);
expect("src/app/dashboard/page.tsx", ["Private revenue workspace", "Next best action", "Continue Free Scan"]);
expect("src/app/plans/page.tsx", ["CENDORQ_PLAN_PRICES", "Unlock Deep Review", "Unlock Build Fix", "Start Ongoing Control"]);
expect("src/components/plans/conversion-plan-page.tsx", ["getCendorqPlanPrice", "After payment:"]);
expect("src/app/dashboard/billing/page.tsx", ["getPaidCendorqPlanPrice", "Unlock Deep Review", "After payment:"]);
expect("src/app/checkout/start/page.tsx", ["Start checkout", "Secure checkout", "Stripe link coming next"]);
expect("src/app/checkout/success/page.tsx", ["Checkout complete", "Payment complete", "Post-payment dashboard activation"]);
expect("src/scripts/validate-routes-chain.mjs", ["validate-customer-auth-orchestration.mjs"]);

forbidden(requiredFiles, [
  "$750+",
  "$300/mo",
  "starting at",
  "template page",
  "generic page",
  "guaranteed revenue",
  "guaranteed ROI",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "password in email",
  "skip verification",
]);

if (failures.length) {
  console.error("Customer auth and checkout orchestration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer auth and checkout orchestration validation passed. Customer access, dashboard activation, final pricing, checkout, billing, and post-payment flow stay synchronized.");

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
