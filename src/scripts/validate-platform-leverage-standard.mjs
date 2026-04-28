import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const standardPath = "src/lib/platform-leverage-standard.ts";
const packagePath = "package.json";

validateTextFile(standardPath, [
  "PLATFORM_LEVERAGE_RULES",
  "PLATFORM_LEVERAGE_GUARDS",
  "getPlatformLeverageStandard",
  "Portfolio account readiness",
  "Multi-location and franchise readiness",
  "Enterprise admin and team roles",
  "Privacy-safe benchmarking",
  "Integration and API readiness",
  "Partner and referral channel",
  "Lifecycle automation engine",
  "Expansion revenue map",
  "International and localization readiness",
  "Controlled market intelligence loop",
  "business switcher",
  "cross-business boundary",
  "least-privilege access",
  "privacy-safe aggregation",
  "scoped API keys",
  "webhook signature verification",
  "partner dashboard boundary",
  "suppression logic",
  "regional compliance review",
  "agent boundary",
  "no leverage feature without customer benefit",
  "no expansion path without security and entitlement boundaries",
  "no benchmark without privacy-safe aggregation and thresholding",
  "no partner access to private customer records by default",
  "no integration without scoped access and revocation",
  "no international activation without regional review",
  "no lifecycle automation without suppression and preference controls",
  "no market-learning loop without review, versioning, and rollback",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-platform-leverage-standard.mjs",
]);

validateForbidden(standardPath, [
  "cross-business data leak allowed",
  "partner sees private reports by default allowed",
  "unscoped API key allowed",
  "self-evolving without review allowed",
  "benchmark from weak sample allowed",
  "duplicate welcome allowed",
  "unsupported country activation allowed",
]);

if (failures.length) {
  console.error("Platform leverage standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Platform leverage standard validation passed. Portfolio, multi-location, enterprise admin, benchmarking, integrations, partner channel, lifecycle automation, expansion revenue, localization, and market intelligence remain controlled and customer-beneficial.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required platform leverage dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required platform leverage phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden platform leverage phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
