import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/page.tsx";
const headerPath = "src/layout/site-header-conversion.tsx";
const footerPath = "src/layout/site-footer.tsx";
const scanPath = "src/app/free-check/page.tsx";
const connectPath = "src/app/connect/page.tsx";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-homepage-command-surface.mjs";
const failures = [];

expect(pagePath, [
  "Cendorq | Business Command Intelligence",
  "Become the business customers understand, trust, find, and choose.",
  "hidden reason customers hesitate",
  "Start free scan",
  "See the command path",
  "Free first read. Clear pricing. Protected platform after verification.",
  "Command readout",
  "The decision path",
  "Can they understand you fast?",
  "Can search, maps, reviews, and AI describe you correctly?",
  "Customers decide before they talk to you.",
  "Message command",
  "Proof command",
  "Search command",
  "Action command",
  "Highest-converting path",
  "Start with diagnosis. Move deeper only when the next depth is clear.",
  "Conversion without pressure",
  "Clear. Fast. Protected. Easy to act on.",
  "Protected dashboard and report vault after verification.",
]);

expect(headerPath, [
  "Business Command Intelligence",
  "Start",
  "Plans",
  "Connect",
  "Command path",
  "Understand, trust, find, and choose",
  "Pricing from $0",
  "Start free scan",
]);

expect(footerPath, [
  "Final command path",
  "If the business is hard to understand, trust, find, or choose, start with the first read.",
  "Clear plan depth",
  "Start free scan",
  "View plans",
  "$0",
  "$300",
  "$750+",
  "$300/mo",
  "Clarity command",
  "Trust command",
  "AI-search aware",
  "Protected platform",
]);

expect(scanPath, [
  "Find the decision break before you buy the wrong fix.",
  "Free first read",
  "Safe business context only.",
  "Why does AI search matter?",
]);

expect(connectPath, [
  "If you are unsure, start free. If the question is clear, connect.",
  "View pricing",
  "Start free if the problem is unclear.",
]);

expect(packagePath, ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);
expect(routesChainPath, [validatorPath]);

boundedLength(pagePath, 15500);
boundedLength(scanPath, 16000);
boundedLength(connectPath, 15000);
boundedLength(headerPath, 23000);
boundedLength(footerPath, 18000);

forbidden(pagePath, blockedPublicPhrases());
forbidden(headerPath, blockedPublicPhrases());
forbidden(footerPath, blockedPublicPhrases());
forbidden(scanPath, blockedPublicPhrases());
forbidden(connectPath, blockedPublicPhrases());

if (failures.length) {
  console.error("Public command surface validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public command surface validation passed with a best-of-best command architecture, concise conversion path, elevated nav, elevated footer, no overdone public length, and protected plain-language trust rules.");

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
  ];
}

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for the concise public command standard: ${text.length} > ${maxCharacters}`);
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
