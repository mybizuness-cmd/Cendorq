import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const acquisitionPath = "src/lib/plan-intelligence-acquisition-system.ts";
const orchestrationPath = "src/lib/plan-delivery-orchestration-contracts.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-plan-intelligence-acquisition-system.mjs";

expect(acquisitionPath, [
  "PLAN_INTELLIGENCE_ACQUISITION_SYSTEM",
  "PLAN_INTELLIGENCE_ACQUISITION_RULES",
  "What is the first visible signal that may be costing customer choices?",
  "What is the real cause behind customer hesitation, and what should be fixed first?",
  "What specific weak point can be improved now, and what must stay in scope?",
  "What changed this month, what matters now, and what should be watched or acted on next?",
  "minimumInputs",
  "bestInputs",
  "evidenceToCollect",
  "contextToClarify",
  "informationToReject",
  "analysisMethod",
  "outputStructure",
  "valueMaximizer",
  "planSpecificFailureMode",
  "Free Scan fails when it becomes a shallow teaser, a full diagnosis, or a generic checklist instead of a sharp first signal.",
  "Deep Review fails when it becomes generic advice, implementation work, or a long audit without cause-level priority.",
  "Build Fix fails when it becomes unlimited implementation, starts before scope clarity, or fixes symptoms without a clear target.",
  "Ongoing Control fails when it becomes generic monthly noise, unlimited Build Fix, repeated full diagnosis, or unsupported performance attribution.",
  "Build Fix must not start production work until the fix target, approved business details, scope boundary, and approval contact are clear.",
  "Ongoing Control must compare current evidence against history and choose a monthly priority instead of creating generic status noise.",
]);

expect(orchestrationPath, [
  "intelligenceAcquisitionStandard",
  "intelligenceAcquisitionContracts",
  "intelligenceAcquisitionProjections",
  "projectPlanIntelligenceAcquisition(\"free-scan\")",
  "projectPlanIntelligenceAcquisition(\"deep-review\")",
  "projectPlanIntelligenceAcquisition(\"build-fix\")",
  "projectPlanIntelligenceAcquisition(\"ongoing-control\")",
  "planWithoutIntelligenceAcquisition",
  "planWithoutMinimumInputs",
  "planWithoutBestInputs",
  "planWithoutInformationRejection",
  "planWithoutAnalysisMethod",
  "planWithoutPlanSpecificOutputStructure",
  "planWithoutValueMaximizer",
  "No plan lifecycle can be considered complete until intelligence acquisition, intake, evidence, delivery, email, follow-up, agent ownership, approval gates, and fulfillment boundaries are represented.",
]);

expect(routesChainPath, [validatorPath]);

forbidden(acquisitionPath, [
  "collect everything",
  "ask for passwords",
  "guaranteed revenue",
  "unlimited implementation",
  "ranking guarantees",
  "AI placement guarantees",
]);

boundedLength(acquisitionPath, 18000);
boundedLength(orchestrationPath, 18000);

if (failures.length) {
  console.error("Plan intelligence acquisition validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plan intelligence acquisition validation passed with plan-specific inputs, evidence, rejection rules, methods, outputs, value maximizers, and failure modes.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for the plan intelligence acquisition standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
