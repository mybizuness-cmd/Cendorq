import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/production-smoke-target-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(panelPath, [
  "ProductionSmokeTargetPanel",
  "projectProductionSmokeTarget",
  "Production smoke target",
  "Operator-only smoke posture for public, protected, command-center, and evidence routes.",
  "Passing route posture does not equal public launch approval",
  "does not store raw route output",
  "smokeTarget.targetName",
  "smokeTarget.passCount",
  "smokeTarget.blockedCount",
  "smokeTarget.publicLaunchAllowed",
  "smokeTarget.records",
]);

expect(panelPath, [
  "public-conversion-routes",
  "protected-api-routes",
  "command-center-routes",
  "launch-evidence-routes",
  "reachable-public-safe",
  "generic-safe-denial-without-session",
  "closed-by-default",
  "operator-only-safe-projection",
]);

expect(pagePath, [
  "ProductionSmokeTargetPanel",
  "./production-smoke-target-panel",
  "<LaunchEvidencePanel />",
  "<ProductionSmokeTargetPanel />",
  "<OperatorReadinessMatrix />",
  "ClosedCommandCenterPanel",
  "resolveCommandCenterAccessState",
]);

expect(launchValidatorPath, [
  "command-center-production-smoke-target-panel.mjs",
  "production-smoke-target-panel.tsx",
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
  console.error("Command center production smoke target panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center production smoke target panel validation passed.");

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
