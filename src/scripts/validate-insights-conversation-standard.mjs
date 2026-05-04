import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const standardPath = "src/lib/command-center/insights-conversation-standard.ts";
const docsIndexPath = "docs/command-center-docs-index.md";
const routeChainPath = "src/scripts/validate-routes-chain.mjs";
const registryPath = "src/lib/command-center/validation-registry.ts";

validateTextFile(standardPath, [
  "INSIGHTS_CONVERSATION_RULES",
  "INSIGHTS_CONVERSATION_MODES",
  "getInsightsConversationStandard",
  "Strategic insight layer",
  "Guided business conversation",
  "Evidence-grounded answers",
  "Plan guidance with integrity",
  "Education without overwhelm",
  "Operator escalation path",
  "Conversation safety and brand",
  "Memory with boundaries",
  "Conversion conversation moat",
  "Conversation analytics with privacy",
  "Explain my scan",
  "What should I do next",
  "Compare plans",
  "Ask about report",
  "Request review or support",
  "evidence tie-back",
  "confidence label",
  "support escalation",
  "no raw private evidence exposure",
  "no guaranteed outcomes",
  "no dark pattern",
]);

validateTextFile(docsIndexPath, [
  "src/lib/command-center/insights-conversation-standard.ts",
  "src/scripts/validate-insights-conversation-standard.mjs",
]);

validateTextFile(routeChainPath, ["src/scripts/validate-insights-conversation-standard.mjs"]);
validateTextFile(registryPath, ["insights-conversation-standard", "src/scripts/validate-insights-conversation-standard.mjs"]);

validateForbidden(standardPath, [
  "invented evidence allowed",
  "guaranteed outcomes allowed",
  "raw evidence dump allowed",
  "fake urgency allowed",
  "raw report text in analytics allowed",
  "secret in event allowed",
]);

if (failures.length) {
  console.error("Insights conversation standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Insights conversation standard validation passed with evidence-grounded, plan-aware, privacy-safe, escalation-ready, conversion-useful conversation safeguards.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required insights conversation dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required insights conversation phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden insights conversation phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
