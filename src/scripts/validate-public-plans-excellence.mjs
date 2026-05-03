import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const componentPath = "src/components/plans/conversion-plan-page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(componentPath, [
  "PLAN_PATH_OPERATING_SNAPSHOT",
  "Plan path operating snapshot",
  "Decision posture",
  "Proof-led plan selection",
  "Upgrade posture",
  "No pressure path",
  "Fit logic",
  "Stage-fit decision",
  "Customer protection",
  "Truthful boundaries",
  "PLAN_DECISION_PRINCIPLES",
  "How to choose",
  "The best plan is the one that matches the business stage",
  "Start free when the business problem is unclear.",
  "Go deeper when you need explanation, evidence, and prioritization.",
  "Build when the direction is clear enough to change the business path.",
  "Use ongoing control when the base is ready for repeated measurement, improvement, and protection.",
  "PLAN_TRUST_RULES",
  "Plan trust rules",
  "No fake urgency",
  "No unsupported ROI claims",
  "No guaranteed business results",
  "PLAN_CHANNEL_COVERAGE",
  "Revenue paths considered",
  "Social and creator channels",
  "Marketplace/platform revenue",
  "Digital product and recurring revenue",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "The public surface teaches the category without exposing private mechanics.",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(packagePath, [
  "validate:routes",
  "validate-public-plans-excellence.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(componentPath, [
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
]);

if (failures.length) {
  console.error("Public plans excellence validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public plans excellence validation passed with owner posture coverage.");

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
