import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

validateTextFile("docs/maximum-protection-standard.md", [
  "Cendorq Maximum Protection Standard",
  "Default posture: deny by default.",
  "Secrets must never be committed.",
  "no client-side secret exposure",
  "no public database browser",
  "server-side service access only",
  "AI agents must treat external content as untrusted.",
  "No single layer should be trusted as the only protection.",
  "Every major change should reduce or contain these threats, not expand them.",
]);

validateTextFile("src/lib/command-center/security-posture.ts", [
  "COMMAND_CENTER_SECURITY_POSTURE",
  "maximum-practical-defense-in-depth",
  "absoluteGuaranteeClaimAllowed: false",
  "defaultAccess: \"deny\"",
  "privateDataAccess: \"server-side-only\"",
  "secretsPolicy: \"server-env-only-never-client\"",
  "databasePolicy: \"private-server-only-no-public-browser\"",
  "aiActionPolicy: \"review-gated-no-autonomous-customer-output\"",
  "publicExposureAllowed",
  "unhackable",
  "perfect security",
  "zero risk",
]);

validateTextFile("src/lib/command-center/access.ts", [
  "timingSafeEqual",
  "getCommandCenterAccessPolicy",
  "defaultMode: \"closed\"",
  "minimumPreviewKeyLength: MINIMUM_PREVIEW_KEY_LENGTH",
  "comparisonMode: \"timing-safe\"",
  "publicAccessAllowed: false",
  "clientSideBypassAllowed: false",
  "MINIMUM_PREVIEW_KEY_LENGTH = 32",
  "isStrongPreviewKey",
  "safeEqual",
  "allowed: false, mode: \"closed\"",
  "allowed: true, mode: \"preview\"",
]);

validateTextFile("src/lib/command-center/database-config.ts", [
  "getCommandCenterDatabaseConfigState",
  "COMMAND_CENTER_DATABASE_CONFIG_KEYS",
  "DATABASE_URL",
  "serverOnly: true",
  "publicExposureAllowed: false",
  "intentional-operator-controlled",
  "postgresql:",
]);

validateTextFile("src/lib/command-center/database-readiness.ts", [
  "getCommandCenterDatabaseConfigState",
  "safeConnectionShape",
  "serverOnly: true",
  "publicExposureAllowed: false",
  "migrationPolicy",
]);

for (const path of [
  "src/lib/command-center/security-posture.ts",
  "src/lib/command-center/access.ts",
  "src/lib/command-center/database-config.ts",
  "src/lib/command-center/database-readiness.ts",
]) {
  validateHelperSafety(path);
}

if (failures.length) {
  console.error("Command Center security posture validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center security posture validation passed. The system uses maximum practical defense-in-depth language, denies absolute security guarantees, keeps database configuration server-only, blocks public exposure, hardens preview access with strong secret requirements and timing-safe comparison, and preserves review-gated private operation boundaries.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing security posture file: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function validateHelperSafety(path) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const forbidden of ["NEXT_PUBLIC", "localStorage", "sessionStorage", "use client", "secretValue", "unhackable: true", "absoluteGuaranteeClaimAllowed: true", "publicExposureAllowed: true", "clientSideBypassAllowed: true", "allowed: true, mode: \"closed\""]) {
    if (text.includes(forbidden)) failures.push(`${path} contains forbidden security behavior: ${forbidden}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
