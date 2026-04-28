import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const policyPath = "src/lib/command-center/report-truth-engine.ts";
const packagePath = "package.json";

validateTextFile(policyPath, [
  "REPORT_AGENT_STANDARDS",
  "REPORT_TRUTH_RULES",
  "BUSINESS_ENRICHMENT_RULES",
  "REVENUE_ADAPTATION_RULES",
  "CATEGORY_PLAYBOOK_RULES",
  "INTERNATIONAL_READINESS_RULES",
  "REPORT_VISUAL_STANDARDS",
  "REPORT_FOOTER_LEGAL_BRAND_RULES",
  "REPORT_METRIC_RULES",
  "REPORT_CONVERSION_RULES",
  "getReportTruthEnginePolicy",
  "Report agents must be trained against the report truth engine",
  "business name plus website or address",
  "calculation inputs, formula label, evidence references, confidence level, and rounding policy",
  "must never claim 100% certainty, perfect accuracy, or guaranteed outcomes",
  "business model, category, location, sales cycle, buyer intent",
  "possible revenue streams without overlooking indirect, offline, recurring, or multi-channel revenue sources",
  "serve businesses across countries and languages",
  "public, ethical competitive intelligence",
  "identity-resolution",
  "presence-discovery",
  "competitive-context",
  "revenue-path-discovery",
  "locale-market-discovery",
  "visibility-score",
  "trust-score",
  "conversion-friction-score",
  "priority-severity-index",
  "progress-delta",
  "executive-scorecard",
  "priority-impact-visuals",
  "monthly-progress-visuals",
  "modern scorecards",
  "priority matrix",
  "trend graph",
  "branded-report-footer",
  "small-report-footer",
  "Cendorq-branded footer",
  "guarantees a serious evidence-backed review process",
  "will correct material report errors identified within the review window",
  "Business outcomes, rankings, traffic, leads, and conversions depend on implementation and external factors and are not guaranteed",
  "legal counsel before public launch",
  "free-scan",
  "full-diagnosis",
  "optimization",
  "monthly-control",
  "Full Diagnosis is required to verify causes",
  "Optimization is the logical next step",
  "Monthly Control protects, measures, and iterates",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-report-truth-engine.mjs",
]);

validateForbidden(policyPath, [
  "100% accurate",
  "100% certainty: true",
  "perfect accuracy: true",
  "unverified fact",
  "ignore missing evidence",
  "illegal spying",
  "guaranteeing revenue",
  "guaranteeing rankings",
  "promising legal immunity",
]);

if (failures.length) {
  console.error("Report truth engine validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report truth engine validation passed. Report generation standards require trained agents, independent evidence, minimum-input enrichment, revenue-context adaptation, category playbooks, international readiness, modern evidence-tied visuals, branded footer safeguards, traceable calculations, confidence labels, uncertainty handling, and plan-upgrade logic without perfect-accuracy or guaranteed-result claims.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required report truth dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required report truth phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden report truth phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
