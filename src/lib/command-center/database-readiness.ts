export type CommandCenterDatabaseReadiness = {
  configured: boolean;
  provider: "postgres" | "unknown";
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  migrationCount: number;
  protectedSchemaAreas: readonly string[];
};

const REQUIRED_DATABASE_CONFIG = ["DATABASE_URL"] as const;

const PROTECTED_SCHEMA_AREAS = [
  "core operations",
  "delivery automation",
  "private signal intelligence",
  "data governance",
  "access control",
] as const;

export function getCommandCenterDatabaseReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterDatabaseReadiness {
  const missingServerConfig = REQUIRED_DATABASE_CONFIG.filter((name) => !hasServerConfigValue(env, name));

  return {
    configured: missingServerConfig.length === 0,
    provider: missingServerConfig.length === 0 ? "postgres" : "unknown",
    requiredServerConfig: REQUIRED_DATABASE_CONFIG,
    missingServerConfig,
    migrationCount: 5,
    protectedSchemaAreas: PROTECTED_SCHEMA_AREAS,
  };
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
