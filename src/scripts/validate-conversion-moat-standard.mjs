import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const standardPath = "src/lib/command-center/conversion-moat-standard.ts";
const docsIndexPath = "docs/command-center-docs-index.md";
const routeChainPath = "src/scripts/validate-routes-chain.mjs";
const registryPath = "src/lib/command-center/validation-registry.ts";
const homepagePath = "src/app/page.tsx";

validateTextFile(standardPath, [
  "CONVERSION_MOAT_RULES",
  "CONVERSION_MOAT_MOMENTS",
  "getConversionMoatStandard",
  "Five-second command",
  "Truthful plan progression",
  "Proof before pressure",
  "Pricing without confusion",
  "Frictionless next step",
  "Privacy-safe learning loop",
  "single clear headline",
  "two CTAs maximum",
  "visible pricing path",
  "no competing popup",
  "Free Scan for unclear cause",
  "Deep Review for evidence",
  "Build Fix for known weak point",
  "Ongoing Control for continued market change",
  "protected dashboard language",
  "$0",
  "$300",
  "$750+",
  "$300/mo",
  "Start free scan",
  "See pricing",
]);

validateTextFile(homepagePath, [
  "Find why customers leave before you buy the fix.",
  "Start free scan",
  "View pricing",
  "Free first read. Clear pricing when you need the next depth.",
  "Customers decide before they talk to you.",
  "Start small. Move deeper only when it makes sense.",
  "No fake urgency. No wrong-depth push. Diagnosis comes before bigger spend.",
]);

validateTextFile(docsIndexPath, [
  "src/lib/command-center/conversion-moat-standard.ts",
  "src/scripts/validate-conversion-moat-standard.mjs",
]);

validateTextFile(routeChainPath, ["src/scripts/validate-conversion-moat-standard.mjs"]);
validateTextFile(registryPath, ["conversion-moat-standard", "src/scripts/validate-conversion-moat-standard.mjs"]);

validateForbidden(standardPath, [
  "fake urgency allowed",
  "dark pattern allowed",
  "guaranteed revenue",
  "guaranteed ROI",
  "hidden pricing allowed",
  "raw report text in analytics allowed",
]);
validateForbidden(homepagePath, [
  "guaranteed revenue",
  "guaranteed ROI",
  "Search Presence OS",
  "Pricing is visible: $0, $300, $750+, or $300/mo.",
  "Silent decision pressure",
  "Pay only when the next depth is clear.",
]);

if (failures.length) {
  console.error("Conversion moat standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Conversion moat standard validation passed with a direct customer headline, two clear CTAs, visible pricing access, proof-before-pressure language, stage-fit plans, frictionless next steps, and privacy-safe learning safeguards.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required conversion moat dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required conversion moat phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden conversion moat phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
