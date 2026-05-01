export type CustomerEmailProviderKey = "resend" | "sendgrid" | "postmark" | "ses";

export type CustomerEmailProviderConfigurationStatus = "not-configured" | "configured-pending-approval" | "approved-for-dry-run" | "approved-for-live-send";

export type CustomerEmailProviderConfigurationContract = {
  providerKey: CustomerEmailProviderKey;
  status: CustomerEmailProviderConfigurationStatus;
  ownerApprovalRequired: true;
  liveSendRequiresOwnerApproval: true;
  dryRunAllowedWithoutProviderSecret: true;
  senderName: "Cendorq Support";
  fromAddress: "support@cendorq.com";
  requiredServerEnvNames: readonly string[];
  browserExposedEnvNames: readonly [];
  authenticationExpectations: {
    spfAligned: boolean;
    dkimAligned: boolean;
    dmarcPolicyPresent: boolean;
    tlsRequired: boolean;
    bounceHandlingRequired: boolean;
    complaintHandlingRequired: boolean;
  };
  storageBoundaries: {
    storeProviderPayload: false;
    storeProviderResponse: false;
    storeProviderSecret: false;
    storeRawCustomerEmail: false;
    storeRawToken: false;
    storeTokenHash: false;
    storeConfirmationUrl: false;
    storeRawEvidence: false;
    storeRawBillingData: false;
    storeInternalNotes: false;
    storeProviderEventRefHashOnly: true;
  };
  runtimeBoundaries: {
    providerSecretReadAllowedInBrowser: false;
    providerPayloadAllowedInBrowser: false;
    providerResponseAllowedInBrowser: false;
    directProviderCallAllowedFromRoutes: false;
    unboundedAutoSendAllowed: false;
    liveProviderSendRequiresApprovedAdapter: true;
    liveProviderSendRequiresAuditTransition: true;
  };
};

export const CUSTOMER_EMAIL_PROVIDER_CONFIGURATION_CONTRACTS: readonly CustomerEmailProviderConfigurationContract[] = [
  buildProviderContract("resend", ["CUSTOMER_EMAIL_RESEND_API_KEY", "CUSTOMER_EMAIL_RESEND_AUDIENCE_ID"]),
  buildProviderContract("sendgrid", ["CUSTOMER_EMAIL_SENDGRID_API_KEY", "CUSTOMER_EMAIL_SENDGRID_TEMPLATE_ID"]),
  buildProviderContract("postmark", ["CUSTOMER_EMAIL_POSTMARK_SERVER_TOKEN", "CUSTOMER_EMAIL_POSTMARK_TEMPLATE_ALIAS"]),
  buildProviderContract("ses", ["CUSTOMER_EMAIL_SES_ACCESS_KEY_ID", "CUSTOMER_EMAIL_SES_SECRET_ACCESS_KEY", "CUSTOMER_EMAIL_SES_REGION"]),
] as const;

export const CUSTOMER_EMAIL_PROVIDER_CONFIGURATION_RULES = [
  "provider configuration must remain server-only and must not expose provider secrets to browser code",
  "live email sending requires provider configuration, SPF alignment, DKIM alignment, DMARC policy, TLS, bounce handling, complaint handling, and explicit owner approval",
  "dry-run email dispatch may run without provider secrets but must never call a provider",
  "provider payloads and provider responses must not be stored or returned to browser-safe projections",
  "provider event references must be stored only as hashes when live sending is later enabled",
  "raw customer emails, raw tokens, token hashes, confirmation URLs, raw evidence, raw billing data, internal notes, provider secrets, provider payloads, and provider responses must not be stored in provider configuration records",
  "unbounded auto-send is blocked; live provider send requires an approved adapter and an audit transition",
  "Cendorq Support <support@cendorq.com> is the only approved sender identity for customer confirmation email dispatch",
] as const;

export function getCustomerEmailProviderConfigurationContracts() {
  return CUSTOMER_EMAIL_PROVIDER_CONFIGURATION_CONTRACTS;
}

export function getCustomerEmailProviderConfigurationRules() {
  return CUSTOMER_EMAIL_PROVIDER_CONFIGURATION_RULES;
}

export function projectCustomerEmailProviderConfigurationSummary() {
  return {
    providerConfigured: false,
    ownerApprovedForLiveSend: false,
    dryRunAllowedWithoutProviderSecret: true,
    liveSendAllowed: false,
    senderName: "Cendorq Support" as const,
    fromAddress: "support@cendorq.com" as const,
    approvedProviders: CUSTOMER_EMAIL_PROVIDER_CONFIGURATION_CONTRACTS.map((contract) => contract.providerKey),
    requiredOperationalControls: [
      "SPF alignment",
      "DKIM alignment",
      "DMARC policy",
      "TLS transport",
      "bounce handling",
      "complaint handling",
      "owner approval",
      "approved provider adapter",
      "audit transition",
    ] as const,
    rawCustomerEmailExposed: false,
    rawTokenExposed: false,
    tokenHashExposed: false,
    confirmationUrlExposed: false,
    providerPayloadExposed: false,
    providerResponseExposed: false,
    providerSecretExposed: false,
    browserSecretExposure: false,
    unboundedAutoSendAllowed: false,
  };
}

function buildProviderContract(providerKey: CustomerEmailProviderKey, requiredServerEnvNames: readonly string[]): CustomerEmailProviderConfigurationContract {
  return {
    providerKey,
    status: "not-configured",
    ownerApprovalRequired: true,
    liveSendRequiresOwnerApproval: true,
    dryRunAllowedWithoutProviderSecret: true,
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    requiredServerEnvNames,
    browserExposedEnvNames: [],
    authenticationExpectations: {
      spfAligned: false,
      dkimAligned: false,
      dmarcPolicyPresent: false,
      tlsRequired: true,
      bounceHandlingRequired: true,
      complaintHandlingRequired: true,
    },
    storageBoundaries: {
      storeProviderPayload: false,
      storeProviderResponse: false,
      storeProviderSecret: false,
      storeRawCustomerEmail: false,
      storeRawToken: false,
      storeTokenHash: false,
      storeConfirmationUrl: false,
      storeRawEvidence: false,
      storeRawBillingData: false,
      storeInternalNotes: false,
      storeProviderEventRefHashOnly: true,
    },
    runtimeBoundaries: {
      providerSecretReadAllowedInBrowser: false,
      providerPayloadAllowedInBrowser: false,
      providerResponseAllowedInBrowser: false,
      directProviderCallAllowedFromRoutes: false,
      unboundedAutoSendAllowed: false,
      liveProviderSendRequiresApprovedAdapter: true,
      liveProviderSendRequiresAuditTransition: true,
    },
  };
}
