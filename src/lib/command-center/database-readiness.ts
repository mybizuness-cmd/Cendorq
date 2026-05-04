import { getCommandCenterDatabaseConfigState } from "./database-config";

export type CommandCenterDatabaseReadiness = {
  configured: boolean;
  provider: "postgres" | "unknown";
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  migrationCount: number;
  protectedSchemaAreas: readonly string[];
  safeConnectionShape: "present" | "missing" | "invalid";
  serverOnly: true;
  migrationPolicy: "intentional-operator-controlled";
  publicExposureAllowed: false;
};

const DATABASE_URL = "DATABASE_URL";

const PROTECTED_SCHEMA_AREAS = [
  "core operations",
  "delivery automation",
  "private signal intelligence",
  "data governance",
  "access control",
] as const;

export function getCommandCenterDatabaseReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterDatabaseReadiness {
  const configState = getCommandCenterDatabaseConfigState(env);
  const missingServerConfig = configState.requiredServerConfig.filter((name) => !hasServerConfigValue(env, name));

  return {
    configured: configState.configured && missingServerConfig.length === 0,
    provider: configState.provider,
    requiredServerConfig: configState.requiredServerConfig.includes(DATABASE_URL)
      ? configState.requiredServerConfig
      : [DATABASE_URL, ...configState.requiredServerConfig],
    missingServerConfig,
    migrationCount: 5,
    protectedSchemaAreas: PROTECTED_SCHEMA_AREAS,
    safeConnectionShape: configState.safeConnectionShape,
    serverOnly: configState.serverOnly,
    migrationPolicy: configState.migrationPolicy,
    publicExposureAllowed: configState.publicExposureAllowed,
  };
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
