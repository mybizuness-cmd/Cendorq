import { getConfiguredCustomerAuthProviderUrl, getCustomerAuthProvider } from "@/lib/customer-auth-provider-config";
import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PATH = "/login";

export function GET(request: NextRequest, context: { params: { provider: string } }) {
  const provider = getCustomerAuthProvider(context.params.provider);
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
  const requestedReturnTo = request.nextUrl.searchParams.get("returnTo");
  if (requestedReturnTo && requestedReturnTo.startsWith("/")) {
    destination.searchParams.set("returnTo", requestedReturnTo);
  }

  return NextResponse.redirect(destination);
}
