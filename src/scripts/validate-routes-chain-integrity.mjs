import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const packagePath = "package.json";
const chainPath = "src/scripts/validate-routes-chain.mjs";
const docsIndexPath = "docs/command-center-docs-index.md";
const ownerManualPath = "docs/owner-operating-manual.md";
const registryPath = "src/lib/command-center/validation-registry.ts";
const memoryLockPath = "docs/operating-memory-lock.md";

const executedValidators = [
  "src/scripts/validate-routes-chain-integrity.mjs",
  "src/scripts/validate-routes.mjs",
  "src/scripts/validate-operating-memory-lock.mjs",
  "src/scripts/validate-current-operating-research-notes.mjs",
  "src/scripts/validate-brand-trademark-operating-standard.mjs",
  "src/scripts/validate-logo-readiness-standard.mjs",
  "src/scripts/validate-legal-trust-crawler-readiness-standard.mjs",
  "src/scripts/validate-owner-brand-legal-trust-addendum.mjs",
  "src/scripts/validate-best-of-best-operating-standard.mjs",
  "src/scripts/validate-unified-experience-alignment.mjs",
  "src/scripts/validate-surface-level-alignment.mjs",
  "src/scripts/validate-device-experience-performance-standard.mjs",
  "src/scripts/validate-acquisition-to-retention-operating-system.mjs",
  "src/scripts/validate-build-gate-hardening-standard.mjs",
  "src/scripts/validate-support-channel-operating-standard.mjs",
  "src/scripts/validate-command-design-operating-standard.mjs",
  "src/scripts/validate-command-center-docs-index.mjs",
  "src/scripts/validate-owner-operating-manual.mjs",
  "src/scripts/validate-maximum-protection-standard.mjs",
  "src/scripts/validate-trust-legal-plan-boundaries.mjs",
  "src/scripts/validate-public-drift.mjs",
  "src/scripts/validate-public-homepage-command-surface.mjs",
  "src/scripts/validate-public-entry-plan-journey.mjs",
  "src/scripts/validate-free-scan-active-form-selection.mjs",
  "src/scripts/validate-free-scan-routing-hint-wire-contract.mjs",
  "src/scripts/validate-public-plans-excellence.mjs",
  "src/scripts/validate-pricing-checkout-orchestration.mjs",
  "src/scripts/validate-billing-checkout-contracts.mjs",
  "src/scripts/validate-billing-center-first-use.mjs",
  "src/scripts/validate-report-vault-first-use.mjs",
  "src/scripts/validate-notification-center-first-use.mjs",
  "src/scripts/validate-support-center-first-use.mjs",
  "src/scripts/validate-support-status-first-use.mjs",
  "src/scripts/validate-support-request-first-use.mjs",
  "src/scripts/validate-dashboard-action-inbox.mjs",
  "src/scripts/validate-plan-delivery-orchestration-contracts.mjs",
];

const documentedCoverageValidators = [
  "src/scripts/validate-command-center-validation-registry.mjs",
  "src/scripts/validate-report-truth-engine.mjs",
  "src/scripts/validate-owner-maximum-protection-posture.mjs",
  "src/scripts/validate-closed-intelligence.mjs",
];

const doctrineFiles = [
  memoryLockPath,
  "docs/current-operating-research-notes.md",
  "docs/brand-trademark-operating-standard.md",
  "docs/legal-trust-crawler-readiness-standard.md",
  "docs/owner-brand-legal-trust-addendum.md",
  "docs/best-of-best-operating-standard.md",
  "src/lib/unified-experience-alignment.ts",
  "src/scripts/validate-surface-level-alignment.mjs",
  "docs/device-experience-performance-standard.md",
  "docs/acquisition-to-retention-operating-system.md",
  "docs/build-gate-hardening-standard.md",
  "docs/support-channel-operating-standard.md",
  "docs/maximum-protection-standard.md",
  "docs/owner-operating-manual.md",
  "docs/command-center-docs-index.md",
];

for (const path of [packagePath, chainPath, docsIndexPath, ownerManualPath, registryPath, ...executedValidators, ...documentedCoverageValidators, ...doctrineFiles]) {
  if (!existsSync(join(root, path))) failures.push(`Missing required route-chain integrity dependency: ${path}`);
}

