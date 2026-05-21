import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const filePath = "src/lib/presence-report-next-move-policy.ts";
const failures = [];

expect(filePath, [
  "PresenceReportNextMovePolicy",
  "PRESENCE_REPORT_NEXT_MOVE_POLICIES",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "Do not force a paid step before a useful preview exists.",
  "Diagnose before prescribing implementation.",
  "Fix one high-impact public signal before expanding scope.",
  "Monitor changes without promising outcomes.",
]);

if (failures.length) {
  console.error("Presence Report next move policy validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report next move policy validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
