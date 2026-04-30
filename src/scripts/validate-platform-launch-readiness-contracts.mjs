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
const packagePath = "package.json";
const failures = [];

expect(contractPath, [
  "PLATFORM_LAUNCH_READINESS_CONTRACT",
  "PLATFORM_LAUNCH_READINESS_BLOCKED_PATTERNS",
  "Platform Launch Readiness Contract",
  "public-entry-and-free-scan",
  "auth-session-and-welcome",
  "customer-platform-handoffs",
  "reports-and-vault",
  "billing-and-entitlements",
  "support-and-command-center",
  "maintenance-and-smoke",
]);

expect(contractPath, [
  "production auth provider contracts validated",
  "one-time verified welcome email is validated",
  "customer platform handoff contracts validated",
  "report generation rendering contracts validation",
  "billing checkout contracts validation",
  "command center control interface validation",
  "controlled maintenance contracts validation",
  "production smoke finalization validation",
]);

expect(contractPath, [
  "latest main commit is verified before release branch creation",
  "all validators are wired into validate:routes",
  "Vercel deployment is green for the release PR",
  "production smoke target is configured before production launch declaration",
  "owner-provided payment links or provider checkout config exist before paid checkout launch",
  "server-only secrets are configured outside browser-accessible code",
  "rollback plan exists for auth, billing, reports, support, and public conversion changes",
  "audit plan exists for auth, support, billing, report release, operator actions, and maintenance actions",
]);

expect(finalBlockerPath, [
  "PRODUCTION_LAUNCH_FINAL_BLOCKER_CONTRACT",
  "Production Launch Final Blocker Contract",
  "owner-configuration",
  "production-smoke-target",
  "rollback-evidence",
  "audit-evidence",
  "hard-lock-clearance",
  "Do not state public launch readiness until every blocker group has complete evidence.",
  "Do not state security readiness as absolute safety; use defense-in-depth, risk reduction, auditability, and controlled access language.",
  "Final blocker checks are operator-only and never customer-facing.",
  "Final blocker checks may guide launch review but must not mutate production state.",
]);
expect(finalBlockerValidatorPath, ["Production launch final blocker contracts validation passed.", "PRODUCTION_LAUNCH_FINAL_BLOCKER_CONTRACT", "Production Launch Final Blocker Contract"]);
expect(finalBlockerRuntimePath, [
  "projectProductionLaunchFinalBlockers",
  "ProductionLaunchFinalBlockerInput",
  "ProductionLaunchFinalBlockerProjection",
  "ProductionLaunchFinalBlockerSummary",
  "ownerConfigurationComplete",
  "productionSmokeComplete",
  "rollbackEvidenceComplete",
  "auditEvidenceComplete",
  "hardLocksClear",
  "publicClaimAllowed: allComplete",
  "paidClaimAllowed: ownerComplete && hardLocksClear",
  "reportClaimAllowed: smokeComplete && rollbackComplete && auditComplete && hardLocksClear",
]);
expect(finalBlockerRuntimeValidatorPath, ["Production launch final blocker runtime validation passed.", "projectProductionLaunchFinalBlockers", "production-launch-final-blocker-runtime.ts"]);
expect(finalBlockerPanelPath, [
  "ProductionLaunchFinalBlockerPanel",
  "projectProductionLaunchFinalBlockers",
  "Final blocker control",
  "Operator-only launch claim blockers before any public, paid, or report launch claim.",
  "This panel does not launch the platform.",
  "finalBlockers.releaseState",
  "finalBlockers.publicClaimAllowed",
  "finalBlockers.paidClaimAllowed",
  "finalBlockers.reportClaimAllowed",
  "finalBlockers.blockers",
  "finalBlockers.safeNextActions",
]);
expect(finalBlockerPanelValidatorPath, ["Command center production launch final blocker panel validation passed.", "ProductionLaunchFinalBlockerPanel", "production-launch-final-blocker-panel.tsx"]);

expect(runtimePath, ["projectPlatformLaunchReadiness", "safeSummary", "readyGroups", "blockedGroups", "evidenceGaps", "safeNextActions", "hardLaunchLocks", "blockedPatterns"]);
expect(runtimeValidatorPath, ["Platform launch readiness runtime validation passed.", "projectPlatformLaunchReadiness"]);
expect(commandCenterLaunchPanelPath, ["PlatformLaunchReadinessPanel", "projectPlatformLaunchReadiness", "Private launch readiness", "safe API posture", "command-center-only no-store API routes"]);
expect(commandCenterPagePath, ["PlatformLaunchReadinessPanel", "ProductionLaunchChecklistPanel", "ProductionLaunchFinalBlockerPanel", "./production-launch-final-blocker-panel", "ClosedCommandCenterPanel", "resolveCommandCenterAccessState"]);
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

for (const guardedPath of [runtimePath, commandCenterLaunchPanelPath, auditApiContractPath, apiRuntimePath, projectionRoutePath, auditRoutePath, historyRoutePath, productionChecklistPath, productionChecklistPanelPath, finalBlockerPath, finalBlockerRuntimePath, finalBlockerPanelPath]) {
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

console.log("Platform launch readiness contracts validation passed, including final blocker panel coverage.");

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
