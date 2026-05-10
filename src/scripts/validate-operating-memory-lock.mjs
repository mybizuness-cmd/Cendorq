import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["docs/operating-memory-lock.md", [
    "Operating Memory Lock",
    "docs/current-operating-research-notes.md",
    "src/scripts/validate-current-operating-research-notes.mjs",
    "docs/brand-trademark-operating-standard.md",
    "src/scripts/validate-brand-trademark-operating-standard.mjs",
    "src/scripts/validate-logo-readiness-standard.mjs",
    "docs/legal-trust-crawler-readiness-standard.md",
    "src/scripts/validate-legal-trust-crawler-readiness-standard.mjs",
    "docs/owner-brand-legal-trust-addendum.md",
    "src/scripts/validate-owner-brand-legal-trust-addendum.mjs",
    "src/lib/command-center/validation-registry-brand-legal-addendum.ts",
    "src/scripts/validate-brand-legal-validation-registry-addendum.mjs",
    "docs/support-channel-operating-standard.md",
    "src/scripts/validate-support-channel-operating-standard.mjs",
    "src/lib/unified-experience-alignment.ts",
    "src/scripts/validate-unified-experience-alignment.mjs",
    "src/scripts/validate-surface-level-alignment.mjs",
    "doctrine file, a validator, route-chain execution, route-chain integrity coverage, and docs visibility",
  ]],
  ["src/scripts/validate-routes-chain.mjs", [
    "src/scripts/validate-operating-memory-lock.mjs",
    "src/scripts/validate-brand-trademark-operating-standard.mjs",
    "src/scripts/validate-logo-readiness-standard.mjs",
    "src/scripts/validate-legal-trust-crawler-readiness-standard.mjs",
    "src/scripts/validate-owner-brand-legal-trust-addendum.mjs",
    "src/scripts/validate-brand-legal-validation-registry-addendum.mjs",
    "src/scripts/validate-unified-experience-alignment.mjs",
    "src/scripts/validate-surface-level-alignment.mjs",
  ]],
  ["src/scripts/validate-routes-chain-integrity.mjs", [
    "src/scripts/validate-operating-memory-lock.mjs",
    "docs/operating-memory-lock.md",
    "src/scripts/validate-brand-trademark-operating-standard.mjs",
    "src/scripts/validate-logo-readiness-standard.mjs",
    "src/scripts/validate-legal-trust-crawler-readiness-standard.mjs",
    "src/scripts/validate-owner-brand-legal-trust-addendum.mjs",
    "src/scripts/validate-brand-legal-validation-registry-addendum.mjs",
    "src/scripts/validate-unified-experience-alignment.mjs",
    "src/scripts/validate-surface-level-alignment.mjs",
  ]],
  ["docs/command-center-docs-index.md", [
    "docs/brand-trademark-operating-standard.md",
    "docs/legal-trust-crawler-readiness-standard.md",
    "docs/owner-brand-legal-trust-addendum.md",
    "src/lib/command-center/validation-registry-brand-legal-addendum.ts",
    "src/scripts/validate-logo-readiness-standard.mjs",
    "src/scripts/validate-brand-legal-validation-registry-addendum.mjs",
  ]],
  ["docs/owner-operating-manual.md", [
    "Unified surface lock",
    "Operating memory lock",
  ]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Operating memory lock validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Operating memory lock validation passed with current research, brand/trademark, logo readiness, legal/trust/crawler, owner addendum, brand/legal registry addendum, support channel, unified alignment, and surface-level standards locked.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}
