import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/platform-launch-readiness-contracts.ts";
const runtimePath = "src/lib/platform-launch-readiness-runtime.ts";
const runtimeValidatorPath = "src/scripts/validate-platform-launch-readiness-runtime.mjs";
const commandCenterLaunchPanelPath = "src/app/command-center/platform-launch-readiness-panel.tsx";
const commandCenterPagePath = "src/app/command-center/page.tsx";
const commandCenterLaunchPanelValidatorPath = "src/scripts/validate-command-center-launch-readiness-panel.mjs";
const auditApiContractPath = "src/lib/platform-launch-readiness-audit-api-contracts.ts";
const auditApiValidatorPath = "src/scripts/validate-platform-launch-readiness-audit-api-contracts.mjs";
const apiRuntimePath = "src/lib/platform-launch-readiness-api-runtime.ts";
const apiRuntimeValidatorPath = "src/scripts/validate-platform-launch-readiness-api-runtime.mjs";
const apiRoutesValidatorPath = "src/scripts/validate-platform-launch-readiness-api-routes.mjs";
const projectionRoutePath = "src/app/api/command-center/launch-readiness/route.ts";
const auditRoutePath = "src/app/api/command-center/launch-readiness/audit/route.ts";
const historyRoutePath = "src/app/api/command-center/launch-readiness/history/route.ts";
const productionChecklistPath = "src/lib/production-launch-checklist-runtime.ts";
const productionChecklistValidatorPath = "src/scripts/validate-production-launch-checklist-runtime.mjs";
const productionChecklistPanelPath = "src/app/command-center/production-launch-checklist-panel.tsx";
const productionChecklistPanelValidatorPath = "src/scripts/validate-command-center-production-launch-checklist-panel.mjs";
const finalBlockerPath = "src/lib/production-launch-final-blocker-contracts.ts";
const finalBlockerValidatorPath = "src/scripts/validate-production-launch-final-blocker-contracts.mjs";
const finalBlockerRuntimePath = "src/lib/production-launch-final-blocker-runtime.ts";
const finalBlockerRuntimeValidatorPath = "src/scripts/validate-production-launch-final-blocker-runtime.mjs";
const finalBlockerPanelPath = "src/app/command-center/production-launch-final-blocker-panel.tsx";
const finalBlockerPanelValidatorPath = "src/scripts/validate-command-center-production-launch-final-blocker-panel.mjs";
const launchEvidenceContractPath = "src/lib/launch-evidence-persistence-contracts.ts";
const launchEvidenceValidatorPath = "src/scripts/validate-launch-evidence-persistence-contracts.mjs";
const launchEvidenceRuntimePath = "src/lib/launch-evidence-persistence-runtime.ts";
const launchEvidenceRuntimeValidatorPath = "src/scripts/validate-launch-evidence-persistence-runtime.mjs";
const launchEvidencePanelPath = "src/app/command-center/launch-evidence-panel.tsx";
const launchEvidencePanelValidatorPath = "src/scripts/validate-command-center-launch-evidence-panel.mjs";
const launchEvidenceApiRoutesValidatorPath = "src/scripts/validate-launch-evidence-api-routes.mjs";
const launchEvidenceRoutePath = "src/app/api/command-center/launch-readiness/evidence/route.ts";
const launchEvidenceRecordRoutePath = "src/app/api/command-center/launch-readiness/evidence/record/route.ts";
const smokeTargetPath = "src/lib/production-smoke-target-contracts.ts";
const smokeTargetValidatorPath = "src/scripts/validate-production-smoke-target-contracts.mjs";
const smokeTargetRuntimePath = "src/lib/production-smoke-target-runtime.ts";
const smokeTargetRuntimeValidatorPath = "src/scripts/validate-production-smoke-target-runtime.mjs";
const smokeTargetPanelPath = "src/app/command-center/production-smoke-target-panel.tsx";
const smokeTargetPanelValidatorPath = "src/scripts/validate-command-center-production-smoke-target-panel.mjs";
const productionSmokeApiRoutePath = "src/app/api/command-center/production-smoke/route.ts";
const productionSmokeApiRouteValidatorPath = "src/scripts/validate-production-smoke-api-routes.mjs";
const ownerEvidenceContractPath = "src/lib/owner-configuration-evidence-contracts.ts";
const ownerEvidenceValidatorPath = "src/scripts/validate-owner-configuration-evidence-contracts.mjs";
const packagePath = "package.json";
const failures = [];

