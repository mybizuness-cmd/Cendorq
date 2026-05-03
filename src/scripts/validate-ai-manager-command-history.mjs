import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

validateTextFile("src/lib/command-center/ai-manager-command-history.ts", [
  "AI_MANAGER_COMMAND_HISTORY_POLICY",
  "AiManagerCommandHistoryPolicy",
  "requiredFields",
  "reviewFields",
  "blockedReasonTypes",
  "retentionStates",
  "auditEvents",
  "unsupported claim count",
  "private note exclusion check",
  "model version label",
  "prompt policy version",
  "evaluation policy version",
  "getAiManagerCommandHistoryPolicy",
]);
validateHelperSafety("src/lib/command-center/ai-manager-command-history.ts");

validateTextFile("docs/ai-manager-command-history-standard.md", [
  "AI Manager Command History Standard",
  "Every AI manager action must be traceable.",
  "what context was used",
  "why the result was approved, blocked, or archived",
  "No AI command without history.",
  "No AI output without model and policy labels.",
  "No customer-facing output without traceable approval.",
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
  "validate-ai-manager-command-history.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

if (failures.length) {
  console.error("AI manager command history validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("AI manager command history validation passed with owner posture coverage. AI command history is traceable, review-aware, block-aware, policy-labeled, and audit-protected.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing AI manager command history file: ${path}`);
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
    if (text.includes(forbidden)) failures.push(`${path} contains forbidden AI manager history behavior: ${forbidden}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
