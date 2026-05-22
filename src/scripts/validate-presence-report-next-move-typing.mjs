import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/presence-report-contract.ts";
const failures = [];

expect(contractPath, [
  "PresenceReportNextMove",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "nextMove: PresenceReportNextMove",
]);

if (failures.length) {
  console.error("Presence Report next move typing validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report next move typing validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