expect(contractPath, ["PLATFORM_LAUNCH_READINESS_CONTRACT", "PLATFORM_LAUNCH_READINESS_BLOCKED_PATTERNS", "Platform Launch Readiness Contract", "public-entry-and-free-scan", "auth-session-and-welcome", "customer-platform-handoffs", "reports-and-vault", "billing-and-entitlements", "support-and-command-center", "maintenance-and-smoke"]);
expect(contractPath, ["production auth provider contracts validated", "one-time verified welcome email is validated", "customer platform handoff contracts validated", "report generation rendering contracts validation", "billing checkout contracts validation", "command center control interface validation", "controlled maintenance contracts validation", "production smoke finalization validation"]);
expect(contractPath, ["latest main commit is verified before release branch creation", "all validators are wired into validate:routes", "Vercel deployment is green for the release PR", "production smoke target is configured before production launch declaration", "owner-provided payment links or provider checkout config exist before paid checkout launch", "server-only secrets are configured outside browser-accessible code", "rollback plan exists for auth, billing, reports, support, and public conversion changes", "audit plan exists for auth, support, billing, report release, operator actions, and maintenance actions"]);

expect(ownerEvidenceContractPath, ["OWNER_CONFIGURATION_EVIDENCE_CONTRACT", "OWNER_CONFIGURATION_EVIDENCE_BLOCKED_PATTERNS", "Owner Configuration Evidence Contract", "auth-provider-configuration", "payment-mapping-configuration", "protected-runtime-configuration", "launch-contact-configuration", "support-identity-configuration", "Owner configuration evidence is command-center-only and never customer-facing.", "Missing owner configuration evidence must not be treated as complete.", "Pending owner configuration evidence must not be treated as complete.", "Owner configuration evidence alone must not create public launch approval.", "Owner configuration evidence alone must not create paid launch approval.", "Paid access still requires provider-confirmed entitlement and customer ownership checks."]);
expect(ownerEvidenceValidatorPath, ["Owner configuration evidence contracts validation passed.", "OWNER_CONFIGURATION_EVIDENCE_CONTRACT", "owner-configuration-evidence-contracts.ts"]);

expect(smokeTargetPath, ["PRODUCTION_SMOKE_TARGET_CONTRACT", "PRODUCTION_SMOKE_TARGET_BLOCKED_PATTERNS", "Production Smoke Target Contract", "Production smoke target must be owner-approved before public launch review.", "Default smoke must be read-only and non-mutating.", "Default smoke must not require privileged live configuration to pass.", "Protected route denial is a valid pass when the denial is generic, no-store, and does not reveal private state.", "Command center routes must remain closed by default without the approved operator access posture."]);
expect(smokeTargetPath, ["public-conversion-routes", "customer-platform-routes", "protected-api-routes", "command-center-routes", "launch-evidence-routes", "reachable-public-safe", "safe-auth-boundary-or-safe-render", "generic-safe-denial-without-session", "closed-by-default", "operator-only-safe-projection", "Do not treat smoke target configuration as production smoke completion.", "Do not allow smoke checks to mutate production state by default.", "smokeOnlyPublicLaunchClaim"]);
expect(smokeTargetValidatorPath, ["Production smoke target contracts validation passed.", "PRODUCTION_SMOKE_TARGET_CONTRACT", "production-smoke-target-contracts.ts"]);
expect(smokeTargetRuntimePath, ["projectProductionSmokeTarget", "projectProductionSmokeRoute", "ProductionSmokeRouteInput", "ProductionSmokeRouteProjection", "ProductionSmokeTargetSummary", "ProductionSmokeObservedPosture", "publicLaunchAllowed: false", "allowedRoute && matchesExpectedPosture ? \"pass\" : \"blocked\"", "redacted-safe-value"]);
expect(smokeTargetRuntimeValidatorPath, ["Production smoke target runtime validation passed.", "projectProductionSmokeTarget", "projectProductionSmokeRoute", "production-smoke-target-runtime.ts"]);
expect(smokeTargetPanelPath, ["ProductionSmokeTargetPanel", "projectProductionSmokeTarget", "Production smoke target", "Operator-only smoke posture for public, protected, command-center, and evidence routes.", "Passing route posture does not equal public launch approval", "does not store raw route output", "smokeTarget.records", "smokeTarget.publicLaunchAllowed"]);
expect(smokeTargetPanelValidatorPath, ["Command center production smoke target panel validation passed.", "ProductionSmokeTargetPanel", "production-smoke-target-panel.tsx"]);
expect(productionSmokeApiRoutePath, ["export async function GET", "resolveCommandCenterAccessState", "commandCenterPreviewHeaderName", "projectProductionSmokeTarget", "safeDeniedResponse", "safeLaunchReadinessHeaders", "NextResponse.json", "cache: \"no-store\"", "smoke: projection"]);
expect(productionSmokeApiRouteValidatorPath, ["Production smoke API routes validation passed.", "command-center/production-smoke/route.ts"]);

