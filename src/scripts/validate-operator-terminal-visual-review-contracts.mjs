import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractPath = "src/lib/operator-terminal-visual-review-contracts.ts";
const routePath = "src/app/operator-terminal/page.tsx";
const productionEntryPath = "src/lib/operator-terminal-production-entry-guard.ts";

expect(contractPath, [
  "OperatorTerminalVisualReviewViewportId",
  "OperatorTerminalVisualReviewPanelId",
  "OperatorTerminalVisualReviewCheckId",
  "OperatorTerminalVisualReviewResolution",
  "OPERATOR_TERMINAL_VISUAL_REVIEW_VIEWPORTS",
  "OPERATOR_TERMINAL_VISUAL_REVIEW_PANELS",
  "OPERATOR_TERMINAL_VISUAL_REVIEW_CHECKS",
  "resolveOperatorTerminalVisualReviewContracts",
  "productionEntryGate: \"visual-review\"",
  "status: \"review-required\"",
  "reviewComplete: false",
  "mobile-390",
  "mobile-430",
  "tablet-768",
  "desktop-1024",
  "desktop-1440",
  "hero-boundary",
  "access-safety",
  "server-access-gate",
  "production-entry-guard",
  "release-lanes",
  "packet-runtime",
  "approval-gate",
  "sample-banner-before-packet-work",
  "disabled-actions-readable",
  "server-gate-before-release-lanes",
  "production-entry-before-execution-content",
  "release-and-provider-controls-inactive",
  "packet-count-labels-readable",
  "approval-copy-customer-safe-only",
  "internal-only-terminal-copy",
  "requiredBeforeProduction: true",
  "blockedUntil",
  "allowedBeforeReview",
  "forbiddenBeforeReview",
]);

expect(productionEntryPath, ["visual-review", "Visual review"]);
expect(routePath, [
  "Internal operator terminal",
  "Operator terminal access safety",
  "Server access gate",
  "Operator release lanes",
  "Command Queue",
  "Approval Gate",
]);

order(contractPath, "mobile-390", "mobile-430");
order(contractPath, "mobile-430", "tablet-768");
order(contractPath, "tablet-768", "desktop-1024");
order(contractPath, "desktop-1024", "desktop-1440");
order(contractPath, "hero-boundary", "access-safety");
order(contractPath, "access-safety", "server-access-gate");
order(contractPath, "server-access-gate", "production-entry-guard");
order(contractPath, "production-entry-guard", "release-lanes");
order(contractPath, "release-lanes", "packet-runtime");
order(contractPath, "packet-runtime", "approval-gate");

forbidden(contractPath, ["reviewComplete: true", "productionEntryAllowed: true"]);

if (failures.length) {
  console.error("Operator terminal visual review contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Operator terminal visual review contracts validation passed.");

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
