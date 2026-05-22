import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const gatePath = "src/lib/presence-report-release-gate.ts";
const failures = [];

expect(gatePath, [
  "PresenceReportReleaseGateStatus",
  "PresenceReportReleaseGateCheck",
  "PresenceReportReleaseGateResult",
  "evaluatePresenceReportReleaseGate",
  "SAMPLE_PRESENCE_REPORT_RELEASE_CHECKS",
  "Approved business facts",
  "Restricted claims",
  "Evidence boundary",
  "Next move clarity",
]);

if (failures.length) {
  console.error("Presence Report release gate validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report release gate validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