expect(launchEvidenceContractPath, ["LAUNCH_EVIDENCE_PERSISTENCE_CONTRACT", "Launch Evidence Persistence Contract", "owner-configuration-evidence", "production-smoke-evidence", "rollback-evidence", "audit-evidence", "hard-lock-clearance-evidence", "Launch evidence records must be append-only.", "Launch evidence records must be operator-only and never customer-facing.", "Do not treat missing evidence as launch-ready.", "Do not allow evidence record deletion, rewrite, hidden overwrite, or production mutation from evidence persistence paths."]);
expect(launchEvidenceValidatorPath, ["Launch evidence persistence contracts validation passed.", "LAUNCH_EVIDENCE_PERSISTENCE_CONTRACT", "launch-evidence-persistence-contracts.ts"]);
expect(launchEvidenceRuntimePath, ["projectLaunchEvidence", "projectLaunchEvidenceBatch", "summarizeLaunchEvidenceReadiness", "LaunchEvidenceInput", "LaunchEvidenceProjection", "LaunchEvidencePersistenceResult", "appendOnly: true", "publicClaimAllowed: false", "paidClaimAllowed: false", "reportClaimAllowed: false", "redacted-safe-value"]);
expect(launchEvidenceRuntimeValidatorPath, ["Launch evidence persistence runtime validation passed.", "projectLaunchEvidence", "summarizeLaunchEvidenceReadiness", "launch-evidence-persistence-runtime.ts"]);
expect(launchEvidencePanelPath, ["LaunchEvidencePanel", "projectLaunchEvidenceBatch", "summarizeLaunchEvidenceReadiness", "Launch evidence", "Append-only evidence posture for owner config, smoke, rollback, audit, and hard-lock clearance.", "Operator-only evidence view.", "does not create public, paid, or report launch claims", "evidenceSummary.recordedCount", "evidenceSummary.pendingCount", "evidenceSummary.blockedCount", "evidenceRows"]);
expect(launchEvidencePanelValidatorPath, ["Command center launch evidence panel validation passed.", "LaunchEvidencePanel", "launch-evidence-panel.tsx"]);
expect(launchEvidenceRoutePath, ["export async function GET", "resolveCommandCenterAccessState", "projectLaunchEvidenceBatch", "summarizeLaunchEvidenceReadiness", "safeDeniedResponse", "safeLaunchReadinessHeaders", "owner-configuration-evidence", "production-smoke-evidence", "rollback-evidence", "audit-evidence", "hard-lock-clearance-evidence"]);
expect(launchEvidenceRecordRoutePath, ["export async function POST", "resolveCommandCenterAccessState", "projectLaunchEvidence", "readSafeEvidenceBody", "safeDeniedResponse", "safeLaunchReadinessHeaders", "Launch evidence submitted for operator review.", "Launch evidence submission could not be parsed safely."]);
expect(launchEvidenceApiRoutesValidatorPath, ["Launch evidence API routes validation passed.", "launch-readiness/evidence/route.ts", "launch-readiness/evidence/record/route.ts"]);

