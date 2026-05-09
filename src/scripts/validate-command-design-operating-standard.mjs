import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const standardPath = "docs/command-design-operating-standard.md";
const releaseChecklistPath = "docs/command-design-release-checklist.md";
const focusedPrTemplatePath = ".github/PULL_REQUEST_TEMPLATE/command-design.md";
const publicDriftPath = "src/scripts/validate-public-drift.mjs";
const routeChainPath = "src/scripts/validate-routes-chain.mjs";
const docsIndexPath = "docs/command-center-docs-index.md";
const readmePath = "README.md";
const productionGuidePath = "docs/production-guide.md";
const contributingPath = "CONTRIBUTING.md";
const commandDesignValidatorPath = "src/scripts/validate-command-design-operating-standard.mjs";

for (const path of [standardPath, releaseChecklistPath, focusedPrTemplatePath, publicDriftPath, routeChainPath, docsIndexPath, readmePath, productionGuidePath, contributingPath]) {
  expectFile(path);
}

expect(standardPath, [
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
  "What is the safest next readiness move?",
  "Start Free Scan.",
  "Compare Plans.",
  "Open Dashboard.",
  "Open Intake Console.",
  "Ask support only when fit, scope, access, or timing needs a human path.",
  "AI Engine Readiness",
  "Free Scan",
  "Plans",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "Scan, Review, Repair, Control",
  "easier to find, understand, trust, and choose",
  "No vague audit theater.",
  "No ranking promises.",
  "No public exposure of private scoring, evidence, report, or operator logic.",
  "Do not optimize Cendorq for decoration. Optimize it for readiness clarity.",
]);

expect(releaseChecklistPath, [
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
  "What is the safest next readiness move for the user?",
  "Fallback surfaces are part of the product experience.",
  "homepage, Free Scan, or Plans",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
]);

expect(focusedPrTemplatePath, [
  "Command design impact",
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
  "What is the safest next readiness move?",
  "Fallback, error, loading, or not-found states recover into homepage, Free Scan, or Plans",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
]);

expect(publicDriftPath, [
  "label: \"Plans\"",
  "description: \"Compare Scan, Review, Repair, and Control.\"",
  "src/app/loading.tsx",
  "src/app/error.tsx",
  "src/app/not-found.tsx",
  "label: \"Pricing\"",
  "description: \"Choose the right depth.\"",
]);

expect(routeChainPath, [
  commandDesignValidatorPath,
  "baseline route existence and command design standard coverage",
]);

expect(docsIndexPath, [
  standardPath,
  releaseChecklistPath,
  focusedPrTemplatePath,
  commandDesignValidatorPath,
  publicDriftPath,
  "Required command design paths",
]);

expect(readmePath, [
  standardPath,
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
]);

expect(productionGuidePath, [
  standardPath,
  "Command design rule",
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
  "What is the safest next readiness move?",
]);

expect(contributingPath, [
  standardPath,
  "Command design standard",
  "command design impact",
  "What is the safest next readiness move?",
]);

forbid(standardPath, ["Deep Review", "Build Fix", "Ongoing Control", "Scan, Diagnose, Fix, Control", "Connect only when fit"]);
forbid(releaseChecklistPath, ["Deep Review", "Build Fix", "Ongoing Control", "Connect for fit", "safest next command"]);
forbid(focusedPrTemplatePath, ["Deep Review", "Build Fix", "Ongoing Control", "Connect"]);
forbid(contributingPath, ["Deep Review", "Build Fix", "Ongoing Control", "safest next command", "Connect"]);

if (failures.length) {
  console.error("Command design operating standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command design operating standard validation passed. Cendorq has a documented, route-chain-protected, docs-indexed, PR-template-backed, and release-checklist-backed Apple-level trust, Google-level simplicity, and ChatGPT-level immediate-action readiness standard.");

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
