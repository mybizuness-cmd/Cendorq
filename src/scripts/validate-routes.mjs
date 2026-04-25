import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredFiles = [
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

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    failures.push(`Missing required route/system file: ${file}`);
  }
}

const securityTxt = read("public/.well-known/security.txt");
for (const phrase of ["Contact: https://cendorq.com/connect", "Canonical: https://cendorq.com/.well-known/security.txt", "Policy: https://cendorq.com/terms", "Expires:"]) {
  if (!securityTxt.includes(phrase)) {
    failures.push(`security.txt is missing required detail: ${phrase}`);
  }
}

const healthRoute = read("src/app/api/health/route.ts");
for (const phrase of ["force-dynamic", "revalidate = 0", "ok: true", "cendorq-platform", "healthy", "environment", "commit", "Cache-Control", "no-store", "X-Robots-Tag"]) {
  if (!healthRoute.includes(phrase)) {
    failures.push(`Health endpoint is missing required runtime-safe response detail: ${phrase}`);
  }
}

const nextConfig = read("next.config.ts");
for (const [source, destination] of redirectPairs) {
  if (!nextConfig.includes(`source: "${source}"`)) {
    failures.push(`Missing redirect source in next.config.ts: ${source}`);
  }

  if (!nextConfig.includes(`destination: "${destination}"`)) {
    failures.push(`Missing redirect destination in next.config.ts: ${destination}`);
  }
}

for (const header of requiredHeaders) {
  if (!nextConfig.includes(`key: "${header}"`)) {
    failures.push(`Missing production hardening header: ${header}`);
  }
}

for (const discoveryRoute of ["/robots.txt", "/sitemap.xml", "/llms.txt", "/.well-known/security.txt"]) {
  if (!nextConfig.includes(`source: "${discoveryRoute}"`)) {
    failures.push(`Crawler/security cache headers must cover ${discoveryRoute}.`);
  }
}

if (!nextConfig.includes("text/plain; charset=utf-8")) {
  failures.push("Plain text discovery files must be served with an explicit text/plain UTF-8 content type.");
}

const sitemap = read("src/app/sitemap.ts");
for (const route of canonicalRoutes) {
  if (!sitemap.includes(`path: "${route}"`)) {
    failures.push(`Sitemap does not include canonical route: ${route}`);
  }
}

for (const legacyRoute of ["/pricing", "/contact"]) {
  if (sitemap.includes(`path: "${legacyRoute}"`)) {
    failures.push(`Sitemap should not list redirected legacy route: ${legacyRoute}`);
  }
}

const robots = read("src/app/robots.ts");
for (const route of canonicalRoutes) {
  if (!robots.includes(`"${route}"`)) {
    failures.push(`Robots allowlist does not include canonical route: ${route}`);
  }
}

for (const legacyRoute of ["/pricing", "/contact"]) {
  if (robots.includes(`"${legacyRoute}"`)) {
    failures.push(`Robots allowlist should not include redirected legacy route: ${legacyRoute}`);
  }
}

const layout = read("src/app/layout.tsx");
for (const route of ["/plans/deep-review", "/plans/build-fix", "/plans/ongoing-control"]) {
  if (!layout.includes(`path: "${route}"`)) {
    failures.push(`Structured data catalog does not include: ${route}`);
  }
}

const manifest = read("public/manifest.webmanifest");
for (const route of ["/free-check?source=app-install", "/free-check?source=app-shortcut", "/plans?source=app-shortcut", "/connect?source=app-shortcut"]) {
  if (!manifest.includes(`"${route}"`)) {
    failures.push(`Manifest does not include buyer-path route: ${route}`);
  }
}

if (!manifest.includes("Start Free Scan") || !manifest.includes("Compare Plans") || !manifest.includes("Connect")) {
  failures.push("Manifest shortcuts must include Start Free Scan, Compare Plans, and Connect.");
}

const llms = read("public/llms.txt");
for (const route of canonicalRoutes) {
  if (!llms.includes(route)) {
    failures.push(`llms.txt does not include canonical route: ${route}`);
  }
}

for (const phrase of ["Free Scan", "Deep Review", "Build Fix", "Ongoing Control", "make the business easier to understand", "make the business easier to trust", "make the business easier to choose"]) {
  if (!llms.includes(phrase)) {
    failures.push(`llms.txt does not include required positioning phrase: ${phrase}`);
  }
}

const publicText = publicFiles.map((file) => `\n/* ${file} */\n${read(file)}`).join("\n");
for (const route of ["/pricing/full-diagnosis", "/pricing/optimization", "/pricing/monthly-partner"]) {
  if (publicText.includes(route)) {
    failures.push(`Active public navigation/metadata should not reference legacy pricing route: ${route}`);
  }
}

for (const phrase of forbiddenActivePublicPhrases) {
  if (publicText.includes(phrase) && !llms.includes(`- ${phrase}`)) {
    failures.push(`Active public surfaces should use plain buyer language instead of legacy phrase: ${phrase}`);
  }
}

if (!publicText.includes("Free Scan") || !publicText.includes("Deep Review") || !publicText.includes("Build Fix") || !publicText.includes("Ongoing Control")) {
  failures.push("Public buyer path labels are incomplete. Expected Free Scan, Deep Review, Build Fix, and Ongoing Control.");
}

if (failures.length) {
  console.error("Route validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Route validation passed. Canonical buyer path, security contact, runtime health endpoint, llms.txt delivery, plain-language surfaces, manifest, and production hardening are protected.");

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
