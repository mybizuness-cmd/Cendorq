import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const indexPath = "src/lib/presence-report-object-index.ts";
const failures = [];

expect(indexPath, [
  "PRESENCE_REPORT_OBJECT_INDEX",
  "AI Search Presence Repair",
  "Business Truth Profile",
  "Presence Report",
  "Repair Queue",
  "Build Fix",
  "Control Snapshot",
  "PRESENCE_REPORT_PUBLIC_ROUTES",
  "PRESENCE_REPORT_PROTECTED_ROUTES",
  "PRESENCE_REPORT_LAUNCH_READINESS",
]);

if (failures.length) {
  console.error("Presence Report object index validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report object index validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
