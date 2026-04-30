import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/report-evidence-orchestration-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const registryPath = "src/lib/command-center/panel-registry.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(panelPath, [
  "ReportEvidenceOrchestrationPanel",
  "getReportEvidenceOrchestrationPolicy",
  "projectReportEvidenceRuntime",
  "Report Evidence",
  "Evidence orchestration and runtime review",
  "Metadata only",
  "source tiers",
  "blocked flags",
  "confidence-labeled",
  "conflict-aware",
  "plan-fit checked",
  "release-captain review",
  "customer-facing output",
]);

expect(panelPath, [
  "Evidence inputs",
  "Needs review",
  "Conflicts",
  "Dominant trust",
  "Orchestration rules",
  "Source tiers",
  "Trust language",
  "Plan-fit gates",
  "Runtime blocked patterns",
  "Runtime next actions",
]);

expect(panelPath, [
  "customer-claim-check",
  "owned-surface-observation",
  "conflict-resolution-path",
  "customerClaimPresent: true",
  "customerClaimSupported: false",
  "hasEvidenceConflict: true",
  "releaseCaptainReviewed: false",
  "planFitEvidencePresent: true",
]);

expect(pagePath, [
  "import { ReportEvidenceOrchestrationPanel } from \"./report-evidence-orchestration-panel\";",
  "<ReportTruthMethodologyPanel />",
  "<ReportEvidenceOrchestrationPanel />",
  "resolveCommandCenterAccessState",
  "ClosedCommandCenterPanel",
]);

expect(registryPath, [
  "report-evidence-orchestration",
  "Report evidence orchestration",
  "evidence source tiers",
  "confidence posture",
  "conflict handling",
  "plan-fit gates",
  "runtime review state",
  "Evidence stays summarized",
  "raw private evidence and customer-facing claims remain blocked until review gates pass",
]);

expect(routesChainPath, [
  "src/scripts/validate-command-center-report-evidence-orchestration-panel.mjs",
]);

forbidden(panelPath, [
  "\"use client\"",
  "'use client'",
  "localStorage",
  "sessionStorage",
  "document.cookie",
  "window.",
  "process.env.",
  "dangerouslySetInnerHTML",
  "rawPayload=",
  "rawEvidence=",
  "rawSecurityPayload=",
  "rawBillingData=",
  "internalNotes=",
  "operatorIdentity=",
  "riskScoringInternals=",
  "attackerDetails=",
  "session" + "Token=",
  "csrf" + "Token=",
  "admin" + "Key=",
  "support" + "Context" + "Key=",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "guaranteed security",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Command Center report evidence orchestration panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center report evidence orchestration panel validation passed. The private panel remains metadata-only, command-center gated, source-tier aware, confidence-aware, conflict-aware, plan-fit aware, and release-captain review aligned without raw/private exposure.");

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
