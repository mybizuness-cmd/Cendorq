import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const mappingPath = "src/lib/live-scan-presence-report-mapping.ts";
const failures = [];

expect(mappingPath, [
  "mapLiveScanSnapshotToPresenceReport",
  "normalizePresenceReportNextMove",
  "buildPresenceReportPackage(input)",
  "PresenceReportGenerationInput",
  "FreeCheckReportSnapshot",
  "GeneratedPresenceReportPackage",
  "weakestReadoutSummary",
  "averageScore",
]);

if (failures.length) {
  console.error("Live Scan Presence Report mapping validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Live Scan Presence Report mapping validation passed.");

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

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
