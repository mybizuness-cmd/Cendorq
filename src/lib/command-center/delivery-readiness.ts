export type CommandCenterDeliveryProvider = "email_service" | "crm" | "automation_platform" | "webhook" | "unknown";

export type CommandCenterDeliveryReadiness = {
  configured: boolean;
  provider: CommandCenterDeliveryProvider;
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
  requiredCapabilities: readonly string[];
  providerAllowed: boolean;
  serverTokenShape: "present" | "missing" | "weak";
  minimumServerTokenLength: 32;
  deliveryAuthorization: "server-side-required";
  customerSendPolicy: "review-approved-output-only";
  sourceOfTruth: "cendorq";
  vendorLockInAllowed: false;
  clientDirectSendAllowed: false;
  unapprovedCustomerDeliveryAllowed: false;
  publicDeliveryRecordAccessAllowed: false;
};

export const COMMAND_CENTER_DELIVERY_ALLOWED_PROVIDERS = ["email_service", "crm", "automation_platform", "webhook"] as const;
export const COMMAND_CENTER_DELIVERY_CONFIG_KEYS = ["REPORT_DELIVERY_PROVIDER", "REPORT_DELIVERY_SERVER_TOKEN"] as const;
const MINIMUM_DELIVERY_SERVER_TOKEN_LENGTH = 32;

const PROTECTED_DELIVERY_TABLES = [
  "integration_connections",
  "outbound_messages",
  "report_deliveries",
  "automation_events",
  "activity_events",
  "audit_logs",
] as const;

const REQUIRED_CAPABILITIES = [
  "provider-neutral delivery channel",
  "server-side delivery authorization",
  "report delivery status tracking",
  "message failure tracking",
  "provider reference storage without secret values",
  "audit trail",
  "approved output requirement",
  "delivery retry idempotency",
  "provider failure containment",
  "Cendorq source-of-truth preservation",
] as const;

export function getCommandCenterDeliveryReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterDeliveryReadiness {
  const missingServerConfig = COMMAND_CENTER_DELIVERY_CONFIG_KEYS.filter((name) => !hasServerConfigValue(env, name));
  const provider = resolveProvider(env.REPORT_DELIVERY_PROVIDER);
  const providerAllowed = provider !== "unknown";
  const serverTokenShape = getServerTokenShape(env.REPORT_DELIVERY_SERVER_TOKEN);

  return {
    configured: missingServerConfig.length === 0 && providerAllowed && serverTokenShape === "present",
    provider,
    requiredServerConfig: COMMAND_CENTER_DELIVERY_CONFIG_KEYS,
    missingServerConfig,
    protectedTables: PROTECTED_DELIVERY_TABLES,
    requiredCapabilities: REQUIRED_CAPABILITIES,
    providerAllowed,
    serverTokenShape,
    minimumServerTokenLength: MINIMUM_DELIVERY_SERVER_TOKEN_LENGTH,
    deliveryAuthorization: "server-side-required",
    customerSendPolicy: "review-approved-output-only",
    sourceOfTruth: "cendorq",
    vendorLockInAllowed: false,
    clientDirectSendAllowed: false,
    unapprovedCustomerDeliveryAllowed: false,
    publicDeliveryRecordAccessAllowed: false,
  };
}

function resolveProvider(value: string | undefined): CommandCenterDeliveryProvider {
  const normalized = value?.trim().toLowerCase();
  if (normalized === "email_service") return "email_service";
  if (normalized === "crm") return "crm";
  if (normalized === "automation_platform") return "automation_platform";
  if (normalized === "webhook") return "webhook";
  return "unknown";
}

function getServerTokenShape(value: string | undefined) {
  if (typeof value !== "string" || value.trim().length === 0) return "missing";
  return value.trim().length >= MINIMUM_DELIVERY_SERVER_TOKEN_LENGTH ? "present" : "weak";
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
