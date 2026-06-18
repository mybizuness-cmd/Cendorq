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
  "AI Search Presence Repair",
  "Free Scan",
  "Plans",
  "FAQ",
  "Privacy",
  "Terms",
  "Disclaimer",
  "href=\"/plans\"",
  "href=\"/faq\"",
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

forbidden(headerPath, [
  "Sample Report",
  "/sample-report",
  "AI Readiness",
  "Sign in",
  "/#ai-readiness",
  "localStorage",
  "sessionStorage",
  "guaranteed ranking",
  "guaranteed ai placement",
  "guaranteed revenue",
]);

forbidden(footerPath, [
  "Sample Report",
  "/sample-report",
  "AI engine readiness for businesses that need to be understood, trusted, and chosen.",
  "guaranteed ranking",
  "guaranteed ai placement",
  "guaranteed revenue",
]);

forbidden(faqPath, [
  "Sample Report",
  "/sample-report",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "href: \"/contact\"",
  "workspace theory",
  "orchestration",
  "raw evidence",
]);

forbidden(connectPath, [
  "Connect with Cendorq",
  "support@opstandoc.com",
  "message box",
  "textarea",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "guaranteed ranking",
  "guaranteed ai placement",
  "guaranteed revenue",
]);

if (failures.length) {
  console.error("Public navigation chrome validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public navigation chrome validation passed with current header, footer, FAQ, contact routing, and no Sample Report public navigation.");

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
