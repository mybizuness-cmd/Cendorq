import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const playbookPath = "src/lib/cendorq-agent-intelligence-playbooks.ts";
const panelPath = "src/app/command-center/cendorq-agent-intelligence-playbooks-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-cendorq-agent-intelligence-playbooks.mjs";

expect(playbookPath, [
  "CendorqAgentDecisionPlaybook",
  "CENDORQ_AGENT_INTELLIGENCE_SYSTEM_RULES",
  "CENDORQ_AGENT_DECISION_PLAYBOOKS",
  "getCendorqAgentIntelligencePlaybooks",
  "getCendorqAgentIntelligencePlaybook",
  "customer acquisition problem",
  "AI-era visibility signal",
  "evidence basis",
  "confidence and limitation",
  "next best action",
  "forecast risk",
  "Customer-facing promises must focus on helping the business become easier to find, understand, trust, compare, and choose; the 5-to-10-year adaptation goal belongs to Cendorq's internal system, not as a customer guarantee.",
  "guaranteed AI placement",
  "conversion-luxury-ui-scout",
  "cheap-looking blocks",
  "bulky pricing paths",
  "forms too low or too noisy",
  "business-change-forecasting-scout",
  "platform-change-watch",
]);

expect(panelPath, [
  "Cendorq agent intelligence playbooks",
  "Agents now diagnose acquisition, AI visibility, conversion, trust, and forecast risk.",
  "Customer-facing language stays bounded",
  "Long-term search adaptation remains an internal Cendorq system standard.",
  "Required finding shape",
  "System rules",
]);

expect(pagePath, [
  "CendorqAgentIntelligencePlaybooksPanel",
  "./cendorq-agent-intelligence-playbooks-panel",
  "<CendorqAgentIntelligencePlaybooksPanel />",
]);

expect(routesChainPath, [validatorPath]);

boundedLength(playbookPath, 30000);
boundedLength(panelPath, 12000);

if (failures.length) {
  console.error("Cendorq agent intelligence playbooks validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Cendorq agent intelligence playbooks validation passed with AI visibility, customer acquisition diagnosis, forecast posture, plan boundaries, and design critique coverage.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for Cendorq agent intelligence playbook standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
