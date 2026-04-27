import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const standards = [
  ["docs/closed-intelligence-operating-standard.md", "Cendorq Closed Intelligence Operating Standard", ["The public surface sells the outcome.", "The private system holds the engine.", "The database must be closed by default.", "no public report index", "Every AI-agent workflow must be evidence-gated."]],
  ["docs/data-quality-governance-standard.md", "Cendorq Data Quality Governance Standard", ["Cendorq must compound from trustworthy data, not just more data.", "source-aware", "confidence-scored", "freshness-aware", "Exploration zone", "Authority zone"]],
  ["docs/learning-memory-standard.md", "Cendorq Learning Memory Standard", ["Learn broadly.", "Promote carefully.", "Compound only from trusted memory.", "Raw memory", "Authority memory", "Rejected memory"]],
  ["docs/pure-signal-authority-standard.md", "Cendorq Pure Signal Authority Standard", ["A pure signal is not a perfect signal.", "Pure signals earn authority.", "Pure signal score", "authority-grade", "Promotion from exploration to operational to authority memory should be explicit and reversible."]],
  ["docs/adaptive-signal-evolution-standard.md", "Cendorq Adaptive Signal Evolution Standard", ["The definition of a pure signal is versioned, testable, and allowed to evolve.", "Drift detection", "Controlled evolution workflow", "Promote reversibly."]],
  ["docs/resilience-continuity-standard.md", "Cendorq Resilience and Continuity Standard", ["degrade safely", "recover quickly", "Backups must protect private data", "When AI outputs conflict with evidence, evidence wins."]],
  ["docs/maximum-protection-standard.md", "Cendorq Maximum Protection Standard", ["highest-protection operating posture", "Data classification", "Default posture: deny by default.", "Exfiltration prevention", "Emergency controls"]],
  ["docs/foundation-hardening-standard.md", "Cendorq Foundation Hardening Standard", ["The foundation must be harder to break than the features built on top of it.", "Non-negotiable foundation constraints", "Validation hardening", "Harden first. Build second. Elevate always."]],
  ["docs/foundation-elevation-standard.md", "Cendorq Foundation Elevation Standard", ["The foundation should not only resist failure. It should compound quality.", "Elevation dimensions", "The foundation should get stronger every time it is touched."]],
  ["docs/system-synchronization-qa-standard.md", "Cendorq System Synchronization QA Standard", ["If one part of the system changes, every affected operating layer must be checked and synchronized.", "Required sync rule", "Clean replacement rule", "Recurring sync checks"]],
  ["docs/internal-command-center-standard.md", "Cendorq Internal Command Center Standard", ["private Cendorq control panel", "The internal panel should make Cendorq easier to operate without exposing the private engine.", "Free Scan automation", "Deep Review automation", "Ongoing Control system", "Automation command deck", "Data quality and learning board"]],
  ["docs/score-threshold-operating-standard.md", "Cendorq Score Threshold Operating Standard", ["Use score bands internally to guide action. Use plain meaning publicly to guide the customer.", "65 to 69: watch-grade", "70 to 79: operational-grade", "80 to 89: strong operational-grade", "90 to 100: authority-grade candidate", "No clutter rule"]],
];

const requiredFiles = [
  ...standards.map(([path]) => path),
  "README.md",
  "SECURITY.md",
  "docs/release-checklist.md",
  ".github/pull_request_template.md",
  "CHANGELOG.md",
  "src/app/command-center/page.tsx",
];

const repoExpectations = [
  ["README.md", ["docs/closed-intelligence-operating-standard.md", "docs/maximum-protection-standard.md", "docs/foundation-hardening-standard.md", "docs/foundation-elevation-standard.md", "docs/system-synchronization-qa-standard.md"]],
  ["SECURITY.md", ["closed intelligence", "no direct database exposure", "least-privilege", "maximum protection"]],
  ["docs/release-checklist.md", ["closed intelligence", "data quality", "learning memory", "pure signal", "resilience", "maximum protection"]],
  [".github/pull_request_template.md", ["Closed intelligence check", "Data quality and learning check", "Maximum protection check"]],
  ["CHANGELOG.md", ["Closed intelligence operating standard", "Data quality governance standard", "Learning memory standard", "Pure signal authority standard", "Adaptive signal evolution standard", "Resilience and continuity standard", "Maximum protection standard"]],
  ["src/app/command-center/page.tsx", ["Private Command Center", "Closed by default.", "robots", "index: false", "follow: false", "COMMAND_CENTER_PREVIEW_KEY", "No customer records", "private intelligence", "access controls are configured"]],
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing required operating file: ${file}`);
}

for (const [path, title, phrases] of standards) {
  expect(path, [title, ...phrases], `${path} is missing required standard detail`);
}

for (const [path, phrases] of repoExpectations) {
  expect(path, phrases, `${path} is missing synchronized operating detail`);
}

const commandCenterRoute = existsSync(join(root, "src/app/command-center/page.tsx")) ? read("src/app/command-center/page.tsx") : "";
for (const forbidden of ["export const revalidate = 60", "\n    index: true", "\n    follow: true", "\n      index: true", "\n      follow: true", "fetch(\"/api/free-check\"", "localStorage", "sessionStorage"]) {
  if (commandCenterRoute.includes(forbidden)) failures.push(`Command Center route contains forbidden public/client data behavior: ${forbidden.trim()}`);
}

if (failures.length) {
  console.error("Operating standards validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Operating standards validation passed. Closed intelligence, data quality, learning memory, pure signals, adaptive evolution, resilience, maximum protection, foundation hardening, foundation elevation, synchronization QA, internal command center, score thresholds, private route closure, and private operating intelligence are enforced.");

function expect(path, phrases, label) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${label}: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
