import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const standardPath = "src/lib/command-center/enterprise-operating-standard.ts";
const packagePath = "package.json";

validateTextFile(standardPath, [
  "ENTERPRISE_OPERATING_RULES",
  "ENTERPRISE_AUDIT_PASSES",
  "getEnterpriseOperatingStandard",
  "Strict but not paralyzing",
  "Zero-trust data boundary",
  "AI control plane",
  "Report truth system",
  "Enterprise security baseline",
  "Controlled market compounding",
  "Commercial leverage with trust",
  "Brand trust standard",
  "Resilience and recovery",
  "Security control pass",
  "AI governance pass",
  "Report integrity pass",
  "Market leverage pass",
  "Executive alignment pass",
  "block public exposure, unsupported claims, unsafe AI actions, customer-data leakage, unreviewed method changes, and security regressions by default",
  "allow approved, evidence-backed experimentation, product expansion, pricing tests, report improvements, and new revenue paths",
  "privacy-safe abstraction, de-identification, review, and approval",
  "AI agents must operate inside approved report, optimization, customer-output, command-history, and controlled-market-learning policies",
  "Reports must separate customer input from verified evidence, store calculation traces, show confidence labels, use truthful plan conversion logic",
  "Security must be designed around identity, access control, input validation, output encoding, secrets management, logging, monitoring, change control, incident response, and recovery",
  "Market learning must not expose customer data, overfit to anecdotes, make unsupported forecasts, or change production behavior without review",
  "Pricing, plans, guarantees, sales copy, and next-plan recommendations must stay truthful, explainable, evidence-backed, and legally reviewable",
  "Every customer-facing surface must look official, consistent, premium, accessible, and trustworthy",
  "Cendorq must assume failures can happen and keep detection, rollback, incident response, evidence correction, and recovery procedures ready",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-enterprise-operating-standard.mjs",
]);

validateForbidden(standardPath, [
  "unreviewed production changes allowed",
  "agent drift allowed",
  "customer data leakage allowed",
  "perfect accuracy claims allowed",
  "absolute security claims allowed",
  "innovation freeze required",
  "guaranteed outcomes allowed",
]);

if (failures.length) {
  console.error("Enterprise operating standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Enterprise operating standard validation passed. Cendorq remains strict enough to protect intelligence, data, reports, AI, security, and customer trust while allowing approved evidence-backed leverage, experimentation, expansion, and self-improvement.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required enterprise operating dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required enterprise operating phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden enterprise operating phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
