import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const readinessFiles = [
  {
    doc: "docs/command-center-database-readiness.md",
    helper: "src/lib/command-center/database-readiness.ts",
    phrases: ["Command Center Database Readiness", "DATABASE_URL", "private source of truth", "No direct database exposure through client code."],
    helperPhrases: ["getCommandCenterDatabaseReadiness", "DATABASE_URL", "missingServerConfig", "hasServerConfigValue"],
  },
  {
    doc: "docs/command-center-auth-readiness.md",
    helper: "src/lib/command-center/auth-readiness.ts",
    phrases: ["Command Center Auth Readiness", "AUTH_PROVIDER", "AUTH_SECRET", "No client-only protection for sensitive data."],
    helperPhrases: ["getCommandCenterAuthReadiness", "AUTH_PROVIDER", "AUTH_SECRET", "hasServerConfigValue"],
  },
  {
    doc: "docs/command-center-file-storage-readiness.md",
    helper: "src/lib/command-center/file-storage-readiness.ts",
    phrases: ["Command Center File Storage Readiness", "FILE_STORAGE_PROVIDER", "FILE_STORAGE_SERVER_TOKEN", "No public file listing."],
    helperPhrases: ["getCommandCenterFileStorageReadiness", "FILE_STORAGE_PROVIDER", "FILE_STORAGE_SERVER_TOKEN", "hasServerConfigValue"],
  },
  {
    doc: "docs/command-center-billing-readiness.md",
    helper: "src/lib/command-center/billing-readiness.ts",
    phrases: ["Command Center Billing Readiness", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "No unverified billing webhooks."],
    helperPhrases: ["getCommandCenterBillingReadiness", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "hasServerConfigValue"],
  },
  {
    doc: "docs/command-center-delivery-readiness.md",
    helper: "src/lib/command-center/delivery-readiness.ts",
    phrases: ["Command Center Delivery Readiness", "REPORT_DELIVERY_PROVIDER", "REPORT_DELIVERY_SERVER_TOKEN", "No vendor lock-in as the source of truth."],
    helperPhrases: ["getCommandCenterDeliveryReadiness", "REPORT_DELIVERY_PROVIDER", "REPORT_DELIVERY_SERVER_TOKEN", "hasServerConfigValue"],
  },
  {
    doc: "docs/command-center-automation-readiness.md",
    helper: "src/lib/command-center/automation-readiness.ts",
    phrases: ["Command Center Automation Readiness", "AUTOMATION_SIGNING_SECRET", "idempotency keys", "No unverified inbound events."],
    helperPhrases: ["getCommandCenterAutomationReadiness", "AUTOMATION_SIGNING_SECRET", "hasServerConfigValue"],
  },
  {
    doc: "docs/command-center-governance-readiness.md",
    helper: "src/lib/command-center/governance-readiness.ts",
    phrases: ["Command Center Governance Readiness", "GOVERNANCE_CONTACT_EMAIL", "privacy request handling", "No public governance records."],
    helperPhrases: ["getCommandCenterGovernanceReadiness", "GOVERNANCE_CONTACT_EMAIL", "hasServerConfigValue"],
  },
  {
    doc: "docs/command-center-intelligence-readiness.md",
    helper: "src/lib/command-center/intelligence-readiness.ts",
    phrases: ["Command Center Intelligence Readiness", "INTELLIGENCE_REVIEW_OWNER", "evidence-gated classification", "No public raw intelligence."],
    helperPhrases: ["getCommandCenterIntelligenceReadiness", "INTELLIGENCE_REVIEW_OWNER", "evidence-gated classification", "hasServerConfigValue"],
  },
];

for (const item of readinessFiles) {
  validateTextFile(item.doc, item.phrases);
  validateTextFile(item.helper, item.helperPhrases);
  validateHelperSafety(item.helper);
}

validateTextFile("src/lib/command-center/readiness-summary.ts", [
  "getCommandCenterReadinessSummary",
  "CommandCenterReadinessSummary",
  "getCommandCenterDatabaseReadiness",
  "getCommandCenterAuthReadiness",
  "getCommandCenterFileStorageReadiness",
  "getCommandCenterBillingReadiness",
  "getCommandCenterDeliveryReadiness",
  "getCommandCenterAutomationReadiness",
  "getCommandCenterGovernanceReadiness",
  "getCommandCenterIntelligenceReadiness",
  "scopeCount",
  "capabilityCount",
]);
validateHelperSafety("src/lib/command-center/readiness-summary.ts");

validateTextFile("src/lib/command-center/modules.ts", [
  "buildPhase",
  "buildPriority",
  "\"now\" | \"next\" | \"later\"",
  "buildPriority: \"now\"",
  "buildPriority: \"next\"",
  "buildPriority: \"later\"",
  "buildPhase: 2",
  "buildPhase: 11",
]);
validateHelperSafety("src/lib/command-center/modules.ts");

