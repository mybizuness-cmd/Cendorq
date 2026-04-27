export type CommandCenterIntelligenceReadiness = {
  configured: boolean;
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
  requiredCapabilities: readonly string[];
};

const REQUIRED_INTELLIGENCE_CONFIG = ["INTELLIGENCE_REVIEW_OWNER"] as const;

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
] as const;

export function getCommandCenterIntelligenceReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterIntelligenceReadiness {
  const missingServerConfig = REQUIRED_INTELLIGENCE_CONFIG.filter((name) => !hasServerConfigValue(env, name));

  return {
    configured: missingServerConfig.length === 0,
    requiredServerConfig: REQUIRED_INTELLIGENCE_CONFIG,
    missingServerConfig,
    protectedTables: PROTECTED_INTELLIGENCE_TABLES,
    requiredCapabilities: REQUIRED_CAPABILITIES,
  };
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
