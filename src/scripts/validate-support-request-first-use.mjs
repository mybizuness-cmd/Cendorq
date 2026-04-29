import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/support/request/page.tsx";
const packagePath = "package.json";
const failures = [];

expect(pagePath, [
  "SUPPORT_REQUEST_FIRST_USE_SNAPSHOT",
  "Support request first use snapshot",
  "Form choice",
  "New or update",
  "Summary posture",
  "Safe context",
  "Risk posture",
  "Guarded intake",
  "Follow-through",
  "Track after submit",
  "SUPPORT_REQUEST_FIRST_USE_ACTIONS",
  "Support request first use guidance",
  "First request visit",
  "Give enough context to help, not enough to create risk.",
  "Start new request",
  "Update existing request",
  "Track instead",
  "SUPPORT_REQUEST_FIRST_USE_RULES",
  "Write a safe summary: request type, business context, affected area, and the question or correction needed.",
  "Do not submit passwords, card numbers, bank details, private keys, raw tokens, session tokens, CSRF tokens, or admin keys.",
  "Do not paste raw attack strings, prompt-injection text, raw evidence dumps, raw security payloads, or private report internals.",
  "Use status tracking after submission so duplicate requests do not create confusion or unnecessary support noise.",
  "new-support-request",
  "support-request-update",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(packagePath, ["validate:routes"]);

forbidden(pagePath, [
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "impossible to hack",
  "never liable",
  "liability-free",
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "internalNotes=",
  "operatorIdentity=",
  "riskScoringInternals=",
  "attackerDetails=",
  "sessionToken=",
  "csrfToken=",
  "localStorage",
  "sessionStorage",
  "paste passwords allowed",
  "card numbers required",
]);

if (failures.length) {
  console.error("Support request first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Support request first use validation passed.");

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
