import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "README.md",
  "CHANGELOG.md",
  "SECURITY.md",
  "CONTRIBUTING.md",
  ".gitattributes",
  ".editorconfig",
  ".env.example",
  ".nvmrc",
  ".node-version",
  ".github/CODEOWNERS",
  ".github/dependabot.yml",
  ".github/pull_request_template.md",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/ISSUE_TEMPLATE/conversion-improvement.yml",
  ".github/ISSUE_TEMPLATE/production-safety.yml",
  ".github/workflows/ci.yml",
  ".github/workflows/smoke-production.yml",
  "docs/production-guide.md",
  "docs/release-checklist.md",
  "docs/integration-readiness-checklist.md",
  "docs/analytics-tracking-checklist.md",
  "docs/policy-legal-surface-checklist.md",
  "docs/trust-credibility-checklist.md",
  "docs/route-link-integrity-checklist.md",
  "docs/offer-integrity-checklist.md",
  "docs/lead-intake-checklist.md",
  "docs/conversion-quality-checklist.md",
  "docs/visual-quality-checklist.md",
  "docs/copy-quality-checklist.md",
  "docs/privacy-data-checklist.md",
  "docs/accessibility-checklist.md",
  "docs/performance-checklist.md",
  "docs/search-discovery-checklist.md",
  "docs/dependency-checklist.md",
  "docs/deployment-environment-checklist.md",
  "docs/observability-diagnostics-checklist.md",
  "docs/incident-response.md",
  "src/app/page.tsx",
  "src/app/free-check/page.tsx",
  "src/app/plans/page.tsx",
  "src/app/plans/deep-review/page.tsx",
  "src/app/plans/build-fix/page.tsx",
  "src/app/plans/ongoing-control/page.tsx",
  "src/app/connect/page.tsx",
  "src/app/api/health/route.ts",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/app/layout.tsx",
  "src/layout/site-header-conversion.tsx",
  "src/layout/site-footer.tsx",
  "src/scripts/smoke-production.mjs",
  "public/manifest.webmanifest",
  "public/llms.txt",
  "public/.well-known/security.txt",
  "next.config.ts",
];

const canonicalRoutes = [
  "/free-check",
  "/plans",
  "/plans/deep-review",
  "/plans/build-fix",
  "/plans/ongoing-control",
  "/connect",
];

const redirectPairs = [
  ["/pricing", "/plans"],
  ["/pricing/full-diagnosis", "/plans/deep-review"],
  ["/pricing/optimization", "/plans/build-fix"],
  ["/pricing/monthly-partner", "/plans/ongoing-control"],
  ["/contact", "/connect"],
];

const requiredHeaders = [
  "Strict-Transport-Security",
  "X-Content-Type-Options",
  "X-Frame-Options",
  "Referrer-Policy",
  "Permissions-Policy",
  "Cross-Origin-Opener-Policy",
  "X-Permitted-Cross-Domain-Policies",
  "X-Download-Options",
];

const publicFiles = [
  "README.md",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/app/layout.tsx",
  "src/layout/site-header-conversion.tsx",
  "src/layout/site-footer.tsx",
  "src/app/page.tsx",
  "src/app/free-check/page.tsx",
  "src/app/plans/page.tsx",
  "src/app/plans/deep-review/page.tsx",
  "src/app/plans/build-fix/page.tsx",
  "src/app/plans/ongoing-control/page.tsx",
  "src/app/connect/page.tsx",
  "src/app/not-found.tsx",
  "public/manifest.webmanifest",
  "public/llms.txt",
  "public/.well-known/security.txt",
];

