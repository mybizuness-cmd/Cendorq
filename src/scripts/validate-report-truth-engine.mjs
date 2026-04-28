import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const policyPath = "src/lib/command-center/report-truth-engine.ts";
const growthPolicyPath = "src/lib/command-center/report-growth-system.ts";
const packagePath = "package.json";

validateTextFile(policyPath, [
  "REPORT_TRUTH_RULES",
  "BUSINESS_ENRICHMENT_RULES",
  "REPORT_METRIC_RULES",
  "REPORT_CONVERSION_RULES",
  "getReportTruthEnginePolicy",
  "Treat form fields as useful clues, not final proof.",
  "business name plus website or address",
  "calculation inputs, formula label, evidence references, confidence level, and rounding policy",
  "must never claim 100% certainty, perfect accuracy, or guaranteed outcomes",
  "visibility-score",
  "trust-score",
  "conversion-friction-score",
  "priority-severity-index",
  "progress-delta",
  "free-scan",
  "full-diagnosis",
  "optimization",
  "monthly-control",
  "Full Diagnosis is required to verify causes",
  "Optimization is the logical next step",
  "Monthly Control protects, measures, and iterates",
]);

validateTextFile(growthPolicyPath, [
  "REPORT_GROWTH_SYSTEM_RULES",
  "PLAN_REPORT_DEPTH_RULES",
  "PLATFORM_REVENUE_SIGNAL_RULES",
  "getReportGrowthSystemPolicy",
  "Truthful high-conversion reporting",
  "Every report section must explain what the section measures",
  "Every report must look official and Cendorq-branded",
  "analyzed business logo above or beside the business name",
  "small Cendorq-branded footer",
  "serious evidence-backed review process",
  "Business outcomes, rankings, traffic, leads, conversions, revenue, platform behavior, or perfect accuracy",
  "Full Diagnosis must be thorough and extensive",
  "website, profiles, reviews, social and platform activity",
  "recommended Optimization path",
  "Every business study must consider social media and other platform activity",
  "bread and butter",
  "marketplaces, directories, booking platforms, delivery apps, creator platforms, review platforms, communities, app stores, or industry-specific platforms",
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
]);

validateForbidden(growthPolicyPath, [
  "guaranteeing rankings",
  "guaranteeing traffic",
  "guaranteing leads",
  "guaranteeing conversions",
  "guaranteeing revenue",
  "promising legal immunity",
  "lying allowed",
]);

if (failures.length) {
  console.error("Report truth engine validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report truth engine validation passed. Report generation standards require independent evidence, minimum-input enrichment, traceable calculations, confidence labels, plan-by-plan report depth, truthful high-conversion logic, social and platform revenue discovery, modern official branding, customer-safe footer safeguards, and plan-upgrade logic without perfect-accuracy or guaranteed-result claims.");

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
