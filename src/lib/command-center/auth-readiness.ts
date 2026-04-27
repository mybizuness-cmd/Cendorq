export type CommandCenterAuthReadiness = {
  configured: boolean;
  provider: "clerk" | "custom" | "unknown";
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
  requiredCapabilities: readonly string[];
};

const REQUIRED_AUTH_CONFIG = ["AUTH_PROVIDER", "AUTH_SECRET"] as const;

const PROTECTED_AUTH_TABLES = [
  "command_center_users",
  "role_permission_grants",
  "user_permission_overrides",
  "command_center_invitations",
  "command_center_sessions",
  "access_events",
  "service_access_records",
  "access_policy_checks",
] as const;

const REQUIRED_CAPABILITIES = [
  "identity verification",
  "server-side session validation",
  "role mapping",
  "permission enforcement",
  "access decision recording",
  "closed-by-default fallback",
] as const;

export function getCommandCenterAuthReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterAuthReadiness {
  const missingServerConfig = REQUIRED_AUTH_CONFIG.filter((name) => !hasServerConfigValue(env, name));
  const provider = resolveProvider(env.AUTH_PROVIDER);

  return {
    configured: missingServerConfig.length === 0 && provider !== "unknown",
    provider,
    requiredServerConfig: REQUIRED_AUTH_CONFIG,
    missingServerConfig,
    protectedTables: PROTECTED_AUTH_TABLES,
    requiredCapabilities: REQUIRED_CAPABILITIES,
  };
}

function resolveProvider(value: string | undefined) {
  const normalized = value?.trim().toLowerCase();
  if (normalized === "clerk") return "clerk";
  if (normalized === "custom") return "custom";
  return "unknown";
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
