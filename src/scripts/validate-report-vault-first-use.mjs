import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/dashboard/reports/page.tsx";
const ownerPosturePath = "docs/owner-maximum-protection-posture.md";
const ownerPostureValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-report-vault-first-use.mjs";

expect(pagePath, [
  "Readiness proof vault",
  "Your private Cendorq vault for readiness signals, AI/search posture, approved reports, paid-report delivery, confidence labels, and next-step guidance.",
  "REPORT_VAULT_HANDOFFS",
  "REPORT_LIBRARY",
  "REPORT_STATE",
  "REPORT_ACTIONS",
  "REPORT_VAULT_RULES",
  "Keep the record of what customers and AI search can understand.",
  "Nothing final until it is approved.",
  "Different proof for every readiness depth.",
  "Open readiness signal",
  "Back to control center",
  "Ask report support",
  "Compare readiness depth",
  "Readiness signal result",
  "Deep Review report",
  "Build Fix summary",
  "Ongoing Control monthly summary",
  "Dashboard-only protected result unless a separate export is approved later.",
  "Dashboard report plus approved email attachment.",
  "Every paid plan report must be accessible from the dashboard report vault and also delivered by email with an approved PDF.",
  "AI/search posture must be useful and bounded: no ranking promises, AI placement promises, lead promises, or algorithm control claims.",
  "Paid report actions route to plan detail pages before payment.",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(ownerPosturePath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
  "Evidence and report logic stay separated into verified facts, assumptions, inferences, limitations, confidence, and next actions.",
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

expect(routesChainPath, [validatorPath]);

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
  "raw evidence is visible to customers",
  "raw provider payload",
  "private credentials",
  "algorithm control guaranteed",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
]);

if (failures.length) {
  console.error("Report vault first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report vault first use validation passed with current readiness-proof vault, paid report separation, owner posture, and safe delivery boundaries.");

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
