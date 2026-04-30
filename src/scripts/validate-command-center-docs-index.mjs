import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const docsIndexPath = "docs/command-center-docs-index.md";
const runbookPath = "docs/command-center-operator-runbook.md";
const ownerManualPath = "docs/owner-operating-manual.md";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";

validateTextFile(docsIndexPath, [
  "# Command Center Docs Index",
  "private documentation index",
  "docs/maximum-protection-standard.md",
  "docs/command-center-operator-runbook.md",
  "docs/owner-operating-manual.md",
  "owner-level operating manual for evidence-backed reports, tailored plan fit, conversion moat, market learning, launch review, and post-build operating cadence",
  "src/lib/command-center/access.ts",
  "src/lib/command-center/security-posture.ts",
  "src/lib/command-center/panel-registry.ts",
  "src/lib/command-center/validation-registry.ts",
  "src/lib/command-center/report-truth-engine.ts",
  "src/lib/command-center/report-growth-system.ts",
  "src/lib/command-center/controlled-market-learning.ts",
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
  "src/app/api/command-center/owner-configuration/evidence/route.ts",
  "src/app/api/command-center/owner-configuration/workflow/route.ts",
  "src/app/command-center/owner-configuration-evidence-panel.tsx",
  "src/app/command-center/owner-configuration-workflow-panel.tsx",
  "src/scripts/validate-command-center-security-posture.mjs",
  "src/scripts/validate-command-center-panel-registry.mjs",
  "src/scripts/validate-command-center-panel-safety.mjs",
  "src/scripts/validate-command-center-validation-registry.mjs",
  "src/scripts/validate-report-truth-engine.mjs",
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
  "owner operating standard",
  "must never include secret values, live customer data, raw intelligence, raw evidence, billing records, report internals, prompts, scoring weights, audit-defense legal strategy beyond approved metadata anchors, private dashboard conversation text, or non-public quality-review details",
]);

validateTextFile(runbookPath, [
  "# Command Center Operator Runbook",
  "Keep every validation guard wired into `validate:routes`.",
  "validate-command-center-operator-runbook.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-command-center-owner-configuration-workflow-smoke.mjs",
  "Vercel is green.",
]);

validateTextFile(ownerManualPath, [
  "# Cendorq Owner Operating Manual",
  "proof before output",
  "evidence before recommendation",
  "confidence before certainty",
  "Conversion moat",
  "Market-learning loop",
  "Owner responsibilities after build",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

validateTextFile(routesChainPath, [
  "validate-command-center-docs-index.mjs",
  "validate-owner-operating-manual.mjs",
  "validate-command-center-validation-registry.mjs",
  "validate-report-truth-engine.mjs",
  "validate-controlled-market-learning.mjs",
  "validate-enterprise-operating-standard.mjs",
  "validate-audit-defense-system.mjs",
  "validate-most-pristine-system-standard.mjs",
  "validate-report-record-contracts.mjs",
  "validate-scale-resilience-standard.mjs",
  "validate-customer-platform-standard.mjs",
  "validate-customer-experience-standard.mjs",
  "validate-conversion-moat-standard.mjs",
  "validate-insights-conversation-standard.mjs",
  "validate-command-center-owner-configuration-workflow-smoke.mjs",
]);

if (failures.length) {
  console.error("Command Center docs index validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center docs index validation passed. Private Command Center standards, owner operating manual, source-of-truth files, validation registry, report truth engine, report growth system, controlled market learning, enterprise standards, audit defense, most-pristine standard, report records, scale resilience, customer platform, customer experience, conversion moat, insights conversation, owner configuration workflow, runbook references, route-chain orchestrator, and guardrail validators remain discoverable without exposing secrets or live private data.");

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
