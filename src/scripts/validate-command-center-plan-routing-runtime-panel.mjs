import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/plan-routing-runtime-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const runtimePath = "src/lib/plan-routing-runtime.ts";
const planValidatorPath = "src/scripts/validate-plan-delivery-orchestration-contracts.mjs";
const failures = [];

expect(panelPath, [
  "PlanRoutingRuntimePanel",
  "projectPlanRouting",
  "type PlanRoutingInput",
  "Plan routing runtime",
  "Operator visibility for plan stops, direct purchases, late add-ons, warning emails, and one-time inbox confirmation.",
  "Decision matrix",
  "safe projection",
  "Safe customer language",
  "Warning suppressions",
  "Inbox suppressions",
  "Next best plan",
  "Reconciliation",
  "Blocked patterns",
]);

expect(panelPath, [
  "Free Scan stop",
  "Direct Build Fix",
  "Direct Monthly",
  "Late Deep Review after Build Fix",
  "First signup inbox confirmation",
  "linear-stop",
  "direct-purchase",
  "late-add-on",
  "activeEntitlements",
  "inboxConfirmationCompleted",
  "warningEmailAllowed",
  "inboxConfirmationAllowed",
  "reconciliationOutcome",
  "customerOwnedProjectionReady",
]);

expect(pagePath, [
  "PlanRoutingRuntimePanel",
  "./plan-routing-runtime-panel",
  "<PlanDeliveryOrchestrationPanel />",
  "<PlanRoutingRuntimePanel />",
  "<OptimizationLibraryPanel methods={optimizationMethods} />",
  "ClosedCommandCenterPanel",
  "resolveCommandCenterAccessState",
]);

expect(runtimePath, [
  "projectPlanRouting",
  "PlanRoutingProjection",
  "warningEmailWithoutEvidence",
  "inboxConfirmationAlreadyCompleted",
  "material-rework-change-order",
  "safeCustomerLanguage",
]);

expect(planValidatorPath, [
  "src/app/command-center/plan-routing-runtime-panel.tsx",
  "PlanRoutingRuntimePanel",
  "warningEmailAllowed",
  "inboxConfirmationAllowed",
  "reconciliationOutcome",
]);

forbidden(panelPath, [
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "guaranteed inbox",
  "guaranteed primary inbox",
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
  console.error("Command center plan routing runtime panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center plan routing runtime panel validation passed.");

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
