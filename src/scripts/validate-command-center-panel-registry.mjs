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
  ["OperatorControlInterfacePanel", "operator-control-interface"],
  ["AdminCommandCenterControlPanel", "admin-command-center-control"],
  ["PlatformLaunchReadinessPanel", "platform-launch-readiness"],
  ["ProductionLaunchChecklistPanel", "production-launch-checklist"],
  ["ProductionLaunchFinalBlockerPanel", "production-launch-final-blocker"],
  ["LaunchEvidencePanel", "launch-evidence"],
  ["ProductionSmokeTargetPanel", "production-smoke-target"],
  ["AgentOperatingSystemPanel", "agent-operating-system"],
  ["OwnerConfigurationEvidencePanel", "owner-configuration-evidence"],
  ["OwnerConfigurationWorkflowPanel", "owner-configuration-workflow"],
  ["OperatorReadinessMatrix", "operator-readiness-matrix"],
  ["CommandCenterPanelIndex", "panel-index"],
  ["ValidationRegistryPanel", "validation-registry"],
  ["ModuleRoadmapPanel", "module-roadmap"],
  ["PlanControlPanel", "plan-control"],
  ["PlanDeliveryOrchestrationPanel", "plan-delivery-orchestration"],
  ["PlanRoutingRuntimePanel", "plan-routing-runtime"],
  ["OptimizationLibraryPanel", "optimization-library"],
  ["CustomerOutputApprovalPanel", "customer-output-approval"],
  ["BenchmarkIntelligencePanel", "benchmark-intelligence"],
  ["BenchmarkEvidencePanel", "benchmark-evidence"],
  ["ReportTruthMethodologyPanel", "report-truth-methodology"],
  ["ReportEvidenceOrchestrationPanel", "report-evidence-orchestration"],
  ["ReportEvidenceRecordPanel", "report-evidence-records"],
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
  validatePrivateMetadataOnlyRegistry(registryText);
  validateOwnerWorkflowCoverage(registryText);
  validateAdminProjectionCoverage(routeText, registryText);
  validatePlanDeliveryCoverage(routeText, registryText);
  validateReportEvidencePanelCoverage(routeText, registryText);
}

if (failures.length) {
  console.error("Command Center panel registry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center panel registry validation passed. Every visible private cockpit panel is represented in the metadata-only registry, admin projections, plan delivery/routing, report evidence orchestration, report evidence records, owner workflow panels are covered, and registry order remains stable and increasing.");

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

  const panelComponents = [...routeText.matchAll(/<([A-Z][A-Za-z0-9]*(?:Panel|Map|Matrix|Index))\b/g)].map((match) => match[1]);
  for (const componentName of panelComponents) {
    if (!allowedComponents.has(componentName)) failures.push(`${routePath} renders ${componentName} without an explicit registry mapping`);
  }
}

function validatePrivateMetadataOnlyRegistry(registryText) {
  const privateMatches = [...registryText.matchAll(/visibility: "private-gated",/g)].length;
  const metadataMatches = [...registryText.matchAll(/dataExposure: "metadata-only",/g)].length;
  if (privateMatches !== expectedPanels.length) failures.push(`${registryPath} expected ${expectedPanels.length} private-gated entries, found ${privateMatches}`);
  if (metadataMatches !== expectedPanels.length) failures.push(`${registryPath} expected ${expectedPanels.length} metadata-only entries, found ${metadataMatches}`);
}

function validateOwnerWorkflowCoverage(registryText) {
  for (const phrase of [
    "owner-configuration-evidence",
    "owner-configuration-workflow",
    "safe-summary-only",
    "never creates launch or security approval by itself",
    "Release-captain review remains required",
  ]) {
    if (!registryText.includes(phrase)) failures.push(`${registryPath} missing owner workflow registry phrase: ${phrase}`);
  }
}

function validateAdminProjectionCoverage(routeText, registryText) {
  for (const phrase of [
    "AdminCommandCenterControlPanel",
    "./admin-command-center-control-panel",
    "<OperatorControlInterfacePanel />",
    "<AdminCommandCenterControlPanel />",
    "<PlatformLaunchReadinessPanel />",
  ]) {
    if (!routeText.includes(phrase)) failures.push(`${routePath} missing admin projection panel phrase: ${phrase}`);
  }

  for (const phrase of [
    "admin-command-center-control",
    "Admin Command Center control",
    "safe admin command-center projection routes",
    "preview-gated",
    "safe-summary-only",
    "cannot mutate production or expose raw/private payloads",
  ]) {
    if (!registryText.includes(phrase)) failures.push(`${registryPath} missing admin projection registry phrase: ${phrase}`);
  }
}

function validatePlanDeliveryCoverage(routeText, registryText) {
  for (const phrase of [
    "PlanDeliveryOrchestrationPanel",
    "PlanRoutingRuntimePanel",
    "./plan-delivery-orchestration-panel",
    "./plan-routing-runtime-panel",
    "<PlanControlPanel plans={planControls} />",
    "<PlanDeliveryOrchestrationPanel />",
    "<PlanRoutingRuntimePanel />",
  ]) {
    if (!routeText.includes(phrase)) failures.push(`${routePath} missing plan delivery/routing panel phrase: ${phrase}`);
  }

  for (const phrase of [
    "plan-delivery-orchestration",
    "Plan delivery orchestration",
    "plan-routing-runtime",
    "Plan routing runtime",
    "cannot send customer output or approve paid recommendations by itself",
    "cannot create entitlement, billing, or customer-facing approval drift",
  ]) {
    if (!registryText.includes(phrase)) failures.push(`${registryPath} missing plan delivery/routing registry phrase: ${phrase}`);
  }
}

function validateReportEvidencePanelCoverage(routeText, registryText) {
  for (const phrase of [
    "ReportEvidenceOrchestrationPanel",
    "ReportEvidenceRecordPanel",
    "./report-evidence-orchestration-panel",
    "./report-evidence-record-panel",
    "<ReportTruthMethodologyPanel />",
    "<ReportEvidenceOrchestrationPanel />",
    "<ReportEvidenceRecordPanel />",
    "<AiManagerVersionRegistryPanel />",
  ]) {
    if (!routeText.includes(phrase)) failures.push(`${routePath} missing report evidence panel phrase: ${phrase}`);
  }

  for (const phrase of [
    "report-evidence-orchestration",
    "Report evidence orchestration",
    "evidence source tiers",
    "confidence posture",
    "runtime review state",
    "raw private evidence and customer-facing claims remain blocked until review gates pass",
    "report-evidence-records",
    "Report evidence records",
    "append-only persistence posture",
    "records API posture",
    "safe hashes",
    "cannot expose raw/private payloads or approve customer-facing output, public report release, paid recommendations, launch, or security readiness",
  ]) {
    if (!registryText.includes(phrase)) failures.push(`${registryPath} missing report evidence registry phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
