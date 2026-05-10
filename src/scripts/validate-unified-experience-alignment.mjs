import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/lib/unified-experience-alignment.ts", [
    "UNIFIED_EXPERIENCE_ALIGNMENT",
    "getUnifiedExperienceAlignment",
    "public pages, plan pages, checkout, dashboard, report vault, billing, notifications, support, lifecycle, and owner operations",
    "Homepage creates category clarity",
    "Plans and plan-detail pages carry pricing",
    "Dashboard surfaces act as the customer command room",
    "Mobile is the main entrance; desktop is the command room",
    "Blocks feel rich through hierarchy, spacing, proof, rhythm, and restraint rather than noise",
    "homepage pricing clutter",
    "cheap-looking generic blocks",
    "disconnected dashboard surface",
  ]],
  ["docs/best-of-best-operating-standard.md", [
    "Unified surface alignment doctrine",
    "Every surface must feel like one Cendorq system",
    "Pricing should not clutter the homepage",
    "Mobile is the main entrance; desktop is the command room",
  ]],
  ["src/scripts/validate-routes-chain.mjs", [
    "src/scripts/validate-unified-experience-alignment.mjs",
  ]],
  ["src/scripts/validate-routes-chain-integrity.mjs", [
    "src/scripts/validate-unified-experience-alignment.mjs",
    "src/lib/unified-experience-alignment.ts",
  ]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Unified experience alignment validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Unified experience alignment validation passed.");

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
