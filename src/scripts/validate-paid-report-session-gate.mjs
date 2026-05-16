import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const middlewarePath = "src/middleware.ts";
const finalRoutesValidatorPath = "src/scripts/validate-paid-report-final-routes.mjs";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-paid-report-session-gate.mjs";

expect(middlewarePath, [
  "CUSTOMER_DASHBOARD_PREFIX = \"/dashboard\"",
  "pathname.startsWith(`${CUSTOMER_DASHBOARD_PREFIX}/`)",
  "protectCustomerDashboardRoute(request)",
  "readCustomerDashboardSession(request)",
  "safeCustomerDashboardPath(request.nextUrl.pathname)",
  "CUSTOMER_DASHBOARD_ALLOWED_PATHS",
  "\"/dashboard/reports\"",
  "value === path || value.startsWith(`${path}/`)",
  "NextResponse.redirect(loginUrl, { status: 303 })",
  "auth\", session.reason === \"not-configured\" ? \"session-unavailable\" : \"session-required\"",
  "no-store, no-cache, must-revalidate, proxy-revalidate",
  "appendVaryHeader(response.headers.get(\"Vary\"), [\"Authorization\", \"Cookie\"])",
]);

expect(finalRoutesValidatorPath, [
  "src/app/dashboard/reports/deep-review/page.tsx",
  "src/app/dashboard/reports/build-fix/page.tsx",
  "src/app/dashboard/reports/ongoing-control/page.tsx",
  "path: \\\"/dashboard/reports/deep-review\\\"",
  "path: \\\"/dashboard/reports/build-fix\\\"",
  "path: \\\"/dashboard/reports/ongoing-control\\\"",
]);

expect(routesChainPath, [validatorPath]);

forbidden(middlewarePath, [
  "CUSTOMER_DASHBOARD_ALLOWED_PATHS = []",
  "return NextResponse.next();\n    } else if (isProtectedCustomerDashboardRoute)",
  "localStorage",
  "sessionStorage",
  "rawReportPayloadReturned: true",
  "rawPrivatePayloadReturned: true",
  "x-cendorq-customer-context",
  "dangerouslySetInnerHTML",
]);

if (failures.length) {
  console.error("Paid report session gate validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Paid report session gate validation passed with /dashboard/reports/* covered by signed customer-session middleware, safe login redirect, no-store headers, and route-chain coverage.");

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
