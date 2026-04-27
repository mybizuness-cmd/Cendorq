import { COMMAND_CENTER_READINESS_CHECKS, type CommandCenterReadinessCheck } from "@/lib/command-center/readiness";

export type CommandCenterConfigStatus = {
  key: CommandCenterReadinessCheck["key"];
  label: string;
  category: CommandCenterReadinessCheck["category"];
  status: "configured" | "missing";
  configuredCount: number;
  requiredCount: number;
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
};

export function getCommandCenterConfigStatus(env: NodeJS.ProcessEnv = process.env): CommandCenterConfigStatus[] {
  return COMMAND_CENTER_READINESS_CHECKS.map((check) => {
    const missingServerConfig = check.requiredServerConfig.filter((name) => !hasServerConfigValue(env, name));
    const configuredCount = check.requiredServerConfig.length - missingServerConfig.length;
    return {
      key: check.key,
      label: check.label,
      category: check.category,
      status: missingServerConfig.length === 0 ? "configured" : "missing",
      configuredCount,
      requiredCount: check.requiredServerConfig.length,
      missingServerConfig,
      protectedTables: check.protectedTables,
    };
  });
}

export function summarizeCommandCenterConfigStatus(statuses: readonly CommandCenterConfigStatus[]) {
  const configured = statuses.filter((status) => status.status === "configured").length;
  const missing = statuses.length - configured;
  return {
    configured,
    missing,
    total: statuses.length,
    ready: missing === 0,
  };
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
