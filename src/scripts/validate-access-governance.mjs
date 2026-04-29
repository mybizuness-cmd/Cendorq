import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/access-governance-contracts.ts";
const packagePath = "package.json";

expect(contractPath, [
  "ACCESS_GOVERNANCE_CONTRACT",
  "access-governance-v1",
  "least-privilege, reviewable, revocable, auditable",
  "Access must be granted intentionally, used narrowly, reviewed periodically, and removed promptly.",
  "customer-support-read",
  "customer-support-mutation",
  "billing-mutation",
  "report-release-approval",
  "operator-command-center-mutation",
  "backup-and-restore",
  "incident-response",
  "grant only the minimum role needed for the active workflow",
  "separate read-only review from guarded mutation",
  "do not allow customer-facing projections to inherit operator privileges",
  "billing changes require explicit billing authority and audit record",
  "backup restore requires recovery authority, incident context, ownership-boundary validation, and post-restore validation",
  "access reviews must be scheduled before scale and repeated periodically",
  "stale access must be removed promptly",
  "emergency access must be time-bounded, audited, and reviewed after use",
  "sensitive access decisions must leave audit proof",
  "new mutation paths must define required role, gate, audit record, safe projection, and failure behavior",
  "ACCESS_GOVERNANCE_HARD_LOCKS",
  "ACCESS_GOVERNANCE_BLOCKED_PATTERNS",
  "no broad admin access when scoped access is sufficient",
  "no mutation path without role, gate, audit, safe projection, and failure posture",
  "no customer-facing projection inheriting operator privileges",
]);

expect(packagePath, [
  "validate:routes",
]);

forbidden(contractPath, [
  "broad admin allowed",
  "mutation without audit allowed",
  "stale access allowed",
  "emergency access without expiry allowed",
  "customer projection can inherit operator privileges",
  "delete access audit records allowed",
]);

if (failures.length) {
  console.error("Access governance validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Access governance validation passed.");

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
