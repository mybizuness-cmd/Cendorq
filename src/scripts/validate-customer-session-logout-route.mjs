import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const routePath = "src/app/api/customer/session/logout/route.ts";
const sessionRuntimePath = "src/lib/customer-remembered-session-runtime.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-customer-session-logout-route.mjs";

expect(routePath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "revalidate = 0",
  "export async function POST",
  "export async function GET",
  "clearCustomerRememberedSessionCookie(response)",
  "const publicReturnTo = rawReturnTo === \"/\" ? \"/\" : null;",
  "const returnTo = publicReturnTo || safeDashboardPath(rawReturnTo) || \"/login\";",
  "const redirectUrl = new URL(returnTo === \"/\" ? \"/\" : \"/login\", request.url);",
  "redirectUrl.searchParams.set(\"auth\", \"signed-out\")",
  "redirectUrl.searchParams.set(\"returnTo\", safeDashboardPath(returnTo) || \"/dashboard\")",
  "NextResponse.redirect(redirectUrl, { status: 303 })",
  "Cache-Control",
  "no-store, no-cache, must-revalidate, max-age=0",
  "X-Content-Type-Options",
  "nosniff",
  "X-Robots-Tag",
  "noindex, nofollow, noarchive, nosnippet",
  "Referrer-Policy",
  "same-origin",
]);

expect(sessionRuntimePath, [
  "clearCustomerRememberedSessionCookie",
  "CENDORQ_CUSTOMER_SESSION_COOKIE",
  "maxAge: 0",
  "httpOnly: true",
  "secure: true",
  "sameSite: \"lax\"",
  "path: \"/\"",
]);

expect(routesChainPath, [validatorPath]);

forbidden(routePath, [
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "rawTokenReturned",
  "rawEmailReturned",
  "customerIdHash",
  "signupEmailHash",
  "session token",
  "account exists",
  "redirectUrl = new URL(rawReturnTo",
]);

if (failures.length) {
  console.error("Customer session logout route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer session logout route validation passed with signed-cookie clearing, safe returnTo redirect, no-store/noindex/nosniff/referrer-policy headers, and route-chain coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
