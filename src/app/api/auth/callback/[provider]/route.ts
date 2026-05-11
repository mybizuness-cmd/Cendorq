import { getCustomerAuthProvider } from "@/lib/customer-auth-provider-config";
import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PATH = "/login";
const DASHBOARD_PATH = "/dashboard";

export async function GET(request: NextRequest, context: { params: Promise<{ provider: string }> }) {
  const params = await context.params;
  return handleProviderCallback(request, params.provider);
}

export async function POST(request: NextRequest, context: { params: Promise<{ provider: string }> }) {
  const params = await context.params;
  return handleProviderCallback(request, params.provider);
}

async function handleProviderCallback(request: NextRequest, providerKey: string) {
  const provider = getCustomerAuthProvider(providerKey);
  const loginUrl = new URL(LOGIN_PATH, request.url);

  if (!provider) {
    loginUrl.searchParams.set("auth", "unknown-provider");
    return NextResponse.redirect(loginUrl);
  }

  const callbackState = decodeCustomerAuthState(request.nextUrl.searchParams.get("state"));
  const returnTo = safeDashboardPath(callbackState.returnTo) || DASHBOARD_PATH;
  loginUrl.searchParams.set("returnTo", returnTo);

  const code = cleanCode(request.nextUrl.searchParams.get("code"));
  const error = cleanText(request.nextUrl.searchParams.get("error"), 120);

  if (error) {
    loginUrl.searchParams.set("auth", "provider-cancelled");
    loginUrl.searchParams.set("provider", provider.key);
    return NextResponse.redirect(loginUrl);
  }

  if (!code) {
    loginUrl.searchParams.set("auth", "provider-callback-missing-code");
    loginUrl.searchParams.set("provider", provider.key);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect and callback plumbing are now present. Token exchange, profile fetch,
  // account creation/restoration, and durable Cendorq session creation must be
  // implemented before the customer can honestly be marked signed in.
  loginUrl.searchParams.set("auth", "provider-callback-pending");
  loginUrl.searchParams.set("provider", provider.key);
  return NextResponse.redirect(loginUrl);
}

function decodeCustomerAuthState(value: string | null) {
  if (!value) return { returnTo: DASHBOARD_PATH };
  try {
    const decoded = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as unknown;
    if (!isRecord(decoded)) return { returnTo: DASHBOARD_PATH };
    return { returnTo: typeof decoded.returnTo === "string" ? decoded.returnTo : DASHBOARD_PATH };
  } catch {
    return { returnTo: DASHBOARD_PATH };
  }
}

function safeDashboardPath(value: string | undefined) {
  if (!value) return "";
  return value === DASHBOARD_PATH || value.startsWith(`${DASHBOARD_PATH}/`) ? value : "";
}

function cleanCode(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim();
  return /^[a-zA-Z0-9._~+/=-]{6,2048}$/.test(cleaned) ? cleaned : "";
}

function cleanText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
