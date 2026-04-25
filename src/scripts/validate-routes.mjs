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

const canonicalRoutes = ["/free-check", "/plans", "/plans/deep-review", "/plans/build-fix", "/plans/ongoing-control", "/connect"];
const redirectPairs = [["/pricing", "/plans"], ["/pricing/full-diagnosis", "/plans/deep-review"], ["/pricing/optimization", "/plans/build-fix"], ["/pricing/monthly-partner", "/plans/ongoing-control"], ["/contact", "/connect"]];
const requiredHeaders = ["Strict-Transport-Security", "X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy", "Cross-Origin-Opener-Policy", "X-Permitted-Cross-Domain-Policies", "X-Download-Options"];
const forbiddenActivePublicPhrases = ["Visibility Blueprint", "Presence Infrastructure", "Presence Command", "Start Search Presence Scan", "View Visibility Blueprint", "View Presence Infrastructure", "View Presence Command"];
const publicFiles = ["README.md", "src/app/sitemap.ts", "src/app/robots.ts", "src/app/layout.tsx", "src/layout/site-header-conversion.tsx", "src/layout/site-footer.tsx", "src/app/page.tsx", "src/app/free-check/page.tsx", "src/app/plans/page.tsx", "src/app/plans/deep-review/page.tsx", "src/app/plans/build-fix/page.tsx", "src/app/plans/ongoing-control/page.tsx", "src/app/connect/page.tsx", "src/app/not-found.tsx", "public/manifest.webmanifest", "public/llms.txt", "public/.well-known/security.txt"];

for (const file of requiredFiles) if (!existsSync(join(root, file))) failures.push(`Missing required route/system file: ${file}`);

