import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const runtimePath = "src/lib/agent-mission-records-runtime.ts";
const panelPath = "src/app/command-center/agent-mission-records-runtime-panel.tsx";
const registryPath = "src/lib/command-center/panel-registry.ts";
const pagePath = "src/app/command-center/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-agent-mission-records-runtime.mjs";

expect(runtimePath, [
  "AgentMissionRuntimeRecord",
  "AgentMissionReviewState",
  "AGENT_MISSION_RECORDS_RUNTIME_RULES",
  "AGENT_MISSION_APPEND_ONLY_AUDIT_EVENTS",
  "projectAgentMissionRuntimeRecord",
  "projectAgentMissionRuntimeIndex",
  "getAgentMissionRecordsRuntime",
  "missionRecordId",
  "intakeRecordKey",
  "customerSafeSummary",
  "assignedChiefAgent",
  "missingMissionInputs",
  "chiefAgentReview",
  "releaseCaptainReview",
  "sourceRefPolicy",
  "appendOnlyAuditEvents",
  "blockedOutputClaims",
  "customerFacingOutputAllowed: false",
  "productionMutationAllowed: false",
  "billingActionAllowed: false",
  "deliveryEmailAllowed: false",
  "reportReleaseAllowed: false",
  "Every agent mission must create a runtime record before research begins.",
  "Every runtime record must reference the plan intelligence intake record that triggered the mission.",
  "Customer-facing output remains blocked until structured findings exist, source references exist, chief-agent review passes, release-captain review passes, and blocked customer claims are removed or safely limited.",
]);

expect(panelPath, [
  "Agent mission records runtime",
  "Mission records make the agent engine operational, reviewable, and bounded.",
  "Every plan-triggered mission needs a runtime record before research starts.",
  "Runtime records are safe-summary-only.",
  "Chief review:",
  "Captain review:",
  "Customer output:",
  "Production mutation:",
  "Report release:",
  "Delivery email:",
  "Append-only audit events",
]);

expect(registryPath, [
  "agent-mission-records-runtime",
  "Agent mission records runtime",
  "Show plan-triggered mission records with intake links, missing inputs, assigned chief agents, finding posture, chief review state, captain review state, blocked claims, and append-only audit events.",
  "Agent mission records stay safe-summary-only",
  "order: 106",
]);

expect(pagePath, [
  "AgentMissionRecordsRuntimePanel",
  "./agent-mission-records-runtime-panel",
  "<AgentMissionRecordsRuntimePanel />",
]);

expect(routesChainPath, [validatorPath]);

forbidden(runtimePath, [
  "customerFacingOutputAllowed: true",
  "productionMutationAllowed: true",
  "billingActionAllowed: true",
  "deliveryEmailAllowed: true",
  "reportReleaseAllowed: true",
  "raw customer payloads allowed",
  "skip captain review",
]);

forbidden(panelPath, [
  "raw customer payload value",
  "credential value",
  "payment data value",
  "provider payload value",
  "prompt value",
  "internal note value",
]);

boundedLength(runtimePath, 12500);
boundedLength(panelPath, 12000);

if (failures.length) {
  console.error("Agent mission records runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Agent mission records runtime validation passed with runtime records, intake links, review states, blocked outputs, and append-only audit posture.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for agent mission records runtime standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
