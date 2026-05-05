import { randomUUID } from "node:crypto";
import path from "node:path";

import { cleanGatewayString } from "@/lib/customer-access-gateway-runtime";
import type { CustomerSupportOperatorAssignmentContract, CustomerSupportOperatorAssignmentDecision, CustomerSupportOperatorAssignmentState } from "@/lib/customer-support-operator-assignment-contracts";
import type { CustomerSupportOperatorRole } from "@/lib/customer-support-operator-console-contracts";
import { loadFileBackedEnvelope, saveFileBackedEnvelope, type FileBackedEnvelope } from "@/lib/storage/file-backed-envelope";

export type CustomerSupportOperatorAssignmentEnvelope = FileBackedEnvelope<CustomerSupportOperatorAssignmentContract>;

export type CustomerSupportOperatorAssignmentBuildInput = {
  supportRequestId: string;
  customerIdHash: string;
  assignedRole: CustomerSupportOperatorRole;
  assignedActorRef?: string;
  assignmentState: CustomerSupportOperatorAssignmentState;
  decision: CustomerSupportOperatorAssignmentDecision;
  reasonCode: string;
  customerSafeSummary: string;
  auditEventId: string;
  now?: string;
};

export type CustomerSupportOperatorAssignmentBuildResult =
  | { ok: true; assignment: CustomerSupportOperatorAssignmentContract }
  | { ok: false; reason: string; assignment: null };

export type CustomerSupportOperatorAssignmentProjection = Pick<CustomerSupportOperatorAssignmentContract, "assignmentId" | "supportRequestId" | "assignedRole" | "assignmentState" | "decision" | "reasonCode" | "customerSafeSummary" | "createdAt" | "updatedAt" | "auditEventId">;

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const STORAGE_FILE = path.join(STORAGE_DIR, "customer-support-operator-assignments.v1.json");
const ASSIGNMENT_STATES = ["unassigned", "triage-assigned", "specialist-assigned", "billing-assigned", "security-assigned", "admin-review", "released"] as const satisfies readonly CustomerSupportOperatorAssignmentState[];
const ASSIGNMENT_DECISIONS = ["assign", "hold", "release", "escalate", "deny"] as const satisfies readonly CustomerSupportOperatorAssignmentDecision[];
const OPERATOR_ROLES = ["support-triage", "support-specialist", "billing-approver", "security-reviewer", "support-admin"] as const satisfies readonly CustomerSupportOperatorRole[];

export const CUSTOMER_SUPPORT_OPERATOR_ASSIGNMENT_RUNTIME_GUARDS = [
  "support operator assignment runtime builds assignments only from server-normalized support request, customer, role, decision, and audit context",
  "support operator assignment runtime requires supportRequestId, customerIdHash, assignedRole, assignmentState, decision, reasonCode, customerSafeSummary, and auditEventId before creation",
  "support operator assignment runtime stores immutableAuditRequired true and customerVisibleOperatorIdentity false for every assignment",
  "support operator assignment runtime stores rawPayloadStored false, rawEvidenceStored false, rawSecurityPayloadStored false, rawBillingDataStored false, rawPaymentDataStored false, internalNotesCustomerVisible false, and secretsStored false",
  "support operator assignment runtime projects no customerIdHash, assignedActorRef, raw flags, internal notes, secrets, or authorization internals",
  "support operator assignment runtime is storage-only and does not create assignment mutation endpoints or customer-visible operator identities",
  "owner posture coverage keeps protected customer and report surfaces aligned with verified access while operator assignment runtime surfaces stay private and review-gated",
] as const;

export function buildCustomerSupportOperatorAssignment(input: CustomerSupportOperatorAssignmentBuildInput): CustomerSupportOperatorAssignmentBuildResult {
  const supportRequestId = cleanRuntimeString(input.supportRequestId, 120);
  const customerIdHash = cleanRuntimeString(input.customerIdHash, 160);
  const assignedActorRef = cleanRuntimeString(input.assignedActorRef, 160) || undefined;
  const reasonCode = cleanRuntimeString(input.reasonCode, 120);
  const customerSafeSummary = cleanRuntimeString(input.customerSafeSummary, 600);
  const auditEventId = cleanRuntimeString(input.auditEventId, 160);
  const now = normalizeIsoDate(input.now) || new Date().toISOString();

  if (!supportRequestId || !customerIdHash || !reasonCode || !customerSafeSummary || !auditEventId) return { ok: false, reason: "required assignment fields missing", assignment: null };
  if (!isOperatorRole(input.assignedRole) || !isAssignmentState(input.assignmentState) || !isAssignmentDecision(input.decision)) return { ok: false, reason: "assignment enum value is not allowed", assignment: null };

  const roleStateCheck = authorizeAssignmentState(input.assignedRole, input.assignmentState);
  if (!roleStateCheck.ok) return { ok: false, reason: roleStateCheck.reason, assignment: null };

  const assignment: CustomerSupportOperatorAssignmentContract = {
    assignmentId: randomUUID(),
    supportRequestId,
    customerIdHash,
    assignedRole: input.assignedRole,
    assignedActorRef,
    assignmentState: input.assignmentState,
    decision: input.decision,
    reasonCode,
    customerSafeSummary,
    createdAt: now,
    updatedAt: now,
    auditEventId,
    immutableAuditRequired: true,
    customerVisibleOperatorIdentity: false,
    rawPayloadStored: false,
    rawEvidenceStored: false,
    rawSecurityPayloadStored: false,
    rawBillingDataStored: false,
    rawPaymentDataStored: false,
    internalNotesCustomerVisible: false,
    secretsStored: false,
  };

  return { ok: true, assignment };
}

