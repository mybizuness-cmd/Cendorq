export type CustomerAuthProviderKey = "google" | "microsoft" | "apple" | "linkedin" | "facebook";

const FULL_PROVIDER_SESSION_READY_ENV_KEY = "CENDORQ_AUTH_PROVIDER_SESSION_READY";
export const CUSTOMER_AUTH_PROVIDER_CALLBACK_SESSION_RUNTIME_READY = false;

export type CustomerAuthProvider = {
  key: CustomerAuthProviderKey;
  label: string;
  cta: string;
  envKey: string;
  readyEnvKey: string;
  clientIdEnvKey: string;
  redirectUriEnvKey: string;
  authorizationEndpoint: string;
  defaultScopes: readonly string[];
  trustRole: string;
};

export const CUSTOMER_AUTH_PROVIDERS: readonly CustomerAuthProvider[] = [
  {
    key: "google",
    label: "Google",
    cta: "Continue with Google",
    envKey: "CENDORQ_AUTH_GOOGLE_URL",
    readyEnvKey: "CENDORQ_AUTH_GOOGLE_READY",
    clientIdEnvKey: "GOOGLE_CLIENT_ID",
    redirectUriEnvKey: "GOOGLE_REDIRECT_URI",
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    defaultScopes: ["openid", "email", "profile"],
    trustRole: "Fast account access for customers who use Google Workspace or Gmail.",
  },
  {
    key: "microsoft",
    label: "Microsoft",
    cta: "Continue with Microsoft",
    envKey: "CENDORQ_AUTH_MICROSOFT_URL",
    readyEnvKey: "CENDORQ_AUTH_MICROSOFT_READY",
    clientIdEnvKey: "MICROSOFT_CLIENT_ID",
    redirectUriEnvKey: "MICROSOFT_REDIRECT_URI",
    authorizationEndpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    defaultScopes: ["openid", "email", "profile"],
    trustRole: "Fast account access for customers who use Microsoft 365 or Outlook.",
  },
  {
    key: "apple",
    label: "Apple",
    cta: "Continue with Apple",
    envKey: "CENDORQ_AUTH_APPLE_URL",
    readyEnvKey: "CENDORQ_AUTH_APPLE_READY",
    clientIdEnvKey: "APPLE_CLIENT_ID",
    redirectUriEnvKey: "APPLE_REDIRECT_URI",
    authorizationEndpoint: "https://appleid.apple.com/auth/authorize",
    defaultScopes: ["name", "email"],
    trustRole: "Privacy-forward account access for Apple users.",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    cta: "Continue with LinkedIn",
    envKey: "CENDORQ_AUTH_LINKEDIN_URL",
    readyEnvKey: "CENDORQ_AUTH_LINKEDIN_READY",
    clientIdEnvKey: "LINKEDIN_CLIENT_ID",
    redirectUriEnvKey: "LINKEDIN_REDIRECT_URI",
    authorizationEndpoint: "https://www.linkedin.com/oauth/v2/authorization",
    defaultScopes: ["openid", "profile", "email"],
    trustRole: "Convenient professional identity access, not business ownership verification.",
  },
  {
    key: "facebook",
    label: "Facebook / Meta",
    cta: "Continue with Facebook",
    envKey: "CENDORQ_AUTH_FACEBOOK_URL",
    readyEnvKey: "CENDORQ_AUTH_FACEBOOK_READY",
    clientIdEnvKey: "FACEBOOK_CLIENT_ID",
    redirectUriEnvKey: "FACEBOOK_REDIRECT_URI",
    authorizationEndpoint: "https://www.facebook.com/v19.0/dialog/oauth",
    defaultScopes: ["email", "public_profile"],
    trustRole: "Optional consumer identity access for customers who prefer Meta login.",
  },
] as const;

export const CUSTOMER_AUTH_PROVIDER_KEYS = CUSTOMER_AUTH_PROVIDERS.map((provider) => provider.key);

export function getCustomerAuthProvider(key: string | undefined) {
  return CUSTOMER_AUTH_PROVIDERS.find((provider) => provider.key === key);
}

export function isCustomerAuthProviderConfigured(provider: CustomerAuthProvider, options?: { baseUrl?: string }) {
  return isCustomerAuthProviderReady(provider) && Boolean(resolveCustomerAuthProviderUrl(provider, options));
}

