import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const robotsPath = "src/app/robots.ts";
const routesPath = "src/scripts/validate-routes.mjs";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-robots-surface.mjs";

expect(robotsPath, [
  "MetadataRoute.Robots",
  "PUBLIC_ALLOWLIST",
  "PRIVATE_DISALLOWLIST",
  "PRIORITY_BOTS",
  "Googlebot",
  "Bingbot",
  "DuckDuckBot",
  "Applebot",
  "absoluteUrl(\"/sitemap.xml\")",
  "path: string",
  "\"/free-check\"",
  "\"/plans\"",
  "\"/plans/deep-review\"",
  "\"/plans/build-fix\"",
  "\"/plans/ongoing-control\"",
  "\"/faq\"",
  "\"/privacy\"",
  "\"/terms\"",
  "\"/disclaimer\"",
  "\"/api/\"",
  "\"/admin/\"",
  "\"/intake-console\"",
  "\"/checkout/\"",
  "\"/dashboard/\"",
  "\"/login\"",
  "\"/signup\"",
  "\"/verify-email\"",
  "\"/_next/\"",
  "BLOCK_SEARCH_INDEXING",
  "shouldBlockCrawlers",
  "isPreviewOrDev",
  "isPlaceholderDomain",
]);

expect(routesPath, ["src/app/robots.ts"]);
expect(routesChainPath, [validatorPath]);

forbidden(robotsPath, [
  "allow: [\"/dashboard",
  "allow: [\"/api",
  "allow: [\"/login",
  "allow: [\"/signup",
  "allow: [\"/checkout",
  "disallow: []",
  "BLOCK_SEARCH_INDEXING") === "",
]);

if (failures.length) {
  console.error("Public robots surface validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public robots surface validation passed with FAQ allowed, sitemap linked, production safety gates, and protected customer routes disallowed.");

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
