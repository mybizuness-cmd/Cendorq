import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/agent-operating-system-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const failures = [];

expect(panelPath, [
  "AgentOperatingSystemPanel",
  "AGENT_OPERATING_SYSTEM_CONTRACT",
  "Agent operating system",
  "Owner command, release-captain final validation, chief agents, and calibrated sub-agents.",
  "Private operator view",
  "every output returns to release-captain review",
  "contract.commandHierarchy",
  "contract.chiefAgentLanes",
  "contract.agentLanes",
  "contract.calibrationRules",
  "contract.finalValidatorRules",
  "contract.futureForecastLanes",
]);

expect(panelPath, [
  "Chief-agent council",
  "Calibration and final validation",
  "Future forecast lanes",
  "They do not approve merges, launches, provider configuration, payment mapping, report release, or customer-facing claims.",
]);

expect(pagePath, [
  "AgentOperatingSystemPanel",
  "./agent-operating-system-panel",
  "<ProductionSmokeTargetPanel />",
  "<AgentOperatingSystemPanel />",
  "<OperatorReadinessMatrix />",
  "ClosedCommandCenterPanel",
  "resolveCommandCenterAccessState",
]);

forbidden(panelPath, [
  "agents can merge",
  "agents can approve launch",
  "agents can approve reports",
  "agents can access secrets",
  "rawPayload=",
  "rawEvidence=",
  "privateCustomerData=",
  "privateAuditPayload=",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed revenue",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Command center agent operating system panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center agent operating system panel validation passed.");

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

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
