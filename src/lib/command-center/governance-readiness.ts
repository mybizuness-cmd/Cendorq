export type CommandCenterGovernanceReadiness = {
  configured: boolean;
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
  requiredCapabilities: readonly string[];
};

const REQUIRED_GOVERNANCE_CONFIG = ["GOVERNANCE_CONTACT_EMAIL"] as const;

const PROTECTED_GOVERNANCE_TABLES = [
  "consent_records",
  "privacy_requests",
  "data_retention_policies",
  "data_retention_actions",
  "backup_exports",
  "incident_records",
  "system_checks",
  "audit_logs",
] as const;

const REQUIRED_CAPABILITIES = [
  "consent tracking",
  "privacy request handling",
  "retention review",
  "backup export tracking",
  "incident recording",
  "system check visibility",
  "audit trail",
] as const;

export function getCommandCenterGovernanceReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterGovernanceReadiness {
  const missingServerConfig = REQUIRED_GOVERNANCE_CONFIG.filter((name) => !hasServerConfigValue(env, name));

  return {
    configured: missingServerConfig.length === 0,
    requiredServerConfig: REQUIRED_GOVERNANCE_CONFIG,
    missingServerConfig,
    protectedTables: PROTECTED_GOVERNANCE_TABLES,
    requiredCapabilities: REQUIRED_CAPABILITIES,
  };
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
