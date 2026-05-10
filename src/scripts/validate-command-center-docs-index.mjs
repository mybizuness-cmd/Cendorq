import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "docs/command-center-docs-index.md",
  "docs/best-of-best-operating-standard.md",
  "docs/acquisition-to-retention-operating-system.md",
  "docs/command-design-operating-standard.md",
  "docs/command-design-release-checklist.md",
  ".github/PULL_REQUEST_TEMPLATE/command-design.md",
  "docs/maximum-protection-standard.md",
  "docs/owner-maximum-protection-posture.md",
  "docs/command-center-operator-runbook.md",
  "docs/admin-command-center-safe-projections.md",
  "docs/owner-operating-manual.md",
  "docs/repo-update-scanning-automation.md",
  "docs/controlled-continuous-evolution.md",
  "package.json",
  "src/scripts/validate-routes-chain.mjs",
  "src/scripts/validate-routes-chain-integrity.mjs",
  "src/scripts/validate-best-of-best-operating-standard.mjs",
  "src/scripts/validate-acquisition-to-retention-operating-system.mjs",
  "src/scripts/validate-command-design-operating-standard.mjs",
  "src/scripts/validate-public-drift.mjs",
  "src/scripts/validate-maximum-protection-standard.mjs",
  "src/scripts/validate-owner-maximum-protection-posture.mjs",
  "src/scripts/validate-codeql-workflow-integrity.mjs",
  "src/scripts/validate-command-center-docs-index.mjs",
  "src/scripts/validate-owner-operating-manual.mjs",
  "src/scripts/validate-command-center-validation-registry.mjs",
  "src/scripts/validate-report-truth-engine.mjs",
  "src/scripts/validate-report-evidence-record-runtime.mjs",
  "src/scripts/validate-command-center-owner-configuration-workflow-smoke.mjs",
  "src/scripts/validate-pricing-checkout-orchestration.mjs",
  "src/scripts/validate-billing-checkout-contracts.mjs",
  "src/scripts/validate-dashboard-action-inbox.mjs",
  "src/scripts/validate-plan-delivery-orchestration-contracts.mjs",
  "src/lib/best-of-best-operating-standard.ts",
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
  "docs/best-of-best-operating-standard.md",
  "docs/acquisition-to-retention-operating-system.md",
  "src/lib/best-of-best-operating-standard.ts",
  "src/scripts/validate-best-of-best-operating-standard.mjs",
  "src/scripts/validate-acquisition-to-retention-operating-system.mjs",
  "best-of-best operating standard",
  "page/subpage architecture",
  "no-clutter design",
  "future-proofing",
  "full journey operating standard",
  "public discovery",
  "SEO/AI-readiness visibility",
  "dashboard retention",
  "reactivation",
  "Apple-level clarity",
  "Stripe-level billing trust",
  "Shopify-level owner empowerment",
  "Salesforce-level system consistency",
  "Microsoft-level calm interaction",
  "Atlassian-level documented foundations",
  "Nielsen Norman usability discipline",
  "Intercom-level support",
  "docs/command-design-operating-standard.md",
  "docs/command-design-release-checklist.md",
  ".github/PULL_REQUEST_TEMPLATE/command-design.md",
  "src/scripts/validate-command-design-operating-standard.mjs",
  "src/scripts/validate-public-drift.mjs",
  "Required command design paths",
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
  "safest-next-command rule",
  "Acquisition-to-retention operating system applies across public discovery, landing, conversion, checkout, dashboard, reports, lifecycle email, support, retention, reactivation, and security/privacy boundaries.",
  "docs/maximum-protection-standard.md",
  "safe indexing",
  "detection, response, recovery",
  "docs/owner-maximum-protection-posture.md",
  "docs/command-center-operator-runbook.md",
  "docs/admin-command-center-safe-projections.md",
  "docs/owner-operating-manual.md",
  "vault-first report access",
  "dashboard message mirroring",
  "safe PDF/document delivery",
  "docs/repo-update-scanning-automation.md",
  "docs/controlled-continuous-evolution.md",
  "src/lib/command-center/validation-registry.ts",
  "Route-chain integrity standard",
  "Maximum protection standard",
  "Owner maximum protection posture",
  "CodeQL workflow integrity standard",
  "Repo update scanning automation standard",
  "Controlled continuous evolution standard",
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
  "src/scripts/validate-best-of-best-operating-standard.mjs",
  "page/subpage architecture",
  "no-clutter design",
  "future-proofing",
  "src/scripts/validate-acquisition-to-retention-operating-system.mjs",
  "full journey validation for discovery before the visit",
  "landing clarity",
  "public page roles",
  "lifecycle email",
  "dashboard retention",
  "reactivation",
  "src/scripts/validate-pricing-checkout-orchestration.mjs",
  "src/scripts/validate-billing-checkout-contracts.mjs",
  "src/scripts/validate-dashboard-action-inbox.mjs",
  "src/scripts/validate-plan-delivery-orchestration-contracts.mjs",
  "src/scripts/validate-owner-operating-manual.mjs",
  "Delivery validation must preserve: acquisition-to-retention operating system",
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
  "no PDF-only access path",
  "no raw/private data projection",
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
  "validate-command-center-docs-index.mjs",
  "validate-command-center-owner-configuration-workflow-smoke.mjs",
  "Vercel is green.",
]);

