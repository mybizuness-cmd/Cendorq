import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/operator-control-interface-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const packagePath = "package.json";
const failures = [];

expect(panelPath, [
  "OperatorControlInterfacePanel",
  "Operator control interface",
  "Every internal action needs access, approval, audit, and projection control.",
  "Admin-only access",
  "Approval gates",
  "Safe internal notes",
  "Audit preservation",
  "Required release gates",
  "Blocked customer projections",
  "customer-facing projections must stay sanitized, bounded, and approved",
]);

expect(panelPath, [
  "Customer-owned safe projection exists before any customer-visible update.",
  "Protected session, role, and route authorization are verified before operator actions.",
  "Billing actions avoid refund, entitlement, payment, or plan-change promises without approved provider state.",
  "Security reviews avoid exposing attacker details, detection internals, raw payloads, or unsupported outcome claims.",
  "Report changes preserve audit proof while separating facts, assumptions, inferences, limitations, and next actions.",
  "AI-assisted output remains advisory until reviewed, approved, logged, and bounded by customer-safe copy rules.",
]);

expect(panelPath, [
  "raw payloads",
  "raw evidence",
  "raw security payloads",
  "raw billing data",
  "internal notes",
  "operator identities",
  "risk-scoring internals",
  "attacker details",
  "system prompts",
  "developer messages",
  "passwords, secrets, private keys, session tokens, CSRF tokens, admin keys, or support context keys",
]);

expect(pagePath, [
  "OperatorControlInterfacePanel",
  "./operator-control-interface-panel",
  "<SecurityPosturePanel />",
  "<OperatorControlInterfacePanel />",
  "<OperatorReadinessMatrix />",
  "resolveCommandCenterAccessState",
  "ClosedCommandCenterPanel",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-command-center-control-interface-elevation.mjs",
]);

forbidden(panelPath, [
  "localStorage.setItem",
  "sessionStorage.setItem",
  "rawPayload=",
  "rawEvidence=",
  "rawSecurityPayload=",
  "rawBillingData=",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed safe",
  "impossible to hack",
  "never liable",
  "liability-free",
  "delete audit records",
]);

if (failures.length) {
  console.error("Command center control interface elevation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center control interface elevation validation passed.");

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
