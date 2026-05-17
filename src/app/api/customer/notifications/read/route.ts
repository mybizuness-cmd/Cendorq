import { NextRequest } from "next/server";

import { cleanGatewayString, jsonNoStore, optionsNoStore } from "@/lib/customer-access-gateway-runtime";
import { requireCustomerSession } from "@/lib/customer-session-auth-runtime";
import {
  loadCustomerSupportNotificationRecordEnvelope,
  saveCustomerSupportNotificationRecordEnvelope,
} from "@/lib/customer-support-notification-record-runtime";
import type { CustomerSupportNotificationRecordContract } from "@/lib/customer-support-notification-record-contracts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type NotificationReadPayload = Record<string, unknown>;

const MAX_REQUEST_BYTES = 8_000;
const READABLE_STATES = new Set(["queued", "displayed", "sent"] as const);

export async function OPTIONS() {
  return optionsNoStore("POST,OPTIONS");
}

export async function POST(request: NextRequest) {
  const sessionAccess = requireCustomerSession(request, { requireVerifiedEmail: true });
  if (!sessionAccess.ok || !sessionAccess.customerIdHash) {
    return jsonNoStore({ ok: false, error: sessionAccess.safeMessage, details: ["Open notifications from the authenticated customer dashboard and try again."] }, 401);
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return jsonNoStore({ ok: false, error: "The notification acknowledgement request is too large." }, 413);
  }

  let rawBody = "";
  try {
    rawBody = await request.text();
  } catch {
    return jsonNoStore({ ok: false, error: "The notification acknowledgement body could not be read." }, 400);
  }

  if (!rawBody.trim()) return jsonNoStore({ ok: false, error: "Notification acknowledgement requires a JSON body." }, 400);
  if (Buffer.byteLength(rawBody, "utf8") > MAX_REQUEST_BYTES) {
    return jsonNoStore({ ok: false, error: "The notification acknowledgement request is too large." }, 413);
  }

  let payload: NotificationReadPayload;
  try {
    const parsed = JSON.parse(rawBody) as unknown;
    if (!isRecord(parsed)) throw new Error("Notification acknowledgement payload is not an object.");
    payload = parsed;
  } catch {
    return jsonNoStore({ ok: false, error: "Notification acknowledgement requires valid JSON." }, 400);
  }

  const notificationId = cleanGatewayString(payload.notificationId, 160);
  const supportRequestId = cleanGatewayString(payload.supportRequestId, 160);
  const markAllSupportLifecycle = payload.markAllSupportLifecycle === true;

  if (!notificationId && !supportRequestId && !markAllSupportLifecycle) {
    return jsonNoStore({ ok: false, error: "Choose a notification, support request, or support-lifecycle acknowledgement scope." }, 400);
  }

  try {
    const envelope = await loadCustomerSupportNotificationRecordEnvelope();
    const now = new Date().toISOString();
    let matched = 0;
    let updated = 0;

    envelope.entries = envelope.entries.map((entry) => {
      if (!isOwnedReadCandidate(entry, sessionAccess.customerIdHash, { notificationId, supportRequestId, markAllSupportLifecycle })) return entry;
      matched += 1;
      if (!READABLE_STATES.has(entry.state as "queued" | "displayed" | "sent")) return entry;
      updated += 1;
      return {
        ...entry,
        state: "read" as const,
        readAt: entry.readAt || now,
        rawPayloadStored: false as const,
        rawEvidenceStored: false as const,
        rawSecurityPayloadStored: false as const,
        rawBillingDataStored: false as const,
        internalNotesStored: false as const,
        secretsStored: false as const,
      } satisfies CustomerSupportNotificationRecordContract;
    });

    if (!matched) {
      return jsonNoStore({ ok: false, error: "No authorized notification was found for acknowledgement." }, 404);
    }

    if (updated > 0) await saveCustomerSupportNotificationRecordEnvelope(envelope);

    return jsonNoStore({
      ok: true,
      acknowledged: updated,
      matched,
      state: "read",
      customerOwned: true,
      rawPayloadReturned: false,
      rawEvidenceReturned: false,
      internalNotesReturned: false,
    }, 200);
  } catch {
    return jsonNoStore({ ok: false, error: "Unable to acknowledge notifications safely." }, 500);
  }
}

function isOwnedReadCandidate(
  entry: CustomerSupportNotificationRecordContract,
  customerIdHash: string,
  scope: { notificationId: string; supportRequestId: string; markAllSupportLifecycle: boolean },
) {
  if (entry.customerIdHash !== customerIdHash) return false;
  if (scope.notificationId) return entry.notificationId === scope.notificationId;
  if (scope.supportRequestId) return entry.supportRequestId === scope.supportRequestId;
  return scope.markAllSupportLifecycle;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
