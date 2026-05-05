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
  "docs/production-verification-status.md",
  "docs/incident-response.md",
  "src/app/page.tsx",
  "src/app/free-check/page.tsx",
  "src/app/plans/page.tsx",
  "src/app/plans/deep-review/page.tsx",
  "src/app/plans/build-fix/page.tsx",
  "src/app/plans/ongoing-control/page.tsx",
  "src/app/connect/page.tsx",
  "src/app/api/health/route.ts",
  "src/app/api/free-check/route.ts",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/app/manifest.ts",
  "src/app/opengraph-image.tsx",
  "src/app/twitter-image.tsx",
  "src/app/layout.tsx",
  "src/layout/site-header.tsx",
  "src/layout/site-header-conversion.tsx",
  "src/layout/site-footer.tsx",
  "src/layout/mobile-conversion-dock.tsx",
  "src/lib/seo.ts",
  "src/lib/plans.ts",
  "src/lib/reports/free-check-report.ts",
  "src/lib/signals/free-check-signal.ts",
  "src/lib/intelligence/free-check-intelligence.ts",
  "src/scripts/smoke-production.mjs",
  "src/scripts/validate-public-drift.mjs",
  "src/scripts/validate-free-check-intake.mjs",
  "src/scripts/validate-production-smoke-coverage.mjs",
  "src/scripts/validate-closed-intelligence.mjs",
  "public/manifest.webmanifest",
  "public/llms.txt",
  "public/.well-known/security.txt",
  "next.config.ts",
];

const standards = [
  "docs/closed-intelligence-operating-standard.md",
  "docs/data-quality-governance-standard.md",
  "docs/learning-memory-standard.md",
  "docs/pure-signal-authority-standard.md",
  "docs/adaptive-signal-evolution-standard.md",
  "docs/resilience-continuity-standard.md",
  "docs/maximum-protection-standard.md",
  "docs/foundation-hardening-standard.md",
  "docs/foundation-elevation-standard.md",
  "docs/system-synchronization-qa-standard.md",
  "docs/internal-command-center-standard.md",
  "docs/score-threshold-operating-standard.md",
];

const canonicalRoutes = ["/free-check", "/plans", "/plans/deep-review", "/plans/build-fix", "/plans/ongoing-control", "/connect"];
const policyRoutes = ["/privacy", "/terms", "/disclaimer"];
const legacyRoutes = ["/pricing", "/pricing/full-diagnosis", "/pricing/optimization", "/pricing/monthly-partner", "/contact", "/how-it-works", "/diagnosis", "/profile", "/faq"];
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

const activePublicFiles = [
  "src/lib/seo.ts",
  "src/app/page.tsx",
  "src/app/free-check/page.tsx",
  "src/app/plans/page.tsx",
  "src/app/plans/deep-review/page.tsx",
  "src/app/plans/build-fix/page.tsx",
  "src/app/plans/ongoing-control/page.tsx",
  "src/app/connect/page.tsx",
  "src/app/layout.tsx",
  "src/app/manifest.ts",
  "src/app/opengraph-image.tsx",
  "src/app/twitter-image.tsx",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/layout/site-header.tsx",
  "src/layout/site-header-conversion.tsx",
  "src/layout/site-footer.tsx",
  "src/layout/mobile-conversion-dock.tsx",
  "src/lib/plans.ts",
  "src/lib/reports/free-check-report.ts",
  "src/lib/signals/free-check-signal.ts",
  "src/lib/intelligence/free-check-intelligence.ts",
  "public/manifest.webmanifest",
  "public/llms.txt",
  "public/.well-known/security.txt",
];

const forbiddenActivePhrases = [
  "Free Search Presence Scan",
  "free search presence scan",
  "Visibility Blueprint",
  "Presence Infrastructure",
  "Presence Command",
  "Start Search Presence Scan",
  "View Visibility Blueprint",
  "View Presence Infrastructure",
  "View Presence Command",
  "Search Presence Scan only",
  "Strongest answer system",
  "Strongest answer strategy",
  "strongest answer across evolving search environments",
  "visibility operating system",
  "Search Presence OS",
];
const forbiddenActiveRoutes = ["/pricing/full-diagnosis", "/pricing/optimization", "/pricing/monthly-partner", "/contact"];

for (const file of [...requiredFiles, ...standards]) {
  if (!existsSync(join(root, file))) failures.push(`Missing required file: ${file}`);
}

