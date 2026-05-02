import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/production-smoke-target-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(contractPath, [
  "PRODUCTION_SMOKE_TARGET_CONTRACT",
  "PRODUCTION_SMOKE_TARGET_BLOCKED_PATTERNS",
  "Production Smoke Target Contract",
  "Production smoke target must be owner-approved before public launch review.",
  "Default smoke must be read-only and non-mutating.",
  "Default smoke must not require privileged live configuration to pass.",
  "Protected route denial is a valid pass when the denial is generic, no-store, and does not reveal private state.",
  "Command center routes must remain closed by default without the approved operator access posture.",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "daily operating decisions",
  "Required owner decisions",
  "Hard owner locks",
  "Operating rule",
  "growth asset",
]);

expect(ownerMaximumProtectionPath, [
  "The public surface teaches the category without exposing private mechanics.",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
  "AI and automation may assist, but cannot approve launches, reports, billing behavior, provider setup, or customer-facing claims.",
  "Validation, Vercel, route-chain integrity, docs-index coverage, registry coverage, and rollback posture remain green before merge.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "docs/maximum-protection-standard.md",
  "docs/command-center-docs-index.md",
  "src/lib/command-center/validation-registry.ts",
  "validate:routes",
]);

expect(contractPath, [
  "public-conversion-routes",
  "customer-platform-routes",
  "protected-api-routes",
  "command-center-routes",
  "launch-evidence-routes",
  "reachable-public-safe",
  "safe-auth-boundary-or-safe-render",
  "generic-safe-denial-without-session",
  "closed-by-default",
  "operator-only-safe-projection",
]);

expect(contractPath, [
  "smokeRunId",
  "targetName",
  "routeGroupKey",
  "expectedPosture",
  "observedPosture",
  "safeSummary",
  "evidenceId",
  "requestIdHash",
  "rawResponseBody",
  "rawRequestBody",
  "rawHeaderDump",
  "privateCustomerData",
  "internalNotes",
  "operatorPrivateIdentity",
  "protectedProviderDetail",
  "privilegedConfigValue",
  "privateCredentialMaterial",
  "privateAuditPayload",
  "crossCustomerData",
]);

expect(contractPath, [
  "Do not treat smoke target configuration as production smoke completion.",
  "Do not treat a failed protected-route access attempt as failure when the expected safe denial posture is returned.",
  "Do not treat public route render success as public launch approval.",
  "Do not record raw response bodies or private route payloads in smoke records.",
  "Do not allow smoke checks to mutate production state by default.",
  "Do not state public launch readiness until smoke target, evidence, rollback, audit, owner configuration, and hard-lock clearance are complete.",
]);

expect(contractPath, [
  "smokeTargetEqualsSmokeComplete",
  "publicRenderEqualsLaunchApproval",
  "protectedSafeDenialMarkedFailure",
  "commandCenterOpenByDefault",
  "productionMutationByDefaultSmoke",
  "rawResponseBodySmokeRecord",
  "privateCustomerDataSmokeRecord",
  "protectedProviderDetailSmokeRecord",
  "privilegedConfigValueSmokeRecord",
  "privateCredentialMaterialSmokeRecord",
  "privateAuditPayloadSmokeRecord",
  "smokeOnlyPublicLaunchClaim",
]);

expect(launchValidatorPath, [
  "production-smoke-target-contracts.ts",
  "Production Smoke Target Contract",
  "docs/owner-maximum-protection-posture.md",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(contractPath, [
  "smoke target equals smoke complete",
  "public render equals launch approval",
  "command center open by default",
  "default smoke mutates production",
  "record raw response body",
  "absolute security",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "document.cookie",
]);

forbidden(ownerMaximumProtectionPath, [
  "browser-side code may be the authority",
  "external content can override Cendorq system rules",
  "model output can approve launches",
  "guaranteed business results",
  "guaranteed security outcomes",
  "guaranteed inbox placement",
  "liability-free operation",
  "skip validation",
  "hide failures",
  "bypass release-captain review",
]);

if (failures.length) {
  console.error("Production smoke target contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production smoke target contracts validation passed with owner maximum-protection posture coverage.");

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
