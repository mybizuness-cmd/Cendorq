import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const publicCommandDesignAnchors = ["AI Visibility", "AI Engine Readiness", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control", "Scan", "Review", "Fix", "Control"];

const activeFiles = [
  "src/app/page.tsx",
  "src/app/free-check/page.tsx",
  "src/app/plans/page.tsx",
  "src/app/plans/plan-data.ts",
  "src/app/dashboard/page.tsx",
  "src/lib/cendorq-experience-system.ts",
  "src/app/api/customer/email/confirm/route.ts",
  "src/app/api/auth/continue/route.ts",
  "src/app/api/auth/email/route.ts",
  "src/app/api/auth/provider/[provider]/route.ts",
  "src/app/login/page.tsx",
  "src/lib/customer-remembered-session-runtime.ts",
  "src/lib/customer-email-verification-token-runtime.ts",
];

for (const file of activeFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing active drift file: ${file}`);
}

expect("src/lib/cendorq-experience-system.ts", [
  "CENDORQ_EXPERIENCE_SYSTEM",
  "CENDORQ_EXPERIENCE_GUARDRAILS",
  "CENDORQ_SIGNAL_WORDS",
  "World-class visual experience",
  "Uncluttered pages",
  "Cendorq-specific signal language",
]);

expect("src/app/page.tsx", [
  "cinematic-ai-visibility-readiness-experience",
  "CENDORQ_EXPERIENCE_SYSTEM",
  "If AI engines cannot see or understand your business",
  "AI Visibility and Readiness",
  "Visibility shows the gap. Readiness explains the cause.",
  "where the business is missing",
  "visibility and readiness",
  "AI is becoming the place customers meet you first.",
  "Scan. Review. Repair. Control.",
  "Distinct Cendorq signal experience",
  "Unified Cendorq Experience System",
  "Start Free Scan",
  "View Plans",
]);

expect("src/app/free-check/page.tsx", [
  "AI visibility scan",
  "See where your business may be missing or unclear.",
  "first visibility and readiness signal",
  "missing, unclear, under-trusted, or harder to choose",
  "Start Free Scan",
]);

expect("src/app/plans/page.tsx", [
  "Choose the right visibility and readiness depth.",
  "Free Scan shows the first signal.",
  "Deep Review explains the cause.",
  "Build Fix improves the weak point.",
  "Ongoing Control keeps visibility and readiness from drifting.",
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
  "AI readiness control center",
  "Your Cendorq workspace is ready.",
  "one clear next action",
  "Scan. Review. Repair. Control.",
  "Open protected scan and review outputs when they are ready.",
  "getPlanValueDelivery",
  "DashboardNextBestAction",
]);

forbidden("src/app/page.tsx", [
  "AI Engine Readiness for Businesses",
  "If AI engines cannot understand your business, customers may never get the chance to.",
  "Cendorq turns AI-readiness into a clear path",
]);

forbidden("src/app/plans/plan-data.ts", [
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
]);

forbidden("src/app/dashboard/page.tsx", [
  "Private market command center",
  "Open market signal",
  "Scan. Diagnose. Fix. Control.",
  "Market proof",
  "Command depth",
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

expect("src/app/api/auth/continue/route.ts", [
  "readCustomerRememberedSession",
  "session-unavailable",
  "session-required",
]);

expect("src/app/api/auth/provider/[provider]/route.ts", [
  "safeDashboardPath",
  "const returnTo = safeDashboardPath",
  "loginUrl.searchParams.set(\"returnTo\", returnTo)",
  "provider-not-ready",
]);

expect("src/lib/customer-remembered-session-runtime.ts", [
  "CENDORQ_CUSTOMER_SESSION_SECRET",
  "const customerIdHash = cleanHash(input.customerIdHash)",
  "const signupEmailHash = cleanHash(input.signupEmailHash)",
  "if (!customerIdHash || !signupEmailHash) return false",
  "httpOnly: true",
  "secure: true",
  "sameSite: \"lax\"",
  "signature-mismatch",
]);

expect("src/lib/customer-email-verification-token-runtime.ts", [
  "rememberedSession",
  "rawEmailReturned: false",
  "rawTokenReturned: false",
]);

expect("src/app/login/page.tsx", [
  "No password to remember",
  "This browser is not remembered yet.",
  "email-unavailable",
  "Use the same email or connected provider",
  "Free Scan business context stays separate from account access",
]);

expect("src/app/api/auth/email/route.ts", [
  "projectEmailAccessState",
  "email-sent",
  "email-queued",
  "email-unavailable",
]);

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

console.log(`Public drift validation passed with ${publicCommandDesignAnchors.join(", ")} anchors, visibility plus readiness homepage, aligned Free Scan and plan language, Cendorq Experience System, aligned dashboard readiness language, safe email confirmation response projection, signed remembered-session behavior, safe provider return paths, and truthful email access states.`);

function expect(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