const forbiddenActivePublicPhrases = [
  "Visibility Blueprint",
  "Presence Infrastructure",
  "Presence Command",
  "Start Search Presence Scan",
  "View Visibility Blueprint",
  "View Presence Infrastructure",
  "View Presence Command",
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing required route/system file: ${file}`);
}

expect("docs/integration-readiness-checklist.md", [
  "Cendorq Integration Readiness Checklist",
  "Integration principle",
  "Required checks",
  "API handoff checks",
  "Payment and checkout checks",
  "AI service checks",
  "Email, CRM, and notification checks",
  "pnpm validate:routes",
  "pnpm smoke:production",
  "Free Scan",
  "hardcoded credentials",
], "Integration readiness checklist is missing required integration detail");
expect("docs/analytics-tracking-checklist.md", ["Cendorq Analytics and Tracking Checklist", "Analytics principle", "Required checks", "Event naming checks", "Script and pixel checks", "Privacy checks", "Buyer-path measurement checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "hidden tracking"], "Analytics and tracking checklist is missing required analytics detail");
expect("docs/policy-legal-surface-checklist.md", ["Cendorq Policy and Legal Surface Checklist", "Policy principle", "Required checks", "Privacy and data-use checks", "Terms and disclaimer checks", "Security contact checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "fake compliance claims"], "Policy and legal surface checklist is missing required policy detail");
expect("docs/trust-credibility-checklist.md", ["Cendorq Trust and Credibility Checklist", "Trust principle", "Required checks", "Claim checks", "Proof checks", "Security and privacy confidence checks", "Red flags", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "guaranteed rankings"], "Trust and credibility checklist is missing required trust detail");
expect("docs/route-link-integrity-checklist.md", ["Cendorq Route and Link Integrity Checklist", "Route and link principle", "Required checks", "Canonical route checks", "Redirect checks", "Link text checks", "Dead-end checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "Connect", "/pricing", "/contact"], "Route and link integrity checklist is missing required route/link detail");
expect("docs/offer-integrity-checklist.md", ["Cendorq Offer Integrity Checklist", "Offer integrity principle", "Required checks", "Plan clarity checks", "Scope checks", "Guarantee and claim checks", "Pricing and comparison checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control"], "Offer integrity checklist is missing required offer detail");
expect("docs/lead-intake-checklist.md", ["Cendorq Lead Intake Checklist", "Lead intake principle", "Required checks", "Field checks", "Validation checks", "Success and handoff checks", "Privacy checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "Connect"], "Lead intake checklist is missing required lead detail");
expect("docs/visual-quality-checklist.md", ["Cendorq Visual Quality Checklist", "Visual quality principle", "Required checks", "Layout checks", "Mobile checks", "Visual polish checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "premium", "mobile"], "Visual quality checklist is missing required visual detail");
expect("docs/conversion-quality-checklist.md", ["Cendorq Conversion Quality Checklist", "Conversion principle", "Required checks", "Homepage checks", "Plan checks", "Trust checks", "Friction checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control"], "Conversion quality checklist is missing required conversion detail");
expect("docs/observability-diagnostics-checklist.md", ["Cendorq Observability and Diagnostics Checklist", "Observability principle", "Required checks", "Health check checks", "Smoke check checks", "Logging checks", "Incident signal checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"], "Observability and diagnostics checklist is missing required detail");
expect("docs/deployment-environment-checklist.md", ["Cendorq Deployment Environment Checklist", "Deployment principle", "Required checks", "Domain and URL checks", "Environment checks", "Header and redirect checks", "Smoke and rollback checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"], "Deployment environment checklist is missing required detail");
expect("docs/dependency-checklist.md", ["Cendorq Dependency Checklist", "Dependency principle", "Required checks", "Runtime checks", "GitHub Actions checks", "Package checks", "pnpm validate:routes", "pnpm smoke:production", "Node 24"], "Dependency checklist is missing required detail");
expect("docs/privacy-data-checklist.md", ["Cendorq Privacy and Data Handling Checklist", "Privacy principle", "Required checks", "Public form checks", "Environment checks", "Logging checks", "Third-party checks", "pnpm validate:routes", "pnpm smoke:production"], "Privacy and data handling checklist is missing required detail");
expect("docs/copy-quality-checklist.md", ["Cendorq Copy Quality Checklist", "Copy principle", "Required checks", "Approved buyer language", "Language to avoid", "CTA checks", "Trust checks", "pnpm validate:routes", "pnpm smoke:production"], "Copy quality checklist is missing required detail");
expect("docs/search-discovery-checklist.md", ["Cendorq Search Discovery Checklist", "Discovery principle", "Required checks", "Canonical route checks", "Redirect checks", "Public files to check", "pnpm validate:routes", "pnpm smoke:production", "llms.txt", "sitemap"], "Search discovery checklist is missing required detail");
expect("docs/performance-checklist.md", ["Cendorq Performance Checklist", "Performance principle", "Required checks", "Buyer-path checks", "Mobile checks", "Asset checks", "pnpm validate:routes", "pnpm smoke:production"], "Performance checklist is missing required detail");
expect("docs/accessibility-checklist.md", ["Cendorq Accessibility Checklist", "Accessibility principle", "Required checks", "Buyer-path checks", "Mobile checks", "pnpm validate:routes", "pnpm smoke:production"], "Accessibility checklist is missing required detail");
expect("docs/incident-response.md", ["Cendorq Incident Response Runbook", "Severity guide", "First response checklist", "Verification commands", "Recovery path", "After-action checklist", "pnpm validate:routes", "pnpm smoke:production", "Production Smoke Check"], "Incident response runbook is missing required detail");
expect("docs/release-checklist.md", ["Cendorq Release Checklist", "docs/incident-response.md", "CHANGELOG.md", "Release notes standard", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"], "Release checklist is missing required detail");

expect("CHANGELOG.md", ["# Changelog", "## Unreleased", "Integration readiness checklist", "PR template integration readiness gate", "integration-readiness impact", "Analytics and tracking checklist", "PR template analytics and tracking gate", "analytics/tracking impact", "Policy and legal surface checklist", "PR template policy and legal surface gate", "policy/legal impact", "Trust and credibility checklist", "PR template trust and credibility gate", "trust/credibility impact", "Route and link integrity checklist", "PR template route and link integrity gate", "route/link impact", "Offer integrity checklist", "PR template offer integrity gate", "offer-integrity impact", "Lead intake checklist", "PR template lead intake gate", "lead-intake impact", "Visual quality checklist", "PR template visual quality gate", "visual-quality impact", "Conversion quality checklist", "PR template conversion quality gate", "conversion-quality impact", "Observability and diagnostics checklist", "Deployment environment checklist", "Dependency checklist", "Privacy and data handling checklist", "Copy quality checklist", "Accessibility checklist", "Performance checklist", "Search discovery checklist", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control"], "CHANGELOG.md is missing required release-history detail");
expect(".github/pull_request_template.md", ["Buyer-path impact", "Integration readiness check", "docs/integration-readiness-checklist.md", "No integration readiness checklist is needed", "Analytics and tracking check", "docs/analytics-tracking-checklist.md", "No analytics/tracking checklist is needed", "Policy and legal surface check", "docs/policy-legal-surface-checklist.md", "No policy/legal checklist is needed", "Trust and credibility check", "docs/trust-credibility-checklist.md", "No trust/credibility checklist is needed", "Route and link integrity check", "docs/route-link-integrity-checklist.md", "No route/link checklist is needed", "Offer integrity check", "docs/offer-integrity-checklist.md", "No offer integrity checklist is needed", "Lead intake check", "docs/lead-intake-checklist.md", "No lead intake checklist is needed", "Visual quality check", "docs/visual-quality-checklist.md", "No visual quality checklist is needed", "Conversion quality check", "docs/conversion-quality-checklist.md", "No conversion quality checklist is needed", "Release history check", "CHANGELOG.md", "integration readiness", "analytics/tracking", "policy/legal", "trust/credibility", "route/link integrity", "offer integrity", "lead intake", "visual quality", "conversion quality", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"], "Pull request template is missing required integration gate detail");
expect("CONTRIBUTING.md", ["Contributing to Cendorq", "CHANGELOG.md", "Get the right customer to start the Free Scan", "pnpm validate:routes", "pnpm smoke:production"], "CONTRIBUTING.md is missing required operating detail");
expect("README.md", ["Cendorq", "CHANGELOG.md", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control", "pnpm validate:routes", "pnpm smoke:production", "Node 24", "pnpm 9.15.9"], "README is missing required production entry guidance");
expect(".gitattributes", ["* text=auto eol=lf", "*.png binary", "*.webp binary", "*.json text eol=lf", "*.tsx text eol=lf", "*.yml text eol=lf"], ".gitattributes is missing required Git normalization detail");
expect(".editorconfig", ["root = true", "charset = utf-8", "end_of_line = lf", "insert_final_newline = true", "trim_trailing_whitespace = true", "indent_size = 2"], ".editorconfig is missing required editor baseline detail");
expect(".env.example", ["CENDORQ_BASE_URL=https://cendorq.com", "NODE_ENV=development", "NEXT_TELEMETRY_DISABLED=1", "Do not commit real secrets"], ".env.example is missing required safe environment detail");
expect("package.json", ["\"packageManager\": \"pnpm@9.15.9\"", "\"node\": \">=24.0.0\"", "smoke:production"], "package.json is missing required runtime or script detail");
expect("SECURITY.md", ["Security Policy", "Reporting a vulnerability", "https://cendorq.com/connect", "https://cendorq.com/.well-known/security.txt", "pnpm validate:routes", "pnpm smoke:production"], "SECURITY.md is missing required policy detail");
expect(".github/CODEOWNERS", ["* @mybizuness-cmd", "/src/app/ @mybizuness-cmd", "/.github/ @mybizuness-cmd", "/next.config.ts @mybizuness-cmd", "/docs/production-guide.md @mybizuness-cmd"], "CODEOWNERS is missing required review routing detail");
expect(".github/dependabot.yml", ["package-ecosystem: npm", "package-ecosystem: github-actions", "interval: weekly"], "Dependabot config is missing required maintenance guardrail detail");
expect(".github/workflows/ci.yml", ["name: CI", "pull_request:", "push:", "workflow_dispatch:", "permissions:", "contents: read", "persist-credentials: false", "node-version: \"24\"", "pnpm install --frozen-lockfile", "pnpm validate:routes", "pnpm lint", "pnpm typecheck", "pnpm build"], "CI workflow is missing required quality gate detail");
expect(".github/workflows/smoke-production.yml", ["schedule:", "workflow_dispatch", "permissions:", "contents: read", "persist-credentials: false", "pnpm smoke:production", "node-version: \"24\"", "CENDORQ_BASE_URL", "https://cendorq.com"], "Production smoke workflow is missing required detail");
expect("src/scripts/smoke-production.mjs", ["/api/health", "/llms.txt", "/.well-known/security.txt", "/sitemap.xml", "/robots.txt", "CENDORQ_BASE_URL"], "Production smoke script is missing required check");
expect("public/.well-known/security.txt", ["Contact: https://cendorq.com/connect", "Canonical: https://cendorq.com/.well-known/security.txt", "Policy: https://cendorq.com/terms", "Expires:"], "security.txt is missing required detail");
expect("src/app/api/health/route.ts", ["force-dynamic", "revalidate = 0", "ok: true", "Cache-Control", "no-store", "X-Robots-Tag"], "Health endpoint is missing required runtime-safe response detail");

if (read(".nvmrc").trim() !== "24") failures.push(".nvmrc must pin Node 24.");
if (read(".node-version").trim() !== "24") failures.push(".node-version must pin Node 24.");

const nextConfig = read("next.config.ts");
for (const [source, destination] of redirectPairs) {
  if (!nextConfig.includes(`source: "${source}"`)) failures.push(`Missing redirect source in next.config.ts: ${source}`);
  if (!nextConfig.includes(`destination: "${destination}"`)) failures.push(`Missing redirect destination in next.config.ts: ${destination}`);
}
for (const header of requiredHeaders) if (!nextConfig.includes(`key: "${header}"`)) failures.push(`Missing production hardening header: ${header}`);
for (const discoveryRoute of ["/robots.txt", "/sitemap.xml", "/llms.txt", "/.well-known/security.txt"]) if (!nextConfig.includes(`source: "${discoveryRoute}"`)) failures.push(`Crawler/security cache headers must cover ${discoveryRoute}.`);
if (!nextConfig.includes("text/plain; charset=utf-8")) failures.push("Plain text discovery files must be served with an explicit text/plain UTF-8 content type.");

const sitemap = read("src/app/sitemap.ts");
for (const route of canonicalRoutes) if (!sitemap.includes(`path: "${route}"`)) failures.push(`Sitemap does not include canonical route: ${route}`);
for (const legacyRoute of ["/pricing", "/contact"]) if (sitemap.includes(`path: "${legacyRoute}"`)) failures.push(`Sitemap should not list redirected legacy route: ${legacyRoute}`);

const robots = read("src/app/robots.ts");
for (const route of canonicalRoutes) if (!robots.includes(`"${route}"`)) failures.push(`Robots allowlist does not include canonical route: ${route}`);
for (const legacyRoute of ["/pricing", "/contact"]) if (robots.includes(`"${legacyRoute}"`)) failures.push(`Robots allowlist should not include redirected legacy route: ${legacyRoute}`);

const manifest = read("public/manifest.webmanifest");
for (const route of ["/free-check?source=app-install", "/free-check?source=app-shortcut", "/plans?source=app-shortcut", "/connect?source=app-shortcut"]) if (!manifest.includes(`"${route}"`)) failures.push(`Manifest does not include buyer-path route: ${route}`);
if (!manifest.includes("Start Free Scan") || !manifest.includes("Compare Plans") || !manifest.includes("Connect")) failures.push("Manifest shortcuts must include Start Free Scan, Compare Plans, and Connect.");

const llms = read("public/llms.txt");
for (const route of canonicalRoutes) if (!llms.includes(route)) failures.push(`llms.txt does not include canonical route: ${route}`);
for (const phrase of ["Free Scan", "Deep Review", "Build Fix", "Ongoing Control", "make the business easier to understand", "make the business easier to trust", "make the business easier to choose"]) if (!llms.includes(phrase)) failures.push(`llms.txt does not include required positioning phrase: ${phrase}`);

const publicText = publicFiles.map((file) => `\n/* ${file} */\n${read(file)}`).join("\n");
for (const route of ["/pricing/full-diagnosis", "/pricing/optimization", "/pricing/monthly-partner"]) if (publicText.includes(route)) failures.push(`Active public navigation/metadata should not reference legacy pricing route: ${route}`);
for (const phrase of forbiddenActivePublicPhrases) if (publicText.includes(phrase) && !llms.includes(`- ${phrase}`)) failures.push(`Active public surfaces should use plain buyer language instead of legacy phrase: ${phrase}`);
if (!publicText.includes("Free Scan") || !publicText.includes("Deep Review") || !publicText.includes("Build Fix") || !publicText.includes("Ongoing Control")) failures.push("Public buyer path labels are incomplete. Expected Free Scan, Deep Review, Build Fix, and Ongoing Control.");

if (failures.length) {
  console.error("Route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Route validation passed. Integration readiness checklist, PR integration gate, analytics and tracking checklist, PR analytics/tracking gate, policy and legal surface checklist, PR policy/legal gate, trust and credibility checklist, PR trust gate, route and link integrity checklist, PR route/link gate, offer integrity checklist, PR offer integrity gate, lead intake checklist, PR lead intake gate, visual quality checklist, PR visual quality gate, conversion quality checklist, PR conversion quality gate, observability and diagnostics checklist, PR observability gate, deployment environment checklist, PR deployment environment gate, dependency checklist, PR dependency gate, privacy and data handling checklist, PR privacy/data gate, copy quality checklist, PR copy quality gate, search discovery checklist, PR search discovery gate, performance checklist, PR performance gate, accessibility checklist, PR accessibility gate, PR template release-history gate, changelog, incident response runbook, release checklist, main CI workflow, scheduled production smoke check, Git normalization baseline, editor baseline, environment template, runtime pins, contributor rules, review ownership routing, repository security policy, Dependabot maintenance, issue intake gates, PR quality gate, README, canonical buyer path, production guide, production smoke script, security contact, runtime health endpoint, llms.txt delivery, plain-language surfaces, manifest, and production hardening are protected.");

function expect(path, phrases, label) {
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${label}: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
