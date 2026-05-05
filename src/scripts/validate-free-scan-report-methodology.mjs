import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const files = [
  "src/lib/free-scan-report-methodology.ts",
  "src/lib/free-scan-workflow-runtime.ts",
  "src/lib/protected-free-scan-results-rendering.ts",
  "src/app/dashboard/reports/free-scan/page.tsx",
];

for (const file of files) {
  if (!existsSync(join(root, file))) failures.push(`Missing Free Scan methodology dependency: ${file}`);
}

expect("src/lib/free-scan-report-methodology.ts", [
  "FREE_SCAN_REPORT_AXES",
  "FREE_SCAN_CONFIDENCE_MODEL",
  "FREE_SCAN_EVIDENCE_RULES",
  "FREE_SCAN_PRIORITY_MODEL",
  "FREE_SCAN_SAMPLE_FINDINGS",
  "FREE_SCAN_REPORT_QUALITY_RULES",
  "Observed",
  "Inferred",
  "Needs deeper review",
  "critical",
  "important",
  "watch",
  "visible customer-facing evidence",
  "customer-provided context",
  "Never claim 100 percent certainty from a limited first scan",
  "Never expose private payloads",
]);

expect("src/lib/free-scan-workflow-runtime.ts", [
  "evidenceRules",
  "priorityLevels",
  "sampleFindings",
  "free_scan_evidence_boundary_applied",
  "free_scan_confidence_model_applied",
  "free_scan_priority_model_applied",
  "/dashboard/reports/free-scan",
]);

expect("src/lib/protected-free-scan-results-rendering.ts", [
  "destination: \"/dashboard/reports/free-scan\"",
  "evidenceBoundaryRequired: true",
  "priorityModelRequired: true",
  "confidenceLabelRequired: true",
  "pendingReportPresentedAsFinal: false",
  "unsupportedOutcomePromise: false",
  "nextRecommendedPlanPath: \"/plans/deep-review\"",
]);

expect("src/app/dashboard/reports/free-scan/page.tsx", [
  "FREE_SCAN_EVIDENCE_RULES",
  "FREE_SCAN_PRIORITY_MODEL",
  "getFreeScanFindingSummary",
  "Report intelligence",
  "Evidence rules",
  "Confidence model",
  "Priority model",
  "Structured first findings",
  "Deep Review $497",
]);

forbidden(files, [
  "100% accurate",
  "100 percent accurate",
  "guaranteed result",
  "guaranteed revenue",
  "guaranteed roi",
  "final verdict",
  "password",
  "private key",
  "card number",
  "session token",
  "csrf token",
]);

if (failures.length) {
  console.error("Free Scan report methodology validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Free Scan report methodology validation passed. Evidence rules, confidence posture, priority model, protected rendering, result page, and Deep Review education path are synchronized.");

function expect(file, phrases) {
  if (!existsSync(join(root, file))) return;
  const text = read(file);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${file} missing phrase: ${phrase}`);
  }
}

function forbidden(paths, phrases) {
  for (const file of paths) {
    if (!existsSync(join(root, file))) continue;
    const text = read(file).toLowerCase();
    for (const phrase of phrases) {
      if (text.includes(phrase.toLowerCase())) failures.push(`${file} contains forbidden phrase: ${phrase}`);
    }
  }
}

function read(file) {
  return readFileSync(join(root, file), "utf8");
}
