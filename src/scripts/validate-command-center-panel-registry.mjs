import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const routePath = "src/app/command-center/page.tsx";
const registryPath = "src/lib/command-center/panel-registry.ts";

const expectedPanels = [
  ["CommandCenterHeroPanel", "hero-readiness-summary"],
  ["CommandCenterOperatingMap", "operating-map"],
  ["SecurityPosturePanel", "security-posture"],
  ["OperatorReadinessMatrix", "operator-readiness-matrix"],
  ["ModuleRoadmapPanel", "module-roadmap"],
  ["PlanControlPanel", "plan-control"],
  ["OptimizationLibraryPanel", "optimization-library"],
  ["CustomerOutputApprovalPanel", "customer-output-approval"],
  ["BenchmarkIntelligencePanel", "benchmark-intelligence"],
  ["BenchmarkEvidencePanel", "benchmark-evidence"],
  ["ReportTruthMethodologyPanel", "report-truth-methodology"],
  ["AiManagerVersionRegistryPanel", "ai-manager-version-registry"],
  ["TestRecordClassesPanel", "test-record-classes"],
  ["AiManagerCommandPanel", "ai-manager-command-queue"],
  ["AiHistoryPanel", "ai-history"],
  ["ReadinessChecklistPanel", "readiness-checklist"],
];

validateFileExists(routePath);
validateFileExists(registryPath);

if (!failures.length) {
  const routeText = read(routePath);
  const registryText = read(registryPath);

  for (const [componentName, registryKey] of expectedPanels) {
    if (!routeText.includes(`<${componentName}`)) failures.push(`${routePath} is missing expected cockpit panel component: ${componentName}`);
    if (!registryText.includes(`key: "${registryKey}"`)) failures.push(`${registryPath} is missing registry key for ${componentName}: ${registryKey}`);
  }

  validateRegistryOrdering(registryText);
  validateNoVisiblePanelWithoutRegistry(routeText);
}

if (failures.length) {
  console.error("Command Center panel registry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center panel registry validation passed. Every visible private cockpit panel is represented in the metadata-only registry, and registry order remains stable and increasing.");

function validateFileExists(path) {
  if (!existsSync(join(root, path))) failures.push(`Missing required Command Center file: ${path}`);
}

function validateRegistryOrdering(registryText) {
  const orderMatches = [...registryText.matchAll(/order: (\d+)/g)].map((match) => Number(match[1]));
  if (orderMatches.length !== expectedPanels.length) {
    failures.push(`${registryPath} expected ${expectedPanels.length} ordered panels, found ${orderMatches.length}`);
    return;
  }

  for (let index = 1; index < orderMatches.length; index += 1) {
    if (orderMatches[index] <= orderMatches[index - 1]) {
      failures.push(`${registryPath} panel order must be strictly increasing; found ${orderMatches[index - 1]} then ${orderMatches[index]}`);
    }
  }
}

function validateNoVisiblePanelWithoutRegistry(routeText) {
  const allowedComponents = new Set(expectedPanels.map(([componentName]) => componentName));
  allowedComponents.add("ClosedCommandCenterPanel");

  const panelComponents = [...routeText.matchAll(/<([A-Z][A-Za-z0-9]*Panel)\b/g)].map((match) => match[1]);
  for (const componentName of panelComponents) {
    if (!allowedComponents.has(componentName)) failures.push(`${routePath} renders ${componentName} without an explicit registry mapping`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
