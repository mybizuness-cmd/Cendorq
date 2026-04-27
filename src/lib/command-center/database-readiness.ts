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

const PROTECTED_SCHEMA_AREAS = [
  "core operations",
  "delivery automation",
  "private signal intelligence",
  "data governance",
  "access control",
] as const;

export function getCommandCenterDatabaseReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterDatabaseReadiness {
  const configState = getCommandCenterDatabaseConfigState(env);

  return {
    configured: configState.configured,
    provider: configState.provider,
    requiredServerConfig: configState.requiredServerConfig,
    missingServerConfig: configState.missingServerConfig,
    migrationCount: 5,
    protectedSchemaAreas: PROTECTED_SCHEMA_AREAS,
    safeConnectionShape: configState.safeConnectionShape,
    serverOnly: configState.serverOnly,
    migrationPolicy: configState.migrationPolicy,
    publicExposureAllowed: configState.publicExposureAllowed,
  };
}
