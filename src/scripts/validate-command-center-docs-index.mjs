import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "docs/command-center-docs-index.md",
  "docs/current-operating-research-notes.md",
  "docs/brand-trademark-operating-standard.md",
  "docs/legal-trust-crawler-readiness-standard.md",
  "docs/best-of-best-operating-standard.md",
  "docs/acquisition-to-retention-operating-system.md",
  "docs/build-gate-hardening-standard.md",
  "docs/device-experience-performance-standard.md",
  "docs/support-channel-operating-standard.md",
  "docs/command-design-operating-standard.md",
  "docs/command-design-release-checklist.md",
  ".github/PULL_REQUEST_TEMPLATE/command-design.md",
  "docs/maximum-protection-standard.md",
  "docs/owner-maximum-protection-posture.md",
  "docs/command-center-operator-runbook.md",
  "docs/admin-command-center-safe-projections.md",
  "docs/owner-operating-manual.md",
  "docs/operating-memory-lock.md",
  "docs/repo-update-scanning-automation.md",
  "docs/controlled-continuous-evolution.md",
  "docs/controlled-maintenance.md",
  "package.json",
  "src/scripts/validate-routes-chain.mjs",
  "src/scripts/validate-routes-chain-integrity.mjs",
  "src/scripts/validate-current-operating-research-notes.mjs",
  "src/scripts/validate-brand-trademark-operating-standard.mjs",
  "src/scripts/validate-logo-readiness-standard.mjs",
  "src/scripts/validate-legal-trust-crawler-readiness-standard.mjs",
  "src/scripts/validate-best-of-best-operating-standard.mjs",
  "src/scripts/validate-unified-experience-alignment.mjs",
  "src/scripts/validate-surface-level-alignment.mjs",
  "src/scripts/validate-device-experience-performance-standard.mjs",
  "src/scripts/validate-acquisition-to-retention-operating-system.mjs",
  "src/scripts/validate-build-gate-hardening-standard.mjs",
  "src/scripts/validate-support-channel-operating-standard.mjs",
  "src/scripts/validate-command-design-operating-standard.mjs",
  "src/scripts/validate-public-drift.mjs",
  "src/scripts/validate-maximum-protection-standard.mjs",
  "src/scripts/validate-owner-maximum-protection-posture.mjs",
  "src/scripts/validate-codeql-workflow-integrity.mjs",
  "src/scripts/validate-command-center-docs-index.mjs",
  "src/scripts/validate-owner-operating-manual.mjs",
  "src/scripts/validate-pricing-checkout-orchestration.mjs",
  "src/scripts/validate-billing-checkout-contracts.mjs",
  "src/scripts/validate-dashboard-action-inbox.mjs",
  "src/scripts/validate-plan-delivery-orchestration-contracts.mjs",
  "src/lib/best-of-best-operating-standard.ts",
  "src/lib/unified-experience-alignment.ts",
  "src/lib/command-center/validation-registry.ts",
  "src/lib/controlled-continuous-evolution-contracts.ts",
  "src/lib/customer-email-confirmation-handoff-contracts.ts",
  "src/lib/billing-checkout-contracts.ts",
  "src/lib/pricing-checkout-orchestration.ts",
  "src/lib/plan-delivery-orchestration-contracts.ts",
  "src/app/dashboard/dashboard-action-inbox.tsx",
  "src/app/dashboard/dashboard-business-command-center.tsx",
  "src/app/dashboard/dashboard-control-room-reentry.tsx",
  "src/app/checkout/success/page.tsx",
  "src/app/plans/page.tsx",
  "src/components/plans/conversion-plan-page.tsx",
  "src/app/plans/plan-data.ts",
];

for (const file of requiredFiles) validateFileExists(file);

validateTextFile("docs/command-center-docs-index.md", [
  "# Command Center Docs Index",
  "private documentation index",
  "docs/current-operating-research-notes.md",
  "docs/brand-trademark-operating-standard.md",
  "docs/legal-trust-crawler-readiness-standard.md",
  "docs/best-of-best-operating-standard.md",
  "docs/acquisition-to-retention-operating-system.md",
  "docs/build-gate-hardening-standard.md",
  "docs/device-experience-performance-standard.md",
  "docs/support-channel-operating-standard.md",
  "docs/command-design-operating-standard.md",
  "docs/maximum-protection-standard.md",
  "docs/owner-operating-manual.md",
  "docs/operating-memory-lock.md",
  "brand and trademark operating standard",
  "logo ownership",
  "legal, trust, crawler",
  "policy pages",
  "private-customer discovery boundaries",
  "current-source refresh standard",
  "page/subpage architecture",
  "no-clutter design",
  "future-proofing",
  "full journey operating standard",
  "public discovery",
  "SEO/AI-readiness visibility",
  "dashboard retention",
  "reactivation",
  "build gate hardening standard",
  "locked install",
  "device experience and performance standard",
  "LCP, INP, CLS",
  "support channel operating standard",
  "SPF, DKIM, and DMARC",
  "Apple-level clarity",
  "Stripe-level billing trust",
  "Shopify-level owner empowerment",
  "Salesforce-level system consistency",
  "Microsoft-level calm interaction",
  "Atlassian-level documented foundations",
  "Nielsen Norman usability discipline",
  "Intercom-level support",
]);

