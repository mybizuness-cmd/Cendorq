import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const seoPath = "src/lib/seo.ts";
const failures = [];

expect(seoPath, [
  "siteConfig",
  "buildMetadata",
  "Metadata[",
  "robots: noIndex ? { index: false, follow: false } : { index: true, follow: true }",
  "organizationSchemaId",
  "websiteSchemaId",
  "ORGANIZATION_HASH",
  "WEBSITE_HASH",
  "AI Visibility and Readiness",
  "AI search visibility",
  "answer engine visibility",
  "business trust signals",
]);

if (failures.length) {
  console.error("SEO metadata contract validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("SEO metadata contract validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}
