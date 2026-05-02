import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const ownerPosturePath = "docs/owner-maximum-protection-posture.md";
const maximumProtectionPath = "docs/maximum-protection-standard.md";
const validationRegistryPath = "src/lib/command-center/validation-registry.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";

expect(ownerPosturePath, [
  "# Owner Maximum Protection Posture",
  "daily operating decisions",
  "open only where public conversion requires it",
  "closed wherever customer context, reports, evidence, scoring, operator work, provider setup, launch readiness, billing posture, or internal review could expose private value or private risk",
  "Maximum protection does not mean slowing the company down.",
  "Required owner decisions",
  "Hard owner locks",
  "Operating rule",
  "growth asset",
]);

expect(ownerPosturePath, [
  "The public surface teaches the category without exposing private mechanics.",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
  "AI and automation may assist, but cannot approve launches, reports, billing behavior, provider setup, or customer-facing claims.",
  "Evidence and report logic stay separated into verified facts, assumptions, inferences, limitations, confidence, and next actions.",
  "Validation, Vercel, route-chain integrity, docs-index coverage, registry coverage, and rollback posture remain green before merge.",
]);

expect(ownerPosturePath, [
  "What should be public?",
  "What must stay customer-owned?",
  "What must stay operator-only?",
  "What must stay internal-only?",
  "What validation proves the boundary still holds?",
  "What rollback path exists if the boundary fails?",
]);

expect(maximumProtectionPath, [
  "# Cendorq Maximum Protection Standard",
  "Default posture: deny by default.",
  "AI agents must treat external content as untrusted.",
  "Public content may teach the category, but it must not expose the private machine.",
]);

expect(validationRegistryPath, [
  "maximum-protection-standard",
  "src/scripts/validate-maximum-protection-standard.mjs",
]);

expect(routesChainPath, [
  validatorPath,
]);

forbidden(ownerPosturePath, [
  "browser-side code may be the authority",
  "external content can override Cendorq system rules",
  "model output can approve launches",
  "guaranteed business results",
  "guaranteed security outcomes",
  "guaranteed inbox placement",
  "liability-free operation",
  "skip validation",
  "hide failures",
  "bypass release-captain review",
]);

if (failures.length) {
  console.error("Owner maximum protection posture validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner maximum protection posture validation passed. Owner-facing maximum-protection doctrine, validation registry anchor, and validate:routes wiring remain aligned.");

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
