import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const activePublicFiles = [
  "src/app/page.tsx",
  "src/app/free-check/page.tsx",
  "src/components/free-check/guided-free-check-form-v3.tsx",
  "src/app/plans/page.tsx",
  "src/app/plans/deep-review/page.tsx",
  "src/app/plans/build-fix/page.tsx",
  "src/app/plans/ongoing-control/page.tsx",
  "src/components/plans/conversion-plan-page.tsx",
  "src/app/login/page.tsx",
  "src/app/signup/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/disclaimer/page.tsx",
  "src/app/api/auth/continue/route.ts",
  "src/app/api/auth/email/route.ts",
  "src/app/api/auth/provider/[provider]/route.ts",
  "src/lib/customer-auth-provider-config.ts",
  "src/layout/site-header.tsx",
  "src/layout/site-header-conversion.tsx",
  "src/layout/site-footer.tsx",
  "src/lib/pricing-checkout-orchestration.ts",
];

const requiredCurrentLanguage = [
  "AI Engine Readiness",
  "Free Scan",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "Scan",
  "Review",
  "Repair",
  "Control",
];

const forbiddenActiveLanguage = [
  "Free Market Signal Scan",
  "Free Search Presence Scan",
  "Search Presence OS",
  "Visibility Blueprint",
  "Presence Infrastructure",
  "Presence Command",
  "Market Command Intelligence",
  "Market command terms",
  "Market command intelligence disclaimer",
  "Deep Review is",
  "Build Fix is",
  "Ongoing Control is",
  "Diagnose before fixing",
  "Unlock Build Fix",
  "Unlock Ongoing Control",
  "Compare pricing",
  "After payment:",
  "Do not treat this",
  "Business context only",
  "No private credentials or payment details",
  "Protected dashboard result after verification",
  "Dashboard result preview",
  "A signal you can actually use",
  "Business seen by customers",
  "Cause proof",
  "Focused change",
  "Monthly watch",
  "Open dashboard support",
  "Your generated password is",
  "Temporary password:",
  "Here is your password",
  "Provider routes must fail safely when provider URLs are not configured.",
];

const forbiddenActiveRoutes = [
  "/pricing",
  "/pricing/full-diagnosis",
  "/pricing/optimization",
  "/pricing/monthly-partner",
  "/diagnosis",
  "/contact",
  "/profile",
  "/faq",
];

