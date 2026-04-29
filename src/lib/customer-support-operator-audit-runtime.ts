import { randomUUID } from "node:crypto";
import path from "node:path";

import { cleanGatewayString } from "@/lib/customer-access-gateway-runtime";
import type { CustomerSupportOperatorAuditRecord } from "@/lib/customer-support-operator-audit-contracts";
import type { CustomerSupportOperatorAction, CustomerSupportOperatorApprovalGate, CustomerSupportOperatorAuditOutcome, CustomerSupportOperatorRole } from "@/lib/customer-support-operator-console-contracts";
import { loadFileBackedEnvelope, saveFileBackedEnvelope, type FileBackedEnvelope } from "@/lib/storage/file-backed-envelope";

export type CustomerSupportOperatorAuditEnvelope = FileBackedEnvelope<CustomerSupportOperatorAuditRecord>;

export type CustomerSupportOperatorAuditBuildInput = {
  supportRequestId: string;
  customerIdHash: string;
  operatorRole: CustomerSupportOperatorRole;
  operatorActorRef: string;
  action: CustomerSupportOperatorAction;
  outcome: CustomerSupportOperatorAuditOutcome;
  approvalGate: CustomerSupportOperatorApprovalGate;
  reasonCode: string;
  customerSafeSummary: string;
  previousCustomerStatus?: string;
  nextCustomerStatus?: string;
  internalSafeNoteRef?: string;
  now?: string;
};

export type CustomerSupportOperatorAuditBuildResult =
  | { ok: true; record: CustomerSupportOperatorAuditRecord }
  | { ok: false; reason: string; record: null };

export type CustomerSupportOperatorAuditProjection = Pick<CustomerSupportOperatorAuditRecord, "auditEventId" | "supportRequestId" | "action" | "outcome" | "approvalGate" | "createdAt" | "reasonCode" | "customerSafeSummary" | "previousCustomerStatus" | "nextCustomerStatus">;

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const STORAGE_FILE = path.join(STORAGE_DIR, "customer-support-operator-audit.v1.json");

const SUPPORT_OPERATOR_ROLES = ["support-triage", "support-specialist", "billing-approver", "security-reviewer", "support-admin"] as const satisfies readonly CustomerSupportOperatorRole[];
const SUPPORT_OPERATOR_ACTIONS = ["view-safe-summary", "assign-review", "request-customer-update", "approve-safe-correction", "approve-billing-action", "escalate-security-review", "close-request"] as const satisfies readonly CustomerSupportOperatorAction[];
const SUPPORT_OPERATOR_OUTCOMES = ["viewed", "assigned", "held", "approved", "rejected", "escalated", "closed"] as const satisfies readonly CustomerSupportOperatorAuditOutcome[];
const SUPPORT_OPERATOR_APPROVAL_GATES = ["none", "specialist-review", "billing-approval", "security-approval", "support-admin-approval"] as const satisfies readonly CustomerSupportOperatorApprovalGate[];

export const CUSTOMER_SUPPORT_OPERATOR_AUDIT_RUNTIME_GUARDS = [
  "support operator audit runtime builds append-only immutable records only from safe normalized inputs",
  "support operator audit runtime requires supportRequestId, customerIdHash, operatorActorRef, role, action, outcome, approvalGate, reasonCode, and customerSafeSummary",
  "support operator audit runtime enforces role-to-action authorization before record creation",
  "support operator audit runtime enforces approval gates for correction, billing, security, and irreversible closure actions",
  "support operator audit runtime projects no customerIdHash, operatorActorRef, internalSafeNoteRef, raw storage flags, prompt flags, secret flags, or customer-visible internal notes",
  "support operator audit runtime never stores raw payloads, raw evidence, raw security payloads, raw billing data, raw payment data, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
] as const;

