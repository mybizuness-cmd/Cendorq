import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const componentPath = "src/components/plans/conversion-plan-page.tsx";
const plansPath = "src/app/plans/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-plans-excellence.mjs";

expect(componentPath, [
  "PRICE_BY_PLAN",
  "$0",
  "$300",
  "$750+",
  "$300/mo",
  "Compare pricing",
  "Best for",
  "Not for",
  "Plan guardrails",
  "Buy the right depth.",
  "Start free when the cause is unclear.",
  "Use Deep Review when the business needs the real reason.",
  "Use Build Fix when the direction is clear enough to improve.",
  "Use Ongoing Control when the base needs monthly attention.",
  "No fake urgency.",
  "No unsupported revenue promise.",
  "No paid push before stage fit is clear.",
  "No protected result before verification.",
]);

expect(plansPath, [
  "Clear plans. Clear prices. No wrong-depth push.",
  "$0",
  "$300",
  "$750+",
  "$300/mo",
  "Customers compare before they contact you.",
  "The wrong fix wastes money.",
  "The first step should reduce guessing.",
  "Start free scan",
  "Plans handoff runtime integration",
  "Connected plan handoffs",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(packagePath, ["validate:routes"]);
expect(routesChainPath, [validatorPath, "validate-owner-maximum-protection-posture.mjs"]);

boundedLength(componentPath, 14000);
boundedLength(plansPath, 14500);

forbidden(componentPath, blockedPlanPhrases());
forbidden(plansPath, [...blockedPlanPhrases(), "Best first move", "Start free if the cause is unclear. Pay when the next depth is obvious."]);

if (failures.length) {
  console.error("Public plans simplified excellence validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public plans simplified excellence validation passed with visible pricing, shorter plan detail pages, stage-fit guidance, hidden platform handoff guardrails, route-chain coverage, and owner posture coverage.");

function blockedPlanPhrases() {
  return [
    "PLAN_PATH_OPERATING_SNAPSHOT",
    "PLAN_CHANNEL_COVERAGE",
    "guaranteed ROI",
    "guaranteed refund",
    "guaranteed legal outcome",
    "guaranteed security outcome",
    "guaranteed business results",
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
  if (text.length > maxCharacters) failures.push(`${path} is too long for simplified plan standard: ${text.length} > ${maxCharacters}`);
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