expect("package.json", ["\"packageManager\": \"pnpm@9.15.9\"", "\"node\": \">=24.0.0\"", "validate-public-drift.mjs", "validate-free-check-intake.mjs", "validate-production-smoke-coverage.mjs", "validate-closed-intelligence.mjs", "smoke:production"], "package.json is missing runtime or validation wiring");
expect("README.md", ["Free Scan", "Deep Review", "Build Fix", "Ongoing Control", "closed intelligence", "maximum protection", "internal command center", "score thresholds", "pnpm validate:routes", "pnpm smoke:production"], "README is missing synchronized operating guidance");
expect("SECURITY.md", ["closed intelligence", "no direct database exposure", "least-privilege", "maximum protection", "internal command center", "score threshold", "https://cendorq.com/connect"], "SECURITY.md is missing synchronized protection guidance");
expect("CHANGELOG.md", ["AI-agent handoff guide", "Final hardening sweep guide", "Backend handoff checklist", "Manual QA and acceptance checklist", "Closed intelligence operating standard", "Internal command center standard", "Score threshold operating standard", "Sharpened homepage", "SEO defaults", "Production verification status guidance", "Incident-response smoke failure playbooks", "Production smoke workflow target preflight", "Free Scan production intake read boundary", "Removed the Free Scan production open-read escape hatch"], "CHANGELOG.md is missing release-history coverage");
expect(".env.example", ["NEXT_PUBLIC_SITE_URL=https://cendorq.com", "CENDORQ_BASE_URL=https://cendorq.com", "Canonical public site URL used by SEO metadata, sitemap, robots, and structured data", "Public site URL used by smoke checks, production smoke workflow, and deployment verification"], ".env.example is missing documented public URL configuration");
expect(".github/pull_request_template.md", ["Closed intelligence check", "Data quality and learning check", "Maximum protection check", "Foundation hardening and elevation check", "System synchronization check", "Internal command center and score threshold check", "pnpm validate:routes"], "PR template is missing current gates");
expect("docs/production-guide.md", ["The public surface sells the outcome. The private system holds the engine.", "Internal command center rule", "Score threshold rule", "Safe production posture"], "Production guide is missing current operating rules");
expect("docs/release-checklist.md", ["closed intelligence", "data quality", "learning memory", "pure signal", "maximum protection", "foundation hardening", "foundation elevation", "system synchronization", "internal command center", "score threshold"], "Release checklist is missing full standard coverage");
expect("docs/production-verification-status.md", ["Production Verification Status", "strict legacy redirects", "Free Scan API `OPTIONS`", "protected Free Scan API read behavior", "validate-production-smoke-coverage.mjs", "Do not create fake Free Scan submissions during smoke checks"], "Production verification status doc is missing protected smoke status coverage");
expect("docs/incident-response.md", ["Strict legacy redirect smoke fails", "Free Scan API `OPTIONS` smoke fails", "Protected Free Scan API read behavior fails", "Health smoke fails", "Discovery or trust file smoke fails", "Do not weaken the read boundary to make smoke pass", "final-destination-only redirect validation"], "Incident response runbook is missing protected smoke failure playbooks");
expect("src/layout/site-header.tsx", ["export { SiteHeader } from \"./site-header-conversion\";"], "Legacy header must remain a current-header shim");
expect("src/lib/seo.ts", ["process.env.NEXT_PUBLIC_SITE_URL", "Cendorq helps businesses find where customers lose clarity, trust, visibility, or action", "Cendorq — Business Command Intelligence", "Start with the Free Scan", "Deep Review", "Build Fix", "Ongoing Control"], "SEO defaults are not aligned with current positioning");
expect("src/app/sitemap.ts", ["process.env.NEXT_PUBLIC_SITE_URL", "shouldExposeSitemap", "isProductionLike", "isPlaceholderHost"], "Sitemap is missing public site URL safety checks");
expect("src/app/layout.tsx", ["Free Scan", "Cendorq Plans", "Business Command Intelligence"], "Layout structured metadata is not aligned with current positioning");
expect("src/app/api/free-check/route.ts", ["CURRENT_STORAGE_FILE = \"free-check-intakes.v3.json\"", "The Free Scan has been captured successfully.", "The requested Free Scan entry was not found.", "Allow: \"GET,POST,OPTIONS\""], "Free Scan API route is missing current language or OPTIONS support");
expect("src/scripts/validate-free-check-intake.mjs", ["Free Scan intake validation passed", "src/app/api/free-check/route.ts", "Possible Ongoing Control fit", "CURRENT_STORAGE_FILE", "submit the Free Scan again"], "Free Scan intake validator is missing required gate detail");
expect("src/scripts/validate-production-smoke-coverage.mjs", ["Production smoke coverage validation passed", "strict redirects", "protected Free Scan read checks", "expectedStatus: 401"], "Production smoke coverage validator is missing required guard detail");
expect("src/scripts/smoke-production.mjs", ["/api/free-check", "OPTIONS", "GET,POST,OPTIONS", "checkOptionsRoute", "checkProtectedReadRoute", "expectedStatus: 401", "The intake console is not authorized to read submissions."], "Production smoke script is missing Free Scan API OPTIONS or protected-read coverage");
expect("public/.well-known/security.txt", ["Contact: https://cendorq.com/connect", "Canonical: https://cendorq.com/.well-known/security.txt", "Policy: https://cendorq.com/terms", "Expires:"], "security.txt is missing required detail");
expect("src/app/api/health/route.ts", ["force-dynamic", "revalidate = 0", "ok: true", "Cache-Control", "no-store", "X-Robots-Tag"], "Health endpoint is missing runtime-safe behavior");
expect(".github/workflows/ci.yml", ["node-version: \"24\"", "pnpm install --frozen-lockfile", "pnpm validate:routes", "pnpm lint", "pnpm typecheck", "pnpm build"], "CI workflow is missing quality gates");
expect(".github/workflows/smoke-production.yml", ["workflow_dispatch", "schedule:", "node-version: \"24\"", "pnpm smoke:production", "https://cendorq.com"], "Production smoke workflow is missing scheduled/manual smoke behavior");

