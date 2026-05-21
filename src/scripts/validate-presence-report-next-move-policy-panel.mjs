import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/components/presence-report/presence-report-next-move-policy-panel.tsx";
const indexPath = "src/components/presence-report/index.ts";
const failures = [];

expect(panelPath, [
  "PresenceReportNextMovePolicyPanel",
  "PRESENCE_REPORT_NEXT_MOVE_POLICIES",
  "Next move policy",
  "Do not sell the wrong layer too early.",
  "nextMove",
  "when",
  "boundary",
]);

expect(indexPath, ["PresenceReportNextMovePolicyPanel"]);

if (failures.length) {
  console.error("Presence Report next move policy panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report next move policy panel validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
