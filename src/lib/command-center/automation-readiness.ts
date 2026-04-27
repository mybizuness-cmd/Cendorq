export type CommandCenterAutomationReadiness = {
  configured: boolean;
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
  requiredCapabilities: readonly string[];
  signingSecretShape: "present" | "missing" | "weak";
  minimumSigningSecretLength: 32;
  executionPolicy: "server-side-only";
  inboundEventPolicy: "signed-events-required";
  idempotencyPolicy: "required";
  retryPolicy: "retry-safe-with-failure-recording";
  operatorVisibility: "required";
  clientExecutionAllowed: false;
  unsignedInboundEventAllowed: false;
  nonIdempotentExecutionAllowed: false;
  publicAutomationRecordAccessAllowed: false;
};

export const COMMAND_CENTER_AUTOMATION_CONFIG_KEYS = ["AUTOMATION_SIGNING_SECRET"] as const;
const MINIMUM_AUTOMATION_SIGNING_SECRET_LENGTH = 32;

const PROTECTED_AUTOMATION_TABLES = [
  "automation_events",
  "integration_connections",
  "webhook_security_keys",
  "service_access_records",
  "system_checks",
  "incident_records",
  "audit_logs",
] as const;

const REQUIRED_CAPABILITIES = [
  "server-side execution only",
  "idempotency keys",
  "signed inbound events",
  "retry-safe processing",
  "failure recording",
  "operator visibility",
  "audit trail",
  "dead-letter review path",
  "replay protection",
  "automation pause switch",
] as const;

export function getCommandCenterAutomationReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterAutomationReadiness {
  const missingServerConfig = COMMAND_CENTER_AUTOMATION_CONFIG_KEYS.filter((name) => !hasServerConfigValue(env, name));
  const signingSecretShape = getSigningSecretShape(env.AUTOMATION_SIGNING_SECRET);

  return {
    configured: missingServerConfig.length === 0 && signingSecretShape === "present",
    requiredServerConfig: COMMAND_CENTER_AUTOMATION_CONFIG_KEYS,
    missingServerConfig,
    protectedTables: PROTECTED_AUTOMATION_TABLES,
    requiredCapabilities: REQUIRED_CAPABILITIES,
    signingSecretShape,
    minimumSigningSecretLength: MINIMUM_AUTOMATION_SIGNING_SECRET_LENGTH,
    executionPolicy: "server-side-only",
    inboundEventPolicy: "signed-events-required",
    idempotencyPolicy: "required",
    retryPolicy: "retry-safe-with-failure-recording",
    operatorVisibility: "required",
    clientExecutionAllowed: false,
    unsignedInboundEventAllowed: false,
    nonIdempotentExecutionAllowed: false,
    publicAutomationRecordAccessAllowed: false,
  };
}

function getSigningSecretShape(value: string | undefined) {
  if (typeof value !== "string" || value.trim().length === 0) return "missing";
  return value.trim().length >= MINIMUM_AUTOMATION_SIGNING_SECRET_LENGTH ? "present" : "weak";
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
