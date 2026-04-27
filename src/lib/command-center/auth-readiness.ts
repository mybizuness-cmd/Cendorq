export type CommandCenterAuthProvider = "clerk" | "custom" | "unknown";

export type CommandCenterAuthReadiness = {
  configured: boolean;
  provider: CommandCenterAuthProvider;
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
  requiredCapabilities: readonly string[];
  providerAllowed: boolean;
  authSecretShape: "present" | "missing" | "weak";
  minimumAuthSecretLength: 32;
  defaultAccess: "deny";
  sessionValidation: "server-side-required";
  rolePolicy: "least-privilege";
  auditPolicy: "record-access-decisions";
  clientOnlyProtectionAllowed: false;
  publicBypassAllowed: false;
};

export const COMMAND_CENTER_AUTH_ALLOWED_PROVIDERS = ["clerk", "custom"] as const;
export const COMMAND_CENTER_AUTH_CONFIG_KEYS = ["AUTH_PROVIDER", "AUTH_SECRET"] as const;
const MINIMUM_AUTH_SECRET_LENGTH = 32;

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
  "least-privilege access",
  "session revocation path",
  "invitation approval path",
  "service access rotation path",
] as const;

export function getCommandCenterAuthReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterAuthReadiness {
  const missingServerConfig = COMMAND_CENTER_AUTH_CONFIG_KEYS.filter((name) => !hasServerConfigValue(env, name));
  const provider = resolveProvider(env.AUTH_PROVIDER);
  const providerAllowed = provider !== "unknown";
  const authSecretShape = getAuthSecretShape(env.AUTH_SECRET);

  return {
    configured: missingServerConfig.length === 0 && providerAllowed && authSecretShape === "present",
    provider,
    requiredServerConfig: COMMAND_CENTER_AUTH_CONFIG_KEYS,
    missingServerConfig,
    protectedTables: PROTECTED_AUTH_TABLES,
    requiredCapabilities: REQUIRED_CAPABILITIES,
    providerAllowed,
    authSecretShape,
    minimumAuthSecretLength: MINIMUM_AUTH_SECRET_LENGTH,
    defaultAccess: "deny",
    sessionValidation: "server-side-required",
    rolePolicy: "least-privilege",
    auditPolicy: "record-access-decisions",
    clientOnlyProtectionAllowed: false,
    publicBypassAllowed: false,
  };
}

function resolveProvider(value: string | undefined): CommandCenterAuthProvider {
  const normalized = value?.trim().toLowerCase();
  if (normalized === "clerk") return "clerk";
  if (normalized === "custom") return "custom";
  return "unknown";
}

function getAuthSecretShape(value: string | undefined) {
  if (typeof value !== "string" || value.trim().length === 0) return "missing";
  return value.trim().length >= MINIMUM_AUTH_SECRET_LENGTH ? "present" : "weak";
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
