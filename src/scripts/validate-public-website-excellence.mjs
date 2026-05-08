import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const homePath = "src/app/page.tsx";
const freeCheckPath = "src/app/free-check/page.tsx";
const plansPath = "src/app/plans/page.tsx";
const pristineValidatorPath = "src/scripts/validate-most-pristine-system-standard.mjs";
const packagePath = "package.json";

expect(homePath, [
  "Market understanding · AI search visibility · customer choice",
  "Own how the market understands your business.",
  "Search is no longer only a list of links.",
  "Market Understanding Map",
  "A first read on whether the market can choose you.",
  "The new standard",
  "Ranking is not enough. The business has to become the clear choice.",
  "What Cendorq surfaces",
  "Not an opinion. A decision signal.",
  "The operating path",
  "Scan. Diagnose. Fix. Control.",
  "No fake ranking promise.",
  "No vague audit theater.",
  "No guesswork sold as strategy.",
  "Evidence, confidence, boundary, next action.",
  "system-grid-wide",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(freeCheckPath, [
  "Free Market Signal Scan",
  "See the first signal before you buy the fix.",
  "Business context only",
  "No private credentials or payment details",
  "Protected dashboard result after verification",
  "GuidedFreeCheckFormV3",
  "Dashboard result preview",
  "A signal you can actually use.",
  "The output is not a pile of generic tips.",
  "Result opens in dashboard",
  "Result opens in dashboard",
  "Free Market Signal Scan form visible within the first quarter of the page.",
  "system-grid-wide",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(plansPath, [
  "Market command path",
  "Choose the command depth that matches the market risk.",
  "Scan first. Diagnose when the cause matters.",
  "Start Free Scan",
  "Unlock Deep Review",
  "How to choose a plan",
  "Each plan buys a different level of command.",
  "Free Scan finds the first signal.",
  "Deep Review explains the cause.",
  "Build Fix improves the selected weak point.",
  "Ongoing Control keeps the business watched",
  "No overlap",
  "PLAN_VALUE_SEPARATION_RULES",
  "system-grid-wide",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(pristineValidatorPath, [
  "validate-most-pristine-system-standard.mjs",
]);

expect(packagePath, [
  "validate:routes",
  "validate-public-website-excellence.mjs",
]);

forbidden(homePath, blockedPatterns());
forbidden(freeCheckPath, blockedPatterns());
forbidden(plansPath, blockedPatterns());

if (failures.length) {
  console.error("Public website excellence validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public website excellence validation passed for current market-command visual authority surfaces.");

function blockedPatterns() {
  return [
    "guaranteed ROI",
    "guaranteed refund",
    "guaranteed legal outcome",
    "guaranteed security outcome",
    "impossible to hack",
    "never liable",
    "liability-free",
    "rawPayload",
    "rawEvidence",
    "rawSecurityPayload",
    "rawBillingData",
    "internalNotes",
    "operatorIdentity",
    "riskScoringInternals",
    "attackerDetails",
    "sessionToken",
    "csrfToken",
    "localStorage",
    "sessionStorage",
  ];
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
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
