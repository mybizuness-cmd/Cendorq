import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const publicCommandDesignAnchors = ["AI Visibility", "AI Engine Readiness", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control", "Scan", "Review", "Fix", "Control"];

const requiredFiles = [
  "src/app/page.tsx",
  "src/components/homepage/homepage-clarity-reset.tsx",
  "src/app/free-check/page.tsx",
  "src/app/sample-report/page.tsx",
  "src/app/plans/page.tsx",
  "src/app/faq/page.tsx",
  "src/app/plans/plan-data.ts",
  "src/app/connect/page.tsx",
  "src/app/dashboard/page.tsx",
  "src/layout/site-header-conversion.tsx",
  "src/layout/site-footer.tsx",
  "src/lib/seo.ts",
  "src/lib/cendorq-experience-system.ts",
  "src/app/api/customer/email/confirm/route.ts",
  "src/app/api/auth/continue/route.ts",
  "src/app/api/auth/email/route.ts",
  "src/app/api/auth/provider/[provider]/route.ts",
  "src/app/login/page.tsx",
  "src/lib/customer-remembered-session-runtime.ts",
  "src/lib/customer-email-verification-token-runtime.ts",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing active public drift file: ${file}`);
}

expect("src/app/page.tsx", [
  "HomepageClarityReset",
  "Cendorq | AI Search Presence Repair for Businesses",
  "presence-report-ai-search-presence-repair-experience",
]);

expect("src/components/homepage/homepage-clarity-reset.tsx", [
  "AI Search Presence Repair",
  "Be easier to find, understand, and choose.",
  "Start Free Scan",
  "See Sample Report",
  "PresenceReportPreview",
]);

expect("src/layout/site-header-conversion.tsx", [
  "Product",
  "Plans",
  "FAQ",
  "Contact",
  "Customer Access",
  "Start Free Scan",
  "AccountMenu",
  "Dashboard",
]);

expect("src/app/free-check/page.tsx", [
  "Free Scan | Cendorq",
  "first Presence Report and AI Visibility signal",
  "Get the first signal before buying the deeper fix.",
  "Low friction",
  "Useful context",
  "Safe boundary",
  "Open the result in your account.",
]);

expect("src/app/sample-report/page.tsx", [
  "Sample Presence Report",
  "The Presence Report is the core Cendorq object",
  "Run Free Scan",
  "View Plans",
  "This is an example, not a promise.",
]);

expect("src/app/plans/page.tsx", [
  "Choose the right AI Visibility and Readiness depth.",
  "Free Scan shows the first signal.",
  "Deep Review explains the cause.",
  "Build Fix repairs the weak point.",
  "Ongoing Control keeps AI Visibility and Readiness from drifting.",
  "The report shows which depth fits.",
  "Open Sample Presence Report",
  "PresenceReportPreview",
]);

expect("src/app/faq/page.tsx", [
  "Cendorq FAQ",
  "Get clear answers before the next move.",
  "Sample Presence Report",
  "Open the Sample Presence Report",
  "find, understand, trust, compare, and choose",
  "Already have an account?",
  "FAQPage",
]);

expect("src/app/connect/page.tsx", [
  "Contact Us",
  "support@cendorq.com",
  "Email Support",
  "Email us directly",
  "Start Free Scan",
  "Compare plans",
  "direct email",
  "from the email address where you want the reply",
]);

expect("src/layout/site-footer.tsx", [
  "AI Search Presence Repair",
  "found, understood, trusted, compared, and chosen",
  "Sample Report",
  "Plans",
  "FAQ",
  "Privacy",
  "Terms",
]);

expect("src/app/plans/plan-data.ts", [
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "visibility and readiness",
  "where it may be missing",
  "see, understand, trust, compare, or choose",
]);

expect("src/app/dashboard/page.tsx", [
  "AI Visibility command center",
  "Presence command snapshot",
  "Presence Score",
  "Choice Gap",
  "Repair Queue",
  "Control Snapshot",
  "Scan. Review. Repair. Control.",
]);

expect("src/lib/seo.ts", [
  "AI Search Presence Repair",
  "Presence Report",
  "Repair Queue",
  "find, understand, trust, compare, and choose",
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

forbidden("src/app/connect/page.tsx", [
  "support@opstandoc.com",
  "message box",
  "textarea",
  "Connect utility",
]);

forbidden("src/app/plans/plan-data.ts", ["AI" + " Readiness Review", "Signal" + " Repair", "Readiness" + " Control"]);

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

console.log(`Public drift validation passed with ${publicCommandDesignAnchors.join(", ")} anchors, simplified homepage, Customer Access naming, Free Scan route, Sample Report path, Plans depth, Contact Us direct-email support routing, safe email confirmation response projection, signed remembered-session behavior, safe provider return paths, and truthful email access states.`);

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
