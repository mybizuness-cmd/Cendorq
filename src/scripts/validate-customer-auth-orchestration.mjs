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
  "src/components/free-check/guided-free-check-form-v3.tsx",
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

expect("src/app/login/page.tsx", [
  "Access your Cendorq account.",
  "Use the same email you used for your Free Scan, form, or plan.",
  "Send secure access link",
  "No password needed.",
  "Provider sign-in is hidden until it is fully ready.",
]);

expect("src/app/signup/page.tsx", [
  "Start with the Free Scan.",
  "Cendorq checks if AI and search can understand your business clearly enough to trust and recommend it.",
  "Already have an account?",
  "Use customer access",
  "Start Free Scan",
]);

expect("src/app/verify-email/page.tsx", [
  "Check your email to continue.",
  "Request a new link",
  "Start Free Scan",
  "Confirm once.",
  "Find the message from Cendorq Support.",
]);

expect("src/components/free-check/guided-free-check-form-v3.tsx", [
  "const [values, setValues] = useState<FormValues>(INITIAL_VALUES)",
  "hasStarted ? buildQualityScore(values) : 0",
  "First-use progress starts at zero until the customer types.",
]);

expect("src/app/dashboard/page.tsx", [
  "Visibility command center",
  "Know what the market can see, trust, and act on next.",
  "This is not an account page.",
  "One next step.",
  "Scan. Diagnose. Fix. Control.",
]);
expect("src/app/plans/page.tsx", ["CENDORQ_PLAN_PRICES", "Open Review page", "Open Repair page", "Open Control page"]);
expect("src/components/plans/conversion-plan-page.tsx", ["getCendorqPlanPrice", "What this helps you decide", "Review all plans"]);
expect("src/app/dashboard/billing/page.tsx", ["getPaidCendorqPlanPrice", "Open Review page", "Payment should unlock the right readiness layer", "Checkout success parity"]);
expect("src/app/checkout/start/page.tsx", ["Start checkout", "secure Stripe payment", "client_reference_id", "cendorq_plan"]);
expect("src/app/checkout/success/page.tsx", ["Payment complete", "Payment confirmed", "One next step", "Open your inbox"]);
expect("src/scripts/validate-routes-chain.mjs", ["validate-customer-auth-orchestration.mjs"]);

forbidden(requiredFiles, [
  "Create your Cendorq workspace.",
  "Create or access your workspace.",
  "Create workspace",
  "Continue to dashboard",
  "Continue with Google",
  "Continue with Microsoft",
  "Continue with Apple",
  "Your Cendorq workspace is ready.",
  "A workspace can exist before a scan.",
  "$750+",
  "$300/mo",
  "starting at",
  "template page",
  "generic page",
  "guaranteed revenue",
  "guaranteed ROI",
  "password in email",
  "skip verification",
]);

if (failures.length) {
  console.error("Customer auth and checkout orchestration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer auth and checkout orchestration validation passed. Free Scan-first access, zero first-use progress, checkout, billing, and post-payment flow stay synchronized.");

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