for (const file of activePublicFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing active public drift file: ${file}`);
}

const combined = activePublicFiles
  .filter((file) => existsSync(join(root, file)))
  .map((file) => `\n/* ${file} */\n${read(file)}`)
  .join("\n");

for (const phrase of requiredCurrentLanguage) {
  if (!combined.includes(phrase)) failures.push(`Missing current public language: ${phrase}`);
}

for (const phrase of forbiddenActiveLanguage) {
  if (combined.includes(phrase)) failures.push(`Forbidden old, internal, or unsafe public language found in active surfaces: ${phrase}`);
}

for (const route of forbiddenActiveRoutes) {
  if (combined.includes(route)) failures.push(`Forbidden old public route found in active surfaces: ${route}`);
}

expect("src/app/page.tsx", [
  "If AI engines cannot understand your business",
  "Start with the Free Scan.",
  "See the first place your business may be unclear, under-trusted, or harder to choose.",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "text-[clamp(3rem,6.8vw,6.65rem)]",
]);

expect("src/app/free-check/page.tsx", [
  "See the first signal before you buy deeper work.",
  "Cendorq checks whether your business is clear enough for AI engines and customers",
  "GuidedFreeCheckFormV3",
]);

expect("src/components/free-check/guided-free-check-form-v3.tsx", [
  "Start with what customers see.",
  "requestFreeScanVerifyToViewHandoff",
  "requestedDestination: \"/dashboard/reports/free-scan\"",
  "See AI Readiness Review",
  "See Signal Repair",
  "See Readiness Control",
]);

expect("src/app/plans/page.tsx", [
  "Choose the right AI-readiness depth.",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "AI Readiness Review $497",
  "Signal Repair $1,497",
  "Readiness Control $597/mo",
]);

expect("src/components/plans/conversion-plan-page.tsx", [
  "What this helps you decide",
  "Best when",
  "Not the right first step when",
  "AI Readiness Review $497",
  "Signal Repair $1,497",
  "Readiness Control $597/mo",
  "text-[clamp(3rem,6vw,6.15rem)]",
]);

expect("src/layout/site-header-conversion.tsx", [
  "label: \"AI Readiness\"",
  "label: \"Plans\"",
  "Sign in",
  "Start Free Scan",
  "single stable row",
]);

expect("src/lib/customer-auth-provider-config.ts", [
  "Continue with Google",
  "Continue with Microsoft",
  "Continue with Apple",
  "Continue with LinkedIn",
  "Continue with Facebook",
  "CENDORQ_AUTH_GOOGLE_URL",
  "CENDORQ_AUTH_MICROSOFT_URL",
  "CENDORQ_AUTH_APPLE_URL",
  "CENDORQ_AUTH_LINKEDIN_URL",
  "CENDORQ_AUTH_FACEBOOK_URL",
]);

expect("src/app/api/auth/continue/route.ts", [
  "cendorq_customer_session",
  "session-required",
  "SAFE_DASHBOARD_PATHS",
  "NextResponse.redirect",
]);

expect("src/app/api/auth/provider/[provider]/route.ts", [
  "provider-not-ready",
  "getConfiguredCustomerAuthProviderUrl",
  "returnTo",
  "NextResponse.redirect",
]);

expect("src/app/api/auth/email/route.ts", [
  "issueCustomerConfirmationEmail",
  "support-or-billing-entry",
  "account-recovery",
  "email-sent",
  "email-queued",
  "customerEmail: email",
]);

expect("src/app/login/page.tsx", [
  "Return to your Cendorq workspace.",
  "Continue if remembered",
  "Send secure access link",
  "Continue with Google",
  "Continue with Microsoft",
  "Continue with Apple",
  "Continue with LinkedIn",
  "Continue with Facebook",
  "Create access",
  "Check your inbox for Cendorq Support <support@cendorq.com>",
  "Come back without starting over.",
  "Cendorq never emails a password.",
  "text-[clamp(2.75rem,5.6vw,5.85rem)]",
]);

expect("src/app/signup/page.tsx", [
  "Start the workspace with the Free Scan.",
  "Free Scan starts the workspace.",
  "Cendorq sends secure access from support@cendorq.com.",
  "No generated password is emailed.",
  "The account username is the email used for the Free Scan or payment.",
  "Provider sign-in confirms identity; it does not replace the business Free Scan intake.",
  "Continue with Google",
  "Continue with Microsoft",
  "Continue with Apple",
  "text-[clamp(3rem,6vw,6.15rem)]",
]);

expect("src/app/privacy/page.tsx", [
  "Trust starts with knowing what data belongs in the system.",
  "Free Scan, AI Readiness Review, Signal Repair, and Readiness Control stay tied to their scope.",
  "Sign in for support",
  "Start Free Scan",
]);

expect("src/app/terms/page.tsx", [
  "Clear rules keep the customer path impossible to confuse.",
  "One service depth does not silently include another service depth's work.",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "Sign in for support",
]);

expect("src/app/disclaimer/page.tsx", [
  "Strong guidance works best when the limits are clear.",
  "No guaranteed rankings, AI placement, leads, revenue, sales, or platform treatment.",
  "Use each service for the decision it was built to support.",
  "Sign in for support",
]);

expect("src/lib/pricing-checkout-orchestration.ts", [
  "name: \"AI Readiness Review\"",
  "name: \"Signal Repair\"",
  "name: \"Readiness Control\"",
  "key: \"deep-review\"",
  "key: \"build-fix\"",
  "key: \"ongoing-control\"",
]);

if (failures.length) {
  console.error("Public drift validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public drift validation passed with AI Engine Readiness naming, clean public pages, single-row header navigation, customer-facing auth copy, secure email access, Free Scan workspace start, preserved internal checkout keys, and no stale public plan clutter.");

function expect(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
