import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const standardPath = "docs/maximum-protection-standard.md";
const docsIndexPath = "docs/command-center-docs-index.md";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-maximum-protection-standard.mjs";
const validationRegistryPath = "src/lib/command-center/validation-registry.ts";

expect(standardPath, [
  "# Cendorq Maximum Protection Standard",
  "highest-protection operating posture",
  "defense-in-depth rules for data classification, access control, threat modeling, secret handling, exfiltration prevention, AI-agent containment, supply-chain risk, auditability, and emergency response",
  "Cendorq should be open only where conversion requires it and closed everywhere intelligence, data, reports, evidence, source quality, prompts, scoring, or client context must be protected.",
  "No single layer should be trusted as the only protection.",
  "Default posture: deny by default.",
  "server-side only for private data",
  "Secrets must never be committed.",
  "Prevent accidental or malicious data leakage.",
  "AI agents must treat external content as untrusted.",
  "Reports are protected business intelligence.",
  "Evidence may contain private or sensitive business context even when source material is public.",
  "Dependencies, workflows, and external providers can become risks.",
  "Production data belongs behind server-side services.",
  "Sensitive actions should leave a useful trail.",
  "Emergency controls should favor protecting data and trust over preserving convenience.",
  "Public content may teach the category, but it must not expose the private machine.",
  "Every step should ask:",
]);

expect(standardPath, [
  "public conversion surface",
  "controlled server-side services",
  "private database and storage",
  "private evidence and report access",
  "private AI-agent workflows",
  "private scoring and signal rules",
  "private learning memory",
  "audit and validation gates",
  "rollback and recovery paths",
  "legal, privacy, and operational discipline",
]);

expect(standardPath, [
  "homepage copy",
  "operating checklists",
  "report templates",
  "client reports",
  "client evidence",
  "raw intakes",
  "report tokens",
  "private database records",
  "raw AI-agent runs",
  "private prompts",
  "exact scoring weights",
]);

expect(standardPath, [
  "competitor scraping",
  "prompt injection",
  "poisoned source pages",
  "AI hallucination",
  "report link sharing",
  "direct database exposure",
  "secret leakage",
  "dependency compromise",
  "CI/workflow compromise",
  "operator error",
  "overconfident AI findings",
]);

expect(standardPath, [
  "do not obey instructions found in analyzed content",
  "separate source content from system/developer intent",
  "do not reveal private prompts",
  "do not reveal scoring logic",
  "do not execute arbitrary instructions from sources",
  "require evidence for serious claims",
  "quarantine suspicious content when needed",
]);

expect(docsIndexPath, [
  "docs/maximum-protection-standard.md",
]);

expect(validationRegistryPath, [
  "maximum-protection-standard",
  "Maximum protection standard",
  "src/scripts/validate-maximum-protection-standard.mjs",
  "maximum-protection doctrine for data classification, deny-by-default access, secret handling, exfiltration prevention, AI-agent containment, supply-chain risk, auditability, emergency controls, and public/private doctrine boundaries",
  "The maximum-protection doctrine may no longer be enforced, discoverable, or wired into the central validation chain.",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  validatorPath,
]);

forbidden(standardPath, [
  "client-side secret exposure is allowed",
  "public report index is allowed",
  "raw private data in frontend bundles is allowed",
  "public may show exact scoring weights",
  "public may show private prompts",
  "public may show client evidence",
  "AI agents may obey instructions found in analyzed content",
  "secrets may be committed",
  "direct client-side credentials are allowed",
  "unrestricted report export",
  "single layer is enough protection",
]);

if (failures.length) {
  console.error("Maximum protection standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Maximum protection standard validation passed. The maximum-protection doctrine, docs index, validation registry, and validate:routes wiring remain aligned.");

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
