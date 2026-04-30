import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/production-launch-final-blocker-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(panelPath, [
  "ProductionLaunchFinalBlockerPanel",
  "projectProductionLaunchFinalBlockers",
  "Final blocker control",
  "Operator-only launch claim blockers before any public, paid, or report launch claim.",
  "This panel does not launch the platform.",
  "does not expose protected provider details, private customer data, internal risk models, or private audit payloads",
  "finalBlockers.releaseState",
  "finalBlockers.publicClaimAllowed",
  "finalBlockers.paidClaimAllowed",
  "finalBlockers.reportClaimAllowed",
  "finalBlockers.blockers",
  "finalBlockers.safeNextActions",
]);

expect(panelPath, [
  "ownerConfigurationComplete: false",
  "productionSmokeComplete: false",
  "rollbackEvidenceComplete: false",
  "auditEvidenceComplete: false",
  "hardLocksClear: false",
  "Public launch claims stay blocked until every blocker has complete evidence.",
]);

expect(pagePath, [
  "ProductionLaunchFinalBlockerPanel",
  "./production-launch-final-blocker-panel",
  "<ProductionLaunchChecklistPanel />",
  "<ProductionLaunchFinalBlockerPanel />",
  "<OperatorReadinessMatrix />",
  "ClosedCommandCenterPanel",
  "resolveCommandCenterAccessState",
]);

expect(launchValidatorPath, [
  "command-center-production-launch-final-blocker-panel.mjs",
  "production-launch-final-blocker-panel.tsx",
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
  console.error("Command center production launch final blocker panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center production launch final blocker panel validation passed.");

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
