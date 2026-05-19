import { getCustomerAuthProvider } from "@/lib/customer-auth-provider-config";
import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PATH = "/login";
const DASHBOARD_PATH = "/dashboard";

type CallbackPayload = {
  state: string;
  code: string;
  error: string;
};

export async function GET(request: NextRequest, context: { params: Promise<{ provider: string }> }) {
  const params = await context.params;
  return handleProviderCallback(request, params.provider, readQueryCallbackPayload(request));
}

export async function POST(request: NextRequest, context: { params: Promise<{ provider: string }> }) {
  const params = await context.params;
  return handleProviderCallback(request, params.provider, await readPostedCallbackPayload(request));
}

async function handleProviderCallback(request: NextRequest, providerKey: string, payload: CallbackPayload) {
  const provider = getCustomerAuthProvider(providerKey);
  const loginUrl = new URL(LOGIN_PATH, request.url);

  if (!provider) {
    loginUrl.searchParams.set("auth", "unknown-provider");
    return NextResponse.redirect(loginUrl);
  }

  const callbackState = decodeCustomerAuthState(payload.state);
  const returnTo = safeDashboardPath(callbackState.returnTo) || DASHBOARD_PATH;
  loginUrl.searchParams.set("returnTo", returnTo);

  const code = cleanCode(payload.code);
  const error = cleanText(payload.error, 120);

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

  // Redirect and callback plumbing are now present. The production path must run
  // server-side exchange, profile read, verified email confirmation, and
  // evaluateProviderCallbackCustomerAccess before any durable Cendorq session is
  // created. Unknown provider emails must route to Free Scan instead of opening
  // a blank dashboard. Until that runtime is implemented, customers are sent
  // back to secure email access.
  loginUrl.searchParams.set("auth", "provider-callback-pending");
  loginUrl.searchParams.set("provider", provider.key);
  return NextResponse.redirect(loginUrl);
}

function readQueryCallbackPayload(request: NextRequest): CallbackPayload {
  return {
    state: request.nextUrl.searchParams.get("state") || "",
    code: request.nextUrl.searchParams.get("code") || "",
    error: request.nextUrl.searchParams.get("error") || "",
  };
}

async function readPostedCallbackPayload(request: NextRequest): Promise<CallbackPayload> {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/x-www-form-urlencoded") && !contentType.includes("multipart/form-data")) {
    return readQueryCallbackPayload(request);
  }

  try {
    const formData = await request.formData();
    return {
      state: formString(formData.get("state")),
      code: formString(formData.get("code")),
      error: formString(formData.get("error")),
    };
  } catch {
    return readQueryCallbackPayload(request);
  }
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

function formString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
