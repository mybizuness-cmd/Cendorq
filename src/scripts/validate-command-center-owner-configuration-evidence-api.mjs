import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const routePath = "src/app/api/command-center/owner-configuration/evidence/route.ts";
const runtimePath = "src/lib/owner-configuration-evidence-runtime.ts";
const contractPath = "src/lib/owner-configuration-evidence-contracts.ts";
const failures = [];

expect(routePath, [
  "export const dynamic = \"force-dynamic\";",
  "export const revalidate = 0;",
  "resolveCommandCenterAccessState",
  "commandCenterPreviewHeaderName",
  "sourceRoute = \"/api/command-center/owner-configuration/evidence\"",
  "export async function GET()",
  "export async function POST(request: Request)",
  "summarizeOwnerConfigurationEvidence",
  "containsBlockedEvidenceShape",
  "safe-summary-only",
  "safe_summary_required",
  "X-Robots-Tag",
  "noindex, nofollow, noarchive, nosnippet",
  "Cache-Control",
  "no-store, max-age=0",
]);

expect(routePath, [
  "commandCenterOnly: true",
  "publicLaunchAllowed: false",
  "paidLaunchAllowed: false",
  "reportLaunchAllowed: false",
  "securityReadinessApproved: false",
  "OWNER_CONFIGURATION_EVIDENCE_CONTRACT.blockedProjectionFields",
  "safeAreaKey",
  "safeApprovalStatus",
]);

expect(routePath, [
  "auth-provider-configuration",
  "payment-mapping-configuration",
  "protected-runtime-configuration",
  "launch-contact-configuration",
  "support-identity-configuration",
]);

expect(runtimePath, [
  "publicLaunchAllowed: false",
  "paidLaunchAllowed: false",
  "safeText",
  "redacted-safe-value",
]);

expect(contractPath, [
  "blockedProjectionFields",
  "rawProviderPayload",
  "paymentProviderPayload",
  "protectedConfigValue",
  "privateCredentialMaterial",
  "operatorPrivateIdentity",
  "privateCustomerData",
  "privateAuditPayload",
  "Owner configuration evidence alone must not create public launch approval.",
  "Owner configuration evidence alone must not create paid launch approval.",
]);

forbidden(routePath, [
  "customer-facing",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "publicLaunchAllowed: true",
  "paidLaunchAllowed: true",
  "reportLaunchAllowed: true",
  "securityReadinessApproved: true",
  "rawProviderPayload:",
  "paymentProviderPayload:",
  "protectedConfigValue:",
  "privateCredentialMaterial:",
  "operatorPrivateIdentity:",
  "privateCustomerData:",
  "privateAuditPayload:",
  "guaranteed ROI",
  "guaranteed revenue",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Command center owner configuration evidence API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center owner configuration evidence API validation passed.");

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
