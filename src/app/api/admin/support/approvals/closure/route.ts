import { NextRequest } from "next/server";

import { cleanGatewayString, jsonNoStore } from "@/lib/customer-access-gateway-runtime";
import { requireCustomerSupportOperatorAccess, operatorAccessJsonNoStore, operatorAccessOptionsNoStore } from "@/lib/customer-support-operator-access-runtime";
import { buildCustomerSupportOperatorApproval, loadCustomerSupportOperatorApprovalEnvelope, mergeCustomerSupportOperatorApprovals, projectCustomerSupportOperatorApproval, saveCustomerSupportOperatorApprovalEnvelope } from "@/lib/customer-support-operator-approval-runtime";
import type { CustomerSupportOperatorApprovalDecision, CustomerSupportOperatorApprovalState } from "@/lib/customer-support-operator-approval-contracts";
import { buildCustomerSupportOperatorAuditRecord, loadCustomerSupportOperatorAuditEnvelope, mergeCustomerSupportOperatorAuditRecords, saveCustomerSupportOperatorAuditEnvelope } from "@/lib/customer-support-operator-audit-runtime";
import type { CustomerSupportOperatorRole } from "@/lib/customer-support-operator-console-contracts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ClosureApprovalPayload = Record<string, unknown>;

type SafeClosureApprovalResponse = {
  ok: true;
  approval: ReturnType<typeof projectCustomerSupportOperatorApproval>;
  auditRecorded: true;
  projection: "operator-closure-approval-safe";
};

const MAX_CLOSURE_APPROVAL_BYTES = 14_000;
const APPROVAL_DECISIONS = ["approve", "reject", "hold", "escalate"] as const satisfies readonly CustomerSupportOperatorApprovalDecision[];
const APPROVAL_STATES = ["requested", "in-review", "approved", "rejected", "held", "escalated"] as const satisfies readonly CustomerSupportOperatorApprovalState[];
const REQUESTER_ROLES = ["support-triage", "support-specialist", "support-admin"] as const satisfies readonly CustomerSupportOperatorRole[];

export async function OPTIONS() {
  return operatorAccessOptionsNoStore();
}

