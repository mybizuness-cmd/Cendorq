import { buildCustomerAuthState, getConfiguredCustomerAuthProviderUrl, getCustomerAuthProvider } from "@/lib/customer-auth-provider-config";
import { safeDashboardPath } from "@/lib/customer-remembered-session-runtime";
import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PATH = "/login";
const DEFAULT_RETURN_TO = "/dashboard";
const NO_STORE_HEADERS = [
  ["Cache-Control", "no-store, no-cache, must-revalidate, max-age=0"],
  ["Pragma", "no-cache"],
  ["Expires", "0"],
  ["X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet"],
] as const;

export async function GET(request: NextRequest, context: { params: Promise<{ provider: string }> }) {
  const params = await context.params;
  const provider = getCustomerAuthProvider(params.provider);
  const loginUrl = new URL(LOGIN_PATH, request.url);
  const returnTo = safeDashboardPath(request.nextUrl.searchParams.get("returnTo")) || DEFAULT_RETURN_TO;

  loginUrl.searchParams.set("returnTo", returnTo);

  if (!provider) {
    loginUrl.searchParams.set("auth", "unknown-provider");
    return redirectNoStore(loginUrl);
  }

  const configuredUrl = getConfiguredCustomerAuthProviderUrl(provider, {
    returnTo,
    state: buildCustomerAuthState(provider.key, returnTo),
    baseUrl: request.nextUrl.origin,
  });

  if (!configuredUrl) {
    loginUrl.searchParams.set("auth", "provider-not-ready");
    loginUrl.searchParams.set("provider", provider.key);
    return redirectNoStore(loginUrl);
  }

  return redirectNoStore(new URL(configuredUrl));
}

function redirectNoStore(url: URL) {
  const response = NextResponse.redirect(url, { status: 303 });
  for (const [key, value] of NO_STORE_HEADERS) response.headers.set(key, value);
  return response;
}
