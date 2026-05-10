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
    "policy-safe claims",
    "avoid sensitive customer content in URLs or analytics payloads",
    "do not route ad crawlers into protected dashboard or report pages",
    "easy to trust, easy to crawl, easy to verify, and hard to misunderstand",
  ]],
  ["src/app/privacy/page.tsx", [
    "AI readiness privacy",
    "Keep private data out of public discovery",
    "Robots.txt, sitemap omission, or public obscurity is not a privacy control.",
    "No customer-specific files in public search",
  ]],
  ["src/app/terms/page.tsx", [
    "AI readiness terms",
    "Scope rule",
    "Outcome rule",
    "Cendorq does not guarantee revenue, rankings, AI placement, leads, or sales.",
  ]],
  ["src/app/disclaimer/page.tsx", [
    "AI readiness disclaimer",
    "No guaranteed rankings, AI placement, leads, revenue, sales, security outcome, or platform treatment.",
    "No guaranteed ranking",
    "No guaranteed AI placement",
  ]],
  ["src/layout/site-footer.tsx", [
    "href=\"/privacy\"",
    "href=\"/terms\"",
    "href=\"/disclaimer\"",
    "Privacy",
    "Terms",
    "Disclaimer",
    "not a guarantee of rankings, leads, revenue, or AI placement",
  ]],
  ["public/.well-known/security.txt", ["Contact"]],
  ["src/app/sitemap.ts", ["/privacy", "/terms", "/disclaimer"]],
  ["src/app/robots.ts", ["sitemap"]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-legal-trust-crawler-readiness-standard.mjs"]],
  ["src/scripts/validate-routes-chain-integrity.mjs", ["src/scripts/validate-legal-trust-crawler-readiness-standard.mjs", "docs/legal-trust-crawler-readiness-standard.md"]],
  ["docs/command-center-docs-index.md", ["docs/legal-trust-crawler-readiness-standard.md", "src/scripts/validate-legal-trust-crawler-readiness-standard.mjs"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Legal trust crawler readiness standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Legal trust crawler readiness standard validation passed with policy, footer trust discovery, crawler, ad-platform, privacy, terms, disclaimer, security contact, sitemap, robots, route-chain, and docs-index coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.toLowerCase().includes(String(phrase).toLowerCase())) failures.push(`${path} missing phrase: ${phrase}`);
}
