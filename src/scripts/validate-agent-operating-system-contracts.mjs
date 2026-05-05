import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/agent-operating-system-contracts.ts";
const freeScanFormPath = "src/components/free-check/guided-free-check-form-v2.tsx";
const freeScanZeroValidatorPath = "src/scripts/validate-free-scan-zero-start-progress.mjs";
const panelPath = "src/app/command-center/agent-operating-system-panel.tsx";
const panelValidatorPath = "src/scripts/validate-command-center-agent-operating-system-panel.mjs";
const ownerEvidencePanelPath = "src/app/command-center/owner-configuration-evidence-panel.tsx";
const ownerEvidencePanelValidatorPath = "src/scripts/validate-command-center-owner-configuration-evidence-panel.mjs";
const pagePath = "src/app/command-center/page.tsx";
const packagePath = "package.json";
const failures = [];

expect(contractPath, [
  "AGENT_OPERATING_SYSTEM_CONTRACT",
  "AGENT_OPERATING_SYSTEM_BLOCKED_PATTERNS",
  "Cendorq Agent Operating System Contract",
  "owner-command",
  "release-captain",
  "chief-agent-council",
  "scoped-sub-agents",
  "execution-command-and-final-validation",
  "domain-command-support-only",
  "task-support-only",
]);

expect(contractPath, [
  "chief-report-truth-agent",
  "chief-product-experience-agent",
  "chief-security-command-agent",
  "chief-growth-forecast-agent",
  "Chief report truth agent",
  "Chief product experience agent",
  "Chief security and command agent",
  "Chief growth and forecast agent",
]);

expect(contractPath, [
  "report-truth-research-scout",
  "evidence-conflict-scout",
  "industry-context-scout",
  "report-design-quality-scout",
  "security-privacy-scout",
  "conversion-luxury-ui-scout",
  "validation-drift-scout",
  "customer-journey-scout",
  "future-platform-scout",
  "business-change-forecasting-scout",
  "analytics-and-growth-scout",
  "operator-command-scout",
]);

expect(contractPath, [
  "Every chief agent and sub-agent must be calibrated against Cendorq truth, safety, privacy, luxury UI, conversion ethics, report usefulness, validation, and launch-gate standards before its findings are accepted.",
  "Agents must use a proof-before-output posture: identify source basis, uncertainty, assumptions, limitations, and verification gaps before proposing customer-facing conclusions.",
  "Agents must start building safe pre-customer knowledge maps for industries, business models, traffic channels, platform changes, and market risks before customer submissions arrive.",
  "Agents must not treat pre-customer learning as customer-specific truth; it is context only until matched with customer input and external evidence.",
  "Chief agents must reject low-confidence, unsourced, speculative, or unsupported sub-agent findings before they reach release captain review.",
  "Release captain final validation is still required even after chief-agent review.",
]);

expect(contractPath, [
  "Every agent output must return to the release captain for final review, reverification, approval, rejection, or conversion into a scoped branch.",
  "The release captain is the final validator for agent findings, code proposals, copy proposals, report-truth proposals, launch posture, customer-facing content, and validation coverage.",
  "No agent-created recommendation may reach customers until it passes release captain review, validation coverage, and the appropriate approval gate.",
  "The release captain must reconcile conflicts between agents and preserve the stricter safety, truth, privacy, and customer-trust interpretation.",
]);

expect(contractPath, [
  "Reports must not rely solely on customer-submitted information when external evidence can be gathered safely.",
  "Customer-submitted information may be used when relevant, but must be labeled or treated as customer-provided context unless independently verified.",
  "External evidence, customer-provided context, assumptions, inferences, limitations, confidence, and next actions must stay separated in report logic and customer-facing explanation.",
  "Contradictions between customer-provided information and external evidence must be surfaced as evidence conflicts, not hidden or treated as certainty.",
  "Reports must use the strongest available evidence without claiming impossible 100 percent certainty.",
  "Reports may describe high-confidence, evidence-backed findings, but must not claim guaranteed accuracy, guaranteed outcomes, guaranteed revenue, guaranteed ROI, or absolute completeness.",
]);

expect(contractPath, [
  "post-website-mobile-app",
  "controlled-maintenance-engine",
  "market-learning-command",
  "international-expansion",
  "enterprise-and-partner-readiness",
  "analytics-and-growth-intelligence",
  "business-change-forecasting",
  "Anticipate market, search, platform, customer behavior, competitor, pricing, compliance, and technology changes that may affect customer businesses before they become urgent.",
]);

expect(contractPath, [
  "agentFinalApprovalAuthority",
  "agentBypassesReleaseCaptain",
  "chiefAgentFinalAuthority",
  "uncalibratedAgentFindings",
  "agentMergeAuthority",
  "agentLaunchApprovalAuthority",
  "agentReportReleaseAuthority",
  "agentProviderConfigAuthority",
  "agentPaymentMappingAuthority",
  "agentSecretAccessAuthority",
  "agentProductionMutationAuthority",
  "agentValidationBypass",
  "agentVercelBypass",
  "agentMergeabilityBypass",
  "agentRawPayloadAccess",
  "agentRawEvidenceAccess",
  "agentPrivateCustomerDataAccess",
  "agentGuaranteedAccuracyClaim",
  "customerOnlyReportTruth",
  "unverifiedCustomerClaimAsFact",
  "hiddenEvidenceConflict",
  "preCustomerContextTreatedAsCustomerTruth",
  "uncontrolledAgentDrift",
]);

