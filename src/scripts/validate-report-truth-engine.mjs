import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const policyPath = "src/lib/command-center/report-truth-engine.ts";
const packagePath = "package.json";

validateTextFile(policyPath, [
  "REPORT_TRUTH_RULES",
  "BUSINESS_ENRICHMENT_RULES",
  "REPORT_METRIC_RULES",
  "REPORT_CONVERSION_RULES",
  "getReportTruthEnginePolicy",
  "Treat form fields as useful clues, not final proof.",
  "business name plus website or address",
  "calculation inputs, formula label, evidence references, confidence level, and rounding policy",
  "must never claim 100% certainty, perfect accuracy, or guaranteed outcomes",
  "identity-resolution",
  "presence-discovery",
  "competitive-context",
  "visibility-score",
  "trust-score",
  "conversion-friction-score",
  "priority-severity-index",
  "progress-delta",
  "free-scan",
  "full-diagnosis",
  "optimization",
  "monthly-control",
  "Full Diagnosis is required to verify causes",
  "Optimization is the logical next step",
  "Monthly Control protects, measures, and iterates",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-report-truth-engine.mjs",
]);

validateForbidden(policyPath, [
  "100% accurate",
  "100% certainty: true",
  "perfect accuracy: true",
  "unverified fact",
  "ignore missing evidence",
]);

if (failures.length) {
  console.error("Report truth engine validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report truth engine validation passed. Report generation standards require independent evidence, minimum-input enrichment, traceable calculations, confidence labels, uncertainty handling, and plan-upgrade logic without perfect-accuracy or guaranteed-result claims.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required report truth dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required report truth phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden report truth phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
