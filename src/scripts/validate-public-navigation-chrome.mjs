import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const headerPath = "src/layout/site-header-conversion.tsx";
const footerPath = "src/layout/site-footer.tsx";
const connectPath = "src/app/connect/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-navigation-chrome.mjs";

expect(headerPath, [
  "Customer journey",
  "Free Scan: first signal",
  "Deep Review: diagnosis",
  "Build Fix: scoped implementation",
  "Ongoing Control: monthly control",
  "Start with a first signal",
  "choose Deep Review, Build Fix, or Ongoing Control only when the stage fits",
  "max-h-[calc(100dvh-4.25rem)]",
  "overflow-y-auto",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(footerPath, [
  "FOOTER_JOURNEY",
  "Footer customer journey",
  "Start with a first signal. Move deeper only when the stage fits.",
  "Free Scan is a first signal, not full diagnosis, implementation, or monthly control.",
  "Free Scan",
  "Pricing",
  "Dashboard",
  "Contact",
  "Privacy",
  "Terms",
  "focus:outline-none",
  "focus:ring-2",
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

console.log("Public navigation chrome validation passed with mobile journey, footer routing, and contact-stage coverage.");

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
