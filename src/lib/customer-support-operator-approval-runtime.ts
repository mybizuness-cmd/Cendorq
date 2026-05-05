import { randomUUID } from "node:crypto";
import path from "node:path";

import { cleanGatewayString } from "@/lib/customer-access-gateway-runtime";
import type { CustomerSupportOperatorApprovalContract, CustomerSupportOperatorApprovalDecision, CustomerSupportOperatorApprovalState, CustomerSupportOperatorApprovalType } from "@/lib/customer-support-operator-approval-contracts";
import type { CustomerSupportOperatorApprovalGate, CustomerSupportOperatorRole } from "@/lib/customer-support-operator-console-contracts";
import { loadFileBackedEnvelope, saveFileBackedEnvelope, type FileBackedEnvelope } from "@/lib/storage/file-backed-envelope";

export type CustomerSupportOperatorApprovalEnvelope = FileBackedEnvelope<CustomerSupportOperatorApprovalContract>;

export type CustomerSupportOperatorApprovalBuildInput = {
  supportRequestId: string;
  customerIdHash: string;
  approvalType: CustomerSupportOperatorApprovalType;
  approvalGate: CustomerSupportOperatorApprovalGate;
  requestedByRole: CustomerSupportOperatorRole;
  reviewerRole: CustomerSupportOperatorRole;
  decision: CustomerSupportOperatorApprovalDecision;
  state: CustomerSupportOperatorApprovalState;
  reasonCode: string;
  customerSafeSummary: string;
  customerSafeOutcomeCopy?: string;
  auditEventId: string;
  now?: string;
};

export type CustomerSupportOperatorApprovalBuildResult =
  | { ok: true; approval: CustomerSupportOperatorApprovalContract }
  | { ok: false; reason: string; approval: null };

export type CustomerSupportOperatorApprovalProjection = Pick<CustomerSupportOperatorApprovalContract, "approvalId" | "supportRequestId" | "approvalType" | "approvalGate" | "reviewerRole" | "decision" | "state" | "reasonCode" | "customerSafeSummary" | "customerSafeOutcomeCopy" | "auditEventId" | "createdAt" | "updatedAt">;

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const STORAGE_FILE = path.join(STORAGE_DIR, "customer-support-operator-approvals.v1.json");
const APPROVAL_TYPES = ["safe-correction", "billing-action", "security-outcome", "support-closure"] as const satisfies readonly CustomerSupportOperatorApprovalType[];
const APPROVAL_DECISIONS = ["approve", "reject", "hold", "escalate"] as const satisfies readonly CustomerSupportOperatorApprovalDecision[];
const APPROVAL_STATES = ["requested", "in-review", "approved", "rejected", "held", "escalated"] as const satisfies readonly CustomerSupportOperatorApprovalState[];
const APPROVAL_GATES = ["none", "specialist-review", "billing-approval", "security-approval", "support-admin-approval"] as const satisfies readonly CustomerSupportOperatorApprovalGate[];
const OPERATOR_ROLES = ["support-triage", "support-specialist", "billing-approver", "security-reviewer", "support-admin"] as const satisfies readonly CustomerSupportOperatorRole[];

export const CUSTOMER_SUPPORT_OPERATOR_APPROVAL_RUNTIME_GUARDS = [
  "support operator approval runtime builds approval records only from server-normalized support request, customer, reviewer, decision, gate, and audit context",
  "support operator approval runtime requires supportRequestId, customerIdHash, approvalType, approvalGate, requestedByRole, reviewerRole, decision, state, reasonCode, customerSafeSummary, and auditEventId before creation",
  "support operator approval runtime enforces approval type to approval gate compatibility before record creation",
  "support operator approval runtime stores immutableAuditRequired true, customerVisibleOperatorIdentity false, unsupportedPromiseAllowed false, and all raw storage flags false",
  "support operator approval runtime projects no customerIdHash, requestedByRole, raw flags, internal notes, secrets, or authorization internals",
  "support operator approval runtime is storage-only and does not create approval mutation endpoints or customer-visible operator identities",
] as const;

