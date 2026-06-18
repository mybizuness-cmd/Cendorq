import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const publicCommandDesignAnchors = [
  "AI Search Presence Repair",
  "Free Scan",
  "Presence Report",
  "Decision Gap",
  "Repair Queue",
  "Scan",
  "Review",
  "Repair",
  "Control",
];

const activePublicFiles = [
  "src/app/page.tsx",
  "src/components/homepage/homepage-clarity-reset.tsx",
  "src/app/free-check/page.tsx",
  "src/app/plans/page.tsx",
  "src/app/faq/page.tsx",
  "src/app/plans/plan-data.ts",
  "src/app/connect/page.tsx",
  "src/app/report/page.tsx",
  "src/app/dashboard/page.tsx",
  "src/layout/site-header-conversion.tsx",
  "src/layout/site-footer.tsx",
  "src/lib/seo.ts",
  "src/app/layout.tsx",
  "src/lib/cendorq-experience-system.ts",
  "src/app/api/customer/email/confirm/route.ts",
  "src/app/api/auth/continue/route.ts",
  "src/app/api/auth/email/route.ts",
  "src/app/api/auth/provider/[provider]/route.ts",
  "src/app/login/page.tsx",
  "src/lib/customer-remembered-session-runtime.ts",
  "src/lib/customer-email-verification-token-runtime.ts",
];

