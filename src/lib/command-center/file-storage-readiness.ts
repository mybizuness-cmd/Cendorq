export type CommandCenterFileStorageReadiness = {
  configured: boolean;
  provider: "vercel_blob" | "cloudflare_r2" | "s3" | "unknown";
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
  requiredCapabilities: readonly string[];
};

const REQUIRED_FILE_STORAGE_CONFIG = ["FILE_STORAGE_PROVIDER", "FILE_STORAGE_SERVER_TOKEN"] as const;

const PROTECTED_FILE_TABLES = [
  "command_center_files",
  "evidence_records",
  "backup_exports",
  "audit_logs",
] as const;

const REQUIRED_CAPABILITIES = [
  "server-side upload authorization",
  "private object storage",
  "file owner tracking",
  "signed download flow",
  "audit trail",
  "no public file listing",
] as const;

export function getCommandCenterFileStorageReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterFileStorageReadiness {
  const missingServerConfig = REQUIRED_FILE_STORAGE_CONFIG.filter((name) => !hasServerConfigValue(env, name));
  const provider = resolveProvider(env.FILE_STORAGE_PROVIDER);

  return {
    configured: missingServerConfig.length === 0 && provider !== "unknown",
    provider,
    requiredServerConfig: REQUIRED_FILE_STORAGE_CONFIG,
    missingServerConfig,
    protectedTables: PROTECTED_FILE_TABLES,
    requiredCapabilities: REQUIRED_CAPABILITIES,
  };
}

function resolveProvider(value: string | undefined) {
  const normalized = value?.trim().toLowerCase();
  if (normalized === "vercel_blob") return "vercel_blob";
  if (normalized === "cloudflare_r2") return "cloudflare_r2";
  if (normalized === "s3") return "s3";
  return "unknown";
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
