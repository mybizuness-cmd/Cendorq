import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const publicDriftPath = "src/scripts/validate-public-drift.mjs";
const routeChainPath = "src/scripts/validate-routes-chain.mjs";
const commandDesignValidatorPath = "src/scripts/validate-command-design-operating-standard.mjs";
const standardPath = "docs/command-design-operating-standard.md";
const releaseChecklistPath = "docs/command-design-release-checklist.md";
const focusedPrTemplatePath = ".github/PULL_REQUEST_TEMPLATE/command-design.md";
const docsIndexPath = "docs/command-center-docs-index.md";
const readmePath = "README.md";
const productionGuidePath = "docs/production-guide.md";
const contributingPath = "CONTRIBUTING.md";

for (const path of [standardPath, releaseChecklistPath, focusedPrTemplatePath, publicDriftPath, routeChainPath, docsIndexPath, readmePath, productionGuidePath, contributingPath]) {
  expectFile(path);
}

expect(publicDriftPath, [
  "AI Visibility",
  "AI Engine Readiness",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "Scan",
  "Review",
  "Fix",
  "Control",
]);

expect(routeChainPath, [commandDesignValidatorPath]);

expect(standardPath, [
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
  "Free Scan",
]);

expect(releaseChecklistPath, ["Apple-level trust and authority", "Google-level simplicity", "ChatGPT-level immediate action"]);
expect(focusedPrTemplatePath, ["Command design impact", "Apple-level trust and authority", "Google-level simplicity", "ChatGPT-level immediate action"]);
expect(docsIndexPath, [standardPath, commandDesignValidatorPath, publicDriftPath]);
expect(readmePath, [standardPath]);
expect(productionGuidePath, [standardPath]);
expect(contributingPath, [standardPath]);

forbid(publicDriftPath, [
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "description: \"Compare Scan, Diagnose, Fix, and Control.\"",
  "label: \"Pricing\"",
  "description: \"Choose the right depth.\"",
]);

if (failures.length) {
  console.error("Command design operating standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command design operating standard validation passed for the visibility plus readiness public path.");

function expectFile(path) {
  if (!existsSync(join(root, path))) failures.push(`Missing required file: ${path}`);
}

function expect(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function forbid(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}
