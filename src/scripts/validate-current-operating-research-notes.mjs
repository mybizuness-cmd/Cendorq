import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["docs/current-operating-research-notes.md", [
    "Current Operating Research Notes",
    "checked against current official guidance",
    "search, AI discovery, analytics, performance, advertising readiness, brand filing preparation, security, or deployment posture",
    "Search and AI discovery",
    "Public search systems do not guarantee crawling, indexing, serving, rich results, or AI feature inclusion.",
    "LCP, INP, and CLS",
    "Campaign reporting should use stable UTM naming",
    "Public sharing needs clean metadata, canonical URLs, and share images.",
    "Advertising readiness needs clean landing pages, crawlable public routes, policy-safe claims, privacy-safe analytics, verified domains where required, and conversion events that do not leak private customer data.",
    "Meta, search, and other ad crawlers should see the public buyer path, not private dashboards, reports, billing documents, support records, command-center pages, customer files, or protected APIs.",
    "Traffic attribution should separate organic, referral, paid, email, lifecycle, dashboard-return, and support-return paths without storing sensitive customer content in public analytics payloads.",
    "Trademark strategy can prepare names, category language, specimens, use evidence, and filing steps, but cannot guarantee registration or competitor blocking.",
    "Security posture should track current advisories, dependency updates, runtime exposure, webhook verification, secret rotation, malware containment, and patch urgency without disabling validators to pass.",
    "Deliverability posture should use recognizable sender identity, SPF, DKIM, DMARC, low-noise transactional content, dashboard mirrors, and safe recovery while avoiding guaranteed inbox-placement claims.",
    "Customer document posture should keep reports and billing PDFs static, no-leak checked, branded, entitlement-gated or provider-authoritative, and never the only access path.",
    "Research-to-build rule",
    "Blocked research drift",
    "Do not move from stale memory",
  ]],
  ["docs/operating-memory-lock.md", [
    "docs/current-operating-research-notes.md",
    "src/scripts/validate-current-operating-research-notes.mjs",
  ]],
  ["docs/command-center-docs-index.md", [
    "docs/current-operating-research-notes.md",
    "src/scripts/validate-current-operating-research-notes.mjs",
    "advertising readiness",
  ]],
  ["src/scripts/validate-routes-chain.mjs", [
    "src/scripts/validate-current-operating-research-notes.mjs",
  ]],
  ["src/scripts/validate-routes-chain-integrity.mjs", [
    "src/scripts/validate-current-operating-research-notes.mjs",
    "docs/current-operating-research-notes.md",
  ]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Current operating research notes validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Current operating research notes validation passed with current-source research, search/AI discovery, Core Web Vitals, advertising readiness, attribution, brand filing boundaries, security patch posture, deliverability, document gates, and research-to-build coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
