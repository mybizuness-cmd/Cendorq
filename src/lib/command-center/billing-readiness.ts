export type CommandCenterBillingReadiness = {
  configured: boolean;
  provider: "stripe" | "unknown";
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
  requiredCapabilities: readonly string[];
};

const REQUIRED_BILLING_CONFIG = ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"] as const;

const PROTECTED_BILLING_TABLES = [
  "subscriptions",
  "payments",
  "businesses",
  "activity_events",
  "audit_logs",
] as const;

const REQUIRED_CAPABILITIES = [
  "server-side checkout creation",
  "webhook signature verification",
  "subscription status sync",
  "payment status sync",
  "failure-state tracking",
  "audit trail",
] as const;

export function getCommandCenterBillingReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterBillingReadiness {
  const missingServerConfig = REQUIRED_BILLING_CONFIG.filter((name) => !hasServerConfigValue(env, name));

  return {
    configured: missingServerConfig.length === 0,
    provider: missingServerConfig.length === 0 ? "stripe" : "unknown",
    requiredServerConfig: REQUIRED_BILLING_CONFIG,
    missingServerConfig,
    protectedTables: PROTECTED_BILLING_TABLES,
    requiredCapabilities: REQUIRED_CAPABILITIES,
  };
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
