import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const routePath = "src/app/sample-report/page.tsx";
const componentPath = "src/components/presence-report/sample-presence-report.tsx";
const evidencePanelPath = "src/components/presence-report/presence-report-evidence-boundary-panel.tsx";
const nextMovePolicyPanelPath = "src/components/presence-report/presence-report-next-move-policy-panel.tsx";
const verticalComponentPath = "src/components/presence-report/vertical-sample-presence-report.tsx";
const indexPath = "src/components/presence-report/index.ts";
const contractPath = "src/lib/presence-report-contract.ts";
const truthProfilePath = "src/lib/business-truth-profile-contract.ts";
const choiceGapPath = "src/lib/choice-gap-contract.ts";
const controlSnapshotPath = "src/lib/control-snapshot-contract.ts";
const evidenceBoundaryPath = "src/lib/presence-report-evidence-boundary.ts";
const nextMovePolicyPath = "src/lib/presence-report-next-move-policy.ts";
const verticalSamplesPath = "src/lib/vertical-sample-presence-reports.ts";
const generationAdapterPath = "src/lib/presence-report-generation-adapter.ts";
const liveMappingPath = "src/lib/live-scan-presence-report-mapping.ts";
const releaseGatePath = "src/lib/presence-report-release-gate.ts";
const launchReadinessPath = "src/lib/presence-report-launch-readiness.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-sample-presence-report-route.mjs";

const verticalRoutePaths = [
  "src/app/sample-report/dentist/page.tsx",
  "src/app/sample-report/med-spa/page.tsx",
  "src/app/sample-report/law-firm/page.tsx",
  "src/app/sample-report/contractor/page.tsx",
];

expect(routePath, [
  "Sample Presence Report | Cendorq",
  "PresenceReportEvidenceBoundaryPanel",
  "PresenceReportNextMovePolicyPanel",
  "SamplePresenceReport",
  "VERTICAL_SAMPLE_PRESENCE_REPORTS",
  "Sample report evidence boundaries",
  "Sample report next move policy",
  "evidence boundaries",
  "next move policy",
  "Vertical sample reports",
  "Different businesses need different trust proof.",
  "sample.priorityRepairs",
  "The Presence Report is the core Cendorq object",
  "This is an example, not a promise.",
]);

expect(indexPath, ["SamplePresenceReport", "PresenceReportPreview", "VerticalSamplePresenceReport", "PresenceReportEvidenceBoundaryPanel", "PresenceReportNextMovePolicyPanel"]);

expect(evidencePanelPath, [
  "PresenceReportEvidenceBoundaryPanel",
  "SAMPLE_PRESENCE_REPORT_EVIDENCE_BOUNDARIES",
  "Evidence boundaries",
  "Useful signal without overclaiming.",
  "publicSafeUse",
  "boundary",
]);

expect(nextMovePolicyPanelPath, [
  "PresenceReportNextMovePolicyPanel",
  "PRESENCE_REPORT_NEXT_MOVE_POLICIES",
  "Next move policy",
  "Do not sell the wrong layer too early.",
  "nextMove",
  "boundary",
]);

expect(componentPath, [
  "SAMPLE_PRESENCE_REPORT",
  "SAMPLE_BUSINESS_TRUTH_PROFILE",
  "SAMPLE_CHOICE_GAP",
  "SAMPLE_CONTROL_SNAPSHOT",
  "SAMPLE_PRESENCE_REPORT_RELEASE_CHECKS",
  "Business Truth Profile",
  "Choice Gap",
  "Repair Queue",
  "Release Gate",
  "Control Snapshot",
  "@/lib/presence-report-contract",
  "@/lib/business-truth-profile-contract",
  "@/lib/choice-gap-contract",
  "@/lib/control-snapshot-contract",
  "@/lib/presence-report-release-gate",
  "SamplePresenceReport",
  "report.title",
  "report.summary",
  "report.score",
  "report.pillars.map",
  "report.repairQueue.map",
  "releaseChecks.map",
]);

