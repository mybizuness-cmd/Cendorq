export type CommandCenterIntelligenceReadiness = {
  configured: boolean;
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
  requiredCapabilities: readonly string[];
  reviewOwnerShape: "present" | "missing";
  classificationPolicy: "evidence-gated";
  memoryPromotionPolicy: "human-reviewed-reversible";
  rawIntelligenceAccess: "private-only";
  customerSummaryPolicy: "client-safe-separated-from-raw";
  promptInjectionPolicy: "external-content-untrusted";
  publicRawIntelligenceAllowed: false;
  aiAutopromotionAllowed: false;
  unsupportedSignalAuthorityAllowed: false;
  customerUnsafeSummaryAllowed: false;
};

export const COMMAND_CENTER_INTELLIGENCE_CONFIG_KEYS = ["INTELLIGENCE_REVIEW_OWNER"] as const;

const PROTECTED_INTELLIGENCE_TABLES = [
  "signal_taxonomies",
  "signal_tags",
  "intelligence_classifications",
  "evidence_records",
  "intelligence_memory_items",
  "intelligence_memory_links",
  "outcome_measurements",
  "audit_logs",
] as const;

const REQUIRED_CAPABILITIES = [
  "evidence-gated classification",
  "human review before promotion",
  "outcome measurement links",
  "private memory status tracking",
  "client-safe summary separation",
  "audit trail",
  "prompt-injection resistant source handling",
  "raw intelligence private by default",
  "reversible memory promotion",
  "unsupported signal authority blocker",
  "stale intelligence review path",
  "source reliability review",
] as const;

export function getCommandCenterIntelligenceReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterIntelligenceReadiness {
  const missingServerConfig = COMMAND_CENTER_INTELLIGENCE_CONFIG_KEYS.filter((name) => !hasServerConfigValue(env, name));
  const reviewOwnerShape = hasServerConfigValue(env, "INTELLIGENCE_REVIEW_OWNER") ? "present" : "missing";

  return {
    configured: missingServerConfig.length === 0 && reviewOwnerShape === "present",
    requiredServerConfig: COMMAND_CENTER_INTELLIGENCE_CONFIG_KEYS,
    missingServerConfig,
    protectedTables: PROTECTED_INTELLIGENCE_TABLES,
    requiredCapabilities: REQUIRED_CAPABILITIES,
    reviewOwnerShape,
    classificationPolicy: "evidence-gated",
    memoryPromotionPolicy: "human-reviewed-reversible",
    rawIntelligenceAccess: "private-only",
    customerSummaryPolicy: "client-safe-separated-from-raw",
    promptInjectionPolicy: "external-content-untrusted",
    publicRawIntelligenceAllowed: false,
    aiAutopromotionAllowed: false,
    unsupportedSignalAuthorityAllowed: false,
    customerUnsafeSummaryAllowed: false,
  };
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
