import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const seoPath = "src/lib/seo.ts";
const failures = [];

expect(seoPath, [
  "siteConfig",
  "buildMetadata",
  "Metadata[",
  "organizationSchemaId",
  "websiteSchemaId",
  "AI Search Presence Repair",
  "Presence Report",
  "Decision Gap",
  "Repair Queue",
  "AI search visibility",
  "AI answer visibility",
  "business trust signals",
]);

if (failures.length) {
  console.error("SEO metadata contract validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("SEO metadata contract validation passed with current Cendorq positioning.");

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