validateTextFile("docs/maximum-protection-standard.md", [
  "# Cendorq Maximum Protection Standard",
  "Default posture: deny by default.",
  "Public content may teach the category, but it must not expose the private machine.",
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
  "dashboard/report vault is the canonical protected display location",
  "Every important customer email should create or update a matching dashboard message record",
  "PDFs must never be the only access path.",
]);

validateTextFile("src/scripts/validate-routes-chain.mjs", [
  "validate-routes-chain-integrity.mjs",
  "validate-best-of-best-operating-standard.mjs",
  "validate-acquisition-to-retention-operating-system.mjs",
  "validate-command-design-operating-standard.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-owner-operating-manual.mjs",
  "validate-pricing-checkout-orchestration.mjs",
  "validate-billing-checkout-contracts.mjs",
  "validate-dashboard-action-inbox.mjs",
  "validate-plan-delivery-orchestration-contracts.mjs",
]);

validateTextFile("src/scripts/validate-routes-chain-integrity.mjs", [
  "validate-best-of-best-operating-standard.mjs",
  "validate-acquisition-to-retention-operating-system.mjs",
  "validate-command-center-docs-index.mjs",
  "validate-owner-operating-manual.mjs",
]);

validateTextFile("src/scripts/validate-command-design-operating-standard.mjs", [
  "docs/command-design-operating-standard.md",
  "docs/command-design-release-checklist.md",
  ".github/PULL_REQUEST_TEMPLATE/command-design.md",
  "docs/command-center-docs-index.md",
]);

validateTextFile("src/scripts/validate-best-of-best-operating-standard.mjs", [
  "docs/best-of-best-operating-standard.md",
  "src/lib/best-of-best-operating-standard.ts",
  "docs/command-center-docs-index.md",
]);

validateTextFile("src/scripts/validate-acquisition-to-retention-operating-system.mjs", [
  "docs/acquisition-to-retention-operating-system.md",
  "Discovery before the visit",
  "Email and lifecycle nurturing",
]);

validateTextFile("src/scripts/validate-codeql-workflow-integrity.mjs", [
  ".github/workflows/codeql.yml",
  "actions/checkout@v6",
  "github/codeql-action/init@v4",
  "github/codeql-action/analyze@v4",
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

console.log("Command Center docs index validation passed with best-of-best operating standard, acquisition-to-retention operating system, command design, docs index, owner posture, customer delivery source-of-truth contracts, vault-first report access, dashboard message mirroring, safe PDF/document delivery, checkout fulfillment, billing contracts, plan delivery lifecycle, route-chain integrity, owner manual, and report evidence runtime coverage.");

function unsafePhrases() {
  return [
    "guaranteed deliverability is allowed",
    "guaranteed inbox placement is allowed",
    "guaranteed ranking is allowed",
    "guaranteed traffic is allowed",
    "guaranteed indexing is allowed",
    "guaranteed AI answer placement is allowed",
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
