import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const previewPath = "src/components/presence-report/presence-report-preview.tsx";
const failures = [];

expect(previewPath, [
  "PresenceReportPreview",
  "SAMPLE_CHOICE_GAP",
  "SAMPLE_PRESENCE_REPORT",
  "Choice Gap",
  "Repair queue",
  "Recommended next move",
  "Presence Score",
]);

if (failures.length) {
  console.error("Presence Report preview system validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report preview system validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
