import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const commandCenterDir = "src/app/command-center";
const routePath = `${commandCenterDir}/page.tsx`;
const registryPath = "src/lib/command-center/panel-registry.ts";
const failures = [];

const requiredPanelFiles = [
  "admin-command-center-control-panel.tsx",
  "agent-operating-system-panel.tsx",
  "ai-history-panel.tsx",
  "ai-manager-command-panel.tsx",
  "ai-manager-version-registry-panel.tsx",
  "benchmark-evidence-panel.tsx",
  "benchmark-intelligence-panel.tsx",
  "closed-command-center-panel.tsx",
  "command-center-hero-panel.tsx",
  "command-center-operating-map.tsx",
  "customer-output-approval-panel.tsx",
  "launch-evidence-panel.tsx",
  "module-roadmap-panel.tsx",
  "operator-control-interface-panel.tsx",
  "operator-readiness-matrix.tsx",
  "optimization-library-panel.tsx",
  "owner-configuration-evidence-panel.tsx",
  "owner-configuration-workflow-panel.tsx",
  "page.tsx",
  "panel-index.tsx",
  "plan-control-panel.tsx",
  "plan-delivery-orchestration-panel.tsx",
  "plan-routing-runtime-panel.tsx",
  "platform-launch-readiness-panel.tsx",
  "production-launch-checklist-panel.tsx",
  "production-launch-final-blocker-panel.tsx",
  "production-smoke-target-panel.tsx",
  "readiness-checklist-panel.tsx",
  "report-evidence-orchestration-panel.tsx",
  "report-evidence-record-panel.tsx",
  "report-truth-methodology-panel.tsx",
  "security-posture-panel.tsx",
  "test-record-classes-panel.tsx",
  "validation-registry-panel.tsx",
];

const requiredRouteImports = [
  ["AdminCommandCenterControlPanel", "./admin-command-center-control-panel"],
  ["AgentOperatingSystemPanel", "./agent-operating-system-panel"],
  ["LaunchEvidencePanel", "./launch-evidence-panel"],
  ["OwnerConfigurationEvidencePanel", "./owner-configuration-evidence-panel"],
  ["OwnerConfigurationWorkflowPanel", "./owner-configuration-workflow-panel"],
  ["PlanDeliveryOrchestrationPanel", "./plan-delivery-orchestration-panel"],
  ["PlanRoutingRuntimePanel", "./plan-routing-runtime-panel"],
  ["PlatformLaunchReadinessPanel", "./platform-launch-readiness-panel"],
  ["ProductionLaunchChecklistPanel", "./production-launch-checklist-panel"],
  ["ProductionLaunchFinalBlockerPanel", "./production-launch-final-blocker-panel"],
  ["ProductionSmokeTargetPanel", "./production-smoke-target-panel"],
  ["ReportEvidenceRecordPanel", "./report-evidence-record-panel"],
];

const forbiddenPanelBehavior = [
  "\"use client\"",
  "'use client'",
  "NEXT_PUBLIC",
  "localStorage",
  "sessionStorage",
  "document.cookie",
  "window.",
  "secretValue",
  "process.env.",
  "dangerouslySetInnerHTML",
  "publicExposureAllowed: true",
  "clientDirectUploadAllowed: true",
  "clientDirectDownloadAllowed: true",
  "clientDirectSendAllowed: true",
  "clientBillingMutationAllowed: true",
  "clientExecutionAllowed: true",
  "rawPayload=",
  "rawEvidence=",
  "providerPayload=",
  "customerData=",
  "internalNotes=",
  "operatorIdentity=",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "guaranteed security",
  "impossible to hack",
  "liability-free",
];

if (!existsSync(join(root, commandCenterDir))) {
  failures.push(`Missing Command Center app directory: ${commandCenterDir}`);
} else {
  const panelFiles = readdirSync(join(root, commandCenterDir)).filter((fileName) => fileName.endsWith(".tsx"));

  for (const requiredFile of requiredPanelFiles) {
    if (!panelFiles.includes(requiredFile)) failures.push(`${commandCenterDir} missing required panel file: ${requiredFile}`);
  }

  for (const fileName of panelFiles) {
    const relativePath = `${commandCenterDir}/${fileName}`;
    const text = read(relativePath);
    validatePanelFile(relativePath, text);
  }

  validateRouteImports();
  validateRegistryAlignment();
}

if (failures.length) {
  console.error("Command Center panel safety validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center panel safety validation passed. Every current cockpit panel, including admin projections, launch readiness, owner workflow, plan delivery/routing, and report evidence records, remains server-rendered, metadata-only, free of client-side storage and browser-only APIs, and protected from direct secret, raw payload, unsafe claim, and public-exposure regressions.");

function validatePanelFile(relativePath, text) {
  for (const forbidden of forbiddenPanelBehavior) {
    if (text.includes(forbidden)) failures.push(`${relativePath} contains forbidden panel behavior: ${forbidden}`);
  }

  if (relativePath.endsWith("page.tsx")) {
    validateRouteShell(relativePath, text);
    return;
  }

  if (!text.includes("export function ")) failures.push(`${relativePath} must export a named server component function`);

  if (relativePath.includes("panel") && !text.includes("Metadata only") && !text.includes("metadata-only") && !text.includes("metadata only")) {
    failures.push(`${relativePath} should explicitly state that it is metadata-only`);
  }
}

function validateRouteImports() {
  if (!existsSync(join(root, routePath))) {
    failures.push(`Missing route shell: ${routePath}`);
    return;
  }

  const routeText = read(routePath);
  for (const [componentName, importPath] of requiredRouteImports) {
    if (!routeText.includes(componentName)) failures.push(`${routePath} missing required panel component import/render: ${componentName}`);
    if (!routeText.includes(importPath)) failures.push(`${routePath} missing required panel import path: ${importPath}`);
    if (!routeText.includes(`<${componentName}`)) failures.push(`${routePath} missing required private panel render: <${componentName}`);
  }
}

function validateRegistryAlignment() {
  if (!existsSync(join(root, registryPath))) {
    failures.push(`Missing panel registry: ${registryPath}`);
    return;
  }

  const registryText = read(registryPath);
  for (const phrase of [
    "admin-command-center-control",
    "agent-operating-system",
    "owner-configuration-evidence",
    "owner-configuration-workflow",
    "plan-delivery-orchestration",
    "plan-routing-runtime",
    "report-evidence-records",
    "private-gated",
    "metadata-only",
    "cannot mutate production or expose raw/private payloads",
    "cannot send customer output or approve paid recommendations by itself",
    "cannot expose raw/private payloads or approve customer-facing output, public report release, paid recommendations, launch, or security readiness",
  ]) {
    if (!registryText.includes(phrase)) failures.push(`${registryPath} missing safety alignment phrase: ${phrase}`);
  }
}

function validateRouteShell(relativePath, text) {
  const routeSpecificForbidden = [
    "function Metric(",
    "function MiniMetric(",
    "function HistoryCard(",
    "function ListCard(",
    "No customer records, private intelligence",
    "Customer Output Approval</p>",
    "Controlled command queue</h2>",
    "Private configuration checklist</h2>",
  ];

  for (const forbidden of routeSpecificForbidden) {
    if (text.includes(forbidden)) failures.push(`${relativePath} regressed from composition shell with inline UI: ${forbidden}`);
  }
}

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}
