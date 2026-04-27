export type CommandCenterAutomationReadiness = {
  configured: boolean;
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
  requiredCapabilities: readonly string[];
};

const REQUIRED_AUTOMATION_CONFIG = ["AUTOMATION_SIGNING_SECRET"] as const;

const PROTECTED_AUTOMATION_TABLES = [
  "automation_events",
  "integration_connections",
  "webhook_security_keys",
  "service_access_records",
  "system_checks",
  "incident_records",
  "audit_logs",
] as const;

const REQUIRED_CAPABILITIES = [
  "server-side execution only",
  "idempotency keys",
  "signed inbound events",
  "retry-safe processing",
  "failure recording",
  "operator visibility",
  "audit trail",
] as const;

export function getCommandCenterAutomationReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterAutomationReadiness {
  const missingServerConfig = REQUIRED_AUTOMATION_CONFIG.filter((name) => !hasServerConfigValue(env, name));

  return {
    configured: missingServerConfig.length === 0,
    requiredServerConfig: REQUIRED_AUTOMATION_CONFIG,
    missingServerConfig,
    protectedTables: PROTECTED_AUTOMATION_TABLES,
    requiredCapabilities: REQUIRED_CAPABILITIES,
  };
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
