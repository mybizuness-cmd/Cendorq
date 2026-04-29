import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/controlled-continuous-evolution-contracts.ts";
const pristineValidatorPath = "src/scripts/validate-most-pristine-system-standard.mjs";
const packagePath = "package.json";

expect(contractPath, [
  "CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT",
  "controlled-continuous-evolution-v1",
  "Keep Cendorq improving after launch through monitored, validated, reviewable, reversible updates without uncontrolled production mutation or quality drift.",
  "Automated systems may detect, propose, test, and prepare updates.",
  "dependency-health",
  "security-scanning",
  "accessibility-and-ux-regression",
  "performance-and-core-web-vitals",
  "conversion-copy-quality",
  "legal-liability-language",
  "report-truthfulness-and-citation-quality",
  "daily dependency and vulnerability detection",
  "weekly interface quality and accessibility review",
  "monthly legal/liability language review",
  "quarterly platform architecture and scalability review",
  "open dependency update pull requests",
  "open security remediation pull requests",
  "run validation scripts",
  "run smoke checks against preview deployments",
  "auto-merge production-impacting code without green gates",
  "disable validation to make updates pass",
  "pull request with reviewable diff",
  "Vercel preview or deployment check passes",
  "rollback path identified",
  "small coherent batches",
  "preview before production",
  "rollback-ready before promotion",
  "dependency advisories",
  "code scanning alerts",
  "accessibility regressions",
  "performance regressions",
  "support request spikes",
  "CONTROLLED_CONTINUOUS_EVOLUTION_RUNBOOK",
  "CONTROLLED_CONTINUOUS_EVOLUTION_HARD_LOCKS",
  "CONTROLLED_CONTINUOUS_EVOLUTION_BLOCKED_PATTERNS",
  "automatic update systems can propose changes but cannot bypass validation",
  "all scheduled updates must remain coherent, bounded, and traceable",
]);

expect(pristineValidatorPath, [
  "validate-most-pristine-system-standard.mjs",
]);

expect(packagePath, [
  "validate:routes",
]);

forbidden(contractPath, [
  "autoMergeWithoutValidation allowed",
  "skipVercelGate allowed",
  "disableValidatorForUpdate allowed",
  "unreviewedProductionMutation allowed",
  "weakenGuardrailsForConvenience allowed",
  "storeRawPayloadForDebugging allowed",
  "deleteAuditRecordsToCleanUp allowed",
]);

if (failures.length) {
  console.error("Controlled continuous evolution validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Controlled continuous evolution validation passed.");

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
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
