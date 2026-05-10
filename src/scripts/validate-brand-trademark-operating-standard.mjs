import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["docs/brand-trademark-operating-standard.md", [
    "Brand and Trademark Operating Standard",
    "distinctive, ownable, customer-recognizable brand system",
    "no internal document, public page, report, or owner manual may claim guaranteed trademark registration",
    "guaranteed competitor blocking",
    "A trademark identifies the source of goods or services and distinguishes them from competitors.",
    "Trademark protection is tied to specific goods or services",
    "Likelihood of confusion is a common refusal risk",
    "Five owner filing steps",
    "Lock candidate mark and brand usage.",
    "Run clearance review.",
    "Define goods/services and filing basis.",
    "Prepare filing materials.",
    "File, monitor, respond, and maintain.",
    "Cendorq wordmark",
    "AI Engine Readiness category language",
    "Scan, Review, Repair, Control path",
    "qualified legal review",
  ]],
  ["docs/current-operating-research-notes.md", [
    "Trademark strategy can prepare names, category language, specimens, use evidence, and filing steps, but cannot guarantee registration or competitor blocking.",
  ]],
  ["docs/owner-operating-manual.md", [
    "Brand and trademark",
    "five owner filing steps",
  ]],
  ["docs/command-center-docs-index.md", [
    "docs/brand-trademark-operating-standard.md",
    "src/scripts/validate-brand-trademark-operating-standard.mjs",
  ]],
  ["src/scripts/validate-routes-chain.mjs", [
    "src/scripts/validate-brand-trademark-operating-standard.mjs",
  ]],
  ["src/scripts/validate-routes-chain-integrity.mjs", [
    "src/scripts/validate-brand-trademark-operating-standard.mjs",
    "docs/brand-trademark-operating-standard.md",
  ]],
];

for (const [path, phrases] of checks) expect(path, phrases);

forbidden("docs/brand-trademark-operating-standard.md", [
  "guaranteed registration is allowed",
  "guaranteed competitor blocking is allowed",
  "legal advice without qualified legal review is allowed",
  "claiming registration before registration exists is allowed",
]);

if (failures.length) {
  console.error("Brand trademark operating standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Brand trademark operating standard validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = readFileSync(join(root, path), "utf8").toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}
