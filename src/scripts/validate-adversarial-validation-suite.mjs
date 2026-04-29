import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/adversarial-validation-suite-contracts.ts";
const pristineValidatorPath = "src/scripts/validate-most-pristine-system-standard.mjs";
const packagePath = "package.json";

expect(contractPath, [
  "ADVERSARIAL_VALIDATION_SUITE_CONTRACT",
  "adversarial-validation-suite-v1",
  "Turn hostile-input and leakage expectations into repeatable release validation",
  "Adversarial checks are mandatory release evidence.",
  "prompt-injection-and-system-override-attempts",
  "credential-token-and-secret-submission",
  "payment-card-and-billing-data-submission",
  "raw-evidence-dump-and-private-document-submission",
  "cross-customer-identifier-and-ownership-confusion",
  "admin-key-support-key-and-protected-header-exposure",
  "unsafe-refund-legal-security-report-or-roi-promise-demand",
  "browser-storage-and-public-javascript-secret-exposure",
  "notification-email-and-report-raw-content-leakage",
  "homepage-concierge-nudge",
  "free-scan-room",
  "customer-support-request-api",
  "customer-support-status-api",
  "support-lifecycle-email-queue",
  "operator-safe-summary-api",
  "sanitize or reject hostile prompt-injection content without echoing the raw attack",
  "block cross-customer access through server-side ownership checks",
  "hold or suppress communications when ownership, verified session, safe projection, or channel guards are missing",
  "reject unsupported legal, refund, report-change, security-outcome, ROI, or business-result promises",
  "each hostile-input class must have a named expected outcome",
  "validators must fail on browser storage of protected authority",
  "adversarial validation must run before merge through a locked gate",
  "ADVЕRSARIAL_VALIDATION_CASES".replace("Е", "E"),
  "ADVERSARIAL_VALIDATION_BLOCKED_PATTERNS",
  "prompt-injection",
  "credential-submission",
  "payment-data",
  "cross-customer-access",
  "browser-secret-exposure",
  "operator-internal-projection",
  "unsafe-promise-demand",
  "raw-evidence-dump",
]);

expect(pristineValidatorPath, [
  "validate-most-pristine-system-standard.mjs",
]);

expect(packagePath, [
  "validate:routes",
]);

forbidden(contractPath, [
  "ignore prompt injection allowed",
  "echo raw attack allowed",
  "store raw credential allowed",
  "payment card allowed in support",
  "cross customer bypass allowed",
  "browser admin key allowed",
  "disable adversarial validation allowed",
  "impossible-to-hack guarantee",
]);

if (failures.length) {
  console.error("Adversarial validation suite validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Adversarial validation suite validation passed.");

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
