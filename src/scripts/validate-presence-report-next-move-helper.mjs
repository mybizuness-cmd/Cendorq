import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const filePath = "src/lib/presence-report-next-move.ts";
const failures = [];

expect(filePath, [
  "PRESENCE_REPORT_NEXT_MOVE_SEQUENCE",
  "normalizePresenceReportNextMove",
  "PresenceReportNextMove",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
]);

if (failures.length) {
  console.error("Presence Report next move helper validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report next move helper validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
