import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "docs/closed-intelligence-operating-standard.md",
  "docs/data-quality-governance-standard.md",
  "docs/learning-memory-standard.md",
  "docs/pure-signal-authority-standard.md",
  "docs/adaptive-signal-evolution-standard.md",
  "docs/resilience-continuity-standard.md",
  "docs/maximum-protection-standard.md",
  "README.md",
  "SECURITY.md",
  "docs/release-checklist.md",
  ".github/pull_request_template.md",
  "CHANGELOG.md",
];

const operatingStandardExpectations = [
  "Cendorq Closed Intelligence Operating Standard",
  "The public surface sells the outcome.",
  "The private system holds the engine.",
  "The database must be closed by default.",
  "no public database browser",
  "no direct client-side database credentials",
  "no anonymous read access to private business records",
  "no public report index",
  "no public client evidence index",
  "least-privilege service roles",
  "signed report access where reports are exposed",
  "AI agents are a private workforce",
  "Every AI-agent workflow must be evidence-gated.",
  "Reports are protected business intelligence.",
  "Cendorq must become evidence-backed, not just AI-written.",
  "Three-pass independent review norm",
  "Five-pass elevation norm",
];

const dataQualityExpectations = [
  "Cendorq Data Quality Governance Standard",
  "Cendorq must compound from trustworthy data, not just more data.",
  "source-aware",
  "confidence-scored",
  "freshness-aware",
  "evidence-linked when possible",
  "marked when self-reported",
  "marked when externally observed",
  "marked when AI-generated",
  "marked when human-reviewed",
  "Signal confidence levels",
  "Freshness rules",
  "Source quality rules",
  "Outside data ingestion rule",
  "AI-answer data rule",
  "Data contamination risks",
  "Anti-contamination controls",
  "Exploration zone",
  "Authority zone",
  "Let weak signals inform exploration, not authority.",
  "Let strong, source-backed, outcome-linked signals compound the moat.",
];

const learningMemoryExpectations = [
  "Cendorq Learning Memory Standard",
  "Learn broadly.",
  "Promote carefully.",
  "Compound only from trusted memory.",
  "Raw memory",
  "Exploration memory",
  "Operational memory",
  "Authority memory",
  "Rejected memory",
  "Promotion ladder",
  "Purity gates",
  "Fast learning without contamination",
  "Outcome-linked learning",
  "Data decay",
  "Conflict handling",
  "Manipulation defense",
  "No-downtime learning principle",
  "Learning must not create a new attack surface.",
];

const pureSignalExpectations = [
  "Cendorq Pure Signal Authority Standard",
  "A pure signal is not a perfect signal.",
  "Pure signals earn authority.",
  "source quality",
  "evidence strength",
  "freshness",
  "independence",
  "consistency",
  "context completeness",
  "manipulation risk",
  "privacy class",
  "outcome linkage",
  "authority eligibility",
  "Pure signal score",
  "authority-grade",
  "operational-grade",
  "exploration-grade",
  "reject or quarantine",
  "Promotion from exploration to operational to authority memory should be explicit and reversible.",
];

const adaptiveSignalExpectations = [
  "Cendorq Adaptive Signal Evolution Standard",
  "The definition of a pure signal is versioned, testable, and allowed to evolve.",
  "Current standard",
  "Candidate standard",
  "Experimental standard",
  "Deprecated standard",
  "Versioning rule",
  "Anticipation rule",
  "Healthy prediction range",
  "Drift detection",
  "Controlled evolution workflow",
  "Promotion guardrails",
  "Demotion rule",
  "Self-evolving does not mean uncontrolled self-modifying production behavior.",
  "Safe experimentation",
  "Replay and backtesting",
  "Foresight watchlists",
  "No-downtime evolution",
  "Sense early.",
  "Experiment privately.",
  "Validate carefully.",
  "Promote reversibly.",
];

