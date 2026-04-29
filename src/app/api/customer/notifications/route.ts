import { NextRequest } from "next/server";

import { jsonNoStore, optionsNoStore } from "@/lib/customer-access-gateway-runtime";
import { requireCustomerSession } from "@/lib/customer-session-auth-runtime";
import { loadCustomerSupportNotificationRecordEnvelope, projectCustomerSupportNotificationRecord } from "@/lib/customer-support-notification-record-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CustomerNotificationApiEntry = ReturnType<typeof projectCustomerSupportNotificationRecord> & {
  source: "support-lifecycle";
};

const MAX_NOTIFICATION_LIMIT = 100;

export async function OPTIONS() {
  return optionsNoStore("GET,OPTIONS");
}

export async function GET(request: NextRequest) {
  const sessionAccess = requireCustomerSession(request, {
    requireVerifiedEmail: true,
  });

  if (!sessionAccess.ok || !sessionAccess.customerIdHash) {
    return jsonNoStore({ ok: false, error: sessionAccess.safeMessage, details: ["Open notifications from the authenticated customer dashboard and try again."] }, 401);
  }

  try {
    const envelope = await loadCustomerSupportNotificationRecordEnvelope();
    const limit = clampInteger(request.nextUrl.searchParams.get("limit"), 1, MAX_NOTIFICATION_LIMIT, 50);
    const state = cleanState(request.nextUrl.searchParams.get("state"));
    const source = cleanSource(request.nextUrl.searchParams.get("source"));

    const supportLifecycleEntries = envelope.entries
      .filter((entry) => entry.customerIdHash === sessionAccess.customerIdHash)
      .filter((entry) => (state ? entry.state === state : true))
      .map((entry): CustomerNotificationApiEntry => ({ source: "support-lifecycle", ...projectCustomerSupportNotificationRecord(entry) }));

    const entries = (source === "support-lifecycle" || !source ? supportLifecycleEntries : [])
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .slice(0, limit);

    return jsonNoStore({ ok: true, returned: entries.length, entries }, 200);
  } catch {
    return jsonNoStore({ ok: false, error: "Unable to load notifications safely.", details: ["The customer notification storage layer could not be read cleanly."] }, 500);
  }
}

function cleanState(value: unknown) {
  return value === "queued" || value === "displayed" || value === "sent" || value === "read" || value === "suppressed" || value === "failed" ? value : "";
}

function cleanSource(value: unknown) {
  return value === "support-lifecycle" ? value : "";
}

function clampInteger(value: unknown, min: number, max: number, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}