validateTextFile("docs/command-center-docs-index.md", [
  "## Required command design paths",
  "src/scripts/validate-current-operating-research-notes.mjs",
  "src/scripts/validate-brand-trademark-operating-standard.mjs",
  "src/scripts/validate-logo-readiness-standard.mjs",
  "src/scripts/validate-legal-trust-crawler-readiness-standard.mjs",
  "src/scripts/validate-best-of-best-operating-standard.mjs",
  "src/scripts/validate-acquisition-to-retention-operating-system.mjs",
  "src/scripts/validate-build-gate-hardening-standard.mjs",
  "src/scripts/validate-device-experience-performance-standard.mjs",
  "src/scripts/validate-support-channel-operating-standard.mjs",
  "src/scripts/validate-command-design-operating-standard.mjs",
  "src/scripts/validate-public-drift.mjs",
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
  "safest-next-command rule",
  "legal/trust surfaces",
  "crawler-facing public trust signals",
]);

validateTextFile("docs/command-center-docs-index.md", [
  "## Customer delivery and lifecycle source-of-truth areas",
  "src/lib/customer-email-confirmation-handoff-contracts.ts",
  "src/lib/billing-checkout-contracts.ts",
  "src/lib/pricing-checkout-orchestration.ts",
  "src/lib/plan-delivery-orchestration-contracts.ts",
  "src/app/dashboard/dashboard-action-inbox.tsx",
  "src/app/dashboard/dashboard-business-command-center.tsx",
  "src/app/dashboard/dashboard-control-room-reentry.tsx",
  "src/app/checkout/success/page.tsx",
  "src/app/plans/page.tsx",
  "src/components/plans/conversion-plan-page.tsx",
  "src/app/plans/plan-data.ts",
  "Customer delivery must remain vault-first, verified-access-first, dashboard-mirrored, and best-of-best aligned.",
  "Email, PDF attachments, downloadable PDFs, billing documents, dashboard messages, and report-vault display must all reflect the same safe customer-owned state without becoming separate truth sources.",
]);

validateTextFile("docs/command-center-docs-index.md", [
  "## Customer delivery validation standard",
  "src/scripts/validate-current-operating-research-notes.mjs",
  "src/scripts/validate-brand-trademark-operating-standard.mjs",
  "src/scripts/validate-logo-readiness-standard.mjs",
  "src/scripts/validate-legal-trust-crawler-readiness-standard.mjs",
  "src/scripts/validate-best-of-best-operating-standard.mjs",
  "src/scripts/validate-acquisition-to-retention-operating-system.mjs",
  "src/scripts/validate-build-gate-hardening-standard.mjs",
  "src/scripts/validate-device-experience-performance-standard.mjs",
  "src/scripts/validate-support-channel-operating-standard.mjs",
  "src/scripts/validate-pricing-checkout-orchestration.mjs",
  "src/scripts/validate-billing-checkout-contracts.mjs",
  "src/scripts/validate-dashboard-action-inbox.mjs",
  "src/scripts/validate-plan-delivery-orchestration-contracts.mjs",
  "src/scripts/validate-owner-operating-manual.mjs",
  "Delivery validation must preserve: acquisition-to-retention operating system",
  "brand and trademark operating standard",
  "legal/trust/crawler readiness",
  "best-of-best operating standard",
  "verified email before protected report access",
  "dashboard/report vault as source of truth",
  "mirrored dashboard messages for important emails",
  "safe PDF delivery only after gates pass",
  "provider-authoritative billing PDFs",
  "no guaranteed deliverability claims",
  "no guaranteed inbox placement claims",
  "no guaranteed ranking or traffic promises",
  "no guaranteed indexing or AI answer placement promises",
  "no guaranteed trademark registration or competitor blocking claims",
  "no PDF-only access path",
  "no raw/private data projection",
]);

validateTextFile("docs/brand-trademark-operating-standard.md", [
  "# Brand and Trademark Operating Standard",
  "Logo ownership and proprietary readiness",
  "Signal mark design direction",
  "Five owner filing steps",
  "Cendorq signal mark",
]);

