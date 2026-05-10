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
  "Operator visibility for plan stops, direct purchases, late add-ons, warning emails, dashboard-message mirrors, safe documents, and one-time inbox confirmation.",
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
  "Direct Signal Repair",
  "Direct Readiness Control",
  "Late AI Readiness Review after Signal Repair",
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
  "selectedPlanLabel",
  "dashboardMessageMirrorRequired",
  "safeDocumentDeliveryMustMatchVault",
  "mirror",
  "documents",
]);

expect(panelPath, [
  "dashboard-message mirror requirement",
  "safe-document state",
  "Customer starts with Signal Repair",
  "protecting AI Readiness Review entitlement and safe document boundaries",
  "Customer starts with Readiness Control",
  "recommends Signal Repair only when evidence supports it",
  "dashboard-message, and safe-document cadence",
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
  "selectedPlanLabel",
  "dashboardMessageMirrorRequired",
  "safeDocumentDeliveryMustMatchVault",
  "signal-repair-direct-scope-confirmation",
  "readiness-control-direct-scope-confirmation",
  "aiReadinessReviewAlreadyActive",
  "signalRepairDeliveryAlreadyApproved",
  "warningEmailWithoutEvidence",
  "inboxConfirmationAlreadyCompleted",
  "material-rework-change-order",
  "Released reports, billing documents, and PDFs remain vault-first",
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
  "Direct Build Fix",
  "Direct Monthly",
  "Late Deep Review after Build Fix",
  "Customer starts with Optimization",
  "Customer starts with Monthly",
  "skipped Full Scan",
  "Deep Review after Build Fix",
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

console.log("Command center plan routing runtime panel validation passed with current plan language, dashboard-message mirror visibility, safe-document state, warning-email suppression, reconciliation, and safe customer language coverage.");

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
