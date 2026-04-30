import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const manualPath = "docs/owner-operating-manual.md";
const docsIndexPath = "docs/command-center-docs-index.md";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(manualPath, [
  "# Cendorq Owner Operating Manual",
  "Cendorq should win by being more accurate, more useful, more trusted, more tailored, and more operationally disciplined than generic competitors from the first interaction.",
  "The standard is not to promise impossible certainty.",
  "proof before output",
  "evidence before recommendation",
  "confidence before certainty",
  "contradictions surfaced instead of hidden",
  "customer context separated from verified facts",
  "assumptions separated from inferences",
  "plan advice tied to actual stage, blockers, evidence, and readiness",
]);

expect(manualPath, [
  "## Report accuracy operating model",
  "Customer-provided context",
  "Safe external evidence",
  "Cendorq internal evidence",
  "Derived analysis",
  "Confidence and limits",
  "verified facts",
  "customer-provided context",
  "external evidence",
  "assumptions",
  "inferences",
  "conflicts or contradictions",
  "limitations",
  "confidence",
  "recommendations",
  "next actions",
]);

expect(manualPath, [
  "## Strongest practical report workflow",
  "Intake capture",
  "Evidence gathering",
  "Evidence conflict pass",
  "Report truth pass",
  "Plan-fit pass",
  "Conversion pass",
  "Release-captain pass",
  "No report should blur a customer claim into a verified fact.",
]);

expect(manualPath, [
  "## Tailored plan operating model",
  "### Free Scan",
  "### Deep Review",
  "### Build Fix",
  "### Ongoing Control",
  "Plans must not be generic packages.",
  "They must behave like stage-specific operating paths.",
]);

expect(manualPath, [
  "## Market-learning loop",
  "what friction patterns are recurring",
  "what proof signals are becoming more important",
  "which report modules create the most useful customer action",
  "learning must be privacy-safe",
  "patterns must be reviewed, versioned, and tested before changing customer-facing behavior",
]);

expect(manualPath, [
  "## Conversion moat",
  "diagnose before selling",
  "show the real blocker",
  "show why the blocker matters",
  "show what can be done next",
  "show which plan fits that stage",
  "Conversion copy should be direct, premium, calm, and confident.",
]);

expect(manualPath, [
  "## Owner command and release captain model",
  "Owner command is highest authority.",
  "Release captain is execution command and final validator.",
  "approve merges",
  "approve launches",
  "approve reports",
  "approve provider configuration",
  "approve payment mapping",
  "approve security readiness",
  "Every finding returns to release-captain review.",
]);

expect(manualPath, [
  "## Owner responsibilities after build",
  "Auth provider configuration is real and production-ready.",
  "Payment mapping is real and owner-approved.",
  "Protected runtime configuration is ready without browser exposure.",
  "Production smoke target is configured.",
  "Rollback plan exists.",
  "Audit plan exists.",
  "No launch blocker is active.",
]);

expect(manualPath, [
  "## What remains to take Cendorq higher",
  "Durable owner evidence persistence",
  "External evidence fetch pipeline with safe source tracking",
  "Evidence conflict engine",
  "Report confidence scoring runtime",
  "Market/category pattern registry",
  "Customer-facing report rendering and PDF parity",
  "Production auth integration",
  "Provider payment mapping and webhook entitlement verification",
]);

expect(manualPath, [
  "## Highest-level operating cadence",
  "Daily during build",
  "Weekly after launch",
  "Monthly after launch",
  "## Final operating principle",
  "Cendorq should not win by promising the impossible.",
  "It should win by being more disciplined, more evidence-backed, more tailored, more useful, more honest, and more operationally complete than competitors.",
]);

expect(docsIndexPath, [
  "docs/owner-operating-manual.md",
  "src/scripts/validate-owner-operating-manual.mjs",
  "owner-level operating manual for evidence-backed reports, tailored plan fit, conversion moat, market learning, launch review, and post-build operating cadence",
]);

expect(routesChainPath, [
  "src/scripts/validate-owner-operating-manual.mjs",
]);

forbidden(manualPath, [
  "guaranteed accuracy",
  "guaranteed revenue",
  "guaranteed ROI",
  "guaranteed rankings",
  "guaranteed security",
  "impossible-to-hack status",
  "liability-free status",
  "guaranteed fix",
  "promise impossible certainty",
  "customer-specific truth must be generalized as universal truth",
  "agents may approve launches",
  "agents may approve reports",
  "agents may approve customer-facing claims",
  "raw provider payloads may be exposed",
  "raw customer data may be exposed",
  "private audit payloads may be exposed",
]);

if (failures.length) {
  console.error("Owner operating manual validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner operating manual validation passed. The manual protects evidence-backed accuracy, tailored plan fit, conversion moat, market learning, owner responsibilities, release-captain review, and post-build operating cadence without unsafe guarantees.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;

  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
