import { buildFreeScanRequiredUrl, resolveCustomerAccessEligibility } from "@/lib/customer-access-eligibility";
import { issueCustomerConfirmationEmail, projectCustomerConfirmationEmailSafeResponse } from "@/lib/customer-confirmation-email-issuance-runtime";
import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PATH = "/login";
const DEFAULT_DESTINATION = "/dashboard";
const SAFE_DASHBOARD_PATHS = [
  "/dashboard",
  "/dashboard/reports",
  "/dashboard/reports/free-scan",
  "/dashboard/billing",
  "/dashboard/support",
  "/dashboard/notifications",
] as const;
const NO_STORE_HEADERS = [
  ["Cache-Control", "no-store, no-cache, must-revalidate, max-age=0"],
  ["Pragma", "no-cache"],
  ["Expires", "0"],
  ["X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet"],
] as const;

export async function GET(request: NextRequest) {
  const email = cleanEmail(request.nextUrl.searchParams.get("email"));
  const returnTo = safeDashboardPath(request.nextUrl.searchParams.get("returnTo")) || DEFAULT_DESTINATION;
  const loginUrl = new URL(LOGIN_PATH, request.url);
  loginUrl.searchParams.set("returnTo", returnTo);

  if (!email) {
    loginUrl.searchParams.set("auth", "email-required");
    return redirectNoStore(loginUrl);
  }

  const eligibility = await resolveCustomerAccessEligibility({ email, requestedDestination: returnTo });
  if (!eligibility.eligible) {
    const freeScanUrl = buildFreeScanRequiredUrl(request.url, { method: "email", returnTo });
    freeScanUrl.searchParams.set("auth", "free-scan-required");
    return redirectNoStore(freeScanUrl);
  }

  try {
    const confirmationEmail = await issueCustomerConfirmationEmail({
      customerIdHash: eligibility.customerIdHash,
      signupEmailHash: eligibility.signupEmailHash,
      customerEmailHash: eligibility.customerEmailHash,
      journeyKey: "support-or-billing-entry",
      requestedDestination: eligibility.primaryDestination,
      issueReason: "account-recovery",
      baseUrl: request.nextUrl.origin,
      customerEmail: email,
    });

    const safePayload = projectCustomerConfirmationEmailSafeResponse(confirmationEmail);
    loginUrl.searchParams.set("auth", projectEmailAccessState(safePayload));
    return redirectNoStore(loginUrl);
  } catch {
    loginUrl.searchParams.set("auth", "email-queued");
    return redirectNoStore(loginUrl);
  }
}

function projectEmailAccessState(payload: ReturnType<typeof projectCustomerConfirmationEmailSafeResponse>) {
  if (payload.providerDelivery.sent) return "email-sent";
  if (payload.providerDelivery.skipped) return "email-unavailable";
  return "email-queued";
}

function redirectNoStore(url: URL) {
  const response = NextResponse.redirect(url, { status: 303 });
  for (const [key, value] of NO_STORE_HEADERS) response.headers.set(key, value);
  return response;
}

function safeDashboardPath(value: string | null) {
  if (!value) return null;
  return SAFE_DASHBOARD_PATHS.find((path) => value === path || value.startsWith(`${path}/`)) || null;
}

function cleanEmail(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim().toLowerCase();
  if (cleaned.length < 6 || cleaned.length > 254) return "";
  const atIndex = cleaned.indexOf("@");
  if (atIndex <= 0 || atIndex !== cleaned.lastIndexOf("@")) return "";
  const local = cleaned.slice(0, atIndex);
  const domain = cleaned.slice(atIndex + 1);
  if (!local || local.length > 64 || local.startsWith(".") || local.endsWith(".") || local.includes("..")) return "";
  if (!domain || domain.length > 253 || !domain.includes(".") || domain.startsWith(".") || domain.endsWith(".") || domain.includes("..")) return "";
  return domain.split(".").every((label) => Boolean(label && label.length <= 63 && !label.startsWith("-") && !label.endsWith("-"))) ? cleaned : "";
}