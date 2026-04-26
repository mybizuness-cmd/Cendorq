import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

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
  "public/llms.txt",
  "public/manifest.webmanifest",
  "public/.well-known/security.txt",
];

const requiredCurrentLanguage = [
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "Connect",
];

const forbiddenActiveLanguage = [
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
  "visibility blueprint",
  "presence infrastructure",
  "presence command",
  "visibility operating system",
];

const forbiddenActiveRoutes = [
  "/pricing/full-diagnosis",
  "/pricing/optimization",
  "/pricing/monthly-partner",
  "/contact",
];

for (const file of activePublicFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing active public drift file: ${file}`);
}

const combined = activePublicFiles
  .filter((file) => existsSync(join(root, file)))
  .map((file) => `\n/* ${file} */\n${read(file)}`)
  .join("\n");

for (const phrase of requiredCurrentLanguage) {
  if (!combined.includes(phrase)) failures.push(`Missing current public language: ${phrase}`);
}

for (const phrase of forbiddenActiveLanguage) {
  if (combined.includes(phrase)) failures.push(`Forbidden old public language found in active surfaces: ${phrase}`);
}

for (const route of forbiddenActiveRoutes) {
  if (combined.includes(route)) failures.push(`Forbidden old public route found in active surfaces: ${route}`);
}

expect("src/layout/site-header.tsx", [
  "export { SiteHeader } from \"./site-header-conversion\";",
]);

expect("src/lib/seo.ts", [
  "process.env.NEXT_PUBLIC_SITE_URL",
  "Cendorq helps businesses find what makes customers hesitate",
  "Cendorq — Search Presence OS",
  "Start with the Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
]);

expect("src/app/sitemap.ts", [
  "process.env.NEXT_PUBLIC_SITE_URL",
  "shouldExposeSitemap",
  "isProductionLike",
  "isPlaceholderHost",
]);

expect("src/app/layout.tsx", [
  "Free Scan",
  "Cendorq Plans",
  "Search Presence OS",
]);

expect("src/app/opengraph-image.tsx", [
  "Stop losing customers",
  "Free scan first",
  "Deep Review",
  "Ongoing Control",
]);

expect("src/app/twitter-image.tsx", [
  "Stop losing customers",
  "Start with the Free Scan",
  "Build Fix",
  "Ongoing Control",
]);

expect("public/llms.txt", [
  "/free-check",
  "/plans/deep-review",
  "/plans/build-fix",
  "/plans/ongoing-control",
  "/connect",
  "make the business easier to understand",
  "make the business easier to trust",
  "make the business easier to choose",
]);

expect("docs/configuration-safety-checklist.md", [
  "`NEXT_PUBLIC_SITE_URL` is the canonical public site URL used by SEO metadata, sitemap, robots, and structured data.",
  "`CENDORQ_BASE_URL` is the public smoke/deployment verification target used by production smoke checks.",
  "Do not put secrets, admin keys, customer data, or private endpoint URLs in either public URL variable.",
]);

expect("docs/deployment-environment-checklist.md", [
  "`NEXT_PUBLIC_SITE_URL` is set to the canonical public origin used by SEO metadata, sitemap, robots, and structured data.",
  "`CENDORQ_BASE_URL` is set to the deployed origin that production smoke checks should verify.",
  "`NEXT_PUBLIC_SITE_URL` and `CENDORQ_BASE_URL` are documented together when public URL assumptions change.",
]);

expect("docs/search-discovery-checklist.md", [
  "`NEXT_PUBLIC_SITE_URL` controls canonical metadata, sitemap output, robots host behavior, and structured data origin.",
  "`CENDORQ_BASE_URL` controls production smoke target selection and should match the intended deployed origin.",
  "Public URL assumptions are documented in `.env.example` before discovery or deployment behavior changes.",
]);

if (failures.length) {
  console.error("Public drift validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public drift validation passed. SEO defaults, structured metadata, share images, active public routes, report recommendations, signal summaries, intelligence summaries, llms.txt, manifest, header shim, footer, mobile dock, public URL config guidance, and discovery/deployment checklists use the current Cendorq buyer path.");

function expect(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
