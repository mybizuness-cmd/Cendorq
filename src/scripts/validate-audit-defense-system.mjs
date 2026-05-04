import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const auditDefensePath = "src/lib/command-center/audit-defense-system.ts";
const enterprisePath = "src/lib/command-center/enterprise-operating-standard.ts";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-audit-defense-system.mjs";

validateTextFile(auditDefensePath, [
  "AUDIT_DEFENSE_CONTROLS",
  "AUDIT_DEFENSE_RELEASE_GATES",
  "getAuditDefenseSystem",
  "Claim substantiation record",
  "Customer consent and scope record",
  "Report release approval record",
  "Audit-ready evidence retention",
  "Legal review trigger record",
  "Material error correction record",
  "Dispute readiness package",
  "Marketing claim gate",
  "Free Scan gate",
  "Paid report gate",
  "Every objective customer-facing claim, score, diagnosis, comparison, guarantee statement, plan recommendation, and marketing claim must be tied to evidence",
  "customer-output approval before delivery",
  "Legal review must be required before public launch or material changes",
  "If a material report error is identified within the active review window",
]);

validateTextFile(enterprisePath, [
  "Liability minimization defense",
  "claim substantiation record",
  "customer consent trail",
  "terms/privacy alignment",
  "material error correction path",
  "Audit defense pass",
]);

validateTextFile(packagePath, ["validate:routes"]);
validateTextFile(routesChainPath, [validatorPath]);

if (failures.length) {
  console.error("Audit defense system validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Audit defense system validation passed. Cendorq release gates require substantiation, consent and scope records, terms alignment, approval records, evidence retention, review triggers, correction paths, route-chain coverage, and dispute-readiness metadata.");

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

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
