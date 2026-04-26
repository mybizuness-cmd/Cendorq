import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "docs/closed-intelligence-operating-standard.md",
  "README.md",
  "SECURITY.md",
  "docs/release-checklist.md",
  ".github/pull_request_template.md",
  "CHANGELOG.md",
];

const operatingStandardExpectations = [
  "Cendorq Closed Intelligence Operating Standard",
  "public where it must convert and private where it must protect intelligence",
  "The public surface sells the outcome.",
  "The private system holds the engine.",
  "The database must be closed by default.",
  "No user, competitor, crawler, partner, public page, browser, or unauthenticated process should be able to query or browse the database directly.",
  "All database access must go through controlled application services, internal tools, or approved automation paths.",
  "no public database browser",
  "no direct client-side database credentials",
  "no anonymous read access to private business records",
  "no public report index",
  "no public client evidence index",
  "least-privilege service roles",
  "private server-side environment variables only",
  "signed report access where reports are exposed",
  "audit trail for internal report and intake access",
  "Public/private boundary",
  "Public must not include",
  "exact scoring formulas",
  "private AI prompts",
  "raw competitor datasets",
  "client reports without access control",
  "direct database endpoints",
  "AI agents are a private workforce",
  "Every AI-agent workflow must be evidence-gated.",
  "Reports are protected business intelligence.",
  "Cendorq must become evidence-backed, not just AI-written.",
  "Competitors may be allowed to understand the public category, but not the private machine.",
  "Three-pass independent review norm",
  "Five-pass elevation norm",
  "GitHub execution rule",
  "Data architecture direction",
];

const repoExpectationMap = [
  ["README.md", [
    "closed intelligence",
    "public surface sells the outcome",
    "private system holds the engine",
    "docs/closed-intelligence-operating-standard.md",
  ]],
  ["SECURITY.md", [
    "closed intelligence",
    "no direct database exposure",
    "signed report",
    "least-privilege",
  ]],
  ["docs/release-checklist.md", [
    "closed intelligence",
    "public/private boundary",
    "direct database exposure",
    "AI-agent evidence",
  ]],
  [".github/pull_request_template.md", [
    "Closed intelligence check",
    "private scoring",
    "direct database exposure",
    "AI-agent evidence",
    "client reports",
  ]],
  ["CHANGELOG.md", [
    "Closed intelligence operating standard",
    "closed-by-default database",
    "public/private boundary",
  ]],
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing closed-intelligence required file: ${file}`);
}

expect("docs/closed-intelligence-operating-standard.md", operatingStandardExpectations, "Closed intelligence operating standard is missing required rule");

for (const [file, phrases] of repoExpectationMap) {
  expect(file, phrases, `${file} is missing closed-intelligence enforcement detail`);
}

if (failures.length) {
  console.error("Closed intelligence validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Closed intelligence validation passed. Public/private boundaries, closed database posture, protected reports, evidence-gated AI agents, and private operating intelligence are enforced.");

function expect(path, phrases, label) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${label}: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
