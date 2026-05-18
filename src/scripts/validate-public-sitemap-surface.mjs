import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const sitemapPath = "src/app/sitemap.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-sitemap-surface.mjs";

expect(sitemapPath, [
  "absoluteUrl",
  "MetadataRoute.Sitemap",
  "path: \"/\"",
  "path: \"/free-check\"",
  "path: \"/plans\"",
  "path: \"/plans/deep-review\"",
  "path: \"/plans/build-fix\"",
  "path: \"/plans/ongoing-control\"",
  "path: \"/faq\"",
  "path: \"/connect\"",
  "path: \"/privacy\"",
  "path: \"/terms\"",
  "path: \"/disclaimer\"",
  "priority: 0.8",
  "priority: 0.68",
  "changeFrequency: \"monthly\"",
  "includeInProduction: true",
  "shouldExposeSitemap",
  "isProductionLike",
  "isPlaceholderHost",
]);

expect(routesChainPath, [validatorPath]);

forbidden(sitemapPath, [
  "path: \"/login\"",
  "path: \"/signup\"",
  "path: \"/verify-email\"",
  "path: \"/dashboard\"",
  "path: \"/dashboard/reports\"",
  "path: \"/checkout/start\"",
  "path: \"/checkout/success\"",
  "path: \"/api/",
  "includeInProduction: false",
]);

if (failures.length) {
  console.error("Public sitemap surface validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public sitemap surface validation passed with FAQ and Connect included, public routes only, and protected customer routes excluded.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
