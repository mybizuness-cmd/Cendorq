import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const file = "src/lib/customer-remembered-session-runtime.ts";
const failures = [];

expect(file, [
  "CENDORQ_CUSTOMER_SESSION_COOKIE",
  "setCustomerRememberedSessionCookie",
  "readCustomerRememberedSessionCookieValue",
  "clearCustomerRememberedSessionCookie",
  "safeDashboardPath",
  "SAFE_DASHBOARD_PATHS",
  "httpOnly: true",
  "secure: true",
  "sameSite: \"lax\"",
  "timingSafeEqual",
  "SESSION_TTL_SECONDS",
  "CENDORQ_CUSTOMER_SESSION_SECRET",
]);

forbidden(file, [
  "localStorage",
  "sessionStorage",
  "document.cookie",
  "httpOnly: false",
  "secure: false",
  "sameSite: \"none\"",
  "console.log",
]);

if (failures.length) {
  console.error("Customer remembered session runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer remembered session runtime validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}
