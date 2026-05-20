import type { CustomerAuthProvider, CustomerAuthProviderKey } from "@/lib/customer-auth-provider-config";

export type CustomerAuthProviderRuntimeBoundary = {
  providerKey: CustomerAuthProviderKey;
  codeExchangeReady: boolean;
  profileFetchReady: boolean;
  verifiedEmailRequired: true;
  eligibilityCheckRequired: true;
  sessionIssueRequired: true;
  safeFallback: "secure-email-access";
};

export const CUSTOMER_AUTH_PROVIDER_RUNTIME_BOUNDARIES: readonly CustomerAuthProviderRuntimeBoundary[] = [
  buildBoundary("google"),
  buildBoundary("microsoft"),
  buildBoundary("apple"),
  buildBoundary("yahoo"),
] as const;

export const CUSTOMER_AUTH_PROVIDER_RUNTIME_BOUNDARY_STANDARD = [
  "Provider runtime must exchange the provider code on the server only.",
  "Provider runtime must fetch or verify a provider email claim on the server only.",
  "Provider runtime must require a verified email before Cendorq eligibility.",
  "Provider runtime must run Cendorq eligibility before issuing a Cendorq session.",
  "Provider runtime must fall back to secure email access until the full chain is live.",
] as const;

export function getCustomerAuthProviderRuntimeBoundary(provider: CustomerAuthProvider) {
  return CUSTOMER_AUTH_PROVIDER_RUNTIME_BOUNDARIES.find((boundary) => boundary.providerKey === provider.key) || buildBoundary(provider.key);
}

function buildBoundary(providerKey: CustomerAuthProviderKey): CustomerAuthProviderRuntimeBoundary {
  return {
    providerKey,
    codeExchangeReady: false,
    profileFetchReady: false,
    verifiedEmailRequired: true,
    eligibilityCheckRequired: true,
    sessionIssueRequired: true,
    safeFallback: "secure-email-access",
  };
}
