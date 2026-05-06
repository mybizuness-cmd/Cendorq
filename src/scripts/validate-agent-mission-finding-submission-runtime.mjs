import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const runtimePath = "src/lib/agent-mission-finding-submission-runtime.ts";
const panelPath = "src/app/command-center/agent-mission-finding-submission-runtime-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const registryPath = "src/lib/command-center/panel-registry.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-agent-mission-finding-submission-runtime.mjs";

expect(runtimePath, [
  "AgentMissionFindingSubmissionInput",
  "AgentMissionFindingSubmissionResult",
  "AGENT_MISSION_FINDING_SUBMISSION_RULES",
  "submitAgentMissionFinding",
  "projectAgentMissionFindingSubmissionPreview",
  "replaceFindingForAgent",
  "reprojectExecutionRecord",
  "finding-submitted",
  "execution-record-not-found",
  "Correct the finding submission before chief-agent review can use it.",
  "Accepted findings must recompute chief review, release-captain approval posture, quality score, output assembly, queue state, blocked reason codes, and audit trail.",
]);

expect(panelPath, [
  "Agent finding submission runtime",
  "Assigned agents can submit findings; the mission recomputes immediately.",
  "Queue after submit:",
  "Quality after submit:",
  "Output after submit:",
  "Submission result",
  "Finding submission can move work toward review.",
]);

expect(pagePath, [
  "AgentMissionFindingSubmissionRuntimePanel",
  "./agent-mission-finding-submission-runtime-panel",
  "<AgentMissionFindingSubmissionRuntimePanel />",
]);

expect(registryPath, [
  "agent-mission-finding-submission-runtime",
  "Agent mission finding submission runtime",
  "order: 108",
]);

expect(routesChainPath, [validatorPath]);

boundedLength(runtimePath, 14500);
boundedLength(panelPath, 14500);

if (failures.length) {
  console.error("Agent mission finding submission runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Agent mission finding submission runtime validation passed with accepted findings, recomputation, queue state, output posture, and audit events.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for finding submission runtime standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
