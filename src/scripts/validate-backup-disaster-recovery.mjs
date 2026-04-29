import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/backup-disaster-recovery-contracts.ts";
const pristineValidatorPath = "src/scripts/validate-most-pristine-system-standard.mjs";
const packagePath = "package.json";

expect(contractPath, [
  "BACKUP_DISASTER_RECOVERY_CONTRACT",
  "backup-disaster-recovery-v1",
  "Make Cendorq recoverable from platform, deployment, storage, data, queue, report, billing, support, and operator-surface failures",
  "Recovery must be planned before scale.",
  "customer-session-and-auth-reference-records",
  "free-scan-submission-summaries",
  "support-request-safe-records",
  "notification-records",
  "email-queue-records",
  "billing-and-plan-reference-records",
  "report-vault-and-report-output-records",
  "operator-action-audit-records",
  "incident-and-containment-records",
  "restore customer-owned views without cross-customer leakage",
  "restore audit proof without exposing unnecessary sensitive raw content",
  "backup scope must be explicit for each protected record class",
  "backups must not become a second raw-data store for sensitive submissions",
  "restore requires an identified incident, approved recovery path, and validation after restore",
  "restore must preserve customer ownership boundaries and safe projection rules",
  "restore must not re-trigger lifecycle emails, notifications, billing actions, or support messages without idempotency checks",
  "high-impact releases require a rollback path before promotion",
  "rollback must not delete required audit records",
  "restore tests must use sanitized fixtures or safe references, not real raw customer secrets",
  "recovery posture must integrate with observability, incident response, information protection, and release governance",
  "BACKUP_DISASTER_RECOVERY_HARD_LOCKS",
  "BACKUP_DISASTER_RECOVERY_BLOCKED_PATTERNS",
  "no backup path that stores unnecessary raw sensitive content",
  "no restore without ownership-boundary validation",
  "no customer-facing claim of impossible data loss or perfect recovery",
]);

expect(pristineValidatorPath, [
  "validate-most-pristine-system-standard.mjs",
]);

expect(packagePath, [
  "validate:routes",
]);

forbidden(contractPath, [
  "raw backups allowed",
  "restore without ownership allowed",
  "audit deletion rollback allowed",
  "perfect recovery guaranteed",
  "impossible data loss guarantee",
  "restore test with real secrets allowed",
]);

if (failures.length) {
  console.error("Backup disaster recovery validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Backup disaster recovery validation passed.");

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
