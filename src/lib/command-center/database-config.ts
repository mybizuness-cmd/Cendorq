export type CommandCenterDatabaseProvider = "postgres" | "unknown";

export type CommandCenterDatabaseConfigState = {
  configured: boolean;
  provider: CommandCenterDatabaseProvider;
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  safeConnectionShape: "present" | "missing" | "invalid";
  serverOnly: true;
  migrationPolicy: "intentional-operator-controlled";
  publicExposureAllowed: false;
};

export const COMMAND_CENTER_DATABASE_CONFIG_KEYS = ["DATABASE_URL"] as const;

export function getCommandCenterDatabaseConfigState(env: NodeJS.ProcessEnv = process.env): CommandCenterDatabaseConfigState {
  const missingServerConfig = COMMAND_CENTER_DATABASE_CONFIG_KEYS.filter((name) => !hasServerConfigValue(env, name));
  const safeConnectionShape = getSafeConnectionShape(env.DATABASE_URL);
  const configured = missingServerConfig.length === 0 && safeConnectionShape === "present";

  return {
    configured,
    provider: configured ? "postgres" : "unknown",
    requiredServerConfig: COMMAND_CENTER_DATABASE_CONFIG_KEYS,
    missingServerConfig,
    safeConnectionShape,
    serverOnly: true,
    migrationPolicy: "intentional-operator-controlled",
    publicExposureAllowed: false,
  };
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}

function getSafeConnectionShape(value: string | undefined) {
  if (typeof value !== "string" || value.trim().length === 0) return "missing";

  try {
    const parsed = new URL(value);
    return parsed.protocol === "postgres:" || parsed.protocol === "postgresql:" ? "present" : "invalid";
  } catch {
    return "invalid";
  }
}
