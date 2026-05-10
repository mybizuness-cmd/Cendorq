import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["docs/legal-trust-crawler-readiness-standard.md", [
    "Legal, Trust, and Crawler Readiness Standard",
    "Public trust protection should be clear, calm, findable, and properly placed.",
    "Privacy policy",
    "Terms of service",
    "Disclaimer",
    "Security contact surface",
    "Support contact surface",
    "Private customer areas should not be discovery surfaces.",
    "Legal boundary placement",
    "Dispute-risk reduction",
    "Advertising and platform-readiness boundary",
    "easy to trust, easy to crawl, easy to verify, and hard to misunderstand",
  ]],
  ["src/app/privacy/page.tsx", ["privacy"]],
  ["src/app/terms/page.tsx", ["terms"]],
  ["src/app/disclaimer/page.tsx", ["disclaimer"]],
  ["public/.well-known/security.txt", ["Contact"]],
  ["src/app/sitemap.ts", ["/privacy", "/terms", "/disclaimer"]],
  ["src/app/robots.ts", ["sitemap"]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-legal-trust-crawler-readiness-standard.mjs"]],
  ["src/scripts/validate-routes-chain-integrity.mjs", ["src/scripts/validate-legal-trust-crawler-readiness-standard.mjs", "docs/legal-trust-crawler-readiness-standard.md"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Legal trust crawler readiness standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Legal trust crawler readiness standard validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.toLowerCase().includes(String(phrase).toLowerCase())) failures.push(`${path} missing phrase: ${phrase}`);
}
