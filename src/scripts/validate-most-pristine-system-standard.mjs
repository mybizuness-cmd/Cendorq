import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const standardPath = "src/lib/command-center/most-pristine-system-standard.ts";
const enterprisePath = "src/lib/command-center/enterprise-operating-standard.ts";
const auditDefensePath = "src/lib/command-center/audit-defense-system.ts";
const packagePath = "package.json";

validateTextFile(standardPath, [
  "MOST_PRISTINE_SYSTEM_REQUIREMENTS",
  "MOST_PRISTINE_RELEASE_PASSES",
  "getMostPristineSystemStandard",
  "Frontend most-pristine standard",
  "Backend most-pristine standard",
  "API most-pristine standard",
  "Data and database most-pristine standard",
  "AI most-pristine standard",
  "Report most-pristine standard",
  "Security most-pristine standard",
  "Privacy and audit-defense most-pristine standard",
  "Brand most-pristine standard",
  "Performance most-pristine standard",
  "Operations most-pristine standard",
  "Integration most-pristine standard",
  "Documentation most-pristine standard",
  "Deployment most-pristine standard",
  "Customer experience most-pristine standard",
  "Inside-outside surface pass",
  "Trust with leverage pass",
  "No weak link pass",
  "Does every visible and invisible layer meet the same most-pristine standard",
  "any layer below the Cendorq standard because it is internal, temporary, hidden, operational, or not customer-facing",
  "Every public and private interface must feel official, premium, fast, accessible, responsive, trustworthy, conversion-aware, brand-consistent",
  "Backend systems must be secure-by-default, typed, validated, observable, testable, failure-aware, auditable, least-privilege",
  "Reports must be official, branded, visually modern, evidence-backed, calculation-traceable, business-specific, category-aware, revenue-context-aware, social/platform-aware",
  "AI must be controlled, versioned, evidence-grounded, plan-scoped, review-gated for customer output",
  "Privacy and audit defense must preserve proof without exposing sensitive data",
  "Every change must pass validation, build checks, route checks, smoke checks where applicable, reviewable diffs, rollback readiness, and production safety gates",
]);

validateTextFile(enterprisePath, [
  "Enterprise operating standard",
  "Liability minimization defense",
  "Audit defense pass",
]);

validateTextFile(auditDefensePath, [
  "AUDIT_DEFENSE_CONTROLS",
  "AUDIT_DEFENSE_RELEASE_GATES",
  "Claim substantiation record",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-most-pristine-system-standard.mjs",
]);

validateForbidden(standardPath, [
  "prototype-looking allowed",
  "agent drift allowed",
  "client-side secret exposure allowed",
  "unsupported claims allowed",
  "unapproved report release allowed",
  "ignored validator failure allowed",
  "claiming zero liability allowed",
]);

if (failures.length) {
  console.error("Most-pristine system standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Most-pristine system standard validation passed. Frontend, backend, APIs, data, AI, reports, security, privacy, audit defense, brand, performance, operations, integrations, documentation, deployment, and customer experience must meet the same no-weak-link Cendorq quality bar.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required most-pristine dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required most-pristine phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden most-pristine phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
