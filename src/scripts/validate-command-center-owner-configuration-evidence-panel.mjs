import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/owner-configuration-evidence-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const failures = [];

expect(panelPath, [
  "OwnerConfigurationEvidencePanel",
  "summarizeOwnerConfigurationEvidence",
  "Owner configuration evidence",
  "Private owner approval posture for auth, payments, protected runtime, launch contact, and support identity.",
  "Missing or pending evidence is not complete",
  "owner evidence alone never creates public launch, paid launch, report launch, or security readiness approval",
  "ownerEvidence.approvedCount",
  "ownerEvidence.pendingCount",
  "ownerEvidence.missingCount",
  "ownerEvidence.paidLaunchAllowed",
  "ownerEvidence.projections",
]);

expect(panelPath, [
  "auth-provider-configuration",
  "payment-mapping-configuration",
  "protected-runtime-configuration",
  "launch-contact-configuration",
  "support-identity-configuration",
  "approvalStatus: \"pending\"",
  "approvalStatus: \"missing\"",
  "Public launch: {projection.publicLaunchAllowed ? \"allowed\" : \"blocked\"}",
  "Paid launch: {projection.paidLaunchAllowed ? \"allowed\" : \"blocked\"}",
]);

expect(pagePath, [
  "OwnerConfigurationEvidencePanel",
  "./owner-configuration-evidence-panel",
  "<AgentOperatingSystemPanel />",
  "<OwnerConfigurationEvidencePanel />",
  "<OperatorReadinessMatrix />",
  "ClosedCommandCenterPanel",
  "resolveCommandCenterAccessState",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(packagePath, [
  "validate:routes",
  "validate-command-center-owner-configuration-evidence-panel.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(panelPath, [
  "publicLaunchAllowed: true",
  "paidLaunchAllowed: true",
  "rawProviderPayload=",
  "paymentProviderPayload=",
  "protectedConfigValue=",
  "privateCredentialMaterial=",
  "operatorPrivateIdentity=",
  "privateCustomerData=",
  "privateAuditPayload=",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed revenue",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Command center owner configuration evidence panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center owner configuration evidence panel validation passed with owner posture coverage.");

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
