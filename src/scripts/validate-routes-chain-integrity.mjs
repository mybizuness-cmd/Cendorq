import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const packagePath = "package.json";
const chainPath = "src/scripts/validate-routes-chain.mjs";
const chainIntegrityValidatorPath = "src/scripts/validate-routes-chain-integrity.mjs";
const baselineRouteValidatorPath = "src/scripts/validate-routes.mjs";
const bestOfBestValidatorPath = "src/scripts/validate-best-of-best-operating-standard.mjs";
const commandDesignValidatorPath = "src/scripts/validate-command-design-operating-standard.mjs";
const freeScanActiveFormValidatorPath = "src/scripts/validate-free-scan-active-form-selection.mjs";
const freeScanRoutingHintValidatorPath = "src/scripts/validate-free-scan-routing-hint-wire-contract.mjs";
const publicPlansValidatorPath = "src/scripts/validate-public-plans-excellence.mjs";
const pricingCheckoutValidatorPath = "src/scripts/validate-pricing-checkout-orchestration.mjs";
const billingCheckoutValidatorPath = "src/scripts/validate-billing-checkout-contracts.mjs";
const billingCenterFirstUseValidatorPath = "src/scripts/validate-billing-center-first-use.mjs";
const reportVaultFirstUseValidatorPath = "src/scripts/validate-report-vault-first-use.mjs";
const notificationCenterFirstUseValidatorPath = "src/scripts/validate-notification-center-first-use.mjs";
const supportCenterFirstUseValidatorPath = "src/scripts/validate-support-center-first-use.mjs";
const dashboardActionInboxValidatorPath = "src/scripts/validate-dashboard-action-inbox.mjs";
const planDeliveryValidatorPath = "src/scripts/validate-plan-delivery-orchestration-contracts.mjs";
const validationRegistryPath = "src/lib/command-center/validation-registry.ts";
const docsIndexPath = "docs/command-center-docs-index.md";
const ownerManualPath = "docs/owner-operating-manual.md";

const executedValidators = [
  chainIntegrityValidatorPath,
  baselineRouteValidatorPath,
  bestOfBestValidatorPath,
  commandDesignValidatorPath,
  freeScanActiveFormValidatorPath,
  freeScanRoutingHintValidatorPath,
  publicPlansValidatorPath,
  pricingCheckoutValidatorPath,
  billingCheckoutValidatorPath,
  billingCenterFirstUseValidatorPath,
  reportVaultFirstUseValidatorPath,
  notificationCenterFirstUseValidatorPath,
  supportCenterFirstUseValidatorPath,
  dashboardActionInboxValidatorPath,
  planDeliveryValidatorPath,
];

const documentedCoverageValidators = [
  "src/scripts/validate-command-center-validation-registry.mjs",
  "src/scripts/validate-command-center-docs-index.mjs",
  "src/scripts/validate-owner-operating-manual.mjs",
  "src/scripts/validate-report-truth-engine.mjs",
  "src/scripts/validate-public-drift.mjs",
  "src/scripts/validate-maximum-protection-standard.mjs",
  "src/scripts/validate-owner-maximum-protection-posture.mjs",
  "src/scripts/validate-closed-intelligence.mjs",
];

for (const path of [packagePath, chainPath, validationRegistryPath, docsIndexPath, ownerManualPath, ...executedValidators, ...documentedCoverageValidators]) validateFileExists(path);

