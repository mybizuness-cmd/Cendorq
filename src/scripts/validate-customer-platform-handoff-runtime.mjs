import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/customer-platform-handoff-runtime.ts";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-customer-platform-handoff-runtime.mjs";
const failures = [];

expect(runtimePath, [
  "projectCustomerPlatformHandoff",
  "CustomerPlatformHandoffProjection",
  "CustomerPlatformHandoffRuntimeInput",
  "CustomerPlatformHandoffDecision",
  "surfaceKey",
  "currentState",
  "safeNextAction",
  "recoveryPath",
  "connectedDestination",
  "privacyPosture",
  "requiredGuards",
  "holdReasons",
  "suppressionReasons",
  "recoveryReasons",
  "blockedPatterns",
  "hardLocks",
  "safeCustomerString",
]);

expect(runtimePath, [
  "customer ownership is missing",
  "verified access is missing",
  "safe status projection is missing",
  "suppression key is active",
  "allowed channels are empty",
  "unsafe content detected",
  "duplicate submission risk requires status, notification, dashboard, or support follow-through",
  "pending state cannot be presented as final truth",
]);

expect(runtimePath, [
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "internalNotes",
  "operatorIdentity",
  "riskScoringInternals",
  "attackerDetails",
  "system prompt",
  "developer message",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
  "apiKey=",
  "privateKey=",
  "password=",
]);

expect(runtimePath, [
  "CUSTOMER_PLATFORM_HANDOFF_BLOCKED_PATTERNS",
  "CUSTOMER_PLATFORM_HANDOFF_CONTRACT",
  "CUSTOMER_PLATFORM_HANDOFF_HARD_LOCKS",
  "getCustomerPlatformHandoffSurface",
  "listCustomerPlatformHandoffSurfaces",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  validatorPath,
]);

forbidden(runtimePath, [
  "rawPayloadStored: true",
  "return rawPayload",
  "return rawEvidence",
  "return rawSecurityPayload",
  "return rawBillingData",
  "return internalNotes",
  "return operatorIdentity",
  "return riskScoringInternals",
  "return attackerDetails",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "impossible to hack",
  "never liable",
  "liability-free",
]);

if (failures.length) {
  console.error("Customer platform handoff runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer platform handoff runtime validation passed. validate:routes delegates through the orchestrator and the handoff runtime validator remains wired into the route chain.");

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
