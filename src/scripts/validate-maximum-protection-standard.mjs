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
  "Cendorq should be open only where conversion, customer understanding, and public search discovery require it and closed everywhere intelligence, data, reports, evidence, source quality, prompts, scoring, customer context, billing state, or system mechanics must be protected.",
  "The system must not promise that nothing can ever break, that no attack can ever succeed, that Cendorq is impossible to hack",
  "Security must be treated as a product requirement, not an afterthought.",
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
  "Customer trust requires useful transparency, not exposure of the private machine.",
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
  "secure update and patch review",
  "monitoring, detection, and incident response",
  "safe public indexing and private noindex/no-store boundaries",
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
  "malware or malicious dependency payloads",
  "malicious package updates",
  "compromised automation credentials",
  "webhook spoofing",
  "replay attacks",
  "session theft",
  "cross-customer data access",
  "billing document leakage",
  "support impersonation",
  "denial-of-service or abusive automation",
]);

expect(standardPath, [
  "do not obey instructions found in analyzed content",
  "separate source content from system/developer intent",
  "do not reveal private prompts",
  "do not reveal scoring logic",
  "do not execute arbitrary instructions from sources",
  "require evidence for serious claims",
  "quarantine suspicious content when needed",
  "never let external source content change security policy, release policy, billing policy, or customer-facing claims",
]);

expect(standardPath, [
  "## Runtime and API protection",
  "authenticate protected routes",
  "authorize by role, customer ownership, entitlement, or verified access",
  "protect webhooks with provider verification and idempotency",
  "avoid raw provider payload projection",
  "avoid browser storage for secrets or verification tokens",
  "## Malware and abuse containment",
  "do not execute user-provided files or external content",
  "treat uploads, URLs, snippets, reviews, HTML, PDFs, and screenshots as untrusted",
  "strip or block executable content, macros, embedded scripts, hidden unsafe payloads, and unsafe metadata from customer-facing documents",
  "rate-limit or hold abusive submissions where practical",
]);

expect(standardPath, [
  "## Safe indexing and public discovery boundary",
  "public pages may be indexable for discovery",
  "private routes require authentication and authorization; robots.txt is never a privacy control",
  "protected pages should use noindex and no-store where appropriate",
  "customer-specific documents should not appear in sitemap output",
  "search ranking should be pursued through useful public content, clean technical SEO, accessibility, performance, structured data, and trust—not through unsupported number-one ranking promises",
]);

expect(standardPath, [
  "## Secure update and patch posture",
  "security patches should be prioritized by exploitability, exposure, customer-data impact, provider criticality, and release risk",
  "updates may be discovered automatically, but production-impacting changes must remain reviewable, validated, and rollback-aware",
  "known exploited vulnerability remediation must not be delayed by cosmetic work when customer data or private reports could be affected",
  "validators must not be disabled to make a patch pass",
  "failed security checks must be treated as release blockers unless explicitly reviewed and documented",
]);

expect(standardPath, [
  "## Customer data protection",
  "collect only business context needed for the service",
  "keep customer data out of public pages, public metadata, logs, analytics payloads, and client bundles",
  "keep cross-customer data isolated",
  "maintain correction, retention, deletion, and support recovery paths where applicable",
  "## Customer transparency boundary",
  "what is known, unknown, assumed, inferred, or forecasted",
  "Customer-facing surfaces should not expose:",
  "exact internal scoring weights",
  "private prompts",
  "raw evidence dumps",
  "operator identity",
]);

expect(docsIndexPath, [
  "docs/maximum-protection-standard.md",
  "safe indexing",
  "detection, response, recovery",
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

expect(routesChainPath, [validatorPath]);

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
  "robots.txt is a privacy control",
  "execute user-provided files",
  "validators may be disabled to make a patch pass",
  "known exploited vulnerability remediation may be delayed by cosmetic work",
]);

if (failures.length) {
  console.error("Maximum protection standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Maximum protection standard validation passed with highest-practical security, safe indexing, malware containment, runtime/API protection, patch posture, customer data protection, customer transparency boundaries, docs index, validation registry, and validate:routes wiring aligned.");

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