validateTextFile("docs/legal-trust-crawler-readiness-standard.md", [
  "# Legal, Trust, and Crawler Readiness Standard",
  "Public trust protection should be clear, calm, findable, and properly placed.",
  "Private customer areas should not be discovery surfaces.",
  "Dispute-risk reduction",
]);

validateTextFile("docs/best-of-best-operating-standard.md", [
  "# Best-of-Best Operating Standard",
  "Research-inspired operating principles",
  "Page and subpage operating system",
  "No-clutter design doctrine",
  "Future-proofing doctrine",
  "Non-negotiable Cendorq quality bar",
  "Money-making discipline",
  "Blocked patterns",
  "Operating review checklist",
  "Validator coverage",
  "src/lib/best-of-best-operating-standard.ts",
  "src/scripts/validate-best-of-best-operating-standard.mjs",
]);

validateTextFile("docs/acquisition-to-retention-operating-system.md", [
  "# Acquisition-to-Retention Operating System",
  "Discovery before the visit",
  "Landing experience",
  "Public page roles",
  "Conversion path",
  "After checkout",
  "Email and lifecycle nurturing",
  "Dashboard conversion and retention",
  "Report value and forecast usefulness",
  "Support and recovery",
  "Retention and reactivation",
  "Security and privacy across the journey",
  "Continuous improvement loop",
  "Blocked patterns",
  "guaranteed ranking or traffic promises",
  "guaranteed indexing or AI answer placement promises",
]);

validateTextFile("docs/build-gate-hardening-standard.md", [
  "# Build Gate Hardening Standard",
  "Required gates",
  "locked package manager",
  "route-chain validation",
  "typecheck",
  "lint",
  "production build",
]);

validateTextFile("docs/device-experience-performance-standard.md", [
  "# Device Experience and Performance Standard",
  "Mobile is the main entrance. Desktop is the command room.",
  "performance review should track LCP, INP, and CLS",
]);

validateTextFile("docs/support-channel-operating-standard.md", [
  "# Support Channel Operating Standard",
  "support@cendorq.com",
  "billing@cendorq.com",
  "reports@cendorq.com",
  "security@cendorq.com",
  "partners@cendorq.com",
  "confirm SPF, DKIM, and DMARC posture",
]);

validateTextFile("docs/current-operating-research-notes.md", [
  "# Current Operating Research Notes",
  "Do not move from stale memory",
]);

validateTextFile("docs/operating-memory-lock.md", [
  "# Operating Memory Lock",
  "src/scripts/validate-current-operating-research-notes.mjs",
  "src/scripts/validate-support-channel-operating-standard.mjs",
  "src/scripts/validate-unified-experience-alignment.mjs",
  "src/scripts/validate-surface-level-alignment.mjs",
]);

validateTextFile("docs/command-design-operating-standard.md", [
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
  "What is the safest next command?",
]);

validateTextFile("docs/command-design-release-checklist.md", [
  "# Command Design Release Checklist",
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
]);

validateTextFile(".github/PULL_REQUEST_TEMPLATE/command-design.md", [
  "Command design impact",
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
]);

validateTextFile("docs/command-center-operator-runbook.md", [
  "# Command Center Operator Runbook",
  "Keep every validation guard wired into `validate:routes`.",
  "Vercel is green.",
]);

validateTextFile("docs/maximum-protection-standard.md", [
  "# Cendorq Maximum Protection Standard",
  "Default posture: deny by default.",
  "Safe indexing and public discovery boundary",
  "Detection, response, and recovery",
]);

validateTextFile("docs/owner-maximum-protection-posture.md", [
  "# Owner Maximum Protection Posture",
  "daily operating decisions",
  "Required owner decisions",
  "Hard owner locks",
  "Operating rule",
]);

validateTextFile("docs/repo-update-scanning-automation.md", [
  "# Repo Update Scanning Automation",
  "src/scripts/validate-repo-update-scanning-automation.mjs",
  ".github/dependabot.yml",
  ".github/workflows/codeql.yml",
  "release-captain review",
]);

validateTextFile("docs/controlled-continuous-evolution.md", [
  "# Controlled Continuous Evolution",
  "monitored, validated, reviewable, reversible updates",
  "release-captain approval before merge",
  "Documentation rule",
]);

validateTextFile("docs/controlled-maintenance.md", [
  "# Controlled Maintenance",
  "controlled maintenance",
]);

validateTextFile("docs/admin-command-center-safe-projections.md", [
  "# Admin Command Center Safe Projections",
  "Operating posture",
  "Source of truth",
  "Validation requirements",
]);

