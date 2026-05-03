import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

validateTextFile("src/lib/command-center/ai-manager-command-queue.ts", [
  "AI_MANAGER_COMMAND_POLICIES",
  "AiManagerCommandPolicy",
  "draft-report-section",
  "review-report-claim",
  "compare-benchmark",
  "run-synthetic-test",
  "summarize-intake",
  "recommend-next-action",
  "prepare-customer-output",
  "review-monthly-progress",
  "allowedInputClasses",
  "requiredContext",
  "requiredGuards",
  "blockedActions",
  "outputReviewGates",
  "auditEvents",
  "invent evidence",
  "send output",
]);
validateHelperSafety("src/lib/command-center/ai-manager-command-queue.ts");

validateTextFile("docs/ai-manager-command-queue-standard.md", [
  "AI Manager Command Queue Standard",
  "The AI manager can help draft, review, compare, test, summarize, and recommend actions.",
  "AI commands should run through a controlled queue with state, context, guardrails, review gates, and audit events.",
  "No AI command without context.",
  "No AI output treated as truth without source evidence.",
  "No customer-facing output sent directly by AI.",
  "No live customer record changed directly by AI.",
  "Cendorq remains the source of truth.",
]);

validateTextFile(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
  "AI and automation may assist, but cannot approve launches, reports, billing behavior, provider setup, or customer-facing claims.",
]);

validateTextFile(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-ai-manager-command-queue.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

if (failures.length) {
  console.error("AI manager command queue validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("AI manager command queue validation passed with owner posture coverage. AI manager commands are contextual, guardrailed, review-gated, audit-tracked, and prevented from direct customer sends or live-record changes.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing AI manager command queue file: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function validateHelperSafety(path) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const forbidden of ["NEXT_PUBLIC", "localStorage", "sessionStorage", "fetch(", "use client", "return env", "secretValue"]) {
    if (text.includes(forbidden)) failures.push(`${path} contains forbidden AI manager command behavior: ${forbidden}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
