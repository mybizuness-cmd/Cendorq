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
  "Plans",
  "FAQ",
  "Access",
  "Account",
  "Dashboard",
  "Start Free Scan",
  "isRememberedCustomer",
  "logoHref",
  "AccountMenu",
  "overflow-visible",
  "relative z-50",
  "absolute right-0 z-50",
  "w-[min(14rem,calc(100vw-1.5rem))]",
  "bg-cyan-50 text-slate-950",
  "Remembered customers can tap Dashboard directly or open Account for Reports, Billing, Support, and Sign out.",
  "Account menu uses overflow-visible so the menu is not clipped.",
  "Account menu width is bounded for mobile.",
  "href: \"/plans\"",
  "href: \"/faq\"",
  "href=\"/free-check\"",
  "href=\"/dashboard\"",
  "Logo links to the dashboard for remembered customers and homepage for new visitors.",
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
  "AI visibility and readiness for businesses that need to be seen, understood, trusted, and chosen.",
  "Free Scan is an entry signal, not a guarantee of rankings, leads, revenue, or AI placement.",
  "FAQ",
  "Privacy",
  "Terms",
  "Disclaimer",
  "href=\"/faq\"",
  "focus:outline-none",
  "focus-visible:ring-2",
]);

expect(faqPath, [
  "Cendorq FAQ",
  "Get clear answers before the next move.",
  "Start with the Free Scan",
  "Already have an account? Use the same email you used for your Free Scan, form, or plan.",
  "What is the difference between Free Scan, Deep Review, Build Fix, and Ongoing Control?",
  "Free Scan shows the first signal. Deep Review explains the cause. Build Fix improves the weak point. Ongoing Control keeps watch over time.",
  "Cendorq is built to improve visibility, clarity, trust, proof, readiness",
  "Contact Us",
  "href: \"/connect\"",
  "FAQPage",
  "Does Cendorq guarantee rankings, leads, revenue, or AI placement?",
]);

expect(connectPath, [
  "Contact Us | Cendorq",
  "Contact Us",
  "Contact us when the next question is already clear.",
  "SUPPORT_EMAIL = \"support@cendorq.com\"",
  "Email us directly",
  "Email Support",
  "support@cendorq.com",
  "from the email address where you want the reply",
  "Include your business name, website, and the email used for your Free Scan or plan if you already have one.",
  "Start Free Scan if the first visibility or readiness signal is unclear.",
  "Use Plans if you know the depth you need.",
  "Contact us only when fit, scope, or timing is already clear.",
  "Need a first signal",
  "Need to choose a plan",
  "Already a customer",
  "Deep Review, Build Fix, and Ongoing Control",
  "Contact Us is not a replacement for the Free Scan when the cause is unclear.",
  "Contact Us is not an unlimited consulting lane.",
  "AI visibility and readiness contact routing",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(headerPath, [
  "AI Readiness",
  "Sign in",
  "/#ai-readiness",
  "Find the first break.",
  "Return to your work.",
  "localStorage",
  "sessionStorage",
  "overflow-hidden border-b",
  "overflow-hidden px-0",
  "w-56 rounded-2xl",
  "guaranteed ranking",
  "guaranteed ai placement",
  "guaranteed revenue",
]);

forbidden(footerPath, [
  "AI engine readiness for businesses that need to be understood, trusted, and chosen.",
  "Find the break before you buy the fix.",
  "guaranteed ranking",
  "guaranteed ai placement",
  "guaranteed revenue",
]);

forbidden(faqPath, [
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "href: \"/contact\"",
  "label: \"Contact\"",
  "label: \"Connect\"",
  "guaranteed rankings, leads, revenue, or AI placement. Yes",
  "workspace theory",
  "orchestration",
  "raw evidence",
  "send passwords",
  "send card numbers",
]);

forbidden(connectPath, [
  "Connect | Cendorq",
  "Connect with Cendorq",
  "Connect when the next question is already clear.",
  "Connect only when",
  "Contact routing",
  "Contact Cendorq",
  "Contact only when",
  "support@opstandoc.com",
  "message box",
  "textarea",
  "Use pricing if you know the depth you need.",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "unlimited consulting",
  "send passwords",
  "send card numbers",
  "guaranteed ranking",
  "guaranteed ai placement",
  "guaranteed revenue",
]);

if (failures.length) {
  console.error("Public navigation chrome validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public navigation chrome validation passed with remembered customer header state, highlighted Dashboard action, mobile-bounded Account menu, dashboard logo return, Free Scan CTA, current FAQ plan language, Contact Us routing, support@cendorq.com direct email, and visibility plus readiness footer trust copy.");

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
  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
