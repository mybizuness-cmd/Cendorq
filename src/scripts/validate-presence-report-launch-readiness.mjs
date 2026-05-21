import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standardPath = "src/lib/presence-report-launch-readiness.ts";
const failures = [];

expect(standardPath, [
  "PresenceReportLaunchCheck",
  "PRESENCE_REPORT_LAUNCH_READINESS",
  "Public promise boundary",
  "Free Scan boundary",
  "Presence Report object",
  "Business Truth Profile",
  "Choice Gap",
  "Control Snapshot",
  "Vertical standards",
  "No rankings, revenue, leads, or AI placement guarantees.",
]);

if (failures.length) {
  console.error("Presence Report launch readiness validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report launch readiness validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}
