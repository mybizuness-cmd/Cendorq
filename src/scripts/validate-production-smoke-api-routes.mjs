import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const routePath = "src/app/api/command-center/production-smoke/route.ts";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(routePath, [
  "export async function GET",
  "resolveCommandCenterAccessState",
  "commandCenterPreviewHeaderName",
  "projectProductionSmokeTarget",
  "safeDeniedResponse",
  "safeLaunchReadinessHeaders",
  "NextResponse.json",
  "force-dynamic",
  "revalidate = 0",
  "cache: \"no-store\"",
]);

expect(routePath, [
  "public-conversion-routes",
  "protected-api-routes",
  "command-center-routes",
  "launch-evidence-routes",
  "reachable-public-safe",
  "generic-safe-denial-without-session",
  "closed-by-default",
  "operator-only-safe-projection",
  "smoke: projection",
]);

expect(routePath, [
  "@/lib/command-center/access",
  "@/lib/production-smoke-target-runtime",
  "@/lib/platform-launch-readiness-api-runtime",
]);

expect(launchValidatorPath, [
  "validate-production-smoke-api-routes.mjs",
  "command-center/production-smoke/route.ts",
]);

forbidden(routePath, [
  "rawPayload=",
  "rawEvidence=",
  "rawBillingData=",
  "internalNotes=",
  "operatorIdentity=",
  "databaseUrl=",
  "providerSecret=",
  "webhookSecret=",
  "paymentProviderSecret=",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
  "privateKey=",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "document.cookie",
  "delete smoke",
  "rewrite smoke",
  "mutate production",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Production smoke API routes validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production smoke API routes validation passed.");

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

  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
