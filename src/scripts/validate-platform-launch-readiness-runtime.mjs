import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/platform-launch-readiness-runtime.ts";
const contractPath = "src/lib/platform-launch-readiness-contracts.ts";
const failures = [];

expect(runtimePath, [
  "projectPlatformLaunchReadiness",
  "PlatformLaunchReadinessInput",
  "PlatformLaunchReadinessProjection",
  "PlatformLaunchDecisionState",
  "blocked",
  "ready-for-owner-review",
  "ready-for-production-smoke",
  "ready-for-limited-launch",
  "ready-for-public-launch",
  "safeSummary",
  "readyGroups",
  "blockedGroups",
  "evidenceGaps",
  "safeNextActions",
  "hardLaunchLocks",
  "blockedPatterns",
]);

expect(runtimePath, [
  "latest main commit verification is missing",
  "validate:routes wiring is missing",
  "route validation pass is missing",
  "green Vercel deployment is missing",
  "server-only secret configuration evidence is missing",
  "rollback plan evidence is missing",
  "audit plan evidence is missing",
  "public entry readiness evidence is missing",
  "Free Scan readiness evidence is missing",
  "customer platform handoff readiness evidence is missing",
  "report generation and vault readiness evidence is missing",
  "billing checkout and entitlement readiness evidence is missing",
  "support and command center readiness evidence is missing",
  "controlled maintenance and smoke readiness evidence is missing",
  "critical hard launch lock is active",
]);

expect(runtimePath, [
  "Launch is blocked until required validation, safety, ownership, and release evidence is present.",
  "The platform can be reviewed by the owner, but missing evidence still prevents launch.",
  "The platform is ready for production smoke preparation, not final public launch.",
  "The platform may be considered for limited launch only after owner configuration and safety checks are confirmed.",
  "The platform is eligible for public-launch review after production smoke, owner configuration, rollback, audit, and hard-lock checks remain clear.",
]);

expect(runtimePath, [
  "PLATFORM_LAUNCH_READINESS_CONTRACT",
  "PLATFORM_LAUNCH_READINESS_BLOCKED_PATTERNS",
  "safeString",
  "rawPayload=",
  "rawEvidence=",
  "rawBillingData=",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
  "privateKey=",
  "Blocked unsafe launch readiness value.",
]);

expect(contractPath, [
  "PLATFORM_LAUNCH_READINESS_CONTRACT",
  "hardLaunchLocks",
  "PLATFORM_LAUNCH_READINESS_BLOCKED_PATTERNS",
]);

forbidden(runtimePath, [
  "return rawPayload",
  "return rawEvidence",
  "return rawBillingData",
  "return secret",
  "return password",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed revenue",
  "impossible to hack",
  "never liable",
  "liability-free",
  "delete audit records",
]);

if (failures.length) {
  console.error("Platform launch readiness runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Platform launch readiness runtime validation passed.");

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
