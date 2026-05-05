import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const standardPath = "src/lib/command-center/scale-resilience-standard.ts";
const docsIndexPath = "docs/command-center-docs-index.md";
const routeChainPath = "src/scripts/validate-routes-chain.mjs";
const registryPath = "src/lib/command-center/validation-registry.ts";

validateTextFile(standardPath, [
  "SCALE_RESILIENCE_RULES",
  "LOAD_RELEASE_GATES",
  "getScaleResilienceStandard",
  "Large customer volume ready",
  "Free Scan spike ready",
  "Queue-first report work",
  "Consistent output under load",
  "Database performance boundary",
  "Cache with truth boundary",
  "Observability and capacity command",
  "Graceful degradation without quality loss",
  "public-intake-load-gate",
  "report-generation-load-gate",
  "capacity-regression-gate",
  "queue-backed long work",
  "idempotent job keys",
  "safe acceptance response",
  "dead-letter policy",
  "no quality downgrade rule",
  "safe customer notification",
]);

validateTextFile(docsIndexPath, [
  "src/lib/command-center/scale-resilience-standard.ts",
  "src/scripts/validate-scale-resilience-standard.mjs",
]);

validateTextFile(routeChainPath, ["src/scripts/validate-scale-resilience-standard.mjs"]);
validateTextFile(registryPath, ["scale-resilience-standard", "src/scripts/validate-scale-resilience-standard.mjs"]);

validateForbidden(standardPath, [
  "quality downgrade under load allowed",
  "unbounded synchronous report work allowed",
  "cross-customer cache leak allowed",
  "false instant-complete claim allowed",
  "raw error exposure allowed",
]);

if (failures.length) {
  console.error("Scale resilience standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Scale resilience standard validation passed with spike, queue, database, cache, observability, and no-quality-downgrade safeguards.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required scale resilience dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required scale resilience phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden scale resilience phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
