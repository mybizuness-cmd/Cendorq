export type CommandCenterDeliveryReadiness = {
  configured: boolean;
  provider: "email_service" | "crm" | "automation_platform" | "webhook" | "unknown";
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
  requiredCapabilities: readonly string[];
};

const REQUIRED_DELIVERY_CONFIG = ["REPORT_DELIVERY_PROVIDER", "REPORT_DELIVERY_SERVER_TOKEN"] as const;

const PROTECTED_DELIVERY_TABLES = [
  "integration_connections",
  "outbound_messages",
  "report_deliveries",
  "automation_events",
  "activity_events",
  "audit_logs",
] as const;

const REQUIRED_CAPABILITIES = [
  "provider-neutral delivery channel",
  "server-side delivery authorization",
  "report delivery status tracking",
  "message failure tracking",
  "provider reference storage without secret values",
  "audit trail",
] as const;

export function getCommandCenterDeliveryReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterDeliveryReadiness {
  const missingServerConfig = REQUIRED_DELIVERY_CONFIG.filter((name) => !hasServerConfigValue(env, name));
  const provider = resolveProvider(env.REPORT_DELIVERY_PROVIDER);

  return {
    configured: missingServerConfig.length === 0 && provider !== "unknown",
    provider,
    requiredServerConfig: REQUIRED_DELIVERY_CONFIG,
    missingServerConfig,
    protectedTables: PROTECTED_DELIVERY_TABLES,
    requiredCapabilities: REQUIRED_CAPABILITIES,
  };
}

function resolveProvider(value: string | undefined) {
  const normalized = value?.trim().toLowerCase();
  if (normalized === "email_service") return "email_service";
  if (normalized === "crm") return "crm";
  if (normalized === "automation_platform") return "automation_platform";
  if (normalized === "webhook") return "webhook";
  return "unknown";
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
