import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const middlewarePath = "src/middleware.ts";
const rememberedSessionPath = "src/lib/customer-remembered-session-runtime.ts";
const emailConfirmPath = "src/app/api/customer/email/confirm/route.ts";
const continuePath = "src/app/api/auth/continue/route.ts";
const logoutPath = "src/app/api/customer/session/logout/route.ts";
const headerPath = "src/layout/site-header-conversion.tsx";
const loginPath = "src/app/login/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-dashboard-session-gate.mjs";

expect(middlewarePath, [
  "CUSTOMER_DASHBOARD_PREFIX = \"/dashboard\"",
  "CUSTOMER_SESSION_COOKIE_NAME = \"cendorq_customer_session\"",
  "CUSTOMER_SESSION_SECRET_ENV = \"CENDORQ_CUSTOMER_SESSION_SECRET\"",
  "CUSTOMER_SESSION_VERSION = \"v1\"",
  "CUSTOMER_DASHBOARD_ALLOWED_PATHS",
  "isProtectedCustomerDashboardRoute",
  "protectCustomerDashboardRoute",
  "readCustomerDashboardSession",
  "safeCustomerDashboardPath",
  "signCustomerSessionPayload",
  "safeEqual(signature, expectedSignature)",
  "session.reason === \"not-configured\" ? \"session-unavailable\" : \"session-required\"",
  "NextResponse.redirect(loginUrl, { status: 303 })",
  "options: { internal: boolean; customer: boolean }",
  "options.internal || options.customer",
  "no-store, no-cache, must-revalidate, proxy-revalidate",
  "appendVaryHeader(response.headers.get(\"Vary\"), [\"Authorization\", \"Cookie\"])",
]);

expect(middlewarePath, [
  "/dashboard/reports",
  "/dashboard/reports/free-scan",
  "/dashboard/billing",
  "/dashboard/support",
  "/dashboard/notifications",
]);

expect(rememberedSessionPath, [
  "CENDORQ_CUSTOMER_SESSION_COOKIE = \"cendorq_customer_session\"",
  "SESSION_SECRET_ENV = \"CENDORQ_CUSTOMER_SESSION_SECRET\"",
  "SESSION_VERSION = \"v1\"",
  "SESSION_TTL_SECONDS = 60 * 60 * 24 * 30",
  "setCustomerRememberedSessionCookie",
  "readCustomerRememberedSession",
  "readCustomerRememberedSessionCookieValue",
  "httpOnly: true",
  "secure: true",
  "sameSite: \"lax\"",
]);

expect(headerPath, [
  "cookies",
  "CENDORQ_CUSTOMER_SESSION_COOKIE",
  "readCustomerRememberedSessionCookieValue",
  "isRememberedCustomer",
  "AccountMenu",
  "Dashboard",
  "Sign out",
  "Remembered customers can tap Dashboard directly or open Account for Reports, Billing, Support, and Sign out.",
]);

expect(logoutPath, [
  "clearCustomerRememberedSessionCookie",
  "rawReturnTo === \"/\" ? \"/\" : null",
  "returnTo === \"/\" ? \"/\" : \"/login\"",
  "auth", "signed-out",
  "no-store, no-cache, must-revalidate, max-age=0",
]);

expect(emailConfirmPath, [
  "setCustomerRememberedSessionCookie",
  "verifyCustomerEmailConfirmationToken",
  "status: 303",
  "getCustomerEmailVerificationNoStoreHeaders()",
  "email-link-used",
  "email-link-expired",
  "email-link-invalid",
]);

expect(continuePath, [
  "readCustomerRememberedSession",
  "session-unavailable",
  "session-required",
]);

expect(loginPath, [
  "signed-out",
  "You are signed out on this browser.",
  "session-unavailable",
  "session-required",
  "This browser is not remembered yet.",
  "Use customer access to continue.",
  "Use the email from your Free Scan or plan.",
]);

expect(routesChainPath, [validatorPath]);

forbidden(middlewarePath, [
  "localStorage",
  "sessionStorage",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "NEXT_PUBLIC_CUSTOMER_SUPPORT_CONTEXT_KEY",
  "CUSTOMER_CONTEXT_HEADER",
  "dangerouslySetInnerHTML",
  "account exists",
  "user exists",
  "riskScoringInternals",
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "internalNotes",
  "attackerDetails",
]);

forbidden(headerPath, [
  "localStorage",
  "sessionStorage",
  "Sign in",
  "AI Readiness",
  "/#ai-readiness",
]);

forbidden(logoutPath, [
  "localStorage",
  "sessionStorage",
  "unsafeReturnTo",
  "redirectUrl = new URL(rawReturnTo",
]);

if (failures.length) {
  console.error("Dashboard session gate validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard session gate validation passed with customer dashboard route protection, signed verified-session cookie validation, remembered header state, signed-out notice, safe home return, simple access copy, safe login redirects, no-store headers, and route-chain coverage.");

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
