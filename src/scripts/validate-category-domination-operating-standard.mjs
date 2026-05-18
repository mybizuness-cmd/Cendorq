import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standardPath = "src/lib/category-domination-operating-standard.ts";
const failures = [];

expect(standardPath, [
  "CATEGORY_DOMINATION_OPERATING_STANDARDS",
  "CATEGORY_DOMINATION_NON_NEGOTIABLES",
  "getCategoryDominationOperatingStandards",
  "market-position",
  "customer-experience",
  "conversion-system",
  "product-delivery",
  "operator-execution",
  "data-foundation",
  "trust-safety",
  "financial-control",
  "learning-loop",
  "Customer can reach the next correct action in under 20 seconds.",
  "No customer-visible state changes without a command, gate, and audit event.",
  "Every core customer action maps to durable records and safe projections.",
  "Never trade trust for conversion",
]);

forbidden(standardPath, [
  "guaranteed domination",
  "guaranteed revenue",
  "guaranteed ROI",
  "ignore compliance",
  "skip approval",
  "raw private data",
  "unlimited implementation",
]);

if (failures.length) {
  console.error("Category domination operating standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Category domination operating standard validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
