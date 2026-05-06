import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const enginePath = "src/lib/agent-mission-operating-engine.ts";
const panelPath = "src/app/command-center/agent-mission-operating-engine-panel.tsx";
const registryPath = "src/lib/command-center/panel-registry.ts";
const pagePath = "src/app/command-center/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-agent-mission-operating-engine.mjs";

expect(enginePath, [
  "AGENT_MISSION_OPERATING_ENGINE_RULES",
  "PLAN_TRIGGERED_AGENT_MISSION_TEMPLATES",
  "AgentFindingRecord",
  "PlanTriggeredAgentMission",
  "free-scan-first-signal-mission",
  "deep-review-cause-diagnosis-mission",
  "build-fix-scoped-implementation-mission",
  "ongoing-control-monthly-command-mission",
  "chiefAgentReviewGate",
  "releaseCaptainReviewGate",
  "structuredFindingSchema",
  "verifiedFacts",
  "sourceRefs",
  "assumptions",
  "evidenceGaps",
  "blockedCustomerClaims",
  "projectPlanTriggeredAgentMission",
  "getAgentMissionOperatingEngine",
  "Every plan-triggered mission must start from a plan intelligence intake record, not a vague request.",
  "release-captain approval remains required before customer-facing report, fix, monitoring alert, code, copy, or validator output.",
]);

expect(panelPath, [
  "Agent mission operating engine",
  "Plan-triggered missions, structured findings, chief review, captain approval.",
  "Agents increase depth and speed. They do not approve reports, customer-facing claims, code, launch, paid recommendations, production changes, or delivery emails.",
  "Finding record standard",
  "Operating rules",
  "verified facts, source references, assumptions, evidence gaps, confidence, risks, recommendation, and blocked customer claims",
]);

expect(registryPath, [
  "agent-mission-operating-engine",
  "Agent mission operating engine",
  "Show plan-triggered agent missions, structured findings, chief-agent review, release-captain approval gates, and blocked customer claims.",
  "Agent missions remain metadata-only",
  "order: 105",
]);

expect(pagePath, [
  "AgentMissionOperatingEnginePanel",
  "./agent-mission-operating-engine-panel",
  "<AgentMissionOperatingEnginePanel />",
]);

expect(routesChainPath, [validatorPath]);

forbidden(enginePath, [
  "agents approve reports",
  "agents can launch",
  "skip release captain",
  "guaranteed revenue",
  "guaranteed ranking",
  "guaranteed AI placement",
]);

forbidden(panelPath, [
  "raw customer record",
  "private source value",
  "secret value",
  "payment data value",
]);

boundedLength(enginePath, 16000);
boundedLength(panelPath, 12000);

if (failures.length) {
  console.error("Agent mission operating engine validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Agent mission operating engine validation passed with plan-triggered missions, structured findings, chief review, captain approval, and blocked customer claims.");

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

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for agent mission operating engine standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
