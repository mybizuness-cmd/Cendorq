import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/privacy-data-retention-contracts.ts";
const packagePath = "package.json";

expect(contractPath, [
  "PRIVACY_DATA_RETENTION_CONTRACT",
  "privacy-data-retention-v1",
  "privacy posture truthful, minimized, retention-aware, correction-ready, audit-preserving",
  "Customer and company data must have a clear purpose, a bounded retention posture",
  "public-contact-and-free-scan-intake",
  "customer-auth-and-session-references",
  "support-request-safe-records",
  "notification-and-email-queue-records",
  "billing-and-plan-reference-records",
  "report-vault-and-output-records",
  "operator-action-audit-records",
  "incident-and-recovery-records",
  "do not collect data simply because it might be useful someday",
  "retain audit proof needed for safety, billing, support, dispute, release, and incident defense without retaining unnecessary raw sensitive content",
  "customer-facing deletion and correction copy must be truthful and bounded",
  "do not promise deletion of required audit, billing, security, legal, or incident records when those records must be preserved",
  "international expansion requires localization, consent, retention, lawful processing, support language, billing language, and customer rights review",
  "do not claim GDPR, CCPA, SOC 2, ISO, HIPAA, or other compliance/certification status before it is actually achieved or reviewed",
  "country-specific copy must be localized for meaning, not just translated",
  "trust-center copy must separate current controls from future or planned certifications",
  "new record classes require a purpose, retention, projection, deletion/correction, and audit posture",
  "PRIVACY_DATA_RETENTION_HARD_LOCKS",
  "PRIVACY_DATA_RETENTION_BLOCKED_PATTERNS",
  "no record class without purpose and retention posture",
  "no false deletion promise for required audit, billing, security, legal, or incident records",
  "no hidden raw-data retention through backups, logs, telemetry, or queues",
]);

expect(packagePath, ["validate:routes"]);

forbidden(contractPath, [
  "delete everything forever allowed",
  "permanent deletion guaranteed allowed",
  "compliance claim without review allowed",
  "raw retention forever allowed",
  "ask customers for passwords allowed",
  "ask customers for card data allowed",
]);

if (failures.length) {
  console.error("Privacy data retention validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Privacy data retention validation passed.");

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
