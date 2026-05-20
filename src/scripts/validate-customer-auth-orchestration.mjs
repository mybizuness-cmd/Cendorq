import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "src/lib/customer-auth-orchestration.ts",
  "src/lib/customer-access-eligibility.ts",
  "src/lib/pricing-checkout-orchestration.ts",
  "src/lib/customer-platform-route-map.ts",
  "src/app/api/auth/email/route.ts",
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

expect("src/lib/customer-access-eligibility.ts", [
  "CUSTOMER_ACCESS_ELIGIBILITY_STANDARD",
  "CUSTOMER_ACCESS_ELIGIBILITY_SOURCE_ORDER",
  "resolveCustomerAccessEligibility",
  "Authentication only proves who the person is; Cendorq still checks whether the verified email belongs to a Free Scan or paid customer before dashboard access.",
  "Known Free Scan or paid customers can receive access and continue to the dashboard.",
  "Unknown emails are routed to Free Scan instead of receiving a blank dashboard account.",
  "Wrong-email recovery tells the customer to use the email from the Free Scan, form, or plan, or start a new Free Scan.",
]);

expect("src/app/api/auth/email/route.ts", [
  "resolveCustomerAccessEligibility",
  "buildFreeScanRequiredUrl",
  "if (!eligibility.eligible)",
  "method: \"email\"",
  "NO_STORE_HEADERS",
  "redirectNoStore",
  "NextResponse.redirect(url, { status: 303 })",
  "Cache-Control",
  "X-Robots-Tag",
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
  "Use the same email you used when you submitted your Free Scan or bought a plan.",
  "Need Cendorq to check your first AI Visibility signal?",
  "We will send a secure link if this email is tied to your Free Scan, Diagnosis, report, plan, billing, or support context.",
  "Start the Free Scan so Cendorq can check the first AI Visibility signal: how AI, search, and customers understand your business.",
  "No empty accounts. Your dashboard opens when there is a scan, Diagnosis, report, plan, billing, or support item to show.",
  "first AI Visibility signal",
  "Other access options are hidden until they are fully ready.",
]);

expect("src/app/signup/page.tsx", [
  "Start with the Free Scan.",
  "Cendorq checks the first AI Visibility signal: whether AI, search, and customers can understand, trust, and choose the business clearly.",
  "New visitors should begin here so Cendorq can understand the business and its first AI Visibility signal.",
  "scan, Diagnosis, report, plan, billing, or support context",
  "Free Scan captures the first AI Visibility signal before Diagnosis, Review, Repair, Control, reports, billing, or support need dashboard access.",
  "Use customer access",
  "Start Free Scan",
  "SAFE_DASHBOARD_PATHS",
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
  "Private AI Visibility command center",
  "Your Cendorq command center is ready.",
  "Cendorq keeps AI Visibility, Diagnosis, reports, plans, billing, support, and one clear next command in one protected dashboard.",
  "Scan. Diagnose. Review. Repair. Control.",
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
  "Your Cendorq workspace is ready.",
  "A workspace can exist before a scan.",
  "Scan. Diagnose. Fix. Control.",
  "$750+",
  "$300/mo",
  "starting at",
  "template page",
  "generic page",
  "guaranteed revenue",
  "guaranteed ROI",
  "skip verification",
]);

forbidden(["src/app/dashboard/page.tsx"], [
  "Private AI readiness control center",
  "Your Cendorq account is ready.",
  "one clear next action",
]);

forbidden(["src/app/signup/page.tsx"], [
  "Cendorq checks if AI and search can understand your business clearly enough to trust and recommend it.",
  "Open real results",
]);

forbidden(["src/app/login/page.tsx"], [
  "We will send a secure link if this email is tied to your Free Scan or plan. No password needed.",
  "Start the Free Scan so Cendorq can check how AI and search understand your business.",
  "No empty accounts. Your dashboard opens when there is a scan, plan, report, billing, or support item to show.",
]);

if (failures.length) {
  console.error("Customer auth and checkout orchestration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer auth and checkout orchestration validation passed with AI Visibility signup/login language, dashboard command language, checkout, billing, and post-payment flow synchronized.");

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