expect(freeScanFormPath, [
  "country: \"\"",
  "Select country",
  "hasMeaningfulInput",
  "const progress = hasStartedScan ? Math.round(((step + 1) / STEPS.length) * 100) : 0;",
  "Object.values(values).some((value) => value.trim().length > 0)",
  "<option value=\"\">Select country</option>",
]);
expect(freeScanZeroValidatorPath, ["Free Scan zero-start progress validation passed.", "validate-free-scan-zero-start-progress.mjs"]);

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
expect(panelValidatorPath, [
  "Command center agent operating system panel validation passed.",
  "AgentOperatingSystemPanel",
  "agent-operating-system-panel.tsx",
]);

expect(ownerEvidencePanelPath, [
  "OwnerConfigurationEvidencePanel",
  "summarizeOwnerConfigurationEvidence",
  "Owner configuration evidence",
  "Private owner approval posture for auth, payments, protected runtime, launch contact, and support identity.",
  "Missing or pending evidence is not complete",
  "owner evidence alone never creates public launch, paid launch, report launch, or security readiness approval",
  "ownerEvidence.approvedCount",
  "ownerEvidence.pendingCount",
  "ownerEvidence.missingCount",
  "ownerEvidence.paidLaunchAllowed",
  "ownerEvidence.projections",
]);
expect(ownerEvidencePanelPath, [
  "auth-provider-configuration",
  "payment-mapping-configuration",
  "protected-runtime-configuration",
  "launch-contact-configuration",
  "support-identity-configuration",
  "approvalStatus: \"pending\"",
  "approvalStatus: \"missing\"",
  "Public launch: {projection.publicLaunchAllowed ? \"allowed\" : \"blocked\"}",
  "Paid launch: {projection.paidLaunchAllowed ? \"allowed\" : \"blocked\"}",
]);
expect(ownerEvidencePanelValidatorPath, [
  "Command center owner configuration evidence panel validation passed",
  "OwnerConfigurationEvidencePanel",
  "owner-configuration-evidence-panel.tsx",
]);

expect(pagePath, [
  "AgentOperatingSystemPanel",
  "OwnerConfigurationEvidencePanel",
  "./agent-operating-system-panel",
  "./owner-configuration-evidence-panel",
  "<ProductionSmokeTargetPanel />",
  "<AgentOperatingSystemPanel />",
  "<OwnerConfigurationEvidencePanel />",
  "<OperatorReadinessMatrix />",
  "ClosedCommandCenterPanel",
  "resolveCommandCenterAccessState",
]);

expect(packagePath, ["validate:routes", "validate-agent-operating-system-contracts.mjs"]);

forbidden(contractPath, [
  "agents may merge code",
  "agents can approve launch",
  "agents can approve report launch",
  "agents can access secrets",
  "agents can mutate production",
  "chief agents can approve release",
  "skip vercel",
  "skip mergeability",
  "customer claims are facts",
  "reports are 100% certain",
  "guaranteed accuracy",
  "guaranteed revenue",
  "guaranteed ROI",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

forbidden(freeScanFormPath, [
  "country: \"United States\"",
  "const progress = Math.round(((step + 1) / STEPS.length) * 100);",
  "8% complete",
  "default scan strength 8",
  "prefilled country",
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

forbidden(ownerEvidencePanelPath, [
  "publicLaunchAllowed: true",
  "paidLaunchAllowed: true",
  "rawProviderPayload=",
  "paymentProviderPayload=",
  "protectedConfigValue=",
  "privateCredentialMaterial=",
  "operatorPrivateIdentity=",
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
  console.error("Agent operating system contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Agent operating system contracts validation passed, including Free Scan zero-start, agent panel, and owner evidence panel coverage.");

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
    if (containsUnsafeClaim(text, phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function containsUnsafeClaim(text, phrase) {
  let index = text.indexOf(phrase);
  while (index !== -1) {
    const paragraphStart = Math.max(0, text.lastIndexOf("\n\n", index));
    const nextParagraphBreak = text.indexOf("\n\n", index);
    const paragraphEnd = nextParagraphBreak === -1 ? text.length : nextParagraphBreak;
    const paragraph = text.slice(paragraphStart, paragraphEnd);
    const window = text.slice(Math.max(0, index - 240), Math.min(text.length, index + phrase.length + 240));
    const context = `${paragraph}\n${window}`;
    const safeProhibition = [
      "must never",
      "must not",
      "must not claim",
      "do not",
      "does not",
      "not to",
      "not an",
      "not a",
      "never claim",
      "never imply",
      "avoid",
      "without",
      "cannot",
      "blocked",
      "disallowed",
      "no agent",
      "no agent-created",
      "must not act",
      "must not create",
      "must not weaken",
      "false",
      "allowed: false",
    ].some((marker) => context.includes(marker));

    if (!safeProhibition) return true;
    index = text.indexOf(phrase, index + phrase.length);
  }
  return false;
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
