import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/dashboard/reports/page.tsx";
const ownerPosturePath = "docs/owner-maximum-protection-posture.md";
const ownerPostureValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(pagePath, [
  "REPORT_VAULT_FIRST_USE_SNAPSHOT",
  "Report vault first use snapshot",
  "Protected vault",
  "REPORT_VAULT_RULES",
  "Vault safety rules",
  "Report copy must separate verified facts, assumptions, inferences, recommendations, limitations, and next actions.",
  "Correction paths must preserve audit proof while keeping customer-facing explanations calm and bounded.",
]);

expect(ownerPosturePath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

expect(ownerPostureValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(packagePath, [
  "validate:routes",
  "validate-report-vault-first-use.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(pagePath, [
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage",
  "sessionStorage",
  "final customer truth without review",
]);

if (failures.length) {
  console.error("Report vault first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report vault first use validation passed with owner posture coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
