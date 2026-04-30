import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const commandCenterDir = "src/app/command-center";
const failures = [];

const requiredPanelFiles = [
  "ai-history-panel.tsx",
  "ai-manager-command-panel.tsx",
  "ai-manager-version-registry-panel.tsx",
  "benchmark-evidence-panel.tsx",
  "benchmark-intelligence-panel.tsx",
  "closed-command-center-panel.tsx",
  "command-center-hero-panel.tsx",
  "command-center-operating-map.tsx",
  "customer-output-approval-panel.tsx",
  "module-roadmap-panel.tsx",
  "operator-readiness-matrix.tsx",
  "optimization-library-panel.tsx",
  "page.tsx",
  "panel-index.tsx",
  "plan-control-panel.tsx",
  "readiness-checklist-panel.tsx",
  "report-evidence-orchestration-panel.tsx",
  "report-truth-methodology-panel.tsx",
  "security-posture-panel.tsx",
  "test-record-classes-panel.tsx",
  "validation-registry-panel.tsx",
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
}

if (failures.length) {
  console.error("Command Center panel safety validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center panel safety validation passed. Extracted cockpit panels, including report evidence orchestration, remain server-rendered, metadata-only, free of client-side storage and browser-only APIs, and protected from direct secret or public-exposure regressions.");

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
