import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const homepagePath = "src/app/page.tsx";
const plansPath = "src/app/plans/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-entry-plan-journey.mjs";

expect(homepagePath, [
  "AI Engine Readiness",
  "AI-readiness starts with business clarity.",
  "Free Scan",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "Internal keys preserved: deep-review, build-fix, ongoing-control",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "Business clarity",
  "Clear facts",
  "Trusted proof",
  "Consistent signals",
  "Reason to choose",
  "Action path",
  "No AI placement promises",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(plansPath, [
  "AI readiness plans",
  "Choose the depth that matches the evidence.",
  "AI Readiness Plans",
  "Free Scan $0",
  "AI Readiness Review $497",
  "Signal Repair $1,497",
  "Readiness Control $597/mo",
  "Each plan buys a different level of readiness.",
  "Start with the signal. Pay for deeper work only when the stage fits: Review, Repair, then Control.",
  "No guaranteed rankings, AI placement, leads, or revenue claims.",
  "Internal keys preserved: deep-review, build-fix, ongoing-control",
  "PLAN_VALUE_SEPARATION_RULES",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(homepagePath, [
  "$300",
  "$750+",
  "$300 mo",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
  "free full diagnosis",
  "free implementation",
  "free monthly monitoring",
]);

forbidden(plansPath, [
  "$750+",
  "$300/mo",
  "starting at",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
  "unlimited build fix included",
]);

boundedLength(homepagePath, 18000);
boundedLength(plansPath, 18500);

if (failures.length) {
  console.error("Public entry plan journey validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public entry plan journey validation passed with AI-readiness homepage/plans consistency and preserved internal plan keys.");

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

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for public entry plan journey standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
