import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const activePublicFiles = [
  "src/lib/seo.ts",
  "src/lib/site.ts",
  "src/lib/schema.ts",
  "src/app/page.tsx",
  "src/components/home/hero-section.tsx",
  "src/components/home/final-cta-section.tsx",
  "src/app/free-check/page.tsx",
  "src/app/free-check/error.tsx",
  "src/components/free-check/guided-free-check-form-v3.tsx",
  "src/app/plans/page.tsx",
  "src/app/plans/deep-review/page.tsx",
  "src/app/plans/build-fix/page.tsx",
  "src/app/plans/ongoing-control/page.tsx",
  "src/app/connect/page.tsx",
  "src/app/layout.tsx",
  "src/app/loading.tsx",
  "src/app/error.tsx",
  "src/app/not-found.tsx",
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
  "Market Command Intelligence",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "Scan",
  "Diagnose",
  "Fix",
  "Control",
];

const forbiddenActiveLanguage = [
  "Free Search Presence Scan",
  "free search presence scan",
  "Search Presence OS",
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
  "/pricing",
  "/pricing/full-diagnosis",
  "/pricing/optimization",
  "/pricing/monthly-partner",
  "/diagnosis",
  "/contact",
  "/profile",
  "/faq",
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

expect("src/lib/site.ts", [
  "{ label: \"Free Scan\", href: \"/free-check\" }",
  "{ label: \"Plans\", href: \"/plans\" }",
  "{ label: \"Deep Review\", href: \"/plans/deep-review\" }",
  "{ label: \"Build Fix\", href: \"/plans/build-fix\" }",
  "{ label: \"Ongoing Control\", href: \"/plans/ongoing-control\" }",
  "{ label: \"Connect\", href: \"/connect\" }",
]);

expect("src/lib/schema.ts", [
  "name: \"Market Command Intelligence\"",
  "absoluteUrl(\"/plans/deep-review\")",
  "absoluteUrl(\"/connect\")",
  "easier to find, understand, trust, and choose",
]);

expect("src/components/home/hero-section.tsx", [
  "Market Command Intelligence",
  "href=\"/free-check\"",
  "href=\"/plans/deep-review\"",
  "Start the Free Scan",
  "See how Deep Review works",
]);

expect("src/components/home/final-cta-section.tsx", [
  "href=\"/free-check\"",
  "href=\"/plans\"",
  "Start the Free Scan",
  "Review plans",
]);

expect("src/app/free-check/error.tsx", [
  "Free Scan interruption",
  "href=\"/plans/deep-review\"",
  "See Deep Review",
  "Homepage or Deep Review",
]);

expect("src/components/free-check/guided-free-check-form-v3.tsx", [
  "GuidedFreeCheckFormV3",
  "requestFreeScanVerifyToViewHandoff",
  "requestedDestination: \"/dashboard/reports/free-scan\"",
  "Compare all plans",
  "href=\"/plans\"",
]);

expect("src/app/loading.tsx", [
  "Cendorq / Loading",
  "the cleanest command view",
  "Start Free Scan",
  "Review Plans",
  "homepage, Free Scan, or Plans",
]);

expect("src/app/error.tsx", [
  "Cendorq / Route error",
  "Retry once",
  "homepage, Free Scan, or Plans",
  "Start Free Scan",
  "Review Plans",
]);

expect("src/app/not-found.tsx", [
  "Start Free Scan",
  "Compare Plans",
  "Return home",
  "View plans",
]);

expect("src/layout/site-header.tsx", [
  "export { SiteHeader } from \"./site-header-conversion\";",
]);

expect("src/layout/site-header-conversion.tsx", [
  "label: \"Plans\"",
  "href: \"/plans\"",
  "description: \"Compare Scan, Diagnose, Fix, and Control.\"",
]);

expect("src/lib/seo.ts", [
  "process.env.NEXT_PUBLIC_SITE_URL",
  "Cendorq helps businesses become easier to find, understand, trust, and choose",
  "Cendorq — Market Command Intelligence",
  "Find what the market may be missing before you spend deeper",
  "Market Command Intelligence",
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
  "Market Command Intelligence",
  "Cendorq Command Path",
  "Market signal analysis",
  "Scan",
  "Diagnose",
  "Fix",
  "Control",
]);

expect("src/app/opengraph-image.tsx", [
  "Market Command Intelligence",
  "Be easier to find",
  "Free scan first",
  "Scan before buying the bigger fix",
]);

expect("src/app/twitter-image.tsx", [
  "Market Command Intelligence",
  "Be easier to find",
  "Start with the Free Scan",
  "Scan first. Diagnose deeper. Fix what matters.",
]);

expect("public/llms.txt", [
  "/free-check",
  "/plans/deep-review",
  "/plans/build-fix",
  "/plans/ongoing-control",
  "/connect",
  "Market Command Intelligence",
  "make the business easier to understand",
  "make the business easier to trust",
  "make the business easier to choose",
]);

expect("public/manifest.webmanifest", [
  "Cendorq — Market Command Intelligence",
  "Compare Command Path",
  "Compare Scan, Diagnose, Fix, and Control.",
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

forbid("src/lib/site.ts", ["/pricing", "/diagnosis", "/contact", "/profile", "/faq", "How It Works", "System Layers"]);
forbid("src/lib/schema.ts", ["/pricing", "/diagnosis", "/contact", "Search Presence OS", "search-presence diagnosis"]);
forbid("src/components/home/hero-section.tsx", ["/pricing", "/diagnosis", "Search Presence Scan", "Visibility intelligence for businesses"]);
forbid("src/components/home/final-cta-section.tsx", ["/pricing", "/diagnosis", "Search Presence Scan"]);
forbid("src/app/free-check/error.tsx", ["/pricing", "/diagnosis", "Search Presence Scan", "Homepage or diagnosis"]);
forbid("src/components/free-check/guided-free-check-form-v3.tsx", ["/pricing", "/diagnosis", "Search Presence Scan"]);
forbid("src/app/loading.tsx", ["/pricing", "/diagnosis", "Pricing", "Search Presence Scan"]);
forbid("src/app/error.tsx", ["/pricing", "/diagnosis", "Pricing", "Search Presence Scan"]);
forbid("src/layout/site-header-conversion.tsx", ["label: \"Pricing\"", "description: \"Choose the right depth.\""]);
forbid("src/lib/seo.ts", ["Business Command Intelligence", "website trust scan", "conversion clarity review"]);
forbid("src/app/layout.tsx", ["Business Command Intelligence", "business decision intelligence"]);
forbid("src/app/opengraph-image.tsx", ["Business Command Intelligence", "Stop losing customers"]);
forbid("src/app/twitter-image.tsx", ["Business Command Intelligence", "Stop losing customers"]);
forbid("public/manifest.webmanifest", ["Business Command Intelligence", "View Pricing"]);

if (failures.length) {
  console.error("Public drift validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public drift validation passed. SEO defaults, shared site navigation, structured data, share images, active public routes, homepage hero, homepage final CTA, Free Scan error recovery, active Free Scan form, loading/error/not-found fallback surfaces, report recommendations, signal summaries, intelligence summaries, llms.txt, manifest, header shim, footer, mobile dock, public URL config guidance, and discovery/deployment checklists use the current Market Command Intelligence buyer path.");

function expect(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function forbid(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
