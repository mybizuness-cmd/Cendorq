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
  "requiredReportOutput",
  "requiredReportVisuals",
  "customerEducationGoal",
  "nextPlanMotion",
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
  "guaranteed revenue",
  "guaranteed ranking",
  "guaranteed AI placement",
  "unsupported competitor claim",
  "fake precision forecast",
  "projectPlanTriggeredAgentMission",
  "getAgentMissionOperatingEngine",
  "Every plan-triggered mission must start from a plan intelligence intake record, not a vague request.",
  "release-captain approval remains required before customer-facing report, fix, monitoring alert, code, copy, validator output, PDF, HTML report, dashboard report card, email summary, or next-plan recommendation.",
  "Agent missions must use progressive intake: start safe public research when enough information exists, but keep missing customer information visible as a dashboard blocker.",
  "educational while selling and informational while selling customer output",
]);

expect(enginePath, [
  "Free Scan Signal Report",
  "Deep Review Diagnostic Report",
  "Build Fix Delivery Report",
  "Ongoing Control Report",
  "simple signal meter or readiness bar",
  "priority heat map",
  "competitor comparison chart when evidence allows",
  "forecast or risk outlook visual",
  "expected timeline visual",
  "trend line or month-over-month signal visual",
  "keep full competitor analysis out of Free Scan",
  "do not include full competitor analysis",
  "do not include full forecast model",
  "do not use fake precision forecast",
  "do not claim private competitor data",
  "do not promise exact result dates",
  "Ongoing Control recommendation when fit",
  "Build Fix escalation when fit",
]);

expect(enginePath, [
  "Cendorq letterhead",
  "customer-safe business name",
  "short executive signal",
  "3 to 5 key findings",
  "visibility and readiness scorecard",
  "website clarity review",
  "AI/search readability review",
  "trust and proof review",
  "competitor comparison when evidence is available",
  "approved scope",
  "before-state baseline",
  "what was fixed or prepared",
  "expected timeline range",
  "what improved",
  "what weakened",
  "what stayed stable",
  "AI/search/platform change notes",
]);

expect(panelPath, [
  "Agent mission operating engine",
  "Plan-triggered missions, report visuals, chief review, captain approval.",
  "prepare plan-specific report output and visuals",
  "Agents increase depth and speed. They do not approve reports, customer-facing claims, code, launch, paid recommendations, production changes, or delivery emails.",
  "Education goal:",
  "Next plan motion:",
  "Report output",
  "Required visuals",
  "Finding record standard",
  "Operating rules",
  "verified facts, source references, assumptions, evidence gaps, confidence, risks, recommendation, and blocked customer claims",
  "Required report output and required report visuals are visible for every plan mission.",
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
  "full competitor analysis inside Free Scan is allowed",
  "guaranteed ranking is allowed",
  "guaranteed AI placement is allowed",
  "guaranteed revenue is allowed",
]);

forbidden(panelPath, [
  "raw customer record",
  "private source value",
  "secret value",
  "payment data value",
]);

boundedLength(enginePath, 23000);
boundedLength(panelPath, 16000);

if (failures.length) {
  console.error("Agent mission operating engine validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Agent mission operating engine validation passed with elevated plan-triggered reports, required visuals, progressive intake, structured findings, chief review, captain approval, and blocked customer claims.");

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