export function buildCustomerSupportOperatorApproval(input: CustomerSupportOperatorApprovalBuildInput): CustomerSupportOperatorApprovalBuildResult {
  const supportRequestId = cleanRuntimeString(input.supportRequestId, 120);
  const customerIdHash = cleanRuntimeString(input.customerIdHash, 160);
  const reasonCode = cleanRuntimeString(input.reasonCode, 120);
  const customerSafeSummary = cleanRuntimeString(input.customerSafeSummary, 600);
  const customerSafeOutcomeCopy = cleanRuntimeString(input.customerSafeOutcomeCopy, 600) || undefined;
  const auditEventId = cleanRuntimeString(input.auditEventId, 160);
  const now = normalizeIsoDate(input.now) || new Date().toISOString();

  if (!supportRequestId || !customerIdHash || !reasonCode || !customerSafeSummary || !auditEventId) return { ok: false, reason: "required approval fields missing", approval: null };
  if (!isApprovalType(input.approvalType) || !isApprovalGate(input.approvalGate) || !isOperatorRole(input.requestedByRole) || !isOperatorRole(input.reviewerRole) || !isApprovalDecision(input.decision) || !isApprovalState(input.state)) return { ok: false, reason: "approval enum value is not allowed", approval: null };

  const gateCheck = authorizeApprovalGate(input.approvalType, input.approvalGate, input.reviewerRole);
  if (!gateCheck.ok) return { ok: false, reason: gateCheck.reason, approval: null };
  if (input.decision === "approve" && !customerSafeOutcomeCopy) return { ok: false, reason: "approved support outcome requires customer-safe outcome copy", approval: null };

  const approval: CustomerSupportOperatorApprovalContract = {
    approvalId: randomUUID(),
    supportRequestId,
    customerIdHash,
    approvalType: input.approvalType,
    approvalGate: input.approvalGate,
    requestedByRole: input.requestedByRole,
    reviewerRole: input.reviewerRole,
    decision: input.decision,
    state: input.state,
    reasonCode,
    customerSafeSummary,
    customerSafeOutcomeCopy,
    auditEventId,
    createdAt: now,
    updatedAt: now,
    immutableAuditRequired: true,
    customerVisibleOperatorIdentity: false,
    rawPayloadStored: false,
    rawEvidenceStored: false,
    rawSecurityPayloadStored: false,
    rawBillingDataStored: false,
    rawPaymentDataStored: false,
    internalNotesCustomerVisible: false,
    unsupportedPromiseAllowed: false,
    secretsStored: false,
  };
  return { ok: true, approval };
}

export function authorizeApprovalGate(approvalType: CustomerSupportOperatorApprovalType, approvalGate: CustomerSupportOperatorApprovalGate, reviewerRole: CustomerSupportOperatorRole) {
  if (approvalType === "safe-correction" && approvalGate !== "specialist-review" && approvalGate !== "support-admin-approval") return { ok: false as const, reason: "safe correction approval requires specialist or support admin gate" };
  if (approvalType === "billing-action" && approvalGate !== "billing-approval") return { ok: false as const, reason: "billing action approval requires billing gate" };
  if (approvalType === "security-outcome" && approvalGate !== "security-approval") return { ok: false as const, reason: "security outcome approval requires security gate" };
  if (approvalType === "support-closure" && approvalGate !== "support-admin-approval") return { ok: false as const, reason: "support closure approval requires support admin gate" };
  if (approvalGate === "billing-approval" && reviewerRole !== "billing-approver") return { ok: false as const, reason: "billing gate requires billing approver role" };
  if (approvalGate === "security-approval" && reviewerRole !== "security-reviewer") return { ok: false as const, reason: "security gate requires security reviewer role" };
  if (approvalGate === "support-admin-approval" && reviewerRole !== "support-admin") return { ok: false as const, reason: "support admin gate requires support admin role" };
  if (approvalGate === "specialist-review" && reviewerRole !== "support-specialist" && reviewerRole !== "support-admin") return { ok: false as const, reason: "specialist gate requires specialist or support admin role" };
  return { ok: true as const };
}

