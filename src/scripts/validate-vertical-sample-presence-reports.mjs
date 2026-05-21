import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/vertical-sample-presence-reports.ts";
const failures = [];

expect(contractPath, [
  "VerticalSamplePresenceReport",
  "VERTICAL_SAMPLE_PRESENCE_REPORTS",
  "dentist",
  "med-spa",
  "law-firm",
  "contractor",
  "trustStandard",
  "truthProfile",
  "choiceGap",
  "priorityRepairs",
  "Do not use outcome promises.",
  "Use license, insurance, and guarantee language only when verified.",
]);

if (failures.length) {
  console.error("Vertical sample Presence Reports validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Vertical sample Presence Reports validation passed.");

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
