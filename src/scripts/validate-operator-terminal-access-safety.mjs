import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const safetyPath = "src/lib/operator-terminal-access-safety.ts";
const routePath = "src/app/operator-terminal/page.tsx";

expect(safetyPath, [
  "OperatorTerminalAccessSafetyMode",
  "OperatorTerminalAccessSafetyResolution",
  "OPERATOR_TERMINAL_ACCESS_SAFETY",
  "getOperatorTerminalAccessSafety",
  "isOperatorTerminalReleaseExecutionAllowed",
  "sample-only",
  "server-gated",
  "operatorOnly: true",
  "customerFacingAllowed: false",
  "liveCustomerDataAllowed: false",
  "releaseExecutionAllowed: false",
  "providerAccessAllowed: false",
  "server-owned operator identity and access gate",
  "Sample-only operator view. Do not use for live customer records, provider access, or release execution until server-owned access gating is installed.",
  "execute release",
  "modify live customer records",
  "open provider access",
  "publish customer-facing terminal",
  "send approval email",
  "review sample packet state",
  "inspect evidence readiness counts",
  "read operator notices",
  "plan safe next action",
]);

expect(routePath, [
  "getOperatorTerminalAccessSafety",
  "accessSafety",
  "Operator terminal access safety",
  "Access safety is sample-only until server-owned gating exists.",
  "Required before production:",
  "accessSafety.requiredGateBeforeProduction",
  "accessSafety.disabledActions.map",
  "accessSafety.allowedSampleActions.map",
  "Disabled actions",
  "Allowed sample actions",
]);

order(routePath, "const accessSafety = getOperatorTerminalAccessSafety();", "const lanes = getOperatorTerminalLanes();");
order(routePath, "Internal operator terminal", "Operator terminal access safety");
order(routePath, "Operator terminal access safety", "Operator release lanes");
forbidden(safetyPath, ["authProvider", "stripe", "customerSession", "productionRelease", "liveProviderMutation"]);
forbidden(routePath, ["customer-facing terminal", "public operator terminal", "executeRelease(", "liveCustomerData", "providerAccessToken"]);

if (failures.length) {
  console.error("Operator terminal access safety validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Operator terminal access safety validation passed with sample-only mode, disabled release actions, route banner, and production gate boundary coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function order(path, before, after) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  const beforeIndex = text.indexOf(before);
  const afterIndex = text.indexOf(after);
  if (beforeIndex === -1) failures.push(`${path} missing order phrase: ${before}`);
  if (afterIndex === -1) failures.push(`${path} missing order phrase: ${after}`);
  if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex >= afterIndex) failures.push(`${path} order violation: ${before} must appear before ${after}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