if (!failures.length) {
  const packageText = read(packagePath);
  const chainText = read(chainPath);
  const docsText = read(docsIndexPath);
  const ownerText = read(ownerManualPath);
  const registryText = read(registryPath);
  const memoryLockText = read(memoryLockPath);
  const chainValidators = arrayValues(chainText, "validators");
  const documentedChainValidators = arrayValues(chainText, "documentedValidatorCoverage");
  const duplicates = chainValidators.filter((path, index) => chainValidators.indexOf(path) !== index);

  if (!packageText.includes('"validate:routes": "node ./src/scripts/validate-routes-chain.mjs"')) failures.push("package.json must delegate validate:routes to the practical route chain.");
  if (duplicates.length) failures.push(`validate-routes-chain has duplicate executed validators: ${[...new Set(duplicates)].join(", ")}`);
  if (chainValidators.slice(0, executedValidators.length).join("\n") !== executedValidators.join("\n")) failures.push("validate-routes-chain executed validator order must match the protected practical chain.");

  for (const validator of documentedCoverageValidators) {
    if (!documentedChainValidators.includes(validator)) failures.push(`${chainPath} missing documented adjacent validator: ${validator}`);
    if (!registryText.includes(validator) && !docsText.includes(validator)) failures.push(`${validator} must be discoverable in registry or docs index.`);
  }

  expect(chainPath, chainText, [
    "operating memory lock",
    "current operating research notes",
    "brand/trademark operating standard",
    "logo readiness standard",
    "legal/trust/crawler readiness",
    "owner brand legal trust addendum",
    "best-of-best operating standard",
    "unified experience alignment",
    "surface-level alignment",
    "device experience and performance",
    "acquisition-to-retention operating system",
    "build gate hardening",
    "support channel operating standard",
    "maximum protection security doctrine",
    "trust/legal boundary coverage",
    "dashboard conversion inbox",
    "plan delivery lifecycle",
  ]);

  expect(memoryLockPath, memoryLockText, [
    "Operating Memory Lock",
    "docs/current-operating-research-notes.md",
    "src/scripts/validate-current-operating-research-notes.mjs",
    "docs/brand-trademark-operating-standard.md",
    "src/scripts/validate-brand-trademark-operating-standard.mjs",
    "src/scripts/validate-logo-readiness-standard.mjs",
    "docs/legal-trust-crawler-readiness-standard.md",
    "src/scripts/validate-legal-trust-crawler-readiness-standard.mjs",
    "docs/support-channel-operating-standard.md",
    "src/scripts/validate-support-channel-operating-standard.mjs",
    "doctrine file, a validator, route-chain execution, route-chain integrity coverage, and docs visibility",
  ]);

  expect("docs/owner-brand-legal-trust-addendum.md", read("docs/owner-brand-legal-trust-addendum.md"), [
    "Owner Brand, Logo, Legal, and Trust Addendum",
    "Keep public crawler surfaces useful and private customer surfaces protected.",
    "Trust language should protect Cendorq while increasing buyer confidence.",
  ]);

  expect("docs/legal-trust-crawler-readiness-standard.md", read("docs/legal-trust-crawler-readiness-standard.md"), [
    "Legal, Trust, and Crawler Readiness Standard",
    "Public trust protection should be clear, calm, findable, and properly placed.",
    "Private customer areas should not be discovery surfaces.",
    "Dispute-risk reduction",
    "easy to trust, easy to crawl, easy to verify, and hard to misunderstand",
  ]);

  expect("docs/brand-trademark-operating-standard.md", read("docs/brand-trademark-operating-standard.md"), [
    "Brand and Trademark Operating Standard",
    "Logo ownership and proprietary readiness",
    "Signal mark design direction",
    "Cendorq signal mark",
  ]);

  expect("src/scripts/validate-logo-readiness-standard.mjs", read("src/scripts/validate-logo-readiness-standard.mjs"), [
    "Logo readiness standard",
    "src/layout/site-header-conversion.tsx",
    "function BrandMark()",
  ]);

  expect("docs/device-experience-performance-standard.md", read("docs/device-experience-performance-standard.md"), [
    "Device Experience and Performance Standard",
    "Mobile is the main entrance. Desktop is the command room.",
    "performance review should track LCP, INP, and CLS",
  ]);

  expect("src/lib/unified-experience-alignment.ts", read("src/lib/unified-experience-alignment.ts"), [
    "UNIFIED_EXPERIENCE_ALIGNMENT",
    "Homepage creates category clarity",
    "Plans and plan-detail pages carry pricing",
    "Dashboard surfaces act as the customer command room",
    "Mobile is the main entrance; desktop is the command room",
    "cheap-looking generic blocks",
  ]);

  expect("src/scripts/validate-surface-level-alignment.mjs", read("src/scripts/validate-surface-level-alignment.mjs"), [
    "src/app/page.tsx",
    "src/app/plans/page.tsx",
    "src/app/dashboard/dashboard-business-command-center.tsx",
    "src/app/dashboard/billing/page.tsx",
    "src/app/dashboard/reports/page.tsx",
    "src/app/dashboard/support/page.tsx",
  ]);

  expect(docsIndexPath, docsText, [
    "docs/brand-trademark-operating-standard.md",
    "src/scripts/validate-brand-trademark-operating-standard.mjs",
    "docs/legal-trust-crawler-readiness-standard.md",
    "src/scripts/validate-legal-trust-crawler-readiness-standard.mjs",
    "docs/best-of-best-operating-standard.md",
    "docs/acquisition-to-retention-operating-system.md",
    "Customer delivery validation standard",
    "safe PDF delivery only after gates pass",
    "mirrored dashboard messages for important emails",
  ]);

  expect(ownerManualPath, ownerText, [
    "Unified surface lock",
    "Operating memory lock",
    "dashboard/report vault is the canonical protected display location",
    "Every important customer email should create or update a matching dashboard message record",
    "PDFs must never be the only access path.",
  ]);

  expect(registryPath, registryText, [
    "best-of-best-operating-standard",
    "acquisition-to-retention-operating-system",
    "maximum-protection-standard",
    "dashboard-action-inbox",
    "plan-delivery-orchestration-contracts",
  ]);

  reject(chainPath, chainText, ["continue-on-error: true", "expected at least 140 validators", "must end with closed-intelligence validation"]);
}

if (failures.length) {
  console.error("Validate routes chain integrity failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Validate routes chain integrity passed with operating memory lock, current research, brand/trademark, logo readiness, legal/trust/crawler readiness, owner brand legal trust addendum, best-of-best, unified experience alignment, surface-level alignment, device experience and performance, acquisition-to-retention, build gates, support channels, public/customer delivery, legal/security, dashboard, support, billing, report vault, and plan delivery validators wired in order.");

function arrayValues(text, name) {
  const match = text.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`));
  if (!match) return [];
  return [...match[1].matchAll(/"(src\/scripts\/validate-[^"]+\.mjs)"/g)].map((item) => item[1]);
}

function expect(path, text, phrases) {
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function reject(path, text, phrases) {
  const lower = text.toLowerCase();
  for (const phrase of phrases) if (lower.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
