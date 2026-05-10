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
    "Do not move from stale memory",
  ]],
  ["docs/operating-memory-lock.md", [
    "docs/current-operating-research-notes.md",
    "src/scripts/validate-current-operating-research-notes.mjs",
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

console.log("Current operating research notes validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
