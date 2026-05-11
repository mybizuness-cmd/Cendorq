export type CustomerAuthProviderKey = "google" | "microsoft" | "apple" | "linkedin" | "facebook";

export type CustomerAuthProvider = {
  key: CustomerAuthProviderKey;
  label: string;
  cta: string;
  envKey: string;
  trustRole: string;
};

export const CUSTOMER_AUTH_PROVIDERS: readonly CustomerAuthProvider[] = [
  {
    key: "google",
    label: "Google",
    cta: "Continue with Google",
    envKey: "CENDORQ_AUTH_GOOGLE_URL",
    trustRole: "Fast account access for customers who use Google Workspace or Gmail.",
  },
  {
    key: "microsoft",
    label: "Microsoft",
    cta: "Continue with Microsoft",
    envKey: "CENDORQ_AUTH_MICROSOFT_URL",
    trustRole: "Fast account access for customers who use Microsoft 365 or Outlook.",
  },
  {
    key: "apple",
    label: "Apple",
    cta: "Continue with Apple",
    envKey: "CENDORQ_AUTH_APPLE_URL",
    trustRole: "Privacy-forward account access for Apple users.",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    cta: "Continue with LinkedIn",
    envKey: "CENDORQ_AUTH_LINKEDIN_URL",
    trustRole: "Convenient professional identity access, not business ownership verification.",
  },
  {
    key: "facebook",
    label: "Facebook / Meta",
    cta: "Continue with Facebook",
    envKey: "CENDORQ_AUTH_FACEBOOK_URL",
    trustRole: "Optional consumer identity access for customers who prefer Meta login.",
  },
] as const;

export const CUSTOMER_AUTH_PROVIDER_KEYS = CUSTOMER_AUTH_PROVIDERS.map((provider) => provider.key);

export function getCustomerAuthProvider(key: string | undefined) {
  return CUSTOMER_AUTH_PROVIDERS.find((provider) => provider.key === key);
}

export function getConfiguredCustomerAuthProviderUrl(provider: CustomerAuthProvider) {
  const value = process.env[provider.envKey];
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export const CUSTOMER_AUTH_SESSION_STANDARD = [
  "Returning customers should continue automatically when a trusted session is present.",
  "Changed device, expired session, cleared browser, or risk signal should return to sign in.",
  "Provider sign-in confirms account identity; Free Scan remains the business-context intake.",
  "Provider routes must fail safely when provider URLs are not configured.",
] as const;