export function authorizeAssignmentState(role: CustomerSupportOperatorRole, state: CustomerSupportOperatorAssignmentState) {
  if (state === "triage-assigned" && role !== "support-triage" && role !== "support-admin") return { ok: false as const, reason: "triage assignment requires support triage or support admin role" };
  if (state === "specialist-assigned" && role !== "support-specialist" && role !== "support-admin") return { ok: false as const, reason: "specialist assignment requires support specialist or support admin role" };
  if (state === "billing-assigned" && role !== "billing-approver" && role !== "support-admin") return { ok: false as const, reason: "billing assignment requires billing approver or support admin role" };
  if (state === "security-assigned" && role !== "security-reviewer" && role !== "support-admin") return { ok: false as const, reason: "security assignment requires security reviewer or support admin role" };
  if (state === "admin-review" && role !== "support-admin") return { ok: false as const, reason: "admin review assignment requires support admin role" };
  return { ok: true as const };
}

export function mergeCustomerSupportOperatorAssignments(existing: readonly CustomerSupportOperatorAssignmentContract[], incoming: readonly CustomerSupportOperatorAssignmentContract[]) {
  const seen = new Set(existing.map((assignment) => assignment.assignmentId));
  const next = incoming.filter((assignment) => {
    if (seen.has(assignment.assignmentId)) return false;
    seen.add(assignment.assignmentId);
    return true;
  });
  return [...next, ...existing].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export function projectCustomerSupportOperatorAssignment(assignment: CustomerSupportOperatorAssignmentContract): CustomerSupportOperatorAssignmentProjection {
  return {
    assignmentId: assignment.assignmentId,
    supportRequestId: assignment.supportRequestId,
    assignedRole: assignment.assignedRole,
    assignmentState: assignment.assignmentState,
    decision: assignment.decision,
    reasonCode: assignment.reasonCode,
    customerSafeSummary: assignment.customerSafeSummary,
    createdAt: assignment.createdAt,
    updatedAt: assignment.updatedAt,
    auditEventId: assignment.auditEventId,
  };
}

export async function loadCustomerSupportOperatorAssignmentEnvelope(): Promise<CustomerSupportOperatorAssignmentEnvelope> {
  return loadFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, normalizeEntry: normalizeCustomerSupportOperatorAssignment, sortEntries: sortCustomerSupportOperatorAssignments, createTempId: randomUUID });
}

export async function saveCustomerSupportOperatorAssignmentEnvelope(envelope: CustomerSupportOperatorAssignmentEnvelope) {
  await saveFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, envelope, createTempId: randomUUID });
}

function normalizeCustomerSupportOperatorAssignment(value: unknown): CustomerSupportOperatorAssignmentContract | null {
  if (!isRecord(value)) return null;
  const assignedRole = isOperatorRole(value.assignedRole) ? value.assignedRole : null;
  const assignmentState = isAssignmentState(value.assignmentState) ? value.assignmentState : null;
  const decision = isAssignmentDecision(value.decision) ? value.decision : null;
  if (!assignedRole || !assignmentState || !decision) return null;
  const now = new Date().toISOString();
  return {
    assignmentId: cleanRuntimeString(value.assignmentId, 160) || randomUUID(),
    supportRequestId: cleanRuntimeString(value.supportRequestId, 120),
    customerIdHash: cleanRuntimeString(value.customerIdHash, 160),
    assignedRole,
    assignedActorRef: cleanRuntimeString(value.assignedActorRef, 160) || undefined,
    assignmentState,
    decision,
    reasonCode: cleanRuntimeString(value.reasonCode, 120),
    customerSafeSummary: cleanRuntimeString(value.customerSafeSummary, 600),
    createdAt: normalizeIsoDate(value.createdAt) || now,
    updatedAt: normalizeIsoDate(value.updatedAt) || now,
    auditEventId: cleanRuntimeString(value.auditEventId, 160),
    immutableAuditRequired: true,
    customerVisibleOperatorIdentity: false,
    rawPayloadStored: false,
    rawEvidenceStored: false,
    rawSecurityPayloadStored: false,
    rawBillingDataStored: false,
    rawPaymentDataStored: false,
    internalNotesCustomerVisible: false,
    secretsStored: false,
  };
}

function sortCustomerSupportOperatorAssignments(entries: CustomerSupportOperatorAssignmentContract[]) {
  return [...entries].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function isOperatorRole(value: unknown): value is CustomerSupportOperatorRole {
  return typeof value === "string" && OPERATOR_ROLES.includes(value as CustomerSupportOperatorRole);
}

function isAssignmentState(value: unknown): value is CustomerSupportOperatorAssignmentState {
  return typeof value === "string" && ASSIGNMENT_STATES.includes(value as CustomerSupportOperatorAssignmentState);
}

function isAssignmentDecision(value: unknown): value is CustomerSupportOperatorAssignmentDecision {
  return typeof value === "string" && ASSIGNMENT_DECISIONS.includes(value as CustomerSupportOperatorAssignmentDecision);
}

function normalizeIsoDate(value: unknown) {
  if (typeof value !== "string") return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function cleanRuntimeString(value: unknown, maxLength: number) {
  return cleanGatewayString(value, maxLength);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
