import { NextRequest } from "next/server";

import { cleanGatewayString, jsonNoStore } from "@/lib/customer-access-gateway-runtime";
import { requireCustomerSupportOperatorAccess, operatorAccessJsonNoStore, operatorAccessOptionsNoStore } from "@/lib/customer-support-operator-access-runtime";
import { buildCustomerSupportOperatorAssignment, loadCustomerSupportOperatorAssignmentEnvelope, mergeCustomerSupportOperatorAssignments, projectCustomerSupportOperatorAssignment, saveCustomerSupportOperatorAssignmentEnvelope } from "@/lib/customer-support-operator-assignment-runtime";
import type { CustomerSupportOperatorAssignmentDecision, CustomerSupportOperatorAssignmentState } from "@/lib/customer-support-operator-assignment-contracts";
import { buildCustomerSupportOperatorAuditRecord, loadCustomerSupportOperatorAuditEnvelope, mergeCustomerSupportOperatorAuditRecords, saveCustomerSupportOperatorAuditEnvelope } from "@/lib/customer-support-operator-audit-runtime";
import type { CustomerSupportOperatorRole } from "@/lib/customer-support-operator-console-contracts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AssignmentPayload = Record<string, unknown>;

type SafeAssignmentResponse = {
  ok: true;
  assignment: ReturnType<typeof projectCustomerSupportOperatorAssignment>;
  auditRecorded: true;
  projection: "operator-assignment-safe";
};

const MAX_ASSIGNMENT_BYTES = 12_000;
const ASSIGNMENT_STATES = ["unassigned", "triage-assigned", "specialist-assigned", "billing-assigned", "security-assigned", "admin-review", "released"] as const satisfies readonly CustomerSupportOperatorAssignmentState[];
const ASSIGNMENT_DECISIONS = ["assign", "hold", "release", "escalate", "deny"] as const satisfies readonly CustomerSupportOperatorAssignmentDecision[];
const OPERATOR_ROLES = ["support-triage", "support-specialist", "billing-approver", "security-reviewer", "support-admin"] as const satisfies readonly CustomerSupportOperatorRole[];

export async function OPTIONS() {
  return operatorAccessOptionsNoStore();
}

