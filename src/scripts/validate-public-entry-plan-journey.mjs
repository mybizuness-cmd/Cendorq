import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const homepagePath = "src/app/page.tsx";
const plansPath = "src/app/plans/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-entry-plan-journey.mjs";

expect(homepagePath, [
  "Public customer journey",
  "Public entry plan journey",
  "Correct plan prices",
  "Free Scan $0",
  "Deep Review $497",
  "Build Fix $1,497",
  "Ongoing Control $597/mo",
  "First signal",
  "Cause-level diagnosis",
  "Scoped implementation",
  "Monthly control",
  "Free Scan is a first signal, not a full diagnosis.",
  "Deep Review diagnoses cause before bigger spend.",
  "Build Fix is scoped implementation, not unlimited site work.",
  "Ongoing Control is recurring review, not unlimited Build Fix.",
  "getCendorqPlanPrice",
  "getPlanValueDelivery",
  "PLAN_VALUE_SEPARATION_RULES",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(plansPath, [
  "Public entry plan journey",
  "Plan fit guide",
  "Pick the stage, not the biggest package.",
  "Final fixed plan prices",
  "Free Scan $0",
  "Deep Review $497",
  "Build Fix $1,497",
  "Ongoing Control $597/mo",
  "Buy diagnosis before implementation when the reason is not proven.",
  "Buy implementation only when the fix target is clear.",
  "Use monthly control when the business needs recurring attention.",
  "Not enough clarity",
  "Need the real reason",
  "Know what needs improvement",
  "Need recurring review",
  "PLAN_VALUE_NO_OVERLAP_MATRIX",
  "PLAN_VALUE_SEPARATION_RULES",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(homepagePath, [
  "$300",
  "$750+",
  "$300 mo",
  "/plans/deep-review",
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

console.log("Public entry plan journey validation passed with homepage/pricing consistency and current plan prices.");

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
