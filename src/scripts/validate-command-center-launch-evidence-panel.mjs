import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/launch-evidence-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(panelPath, [
  "LaunchEvidencePanel",
  "projectLaunchEvidenceBatch",
  "summarizeLaunchEvidenceReadiness",
  "Launch evidence",
  "Append-only evidence posture for owner config, smoke, rollback, audit, and hard-lock clearance.",
  "Operator-only evidence view.",
  "does not create public, paid, or report launch claims",
  "never exposes raw source evidence, protected provider details, private customer data, internal notes, or private audit payloads",
  "evidenceSummary.recordedCount",
  "evidenceSummary.pendingCount",
  "evidenceSummary.blockedCount",
  "evidenceSummary.publicClaimAllowed",
  "evidenceRows",
]);

expect(panelPath, [
  "owner-configuration-evidence",
  "production-smoke-evidence",
  "rollback-evidence",
  "audit-evidence",
  "hard-lock-clearance-evidence",
  "appendOnly",
  "Pending evidence is not complete evidence",
  "evidence records alone never create public launch readiness",
]);

expect(pagePath, [
  "LaunchEvidencePanel",
  "./launch-evidence-panel",
  "<ProductionLaunchFinalBlockerPanel />",
  "<LaunchEvidencePanel />",
  "<OperatorReadinessMatrix />",
  "ClosedCommandCenterPanel",
  "resolveCommandCenterAccessState",
]);

expect(launchValidatorPath, [
  "command-center-launch-evidence-panel.mjs",
  "launch-evidence-panel.tsx",
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
  console.error("Command center launch evidence panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center launch evidence panel validation passed.");

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
