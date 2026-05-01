import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const docPath = "docs/captain-operating-core.md";
const runtimePath = "src/lib/captain-operating-core.ts";
const auditValidatorPath = "src/scripts/validate-captain-audit-hardening-control-plane.mjs";
const failures = [];

expect(docPath, [
  "# Universal Captain Operating Core",
  "every captain who takes over any Cendorq task",
  "Non-deviation rule",
  "Command chain",
  "Owner command",
  "Captain / release captain",
  "Chief agents",
  "Agents and scouts",
  "Validators and evidence checks",
  "No lower role can approve work reserved for a higher role.",
]);

expect(docPath, [
  "Chief agent readiness before delegation",
  "mission brief",
  "source boundaries",
  "evidence standard",
  "output boundary",
  "escalation rule",
  "drift risks",
  "anti-drift checks",
  "A chief agent that cannot define these items must not run the lane.",
]);

expect(docPath, [
  "Agent and scout readiness before work",
  "verified facts",
  "relevant source or file references",
  "assumptions",
  "gaps",
  "risks",
  "recommendations",
  "forecasted failure modes",
  "escalation needs",
  "Agents and scouts may propose. They do not approve.",
]);

expect(docPath, [
  "Forecast-before-expansion rule",
  "what could drift",
  "what could be stale",
  "what could be duplicated",
  "what could be overclaimed",
  "what could be under-validated",
  "what could confuse the customer journey",
  "what could expose private or internal material",
  "what could block production readiness later",
  "what could cause the next captain to misunderstand state",
]);

expect(runtimePath, [
  "CaptainOperatingLane",
  "CaptainCommandRole",
  "CaptainReadinessCheck",
  "ChiefAgentTrainingGate",
  "CaptainOperatingCoreProjection",
  "CAPTAIN_OPERATING_LANES",
  "CAPTAIN_COMMAND_ROLES",
  "CAPTAIN_READINESS_CHECKS",
  "CHIEF_AGENT_TRAINING_GATES",
  "CAPTAIN_OPERATING_CORE_RULES",
  "projectCaptainOperatingCore",
  "getCaptainOperatingCoreRules",
]);

expect(runtimePath, [
  "backend",
  "frontend",
  "reports",
  "operations",
  "launch",
  "support",
  "billing",
  "security",
  "provider-configuration",
  "agent-orchestration",
]);

expect(runtimePath, [
  "owner",
  "captain",
  "chief-agent",
  "agent",
  "scout",
  "validator",
  "mission-scope-understood",
  "source-boundaries-understood",
  "evidence-standard-understood",
  "output-boundaries-understood",
  "escalation-rules-understood",
  "forecast-risks-identified",
  "anti-drift-rules-understood",
]);

expect(runtimePath, [
  "captainMaySkipTakeoverAudit: false",
  "chiefAgentMayRunUntrained: false",
  "agentMayRunUntrained: false",
  "scoutMayRunUnboundedResearch: false",
  "speedOverridesUnderstanding: false",
  "vercelGreenEqualsFullQuality: false",
  "contractsEqualLiveProduct: false",
  "agentsMayApproveProductionWork: false",
  "ownerCommandAboveCaptain: true",
  "captainAboveChiefAgents: true",
  "chiefAgentsAboveAgents: true",
  "zeroToleranceForKnownDrift: true",
  "forecastReviewRequiredBeforeExpansion: true",
]);

expect(auditValidatorPath, [
  "src/scripts/validate-captain-operating-core.mjs",
  "src/lib/captain-operating-core.ts",
  "docs/captain-operating-core.md",
  "projectCaptainOperatingCore",
]);

forbidden(docPath, unsafePhrases());
forbidden(runtimePath, unsafePhrases());

if (failures.length) {
  console.error("Universal captain operating core validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Universal captain operating core validation passed.");

function unsafePhrases() {
  return [
    "captain may skip the takeover audit",
    "chief agents may dispatch agents without",
    "agent may approve",
    "scout may approve",
    "captainMaySkipTakeoverAudit: true",
    "chiefAgentMayRunUntrained: true",
    "agentMayRunUntrained: true",
    "scoutMayRunUnboundedResearch: true",
    "speedOverridesUnderstanding: true",
    "vercelGreenEqualsFullQuality: true",
    "contractsEqualLiveProduct: true",
    "agentsMayApproveProductionWork: true",
    "ownerCommandAboveCaptain: false",
    "captainAboveChiefAgents: false",
    "chiefAgentsAboveAgents: false",
    "forecastReviewRequiredBeforeExpansion: false",
    "guaranteed ROI",
    "guaranteed revenue",
    "guaranteed deliverability",
    "guaranteed inbox placement",
    "100% accurate",
    "impossible to hack",
    "never liable",
    "liability-free",
    "localStorage.setItem",
    "sessionStorage.setItem",
  ];
}

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
