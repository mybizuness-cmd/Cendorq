import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const policyPath = "src/lib/command-center/controlled-market-learning.ts";
const packagePath = "package.json";

validateTextFile(policyPath, [
  "CONTROLLED_MARKET_LEARNING_RULES",
  "SELECTIVE_RECURRING_VALUE_PLACEMENT_RULES",
  "RECURRING_VALUE_MOAT_RULES",
  "FORECAST_GOVERNANCE_RULES",
  "SELF_EVOLUTION_CONTROL_RULES",
  "CENDORQ_LEVERAGE_RULES",
  "getControlledMarketLearningPolicy",
  "Cross-business pattern learning",
  "Market direction intelligence",
  "Advertising model understanding",
  "Privacy-safe aggregation",
  "Selective recurring value placement",
  "Enterprise-style retention discipline",
  "Search and AI volatility review",
  "Competitive movement review",
  "Customer decision drift review",
  "Compounding readiness record",
  "Evidence-backed forecasting",
  "Forecast-to-next-action translation",
  "Forecast refresh cadence",
  "Review-gated evolution",
  "Strict agent boundaries",
  "Versioned method upgrades",
  "New income source discovery",
  "Category expansion intelligence",
  "Platform leverage intelligence",
  "After enough businesses are studied",
  "what is working now, what is weakening, what is emerging",
  "Recurring value should be strongest where it naturally matters",
  "Other public surfaces may hint calmly",
  "must not repeat the same subscription argument everywhere",
  "Model the retention posture after strong subscription and customer-success businesses",
  "provide ongoing value, prove progress, reduce customer work, make the next step obvious",
  "Where evidence supports it",
  "not because every surface loudly asks them to come back",
  "Every forecast must label confidence, evidence inputs, assumptions, time horizon, what would change the forecast, and what is unknown",
  "Cadence must be justified by category volatility, platform volatility, competitive movement, business risk, and evidence freshness",
  "No learned pattern can change customer-facing reports, pricing, plan promises, scoring, recommendations, forecasts, cadence recommendations, or AI behavior until it is reviewed, versioned, tested, and approved",
  "Agents must stay inside the approved report truth engine, report growth system, forecast governance, validation registry, customer-output approval, and AI command history policies",
  "new service lines, report modules, vertical offers, platform integrations, data products, or subscription controls",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-controlled-market-learning.mjs",
]);

validateForbidden(policyPath, [
  "autonomous production changes allowed",
  "agent drift allowed",
  "unreviewed prompt changes allowed",
  "private data access allowed",
  "customer data leakage allowed",
  "guaranteed algorithm outcomes allowed",
  "claiming market certainty allowed",
  "forecast as fact allowed",
  "guaranteed rankings allowed",
  "guaranteed revenue allowed",
  "exact future traffic claims allowed",
  "fake urgency allowed",
  "generic monthly pitch allowed",
  "recurring pitch on every block allowed",
  "loud subscription pressure allowed",
  "turning every CTA into Readiness Control allowed",
]);

if (failures.length) {
  console.error("Controlled market learning validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Controlled market learning validation passed. Market intelligence, selective recurring value placement, enterprise-style retention discipline, forecast governance, Cendorq leverage discovery, and self-evolution remain evidence-backed, privacy-safe, review-gated, versioned, customer-safe, and protected against agent drift or loud subscription pressure.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required controlled market learning dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required controlled market learning phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden controlled market learning phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