expect("docs/observability-diagnostics-checklist.md", ["Cendorq Observability and Diagnostics Checklist", "Observability principle", "Required checks", "Health check checks", "Smoke check checks", "Logging checks", "Incident signal checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "without exposing sensitive data"], "Observability and diagnostics checklist is missing required observability detail");
expect("docs/deployment-environment-checklist.md", ["Cendorq Deployment Environment Checklist", "Deployment principle", "Required checks", "Domain and URL checks", "Environment checks", "Header and redirect checks", "Smoke and rollback checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "https://cendorq.com"], "Deployment environment checklist is missing required deployment detail");
expect("docs/dependency-checklist.md", ["Cendorq Dependency Checklist", "Dependency principle", "Required checks", "Runtime checks", "GitHub Actions checks", "Package checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "Node 24", "persist-credentials: false"], "Dependency checklist is missing required dependency detail");
expect("docs/privacy-data-checklist.md", ["Cendorq Privacy and Data Handling Checklist", "Privacy principle", "Required checks", "Public form checks", "Environment checks", "Logging checks", "Third-party checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"], "Privacy and data handling checklist is missing required privacy detail");
expect("docs/copy-quality-checklist.md", ["Cendorq Copy Quality Checklist", "Copy principle", "Required checks", "Approved buyer language", "Language to avoid", "CTA checks", "Trust checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"], "Copy quality checklist is missing required copy detail");
expect("docs/search-discovery-checklist.md", ["Cendorq Search Discovery Checklist", "Discovery principle", "Required checks", "Canonical route checks", "Redirect checks", "Public files to check", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "llms.txt", "sitemap"], "Search discovery checklist is missing required discovery detail");
expect("docs/performance-checklist.md", ["Cendorq Performance Checklist", "Performance principle", "Required checks", "Buyer-path checks", "Mobile checks", "Asset checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "lightweight", "mobile"], "Performance checklist is missing required performance detail");
expect("docs/accessibility-checklist.md", ["Cendorq Accessibility Checklist", "Accessibility principle", "Required checks", "Buyer-path checks", "Mobile checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "keyboard", "mobile"], "Accessibility checklist is missing required accessibility detail");
expect("docs/incident-response.md", ["Cendorq Incident Response Runbook", "Severity guide", "First response checklist", "Verification commands", "Recovery path", "After-action checklist", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "Production Smoke Check"], "Incident response runbook is missing required response detail");
expect("docs/release-checklist.md", ["Cendorq Release Checklist", "docs/incident-response.md", "docs/copy-quality-checklist.md", "docs/privacy-data-checklist.md", "docs/accessibility-checklist.md", "docs/performance-checklist.md", "docs/search-discovery-checklist.md", "docs/dependency-checklist.md", "docs/deployment-environment-checklist.md", "docs/observability-diagnostics-checklist.md", "CHANGELOG.md", "observability", "deployment environment", "dependency", "privacy", "copy", "accessibility", "performance", "search discovery", "Release notes standard", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"], "Release checklist is missing required deployment detail");

expect("CHANGELOG.md", ["# Changelog", "## Unreleased", "Observability and diagnostics checklist", "Deployment environment checklist", "Dependency checklist", "Privacy and data handling checklist", "Copy quality checklist", "Accessibility checklist", "Performance checklist", "Search discovery checklist", "PR template observability and diagnostics gate", "PR template deployment environment gate", "PR template dependency gate", "PR template privacy and data handling gate", "PR template copy quality gate", "PR template accessibility gate", "PR template performance gate", "PR template search discovery gate", "observability impact", "deployment-environment impact", "dependency impact", "privacy/data impact", "copy-quality impact", "search-discovery impact", "accessibility impact", "performance impact", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control"], "CHANGELOG.md is missing required release-history detail");
expect("CONTRIBUTING.md", ["Contributing to Cendorq", "docs/observability-diagnostics-checklist.md", "docs/deployment-environment-checklist.md", "docs/dependency-checklist.md", "docs/privacy-data-checklist.md", "docs/copy-quality-checklist.md", "docs/accessibility-checklist.md", "docs/performance-checklist.md", "docs/search-discovery-checklist.md", "Observability and diagnostics", "Deployment environment", "Dependency safety", "Privacy and data handling", "Copy quality", "Accessibility", "Performance", "Search discovery", "CHANGELOG.md", "Get the right customer to start the Free Scan", "pnpm validate:routes", "pnpm smoke:production"], "CONTRIBUTING.md is missing required operating rule");
expect("README.md", ["Cendorq", "CHANGELOG.md", "docs/observability-diagnostics-checklist.md", "docs/deployment-environment-checklist.md", "docs/dependency-checklist.md", "docs/privacy-data-checklist.md", "docs/copy-quality-checklist.md", "docs/accessibility-checklist.md", "docs/performance-checklist.md", "docs/search-discovery-checklist.md", "observability and diagnostics checks", "deployment environment checks", "dependency and supply-chain checks", "privacy and data handling checks", "copy quality checks", "accessibility checks", "performance checks", "search discovery checks", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control", "pnpm validate:routes", "pnpm smoke:production", "Node 24", "pnpm 9.15.9"], "README is missing required production entry guidance");
expect(".github/pull_request_template.md", ["Buyer-path impact", "Conversion check", "Observability and diagnostics check", "docs/observability-diagnostics-checklist.md", "No observability checklist is needed", "Deployment environment check", "docs/deployment-environment-checklist.md", "No deployment environment checklist is needed", "Dependency check", "docs/dependency-checklist.md", "No dependency checklist is needed", "Privacy and data handling check", "docs/privacy-data-checklist.md", "No privacy/data checklist is needed", "Copy quality check", "docs/copy-quality-checklist.md", "Accessibility check", "docs/accessibility-checklist.md", "Performance check", "docs/performance-checklist.md", "Search discovery check", "docs/search-discovery-checklist.md", "Release history check", "CHANGELOG.md", "observability", "deployment environment", "dependency", "privacy", "copy quality", "accessibility", "performance", "search discovery", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"], "Pull request template is missing required quality gate detail");

expect(".gitattributes", ["* text=auto eol=lf", "*.png binary", "*.webp binary", "*.json text eol=lf", "*.tsx text eol=lf", "*.yml text eol=lf"], ".gitattributes is missing required Git normalization detail");
expect(".editorconfig", ["root = true", "charset = utf-8", "end_of_line = lf", "insert_final_newline = true", "trim_trailing_whitespace = true", "indent_size = 2"], ".editorconfig is missing required editor baseline detail");
expect(".env.example", ["CENDORQ_BASE_URL=https://cendorq.com", "NODE_ENV=development", "VERCEL_ENV=development", "VERCEL_GIT_COMMIT_SHA=local", "GITHUB_SHA=local", "NEXT_TELEMETRY_DISABLED=1", "Do not commit real secrets"], ".env.example is missing required safe environment detail");
expect("package.json", ["\"packageManager\": \"pnpm@9.15.9\"", "\"node\": \">=24.0.0\"", "smoke:production"], "package.json is missing required runtime or script detail");
expect("SECURITY.md", ["Security Policy", "Reporting a vulnerability", "https://cendorq.com/connect", "https://cendorq.com/.well-known/security.txt", "pnpm validate:routes", "pnpm smoke:production"], "SECURITY.md is missing required policy detail");
expect(".github/CODEOWNERS", ["* @mybizuness-cmd", "/src/app/ @mybizuness-cmd", "/.github/ @mybizuness-cmd", "/next.config.ts @mybizuness-cmd", "/docs/production-guide.md @mybizuness-cmd"], "CODEOWNERS is missing required review routing detail");
expect(".github/dependabot.yml", ["package-ecosystem: npm", "package-ecosystem: github-actions", "interval: weekly", "next-react-platform", "typescript-tooling", "github-actions"], "Dependabot config is missing required maintenance guardrail detail");
expect(".github/ISSUE_TEMPLATE/config.yml", ["blank_issues_enabled: false", "Production guide", "Start from Connect"], "Issue template config is missing required detail");
expect(".github/ISSUE_TEMPLATE/conversion-improvement.yml", ["Conversion improvement", "Buyer-path impact", "Current drag or confusion", "Proposed change", "Free Scan"], "Conversion issue template is missing required detail");
expect(".github/ISSUE_TEMPLATE/production-safety.yml", ["Production safety", "Production issue or improvement", "Expected validation", "pnpm validate:routes", "Health endpoint"], "Production issue template is missing required detail");
expect("docs/production-guide.md", ["Cendorq Production Guide", "docs/release-checklist.md", "docs/incident-response.md", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control", "The homepage has one job"], "Production guide is missing required guidance");
expect(".github/workflows/ci.yml", ["name: CI", "pull_request:", "push:", "workflow_dispatch:", "permissions:", "contents: read", "persist-credentials: false", "FORCE_JAVASCRIPT_ACTIONS_TO_NODE24", "pnpm/action-setup@v4", "node-version: \"24\"", "pnpm install --frozen-lockfile", "pnpm validate:routes", "pnpm lint", "pnpm typecheck", "pnpm build"], "CI workflow is missing required quality gate detail");
expect(".github/workflows/smoke-production.yml", ["schedule:", "17 9 * * *", "workflow_dispatch", "permissions:", "contents: read", "persist-credentials: false", "base_url", "pnpm smoke:production", "node-version: \"24\"", "CENDORQ_BASE_URL", "https://cendorq.com"], "Production smoke workflow is missing required detail");
expect("src/scripts/smoke-production.mjs", ["/api/health", "/llms.txt", "/.well-known/security.txt", "/sitemap.xml", "/robots.txt", "CENDORQ_BASE_URL"], "Production smoke script is missing required check");
expect("public/.well-known/security.txt", ["Contact: https://cendorq.com/connect", "Canonical: https://cendorq.com/.well-known/security.txt", "Policy: https://cendorq.com/terms", "Expires:"], "security.txt is missing required detail");
expect("src/app/api/health/route.ts", ["force-dynamic", "revalidate = 0", "ok: true", "cendorq-platform", "healthy", "environment", "commit", "Cache-Control", "no-store", "X-Robots-Tag"], "Health endpoint is missing required runtime-safe response detail");

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

const layout = read("src/app/layout.tsx");
for (const route of ["/plans/deep-review", "/plans/build-fix", "/plans/ongoing-control"]) if (!layout.includes(`path: "${route}"`)) failures.push(`Structured data catalog does not include: ${route}`);

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

console.log("Route validation passed. Observability and diagnostics checklist, PR observability gate, deployment environment checklist, PR deployment environment gate, dependency checklist, PR dependency gate, privacy and data handling checklist, PR privacy/data gate, copy quality checklist, PR copy quality gate, search discovery checklist, PR search discovery gate, performance checklist, PR performance gate, accessibility checklist, PR accessibility gate, PR template release-history gate, changelog, checkout credential hardening, incident response runbook, release checklist, main CI workflow, scheduled production smoke check, Git normalization baseline, editor baseline, environment template, runtime pins, contributor rules, review ownership routing, repository security policy, Dependabot maintenance, issue intake gates, PR quality gate, README, canonical buyer path, production guide, production smoke script, security contact, runtime health endpoint, llms.txt delivery, plain-language surfaces, manifest, and production hardening are protected.");

function expect(path, phrases, label) {
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${label}: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