for (const file of activePublicFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing active public drift file: ${file}`);
}

for (const retiredRouteFile of [
  "src/app/sample-report/page.tsx",
  "src/app/sample-report/dentist/page.tsx",
  "src/app/sample-report/med-spa/page.tsx",
  "src/app/sample-report/law-firm/page.tsx",
  "src/app/sample-report/contractor/page.tsx",
]) {
  if (existsSync(join(root, retiredRouteFile))) failures.push(`Retired public sample-report route still exists: ${retiredRouteFile}`);
}

expect("src/app/page.tsx", [
  "HomepageClarityReset",
  "Cendorq | AI Search Presence Repair for Businesses",
  "Decision Gap",
  "Repair Queue",
]);

expect("src/components/homepage/homepage-clarity-reset.tsx", [
  "AI Search Presence Repair",
  "Know why customers choose someone else.",
  "Run Free Scan",
  "See How It Works",
  "Presence Report in motion",
  "Decision Gap",
  "Repair Queue",
]);

expect("src/layout/site-header-conversion.tsx", [
  "Product",
  "Plans",
  "FAQ",
  "Contact",
  "Customer Access",
  "Start Free Scan",
]);

expect("src/app/free-check/page.tsx", [
  "Free Scan",
  "Presence Report",
  "AI Search Presence Repair",
]);

expect("src/app/plans/page.tsx", [
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
]);

expect("src/app/plans/plan-data.ts", [
  "Read FAQ",
  "Decision Gap",
  "Repair Queue",
  "AI Search Presence",
  "Start Free Scan",
  "Start Deep Review",
  "Start Build Fix",
  "Start Ongoing Control",
]);

expect("src/app/faq/page.tsx", [
  "Answers before the first repair.",
  "AI Search Presence Repair",
  "Decision Gap",
  "Repair Queue",
  "Run Free Scan",
  "Compare Plans",
  "FAQPage",
]);

expect("src/app/connect/page.tsx", [
  "Contact Us",
  "Email Support",
  "Start Free Scan",
  "Compare plans",
]);

expect("src/app/report/page.tsx", [
  "Report Access",
  "Open Reports",
  "Start Scan",
  "Customer Access",
  "Read FAQ",
  "Presence Report",
  "AI Search Presence Repair",
]);

expect("src/layout/site-footer.tsx", [
  "Privacy",
  "Terms",
  "Disclaimer",
]);

expect("src/app/dashboard/page.tsx", [
  "Repair Queue",
  "Control Snapshot",
]);

expect("src/lib/seo.ts", [
  "AI Search Presence Repair",
  "Presence Report",
  "Decision Gap",
  "Repair Queue",
  "find, understand, trust, compare, and choose",
]);

expect("src/app/layout.tsx", [
  "AI Search Presence Repair",
  "Presence Report",
  "Decision Gap",
  "Repair Queue",
  "FAQ guidance",
  "absoluteUrl(\"/faq\")",
]);

expect("src/lib/cendorq-experience-system.ts", [
  "CENDORQ_EXPERIENCE_SYSTEM",
  "CENDORQ_EXPERIENCE_GUARDRAILS",
  "Uncluttered pages",
  "Cendorq-specific signal language",
]);

expect("src/app/login/page.tsx", [
  "Customer access | Cendorq",
  "Access your Cendorq account.",
  "Return with your email.",
  "No password to remember",
  "This browser is not remembered yet.",
  "email-unavailable",
  "Use the same email or connected provider",
  "Free Scan business context stays separate from account access",
  "Access return paths",
]);

expect("src/app/api/customer/email/confirm/route.ts", [
  "projectSafeConfirmationResponse",
  "cookieOnly: true",
  "customerIdHashReturned: false",
  "signupEmailHashReturned: false",
  "rawEmailReturned: false",
  "rawTokenReturned: false",
  "setCustomerRememberedSessionCookie",
]);

expect("src/app/api/auth/continue/route.ts", ["readCustomerRememberedSession", "session-unavailable", "session-required"]);
expect("src/app/api/auth/email/route.ts", ["projectEmailAccessState", "email-sent", "email-queued", "email-unavailable"]);
expect("src/app/api/auth/provider/[provider]/route.ts", ["safeDashboardPath", "const returnTo = safeDashboardPath", "loginUrl.searchParams.set(\"returnTo\", returnTo)", "provider-not-ready"]);
expect("src/lib/customer-email-verification-token-runtime.ts", ["rememberedSession", "rawEmailReturned: false", "rawTokenReturned: false"]);

forbidden("src/app/page.tsx", [
  "AI Engine Readiness for Businesses",
  "cinematic-ai-visibility-readiness-experience",
  "function PresenceReport()",
]);

forbidden("src/components/homepage/homepage-clarity-reset.tsx", ["/sample-report", "Sample Report", "rounded-full", "Choice Gap"]);
forbidden("src/layout/site-header-conversion.tsx", ["/sample-report", "Sample Report", "rounded-full"]);
forbidden("src/layout/site-footer.tsx", ["/sample-report", "Sample Report", "rounded-full"]);
forbidden("src/app/faq/page.tsx", ["/sample-report", "Sample Report", "Sample Presence Report", "Choice Gap", "rounded-full"]);
forbidden("src/app/report/page.tsx", ["/sample-report", "Sample Report", "rounded-full"]);
forbidden("src/app/plans/plan-data.ts", ["/sample-report", "See Sample Report", "Sample Report", "Choice Gap"]);
forbidden("src/app/connect/page.tsx", ["support@opstandoc.com", "message box", "textarea", "Connect utility"]);
forbidden("src/lib/seo.ts", ["/sample-report", "Sample Report", "Choice Gap"]);
forbidden("src/app/layout.tsx", ["/sample-report", "Sample Presence Report", "Choice Gap", "rounded-full"]);

const confirmRoute = read("src/app/api/customer/email/confirm/route.ts");
const postFunctionMatch = confirmRoute.match(/export async function POST[\s\S]*?\n}\n\nfunction projectSafeConfirmationResponse/);
if (!postFunctionMatch || postFunctionMatch[0].includes("NextResponse.json(result")) {
  failures.push("POST email confirmation must return projectSafeConfirmationResponse(result), not the raw verification result.");
}

const providerRoute = read("src/app/api/auth/provider/[provider]/route.ts");
if (providerRoute.includes("requestedReturnTo && requestedReturnTo.startsWith")) {
  failures.push("Provider auth route must not forward arbitrary leading-slash returnTo values.");
}

if (failures.length) {
  console.error("Public drift validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Public drift validation passed with ${publicCommandDesignAnchors.join(", ")} anchors, retired sample-report routes, Decision Gap language, current FAQ path, Customer Access naming, safe email confirmation response projection, signed remembered-session behavior, safe provider return paths, and truthful email access states.`);

function expect(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (text.toLowerCase().includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