const resilienceExpectations = [
  "Cendorq Resilience and Continuity Standard",
  "Cendorq must degrade safely, recover quickly, preserve private intelligence, and keep the buyer path protected.",
  "product resilience",
  "data resilience",
  "security resilience",
  "AI-agent resilience",
  "report resilience",
  "infrastructure resilience",
  "vendor resilience",
  "market resilience",
  "legal/privacy resilience",
  "operational continuity",
  "long-horizon memory resilience",
  "Safe degradation examples",
  "Backups must protect private data",
  "When AI outputs conflict with evidence, evidence wins.",
  "Production systems should be designed for safe change.",
  "Build so it can",
  "learn without poisoning itself",
  "evolve without losing control",
  "fail without leaking data",
  "recover without losing trust",
];

const maximumProtectionExpectations = [
  "Cendorq Maximum Protection Standard",
  "highest-protection operating posture",
  "Protect the engine.",
  "Protect the data.",
  "Protect the memory.",
  "Protect the reports.",
  "Protect the learning loop.",
  "Data classification",
  "Public",
  "Internal",
  "Confidential",
  "Restricted",
  "Default posture: deny by default.",
  "Secret management",
  "Exfiltration prevention",
  "Threat model",
  "Prompt-injection and AI-agent containment",
  "Report protection",
  "Evidence protection",
  "Supply-chain and dependency protection",
  "Database protection",
  "Auditability",
  "Emergency controls",
  "Partner and embed protection",
  "Public doctrine boundary",
  "Maximum-protection review triggers",
];

const repoExpectationMap = [
  ["README.md", [
    "closed intelligence",
    "private system holds the engine",
    "docs/closed-intelligence-operating-standard.md",
    "docs/data-quality-governance-standard.md",
    "docs/learning-memory-standard.md",
    "docs/pure-signal-authority-standard.md",
    "docs/adaptive-signal-evolution-standard.md",
    "docs/resilience-continuity-standard.md",
    "docs/maximum-protection-standard.md",
  ]],
  ["SECURITY.md", [
    "closed intelligence",
    "no direct database exposure",
    "signed report",
    "least-privilege",
    "data quality",
    "pure signal",
    "maximum protection",
  ]],
  ["docs/release-checklist.md", [
    "closed intelligence",
    "public/private boundary",
    "direct database exposure",
    "AI-agent evidence",
    "data quality",
    "learning memory",
    "pure signal",
    "resilience",
    "maximum protection",
  ]],
  [".github/pull_request_template.md", [
    "Closed intelligence check",
    "private scoring",
    "direct database exposure",
    "AI-agent evidence",
    "client reports",
    "Data quality and learning check",
    "confidence",
    "freshness",
    "authority memory",
    "pure signal",
    "resilience",
    "Maximum protection check",
  ]],
  ["CHANGELOG.md", [
    "Closed intelligence operating standard",
    "closed-by-default database",
    "public/private boundary",
    "Data quality governance standard",
    "Learning memory standard",
    "Pure signal authority standard",
    "Adaptive signal evolution standard",
    "Resilience and continuity standard",
    "Maximum protection standard",
  ]],
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing intelligence standard required file: ${file}`);
}

expect("docs/closed-intelligence-operating-standard.md", operatingStandardExpectations, "Closed intelligence operating standard is missing required rule");
expect("docs/data-quality-governance-standard.md", dataQualityExpectations, "Data quality governance standard is missing required rule");
expect("docs/learning-memory-standard.md", learningMemoryExpectations, "Learning memory standard is missing required rule");
expect("docs/pure-signal-authority-standard.md", pureSignalExpectations, "Pure signal authority standard is missing required rule");
expect("docs/adaptive-signal-evolution-standard.md", adaptiveSignalExpectations, "Adaptive signal evolution standard is missing required rule");
expect("docs/resilience-continuity-standard.md", resilienceExpectations, "Resilience and continuity standard is missing required rule");
expect("docs/maximum-protection-standard.md", maximumProtectionExpectations, "Maximum protection standard is missing required rule");

for (const [file, phrases] of repoExpectationMap) {
  expect(file, phrases, `${file} is missing intelligence enforcement detail`);
}

if (failures.length) {
  console.error("Intelligence validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Intelligence validation passed. Closed intelligence, data quality, learning memory, pure signals, adaptive evolution, resilience, maximum protection, and private operating intelligence are enforced.");

function expect(path, phrases, label) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${label}: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
