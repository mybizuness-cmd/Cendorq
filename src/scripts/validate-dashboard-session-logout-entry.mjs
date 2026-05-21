import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const dashboardPath = "src/app/dashboard/page.tsx";
const logoutRoutePath = "src/app/api/customer/session/logout/route.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-dashboard-session-logout-entry.mjs";

expect(dashboardPath, [
  "Sign out",
  "End this browser session and return to secure access.",
  "/api/customer/session/logout?returnTo=/dashboard",
  "lg:grid-cols-5",
]);

expect(logoutRoutePath, [
  "clearCustomerRememberedSessionCookie(response)",
  "auth\", \"signed-out",
  "NextResponse.redirect(redirectUrl, { status: 303 })",
  "no-store, no-cache, must-revalidate, max-age=0",
]);

expect(routesChainPath, [validatorPath]);

if (failures.length) {
  console.error("Dashboard session logout entry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard session logout entry validation passed.");

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

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
