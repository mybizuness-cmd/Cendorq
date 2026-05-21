import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const routePath = "src/app/sample-report/page.tsx";
const componentPath = "src/components/presence-report/sample-presence-report.tsx";
const indexPath = "src/components/presence-report/index.ts";
const contractPath = "src/lib/presence-report-contract.ts";
const truthProfilePath = "src/lib/business-truth-profile-contract.ts";
const choiceGapPath = "src/lib/choice-gap-contract.ts";
const controlSnapshotPath = "src/lib/control-snapshot-contract.ts";
const verticalSamplesPath = "src/lib/vertical-sample-presence-reports.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-sample-presence-report-route.mjs";

expect(routePath, [
  "Sample Presence Report | Cendorq",
  "@/components/presence-report",
  "SamplePresenceReport",
  "VERTICAL_SAMPLE_PRESENCE_REPORTS",
  "Vertical sample reports",
  "Different businesses need different trust proof.",
  "sample.priorityRepairs",
  "The Presence Report is the core Cendorq object",
  "This is an example, not a promise.",
]);

expect(indexPath, ["SamplePresenceReport", "PresenceReportPreview"]);

expect(componentPath, [
  "SAMPLE_PRESENCE_REPORT",
  "SAMPLE_BUSINESS_TRUTH_PROFILE",
  "SAMPLE_CHOICE_GAP",
  "SAMPLE_CONTROL_SNAPSHOT",
  "Business Truth Profile",
  "Choice Gap",
  "Repair Queue",
  "Control Snapshot",
  "@/lib/presence-report-contract",
  "@/lib/business-truth-profile-contract",
  "@/lib/choice-gap-contract",
  "@/lib/control-snapshot-contract",
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

expect(truthProfilePath, [
  "BusinessTruthProfilePublicShape",
  "SAMPLE_BUSINESS_TRUTH_PROFILE",
  "approvedClaims",
  "restrictedClaims",
]);

expect(choiceGapPath, [
  "ChoiceGapPublicShape",
  "SAMPLE_CHOICE_GAP",
  "repairDirection",
]);

expect(controlSnapshotPath, [
  "ControlSnapshotPublicShape",
  "SAMPLE_CONTROL_SNAPSHOT",
  "Proof freshness",
  "Competitor clarity",
]);

expect(verticalSamplesPath, [
  "VerticalSamplePresenceReport",
  "VERTICAL_SAMPLE_PRESENCE_REPORTS",
  "dentist",
  "med-spa",
  "law-firm",
  "contractor",
  "trustStandard",
  "priorityRepairs",
  "Do not use outcome promises.",
]);

expect(routesChainPath, [validatorPath]);

boundedLength(routePath, 16000);
boundedLength(componentPath, 24000);
boundedLength(indexPath, 500);
boundedLength(contractPath, 8500);
boundedLength(truthProfilePath, 7000);
boundedLength(choiceGapPath, 5000);
boundedLength(controlSnapshotPath, 5000);
boundedLength(verticalSamplesPath, 18000);

if (failures.length) {
  console.error("Sample Presence Report route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Sample Presence Report route validation passed with shared public report contract, Business Truth Profile, Choice Gap, Repair Queue, Control Snapshot, and vertical sample report standards.");

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
