import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/lib/command-center/validation-registry-brand-legal-addendum.ts", [
    "BRAND_LEGAL_VALIDATION_REGISTRY_ADDENDUM",
    "current-operating-research-notes",
    "brand-trademark-operating-standard",
    "logo-readiness-standard",
    "legal-trust-crawler-readiness-standard",
    "owner-brand-legal-trust-addendum",
    "src/scripts/validate-current-operating-research-notes.mjs",
    "src/scripts/validate-brand-trademark-operating-standard.mjs",
    "src/scripts/validate-logo-readiness-standard.mjs",
    "src/scripts/validate-legal-trust-crawler-readiness-standard.mjs",
    "src/scripts/validate-owner-brand-legal-trust-addendum.mjs",
    "getBrandLegalValidationRegistryAddendum",
  ]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-brand-legal-validation-registry-addendum.mjs"]],
  ["src/scripts/validate-routes-chain-integrity.mjs", ["src/scripts/validate-brand-legal-validation-registry-addendum.mjs"]],
  ["docs/command-center-docs-index.md", ["validation-registry-brand-legal-addendum.ts"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Brand legal validation registry addendum validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Brand legal validation registry addendum validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
