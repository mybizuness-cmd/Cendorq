import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const docsIndexPath = "docs/command-center-docs-index.md";
const maximumProtectionDocsPath = "docs/maximum-protection-standard.md";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const runbookPath = "docs/command-center-operator-runbook.md";
const safeProjectionRunbookPath = "docs/admin-command-center-safe-projections.md";
const ownerManualPath = "docs/owner-operating-manual.md";
const repoUpdateScanningDocsPath = "docs/repo-update-scanning-automation.md";
const continuousEvolutionDocsPath = "docs/controlled-continuous-evolution.md";
const continuousEvolutionContractPath = "src/lib/controlled-continuous-evolution-contracts.ts";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const routesChainIntegrityPath = "src/scripts/validate-routes-chain-integrity.mjs";
const maximumProtectionValidatorPath = "src/scripts/validate-maximum-protection-standard.mjs";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const codeqlWorkflowValidatorPath = "src/scripts/validate-codeql-workflow-integrity.mjs";
const continuousEvolutionValidatorPath = "src/scripts/validate-controlled-continuous-evolution.mjs";

validateTextFile(docsIndexPath, [
  "# Command Center Docs Index",
  "private documentation index",
  "docs/maximum-protection-standard.md",
  "highest-protection security, data, AI, evidence, database, audit, emergency, and public-boundary standard",
  "docs/owner-maximum-protection-posture.md",
  "owner-facing maximum-protection operating posture for public/private boundaries, verified access, operator review, AI/automation limits, validation gates, rollback posture, and release-captain review",
  "docs/command-center-operator-runbook.md",
  "docs/admin-command-center-safe-projections.md",
  "registry-contract-backed, route-contract-summary-backed, projection-link-count-backed, panel-contract-strip-backed, panel-summary-display-backed",
  "docs/owner-operating-manual.md",
  "docs/repo-update-scanning-automation.md",
  "docs/controlled-continuous-evolution.md",
  "controlled continuous evolution standard for monitored, validated, reviewable, rollback-ready update proposals without uncontrolled production mutation or quality drift",
  "repo update scanning automation standard for Dependabot, CodeQL workflow, dependency integrity, most-pristine, route-chain coverage, and release-captain review posture",
  "src/lib/command-center/access.ts",
  "src/lib/command-center/security-posture.ts",
  "src/lib/command-center/panel-registry.ts",
  "src/lib/command-center/validation-registry.ts",
  "Admin command-center safe projection registry, route contract metadata, route contract summary, and projection link count",
  "src/lib/admin-command-center-safe-projection-registry.ts",
  "src/lib/admin-command-center-safe-access.ts",
  "src/lib/admin-command-center-safe-response.ts",
  "src/lib/command-center/report-truth-engine.ts",
  "src/lib/command-center/report-evidence-orchestration.ts",
  "src/lib/command-center/report-evidence-orchestration-runtime.ts",
  "src/lib/command-center/report-evidence-record-contracts.ts",
  "src/lib/command-center/report-evidence-record-runtime.ts",
  "src/lib/command-center/report-evidence-record-persistence-runtime.ts",
  "src/lib/command-center/report-growth-system.ts",
  "src/lib/command-center/controlled-market-learning.ts",
  "src/lib/controlled-continuous-evolution-contracts.ts",
  "src/lib/command-center/enterprise-operating-standard.ts",
  "src/lib/command-center/audit-defense-system.ts",
  "src/lib/command-center/most-pristine-system-standard.ts",
  "src/lib/command-center/audit-report-record-contracts.ts",
  "src/lib/command-center/scale-resilience-standard.ts",
  "src/lib/command-center/customer-platform-standard.ts",
  "src/lib/command-center/customer-command-experience-standard.ts",
  "src/lib/command-center/conversion-moat-standard.ts",
  "src/lib/command-center/insights-conversation-standard.ts",
  "src/lib/command-center/readiness-summary.ts",
  "src/lib/command-center/database-readiness.ts",
  "src/lib/command-center/auth-readiness.ts",
  "src/lib/command-center/file-storage-readiness.ts",
  "src/lib/command-center/billing-readiness.ts",
  "src/lib/command-center/delivery-readiness.ts",
  "src/lib/command-center/automation-readiness.ts",
  "src/lib/command-center/governance-readiness.ts",
  "src/lib/command-center/intelligence-readiness.ts",
  "src/lib/owner-configuration-evidence-runtime.ts",
  "src/lib/owner-configuration-evidence-persistence-runtime.ts",
  "src/lib/owner-configuration-evidence-approval-workflow-runtime.ts",
]);

