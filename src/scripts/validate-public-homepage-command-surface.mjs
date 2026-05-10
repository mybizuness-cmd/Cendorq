import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/page.tsx";
const headerPath = "src/layout/site-header-conversion.tsx";
const footerPath = "src/layout/site-footer.tsx";
const scanPath = "src/app/free-check/page.tsx";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-homepage-command-surface.mjs";
const bestStandardPath = "src/lib/best-of-best-operating-standard.ts";
const bestDocPath = "docs/best-of-best-operating-standard.md";
const failures = [];

expect(pagePath, [
  "Cendorq | AI Engine Readiness for Businesses",
  "AI Engine Readiness",
  "If AI engines cannot understand your business, customers may never get the chance to.",
  "AI-readiness starts with business clarity.",
  "Start with the Free Scan. See what AI engines and customers may be reading wrong.",
  "Start Free Scan",
  "Review Plans",
  "The readiness path",
  "AI is becoming the new first impression.",
  "Cendorq finds what is weak first without promising rankings, leads, revenue, or AI placement.",
  "The goal is not to decorate the business.",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "No AI placement promises",
]);

expect(pagePath, [
  "Find the first weak signal before you spend deeper.",
  "Prove the cause before changing the system.",
  "Improve the strongest proven weak point.",
  "Keep the business ready as AI engines change.",
  "Clear facts",
  "Trusted proof",
  "Consistent signals",
  "Reason to choose",
  "Action path",
  "href=\"/free-check\"",
  "href=\"/plans\"",
  "href: \"/plans/deep-review\"",
  "href: \"/plans/build-fix\"",
  "href: \"/plans/ongoing-control\"",
]);

expect(headerPath, [
  "Cendorq",
  "AI Readiness",
  "Understand the AI Engine Readiness path.",
  "Plans",
  "Compare Scan, Review, Repair, and Control.",
  "Sign in",
  "Start Free Scan",
  "href=\"/free-check\"",
  "href=\"/plans\"",
  "href=\"/login\"",
]);

expect(footerPath, [
  "Start with the right read before buying the wrong fix.",
  "Free Scan gives a first signal. Paid plans only add depth when the stage fits.",
  "Compare plans",
  "Contact",
  "Privacy",
  "Terms",
]);

expect(scanPath, [
  "Free Scan | Cendorq",
  "Run the Cendorq Free Scan to see the first AI-readiness signal",
  "See the first signal before you buy deeper work.",
  "Cendorq checks whether your business is clear enough for AI engines and customers to understand, trust, and choose before deeper work begins.",
  "Business context only",
  "No private credentials or payment details",
  "Protected dashboard result after verification",
  "Result opens in dashboard",
  "A signal you can actually use.",
  "The output is not a pile of generic tips.",
  "Review before repair",
]);

expect(bestStandardPath, [
  "BEST_OF_BEST_OPERATING_STANDARD",
  "Apple-level clarity and visual hierarchy",
  "Every public and customer surface must reveal the primary action, the customer value, the boundary, and the next safe step",
  "template-like hero section",
  "generic SaaS dashboard copy",
  "equal-weight CTA wall",
]);

expect(bestDocPath, [
  "# Best-of-Best Operating Standard",
  "Apple-level clarity and visual hierarchy",
  "Every customer-facing surface must have one strongest next move",
  "Does the page show hierarchy, harmony, calm focus, and one strongest action rather than equal-weight blocks?",
]);

expect(packagePath, ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);
expect(routesChainPath, [validatorPath, "src/scripts/validate-public-drift.mjs"]);

boundedLength(pagePath, 15000);
boundedLength(scanPath, 17000);
boundedLength(headerPath, 7000);
boundedLength(footerPath, 6500);

forbidden(pagePath, [...blockedPublicPhrases(), ...staleHomepagePhrases(), ...badgeHeavyPhrases()]);
forbidden(headerPath, [...blockedPublicPhrases(), "Pricing", "Talk through fit or scope", "Pricing from $0", "Command path"]);
forbidden(footerPath, [...blockedPublicPhrases(), "Final command path", "Clear plan depth", "View pricing", "Clarity command", "Trust command", "AI-search aware", "Protected platform", "$300/mo"]);
forbidden(scanPath, [...blockedPublicPhrases(), "Free Visibility Scan", "Search Presence Scan", "Find the first break before you buy the fix."]);

if (failures.length) {
  console.error("Public command surface validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public command surface validation passed with current AI Engine Readiness homepage, best-of-best hierarchy, simplified public header, compact footer, Free Scan result path, no stale pricing/diagnose language, and no unsupported guarantees.");

function badgeHeavyPhrases() {
  return [
    "Command readout",
    "Message command",
    "Proof command",
    "Search command",
    "Action command",
    "Highest-converting path",
    "Conversion without pressure",
    "Final command path",
  ];
}

function staleHomepagePhrases() {
  return [
    "Own the way the market understands you.",
    "Market test",
    "Four questions decide whether the business gets chosen.",
    "Ranking is not enough. The business has to be understood.",
    "Scan. Diagnose. Fix. Control.",
    "See the command path",
    "Compare all plans",
    "No tricks. No fake guarantees. No guesswork dressed up as strategy.",
    "business trust",
    "customer choice",
  ];
}

function blockedPublicPhrases() {
  return [
    "Search Presence OS",
    "Pricing path",
    "Plan ladder",
    "Strong enough to sell",
    "Cendorq should",
    "trillion-dollar business",
    "trillion dollar business",
    "guaranteed ROI",
    "guaranteed revenue",
    "guaranteed business results",
    "guaranteed safe",
    "impossible to hack",
    "never liable",
    "liability-free",
    "rawPayload=",
    "rawEvidence=",
    "rawSecurityPayload=",
    "rawBillingData=",
    "internalNotes=",
    "operatorIdentity=",
    "riskScoringInternals=",
    "attackerDetails=",
    "session" + "Token=",
    "csrf" + "Token=",
    "admin" + "Key=",
    "support" + "Context" + "Key=",
    "localStorage.setItem",
    "sessionStorage.setItem",
    "Market Command Intelligence",
    "Deep Review",
    "Build Fix",
    "Ongoing Control",
    "Diagnose",
  ];
}

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for the simplified public command standard: ${text.length} > ${maxCharacters}`);
}

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
