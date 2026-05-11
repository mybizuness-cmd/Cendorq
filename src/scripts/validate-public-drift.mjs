import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const activePublicFiles = [
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
  "const safeReturnTo = safeDashboardPath",
  "destination.searchParams.set(\"returnTo\", safeReturnTo)",
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
  "Trusted browser access is not fully connected yet.",
  "Signed remembered session",
  "Email unavailable",
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

console.log("Public drift validation passed with safe email confirmation response projection, signed remembered-session behavior, safe provider return paths, and truthful email access states.");

function expect(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