validateTextFile(docsIndexPath, [
  "src/app/api/command-center/owner-configuration/evidence/route.ts",
  "src/app/api/command-center/owner-configuration/workflow/route.ts",
  "src/app/command-center/owner-configuration-evidence-panel.tsx",
  "src/app/command-center/owner-configuration-workflow-panel.tsx",
  "src/app/api/admin/command-center/route.ts",
  "src/app/api/admin/command-center/summary/route.ts",
  "src/app/api/admin/command-center/audit/route.ts",
  "src/app/api/admin/command-center/mission-brief/route.ts",
  "src/app/api/admin/command-center/agent-findings/route.ts",
  "src/app/api/admin/command-center/forecast-escalation/route.ts",
  "src/app/command-center/admin-command-center-control-panel.tsx",
  "projection-link-count-backed",
  "route-contract-summary-backed",
  "panel-contract-strip-backed",
  "panel-summary-display-backed",
  "Safe projection validation standard",
  "validate-admin-command-center-safe-projections-runbook.mjs",
  "runbook structure, endpoint map, registry contract helpers, projection link count/completeness helpers, shared access helper, shared response/options helper, every admin projection route, and route-chain wiring",
  "panel summary display tied to method count and all-helpers-required posture from `getAdminCommandCenterSafeProjectionRouteContractSummary`",
  "src/app/api/command-center/report-evidence/orchestration/route.ts",
  "src/app/api/command-center/report-evidence/records/route.ts",
  "src/app/command-center/report-evidence-orchestration-panel.tsx",
  "customer-facing report approvals",
  "append-only safe projection surfaces",
  "customer-facing output approval, paid recommendation approval, public report release approval, launch readiness approval, or security readiness approval",
]);

validateTextFile(docsIndexPath, [
  "Full cockpit panel safety standard",
  "validate-command-center-panel-safety.mjs",
  "every current private cockpit panel rendered by `src/app/command-center/page.tsx`",
  "admin projections, launch readiness, owner workflow, plan delivery/routing, and report evidence records",
  "server-rendered, metadata-only, private-gated, registry-aligned",
  "free of browser storage",
  "free of browser-only APIs",
  "free of direct environment access",
  "blocked from raw/private payload fields, secret/token patterns, unsafe guarantee language, and public exposure drift",
]);

validateTextFile(docsIndexPath, [
  "Route-chain integrity standard",
  "validate-routes-chain-integrity.mjs",
  "must run first in `validate:routes`",
  "preserve validator ordering",
  "block duplicate validators",
  "require high-risk guardrail files",
  "verify maximum-protection standard coverage",
  "verify CodeQL workflow integrity coverage",
  "verify repo update scanning automation coverage",
  "verify controlled continuous evolution coverage",
  "verify indirect report evidence validators remain centrally covered through `src/scripts/validate-report-evidence-record-runtime.mjs`",
  "validate-report-evidence-record-persistence-runtime.mjs",
  "validate-command-center-report-evidence-records-api.mjs",
  "the persistence runtime, the records API route, safe-summary-only posture, append-only safe projection mode, and raw evidence exposure blocking",
]);

validateTextFile(docsIndexPath, [
  "Maximum protection standard",
  "validate-maximum-protection-standard.mjs",
  "docs/maximum-protection-standard.md",
  "src/lib/command-center/validation-registry.ts",
  "Cendorq's highest-protection doctrine",
  "data classification, deny-by-default access, server-side private data handling, secret handling, exfiltration prevention, AI-agent containment, report protection, evidence protection, supply-chain protection, database protection, auditability, emergency controls, partner boundaries, and public doctrine boundaries",
  "without exposing private mechanics, client data, report internals, prompts, exact scoring weights, private evidence, or unrestricted report exports",
]);

