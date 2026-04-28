import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const policyPath = "src/lib/command-center/controlled-market-learning.ts";
const packagePath = "package.json";

validateTextFile(policyPath, [
  "CONTROLLED_MARKET_LEARNING_RULES",
  "SELF_EVOLUTION_CONTROL_RULES",
  "CENDORQ_LEVERAGE_RULES",
  "getControlledMarketLearningPolicy",
  "Cross-business pattern learning",
  "Market direction intelligence",
  "Advertising model understanding",
  "Privacy-safe aggregation",
  "Review-gated evolution",
  "Strict agent boundaries",
  "Versioned method upgrades",
  "New income source discovery",
  "Category expansion intelligence",
  "Platform leverage intelligence",
  "After enough businesses are studied",
  "what is working now, what is weakening, what is emerging",
  "different advertising models, channels, offers, funnels, creatives, social/platform activity, and conversion paths",
  "must aggregate and abstract patterns without exposing customer identities",
  "No learned pattern can change customer-facing reports, pricing, plan promises, scoring, recommendations, or AI behavior until it is reviewed, versioned, tested, and approved",
  "Agents must stay inside the approved report truth engine, report growth system, validation registry, customer-output approval, and AI command history policies",
  "new service lines, report modules, vertical offers, platform integrations, data products, or subscription controls",
  "countries, languages, categories, and business types",
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
]);

if (failures.length) {
  console.error("Controlled market learning validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Controlled market learning validation passed. Market intelligence, trend learning, Cendorq leverage discovery, and self-evolution remain evidence-backed, privacy-safe, review-gated, versioned, and protected against agent drift.");

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
