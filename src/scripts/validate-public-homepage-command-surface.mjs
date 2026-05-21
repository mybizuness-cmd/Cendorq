import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/page.tsx";
const headerPath = "src/layout/site-header-conversion.tsx";
const footerPath = "src/layout/site-footer.tsx";
const scanPath = "src/app/free-check/page.tsx";
const sampleReportPath = "src/app/sample-report/page.tsx";
const faqPath = "src/app/faq/page.tsx";
const connectPath = "src/app/connect/page.tsx";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-homepage-command-surface.mjs";
const failures = [];

expect(pagePath, [
  "Cendorq | AI Search Presence Repair for Businesses",
  "presence-report-ai-search-presence-repair-experience",
  "AI Search Presence Repair",
  "Can customers and AI systems understand why to choose your business?",
  "Presence Report",
  "Presence Score",
  "Findability",
  "Understanding",
  "Trust",
  "Choice",
  "Action",
  "Repair queue",
  "Recommended next move",
  "Scan. Review. Repair. Control.",
  "Run Free Scan",
  "Start Free Scan",
  "See Sample Report",
  "href=\"/sample-report\"",
  "View Plans",
  "Most businesses are online. Fewer are answer-ready.",
  "Visibility shows the gap. Readiness explains the cause.",
  "Start with the first signal. Move deeper only when it makes sense.",
]);

expect(sampleReportPath, [
  "Sample Presence Report | Cendorq",
  "SamplePresenceReport",
  "The Presence Report is the core Cendorq object",
  "This is an example, not a promise.",
]);

expect(headerPath, ["AI Readiness", "Plans", "FAQ", "Sign in", "Start Free Scan", "href: \"/faq\""]);

expect(footerPath, [
  "AI engine readiness for businesses that need to be understood, trusted, and chosen.",
  "Free Scan is an entry signal, not a guarantee of rankings, leads, revenue, or AI placement.",
  "FAQ",
  "Privacy",
  "Terms",
]);

expect(scanPath, [
  "Free Scan | Cendorq",
  "Get the first signal before buying the deeper fix.",
  "Cendorq checks the visible signals around your business",
  "What the first signal looks for",
  "Findability",
  "Understanding",
  "Trust",
  "Choice",
  "Action",
  "Share what customers can see now.",
  "Open the result in your account.",
]);

expect(faqPath, [
  "Cendorq FAQ",
  "Get clear answers before the next move.",
  "Already have an account? Use the same email you used for your Free Scan, form, or plan.",
  "Does Cendorq guarantee rankings, leads, revenue, or AI placement?",
]);

expect(connectPath, [
  "Contact Cendorq when the question is already clear.",
  "Start Free Scan if the problem is unclear.",
  "Contact only when fit, scope, or timing is already clear.",
  "Compare plans",
]);

expect(packagePath, ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);
expect(routesChainPath, [validatorPath]);

boundedLength(pagePath, 19000);
boundedLength(scanPath, 18500);
boundedLength(sampleReportPath, 8500);
boundedLength(connectPath, 15000);
boundedLength(headerPath, 15000);
boundedLength(footerPath, 6500);
boundedLength(faqPath, 24000);

forbidden(pagePath, [...blockedPublicPhrases(), ...badgeHeavyPhrases(), ...oldHomepagePhrases()]);
forbidden(headerPath, [...blockedPublicPhrases(), "Privacy", "Terms", "Talk through fit or scope", "Pricing from $0", "Command path"]);
forbidden(footerPath, [...blockedPublicPhrases(), "Final command path", "Clear plan depth", "View pricing", "Clarity command", "Trust command", "AI-search aware", "Protected platform", "$300/mo"]);
forbidden(scanPath, [...blockedPublicPhrases(), ...oldFreeScanPhrases()]);
forbidden(sampleReportPath, blockedPublicPhrases());
forbidden(faqPath, blockedPublicPhrases());
forbidden(connectPath, blockedPublicPhrases());

if (failures.length) {
  console.error("Public command surface validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public command surface validation passed with Presence Report homepage, diagnostic Free Scan entry, sample report route, Scan Review Repair Control path, compact footer, no fake guarantees, and Contact kept as a scoped utility.");

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

function oldHomepagePhrases() {
  return [
    "If AI engines cannot understand your business, customers may never get the chance to.",
    "Cendorq turns AI-readiness into a clear path",
    "data-cendorq-homepage=\"cinematic-ai-visibility-readiness-experience\"",
  ];
}

function oldFreeScanPhrases() {
  return [
    "Find the first place your business may be unclear.",
    "Open the result in your workspace.",
    "Share what customers already see.",
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
