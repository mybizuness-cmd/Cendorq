import { getConfiguredCustomerAuthProviderUrl, getCustomerAuthProvider } from "@/lib/customer-auth-provider-config";
import { safeDashboardPath } from "@/lib/customer-remembered-session-runtime";
import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PATH = "/login";

export async function GET(request: NextRequest, context: { params: Promise<{ provider: string }> }) {
  const params = await context.params;
  const provider = getCustomerAuthProvider(params.provider);
  const loginUrl = new URL(LOGIN_PATH, request.url);

  if (!provider) {
    loginUrl.searchParams.set("auth", "unknown-provider");
    return NextResponse.redirect(loginUrl);
  }

  const configuredUrl = getConfiguredCustomerAuthProviderUrl(provider);
  if (!configuredUrl) {
    loginUrl.searchParams.set("auth", "provider-not-ready");
    loginUrl.searchParams.set("provider", provider.key);
    return NextResponse.redirect(loginUrl);
  }

  const destination = new URL(configuredUrl);
  const safeReturnTo = safeDashboardPath(request.nextUrl.searchParams.get("returnTo"));
  if (safeReturnTo) {
    destination.searchParams.set("returnTo", safeReturnTo);
  }

  return NextResponse.redirect(destination);
}
