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
  "protectedTableCount",
  "capabilityCount",
]);
validateHelperSafety("src/lib/command-center/readiness-summary.ts");

if (failures.length) {
  console.error("Command Center readiness validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command Center readiness validation passed. Database, auth, file storage, billing, delivery, automation, governance, intelligence, and consolidated readiness summary foundations are present, metadata-only, server-oriented, and protected from client/runtime value exposure.");

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