if (read(".nvmrc").trim() !== "24") failures.push(".nvmrc must pin Node 24.");
if (read(".node-version").trim() !== "24") failures.push(".node-version must pin Node 24.");

const nextConfig = read("next.config.ts");
for (const [source, destination] of redirectPairs) {
  if (!nextConfig.includes(`source: "${source}"`)) failures.push(`Missing redirect source in next.config.ts: ${source}`);
  if (!nextConfig.includes(`destination: "${destination}"`)) failures.push(`Missing redirect destination in next.config.ts: ${destination}`);
}
for (const header of requiredHeaders) if (!nextConfig.includes(`key: "${header}"`)) failures.push(`Missing production hardening header: ${header}`);
for (const discoveryRoute of ["/robots.txt", "/sitemap.xml", "/llms.txt", "/.well-known/security.txt"]) {
  if (!nextConfig.includes(`source: "${discoveryRoute}"`)) failures.push(`Crawler/security cache headers must cover ${discoveryRoute}.`);
}
if (!nextConfig.includes("text/plain; charset=utf-8")) failures.push("Plain text discovery files must use explicit text/plain UTF-8 content type.");

const sitemap = read("src/app/sitemap.ts");
for (const route of [...canonicalRoutes, ...policyRoutes]) if (!sitemap.includes(`path: "${route}"`)) failures.push(`Sitemap does not include current public route: ${route}`);
for (const route of legacyRoutes) if (sitemap.includes(`path: "${route}"`) || sitemap.includes(`"${route}"`)) failures.push(`Sitemap should not list legacy route: ${route}`);

const robots = read("src/app/robots.ts");
for (const route of [...canonicalRoutes, ...policyRoutes]) if (!robots.includes(`"${route}"`)) failures.push(`Robots allowlist does not include current public route: ${route}`);
for (const route of legacyRoutes) if (robots.includes(`"${route}"`)) failures.push(`Robots allowlist should not include legacy route: ${route}`);

const manifest = read("public/manifest.webmanifest");
for (const route of ["/free-check?source=app-install", "/free-check?source=app-shortcut", "/plans?source=app-shortcut", "/connect?source=app-shortcut"]) {
  if (!manifest.includes(`"${route}"`)) failures.push(`Manifest missing buyer-path route: ${route}`);
}
for (const phrase of ["Start Free Scan", "Compare Plans", "Connect"]) if (!manifest.includes(phrase)) failures.push(`Manifest missing shortcut phrase: ${phrase}`);

const llms = read("public/llms.txt");
for (const route of canonicalRoutes) if (!llms.includes(route)) failures.push(`llms.txt missing canonical route: ${route}`);
for (const phrase of ["Free Scan", "Deep Review", "Build Fix", "Ongoing Control", "make the business easier to understand", "make the business easier to trust", "make the business easier to choose"]) {
  if (!llms.includes(phrase)) failures.push(`llms.txt missing positioning phrase: ${phrase}`);
}

const activePublicText = activePublicFiles
  .filter((file) => existsSync(join(root, file)))
  .map((file) => `\n/* ${file} */\n${read(file)}`)
  .join("\n");
for (const phrase of ["Free Scan", "Deep Review", "Build Fix", "Ongoing Control", "Connect"]) {
  if (!activePublicText.includes(phrase)) failures.push(`Active public surfaces missing current buyer-path language: ${phrase}`);
}
for (const phrase of forbiddenActivePhrases) if (activePublicText.includes(phrase)) failures.push(`Active public surfaces contain retired label: ${phrase}`);
for (const route of forbiddenActiveRoutes) if (activePublicText.includes(route)) failures.push(`Active public surfaces contain legacy route: ${route}`);

if (failures.length) {
  console.error("Route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Route validation passed. Current buyer path, legacy redirects, active public drift rules, SEO defaults, structured metadata, header shim, Free Scan intake gate, production verification status, production smoke coverage gate, Free Scan API smoke check, discovery files, runtime pins, CI gates, smoke checks, operating docs, and protection standards are synchronized.");

function expect(path, phrases, label) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${label}: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
