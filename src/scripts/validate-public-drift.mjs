import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const activePublicFiles = [
  "FINAL_SYSTEM_STATUS.md",
  "VISUAL_EDITOR_UPLOAD_NOTES.md",
  "src/lib/seo.ts",
  "src/lib/site.ts",
  "src/lib/schema.ts",
  "src/app/page.tsx",
  "src/components/home/hero-section.tsx",
  "src/components/home/process-section.tsx",
  "src/components/home/final-cta-section.tsx",
  "src/app/free-check/page.tsx",
  "src/app/free-check/error.tsx",
  "src/components/free-check/guided-free-check-form-v3.tsx",
  "src/app/plans/page.tsx",
  "src/app/plans/deep-review/page.tsx",
  "src/app/plans/build-fix/page.tsx",
  "src/app/plans/ongoing-control/page.tsx",
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
  "AI Engine Readiness",
  "Free Scan",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "Scan",
  "Review",
  "Repair",
  "Control",
];

const forbiddenActiveLanguage = [
  "Market Command Intelligence",
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
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "Diagnose",
  "command path",
  "Command Path",
];

const forbiddenActiveRoutes = [
  "/pricing",
  "/pricing/full-diagnosis",
  "/pricing/optimization",
  "/pricing/monthly-partner",
  "/diagnosis",
  "/contact",
  "/connect",
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

expect("FINAL_SYSTEM_STATUS.md", [
  "canonical product category: AI Engine Readiness",
  "Free Scan",
  "Plans",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "guided-free-check-form-v3.tsx",
]);

expect("VISUAL_EDITOR_UPLOAD_NOTES.md", [
  "AI Engine Readiness",
  "Free Scan",
  "Plans",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "Scan, Review, Repair, Control",
]);

expect("src/lib/site.ts", [
  "{ label: \"Free Scan\", href: \"/free-check\" }",
  "{ label: \"Plans\", href: \"/plans\" }",
  "{ label: \"AI Readiness Review\", href: \"/plans/deep-review\" }",
  "{ label: \"Signal Repair\", href: \"/plans/build-fix\" }",
  "{ label: \"Readiness Control\", href: \"/plans/ongoing-control\" }",
]);

expect("src/lib/schema.ts", [
  "name: \"AI Engine Readiness\"",
  "absoluteUrl(\"/plans/deep-review\")",
  "easier to find, understand, trust, and choose",
]);

expect("src/components/home/hero-section.tsx", [
  "AI Engine Readiness",
  "href=\"/free-check\"",
  "href=\"/plans/deep-review\"",
  "Start the Free Scan",
  "See how AI Readiness Review works",
]);

expect("src/components/home/process-section.tsx", [
  "One readiness path: Scan, Review, Repair, Control.",
  "Scan first",
  "Review clearly",
  "Repair what matters",
  "Control the path",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
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
  "See AI Readiness Review",
  "Homepage or AI Readiness Review",
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
  "the cleanest readiness view",
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
  "description: \"Compare Scan, Review, Repair, and Control.\"",
]);

expect("src/lib/seo.ts", [
  "process.env.NEXT_PUBLIC_SITE_URL",
  "Cendorq checks whether AI engines can understand what a business does",
  "Cendorq — AI Engine Readiness",
  "If AI engines cannot understand your business, customers may never get the chance to.",
  "AI Engine Readiness",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
]);

expect("src/app/sitemap.ts", [
  "process.env.NEXT_PUBLIC_SITE_URL",
  "shouldExposeSitemap",
  "isProductionLike",
  "isPlaceholderHost",
]);

expect("src/app/layout.tsx", [
  "AI Engine Readiness",
  "Cendorq AI Readiness Path",
  "Scan",
  "Review",
  "Repair",
  "Control",
]);

expect("src/app/opengraph-image.tsx", [
  "AI Engine Readiness",
  "Be easier to find",
  "Free scan first",
  "Scan before buying the bigger repair",
]);

expect("src/app/twitter-image.tsx", [
  "AI Engine Readiness",
  "Be easier to find",
  "Start with the Free Scan",
  "Scan first. Review deeper. Repair what matters.",
]);

expect("public/llms.txt", [
  "/free-check",
  "/plans/deep-review",
  "/plans/build-fix",
  "/plans/ongoing-control",
  "AI Engine Readiness",
  "make the business easier to understand",
  "make the business easier to trust",
  "make the business easier to choose",
]);

expect("public/manifest.webmanifest", [
  "Cendorq — AI Engine Readiness",
  "Compare Readiness Path",
  "Compare Scan, Review, Repair, and Control.",
]);

expect("docs/configuration-safety-checklist.md", [
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "Dashboard recovery",
  "`NEXT_PUBLIC_SITE_URL` is the canonical public site URL used by SEO metadata, sitemap, robots, and structured data.",
  "`CENDORQ_BASE_URL` is the public smoke/deployment verification target used by production smoke checks.",
  "Do not put secrets, admin keys, customer data, or private endpoint URLs in either public URL variable.",
]);

expect("docs/deployment-environment-checklist.md", [
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "Dashboard recovery",
  "`NEXT_PUBLIC_SITE_URL` is set to the canonical public origin used by SEO metadata, sitemap, robots, and structured data.",
  "`CENDORQ_BASE_URL` is set to the deployed origin that production smoke checks should verify.",
  "`NEXT_PUBLIC_SITE_URL` and `CENDORQ_BASE_URL` are documented together when public URL assumptions change.",
]);

expect("docs/search-discovery-checklist.md", [
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "Dashboard recovery",
  "`NEXT_PUBLIC_SITE_URL` controls canonical metadata, sitemap output, robots host behavior, and structured data origin.",
  "`CENDORQ_BASE_URL` controls production smoke target selection and should match the intended deployed origin.",
  "Public URL assumptions are documented in `.env.example` before discovery or deployment behavior changes.",
  "/contact` -> `/plans",
]);

forbid("FINAL_SYSTEM_STATUS.md", ["Search Presence Scan", "Visibility Blueprint", "Presence Infrastructure", "Presence Command", "Market Command Intelligence", "Deep Review", "Build Fix", "Ongoing Control", "Diagnose"]);
forbid("VISUAL_EDITOR_UPLOAD_NOTES.md", ["Search Presence Scan", "Visibility Blueprint", "Presence Infrastructure", "Presence Command", "Market Command Intelligence", "Deep Review", "Build Fix", "Ongoing Control", "Diagnose"]);
forbid("src/lib/site.ts", ["/pricing", "/diagnosis", "/contact", "/connect", "/profile", "/faq", "How It Works", "System Layers", "Deep Review", "Build Fix", "Ongoing Control", "Diagnose"]);
forbid("src/lib/schema.ts", ["/pricing", "/diagnosis", "/contact", "/connect", "Search Presence OS", "search-presence diagnosis", "Market Command Intelligence"]);
forbid("src/components/home/hero-section.tsx", ["/pricing", "/diagnosis", "Search Presence Scan", "Visibility intelligence for businesses", "Market Command Intelligence", "Deep Review", "Build Fix", "Ongoing Control", "Diagnose"]);
forbid("src/components/home/process-section.tsx", ["/pricing", "/diagnosis", "generic optimization", "Diagnosis before optimization", "future optimization", "Deep Review", "Build Fix", "Ongoing Control", "Diagnose"]);
forbid("src/components/home/final-cta-section.tsx", ["/pricing", "/diagnosis", "Search Presence Scan"]);
forbid("src/app/free-check/error.tsx", ["/pricing", "/diagnosis", "Search Presence Scan", "Homepage or diagnosis", "Deep Review"]);
forbid("src/components/free-check/guided-free-check-form-v3.tsx", ["/pricing", "/diagnosis", "Search Presence Scan"]);
forbid("src/app/loading.tsx", ["/pricing", "/diagnosis", "Pricing", "Search Presence Scan", "command view"]);
forbid("src/app/error.tsx", ["/pricing", "/diagnosis", "Pricing", "Search Presence Scan"]);
forbid("src/layout/site-header-conversion.tsx", ["label: \"Pricing\"", "description: \"Choose the right depth.\"", "Diagnose", "Fix", "Deep Review", "Build Fix", "Ongoing Control"]);
forbid("src/lib/seo.ts", ["Business Command Intelligence", "Market Command Intelligence", "website trust scan", "conversion clarity review", "Deep Review", "Build Fix", "Ongoing Control", "Diagnose"]);
forbid("src/app/layout.tsx", ["Business Command Intelligence", "Market Command Intelligence", "business decision intelligence", "Diagnose", "Fix"]);
forbid("src/app/opengraph-image.tsx", ["Business Command Intelligence", "Market Command Intelligence", "Stop losing customers", "Diagnose", "Fix"]);
forbid("src/app/twitter-image.tsx", ["Business Command Intelligence", "Market Command Intelligence", "Stop losing customers", "Diagnose", "Fix"]);
forbid("public/manifest.webmanifest", ["Business Command Intelligence", "Market Command Intelligence", "View Pricing", "Diagnose", "Fix"]);
forbid("docs/configuration-safety-checklist.md", ["Deep Review", "Build Fix", "Ongoing Control", "Connect"]);
forbid("docs/deployment-environment-checklist.md", ["Deep Review", "Build Fix", "Ongoing Control", "Connect"]);
forbid("docs/search-discovery-checklist.md", ["Deep Review", "Build Fix", "Ongoing Control", "Connect", "/connect"]);

if (failures.length) {
  console.error("Public drift validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public drift validation passed. Root status, upload notes, SEO defaults, shared site navigation, structured data, share images, active public routes, homepage hero, dormant homepage process section, homepage final CTA, Free Scan error recovery, active Free Scan form, loading/error/not-found fallback surfaces, report recommendations, signal summaries, intelligence summaries, llms.txt, manifest, header shim, footer, mobile dock, public URL config guidance, and discovery/deployment checklists use the current AI Engine Readiness buyer path.");

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