export async function POST(request: NextRequest) {
  const access = requireCustomerSupportOperatorAccess({
    request,
    surface: "operator-assignment",
    action: "assign-review",
    mutation: true,
  });
  if (!access.ok) return operatorAccessJsonNoStore(access);

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_ASSIGNMENT_BYTES) {
    return jsonNoStore({ ok: false, error: "The assignment request is too large to process safely.", details: ["Submit a shorter customer-safe assignment summary."] }, 413);
  }

  let rawBody = "";
  try {
    rawBody = await request.text();
  } catch {
    return jsonNoStore({ ok: false, error: "The assignment body could not be read.", details: ["Submit a valid JSON assignment request."] }, 400);
  }
  if (Buffer.byteLength(rawBody, "utf8") > MAX_ASSIGNMENT_BYTES) {
    return jsonNoStore({ ok: false, error: "The assignment request is too large to process safely.", details: ["Submit a shorter customer-safe assignment summary."] }, 413);
  }

  let payload: AssignmentPayload;
  try {
    const parsed = JSON.parse(rawBody) as unknown;
    if (!isRecord(parsed)) throw new Error("payload must be object");
    payload = parsed;
  } catch {
    return jsonNoStore({ ok: false, error: "The assignment payload is not valid JSON.", details: ["Submit a valid JSON assignment request."] }, 400);
  }

  const supportRequestId = cleanString(payload.supportRequestId, 120);
  const customerIdHash = cleanString(payload.customerIdHash, 160);
  const assignedRole = normalizeOperatorRole(payload.assignedRole);
  const assignmentState = normalizeAssignmentState(payload.assignmentState);
  const decision = normalizeAssignmentDecision(payload.decision);
  const reasonCode = cleanString(payload.reasonCode, 120);
  const customerSafeSummary = cleanString(payload.customerSafeSummary, 600);
  const fieldErrors: Record<string, string> = {};

  if (!supportRequestId) fieldErrors.supportRequestId = "Support request ID is required.";
  if (!customerIdHash) fieldErrors.customerIdHash = "Customer ownership hash is required server-side.";
  if (!assignedRole) fieldErrors.assignedRole = "Allowed assigned role is required.";
  if (!assignmentState) fieldErrors.assignmentState = "Allowed assignment state is required.";
  if (!decision) fieldErrors.decision = "Allowed assignment decision is required.";
  if (!reasonCode) fieldErrors.reasonCode = "Safe reason code is required.";
  if (customerSafeSummary.length < 20) fieldErrors.customerSafeSummary = "Customer-safe assignment summary of at least 20 characters is required.";
  if (Object.keys(fieldErrors).length) return jsonNoStore({ ok: false, error: "The assignment request needs required safe fields.", fieldErrors }, 400);
  if (!assignedRole || !assignmentState || !decision) return jsonNoStore({ ok: false, error: "The assignment request could not be normalized safely.", details: ["Use allowlisted assignment roles, states, and decisions only."] }, 400);

  try {
    const now = new Date().toISOString();
    const auditInput = {
      supportRequestId,
      customerIdHash,
      operatorRole: access.operatorRole,
      operatorActorRef: access.operatorActorRef,
      action: "assign-review" as const,
      outcome: decision === "deny" ? "rejected" as const : decision === "hold" ? "held" as const : "assigned" as const,
      approvalGate: "none" as const,
      reasonCode,
      customerSafeSummary,
      now,
      ...(assignmentState === "released" ? { nextCustomerStatus: "reviewing" as const } : {}),
    };
    const auditBuild = buildCustomerSupportOperatorAuditRecord(auditInput);
    if (!auditBuild.ok) return jsonNoStore({ ok: false, error: "The assignment audit record could not be created safely.", details: [auditBuild.reason] }, 400);

    const assignmentBuild = buildCustomerSupportOperatorAssignment({
      supportRequestId,
      customerIdHash,
      assignedRole,
      assignedActorRef: access.operatorActorRef,
      assignmentState,
      decision,
      reasonCode,
      customerSafeSummary,
      auditEventId: auditBuild.record.auditEventId,
      now,
    });
    if (!assignmentBuild.ok) return jsonNoStore({ ok: false, error: "The assignment record could not be created safely.", details: [assignmentBuild.reason] }, 400);

    const auditEnvelope = await loadCustomerSupportOperatorAuditEnvelope();
    auditEnvelope.entries = mergeCustomerSupportOperatorAuditRecords(auditEnvelope.entries, [auditBuild.record]);
    await saveCustomerSupportOperatorAuditEnvelope(auditEnvelope);

    const assignmentEnvelope = await loadCustomerSupportOperatorAssignmentEnvelope();
    assignmentEnvelope.entries = mergeCustomerSupportOperatorAssignments(assignmentEnvelope.entries, [assignmentBuild.assignment]);
    await saveCustomerSupportOperatorAssignmentEnvelope(assignmentEnvelope);

    const body: SafeAssignmentResponse = {
      ok: true,
      assignment: projectCustomerSupportOperatorAssignment(assignmentBuild.assignment),
      auditRecorded: true,
      projection: "operator-assignment-safe",
    };
    return jsonNoStore(body, 200);
  } catch {
    return jsonNoStore({ ok: false, error: "The assignment could not be stored cleanly.", details: ["The support assignment storage layer could not complete the safe mutation."] }, 500);
  }
}

function normalizeOperatorRole(value: unknown): CustomerSupportOperatorRole | null {
  return typeof value === "string" && OPERATOR_ROLES.includes(value as CustomerSupportOperatorRole) ? (value as CustomerSupportOperatorRole) : null;
}

function normalizeAssignmentState(value: unknown): CustomerSupportOperatorAssignmentState | null {
  return typeof value === "string" && ASSIGNMENT_STATES.includes(value as CustomerSupportOperatorAssignmentState) ? (value as CustomerSupportOperatorAssignmentState) : null;
}

function normalizeAssignmentDecision(value: unknown): CustomerSupportOperatorAssignmentDecision | null {
  return typeof value === "string" && ASSIGNMENT_DECISIONS.includes(value as CustomerSupportOperatorAssignmentDecision) ? (value as CustomerSupportOperatorAssignmentDecision) : null;
}

function cleanString(value: unknown, maxLength: number) {
  return cleanGatewayString(value, maxLength);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
