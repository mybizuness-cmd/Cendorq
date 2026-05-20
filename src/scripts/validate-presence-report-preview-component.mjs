import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const componentPath = "src/components/presence-report/presence-report-preview.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-presence-report-preview-component.mjs";

expect(componentPath, [
  "PresenceReportPreview",
  "Sample Presence Report",
  "Visible, but not easy to choose.",
  "Presence Score",
  "Findability",
  "Understanding",
  "Trust",
  "Choice",
  "Action",
  "Repair queue",
  "Recommended next move",
  "Deep Review or Build Fix",
]);

expect(routesChainPath, [validatorPath]);

boundedLength(componentPath, 11000);

if (failures.length) {
  console.error("Presence Report preview component validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report preview component validation passed with compact report preview, pillar scores, repair queue, and safe next-move framing.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for compact preview standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
