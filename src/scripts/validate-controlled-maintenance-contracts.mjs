import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const docsPath = "docs/controlled-maintenance.md";
const contractPath = "src/lib/controlled-maintenance-contracts.ts";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-controlled-maintenance-contracts.mjs";
const failures = [];

expect(docsPath, [
  "# Controlled Maintenance",
  "keeping the platform current, secure, validated, and scalable",
  "without uncontrolled AI changes or automatic production mutation",
  "dependency review",
  "security advisory monitoring",
  "validation registry checks",
  "smoke-test scheduling",
  "performance health checks",
  "schema drift checks",
  "route drift checks",
  "content and claim drift checks",
  "No queued update may mutate production automatically",
  "validation, approval state, rollback plan, and audit record",
  "Controlled continuous evolution defines how Cendorq improves after launch",
  "Documentation rule",
]);

expect(contractPath, [
  "CONTROLLED_MAINTENANCE_CONTRACT",
  "CONTROLLED_MAINTENANCE_BLOCKED_PATTERNS",
  "Controlled Maintenance Architecture",
  "scheduled review",
  "safe update queues",
  "without uncontrolled AI changes or automatic production mutation",
  "reviewStreams",
  "safeUpdateQueue",
  "hardLocks",
  "releaseRules",
]);

expect(contractPath, [
  "dependency-review",
  "security-advisory-monitoring",
  "validation-registry-checks",
  "smoke-test-scheduling",
  "performance-health-checks",
  "schema-drift-checks",
  "route-drift-checks",
  "content-claim-drift-checks",
]);

expect(contractPath, [
  "No queued update may mutate production automatically",
  "No uncontrolled AI agent may change production code, content, customer records, billing state, support state, reports, or security posture.",
  "No automatic breaking change may bypass validation, approval, and rollback requirements.",
  "Every risky update requires a rollback plan before merge.",
  "Every protected route or API change must preserve closed-by-default access, customer ownership, verified access, and safe projection.",
]);

expect(contractPath, [
  "raw payloads",
  "raw evidence",
  "raw security payloads",
  "raw billing data",
  "internal notes",
  "operator identities",
  "risk internals",
  "attacker details",
  "prompts",
  "secrets",
  "passwords",
  "API keys",
  "private keys",
  "session tokens",
  "CSRF tokens",
  "admin keys",
  "support context keys",
]);

expect(contractPath, [
  "uncontrolledProductionMutation",
  "autonomousBreakingChange",
  "agentDrift",
  "validationBypass",
  "approvalBypass",
  "rollbackMissing",
  "auditDeletionClaim",
  "guaranteedOutcomeClaim",
  "guaranteedRoiClaim",
  "impossibleToHackClaim",
  "liabilityFreeClaim",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  validatorPath,
]);

forbidden(docsPath, [
  "mutate production automatically without approval",
  "skip validation",
  "bypass approval",
  "rollback optional",
  "delete audit records",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
]);

forbidden(contractPath, [
  "mutate production automatically; release requires no approval",
  "skip validation",
  "bypass approval",
  "rollback optional",
  "delete audit records",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "rawPayload=",
  "rawEvidence=",
  "rawBillingData=",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed business results",
  "impossible to hack",
  "never liable",
  "liability-free",
]);

if (failures.length) {
  console.error("Controlled maintenance contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Controlled maintenance contracts validation passed. The controlled maintenance doc, contract, and validate:routes wiring remain aligned.");

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

  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
