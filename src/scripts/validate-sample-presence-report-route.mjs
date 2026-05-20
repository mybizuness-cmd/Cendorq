import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const routePath = "src/app/sample-report/page.tsx";
const componentPath = "src/components/presence-report/sample-presence-report.tsx";
const contractPath = "src/lib/presence-report-contract.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-sample-presence-report-route.mjs";

expect(routePath, [
  "Sample Presence Report | Cendorq",
  "SamplePresenceReport",
  "The Presence Report is the core Cendorq object",
  "This is an example, not a promise.",
]);

expect(componentPath, [
  "SAMPLE_PRESENCE_REPORT",
  "@/lib/presence-report-contract",
  "SamplePresenceReport",
  "report.title",
  "report.summary",
  "report.score",
  "report.pillars.map",
  "report.repairQueue.map",
]);

expect(contractPath, [
  "PresenceReportPublicShape",
  "SAMPLE_PRESENCE_REPORT",
  "Findability",
  "Understanding",
  "Trust",
  "Choice",
  "Action",
  "Visible, but not easy to choose.",
]);

expect(routesChainPath, [validatorPath]);

boundedLength(routePath, 8500);
boundedLength(componentPath, 15500);
boundedLength(contractPath, 8500);

if (failures.length) {
  console.error("Sample Presence Report route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Sample Presence Report route validation passed with shared public report contract and reusable component.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for sample report standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
