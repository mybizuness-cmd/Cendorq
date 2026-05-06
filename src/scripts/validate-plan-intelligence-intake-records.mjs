import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const intakeRecordPath = "src/lib/plan-intelligence-intake-records.ts";
const freeCheckApiPath = "src/app/api/free-check/route.ts";
const revenueRuntimePath = "src/lib/customer-revenue-workflow-runtime.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-plan-intelligence-intake-records.mjs";

expect(intakeRecordPath, [
  "PlanIntelligenceIntakeRecord",
  "PlanIntelligenceIntakeFieldRecord",
  "completionState",
  "ready-to-start",
  "needs-more-context",
  "blocked-by-safety",
  "minimumInputs",
  "bestInputs",
  "missingMinimumInputs",
  "capturedMinimumInputs",
  "evidenceToCollect",
  "contextToClarify",
  "rejectedInformation",
  "analysisMethod",
  "outputStructure",
  "deliveryStandard",
  "nextWorkflowAction",
  "unsafeInputWarning",
  "projectFreeScanIntakeRecordFromPayload",
  "detectUnsafeIntakeFields",
  "Every intake record must separate captured minimum inputs, missing minimum inputs, optional best inputs, and blocked unsafe inputs.",
  "Build Fix records must block production work until fix target, approved business details, scope boundary, and approval contact are clear.",
  "Ongoing Control records must require monitoring scope, monthly priority, cadence, and history posture before monthly control is treated as active.",
]);

expect(freeCheckApiPath, [
  "projectFreeScanIntakeRecordFromPayload",
  "PlanIntelligenceIntakeRecord",
  "planIntelligenceIntake",
  "projectFreeScanIntakeRecordFromPayload(parsedBody, \"free-scan-validation-blocked\")",
  "projectFreeScanIntakeRecordFromPayload(normalized, `${id}-free-scan-intake`)",
  "match.planIntelligenceIntake",
  "entry.planIntelligenceIntake.completionState",
  "entry.planIntelligenceIntake.nextWorkflowAction",
  "...entry.planIntelligenceIntake.missingMinimumInputs",
]);

expect(revenueRuntimePath, [
  "projectPlanIntelligenceIntakeRecord",
  "PlanIntelligenceIntakeRecord",
  "capturedIntakeFields",
  "blockedIntakeFields",
  "BASE_CAPTURED_FIELDS_BY_PLAN",
  "planIntelligenceIntake",
  "plan_intelligence_intake_record_key",
  "plan_intelligence_completion_state",
  "plan_intelligence_missing_minimum_inputs",
  "plan_intelligence_next_workflow_action",
  "plan_intelligence_intake_record_created",
  "dashboardNotification: `${plan.name} unlocked. ${planIntelligenceIntake.nextWorkflowAction}`",
]);

expect(routesChainPath, [validatorPath]);

forbidden(intakeRecordPath, [
  "collect everything",
  "all fields required",
  "ignore missing",
  "unsafe inputs allowed",
]);

forbidden(freeCheckApiPath, [
  "raw password",
  "raw token",
  "card number accepted",
]);

boundedLength(intakeRecordPath, 14000);
boundedLength(revenueRuntimePath, 12000);

if (failures.length) {
  console.error("Plan intelligence intake records validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plan intelligence intake records validation passed with Free Scan intake records, paid plan intake projections, unsafe input guards, and workflow metadata.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for plan intelligence intake record standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