export async function POST(request: NextRequest) {
  const access = requireCustomerSupportOperatorAccess({
    request,
    surface: "operator-approval",
    action: "close-request",
    mutation: true,
  });
  if (!access.ok) return operatorAccessJsonNoStore(access);
  if (access.operatorRole !== "support-admin") return jsonNoStore({ ok: false, error: "Closure approval requires a support admin session.", details: ["Use the protected closure approval path with the correct reviewer role."] }, 403);

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_CLOSURE_APPROVAL_BYTES) return jsonNoStore({ ok: false, error: "The closure approval request is too large to process safely.", details: ["Submit a shorter customer-safe closure summary."] }, 413);

  let rawBody = "";
  try {
    rawBody = await request.text();
  } catch {
    return jsonNoStore({ ok: false, error: "The closure approval body could not be read.", details: ["Submit a valid JSON closure approval request."] }, 400);
  }
  if (Buffer.byteLength(rawBody, "utf8") > MAX_CLOSURE_APPROVAL_BYTES) return jsonNoStore({ ok: false, error: "The closure approval request is too large to process safely.", details: ["Submit a shorter customer-safe closure summary."] }, 413);

  let payload: ClosureApprovalPayload;
  try {
    const parsed = JSON.parse(rawBody) as unknown;
    if (!isRecord(parsed)) throw new Error("payload must be object");
    payload = parsed;
  } catch {
    return jsonNoStore({ ok: false, error: "The closure approval payload is not valid JSON.", details: ["Submit a valid JSON closure approval request."] }, 400);
  }

  const supportRequestId = cleanString(payload.supportRequestId, 120);
  const customerIdHash = cleanString(payload.customerIdHash, 160);
  const requestedByRole = normalizeRequesterRole(payload.requestedByRole);
  const decision = normalizeApprovalDecision(payload.decision);
  const state = normalizeApprovalState(payload.state);
  const reasonCode = cleanString(payload.reasonCode, 120);
  const customerSafeSummary = cleanString(payload.customerSafeSummary, 600);
  const customerSafeOutcomeCopy = cleanString(payload.customerSafeOutcomeCopy, 600);
  const fieldErrors: Record<string, string> = {};

  if (!supportRequestId) fieldErrors.supportRequestId = "Support request ID is required.";
  if (!customerIdHash) fieldErrors.customerIdHash = "Customer ownership hash is required server-side.";
  if (!requestedByRole) fieldErrors.requestedByRole = "Allowed requester role is required.";
  if (!decision) fieldErrors.decision = "Allowed closure approval decision is required.";
  if (!state) fieldErrors.state = "Allowed closure approval state is required.";
  if (!reasonCode) fieldErrors.reasonCode = "Safe reason code is required.";
  if (customerSafeSummary.length < 20) fieldErrors.customerSafeSummary = "Customer-safe closure approval summary of at least 20 characters is required.";
  if (decision === "approve" && customerSafeOutcomeCopy.length < 20) fieldErrors.customerSafeOutcomeCopy = "Customer-safe closure outcome copy is required before approval.";
  if (Object.keys(fieldErrors).length) return jsonNoStore({ ok: false, error: "The closure approval request needs required safe fields.", fieldErrors }, 400);
  if (!requestedByRole || !decision || !state) return jsonNoStore({ ok: false, error: "The closure approval request could not be normalized safely.", details: ["Use allowlisted closure approval values only."] }, 400);

  try {
    const now = new Date().toISOString();
    const auditBuild = buildCustomerSupportOperatorAuditRecord({
      supportRequestId,
      customerIdHash,
      operatorRole: access.operatorRole,
      operatorActorRef: access.operatorActorRef,
      action: "close-request",
      outcome: decision === "approve" ? "approved" : decision === "reject" ? "rejected" : decision === "escalate" ? "escalated" : "held",
      approvalGate: "support-admin-approval",
      reasonCode,
      customerSafeSummary,
      now,
    });
    if (!auditBuild.ok) return jsonNoStore({ ok: false, error: "The closure approval audit record could not be created safely.", details: [auditBuild.reason] }, 400);

    const approvalBuild = buildCustomerSupportOperatorApproval({
      supportRequestId,
      customerIdHash,
      approvalType: "support-closure",
      approvalGate: "support-admin-approval",
      requestedByRole,
      reviewerRole: "support-admin",
      decision,
      state,
      reasonCode,
      customerSafeSummary,
      customerSafeOutcomeCopy: customerSafeOutcomeCopy || undefined,
      auditEventId: auditBuild.record.auditEventId,
      now,
    });
    if (!approvalBuild.ok) return jsonNoStore({ ok: false, error: "The closure approval record could not be created safely.", details: [approvalBuild.reason] }, 400);

    const auditEnvelope = await loadCustomerSupportOperatorAuditEnvelope();
    auditEnvelope.entries = mergeCustomerSupportOperatorAuditRecords(auditEnvelope.entries, [auditBuild.record]);
    await saveCustomerSupportOperatorAuditEnvelope(auditEnvelope);

    const approvalEnvelope = await loadCustomerSupportOperatorApprovalEnvelope();
    approvalEnvelope.entries = mergeCustomerSupportOperatorApprovals(approvalEnvelope.entries, [approvalBuild.approval]);
    await saveCustomerSupportOperatorApprovalEnvelope(approvalEnvelope);

    const body: SafeClosureApprovalResponse = {
      ok: true,
      approval: projectCustomerSupportOperatorApproval(approvalBuild.approval),
      auditRecorded: true,
      projection: "operator-closure-approval-safe",
    };
    return jsonNoStore(body, 200);
  } catch {
    return jsonNoStore({ ok: false, error: "The closure approval could not be stored cleanly.", details: ["The closure approval storage layer could not complete the safe mutation."] }, 500);
  }
}

function normalizeRequesterRole(value: unknown): CustomerSupportOperatorRole | null {
  return typeof value === "string" && REQUESTER_ROLES.some((candidate) => candidate === value) ? (value as CustomerSupportOperatorRole) : null;
}

function normalizeApprovalDecision(value: unknown): CustomerSupportOperatorApprovalDecision | null {
  return typeof value === "string" && APPROVAL_DECISIONS.some((candidate) => candidate === value) ? (value as CustomerSupportOperatorApprovalDecision) : null;
}

function normalizeApprovalState(value: unknown): CustomerSupportOperatorApprovalState | null {
  return typeof value === "string" && APPROVAL_STATES.some((candidate) => candidate === value) ? (value as CustomerSupportOperatorApprovalState) : null;
}

function cleanString(value: unknown, maxLength: number) {
  return cleanGatewayString(value, maxLength);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
