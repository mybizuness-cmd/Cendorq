import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/dashboard/reports/page.tsx";
const ownerPosturePath = "docs/owner-maximum-protection-posture.md";
const ownerPostureValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";

expect(pagePath, [
  "Readiness proof vault",
  "REPORT_VAULT_HANDOFFS",
  "REPORT_LIBRARY",
  "REPORT_STATE",
  "REPORT_ACTIONS",
  "REPORT_DOCUMENT_RULES",
  "REPORT_VAULT_RULES",
  "PAID_PLAN_REPORT_DELIVERY_GUARDS",
  "PAID_PLAN_REPORT_DELIVERY_OPERATING_SYSTEM",
  "Nothing final until it is approved.",
  "Different proof for every readiness depth.",
  "Useful only when report depth, AI-readiness posture, and delivery are impossible to confuse.",
]);

expect(pagePath, [
  "Released delivery",
  "Vault first + mirrored",
  "Paid reports must appear in the verified report vault first; email, mirrored dashboard messages, downloadable PDFs, or attachments activate only after entitlement, release, no-leak, and document-safety gates.",
  "Verified dashboard report vault first; export or PDF delivery only when a separate safe document gate is approved.",
  "Vault-first report with mirrored dashboard message, email summary, downloadable PDF, or attachment only after",
  "entitlement, no-leak, and document-safety gates pass",
]);

expect(pagePath, [
  "Report document delivery standard",
  "Vault is source",
  "The report vault is the canonical customer view. Email, dashboard messages, downloads, and PDFs must match this released state.",
  "Messages mirrored",
  "Report-ready, correction, support, and delivery emails should mirror into dashboard messages with the same safe next action.",
  "PDFs gated",
  "Report PDFs are static, branded, no-leak checked, and enabled only after entitlement, verified access, release, and document-safety gates pass.",
  "Correction path visible",
  "Questions, corrections, and revised reports route through support and release-captain approval before customer-facing changes.",
]);

expect(pagePath, [
  "Pending, draft, or unavailable reports must never look final.",
  "Scan, Review, Repair, and Control report types must remain visibly separate.",
  "Every paid plan report must be accessible from the verified dashboard report vault before any email, downloadable PDF, or attachment path is enabled.",
  "Email summaries, mirrored dashboard messages, downloadable PDFs, and attachments must not create a separate source of truth from the report vault.",
  "AI-readiness posture must be useful and bounded: no guaranteed ranking, guaranteed AI placement, guaranteed leads, or algorithm control.",
]);

expect(pagePath, [
  "Readiness signal result",
  "AI Readiness Review report",
  "Signal Repair summary",
  "Readiness Control monthly summary",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "AI-readiness posture",
  "No separate source of truth. No PDF-only access path.",
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

expect(routesChainPath, [
  "validate-report-vault-first-use.mjs",
]);

forbidden(pagePath, [
  "REPORT_VAULT_FIRST_USE_SNAPSHOT",
  "Report vault first use snapshot",
  "Every paid plan report must be accessible from the dashboard report vault and also delivered by email with an approved PDF.",
  "Dashboard + email attachment",
  "dashboard plus email attachment",
  "must appear in the vault and arrive by email with an approved PDF",
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "guaranteed deliverability",
  "guaranteed inbox placement",
  "impossible to hack",
  "never liable",
  "liability-free",
  "final customer truth without review",
  "separate source of truth allowed",
  "pdf-only access path allowed",
  "PDF-only access path allowed",
  "localStorage",
  "sessionStorage",
]);

if (failures.length) {
  console.error("Report vault first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report vault first use validation passed with vault-first report access, mirrored dashboard messages, safe PDF gates, correction paths, owner posture coverage, and no separate-source-of-truth delivery.");

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
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
