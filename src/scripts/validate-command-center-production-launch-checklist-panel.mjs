import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/production-launch-checklist-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(panelPath, [
  "ProductionLaunchChecklistPanel",
  "projectProductionLaunchChecklist",
  "Private launch checklist",
  "Operator-safe production checklist with launch blockers and next actions.",
  "not customer-facing",
  "does not declare public launch",
  "does not expose raw evidence, internal notes, operator identity, protected provider details, or private customer data",
  "productionChecklist.decision",
  "productionChecklist.readyCount",
  "productionChecklist.blockedCount",
  "productionChecklist.checklist",
  "productionChecklist.blockedLaunchReasons",
  "productionChecklist.nextOperatorActions",
]);

expect(panelPath, [
  "verifiedMain: true",
  "validateRoutesWired: true",
  "validateRoutesPassing: true",
  "vercelGreen: true",
  "productionSmokeConfigured: false",
  "productionSmokePassed: false",
  "ownerPaymentConfigReady: false",
  "authProviderConfigured: false",
  "serverOnlySecretsConfigured: false",
  "rollbackPlanReady: false",
  "auditPlanReady: false",
  "criticalLockActive: false",
]);

expect(pagePath, [
  "ProductionLaunchChecklistPanel",
  "./production-launch-checklist-panel",
  "<PlatformLaunchReadinessPanel />",
  "<ProductionLaunchChecklistPanel />",
  "<OperatorReadinessMatrix />",
  "ClosedCommandCenterPanel",
  "resolveCommandCenterAccessState",
]);

expect(launchValidatorPath, [
  "command-center-production-launch-checklist-panel.mjs",
  "production-launch-checklist-panel.tsx",
]);

forbidden(panelPath, [
  "rawPayload=",
  "rawEvidence=",
  "rawBillingData=",
  "secret=",
  "password=",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
  "privateKey=",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed revenue",
  "impossible to hack",
  "never liable",
  "liability-free",
  "delete audit records",
]);

if (failures.length) {
  console.error("Command center production launch checklist panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center production launch checklist panel validation passed.");

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