validateTextFile(docsIndexPath, [
  "Owner maximum protection posture",
  "validate-owner-maximum-protection-posture.mjs",
  "docs/owner-maximum-protection-posture.md",
  "owner-level operating decisions",
  "public/private boundaries, verified customer access, operator-only review, AI and automation approval limits, evidence separation, validation gates, rollback posture, release-captain review, and customer-safe language",
  "without exposing private mechanics or weakening launch, report, billing, provider, support, or customer-facing claim approval boundaries",
]);

validateTextFile(docsIndexPath, [
  "CodeQL workflow integrity standard",
  "validate-codeql-workflow-integrity.mjs",
  ".github/workflows/codeql.yml",
  "main push, pull request, and weekly schedule triggers",
  "minimal read permissions plus `security-events: write`",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "github/codeql-action/autobuild@v4",
  "github/codeql-action/analyze@v4",
  "JavaScript/TypeScript analysis",
  "security-extended,security-and-quality",
  "block older checkout/CodeQL action versions, broad write permissions, and `continue-on-error: true` drift",
]);

validateTextFile(docsIndexPath, [
  "Repo update scanning automation standard",
  "validate-repo-update-scanning-automation.mjs",
  "docs/repo-update-scanning-automation.md",
  ".github/dependabot.yml",
  ".github/workflows/codeql.yml",
  "src/scripts/validate-codeql-workflow-integrity.mjs",
  "src/scripts/validate-dependency-lockfile-integrity.mjs",
  "src/scripts/validate-most-pristine-system-standard.mjs",
  "validate:routes",
  "Dependabot update groups",
  "CodeQL v4",
  "checkout v6",
  "dependency integrity coverage",
  "most-pristine coverage",
  "release-captain review posture",
  "without approving dependency updates, provider configuration, paid launch, public launch, security readiness, customer-facing reports, or customer-facing claims",
]);

validateTextFile(docsIndexPath, [
  "Controlled continuous evolution standard",
  "validate-controlled-continuous-evolution.mjs",
  "docs/controlled-continuous-evolution.md",
  "src/lib/controlled-continuous-evolution-contracts.ts",
  "monitored, validated, reviewable, reversible, rollback-ready updates",
  "Automated systems may detect, propose, test, and prepare updates",
  "must not auto-merge production-impacting code without green gates",
  "skip Vercel",
  "disable validation",
  "small-batch, preview-gated, rollback-ready, documented",
  "owner-visible",
  "route-chain integrity, validation registry, docs index, operator runbook, owner operating manual, and most-pristine coverage",
]);

validateTextFile(continuousEvolutionDocsPath, [
  "# Controlled Continuous Evolution",
  "monitored, validated, reviewable, reversible updates",
  "Automated systems may detect, propose, test, and prepare updates",
  "auto-merge production-impacting code without green gates",
  "skip Vercel or preview gates",
  "release-captain approval before merge",
  "Continuous updates must raise or preserve Cendorq's most-pristine standard",
  "Documentation rule",
]);

