import { buildCustomerAuthState, getConfiguredCustomerAuthProviderUrl, getCustomerAuthProvider } from "@/lib/customer-auth-provider-config";
import { safeDashboardPath } from "@/lib/customer-remembered-session-runtime";
import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PATH = "/login";
const DEFAULT_RETURN_TO = "/dashboard";

export async function GET(request: NextRequest, context: { params: Promise<{ provider: string }> }) {
  const params = await context.params;
  const provider = getCustomerAuthProvider(params.provider);
  const loginUrl = new URL(LOGIN_PATH, request.url);
  const returnTo = safeDashboardPath(request.nextUrl.searchParams.get("returnTo")) || DEFAULT_RETURN_TO;

  loginUrl.searchParams.set("returnTo", returnTo);

  if (!provider) {
    loginUrl.searchParams.set("auth", "unknown-provider");
    return NextResponse.redirect(loginUrl);
  }

  const configuredUrl = getConfiguredCustomerAuthProviderUrl(provider, {
    returnTo,
    state: buildCustomerAuthState(provider.key, returnTo),
    baseUrl: request.nextUrl.origin,
  });

  if (!configuredUrl) {
    loginUrl.searchParams.set("auth", "provider-not-ready");
    loginUrl.searchParams.set("provider", provider.key);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.redirect(configuredUrl);
}
