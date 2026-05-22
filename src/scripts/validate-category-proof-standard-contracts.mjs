import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const path = "src/lib/category-proof-standard-contracts.ts";

expect(path, [
  "CategoryProofStandardStage",
  "CATEGORY_PROOF_STANDARD_CONTRACTS",
  "findability",
  "understanding",
  "trust",
  "choice",
  "action",
  "control",
  "indexable public page",
  "clear service/location page",
  "Google Business Profile consistency",
  "schema aligned with visible copy",
  "Business Truth Profile facts",
  "customer-proof-signal",
  "reviewed comparison-signal",
  "same-email recovery",
  "Free Scan first-signal explanation",
  "Control Snapshot",
  "approval gate",
  "release log",
  "mark as sampled signal",
  "source label",
  "confidence label",
  "comparison signals require review",
  "control is monitoring not guarantee",
  "guaranteed ranking",
  "AI placement guarantee",
  "guaranteed selection",
  "permanent visibility",
  "getCategoryProofStandardContracts",
  "getCategoryProofStandardContract",
]);

order(path, "findability", "understanding");
order(path, "understanding", "trust");
order(path, "trust", "choice");
order(path, "choice", "action");
order(path, "action", "control");
forbidden(path, ["guaranteed ranking allowed", "AI placement guarantee allowed", "permanent visibility promised"]);

if (failures.length) {
  console.error("Category proof standard contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Category proof standard contracts validation passed with Findability, Understanding, Trust, Choice, Action, Control, accepted proof signals, repair examples, confidence rules, and unsafe claim boundaries.");

function expect(filePath, phrases) {
  if (!existsSync(join(root, filePath))) {
    failures.push(`Missing dependency: ${filePath}`);
    return;
  }
  const text = read(filePath);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${filePath} missing phrase: ${phrase}`);
}

function forbidden(filePath, phrases) {
  if (!existsSync(join(root, filePath))) return;
  const text = read(filePath);
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${filePath} contains forbidden phrase: ${phrase}`);
}

function order(filePath, before, after) {
  if (!existsSync(join(root, filePath))) return;
  const text = read(filePath);
  const beforeIndex = text.indexOf(before);
  const afterIndex = text.indexOf(after);
  if (beforeIndex === -1) failures.push(`${filePath} missing order phrase: ${before}`);
  if (afterIndex === -1) failures.push(`${filePath} missing order phrase: ${after}`);
  if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex >= afterIndex) failures.push(`${filePath} order violation: ${before} must appear before ${after}`);
}

function read(filePath) {
  return readFileSync(join(root, filePath), "utf8");
}