validateTextFile(docsIndexPath, [
  "src/scripts/validate-routes-chain-integrity.mjs",
  "src/scripts/validate-maximum-protection-standard.mjs",
  "src/scripts/validate-owner-maximum-protection-posture.mjs",
  "src/scripts/validate-codeql-workflow-integrity.mjs",
  "src/scripts/validate-command-center-security-posture.mjs",
  "src/scripts/validate-admin-command-center-projection-registry.mjs",
  "src/scripts/validate-admin-command-center-safe-response.mjs",
  "src/scripts/validate-admin-command-center-safe-projections-runbook.mjs",
  "src/scripts/validate-admin-command-center-api-index.mjs",
  "src/scripts/validate-admin-command-center-safe-summary-api.mjs",
  "src/scripts/validate-admin-command-center-audit-trail-api.mjs",
  "src/scripts/validate-admin-command-center-mission-brief-api.mjs",
  "src/scripts/validate-admin-command-center-agent-findings-api.mjs",
  "src/scripts/validate-admin-command-center-forecast-escalation-api.mjs",
  "src/scripts/validate-command-center-admin-control-panel.mjs",
  "src/scripts/validate-command-center-panel-registry.mjs",
  "src/scripts/validate-command-center-panel-safety.mjs",
  "src/scripts/validate-command-center-validation-registry.mjs",
  "src/scripts/validate-report-truth-engine.mjs",
  "src/scripts/validate-report-evidence-orchestration.mjs",
  "src/scripts/validate-report-evidence-orchestration-runtime.mjs",
  "src/scripts/validate-command-center-report-evidence-orchestration-panel.mjs",
  "src/scripts/validate-command-center-report-evidence-orchestration-api.mjs",
  "src/scripts/validate-command-center-report-evidence-records-api.mjs",
  "src/scripts/validate-report-evidence-record-contracts.mjs",
  "src/scripts/validate-report-evidence-record-runtime.mjs",
  "src/scripts/validate-report-evidence-record-persistence-runtime.mjs",
  "src/scripts/validate-controlled-market-learning.mjs",
  "src/scripts/validate-enterprise-operating-standard.mjs",
  "src/scripts/validate-audit-defense-system.mjs",
  "src/scripts/validate-most-pristine-system-standard.mjs",
  "src/scripts/validate-report-record-contracts.mjs",
  "src/scripts/validate-scale-resilience-standard.mjs",
  "src/scripts/validate-customer-platform-standard.mjs",
  "src/scripts/validate-customer-experience-standard.mjs",
  "src/scripts/validate-conversion-moat-standard.mjs",
  "src/scripts/validate-insights-conversation-standard.mjs",
  "src/scripts/validate-command-center-operator-runbook.mjs",
  "src/scripts/validate-command-center-docs-index.mjs",
  "src/scripts/validate-owner-operating-manual.mjs",
  "src/scripts/validate-production-smoke-coverage.mjs",
  "src/scripts/validate-command-center-owner-configuration-evidence-api.mjs",
  "src/scripts/validate-command-center-owner-configuration-evidence-persistence.mjs",
  "src/scripts/validate-command-center-owner-configuration-evidence-approval-workflow.mjs",
  "src/scripts/validate-command-center-owner-configuration-workflow-api.mjs",
  "src/scripts/validate-command-center-owner-configuration-workflow-panel.mjs",
  "src/scripts/validate-command-center-owner-configuration-workflow-smoke.mjs",
  "admin command-center projection link count",
  "admin command-center route contract summary",
  "admin command-center panel contract strip",
  "admin command-center panel summary display",
  "admin command-center response or options helper",
  "report evidence route",
  "report evidence record API",
  "report evidence record contract",
  "report evidence record runtime",
  "report evidence record persistence runtime",
  "maximum protection rule",
  "owner maximum-protection posture rule",
  "repo update scanning automation rule",
  "controlled continuous evolution rule",
]);

validateTextFile(runbookPath, [
  "# Command Center Operator Runbook",
  "Keep every validation guard wired into `validate:routes`.",
  "validate-command-center-operator-runbook.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-command-center-owner-configuration-workflow-smoke.mjs",
  "Vercel is green.",
]);

validateTextFile(maximumProtectionDocsPath, [
  "# Cendorq Maximum Protection Standard",
  "highest-protection operating posture",
  "Default posture: deny by default.",
  "Secrets must never be committed.",
  "AI agents must treat external content as untrusted.",
  "Public content may teach the category, but it must not expose the private machine.",
]);

validateTextFile(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "daily operating decisions",
  "Required owner decisions",
  "Hard owner locks",
  "Operating rule",
]);

validateTextFile(maximumProtectionValidatorPath, [
  "Maximum protection standard validation passed",
  "docs/maximum-protection-standard.md",
  "src/lib/command-center/validation-registry.ts",
  "validate:routes",
]);

validateTextFile(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "docs/maximum-protection-standard.md",
  "validate:routes",
]);

validateTextFile(repoUpdateScanningDocsPath, [
  "# Repo Update Scanning Automation",
  "src/scripts/validate-repo-update-scanning-automation.mjs",
  ".github/dependabot.yml",
  ".github/workflows/codeql.yml",
  "src/scripts/validate-codeql-workflow-integrity.mjs",
  "src/scripts/validate-dependency-lockfile-integrity.mjs",
  "src/scripts/validate-most-pristine-system-standard.mjs",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "github/codeql-action/autobuild@v4",
  "github/codeql-action/analyze@v4",
  "controlled-update",
  "next-react-platform",
  "typescript-tooling",
  "release-captain review",
  "expected head SHA",
]);

