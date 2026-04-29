import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/observability-incident-response-contracts.ts";
const pristineValidatorPath = "src/scripts/validate-most-pristine-system-standard.mjs";
const packagePath = "package.json";

expect(contractPath, [
  "OBSERVABILITY_INCIDENT_RESPONSE_CONTRACT",
  "observability-incident-response-v1",
  "Make Cendorq observable, actionable, and containment-ready without leaking customer, company, support, billing, report, operator, or platform secrets",
  "Operational signals must help Cendorq detect, understand, contain, and recover from failures quickly",
  "route-health",
  "validation-failure",
  "deployment-check",
  "support-volume-anomaly",
  "billing-error-anomaly",
  "report-correction-anomaly",
  "notification-delivery-anomaly",
  "customer-session-auth-anomaly",
  "operator-action-anomaly",
  "adversarial-submission-anomaly",
  "performance-regression",
  "access-denial-spike",
  "telemetry may include route key, status class, safe error code, timestamp, environment, and bounded count",
  "telemetry must not include raw payloads, raw evidence, payment data, credentials, secrets, customer messages, internal notes, operator identities, session tokens, CSRF tokens, or admin keys",
  "SEV-1",
  "SEV-2",
  "SEV-3",
  "SEV-4",
  "preserve audit records and deployment history",
  "pause or hold affected communications when safe projection, ownership, or channel guards are uncertain",
  "customer-facing incident copy must be factual, bounded, calm, and approved",
  "post-incident follow-up must add or improve validation for the failed class",
  "OBSERVABILITY_INCIDENT_RESPONSE_HARD_LOCKS",
  "OBSERVABILITY_INCIDENT_RESPONSE_BLOCKED_PATTERNS",
  "no raw payloads or secrets in telemetry",
  "no alert without a runbook or next action",
  "no incident response that deletes audit proof",
]);

expect(pristineValidatorPath, [
  "validate-most-pristine-system-standard.mjs",
]);

expect(packagePath, [
  "validate:routes",
]);

forbidden(contractPath, [
  "raw telemetry allowed",
  "alert without runbook allowed",
  "delete audit proof allowed",
  "incident speculation allowed",
  "zero risk incident claim allowed",
  "disable validation to restore service allowed",
]);

if (failures.length) {
  console.error("Observability incident response validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Observability incident response validation passed.");

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
