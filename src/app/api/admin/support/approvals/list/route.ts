import { NextRequest } from "next/server";

import { jsonNoStore } from "@/lib/customer-access-gateway-runtime";
import { requireCustomerSupportOperatorAccess, operatorAccessJsonNoStore, operatorAccessOptionsNoStore } from "@/lib/customer-support-operator-access-runtime";
import { loadCustomerSupportOperatorApprovalEnvelope, projectCustomerSupportOperatorApproval } from "@/lib/customer-support-operator-approval-runtime";
import type { CustomerSupportOperatorApprovalDecision, CustomerSupportOperatorApprovalState, CustomerSupportOperatorApprovalType } from "@/lib/customer-support-operator-approval-contracts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_LIST_LIMIT = 100;
const APPROVAL_TYPES = ["safe-correction", "billing-action", "security-outcome", "support-closure"] as const satisfies readonly CustomerSupportOperatorApprovalType[];
const APPROVAL_DECISIONS = ["approve", "reject", "hold", "escalate"] as const satisfies readonly CustomerSupportOperatorApprovalDecision[];
const APPROVAL_STATES = ["requested", "in-review", "approved", "rejected", "held", "escalated"] as const satisfies readonly CustomerSupportOperatorApprovalState[];

export async function OPTIONS() {
  return operatorAccessOptionsNoStore();
}

export async function GET(request: NextRequest) {
  const access = requireCustomerSupportOperatorAccess({
    request,
    surface: "operator-approval",
    action: "view-safe-summary",
  });
  if (!access.ok) return operatorAccessJsonNoStore(access);

  try {
    const envelope = await loadCustomerSupportOperatorApprovalEnvelope();
    const supportRequestId = cleanQuery(request.nextUrl.searchParams.get("supportRequestId"), 120);
    const approvalType = normalizeApprovalType(request.nextUrl.searchParams.get("approvalType"));
    const decision = normalizeApprovalDecision(request.nextUrl.searchParams.get("decision"));
    const state = normalizeApprovalState(request.nextUrl.searchParams.get("state"));
    const limit = clampInteger(request.nextUrl.searchParams.get("limit"), 1, MAX_LIST_LIMIT, 50);
    const entries = envelope.entries
      .filter((entry) => (supportRequestId ? entry.supportRequestId === supportRequestId : true))
      .filter((entry) => (approvalType ? entry.approvalType === approvalType : true))
      .filter((entry) => (decision ? entry.decision === decision : true))
      .filter((entry) => (state ? entry.state === state : true))
      .slice(0, limit)
      .map(projectCustomerSupportOperatorApproval);

    return jsonNoStore({ ok: true, returned: entries.length, entries, projection: "operator-approval-safe-list" }, 200);
  } catch {
    return jsonNoStore({ ok: false, error: "Unable to load safe approval records.", details: ["The approval storage layer could not be read cleanly."] }, 500);
  }
}

function cleanQuery(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[^a-zA-Z0-9:_-]/g, "").slice(0, maxLength);
}

function normalizeApprovalType(value: unknown): CustomerSupportOperatorApprovalType | null {
  return typeof value === "string" && APPROVAL_TYPES.some((candidate) => candidate === value) ? (value as CustomerSupportOperatorApprovalType) : null;
}

function normalizeApprovalDecision(value: unknown): CustomerSupportOperatorApprovalDecision | null {
  return typeof value === "string" && APPROVAL_DECISIONS.some((candidate) => candidate === value) ? (value as CustomerSupportOperatorApprovalDecision) : null;
}

function normalizeApprovalState(value: unknown): CustomerSupportOperatorApprovalState | null {
  return typeof value === "string" && APPROVAL_STATES.some((candidate) => candidate === value) ? (value as CustomerSupportOperatorApprovalState) : null;
}

function clampInteger(value: unknown, min: number, max: number, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}
