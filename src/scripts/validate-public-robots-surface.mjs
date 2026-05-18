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
  "absoluteUrl(\"/sitemap.xml\")",
  "type RulePath",
  "\"/free-check\"",
  "\"/plans\"",
  "\"/plans/deep-review\"",
  "\"/plans/build-fix\"",
  "\"/plans/ongoing-control\"",
  "\"/faq\"",
  "\"/privacy\"",
  "\"/terms\"",
  "\"/disclaimer\"",
  "\"/dashboard/\"",
  "\"/login\"",
  "\"/signup\"",
  "\"/verify-email\"",
  "BLOCK_SEARCH_INDEXING",
  "shouldBlockCrawlers",
]);

expect(routesPath, ["src/app/robots.ts"]);
expect(routesChainPath, [validatorPath]);

forbidden(robotsPath, [
  "allow: [\"/dashboard",
  "allow: [\"/login",
  "allow: [\"/signup",
  "allow: [\"/checkout",
  "disallow: []",
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
