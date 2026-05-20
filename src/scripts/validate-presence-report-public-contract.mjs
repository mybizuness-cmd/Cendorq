import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/presence-report-contract.ts";

expect(contractPath, [
  "PresenceReportPillarKey",
  "PresenceReportPillar",
  "PresenceReportRepairItem",
  "PresenceReportPublicShape",
  "PRESENCE_REPORT_PUBLIC_PILLARS",
  "PRESENCE_REPORT_PUBLIC_REPAIR_QUEUE",
  "SAMPLE_PRESENCE_REPORT",
  "findability",
  "understanding",
  "trust",
  "choice",
  "action",
  "Findability",
  "Understanding",
  "Trust",
  "Choice",
  "Action",
  "Visible, but not easy to choose.",
  "Deep Review",
]);

boundedLength(contractPath, 8500);

if (failures.length) {
  console.error("Presence Report public contract validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report public contract validation passed with reusable pillars, repair queue, sample report shape, and five public report dimensions.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for public report contract standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