validateTextFile("docs/owner-operating-manual.md", [
  "# Cendorq Owner Operating Manual",
  "proof before output",
  "evidence before recommendation",
  "Conversion moat",
  "Unified surface lock",
  "Operating memory lock",
  "dashboard/report vault is the canonical protected display location",
  "Every important customer email should create or update a matching dashboard message record",
  "PDFs must never be the only access path.",
]);

validateTextFile("src/scripts/validate-routes-chain.mjs", [
  "validate-routes-chain-integrity.mjs",
  "validate-current-operating-research-notes.mjs",
  "validate-brand-trademark-operating-standard.mjs",
  "validate-logo-readiness-standard.mjs",
  "validate-legal-trust-crawler-readiness-standard.mjs",
  "validate-best-of-best-operating-standard.mjs",
  "validate-unified-experience-alignment.mjs",
  "validate-surface-level-alignment.mjs",
  "validate-device-experience-performance-standard.mjs",
  "validate-acquisition-to-retention-operating-system.mjs",
  "validate-build-gate-hardening-standard.mjs",
  "validate-support-channel-operating-standard.mjs",
  "validate-command-design-operating-standard.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-owner-operating-manual.mjs",
  "validate-pricing-checkout-orchestration.mjs",
  "validate-billing-checkout-contracts.mjs",
  "validate-dashboard-action-inbox.mjs",
  "validate-plan-delivery-orchestration-contracts.mjs",
]);

validateTextFile("src/scripts/validate-routes-chain-integrity.mjs", [
  "validate-current-operating-research-notes.mjs",
  "validate-brand-trademark-operating-standard.mjs",
  "validate-logo-readiness-standard.mjs",
  "validate-legal-trust-crawler-readiness-standard.mjs",
  "validate-best-of-best-operating-standard.mjs",
  "validate-unified-experience-alignment.mjs",
  "validate-surface-level-alignment.mjs",
  "validate-device-experience-performance-standard.mjs",
  "validate-acquisition-to-retention-operating-system.mjs",
  "validate-build-gate-hardening-standard.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-owner-operating-manual.mjs",
]);

validateTextFile("src/lib/customer-email-confirmation-handoff-contracts.ts", [
  "dashboardMessageMirrorRules",
  "emailDeliverabilityRules",
  "pdfAttachmentRules",
]);

validateTextFile("src/lib/billing-checkout-contracts.ts", [
  "pdfDocumentDeliveryRules",
  "billing-document-to-verified-email",
  "documentDeliveryStatus",
]);

validateTextFile("src/lib/plan-delivery-orchestration-contracts.ts", [
  "reportPresentationStandard",
  "stageTargetingMatrix",
  "continuousNurturingStandard",
]);

validateTextFile("src/lib/pricing-checkout-orchestration.ts", [
  "CENDORQ_POST_PAYMENT_SERVICE_SEQUENCE",
  "CENDORQ_REPORT_TRIGGER_MATRIX",
  "getCendorqReportTrigger",
]);

validateTextFile("package.json", ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);

forbidden("docs/command-center-docs-index.md", unsafePhrases());
forbidden("docs/owner-operating-manual.md", unsafePhrases());
forbidden("docs/best-of-best-operating-standard.md", unsafePhrases());
forbidden("docs/acquisition-to-retention-operating-system.md", unsafePhrases());

if (failures.length) {
  console.error("Command Center docs index validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center docs index validation passed with current research, brand/logo readiness, legal trust crawler readiness, best-of-best, build gates, device performance, support channels, acquisition-to-retention, command design, owner posture, customer delivery source-of-truth contracts, vault-first report access, dashboard message mirroring, safe PDF/document delivery, checkout fulfillment, billing contracts, plan delivery lifecycle, route-chain integrity, owner manual, and report evidence runtime coverage.");

function unsafePhrases() {
  return [
    "guaranteed deliverability is allowed",
    "guaranteed inbox placement is allowed",
    "guaranteed ranking is allowed",
    "guaranteed traffic is allowed",
    "guaranteed indexing is allowed",
    "guaranteed AI answer placement is allowed",
    "guaranteed trademark registration is allowed",
    "guaranteed competitor blocking is allowed",
    "pdf-only access path allowed",
    "PDF-only access path allowed",
    "dashboard message mirror optional",
    "report vault optional",
    "raw/private data projection allowed",
    "separate truth source allowed",
  ];
}

function validateFileExists(path) {
  if (!existsSync(join(root, path))) failures.push(`Missing required docs index dependency: ${path}`);
}

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required docs index dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing required docs index phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden docs index phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
