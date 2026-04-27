export type CommandCenterBillingProvider = "stripe" | "unknown";

export type CommandCenterBillingReadiness = {
  configured: boolean;
  provider: CommandCenterBillingProvider;
  requiredServerConfig: readonly string[];
  missingServerConfig: readonly string[];
  protectedTables: readonly string[];
  requiredCapabilities: readonly string[];
  providerAllowed: boolean;
  secretKeyShape: "present" | "missing" | "weak";
  webhookSecretShape: "present" | "missing" | "weak";
  minimumSecretLength: 32;
  checkoutCreation: "server-side-only";
  webhookVerification: "signature-required";
  billingStateAuthority: "verified-webhook-or-server-reconciliation";
  clientBillingMutationAllowed: false;
  unverifiedWebhookAllowed: false;
  publicBillingRecordAccessAllowed: false;
};

export const COMMAND_CENTER_BILLING_ALLOWED_PROVIDERS = ["stripe"] as const;
export const COMMAND_CENTER_BILLING_CONFIG_KEYS = ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"] as const;
const MINIMUM_BILLING_SECRET_LENGTH = 32;

const PROTECTED_BILLING_TABLES = [
  "subscriptions",
  "payments",
  "businesses",
  "activity_events",
  "audit_logs",
] as const;

const REQUIRED_CAPABILITIES = [
  "server-side checkout creation",
  "webhook signature verification",
  "subscription status sync",
  "payment status sync",
  "failure-state tracking",
  "audit trail",
  "idempotent webhook handling",
  "billing event replay protection",
  "refund and dispute audit trail",
  "server-side reconciliation path",
] as const;

export function getCommandCenterBillingReadiness(env: NodeJS.ProcessEnv = process.env): CommandCenterBillingReadiness {
  const missingServerConfig = COMMAND_CENTER_BILLING_CONFIG_KEYS.filter((name) => !hasServerConfigValue(env, name));
  const secretKeyShape = getSecretShape(env.STRIPE_SECRET_KEY);
  const webhookSecretShape = getSecretShape(env.STRIPE_WEBHOOK_SECRET);
  const providerAllowed = secretKeyShape === "present" || webhookSecretShape === "present" || missingServerConfig.length === 0;

  return {
    configured: missingServerConfig.length === 0 && providerAllowed && secretKeyShape === "present" && webhookSecretShape === "present",
    provider: providerAllowed ? "stripe" : "unknown",
    requiredServerConfig: COMMAND_CENTER_BILLING_CONFIG_KEYS,
    missingServerConfig,
    protectedTables: PROTECTED_BILLING_TABLES,
    requiredCapabilities: REQUIRED_CAPABILITIES,
    providerAllowed,
    secretKeyShape,
    webhookSecretShape,
    minimumSecretLength: MINIMUM_BILLING_SECRET_LENGTH,
    checkoutCreation: "server-side-only",
    webhookVerification: "signature-required",
    billingStateAuthority: "verified-webhook-or-server-reconciliation",
    clientBillingMutationAllowed: false,
    unverifiedWebhookAllowed: false,
    publicBillingRecordAccessAllowed: false,
  };
}

function getSecretShape(value: string | undefined) {
  if (typeof value !== "string" || value.trim().length === 0) return "missing";
  return value.trim().length >= MINIMUM_BILLING_SECRET_LENGTH ? "present" : "weak";
}

function hasServerConfigValue(env: NodeJS.ProcessEnv, name: string) {
  const value = env[name];
  return typeof value === "string" && value.trim().length > 0;
}
