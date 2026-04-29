import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/platform-interface-excellence-contracts.ts";
const packagePath = "package.json";

expect(contractPath, [
  "PLATFORM_INTERFACE_EXCELLENCE_CONTRACT",
  "platform-interface-excellence-lock-v1",
  "customer-dashboard",
  "public-frontend-website",
  "operator-command-center",
  "admin-support-console",
  "report-rendering-surfaces",
  "Hard-lock customer dashboard, public website, command center, and support/operator surfaces",
  "Every customer-facing and operator-facing interface must feel premium, clear, useful, fast, protected, truthful, and carefully guided.",
  "clear visual hierarchy before decoration",
  "fast first understanding within one viewport",
  "summary-to-detail layout for complex decisions",
  "consistent navigation, help, and recovery paths",
  "keyboard-visible focus and accessible interactive targets",
  "show business status, next best action, and proof context immediately",
  "adapt copy for business size, revenue stage, category, and channel mix",
  "lead with truthful business value and practical outcomes",
  "operator/admin surfaces must separate read-only review from guarded mutation",
  "reports must separate verified facts, assumptions, inferences, and recommendations",
  "no keyboard traps",
  "visible focus required for interactive elements",
  "no fake urgency",
  "no dark-pattern pressure",
  "no browser-exposed secrets, protected context keys, session tokens, or admin keys",
  "customer dashboard cannot degrade into generic tiles",
  "all new interface layers require validation before merge",
  "PLATFORM_INTERFACE_EXCELLENCE_HARD_LOCKS",
  "PLATFORM_INTERFACE_EXCELLENCE_BLOCKED_PATTERNS",
]);

expect(packagePath, [
  "validate:routes",
  "validate-platform-interface-excellence.mjs",
]);

forbidden(contractPath, [
  "guaranteed ROI allowed",
  "fake urgency allowed",
  "dark patterns allowed",
  "raw payload allowed",
  "browser secret allowed",
  "skip validation",
  "best effort optional",
]);

if (failures.length) {
  console.error("Platform interface excellence validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Platform interface excellence validation passed.");

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
