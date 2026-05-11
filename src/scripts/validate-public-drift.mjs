import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const activePublicFiles = [
  "src/app/page.tsx",
  "src/app/free-check/page.tsx",
  "src/components/free-check/guided-free-check-form-v3.tsx",
  "src/app/verify-email/page.tsx",
  "src/app/checkout/success/page.tsx",
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
  "src/app/api/customer/email/confirm/route.ts",
  "src/lib/customer-auth-provider-config.ts",
  "src/lib/customer-remembered-session-runtime.ts",
  "src/lib/customer-email-verification-token-runtime.ts",
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
  "Email verification gate",
  "VerifyAtmosphere",
  "text-white",
  "bg-cyan",
  "Signup safety standard",
  "Identity is access",
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
  if (combined.includes(phrase)) failures.push(`Forbidden old, internal, dark, or unsafe public language found in active surfaces: ${phrase}`);
}

for (const route of forbiddenActiveRoutes) {
  if (combined.includes(route)) failures.push(`Forbidden old public route found in active surfaces: ${route}`);
}

expect("src/app/api/auth/continue/route.ts", [
  "readCustomerRememberedSession",
  "session-unavailable",
  "session-required",
  "NextResponse.redirect",
]);

expect("src/app/api/customer/email/confirm/route.ts", [
  "setCustomerRememberedSessionCookie",
  "result.rememberedSession.eligible",
  "status: 303",
]);

expect("src/lib/customer-remembered-session-runtime.ts", [
  "CENDORQ_CUSTOMER_SESSION_SECRET",
  "CENDORQ_CUSTOMER_SESSION_COOKIE",
  "httpOnly: true",
  "secure: true",
  "sameSite: \"lax\"",
  "timingSafeEqual",
  "signature-mismatch",
  "not-configured",
]);

expect("src/lib/customer-email-verification-token-runtime.ts", [
  "rememberedSession",
  "rawEmailReturned: false",
  "rawTokenReturned: false",
  "eligible: verified",
]);

expect("src/app/login/page.tsx", [
  "Trusted browser access is not fully connected yet.",
  "Signed remembered session",
  "Continue if remembered",
]);

expect("src/app/api/auth/email/route.ts", [
  "projectEmailAccessState",
  "email-sent",
  "email-queued",
  "email-unavailable",
  "providerDelivery.skipped",
]);

if (failures.length) {
  console.error("Public drift validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public drift validation passed with signed remembered-session behavior, truthful email access states, and clean public journey guardrails.");

function expect(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
