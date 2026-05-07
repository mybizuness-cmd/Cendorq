import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const standardPath = "src/lib/ai-visibility-market-command-standard.ts";
const agentPath = "src/lib/agent-operating-system-contracts.ts";
const playbooksPath = "src/lib/cendorq-agent-intelligence-playbooks.ts";
const freeScanPath = "src/lib/free-scan-report-methodology.ts";
const paidReportsPath = "src/lib/paid-plan-report-delivery-operating-system.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-ai-visibility-market-command-standard.mjs";

expect(standardPath, [
  "AI_VISIBILITY_MARKET_COMMAND_STANDARD",
  "Cendorq helps a business become clear enough for customers, search, maps, reviews, directories, and AI answers",
  "The business is no longer competing only for ranking. It is competing for meaning before the click",
  "Search is moving from short keyword lookup into longer questions, summaries, comparisons, maps, reviews, and AI-assisted answers.",
  "findability",
  "answer-readability",
  "entity-clarity",
  "proof-strength",
  "choice-pressure",
  "action-path",
  "signal, proof, risk, limit, and next command",
  "Every page must speak to the customer, not describe generic software features.",
  "guaranteed AI answer placement",
  "luxury UI as the standard instead of customer command clarity",
]);

expect(agentPath, [
  "AI visibility intelligence",
  "market command standard",
  "Chief customer command experience agent",
  "clear-choice-experience-scout",
  "AI/search visibility truth",
  "guaranteed AI placement",
  "agentGuaranteedAiPlacementClaim",
]);

expect(playbooksPath, [
  "AI-era visibility signal",
  "clear-choice-experience-scout",
  "AI visibility findings must evaluate whether a business has clear entity identity",
  "answer engines could identify the business entity",
  "Do not turn AI visibility into a hype claim or guaranteed placement.",
]);

expect(freeScanPath, [
  "FREE_SCAN_AI_VISIBILITY_MODEL",
  "AI/Search Visibility",
  "Signal",
  "Proof",
  "Risk",
  "Limit",
  "Next command",
  "guaranteed ranking",
  "guaranteed AI placement",
]);

expect(paidReportsPath, [
  "PAID_REPORT_COMMAND_STRUCTURE",
  "Signal",
  "Proof",
  "Risk",
  "Limit",
  "Next command",
  "AI/search visibility posture labeled",
  "Paid reports must not claim guaranteed ranking, guaranteed AI placement, guaranteed leads, guaranteed revenue, or algorithm control.",
]);

expect(routesChainPath, [validatorPath]);

forbidden(standardPath, [
  "guaranteed AI placement.",
  "guaranteed ranking.",
  "we guarantee",
  "full diagnosis inside Free Scan is included",
]);

forbidden(agentPath, [
  "conversion-luxury-ui-scout",
  "premium customer experience",
  "luxury UI, conversion ethics",
]);

boundedLength(standardPath, 9000);
boundedLength(freeScanPath, 18000);
boundedLength(paidReportsPath, 17500);

if (failures.length) {
  console.error("AI visibility market command standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("AI visibility market command standard validation passed with bounded claims, customer-facing language, agent alignment, and report structure.");

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

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for the AI visibility command standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