export function mergeCustomerSupportOperatorApprovals(existing: readonly CustomerSupportOperatorApprovalContract[], incoming: readonly CustomerSupportOperatorApprovalContract[]) {
  const seen = new Set(existing.map((approval) => approval.approvalId));
  const next = incoming.filter((approval) => {
    if (seen.has(approval.approvalId)) return false;
    seen.add(approval.approvalId);
    return true;
  });
  return [...next, ...existing].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export function projectCustomerSupportOperatorApproval(approval: CustomerSupportOperatorApprovalContract): CustomerSupportOperatorApprovalProjection {
  return {
    approvalId: approval.approvalId,
    supportRequestId: approval.supportRequestId,
    approvalType: approval.approvalType,
    approvalGate: approval.approvalGate,
    reviewerRole: approval.reviewerRole,
    decision: approval.decision,
    state: approval.state,
    reasonCode: approval.reasonCode,
    customerSafeSummary: approval.customerSafeSummary,
    customerSafeOutcomeCopy: approval.customerSafeOutcomeCopy,
    auditEventId: approval.auditEventId,
    createdAt: approval.createdAt,
    updatedAt: approval.updatedAt,
  };
}

export async function loadCustomerSupportOperatorApprovalEnvelope(): Promise<CustomerSupportOperatorApprovalEnvelope> {
  return loadFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, normalizeEntry: normalizeCustomerSupportOperatorApproval, sortEntries: sortCustomerSupportOperatorApprovals, createTempId: randomUUID });
}

export async function saveCustomerSupportOperatorApprovalEnvelope(envelope: CustomerSupportOperatorApprovalEnvelope) {
  await saveFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, envelope, createTempId: randomUUID });
}

function normalizeCustomerSupportOperatorApproval(value: unknown): CustomerSupportOperatorApprovalContract | null {
  if (!isRecord(value)) return null;
  const approvalType = isApprovalType(value.approvalType) ? value.approvalType : null;
  const approvalGate = isApprovalGate(value.approvalGate) ? value.approvalGate : null;
  const requestedByRole = isOperatorRole(value.requestedByRole) ? value.requestedByRole : null;
  const reviewerRole = isOperatorRole(value.reviewerRole) ? value.reviewerRole : null;
  const decision = isApprovalDecision(value.decision) ? value.decision : null;
  const state = isApprovalState(value.state) ? value.state : null;
  if (!approvalType || !approvalGate || !requestedByRole || !reviewerRole || !decision || !state) return null;
  const now = new Date().toISOString();
  return {
    approvalId: cleanRuntimeString(value.approvalId, 160) || randomUUID(),
    supportRequestId: cleanRuntimeString(value.supportRequestId, 120),
    customerIdHash: cleanRuntimeString(value.customerIdHash, 160),
    approvalType,
    approvalGate,
    requestedByRole,
    reviewerRole,
    decision,
    state,
    reasonCode: cleanRuntimeString(value.reasonCode, 120),
    customerSafeSummary: cleanRuntimeString(value.customerSafeSummary, 600),
    customerSafeOutcomeCopy: cleanRuntimeString(value.customerSafeOutcomeCopy, 600) || undefined,
    auditEventId: cleanRuntimeString(value.auditEventId, 160),
    createdAt: normalizeIsoDate(value.createdAt) || now,
    updatedAt: normalizeIsoDate(value.updatedAt) || now,
    immutableAuditRequired: true,
    customerVisibleOperatorIdentity: false,
    rawPayloadStored: false,
    rawEvidenceStored: false,
    rawSecurityPayloadStored: false,
    rawBillingDataStored: false,
    rawPaymentDataStored: false,
    internalNotesCustomerVisible: false,
    unsupportedPromiseAllowed: false,
    secretsStored: false,
  };
}

function sortCustomerSupportOperatorApprovals(entries: CustomerSupportOperatorApprovalContract[]) {
  return [...entries].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function isApprovalType(value: unknown): value is CustomerSupportOperatorApprovalType {
  return typeof value === "string" && APPROVAL_TYPES.includes(value as CustomerSupportOperatorApprovalType);
}

function isApprovalGate(value: unknown): value is CustomerSupportOperatorApprovalGate {
  return typeof value === "string" && APPROVAL_GATES.includes(value as CustomerSupportOperatorApprovalGate);
}

function isOperatorRole(value: unknown): value is CustomerSupportOperatorRole {
  return typeof value === "string" && OPERATOR_ROLES.includes(value as CustomerSupportOperatorRole);
}

function isApprovalDecision(value: unknown): value is CustomerSupportOperatorApprovalDecision {
  return typeof value === "string" && APPROVAL_DECISIONS.includes(value as CustomerSupportOperatorApprovalDecision);
}

function isApprovalState(value: unknown): value is CustomerSupportOperatorApprovalState {
  return typeof value === "string" && APPROVAL_STATES.includes(value as CustomerSupportOperatorApprovalState);
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
