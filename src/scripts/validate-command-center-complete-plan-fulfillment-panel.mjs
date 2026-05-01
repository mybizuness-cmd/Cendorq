import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/complete-plan-fulfillment-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const runtimePath = "src/lib/complete-plan-fulfillment-runtime.ts";
const entitlementPath = "src/lib/plan-entitlement-routing-contracts.ts";
const planValidatorPath = "src/scripts/validate-plan-delivery-orchestration-contracts.mjs";
const failures = [];

expect(panelPath, [
  "CompletePlanFulfillmentPanel",
  "projectCompletePlanFulfillment",
  "Complete plan fulfillment",
  "A-to-Z plan delivery cockpit",
  "VisualMatrixOverview",
  "ProgressRail",
  "GateGrid",
  "VisualPostureCard",
  "StatusPill",
  "visualStages",
  "Stage completion",
  "A-to-Z visual fulfillment map",
  "operator visual",
]);

expect(panelPath, [
  "value, education, boundaries, conversion, stages, artifacts, and approval",
  "Private operator view for ensuring each plan delivers more value than its price",
  "protects higher-tier revenue streams",
  "evidence-led plan fit",
  "Customer education",
  "Value and boundary",
  "Customer education reviewed",
  "Value above price reviewed",
  "Plan boundary protected",
  "Conversion method approved",
  "Release-captain approved",
  "Customer-facing delivery allowed",
  "Upgrade / retention allowed",
]);

expect(panelPath, [
  "intake",
  "evidence",
  "education",
  "value",
  "boundary",
  "conversion",
  "approval",
  "delivery",
  "from-violet-300 via-sky-300 to-emerald-300",
  "border-emerald-200/20 bg-emerald-200/10",
  "border-amber-200/20 bg-amber-200/10",
  "border-rose-200/20 bg-rose-200/10",
]);

expect(pagePath, [
  "CompletePlanFulfillmentPanel",
  "./complete-plan-fulfillment-panel",
  "<PlanDeliveryOrchestrationPanel />",
  "<CompletePlanFulfillmentPanel />",
  "<OptimizationLibraryPanel methods={optimizationMethods} />",
  "ClosedCommandCenterPanel",
  "resolveCommandCenterAccessState",
]);

expect(runtimePath, [
  "projectCompletePlanFulfillment",
  "customerEducationReviewed",
  "valueExceedsPriceReviewed",
  "planBoundaryProtected",
  "conversionMethodApproved",
  "customerFacingDeliveryAllowed",
  "upgradeOrRetentionAllowed",
]);

expect(entitlementPath, [
  "PLAN_ENTITLEMENT_ROUTING_CONTRACT",
  "publicPlanMicroDisclosures",
  "dashboardReminderRules",
  "reportLimitationRules",
  "loopholeProtections",
]);

expect(planValidatorPath, [
  "src/lib/complete-plan-fulfillment-runtime.ts",
  "src/lib/plan-entitlement-routing-contracts.ts",
  "projectCompletePlanFulfillment",
  "PLAN_ENTITLEMENT_ROUTING_CONTRACT",
]);

forbidden(panelPath, [
  "deliveryAllowed: true",
  "customerFacingDeliveryAllowed: true",
  "upgradeOrRetentionAllowed: true",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency",
  "password=",
  "token=",
  "privateKey=",
  "cardNumber=",
  "bankDetail=",
  "rawPayload=",
  "rawEvidence=",
  "operatorIdentity=",
  "internalNote=",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Command center complete plan fulfillment panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center complete plan fulfillment panel validation passed.");

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
