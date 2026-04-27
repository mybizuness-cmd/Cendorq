export type CommandCenterFileStorageProvider = "vercel_blob" | "cloudflare_r2" | "s3" | "unknown";

export type CommandCenterFileStorageReadiness = {
  configured: boolean;
  provider: CommandCenterFileStorageProvider;
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
  requiredCapabilities: readonly string[];
  providerAllowed: boolean;
  serverTokenShape: "present" | "missing" | "weak";
  minimumServerTokenLength: 32;
  objectVisibility: "private";
  uploadAuthorization: "server-side-required";
  downloadPolicy: "signed-or-authenticated";
  publicListingAllowed: false;
  clientDirectUploadAllowed: false;
  clientDirectDownloadAllowed: false;
};

export const COMMAND_CENTER_FILE_STORAGE_ALLOWED_PROVIDERS = ["vercel_blob", "cloudflare_r2", "s3"] as const;
export const COMMAND_CENTER_FILE_STORAGE_CONFIG_KEYS = ["FILE_STORAGE_PROVIDER", "FILE_STORAGE_SERVER_TOKEN"] as const;
const MINIMUM_FILE_STORAGE_SERVER_TOKEN_LENGTH = 32;

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
  "malware scan handoff path",
  "retention policy alignment",
  "download access recording",
  "revocation path",
] as const;

export function getCommandCenterFileStorageReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterFileStorageReadiness {
  const missingServerConfig = COMMAND_CENTER_FILE_STORAGE_CONFIG_KEYS.filter((name) => !hasServerConfigValue(env, name));
  const provider = resolveProvider(env.FILE_STORAGE_PROVIDER);
  const providerAllowed = provider !== "unknown";
  const serverTokenShape = getServerTokenShape(env.FILE_STORAGE_SERVER_TOKEN);

  return {
    configured: missingServerConfig.length === 0 && providerAllowed && serverTokenShape === "present",
    provider,
    requiredServerConfig: COMMAND_CENTER_FILE_STORAGE_CONFIG_KEYS,
    missingServerConfig,
    protectedTables: PROTECTED_FILE_TABLES,
    requiredCapabilities: REQUIRED_CAPABILITIES,
    providerAllowed,
    serverTokenShape,
    minimumServerTokenLength: MINIMUM_FILE_STORAGE_SERVER_TOKEN_LENGTH,
    objectVisibility: "private",
    uploadAuthorization: "server-side-required",
    downloadPolicy: "signed-or-authenticated",
    publicListingAllowed: false,
    clientDirectUploadAllowed: false,
    clientDirectDownloadAllowed: false,
  };
}

function resolveProvider(value: string | undefined): CommandCenterFileStorageProvider {
  const normalized = value?.trim().toLowerCase();
  if (normalized === "vercel_blob") return "vercel_blob";
  if (normalized === "cloudflare_r2") return "cloudflare_r2";
  if (normalized === "s3") return "s3";
  return "unknown";
}

function getServerTokenShape(value: string | undefined) {
  if (typeof value !== "string" || value.trim().length === 0) return "missing";
  return value.trim().length >= MINIMUM_FILE_STORAGE_SERVER_TOKEN_LENGTH ? "present" : "weak";
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
