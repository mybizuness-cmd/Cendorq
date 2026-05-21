import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const boundaryPath = "src/lib/presence-report-evidence-boundary.ts";
const failures = [];

expect(boundaryPath, [
  "PresenceReportEvidenceConfidence",
  "PresenceReportEvidenceBoundary",
  "SAMPLE_PRESENCE_REPORT_EVIDENCE_BOUNDARIES",
  "Homepage clarity",
  "Trust proof visibility",
  "Competitor contrast",
  "publicSafeUse",
  "boundary",
]);

if (failures.length) {
  console.error("Presence Report evidence boundary validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report evidence boundary validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
