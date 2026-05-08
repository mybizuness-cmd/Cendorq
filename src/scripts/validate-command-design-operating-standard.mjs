import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const standardPath = "docs/command-design-operating-standard.md";
const publicDriftPath = "src/scripts/validate-public-drift.mjs";
const routeChainPath = "src/scripts/validate-routes-chain.mjs";
const commandDesignValidatorPath = "src/scripts/validate-command-design-operating-standard.mjs";

expectFile(standardPath);
expectFile(publicDriftPath);
expectFile(routeChainPath);

expect(standardPath, [
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
  "What is the safest next command?",
  "Start Free Scan.",
  "Compare Plans.",
  "Open Dashboard.",
  "Open Intake Console.",
  "Connect only when fit, scope, or timing is already clear.",
  "Free Scan",
  "Plans",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "Scan, Diagnose, Fix, Control",
  "easier to find, understand, trust, and choose",
  "No vague audit theater.",
  "No ranking promises.",
  "No public exposure of private scoring, evidence, report, or operator logic.",
  "Do not optimize Cendorq for decoration. Optimize it for command.",
]);

expect(publicDriftPath, [
  "label: \"Plans\"",
  "description: \"Compare Scan, Diagnose, Fix, and Control.\"",
  "label: \"Pricing\"",
  "description: \"Choose the right depth.\"",
]);

expect(routeChainPath, [
  commandDesignValidatorPath,
  "baseline route existence and command design standard coverage",
]);

if (failures.length) {
  console.error("Command design operating standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command design operating standard validation passed. Cendorq has a documented and route-chain-protected Apple-level trust, Google-level simplicity, and ChatGPT-level immediate-action product standard.");

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
