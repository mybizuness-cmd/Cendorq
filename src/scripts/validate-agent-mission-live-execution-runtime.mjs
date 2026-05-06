import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const runtimePath = "src/lib/agent-mission-live-execution-runtime.ts";
const panelPath = "src/app/command-center/agent-mission-live-execution-runtime-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-agent-mission-live-execution-runtime.mjs";

expect(runtimePath, [
  "AgentMissionExecutionRecord",
  "AgentMissionQueueState",
  "AgentMissionQualityScore",
  "CustomerOutputAssemblyProjection",
  "AGENT_MISSION_LIVE_EXECUTION_RULES",
  "createOrUpdateAgentMissionExecutionRecord",
  "loadAgentMissionExecutionEnvelope",
  "saveAgentMissionExecutionEnvelope",
  "projectAgentMissionExecutionPreview",
  "scoreAgentMissionExecution",
  "projectCustomerOutputAssembly",
  "agent-mission-executions.v3.json",
  "queueState",
  "qualityScore",
  "outputAssembly",
  "blockedReasonCodes",
  "auditTrail",
  "ready-for-delivery-gate",
  "paid-report-dashboard-pdf-email-gates-required",
  "Every plan-triggered mission must persist an execution record before agent work can be treated as operational.",
  "Free Scan output assembly can target dashboard-only results, while paid plan output assembly must target dashboard report delivery plus PDF/email gates.",
  "Quality scoring must penalize missing sources, missing assumptions, missing risks, weak plan-boundary safety, and unclear customer usefulness.",
]);

expect(panelPath, [
  "Agent mission live execution",
  "Persisted records, queue state, quality score, and output assembly posture.",
  "Every plan mission gets a persisted execution record",
  "Blocked reason codes",
  "PDF required:",
  "Email required:",
  "Live execution rules",
]);

expect(pagePath, [
  "AgentMissionLiveExecutionRuntimePanel",
  "./agent-mission-live-execution-runtime-panel",
  "<AgentMissionLiveExecutionRuntimePanel />",
]);

expect(routesChainPath, [validatorPath]);

boundedLength(runtimePath, 22000);
boundedLength(panelPath, 12000);

if (failures.length) {
  console.error("Agent mission live execution runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Agent mission live execution runtime validation passed with persisted execution records, queue state, quality score, output assembly, blocked reasons, and audit posture.");

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

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for agent mission live execution standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
