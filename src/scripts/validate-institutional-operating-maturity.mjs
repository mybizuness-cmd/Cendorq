import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/institutional-operating-maturity-contracts.ts";
const pristineValidatorPath = "src/scripts/validate-most-pristine-system-standard.mjs";
const packagePath = "package.json";

expect(contractPath, [
  "INSTITUTIONAL_OPERATING_MATURITY_CONTRACT",
  "institutional-operating-maturity-v1",
  "Raise Cendorq beyond premium product quality into institutional-grade operational maturity",
  "validated before release, observable after release, protected by least privilege, prepared for incidents, recoverable from failures",
  "adversarial-testing",
  "observability-and-alerting",
  "incident-response",
  "backup-and-disaster-recovery",
  "access-governance",
  "privacy-and-data-retention",
  "compliance-and-trust-readiness",
  "release-governance",
  "operational-runbooks",
  "test prompt-injection, credential submissions, unsafe raw evidence, payment-data attempts, cross-customer access attempts, and admin key exposure attempts",
  "capture adversarial tests as repeatable validation, not one-time manual checks",
  "monitor route failures, validation failures, support spikes, billing errors, report correction requests, and unusual submission patterns",
  "separate operational telemetry from customer secrets and raw payloads",
  "define severity levels for customer-impacting, data-protection, billing, support, report, and availability incidents",
  "do not delete audit records during incident response",
  "critical data stores need backup and restore expectations before scale",
  "review admin/operator access periodically",
  "define retention expectations for support, billing, reports, notifications, emails, logs, and audit records",
  "block releases that weaken information protection, interface excellence, sync, or truthful analysis",
  "avoid overclaiming certifications, guarantees, or security absolutes before they are actually obtained",
  "INSTITUTIONAL_OPERATING_MATURITY_HARD_LOCKS",
  "INSTITUTIONAL_OPERATING_MATURITY_BLOCKED_PATTERNS",
  "no launch without validation-backed release discipline",
  "no operational telemetry that stores customer secrets or raw sensitive payloads",
  "no incident response path that deletes required audit proof",
  "no high-impact release without rollback readiness",
]);

expect(pristineValidatorPath, [
  "validate-most-pristine-system-standard.mjs",
]);

expect(packagePath, [
  "validate:routes",
]);

forbidden(contractPath, [
  "ignore adversarial findings allowed",
  "telemetry raw payloads allowed",
  "delete audit proof allowed",
  "release rollback optional",
  "stale admin access allowed",
  "certification claim without audit allowed",
  "launch without validation allowed",
]);

if (failures.length) {
  console.error("Institutional operating maturity validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Institutional operating maturity validation passed.");

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
