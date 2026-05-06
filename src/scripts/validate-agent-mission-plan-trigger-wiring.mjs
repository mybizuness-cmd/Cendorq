import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const freeCheckPath = "src/app/api/free-check/route.ts";
const paidRuntimePath = "src/lib/customer-revenue-workflow-runtime.ts";
const validatorPath = "src/scripts/validate-agent-mission-plan-trigger-wiring.mjs";

expect(freeCheckPath, [
  "createOrUpdateAgentMissionExecutionRecord",
  "planKey: \"free-scan\"",
  "free-scan-agent-mission-execution",
  "agentMissionExecution",
  "queueState",
  "qualityScore",
  "outputReadiness",
  "dashboardDestination",
  "blockedReasonCodes",
]);

expect(paidRuntimePath, [
  "projectAgentMissionExecutionPreview",
  "agentMissionExecution",
  "executionRecordKey",
  "queueState",
  "qualityScoreTotal",
  "qualityScoreTier",
  "outputType",
  "outputReadiness",
  "requiresPdfAttachment",
  "requiresDeliveryEmail",
  "agent_mission_execution_preview_created",
  "agent_mission_queue_state_attached",
  "agent_mission_execution_record_key",
  "agent_mission_output_readiness",
  "agent_mission_blocked_reason_codes",
]);

expect(validatorPath, [
  "validate-agent-mission-plan-trigger-wiring",
  "Free Scan",
  "paid-plan",
]);

boundedLength(freeCheckPath, 38000);
boundedLength(paidRuntimePath, 15000);

if (failures.length) {
  console.error("Agent mission plan trigger wiring validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("validate-agent-mission-plan-trigger-wiring passed for Free Scan and paid-plan trigger wiring.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for trigger wiring standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
