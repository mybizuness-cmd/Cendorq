import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["docs/owner-brand-legal-trust-addendum.md", [
    "Owner Brand, Logo, Legal, and Trust Addendum",
    "Confirm logo source artwork, creator, files, dates, and ownership or assignment records.",
    "Keep the Cendorq signal mark consistent",
    "Run clearance review before relying on a wordmark, signal mark, or combined mark as filing-ready.",
    "Use qualified legal review for trademark filing",
    "Do not claim guaranteed trademark registration",
    "Keep Terms, Privacy, Disclaimer, support contact, security contact, sitemap, robots, metadata, and structured data aligned.",
    "Keep public crawler surfaces useful and private customer surfaces protected.",
    "Trust language should protect Cendorq while increasing buyer confidence.",
    "The current signal mark may be evolved after clearance review",
  ]],
  ["docs/brand-trademark-operating-standard.md", ["Logo ownership and proprietary readiness", "Signal mark design direction"]],
  ["docs/legal-trust-crawler-readiness-standard.md", ["Legal, Trust, and Crawler Readiness Standard", "Crawler readiness"]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-owner-brand-legal-trust-addendum.mjs"]],
  ["src/scripts/validate-routes-chain-integrity.mjs", ["src/scripts/validate-owner-brand-legal-trust-addendum.mjs", "docs/owner-brand-legal-trust-addendum.md"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Owner brand legal trust addendum validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner brand legal trust addendum validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
