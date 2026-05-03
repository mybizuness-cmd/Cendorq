import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/trust-center-readiness-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(contractPath, [
  "TRUST_CENTER_READINESS_CONTRACT",
  "trust-center-readiness-v1",
  "customer-safe trust-center communication",
  "Trust content must increase confidence through clarity and evidence, not exaggerated promises.",
  "security-and-access-controls",
  "privacy-and-data-retention",
  "report-methodology-and-truthfulness",
  "support-and-correction-process",
  "billing-and-plan-clarity",
  "incident-response-and-communications",
  "backup-and-recovery-readiness",
  "continuous-improvement-and-release-governance",
  "compliance-and-certification-status",
  "international-readiness",
  "describe implemented controls in plain language",
  "separate validation-backed standards from live provider certifications",
  "explain report outputs as facts, assumptions, inferences, recommendations, limitations, and next actions",
  "avoid unsupported ROI, legal, security-outcome, refund, report-change, or business-result promises",
  "do not claim SOC 2, ISO, HIPAA, GDPR, CCPA, PCI, or other formal compliance/certification status unless actually achieved, reviewed, or applicable",
  "planned compliance work must be labeled as planned, under review, or future readiness",
  "incident readiness copy must be factual, bounded, and non-alarmist",
  "support correction paths must be visible and safe",
  "new trust-center copy requires validation before merge",
  "TRUST_CENTER_READINESS_HARD_LOCKS",
  "TRUST_CENTER_READINESS_BLOCKED_PATTERNS",
  "no security absolute or impossible prevention claim",
  "no compliance or certification claim before it is achieved or reviewed",
  "no trust copy that hides material limitations",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
  "Evidence and report logic stay separated into verified facts, assumptions, inferences, limitations, confidence, and next actions.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(packagePath, [
  "validate:routes",
  "validate-trust-center-readiness.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(contractPath, [
  "security absolute allowed",
  "compliance claim without review allowed",
  "hide material limitations allowed",
  "internal detection details allowed",
  "guaranteed ROI allowed",
  "guaranteed refund allowed",
]);

if (failures.length) {
  console.error("Trust center readiness validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Trust center readiness validation passed with owner posture coverage.");

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
