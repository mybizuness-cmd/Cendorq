import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const sourcePackagePath = "docs/cendorq-competitive-intelligence-source-package.md";

expect(sourcePackagePath, [
  "Cendorq Competitive Intelligence Source Package",
  "This document exists so the plan does not live only in one chat transcript.",
  "Required takeover reading order",
  "docs/agent-handoff/current-handoff.md",
  "docs/cendorq-master-blueprint.md",
  "docs/cendorq-competitive-intelligence-source-package.md",
  "docs/visual-command-surface-review-register.md",
  "docs/visual-command-device-width-review-protocol.md",
  "src/lib/visual-command-device-review-targets.ts",
  "src/lib/dashboard-protected-suite-contracts.ts",
  "Current source anchors to re-check when needed",
  "https://www.yext.com/platform/scout",
  "https://www.yext.com/blog/introducing-visibility-score-yext-scout",
  "https://www.semrush.com/one/",
  "https://ai-visibility-index.semrush.com/",
  "Competitive intelligence summary",
  "Yext Scout",
  "Semrush",
  "Prior Cendorq video",
  "Cendorq should not become a smaller Semrush or a smaller Yext.",
  "AI Search Presence Repair",
  "Make the business answer-ready.",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "Presence Report",
  "Presence Score",
  "Business Truth Profile",
  "Choice Gap",
  "Repair Queue",
  "Evidence Boundary",
  "Control Snapshot",
  "Presence Gap Index",
  "Quality level instruction for future chats",
  "Operate at category-owner level, not helper level.",
  "Think like a product strategist, conversion architect, visual director, system designer, release captain, and QA lead at the same time.",
  "Never move a PR forward without checking CI, Release Control, CodeQL, and Vercel on the exact head SHA.",
  "Visual quality bar",
  "Public website direction",
  "Protected dashboard direction",
  "Operator terminal direction",
  "End-to-end roadmap to finish the product direction",
  "Phase 1: Source memory and doctrine",
  "Phase 2: Public conversion surfaces",
  "Phase 3: Protected customer dashboard",
  "Phase 4: Real Free Scan and report data",
  "Phase 5: Paid plan ownership and delivery",
  "Phase 6: Operator terminal and QA gates",
  "Phase 7: Presence Gap Index authority asset",
  "Phase 8: Live visual proof and production readiness",
  "Batch order for future chats",
  "Non-negotiables",
  "Final takeover command",
]);

order(sourcePackagePath, "Scan", "Review");
order(sourcePackagePath, "Review", "Repair");
order(sourcePackagePath, "Repair", "Control");
order(sourcePackagePath, "Phase 1: Source memory and doctrine", "Phase 2: Public conversion surfaces");
order(sourcePackagePath, "Phase 2: Public conversion surfaces", "Phase 3: Protected customer dashboard");
order(sourcePackagePath, "Phase 3: Protected customer dashboard", "Phase 4: Real Free Scan and report data");
order(sourcePackagePath, "Phase 4: Real Free Scan and report data", "Phase 5: Paid plan ownership and delivery");
order(sourcePackagePath, "Phase 5: Paid plan ownership and delivery", "Phase 6: Operator terminal and QA gates");
order(sourcePackagePath, "Phase 6: Operator terminal and QA gates", "Phase 7: Presence Gap Index authority asset");
order(sourcePackagePath, "Phase 7: Presence Gap Index authority asset", "Phase 8: Live visual proof and production readiness");

forbidden(sourcePackagePath, [
  "guaranteed rankings",
  "guaranteed leads",
  "guaranteed revenue",
  "guaranteed AI placement",
  "copy Semrush exactly",
  "copy Yext exactly",
]);

if (failures.length) {
  console.error("Cendorq competitive intelligence source package validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Cendorq competitive intelligence source package validation passed with source anchors, takeover reading order, quality-level instruction, end-to-end roadmap, batch order, and non-negotiables.");

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

function order(path, before, after) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  const beforeIndex = text.indexOf(before);
  const afterIndex = text.indexOf(after);
  if (beforeIndex === -1) failures.push(`${path} missing order phrase: ${before}`);
  if (afterIndex === -1) failures.push(`${path} missing order phrase: ${after}`);
  if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex >= afterIndex) failures.push(`${path} order violation: ${before} must appear before ${after}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
