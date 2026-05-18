import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const headerPath = "src/layout/site-header-conversion.tsx";
const footerPath = "src/layout/site-footer.tsx";
const faqPath = "src/app/faq/page.tsx";
const connectPath = "src/app/connect/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-navigation-chrome.mjs";

expect(headerPath, [
  "Plans",
  "FAQ",
  "Access",
  "Start Free Scan",
  "href: \"/plans\"",
  "href: \"/faq\"",
  "href: \"/login\"",
  "href=\"/free-check\"",
  "Header keeps Plans, FAQ, Access, and Start Free Scan visible.",
  "focus:outline-none",
  "focus-visible:ring-2",
]);

expect(footerPath, [
  "AI engine readiness for businesses that need to be understood, trusted, and chosen.",
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
  "FAQPage",
  "Does Cendorq guarantee rankings, leads, revenue, or AI placement?",
]);

expect(connectPath, [
  "Contact routing",
  "CONTACT_STAGE_ROUTES",
  "CONTACT_BOUNDARIES",
  "Start Free Scan if the problem is unclear.",
  "Use pricing if you know the depth you need.",
  "Contact only when fit, scope, or timing is already clear.",
  "Need a first signal",
  "Need to compare depth",
  "Already a customer",
  "Contact is not a replacement for the Free Scan when the cause is unclear.",
  "Contact is not an unlimited consulting lane.",
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
  "guaranteed ranking",
  "guaranteed ai placement",
  "guaranteed revenue",
]);

forbidden(footerPath, [
  "Find the break before you buy the fix.",
  "guaranteed ranking",
  "guaranteed ai placement",
  "guaranteed revenue",
]);

forbidden(faqPath, [
  "guaranteed rankings, leads, revenue, or AI placement. Yes",
  "workspace theory",
  "orchestration",
  "raw evidence",
  "send passwords",
  "send card numbers",
]);

forbidden(connectPath, [
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

console.log("Public navigation chrome validation passed with simplified header nav, Access label, Free Scan CTA, FAQ routing, footer trust copy, and contact-stage coverage.");

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