validateTextFile("src/lib/command-center/plan-control.ts", [
  "COMMAND_CENTER_PLAN_CONTROLS",
  "CommandCenterPlanControl",
  "free-scan",
  "deep-review",
  "build-fix",
  "ongoing-control",
  "editableAreas",
  "previewOutputs",
  "testRunTypes",
  "generatedRecordTypes",
  "approvalGates",
  "aiManagerCapabilities",
  "proofStandards",
  "unsupported claims blocked",
  "customer value verified",
]);
validateHelperSafety("src/lib/command-center/plan-control.ts");

validateTextFile("docs/command-center-plan-control-standard.md", [
  "Command Center Plan Control Standard",
  "Every plan should be controllable, testable, previewable, and evidence-backed",
  "AI cannot be treated as the source of truth without evidence, review, and approval.",
  "The Command Center should become the private operating brain for Cendorq.",
  "Every report claim should be tied to evidence.",
  "Fix work should be traceable to tasks, evidence, quality checks, and customer value.",
  "No customer-facing output without approval.",
  "No unsupported report claims.",
  "Cendorq remains the source of truth.",
]);

validateTextFile("src/lib/command-center/benchmark-intelligence.ts", [
  "BENCHMARK_INTELLIGENCE_CONTROLS",
  "BenchmarkIntelligenceControl",
  "targetReferenceCount: 5",
  "requiredEvidenceTypes",
  "comparisonAreas",
  "aiReviewChecks",
  "selfEvolutionSignals",
  "local-service",
  "professional-service",
  "health-wellness",
  "home-service",
  "ecommerce",
]);
validateHelperSafety("src/lib/command-center/benchmark-intelligence.ts");

validateTextFile("docs/benchmark-intelligence-standard.md", [
  "Cendorq Benchmark Intelligence Standard",
  "five approved benchmark businesses per category",
  "Every source should be stored with enough metadata to verify where the observation came from and when it was reviewed.",
  "The AI manager should evaluate its own work before customer-facing output is approved.",
  "Model and agent evolution",
  "No benchmark without source evidence.",
  "No model upgrade without regression checks.",
  "Cendorq remains the source of truth.",
]);

validateTextFile("src/lib/command-center/test-record-classes.ts", [
  "COMMAND_CENTER_RECORD_CLASS_POLICIES",
  "CommandCenterRecordClassPolicy",
  "benchmark-reference",
  "synthetic-test",
  "regression-test",
  "live-customer",
  "archived-benchmark",
  "canTriggerDelivery",
  "countsAsRevenue",
  "countsAsProgress",
]);
validateHelperSafety("src/lib/command-center/test-record-classes.ts");

validateTextFile("docs/benchmark-test-run-separation-standard.md", [
  "Benchmark Test Run Separation Standard",
  "Benchmark records, synthetic records, regression records, and live customer records must be clearly separated.",
  "benchmark reference",
  "synthetic test",
  "regression test",
  "live customer",
  "No benchmark record treated as a customer record.",
  "No synthetic record delivered to a customer.",
  "No live customer record overwritten by a test run.",
]);

validateTextFile("src/lib/command-center/ai-manager-version-registry.ts", [
  "AI_MANAGER_VERSION_REGISTRY",
  "AiManagerVersionRegistryItem",
  "promptPolicyVersion",
  "evaluationPolicyVersion",
  "scoringPolicyVersion",
  "reportPolicyVersion",
  "requiredRegressionSuites",
  "promotionGates",
  "retirementTriggers",
  "getApprovedAiManagerVersion",
]);
validateHelperSafety("src/lib/command-center/ai-manager-version-registry.ts");

validateTextFile("docs/ai-manager-version-registry-standard.md", [
  "AI Manager Version Registry Standard",
  "The AI manager can evolve, but it must evolve safely.",
  "A newer model, prompt, or policy is not automatically better until it passes regression checks.",
  "No model upgrade without regression checks.",
  "No customer-facing output from an unapproved version.",
  "No hidden prompt or policy change.",
  "Cendorq remains the source of truth.",
]);

if (failures.length) {
  console.error("Command Center readiness validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center readiness validation passed. Readiness foundations, module build-order metadata, plan control foundations, benchmark intelligence, test record separation, and AI manager version registry foundations are present, metadata-only, server-oriented, evidence-backed, approval-gated, self-reviewing, versioned, and protected from client/runtime value exposure.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing readiness file: ${path}`);
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
    if (text.includes(forbidden)) failures.push(`${path} contains forbidden readiness behavior: ${forbidden}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
