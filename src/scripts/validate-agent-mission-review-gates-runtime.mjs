import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const runtimePath = "src/lib/agent-mission-review-gates-runtime.ts";
const panelPath = "src/app/command-center/agent-mission-review-gates-runtime-panel.tsx";
const registryPath = "src/lib/command-center/panel-registry.ts";
const pagePath = "src/app/command-center/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-agent-mission-review-gates-runtime.mjs";

expect(runtimePath, [
  "AgentFindingSubmissionProjection",
  "ChiefAgentReviewProjection",
  "ReleaseCaptainApprovalProjection",
  "AGENT_MISSION_REVIEW_GATES_RUNTIME_RULES",
  "projectAgentFindingSubmission",
  "projectChiefAgentReview",
  "projectReleaseCaptainApproval",
  "projectAgentMissionReviewGateIndex",
  "getAgentMissionReviewGatesRuntime",
  "verified-facts-missing",
  "source-refs-missing",
  "assumptions-missing",
  "evidence-gaps-missing",
  "risks-missing",
  "blocked-customer-claims-missing",
  "high-confidence-not-supported",
  "chief-review-not-ready-for-captain",
  "blocked-output-claims-require-safe-limitation",
  "customerFacingUseAllowed: false",
  "productionMutationAllowed: false",
  "billingActionAllowed: false",
  "deliveryEmailAllowed: false",
  "reportReleaseAllowed: false",
  "Agent findings can become safe for chief-agent review, but they can never become customer-facing output by themselves.",
  "Chief-agent review can consolidate findings and request captain review, but it cannot approve customer-facing report, fix, monitoring alert, paid recommendation, code, billing, provider action, delivery email, or production mutation.",
]);

expect(panelPath, [
  "Agent mission review gates",
  "Findings must pass agent submission, chief review, then captain approval.",
  "Chief review does not approve customer-facing output.",
  "Finding submissions:",
  "Chief review:",
  "Captain gate:",
  "Reason codes",
  "Customer output:",
  "Production mutation:",
  "Report release:",
  "Delivery email:",
]);

expect(registryPath, [
  "agent-mission-review-gates-runtime",
  "Agent mission review gates runtime",
  "Show finding submission acceptance, chief-agent consolidation, release-captain approval posture, reason codes, blocked claims, and gated customer-safe output state.",
  "Review gates stay metadata-only",
  "order: 107",
]);

expect(pagePath, [
  "AgentMissionReviewGatesRuntimePanel",
  "./agent-mission-review-gates-runtime-panel",
  "<AgentMissionReviewGatesRuntimePanel />",
]);

expect(routesChainPath, [validatorPath]);

forbidden(runtimePath, [
  "productionMutationAllowed: true",
  "billingActionAllowed: true",
  "deliveryEmailAllowed: true",
  "reportReleaseAllowed: true",
  "chief agents approve customer-facing output",
  "skip captain approval",
]);

forbidden(panelPath, [
  "raw customer payload value",
  "credential value",
  "payment data value",
  "provider payload value",
  "prompt value",
]);

boundedLength(runtimePath, 13500);
boundedLength(panelPath, 12000);

if (failures.length) {
  console.error("Agent mission review gates runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Agent mission review gates runtime validation passed with finding submissions, chief review, release-captain approval posture, reason codes, and blocked outputs.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for agent mission review gates runtime standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
