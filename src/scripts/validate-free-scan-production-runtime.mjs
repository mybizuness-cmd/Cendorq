import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const files = [
  "src/app/api/free-check/route.ts",
  "src/lib/reports/free-check-report.ts",
  "src/lib/free-scan-report-methodology.ts",
];

for (const file of files) {
  if (!existsSync(join(root, file))) failures.push(`Missing Free Scan production runtime dependency: ${file}`);
}

expect("src/app/api/free-check/route.ts", [
  "FREE_SCAN_RESULTS_DESTINATION",
  "requestedDestination: FREE_SCAN_RESULTS_DESTINATION",
  "resultDestination: FREE_SCAN_RESULTS_DESTINATION",
  "buildFreeCheckReportSnapshot",
  "deriveFreeCheckIntelligence",
  "scoreFreeCheck",
  "deriveSignals",
  "Check your inbox for Cendorq Support <support@cendorq.com> to confirm and open your Free Scan results.",
]);

expect("src/lib/reports/free-check-report.ts", [
  "destination: \"/dashboard/reports/free-scan\"",
  "scope: \"Free Scan\"",
  "FREE_SCAN_EVIDENCE_RULES",
  "FREE_SCAN_CONFIDENCE_MODEL",
  "FREE_SCAN_PRIORITY_MODEL",
  "FREE_SCAN_REPORT_QUALITY_RULES",
  "structuredFindings",
  "limitations",
  "confidenceMeaning",
  "first-read signal, not a final diagnosis",
]);

expect("src/lib/free-scan-report-methodology.ts", [
  "FREE_SCAN_REPORT_AXES",
  "FREE_SCAN_EVIDENCE_RULES",
  "FREE_SCAN_PRIORITY_MODEL",
  "FREE_SCAN_SAMPLE_FINDINGS",
]);

forbidden(files, [
  "requestedDestination: \"/dashboard/reports\"",
  "100% accurate",
  "100 percent accurate",
  "guaranteed result",
  "guaranteed revenue",
  "guaranteed ROI",
  "final diagnosis from private or unavailable evidence.\"; // unsafe",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Free Scan production runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Free Scan production runtime validation passed. Intake POST, confirmation destination, report snapshot, methodology, confidence boundaries, and limitations stay synchronized.");

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
