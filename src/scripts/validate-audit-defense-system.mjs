import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const auditDefensePath = "src/lib/command-center/audit-defense-system.ts";
const enterprisePath = "src/lib/command-center/enterprise-operating-standard.ts";
const packagePath = "package.json";

validateTextFile(auditDefensePath, [
  "AUDIT_DEFENSE_CONTROLS",
  "AUDIT_DEFENSE_RELEASE_GATES",
  "getAuditDefenseSystem",
  "Claim substantiation record",
  "Customer consent and scope record",
  "Terms, privacy, and guarantee alignment",
  "Report release approval record",
  "Audit-ready evidence retention",
  "Legal review trigger record",
  "Material error correction record",
  "Dispute readiness package",
  "Marketing claim gate",
  "Free Scan gate",
  "Paid report gate",
  "Guarantee wording gate",
  "Every objective customer-facing claim, score, diagnosis, comparison, guarantee statement, plan recommendation, and marketing claim must be tied to evidence",
  "accepted terms version, consent scope, submitted business information, authorized contact, plan purchased, report stage, and permitted data use boundaries",
  "Report footer language, pricing pages, guarantee claims, refund terms, privacy policy, and customer terms must not contradict each other",
  "customer-output approval before delivery",
  "retain enough non-public audit metadata to defend what was reviewed",
  "Legal review must be required before public launch or material changes",
  "If a material report error is identified within the active review window",
  "assemble a privacy-safe package showing consent, scope, evidence, calculations, approvals, delivery records, correction history, and applicable terms versions",
  "must not promise rankings, traffic, leads, conversions, revenue, platform outcomes, perfect accuracy, or immunity from liability",
]);

validateTextFile(enterprisePath, [
  "Liability minimization defense",
  "claim substantiation record",
  "customer consent trail",
  "terms/privacy alignment",
  "material error correction path",
  "Audit defense pass",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-audit-defense-system.mjs",
]);

validateForbidden(auditDefensePath, [
  "claiming zero liability allowed",
  "promising legal immunity allowed",
  "unsupported marketing claims allowed",
  "guaranteed rankings allowed",
  "guaranteed revenue allowed",
  "no legal review needed",
  "no consent required",
]);

if (failures.length) {
  console.error("Audit defense system validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Audit defense system validation passed. Cendorq release gates require substantiation, consent and scope records, terms alignment, approval records, evidence retention, legal-review triggers, correction paths, and dispute-readiness metadata while blocking legal-immunity and guaranteed-outcome claims.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required audit defense dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required audit defense phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden audit defense phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
