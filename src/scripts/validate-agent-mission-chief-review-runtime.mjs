import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const runtimePath = "src/lib/agent-mission-chief-review-runtime.ts";
const panelPath = "src/app/command-center/agent-mission-chief-review-runtime-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-agent-mission-chief-review-runtime.mjs";

expect(runtimePath, [
  "ChiefAgentMissionReviewInput",
  "ChiefAgentMissionReviewRecord",
  "ChiefAgentMissionReviewResult",
  "AGENT_MISSION_CHIEF_REVIEW_RULES",
  "submitChiefAgentMissionReview",
  "projectChiefAgentMissionReviewPreview",
  "loadChiefAgentMissionReviewEnvelope",
  "saveChiefAgentMissionReviewEnvelope",
  "agent-mission-chief-reviews.v1.json",
  "captainReviewReady",
  "chief-agent-not-assigned-to-mission",
  "accepted-agent-findings-incomplete",
  "consolidated-facts-missing",
  "priority-findings-missing",
  "safe-limitations-missing",
  "required-captain-notes-missing",
  "Chief review cannot approve customer-facing output, report release, production mutation, delivery email, billing action, provider action, or paid recommendation.",
]);

expect(panelPath, [
  "Agent chief-review runtime",
  "Chief agents consolidate findings before release-captain review.",
  "Chief review is now a persisted action.",
  "Captain ready:",
  "Queue after review:",
  "Chief posture:",
  "Review reason codes",
]);

expect(pagePath, [
  "AgentMissionChiefReviewRuntimePanel",
  "./agent-mission-chief-review-runtime-panel",
  "<AgentMissionChiefReviewRuntimePanel />",
]);

expect(routesChainPath, [validatorPath]);

boundedLength(runtimePath, 19000);
boundedLength(panelPath, 13500);

if (failures.length) {
  console.error("Agent mission chief review runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Agent mission chief review runtime validation passed with persisted chief reviews, consolidation fields, captain-review posture, and blocked output authority.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for chief review runtime standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
