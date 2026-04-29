import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/core-information-protection-contracts.ts";
const pristineValidatorPath = "src/scripts/validate-most-pristine-system-standard.mjs";
const packagePath = "package.json";

expect(contractPath, [
  "CORE_INFORMATION_PROTECTION_CONTRACT",
  "core-information-protection-v1",
  "Reduce the risk of customer, company, support, billing, report, operator, and platform information exposure",
  "Cendorq must never treat customer or company information as casual data.",
  "public-forms",
  "free-scan-intake",
  "customer-session-runtime",
  "report-generation-and-vault",
  "support-lifecycle-communications",
  "continuous-update-automation",
  "collect only the fields needed for the stated customer workflow",
  "store safe summaries instead of raw sensitive submissions whenever possible",
  "never add sensitive fields to public JavaScript or static HTML",
  "customer-owned data must require server-side customer ownership checks",
  "verified-email checks are required for protected customer support and dashboard APIs",
  "operator access must require role, gate, fresh reauthentication where applicable, and safe projection",
  "authorization failures must avoid account-existence leakage",
  "customer surfaces receive safe projections only",
  "operator history views remain bounded and projection-only",
  "notifications and emails use contract keys and safe copy rather than raw support content",
  "no session tokens in localStorage, sessionStorage, URLs, analytics payloads, public JavaScript, HTML, emails, or customer copy",
  "client state may hold presentation state but not protected authority",
  "no raw payload logging for customer submissions",
  "audit records must preserve proof without exposing customer secrets or unnecessary sensitive data",
  "do not delete required audit records to hide failures or clean up evidence",
  "validate every new information flow before merge",
  "design for rapid containment, revocation, rotation, and customer-safe disclosure if a protected path fails",
  "near-zero routine maintenance must be achieved through validated automation, not blind auto-change",
  "No system can honestly promise impossible-to-steal or impossible-to-hack.",
  "CORE_INFORMATION_PROTECTION_HARD_LOCKS",
  "CORE_INFORMATION_PROTECTION_BLOCKED_PATTERNS",
  "no browser authority for protected customer, support, billing, report, operator, or admin data",
  "no cross-customer data path without server-side ownership checks",
  "no maintenance automation that weakens validation or guardrails",
]);

expect(pristineValidatorPath, [
  "validate-most-pristine-system-standard.mjs",
]);

expect(packagePath, [
  "validate:routes",
]);

forbidden(contractPath, [
  "impossible-to-steal guarantee",
  "impossible-to-hack guarantee",
  "browser authority allowed",
  "raw customer payloads allowed",
  "cross-customer access allowed",
  "delete audit records allowed",
  "skip ownership checks allowed",
  "blind auto-change allowed",
]);

if (failures.length) {
  console.error("Core information protection validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Core information protection validation passed.");

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
