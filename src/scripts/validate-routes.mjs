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
  "docs/ai-agent-handoff.md",
  "docs/final-hardening-sweep.md",
  "docs/backend-handoff-checklist.md",
  "docs/manual-qa-acceptance-checklist.md",
  "docs/content-freshness-checklist.md",
  "docs/configuration-safety-checklist.md",
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

const canonicalRoutes = ["/free-check", "/plans", "/plans/deep-review", "/plans/build-fix", "/plans/ongoing-control", "/connect"];
const policyRoutes = ["/privacy", "/terms", "/disclaimer"];
const legacyDiscoveryRoutes = ["/pricing", "/pricing/full-diagnosis", "/pricing/optimization", "/pricing/monthly-partner", "/contact", "/how-it-works", "/diagnosis", "/profile", "/faq"];
const redirectPairs = [
  ["/pricing", "/plans"],
  ["/pricing/full-diagnosis", "/plans/deep-review"],
  ["/pricing/optimization", "/plans/build-fix"],
  ["/pricing/monthly-partner", "/plans/ongoing-control"],
  ["/contact", "/connect"],
  ["/how-it-works", "/plans"],
  ["/diagnosis", "/plans/deep-review"],
  ["/profile", "/plans"],
  ["/faq", "/plans"],
  ["/freecheck", "/free-check"],
  ["/full-diagnosis", "/plans/deep-review"],
  ["/optimization", "/plans/build-fix"],
  ["/monthly-partner", "/plans/ongoing-control"],
];
const requiredHeaders = ["Strict-Transport-Security", "X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy", "Permissions-Policy", "Cross-Origin-Opener-Policy", "X-Permitted-Cross-Domain-Policies", "X-Download-Options"];
const publicFiles = ["README.md", "src/app/sitemap.ts", "src/app/robots.ts", "src/app/layout.tsx", "src/layout/site-header-conversion.tsx", "src/layout/site-footer.tsx", "src/app/page.tsx", "src/app/free-check/page.tsx", "src/app/plans/page.tsx", "src/app/plans/deep-review/page.tsx", "src/app/plans/build-fix/page.tsx", "src/app/plans/ongoing-control/page.tsx", "src/app/connect/page.tsx", "src/app/not-found.tsx", "public/manifest.webmanifest", "public/llms.txt", "public/.well-known/security.txt"];
const forbiddenActivePublicPhrases = ["Visibility Blueprint", "Presence Infrastructure", "Presence Command", "Start Search Presence Scan", "View Visibility Blueprint", "View Presence Infrastructure", "View Presence Command"];

