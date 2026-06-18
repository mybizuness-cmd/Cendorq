import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const headerPath = "src/layout/site-header-conversion.tsx";
const footerPath = "src/layout/site-footer.tsx";
const faqPath = "src/app/faq/page.tsx";
const connectPath = "src/app/connect/page.tsx";
const sessionPath = "src/lib/customer-remembered-session-runtime.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-navigation-chrome.mjs";

expect(headerPath, [
  "cookies",
  "CENDORQ_CUSTOMER_SESSION_COOKIE",
  "readCustomerRememberedSessionCookieValue",
  "Product",
  "Plans",
  "FAQ",
  "Contact",
  "Customer Access",
  "Start Free Scan",
  "isRememberedCustomer",
  "logoHref",
  "AccountMenu",
  "overflow-visible",
  "w-[min(14rem,calc(100vw-1.5rem))]",
  "href: \"/plans\"",
  "href: \"/faq\"",
  "href=\"/free-check\"",
  "focus:outline-none",
  "focus-visible:ring-2",
]);

expect(sessionPath, [
  "readCustomerRememberedSessionCookieValue",
  "CENDORQ_CUSTOMER_SESSION_COOKIE",
  "SESSION_TTL_SECONDS = 60 * 60 * 24 * 30",
  "httpOnly: true",
  "sameSite: \"lax\"",
  "safeDashboardPath",
]);

expect(footerPath, [
  "Privacy",
  "Terms",
  "Disclaimer",
  "href=\"/privacy\"",
  "href=\"/terms\"",
  "href=\"/disclaimer\"",
  "Footer keeps only Privacy, Terms, and Disclaimer",
  "focus:outline-none",
  "focus-visible:ring-2",
]);

expect(faqPath, [
  "Cendorq FAQ",
  "Answers before the first repair.",
  "AI Search Presence Repair",
  "Decision Gap",
  "Repair Queue",
  "Run Free Scan",
  "Compare Plans",
  "FAQPage",
  "Does Cendorq guarantee rankings, leads, revenue, or AI placement?",
]);

expect(connectPath, [
  "Contact Cendorq",
  "Start Free Scan",
  "Compare plans",
  "support@cendorq.com",
]);

expect(routesChainPath, [validatorPath]);

if (failures.length) {
  console.error("Public navigation chrome validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public navigation chrome validation passed with current header, slim footer, FAQ, and contact routing.");

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