validateTextFile(continuousEvolutionContractPath, [
  "CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT",
  "controlled-continuous-evolution-v1",
  "Automated systems may detect, propose, test, and prepare updates.",
  "open dependency update pull requests",
  "run validation scripts",
  "Vercel preview or deployment check passes",
  "small coherent batches",
  "rollback-ready before promotion",
  "automatic update systems can propose changes but cannot bypass validation",
]);

validateTextFile(continuousEvolutionValidatorPath, [
  "Controlled continuous evolution validation passed",
  "CONTROLLED_CONTINUOUS_EVOLUTION_CONTRACT",
  "docs/controlled-continuous-evolution.md",
  "auto-merge production-impacting code without green gates",
  "skipVercelGate",
  "disableValidatorForUpdate",
]);

validateTextFile(safeProjectionRunbookPath, [
  "# Admin Command Center Safe Projections",
  "Operating posture",
  "Source of truth",
  "getAdminCommandCenterSafeProjectionRouteContract",
  "getAdminCommandCenterSafeProjectionRouteContractSummary",
  "getAdminCommandCenterSafeProjectionLinkCount",
  "getAdminCommandCenterExpectedSafeProjectionLinkCount",
  "getAdminCommandCenterSafeProjectionLinksComplete",
  "projection link count",
  "expected projection link count",
  "projection completeness",
  "routeContractSummary",
  "The strip must show method count and all-helpers-required posture from the summary accessor",
  "resolveAdminCommandCenterSafeAccess",
  "adminCommandCenterAccessDeniedPayload",
  "adminCommandCenterJsonNoStore",
  "adminCommandCenterOptions",
  "ADMIN_COMMAND_CENTER_SAFE_METHODS",
  "Validation requirements",
  "safe-projections validator must enforce shared `OPTIONS` helper coverage across every admin command-center projection route",
]);

validateTextFile(ownerManualPath, [
  "# Cendorq Owner Operating Manual",
  "proof before output",
  "evidence before recommendation",
  "confidence before certainty",
  "Conversion moat",
  "Market-learning loop",
  "Owner responsibilities after build",
  "Controlled continuous evolution",
]);

validateTextFile(packagePath, ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);

validateTextFile(routesChainPath, [
  "validate-routes-chain-integrity.mjs",
  "validate-maximum-protection-standard.mjs",
  "validate-owner-maximum-protection-posture.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-admin-command-center-safe-response.mjs",
  "validate-admin-command-center-safe-projections-runbook.mjs",
  "validate-owner-operating-manual.mjs",
  "validate-command-center-validation-registry.mjs",
  "validate-report-truth-engine.mjs",
  "validate-report-evidence-record-runtime.mjs",
  "validate-command-center-owner-configuration-workflow-smoke.mjs",
]);

validateTextFile(routesChainIntegrityPath, [
  "validate-codeql-workflow-integrity.mjs",
  "validate-repo-update-scanning-automation.mjs",
  "validate-controlled-continuous-evolution.mjs",
  "validateRepoUpdateScanningCoverage",
  "validateControlledContinuousEvolutionCoverage",
  "requiredIndirectReportEvidenceValidators",
  "validate-report-evidence-record-persistence-runtime.mjs",
  "validate-command-center-report-evidence-records-api.mjs",
  "validateIndirectReportEvidenceCoverage",
  "validateCodeqlWorkflowCoverage",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "acceptedInput: \\\"safe-summary-only\\\"",
  "persistenceMode: \\\"append-only-safe-projection\\\"",
  "rawEvidenceExposed: false",
]);

validateTextFile(codeqlWorkflowValidatorPath, [
  ".github/workflows/codeql.yml",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "github/codeql-action/autobuild@v4",
  "github/codeql-action/analyze@v4",
  "security-extended,security-and-quality",
  "continue-on-error: true",
]);

if (failures.length) {
  console.error("Command Center docs index validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center docs index validation passed with maximum-protection standard, owner maximum-protection posture, CodeQL workflow integrity, route-chain integrity, repo update scanning automation, controlled continuous evolution docs, expanded panel safety, projection link count, panel summary display, report evidence records API, report evidence record runtime, and report evidence record persistence runtime coverage.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required docs index dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required docs index phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
