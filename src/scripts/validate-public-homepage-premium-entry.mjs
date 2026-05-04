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
const validatorPath = "src/scripts/validate-public-homepage-premium-entry.mjs";
const failures = [];

expect(pagePath, [
  "Cendorq | Business Command Intelligence",
  "Find why customers leave before you buy the fix.",
  "AI-search visibility",
  "Start free scan",
  "See pricing",
  "Free first read. Clear pricing when you need the next depth.",
  "Cendorq identity",
  "A plain diagnosis of the path customers use before they contact you.",
  "Silent decision pressure",
  "If they do not understand you, trust you, find you, or know what to do next, they move on quietly.",
  "Search changed.",
  "The first move is clarity.",
  "Trust lock",
  "Proof first. No pressure.",
  "Start free when the cause is unclear.",
  "Pay only when the next depth is clear.",
  "Protected dashboard and report vault after verification.",
]);

expect(headerPath, [
  "Business Command Intelligence",
  "Start",
  "Pricing",
  "Connect",
  "Pricing from $0",
  "Start free scan",
]);

expect(footerPath, [
  "Final decision path",
  "Start free scan",
  "View pricing",
  "$0",
  "$300",
  "$750+",
  "$300/mo",
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

boundedLength(pagePath, 15000);
boundedLength(scanPath, 16000);
boundedLength(connectPath, 15000);
boundedLength(headerPath, 22000);
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

console.log("Public command surface validation passed with a shorter customer-facing homepage, no homepage pricing block, simple navigation, and protected plain-language trust rules.");

function blockedPublicPhrases() {
  return [
    "Search Presence OS",
    "Pricing path",
    "Plan ladder",
    "Strong enough to sell",
    "Cendorq should",
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
  if (text.length > maxCharacters) failures.push(`${path} is too long for the simplified public standard: ${text.length} > ${maxCharacters}`);
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
