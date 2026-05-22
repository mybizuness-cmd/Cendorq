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
  "Shared demo report package",
  "Package-source helper",
  "Vertical standards",
  "No rankings, revenue, leads, or AI placement guarantees.",
  "Sandwork demo surfaces use the shared public-safe report package instead of hardcoded sample objects.",
  "Reviewers and future report surfaces need one reusable demo source that follows the live scan mapper.",
  "Report surfaces use the package-source helper for object-index-backed demo package access instead of direct fixture imports.",
  "Future report surfaces should reuse the same package access path before live customer snapshots replace the demo source.",
]);

if (failures.length) {
  console.error("Presence Report launch readiness validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report launch readiness validation passed with public promise, Free Scan, object, truth, choice, control, shared demo package, package-source helper, and vertical standards.");

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