export function buildCustomerSupportOperatorAuditRecord(input: CustomerSupportOperatorAuditBuildInput): CustomerSupportOperatorAuditBuildResult {
  const supportRequestId = cleanRuntimeString(input.supportRequestId, 120);
  const customerIdHash = cleanRuntimeString(input.customerIdHash, 160);
  const operatorActorRef = cleanRuntimeString(input.operatorActorRef, 160);
  const reasonCode = cleanRuntimeString(input.reasonCode, 120);
  const customerSafeSummary = cleanRuntimeString(input.customerSafeSummary, 600);
  const internalSafeNoteRef = cleanRuntimeString(input.internalSafeNoteRef, 160) || undefined;
  const previousCustomerStatus = cleanCustomerStatus(input.previousCustomerStatus);
  const nextCustomerStatus = cleanCustomerStatus(input.nextCustomerStatus);
  const now = normalizeIsoDate(input.now) || new Date().toISOString();

  if (!supportRequestId || !customerIdHash || !operatorActorRef || !reasonCode || !customerSafeSummary) {
    return { ok: false, reason: "required safe audit fields missing", record: null };
  }

  if (!isOperatorRole(input.operatorRole) || !isOperatorAction(input.action) || !isOperatorOutcome(input.outcome) || !isApprovalGate(input.approvalGate)) {
    return { ok: false, reason: "operator audit enum value is not allowed", record: null };
  }

  const authorization = authorizeOperatorAuditAction(input.operatorRole, input.action, input.approvalGate);
  if (!authorization.ok) return { ok: false, reason: authorization.reason, record: null };

  const record: CustomerSupportOperatorAuditRecord = {
    auditEventId: randomUUID(),
    supportRequestId,
    customerIdHash,
    operatorRole: input.operatorRole,
    operatorActorRef,
    action: input.action,
    outcome: input.outcome,
    approvalGate: input.approvalGate,
    createdAt: now,
    reasonCode,
    customerSafeSummary,
    internalSafeNoteRef,
    previousCustomerStatus,
    nextCustomerStatus,
    immutable: true,
    preservedForCompliance: true,
    rawPayloadStored: false,
    rawEvidenceStored: false,
    rawSecurityPayloadStored: false,
    rawBillingDataStored: false,
    rawPaymentDataStored: false,
    promptsStored: false,
    secretsStored: false,
    operatorIdentityCustomerVisible: false,
    internalNotesCustomerVisible: false,
  };

  return { ok: true, record };
}

export function authorizeOperatorAuditAction(operatorRole: CustomerSupportOperatorRole, action: CustomerSupportOperatorAction, approvalGate: CustomerSupportOperatorApprovalGate) {
  if (operatorRole === "support-triage" && action !== "view-safe-summary" && action !== "assign-review" && action !== "request-customer-update") return { ok: false as const, reason: "support triage cannot perform privileged support action" };
  if (operatorRole === "support-specialist" && action === "approve-billing-action") return { ok: false as const, reason: "support specialist cannot approve billing action" };
  if (operatorRole === "billing-approver" && action !== "view-safe-summary" && action !== "approve-billing-action") return { ok: false as const, reason: "billing approver can only view safe summaries or approve billing actions" };
  if (operatorRole === "security-reviewer" && action !== "view-safe-summary" && action !== "escalate-security-review") return { ok: false as const, reason: "security reviewer can only view safe summaries or escalate security review" };
  if (action === "approve-safe-correction" && approvalGate !== "specialist-review" && approvalGate !== "support-admin-approval") return { ok: false as const, reason: "safe correction requires specialist or support admin approval gate" };
  if (action === "approve-billing-action" && approvalGate !== "billing-approval") return { ok: false as const, reason: "billing action requires billing approval gate" };
  if (action === "escalate-security-review" && approvalGate !== "security-approval") return { ok: false as const, reason: "security review requires security approval gate" };
  if (action === "close-request" && approvalGate !== "support-admin-approval") return { ok: false as const, reason: "support closure requires support admin approval gate" };
  return { ok: true as const };
}

