export type CommandCenterGovernanceReadiness = {
  configured: boolean;
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
  requiredCapabilities: readonly string[];
  contactShape: "present" | "missing" | "invalid";
  privacyRequestPolicy: "private-tracked-response-required";
  retentionPolicy: "reviewed-before-delete-or-export";
  backupPolicy: "tracked-private-exports-only";
  incidentPolicy: "recorded-with-containment-owner";
  publicGovernanceRecordAccessAllowed: false;
  untrackedPrivacyRequestAllowed: false;
  untrackedBackupExportAllowed: false;
  destructiveRetentionWithoutReviewAllowed: false;
};

export const COMMAND_CENTER_GOVERNANCE_CONFIG_KEYS = ["GOVERNANCE_CONTACT_EMAIL"] as const;

const PROTECTED_GOVERNANCE_TABLES = [
  "consent_records",
  "privacy_requests",
  "data_retention_policies",
  "data_retention_actions",
  "backup_exports",
  "incident_records",
  "system_checks",
  "audit_logs",
] as const;

const REQUIRED_CAPABILITIES = [
  "consent tracking",
  "privacy request handling",
  "retention review",
  "backup export tracking",
  "incident recording",
  "system check visibility",
  "audit trail",
  "private governance record access",
  "containment owner assignment",
  "destructive retention review gate",
  "backup export review gate",
  "privacy response due-date tracking",
] as const;

export function getCommandCenterGovernanceReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterGovernanceReadiness {
  const missingServerConfig = COMMAND_CENTER_GOVERNANCE_CONFIG_KEYS.filter((name) => !hasServerConfigValue(env, name));
  const contactShape = getGovernanceContactShape(env.GOVERNANCE_CONTACT_EMAIL);

  return {
    configured: missingServerConfig.length === 0 && contactShape === "present",
    requiredServerConfig: COMMAND_CENTER_GOVERNANCE_CONFIG_KEYS,
    missingServerConfig,
    protectedTables: PROTECTED_GOVERNANCE_TABLES,
    requiredCapabilities: REQUIRED_CAPABILITIES,
    contactShape,
    privacyRequestPolicy: "private-tracked-response-required",
    retentionPolicy: "reviewed-before-delete-or-export",
    backupPolicy: "tracked-private-exports-only",
    incidentPolicy: "recorded-with-containment-owner",
    publicGovernanceRecordAccessAllowed: false,
    untrackedPrivacyRequestAllowed: false,
    untrackedBackupExportAllowed: false,
    destructiveRetentionWithoutReviewAllowed: false,
  };
}

function getGovernanceContactShape(value: string | undefined) {
  if (typeof value !== "string" || value.trim().length === 0) return "missing";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "present" : "invalid";
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
