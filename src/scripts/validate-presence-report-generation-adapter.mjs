import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const adapterPath = "src/lib/presence-report-generation-adapter.ts";
const failures = [];

expect(adapterPath, [
  "PresenceReportGenerationInput",
  "GeneratedPresenceReportPackage",
  "buildPresenceReportPackage",
  "SAMPLE_PRESENCE_REPORT",
  "SAMPLE_BUSINESS_TRUTH_PROFILE",
  "SAMPLE_CHOICE_GAP",
  "SAMPLE_CONTROL_SNAPSHOT",
  "businessTruthProfile",
  "choiceGap",
  "controlSnapshot",
]);

forbidden(adapterPath, [
  "guaranteed ranking",
  "guaranteed revenue",
  "guaranteed AI placement",
  "rawEvidence",
  "private scoring",
]);

if (failures.length) {
  console.error("Presence Report generation adapter validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Presence Report generation adapter validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