export function getConfiguredCustomerAuthProviderUrl(provider: CustomerAuthProvider, options?: { state?: string; returnTo?: string; baseUrl?: string }) {
  if (!isCustomerAuthProviderReady(provider)) return null;
  return resolveCustomerAuthProviderUrl(provider, options);
}

export function isCustomerAuthProviderReady(provider: CustomerAuthProvider) {
  return isCustomerAuthProviderCallbackSessionRuntimeReady() && readEnabledFlag(process.env[provider.readyEnvKey]) && readEnabledFlag(process.env[FULL_PROVIDER_SESSION_READY_ENV_KEY]);
}

export function isCustomerAuthProviderCallbackSessionRuntimeReady() {
  return CUSTOMER_AUTH_PROVIDER_CALLBACK_SESSION_RUNTIME_READY === true;
}

function resolveCustomerAuthProviderUrl(provider: CustomerAuthProvider, options?: { state?: string; returnTo?: string; baseUrl?: string }) {
  const manualUrl = cleanUrl(process.env[provider.envKey]);
  if (manualUrl) return appendProviderState(manualUrl, options);

  const clientId = cleanEnv(process.env[provider.clientIdEnvKey]);
  if (!clientId) return null;

  const redirectUri = cleanUrl(process.env[provider.redirectUriEnvKey]) || buildDefaultRedirectUri(provider.key, options?.baseUrl);
  if (!redirectUri) return null;

  const url = new URL(provider.authorizationEndpoint);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", provider.key === "apple" ? "code id_token" : "code");
  url.searchParams.set("scope", provider.defaultScopes.join(" "));
  url.searchParams.set("state", options?.state || buildCustomerAuthState(provider.key, options?.returnTo));
  if (provider.key === "google") url.searchParams.set("prompt", "select_account");
  if (provider.key === "apple") url.searchParams.set("response_mode", "form_post");
  return url.toString();
}

export function buildCustomerAuthState(providerKey: CustomerAuthProviderKey, returnTo?: string) {
  const safeReturnTo = returnTo && returnTo.startsWith("/dashboard") ? returnTo : "/dashboard";
  return Buffer.from(JSON.stringify({ provider: providerKey, returnTo: safeReturnTo, intent: "account-access" }), "utf8").toString("base64url");
}

function appendProviderState(value: string, options?: { state?: string; returnTo?: string; baseUrl?: string }) {
  try {
    const url = new URL(value);
    if (options?.state && !url.searchParams.has("state")) url.searchParams.set("state", options.state);
    if (options?.returnTo && !url.searchParams.has("returnTo")) url.searchParams.set("returnTo", options.returnTo);
    return url.toString();
  } catch {
    return null;
  }
}

function buildDefaultRedirectUri(providerKey: CustomerAuthProviderKey, baseUrl?: string) {
  const origin = cleanOrigin(baseUrl || process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || "https://cendorq.com");
  return origin ? `${origin}/api/auth/callback/${providerKey}` : null;
}

function cleanUrl(value: unknown) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function cleanOrigin(value: unknown) {
  if (typeof value !== "string") return null;
  const withProtocol = value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`;
  try {
    const url = new URL(withProtocol.trim());
    return url.protocol === "https:" || url.hostname === "localhost" ? url.origin : null;
  } catch {
    return null;
  }
}

function cleanEnv(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readEnabledFlag(value: unknown) {
  const cleaned = cleanEnv(value).toLowerCase();
  return cleaned === "1" || cleaned === "true" || cleaned === "enabled" || cleaned === "ready";
}

export const CUSTOMER_AUTH_SESSION_STANDARD = [
  "Returning customers should continue automatically when a trusted session is present.",
  "Changed device, expired session, cleared browser, or risk signal should return to sign in.",
  "Provider sign-in confirms account identity; Free Scan remains the business-context intake.",
  "A first-time provider sign-in may create an account workspace, but Free Scan results require business readiness intake.",
  "Provider routes must fail safely when provider client IDs or redirect URLs are not configured.",
  `Provider buttons stay hidden until ${FULL_PROVIDER_SESSION_READY_ENV_KEY}, provider callback session runtime, token exchange, profile fetch, workspace creation or restoration, and Cendorq session creation are production-ready.`,
] as const;