expect(finalBlockerPath, ["PRODUCTION_LAUNCH_FINAL_BLOCKER_CONTRACT", "Production Launch Final Blocker Contract", "owner-configuration", "production-smoke-target", "rollback-evidence", "audit-evidence", "hard-lock-clearance", "Do not state public launch readiness until every blocker group has complete evidence.", "Do not state security readiness as absolute safety; use defense-in-depth, risk reduction, auditability, and controlled access language.", "Final blocker checks are operator-only and never customer-facing.", "Final blocker checks may guide launch review but must not mutate production state."]);
expect(finalBlockerValidatorPath, ["Production launch final blocker contracts validation passed.", "PRODUCTION_LAUNCH_FINAL_BLOCKER_CONTRACT", "Production Launch Final Blocker Contract"]);
expect(finalBlockerRuntimePath, ["projectProductionLaunchFinalBlockers", "ProductionLaunchFinalBlockerInput", "ProductionLaunchFinalBlockerProjection", "ProductionLaunchFinalBlockerSummary", "ownerConfigurationComplete", "productionSmokeComplete", "rollbackEvidenceComplete", "auditEvidenceComplete", "hardLocksClear", "publicClaimAllowed: allComplete", "paidClaimAllowed: ownerComplete && hardLocksClear", "reportClaimAllowed: smokeComplete && rollbackComplete && auditComplete && hardLocksClear"]);
expect(finalBlockerRuntimeValidatorPath, ["Production launch final blocker runtime validation passed.", "projectProductionLaunchFinalBlockers", "production-launch-final-blocker-runtime.ts"]);
expect(finalBlockerPanelPath, ["ProductionLaunchFinalBlockerPanel", "projectProductionLaunchFinalBlockers", "Final blocker control", "Operator-only launch claim blockers before any public, paid, or report launch claim.", "This panel does not launch the platform.", "finalBlockers.releaseState", "finalBlockers.publicClaimAllowed", "finalBlockers.paidClaimAllowed", "finalBlockers.reportClaimAllowed", "finalBlockers.blockers", "finalBlockers.safeNextActions"]);
expect(finalBlockerPanelValidatorPath, ["Command center production launch final blocker panel validation passed.", "ProductionLaunchFinalBlockerPanel", "production-launch-final-blocker-panel.tsx"]);