expect(verticalComponentPath, [
  "VerticalSamplePresenceReport",
  "Business Truth Profile",
  "Choice Gap",
  "Priority repairs",
  "Run Free Scan",
  "Back to Sample Report",
]);

for (const verticalRoutePath of verticalRoutePaths) {
  expect(verticalRoutePath, [
    "VerticalSamplePresenceReport",
    "VERTICAL_SAMPLE_PRESENCE_REPORTS",
    "Sample Presence Report",
    "Choice Gap",
    "Repair Queue",
    "buildMetadata",
    "buildWebPageJsonLd",
    "selectSample",
  ]);
}

expect(contractPath, ["PresenceReportPublicShape", "SAMPLE_PRESENCE_REPORT", "Findability", "Understanding", "Trust", "Choice", "Action", "Visible, but not easy to choose."]);
expect(truthProfilePath, ["BusinessTruthProfilePublicShape", "SAMPLE_BUSINESS_TRUTH_PROFILE", "approvedClaims", "restrictedClaims"]);
expect(choiceGapPath, ["ChoiceGapPublicShape", "SAMPLE_CHOICE_GAP", "repairDirection"]);
expect(controlSnapshotPath, ["ControlSnapshotPublicShape", "SAMPLE_CONTROL_SNAPSHOT", "Proof freshness", "Competitor clarity"]);
expect(evidenceBoundaryPath, ["PresenceReportEvidenceBoundary", "SAMPLE_PRESENCE_REPORT_EVIDENCE_BOUNDARIES", "Homepage clarity", "Trust proof visibility", "Competitor contrast"]);
expect(nextMovePolicyPath, ["PresenceReportNextMovePolicy", "PRESENCE_REPORT_NEXT_MOVE_POLICIES", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control"]);
expect(releaseGatePath, ["PresenceReportReleaseGateStatus", "SAMPLE_PRESENCE_REPORT_RELEASE_CHECKS", "Approved business facts", "Restricted claims", "Evidence boundary", "Next move clarity"]);
expect(verticalSamplesPath, ["VerticalSamplePresenceReport", "VERTICAL_SAMPLE_PRESENCE_REPORTS", "dentist", "med-spa", "law-firm", "contractor", "trustStandard", "priorityRepairs", "Do not use outcome promises."]);
expect(generationAdapterPath, ["buildPresenceReportPackage", "GeneratedPresenceReportPackage", "SAMPLE_PRESENCE_REPORT", "businessTruthProfile", "choiceGap", "controlSnapshot"]);
expect(liveMappingPath, ["mapLiveScanSnapshotToPresenceReport", "FreeCheckReportSnapshot", "GeneratedPresenceReportPackage", "normalizePresenceReportNextMove"]);
expect(launchReadinessPath, ["PRESENCE_REPORT_LAUNCH_READINESS", "Public promise boundary", "Free Scan boundary", "Presence Report object", "Business Truth Profile", "Choice Gap", "Control Snapshot", "Vertical standards"]);
expect(routesChainPath, [validatorPath]);

boundedLength(routePath, 20000);
boundedLength(componentPath, 28000);
boundedLength(evidencePanelPath, 8000);
boundedLength(nextMovePolicyPanelPath, 8000);
boundedLength(verticalComponentPath, 18000);
boundedLength(indexPath, 1100);
boundedLength(contractPath, 8500);
boundedLength(truthProfilePath, 7000);
boundedLength(choiceGapPath, 5000);
boundedLength(controlSnapshotPath, 5000);
boundedLength(evidenceBoundaryPath, 5000);
boundedLength(nextMovePolicyPath, 5000);
boundedLength(releaseGatePath, 6000);
boundedLength(verticalSamplesPath, 18000);
boundedLength(generationAdapterPath, 9000);
boundedLength(liveMappingPath, 7000);
boundedLength(launchReadinessPath, 7000);

if (failures.length) {
  console.error("Sample Presence Report route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Sample Presence Report route validation passed with report object, evidence boundaries, next move policy, release gate, control snapshot, and vertical sample standards.");

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