export function mergeCustomerSupportOperatorAuditRecords(existing: readonly CustomerSupportOperatorAuditRecord[], incoming: readonly CustomerSupportOperatorAuditRecord[]) {
  const seen = new Set(existing.map((record) => record.auditEventId));
  const next = incoming.filter((record) => {
    if (seen.has(record.auditEventId)) return false;
    seen.add(record.auditEventId);
    return true;
  });
  return [...next, ...existing].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export function projectCustomerSupportOperatorAuditRecord(record: CustomerSupportOperatorAuditRecord): CustomerSupportOperatorAuditProjection {
  return {
    auditEventId: record.auditEventId,
    supportRequestId: record.supportRequestId,
    action: record.action,
    outcome: record.outcome,
    approvalGate: record.approvalGate,
    createdAt: record.createdAt,
    reasonCode: record.reasonCode,
    customerSafeSummary: record.customerSafeSummary,
    previousCustomerStatus: record.previousCustomerStatus,
    nextCustomerStatus: record.nextCustomerStatus,
  };
}

export async function loadCustomerSupportOperatorAuditEnvelope(): Promise<CustomerSupportOperatorAuditEnvelope> {
  return loadFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, normalizeEntry: normalizeCustomerSupportOperatorAuditRecord, sortEntries: sortCustomerSupportOperatorAuditRecords, createTempId: randomUUID });
}

export async function saveCustomerSupportOperatorAuditEnvelope(envelope: CustomerSupportOperatorAuditEnvelope) {
  await saveFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, envelope, createTempId: randomUUID });
}

function normalizeCustomerSupportOperatorAuditRecord(value: unknown): CustomerSupportOperatorAuditRecord | null {
  if (!isRecord(value)) return null;
  const role = isOperatorRole(value.operatorRole) ? value.operatorRole : null;
  const action = isOperatorAction(value.action) ? value.action : null;
  const outcome = isOperatorOutcome(value.outcome) ? value.outcome : null;
  const approvalGate = isApprovalGate(value.approvalGate) ? value.approvalGate : null;
  if (!role || !action || !outcome || !approvalGate) return null;

  return {
    auditEventId: cleanRuntimeString(value.auditEventId, 160) || randomUUID(),
    supportRequestId: cleanRuntimeString(value.supportRequestId, 120),
    customerIdHash: cleanRuntimeString(value.customerIdHash, 160),
    operatorRole: role,
    operatorActorRef: cleanRuntimeString(value.operatorActorRef, 160),
    action,
    outcome,
    approvalGate,
    createdAt: normalizeIsoDate(value.createdAt) || new Date().toISOString(),
    reasonCode: cleanRuntimeString(value.reasonCode, 120),
    customerSafeSummary: cleanRuntimeString(value.customerSafeSummary, 600),
    internalSafeNoteRef: cleanRuntimeString(value.internalSafeNoteRef, 160) || undefined,
    previousCustomerStatus: cleanCustomerStatus(value.previousCustomerStatus),
    nextCustomerStatus: cleanCustomerStatus(value.nextCustomerStatus),
    immutable: true,
    preservedForCompliance: true,
    rawPayloadStored: false,
    rawEvidenceStored: false,
    rawSecurityPayloadStored: false,
    rawBillingDataStored: false,
    rawPaymentDataStored: false,
    promptsStored: false,
    secretsStored: false,
    operatorIdentityCustomerVisible: false,
    internalNotesCustomerVisible: false,
  };
}

function sortCustomerSupportOperatorAuditRecords(entries: CustomerSupportOperatorAuditRecord[]) {
  return [...entries].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

function isOperatorRole(value: unknown): value is CustomerSupportOperatorRole {
  return typeof value === "string" && SUPPORT_OPERATOR_ROLES.includes(value as CustomerSupportOperatorRole);
}

function isOperatorAction(value: unknown): value is CustomerSupportOperatorAction {
  return typeof value === "string" && SUPPORT_OPERATOR_ACTIONS.includes(value as CustomerSupportOperatorAction);
}

function isOperatorOutcome(value: unknown): value is CustomerSupportOperatorAuditOutcome {
  return typeof value === "string" && SUPPORT_OPERATOR_OUTCOMES.includes(value as CustomerSupportOperatorAuditOutcome);
}

function isApprovalGate(value: unknown): value is CustomerSupportOperatorApprovalGate {
  return typeof value === "string" && SUPPORT_OPERATOR_APPROVAL_GATES.includes(value as CustomerSupportOperatorApprovalGate);
}

function cleanCustomerStatus(value: unknown) {
  return value === "received" || value === "reviewing" || value === "waiting-on-customer" || value === "in-specialist-review" || value === "resolved" || value === "closed" ? value : undefined;
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
