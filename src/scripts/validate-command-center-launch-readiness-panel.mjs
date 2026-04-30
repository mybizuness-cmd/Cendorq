import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/platform-launch-readiness-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(panelPath, [
  "PlatformLaunchReadinessPanel",
  "projectPlatformLaunchReadiness",
  "Private launch readiness",
  "Operator-only release state, blockers, evidence gaps, and hard launch locks.",
  "Private operator-only launch readiness projection. Not customer-facing.",
  "safe decision state, evidence gaps, next actions, and launch locks",
  "without raw payloads, raw evidence, raw billing data, secrets, prompts, internal notes, operator identities, or customer data",
  "launchReadiness.decision",
  "launchReadiness.safeSummary",
  "launchReadiness.safeNextActions",
  "launchReadiness.readyGroups",
  "launchReadiness.blockedGroups",
  "launchReadiness.evidenceGaps",
  "launchReadiness.hardLaunchLocks",
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
  "PlatformLaunchReadinessPanel",
  "./platform-launch-readiness-panel",
  "<OperatorControlInterfacePanel />",
  "<PlatformLaunchReadinessPanel />",
  "<OperatorReadinessMatrix />",
  "resolveCommandCenterAccessState",
  "ClosedCommandCenterPanel",
]);

expect(launchValidatorPath, [
  "Platform launch readiness contracts validation passed, including runtime projection coverage.",
  "platform-launch-readiness-runtime.ts",
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
  console.error("Command center launch readiness panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center launch readiness panel validation passed.");

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
