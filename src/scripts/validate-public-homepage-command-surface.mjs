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
  "Cendorq | AI Search Visibility and Business Trust",
  "Own the way the market understands you.",
  "AI search visibility",
  "business trust",
  "customer choice",
  "Start free scan",
  "See the command path",
  "Market test",
  "Four questions decide whether the business gets chosen.",
  "Ranking is not enough. The business has to be understood.",
  "Command path",
  "Scan. Diagnose. Fix. Control.",
  "Compare all plans",
  "No tricks. No fake guarantees. No guesswork dressed up as strategy.",
]);

expect(headerPath, [
  "Free Scan",
  "Pricing",
  "Dashboard",
  "max-h-[calc(100dvh-4.25rem)]",
  "overflow-y-auto",
  "Start free scan",
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
  "Free Visibility Scan",
  "Find the first break before you buy the fix.",
  "Cendorq checks whether your business is clear enough to be found, understood, trusted, and acted on before deeper work begins.",
  "Safe business context only.",
  "Result opens in dashboard",
]);

expect(connectPath, [
  "Contact Cendorq when the question is already clear.",
  "Start Free Scan if the problem is unclear.",
  "Contact only when fit, scope, or timing is already clear.",
  "Compare plans",
]);

expect(packagePath, ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);
expect(routesChainPath, [validatorPath]);

boundedLength(pagePath, 14500);
boundedLength(scanPath, 16000);
boundedLength(connectPath, 15000);
boundedLength(headerPath, 15000);
boundedLength(footerPath, 6500);

forbidden(pagePath, [...blockedPublicPhrases(), ...badgeHeavyPhrases()]);
forbidden(headerPath, [...blockedPublicPhrases(), "Privacy", "Terms", "Talk through fit or scope", "Pricing from $0", "Command path"]);
forbidden(footerPath, [...blockedPublicPhrases(), "Final command path", "Clear plan depth", "View pricing", "Clarity command", "Trust command", "AI-search aware", "Protected platform", "$300/mo"]);
forbidden(scanPath, blockedPublicPhrases());
forbidden(connectPath, blockedPublicPhrases());

if (failures.length) {
  console.error("Public command surface validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public command surface validation passed with simplified customer-facing language, scrollable mobile menu, compact footer, fewer badges, no repeated final CTA block, and Contact kept as a footer utility.");

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