const checklistExpectations = [
  ["docs/ai-agent-handoff.md", ["Cendorq AI Agent Handoff Guide", "Current project context", "Current readiness state", "Validation baseline", "Important protected files", "Working rules for the next agent", "Backend ZIP handoff expectations", "Recommended next-session prompt", "What to do before saying the handoff is complete", "Free Scan", "pnpm validate:routes"]],
  ["docs/final-hardening-sweep.md", ["Cendorq Final Hardening Sweep", "Three independent deep analyses", "Five independent hardening passes", "Buyer-path and conversion review", "Production safety and operations review", "Maintenance and future-backend review", "Required evidence before merge", "pnpm validate:routes", "pnpm smoke:production"]],
  ["docs/backend-handoff-checklist.md", ["Cendorq Backend Handoff Checklist", "Backend handoff principle", "Required pre-handoff checks", "ZIP intake checks", "Security and privacy checks", "Data handling checks", "AI-agent handoff checks", "Operational checks", "docs/ai-agent-handoff.md", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"]],
  ["docs/manual-qa-acceptance-checklist.md", ["Cendorq Manual QA and Acceptance Checklist", "Manual QA principle", "Required checks", "Browser and viewport checks", "Buyer-path walkthrough", "Regression checks", "Acceptance criteria checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"]],
  ["docs/content-freshness-checklist.md", ["Cendorq Content Freshness Checklist", "Content freshness principle", "Required checks", "Stale-label checks", "Screenshot and example checks", "Plan and offer freshness checks", "Release-history checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"]],
  ["docs/configuration-safety-checklist.md", ["Cendorq Configuration Safety Checklist", "Configuration principle", "Required checks", "Environment variable checks", "Public/private config checks", "Drift checks", "Failure-state checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"]],
  ["docs/integration-readiness-checklist.md", ["Cendorq Integration Readiness Checklist", "Integration principle", "Required checks", "API handoff checks", "Payment and checkout checks", "AI service checks", "Email, CRM, and notification checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"]],
  ["docs/analytics-tracking-checklist.md", ["Cendorq Analytics and Tracking Checklist", "Analytics principle", "Required checks", "Event naming checks", "Script and pixel checks", "Privacy checks", "Buyer-path measurement checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"]],
  ["docs/policy-legal-surface-checklist.md", ["Cendorq Policy and Legal Surface Checklist", "Policy principle", "Required checks", "Privacy and data-use checks", "Terms and disclaimer checks", "Security contact checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"]],
  ["docs/trust-credibility-checklist.md", ["Cendorq Trust and Credibility Checklist", "Trust principle", "Required checks", "Claim checks", "Proof checks", "Security and privacy confidence checks", "Red flags", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"]],
  ["docs/route-link-integrity-checklist.md", ["Cendorq Route and Link Integrity Checklist", "Route and link principle", "Required checks", "Canonical route checks", "Redirect checks", "Link text checks", "Dead-end checks", "legacy", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "Connect"]],
  ["docs/offer-integrity-checklist.md", ["Cendorq Offer Integrity Checklist", "Offer integrity principle", "Required checks", "Plan clarity checks", "Scope checks", "Guarantee and claim checks", "Pricing and comparison checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"]],
  ["docs/lead-intake-checklist.md", ["Cendorq Lead Intake Checklist", "Lead intake principle", "Required checks", "Field checks", "Validation checks", "Success and handoff checks", "Privacy checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan", "Connect"]],
  ["docs/visual-quality-checklist.md", ["Cendorq Visual Quality Checklist", "Visual quality principle", "Required checks", "Layout checks", "Mobile checks", "Visual polish checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"]],
  ["docs/conversion-quality-checklist.md", ["Cendorq Conversion Quality Checklist", "Conversion principle", "Required checks", "Homepage checks", "Plan checks", "Trust checks", "Friction checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"]],
  ["docs/observability-diagnostics-checklist.md", ["Cendorq Observability and Diagnostics Checklist", "Observability principle", "Required checks", "Health check checks", "Smoke check checks", "Logging checks", "Incident signal checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"]],
  ["docs/deployment-environment-checklist.md", ["Cendorq Deployment Environment Checklist", "Deployment principle", "Required checks", "Domain and URL checks", "Environment checks", "Header and redirect checks", "Smoke and rollback checks", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"]],
  ["docs/dependency-checklist.md", ["Cendorq Dependency Checklist", "Dependency principle", "Required checks", "Runtime checks", "GitHub Actions checks", "Package checks", "pnpm validate:routes", "pnpm smoke:production", "Node 24"]],
  ["docs/privacy-data-checklist.md", ["Cendorq Privacy and Data Handling Checklist", "Privacy principle", "Required checks", "Public form checks", "Environment checks", "Logging checks", "Third-party checks", "pnpm validate:routes", "pnpm smoke:production"]],
  ["docs/copy-quality-checklist.md", ["Cendorq Copy Quality Checklist", "Copy principle", "Required checks", "Approved buyer language", "Language to avoid", "CTA checks", "Trust checks", "pnpm validate:routes", "pnpm smoke:production"]],
  ["docs/search-discovery-checklist.md", ["Cendorq Search Discovery Checklist", "Discovery principle", "Required checks", "Canonical route checks", "Redirect checks", "Public files to check", "legacy", "pnpm validate:routes", "pnpm smoke:production", "llms.txt", "sitemap"]],
  ["docs/performance-checklist.md", ["Cendorq Performance Checklist", "Performance principle", "Required checks", "Buyer-path checks", "Mobile checks", "Asset checks", "pnpm validate:routes", "pnpm smoke:production"]],
  ["docs/accessibility-checklist.md", ["Cendorq Accessibility Checklist", "Accessibility principle", "Required checks", "Buyer-path checks", "Mobile checks", "pnpm validate:routes", "pnpm smoke:production"]],
  ["docs/incident-response.md", ["Cendorq Incident Response Runbook", "Severity guide", "First response checklist", "Verification commands", "Recovery path", "After-action checklist", "pnpm validate:routes", "pnpm smoke:production", "Production Smoke Check"]],
  ["docs/release-checklist.md", ["Cendorq Release Checklist", "docs/incident-response.md", "CHANGELOG.md", "legacy route", "Release notes standard", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"]],
];

for (const file of requiredFiles) if (!existsSync(join(root, file))) failures.push(`Missing required route/system file: ${file}`);
for (const [path, phrases] of checklistExpectations) expect(path, phrases, `${path} is missing required detail`);

expect("CHANGELOG.md", ["# Changelog", "## Unreleased", "legacy public-route governance", "redirect smoke checks", "AI-agent handoff guide", "PR template AI-agent handoff gate", "AI-agent-handoff impact", "Final hardening sweep guide", "Backend handoff checklist", "PR template final hardening gate", "PR template backend handoff gate", "final-hardening impact", "backend-handoff impact", "Manual QA and acceptance checklist", "Content freshness checklist", "Configuration safety checklist", "Integration readiness checklist", "Analytics and tracking checklist", "Policy and legal surface checklist", "Trust and credibility checklist", "Route and link integrity checklist", "Offer integrity checklist", "Lead intake checklist", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control"], "CHANGELOG.md is missing required release-history detail");
expect(".github/pull_request_template.md", ["Buyer-path impact", "Checklist gates", "docs/ai-agent-handoff.md", "docs/final-hardening-sweep.md", "docs/backend-handoff-checklist.md", "docs/manual-qa-acceptance-checklist.md", "docs/content-freshness-checklist.md", "docs/configuration-safety-checklist.md", "Production safety check", "Release history check", "CHANGELOG.md", "AI-agent handoff", "final hardening", "backend handoff", "pnpm validate:routes", "pnpm smoke:production", "Free Scan"], "Pull request template is missing required AI-agent handoff gate detail");
expect("CONTRIBUTING.md", ["Contributing to Cendorq", "CHANGELOG.md", "Get the right customer to start the Free Scan", "pnpm validate:routes", "pnpm smoke:production"], "CONTRIBUTING.md is missing required operating detail");
expect("README.md", ["Cendorq", "CHANGELOG.md", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control", "legacy public routes", "pnpm validate:routes", "pnpm smoke:production", "Node 24", "pnpm 9.15.9"], "README is missing required production entry guidance");
expect(".gitattributes", ["* text=auto eol=lf", "*.png binary", "*.webp binary", "*.json text eol=lf", "*.tsx text eol=lf", "*.yml text eol=lf"], ".gitattributes is missing required Git normalization detail");
expect(".editorconfig", ["root = true", "charset = utf-8", "end_of_line = lf", "insert_final_newline = true", "trim_trailing_whitespace = true", "indent_size = 2"], ".editorconfig is missing required editor baseline detail");
expect(".env.example", ["CENDORQ_BASE_URL=https://cendorq.com", "NODE_ENV=development", "NEXT_TELEMETRY_DISABLED=1", "Do not commit real secrets"], ".env.example is missing required safe environment detail");
expect("package.json", ["\"packageManager\": \"pnpm@9.15.9\"", "\"node\": \">=24.0.0\"", "smoke:production"], "package.json is missing required runtime or script detail");
expect("SECURITY.md", ["Security Policy", "Reporting a vulnerability", "https://cendorq.com/connect", "https://cendorq.com/.well-known/security.txt", "pnpm validate:routes", "pnpm smoke:production"], "SECURITY.md is missing required policy detail");
expect(".github/CODEOWNERS", ["* @mybizuness-cmd", "/src/app/ @mybizuness-cmd", "/.github/ @mybizuness-cmd", "/next.config.ts @mybizuness-cmd", "/docs/production-guide.md @mybizuness-cmd"], "CODEOWNERS is missing required review routing detail");
expect(".github/dependabot.yml", ["package-ecosystem: npm", "package-ecosystem: github-actions", "interval: weekly"], "Dependabot config is missing required maintenance guardrail detail");
expect(".github/workflows/ci.yml", ["name: CI", "pull_request:", "push:", "workflow_dispatch:", "permissions:", "contents: read", "persist-credentials: false", "node-version: \"24\"", "pnpm install --frozen-lockfile", "pnpm validate:routes", "pnpm lint", "pnpm typecheck", "pnpm build"], "CI workflow is missing required quality gate detail");
expect(".github/workflows/smoke-production.yml", ["schedule:", "workflow_dispatch", "permissions:", "contents: read", "persist-credentials: false", "pnpm smoke:production", "node-version: \"24\"", "CENDORQ_BASE_URL", "https://cendorq.com"], "Production smoke workflow is missing required detail");
expect("src/scripts/smoke-production.mjs", ["redirectChecks", "/api/health", "/llms.txt", "/.well-known/security.txt", "/sitemap.xml", "/robots.txt", "/diagnosis", "/profile", "/faq", "CENDORQ_BASE_URL"], "Production smoke script is missing required route or redirect check");
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
for (const route of [...canonicalRoutes, ...policyRoutes]) if (!sitemap.includes(`path: "${route}"`)) failures.push(`Sitemap does not include current public route: ${route}`);
for (const legacyRoute of legacyDiscoveryRoutes) if (sitemap.includes(`path: "${legacyRoute}"`) || sitemap.includes(`"${legacyRoute}"`)) failures.push(`Sitemap should not list redirected or legacy public route: ${legacyRoute}`);

const robots = read("src/app/robots.ts");
for (const route of [...canonicalRoutes, ...policyRoutes]) if (!robots.includes(`"${route}"`)) failures.push(`Robots allowlist does not include current public route: ${route}`);
for (const legacyRoute of legacyDiscoveryRoutes) if (robots.includes(`"${legacyRoute}"`)) failures.push(`Robots allowlist should not include redirected or legacy public route: ${legacyRoute}`);

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

console.log("Route validation passed. AI-agent handoff, final hardening sweep, backend handoff checklist, compact PR checklist gates, changelog release-history detail, buyer path, legacy redirects, governance checklists, canonical routes, production files, runtime pins, smoke checks, and production hardening are protected.");

function expect(path, phrases, label) {
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${label}: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