expect(runtimePath, ["projectPlatformLaunchReadiness", "safeSummary", "readyGroups", "blockedGroups", "evidenceGaps", "safeNextActions", "hardLaunchLocks", "blockedPatterns"]);
expect(runtimeValidatorPath, ["Platform launch readiness runtime validation passed.", "projectPlatformLaunchReadiness"]);
expect(commandCenterLaunchPanelPath, ["PlatformLaunchReadinessPanel", "projectPlatformLaunchReadiness", "Private launch readiness", "safe API posture", "command-center-only no-store API routes"]);
expect(commandCenterPagePath, ["PlatformLaunchReadinessPanel", "ProductionLaunchChecklistPanel", "ProductionLaunchFinalBlockerPanel", "LaunchEvidencePanel", "ProductionSmokeTargetPanel", "./production-smoke-target-panel", "<ProductionSmokeTargetPanel />", "ClosedCommandCenterPanel", "resolveCommandCenterAccessState"]);
expect(commandCenterLaunchPanelValidatorPath, ["Command center launch readiness panel validation passed", "PlatformLaunchReadinessPanel"]);
expect(auditApiContractPath, ["PLATFORM_LAUNCH_READINESS_AUDIT_API_CONTRACT", "Platform Launch Readiness Audit and API Contract", "/api/command-center/launch-readiness", "/api/command-center/launch-readiness/audit", "/api/command-center/launch-readiness/history", "append-only audit event"]);
expect(auditApiValidatorPath, ["Platform launch readiness audit API contracts validation passed.", "PLATFORM_LAUNCH_READINESS_AUDIT_API_CONTRACT"]);
expect(apiRuntimePath, ["getLaunchReadinessProjectionResponse", "recordLaunchReadinessAudit", "getLaunchReadinessAuditHistoryResponse", "safeLaunchReadinessHeaders", "safeDeniedResponse", "no-store, max-age=0", "redacted-safe-value"]);
expect(apiRuntimeValidatorPath, ["Platform launch readiness API runtime validation passed.", "getLaunchReadinessProjectionResponse", "recordLaunchReadinessAudit"]);
expect(projectionRoutePath, ["export async function GET", "resolveCommandCenterAccessState", "getLaunchReadinessProjectionResponse", "safeDeniedResponse", "safeLaunchReadinessHeaders"]);
expect(auditRoutePath, ["export async function POST", "resolveCommandCenterAccessState", "recordLaunchReadinessAudit", "readSafeAuditBody"]);
expect(historyRoutePath, ["export async function GET", "resolveCommandCenterAccessState", "getLaunchReadinessAuditHistoryResponse", "safeHistory"]);
expect(apiRoutesValidatorPath, ["Platform launch readiness API routes validation passed.", "command-center/launch-readiness/route.ts", "command-center/launch-readiness/audit/route.ts", "command-center/launch-readiness/history/route.ts"]);
expect(productionChecklistPath, ["projectProductionLaunchChecklist", "ProductionLaunchChecklistItem", "ProductionLaunchChecklistProjection", "projectPlatformLaunchReadiness", "blockedLaunchReasons", "readyCount", "blockedCount", "nextOperatorActions", "verified-main", "route-validation", "production-smoke", "auth-provider", "payment-config", "rollback-plan", "audit-plan", "controlled-maintenance"]);
expect(productionChecklistValidatorPath, ["Production launch checklist runtime validation passed.", "projectProductionLaunchChecklist", "production-launch-checklist-runtime.ts"]);
expect(productionChecklistPanelPath, ["ProductionLaunchChecklistPanel", "projectProductionLaunchChecklist", "Private launch checklist", "Operator-safe production checklist with launch blockers and next actions.", "not customer-facing", "does not declare public launch", "productionChecklist.checklist", "productionChecklist.blockedLaunchReasons", "productionChecklist.nextOperatorActions"]);
expect(productionChecklistPanelValidatorPath, ["Command center production launch checklist panel validation passed.", "ProductionLaunchChecklistPanel", "production-launch-checklist-panel.tsx"]);
expect(packagePath, ["validate:routes", "node ./src/scripts/validate-platform-launch-readiness-contracts.mjs"]);

forbidden(contractPath, ["launch without validation", "launch without vercel", "launch without smoke", "fake urgency is allowed", "guaranteed outcome is allowed", "client-only success redirect activates entitlement", "unverified webhook activates entitlement", "browser-stored session token allowed", "delete audit records", "localStorage.setItem", "sessionStorage.setItem", "sessionToken=", "csrfToken=", "adminKey=", "supportContextKey="]);

for (const guardedPath of [runtimePath, commandCenterLaunchPanelPath, auditApiContractPath, apiRuntimePath, projectionRoutePath, auditRoutePath, historyRoutePath, productionChecklistPath, productionChecklistPanelPath, finalBlockerPath, finalBlockerRuntimePath, finalBlockerPanelPath, launchEvidenceContractPath, launchEvidenceRuntimePath, launchEvidencePanelPath, launchEvidenceRoutePath, launchEvidenceRecordRoutePath, smokeTargetPath, smokeTargetRuntimePath, smokeTargetPanelPath, productionSmokeApiRoutePath, ownerEvidenceContractPath]) {
  forbidden(guardedPath, [
    "return rawPayload",
    "return rawEvidence",
    "return rawBillingData",
    "return internalNotes",
    "return operatorIdentity",
    "return databaseUrl",
    "return sessionToken",
    "return csrfToken",
    "return supportContextKey",
    "delete audit",
    "rewrite audit",
    "mutate production",
    "localStorage.setItem",
    "sessionStorage.setItem",
    "document.cookie",
    "guaranteed ROI",
    "guaranteed revenue",
    "impossible to hack",
    "never liable",
    "liability-free",
  ]);
}

if (failures.length) {
  console.error("Platform launch readiness contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Platform launch readiness contracts validation passed, including owner configuration evidence coverage.");

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