if (!failures.length) {
  const packageText = read(packagePath);
  const chainText = read(chainPath);
  const registryText = read(validationRegistryPath);
  const docsText = read(docsIndexPath);
  const ownerManualText = read(ownerManualPath);
  const executedChainValidators = getArrayValues(chainText, "validators");
  const documentedChainValidators = getArrayValues(chainText, "documentedValidatorCoverage");
  const duplicateExecuted = executedChainValidators.filter((validator, index) => executedChainValidators.indexOf(validator) !== index);

  if (!packageText.includes('"validate:routes": "node ./src/scripts/validate-routes-chain.mjs"')) failures.push(`${packagePath} must delegate validate:routes to ${chainPath}`);
  if (duplicateExecuted.length) failures.push(`${chainPath} contains duplicate executed validators: ${[...new Set(duplicateExecuted)].join(", ")}`);

  for (const validatorPath of executedValidators) {
    if (!executedChainValidators.includes(validatorPath)) failures.push(`${chainPath} missing executed validator: ${validatorPath}`);
    if (!chainText.includes(validatorPath)) failures.push(`${chainPath} missing route-chain text for executed validator: ${validatorPath}`);
  }

  for (const validatorPath of documentedCoverageValidators) {
    if (!documentedChainValidators.includes(validatorPath)) failures.push(`${chainPath} missing documented adjacent validator: ${validatorPath}`);
    if (!registryText.includes(validatorPath) && !docsText.includes(validatorPath)) failures.push(`${validatorPath} must be discoverable in registry or docs index.`);
  }

  validateExactOrdering(executedChainValidators, executedValidators);

  expectText(chainPath, chainText, [
    "route-chain integrity",
    "best-of-best operating standard",
    "public Plans buyer-path excellence",
    "checkout handoff, billing contracts, billing center safe-document access, report vault safe-document access, notification center message mirrors, support center recovery, dashboard conversion inbox, and plan delivery lifecycle",
    "safe PDF access",
    "lifecycle nurturing",
    "registry coverage",
    "owner doctrine",
  ]);

  expectText(registryPathLabel(), registryText, [
    "pricing-checkout-orchestration",
    "billing-checkout-contracts",
    "dashboard-action-inbox",
    "plan-delivery-orchestration-contracts",
    "safe PDF document delivery",
    "dashboard-message mirror",
    "stage-targeted retargeting",
    "continuous nurturing",
  ]);

  expectText(docsIndexPath, docsText, [
    "Customer delivery validation standard",
    pricingCheckoutValidatorPath,
    billingCheckoutValidatorPath,
    dashboardActionInboxValidatorPath,
    planDeliveryValidatorPath,
    "safe PDF delivery only after gates pass",
    "mirrored dashboard messages for important emails",
  ]);

  expectText(ownerManualPath, ownerManualText, [
    "dashboard/report vault is the canonical protected display location",
    "Every important customer email should create or update a matching dashboard message record",
    "PDFs must never be the only access path.",
  ]);

  forbidden(chainPath, chainText, [
    "expected at least 140 validators",
    "must end with closed-intelligence validation",
    "missing high-risk validator",
  ]);
}

if (failures.length) {
  console.error("Validate routes chain integrity failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Validate routes chain integrity passed. The practical route-chain runs integrity first, baseline routes second, best-of-best operating standard, command design and Free Scan gates next, public Plans buyer-path excellence, checkout handoff, billing contracts, billing center safe-document access, report vault safe-document access, notification center message mirrors, support center recovery, dashboard conversion inbox, and plan delivery lifecycle. Adjacent registry, docs, owner manual, report truth, maximum protection, and closed-intelligence validators remain discoverable without forcing stale huge-chain execution.");

function getArrayValues(text, arrayName) {
  const match = text.match(new RegExp(`const ${arrayName} = \\[([\\s\\S]*?)\\];`));
  if (!match) {
    failures.push(`${chainPath} missing array: ${arrayName}`);
    return [];
  }
  return [...match[1].matchAll(/"(src\/scripts\/validate-[^"]+\.mjs)"/g)].map((item) => item[1]);
}

function validateExactOrdering(actual, expected) {
  const expectedText = expected.join("\n");
  const actualText = actual.slice(0, expected.length).join("\n");
  if (actualText !== expectedText) failures.push(`${chainPath} executed validator order must start exactly with the practical customer-delivery chain.`);
}

function validateFileExists(path) {
  if (!existsSync(join(root, path))) failures.push(`Missing required route-chain integrity dependency: ${path}`);
}

function expectText(path, text, phrases) {
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing route-chain integrity phrase: ${phrase}`);
  }
}

function forbidden(path, text, phrases) {
  const lower = text.toLowerCase();
  for (const phrase of phrases) {
    if (lower.includes(phrase.toLowerCase())) failures.push(`${path} contains stale route-chain integrity phrase: ${phrase}`);
  }
}

function registryPathLabel() {
  return validationRegistryPath;
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
