import { NextRequest } from "next/server";

import { jsonNoStore } from "@/lib/customer-access-gateway-runtime";
import { requireCustomerSupportOperatorAccess, operatorAccessJsonNoStore, operatorAccessOptionsNoStore } from "@/lib/customer-support-operator-access-runtime";
import { loadCustomerSupportOperatorAssignmentEnvelope, projectCustomerSupportOperatorAssignment } from "@/lib/customer-support-operator-assignment-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_LIST_LIMIT = 100;

export async function OPTIONS() {
  return operatorAccessOptionsNoStore();
}

export async function GET(request: NextRequest) {
  const access = requireCustomerSupportOperatorAccess({
    request,
    surface: "operator-assignment",
    action: "view-safe-summary",
  });
  if (!access.ok) return operatorAccessJsonNoStore(access);

  try {
    const envelope = await loadCustomerSupportOperatorAssignmentEnvelope();
    const supportRequestId = cleanQuery(request.nextUrl.searchParams.get("supportRequestId"), 120);
    const limit = clampInteger(request.nextUrl.searchParams.get("limit"), 1, MAX_LIST_LIMIT, 50);
    const entries = envelope.entries
      .filter((entry) => (supportRequestId ? entry.supportRequestId === supportRequestId : true))
      .slice(0, limit)
      .map(projectCustomerSupportOperatorAssignment);

    return jsonNoStore({ ok: true, returned: entries.length, entries, projection: "operator-assignment-safe-list" }, 200);
  } catch {
    return jsonNoStore({ ok: false, error: "Unable to load safe assignment records.", details: ["The assignment storage layer could not be read cleanly."] }, 500);
  }
}

function cleanQuery(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[^a-zA-Z0-9:_-]/g, "").slice(0, maxLength);
}

function clampInteger(value: unknown, min: number, max: number, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}
