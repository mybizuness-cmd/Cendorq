import { randomUUID } from "node:crypto";
import path from "node:path";

import { cleanGatewayString } from "@/lib/customer-access-gateway-runtime";
import { CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS } from "@/lib/customer-support-lifecycle-notification-contracts";
import type { CustomerSupportLifecycleCommunicationPlan } from "@/lib/customer-support-lifecycle-communication-runtime";
import type { CustomerSupportNotificationRecordChannel, CustomerSupportNotificationRecordContract, CustomerSupportNotificationRecordState } from "@/lib/customer-support-notification-record-contracts";
import { loadFileBackedEnvelope, saveFileBackedEnvelope, type FileBackedEnvelope } from "@/lib/storage/file-backed-envelope";

export type CustomerSupportNotificationRecordEnvelope = FileBackedEnvelope<CustomerSupportNotificationRecordContract>;

export type CustomerSupportNotificationRecordBuildInput = {
  customerIdHash: string;
  communicationPlan: CustomerSupportLifecycleCommunicationPlan;
  now?: string;
  auditEventId?: string;
};

export type CustomerSupportNotificationRecordBuildResult = {
  ok: true;
  records: CustomerSupportNotificationRecordContract[];
  idempotencyKeys: string[];
} | {
  ok: false;
  reason: string;
  records: [];
  idempotencyKeys: [];
};

export type CustomerSupportNotificationRecordProjection = Pick<
  CustomerSupportNotificationRecordContract,
  "notificationId" | "supportRequestId" | "notificationKey" | "status" | "channel" | "state" | "createdAt" | "queuedAt" | "displayedAt" | "sentAt" | "readAt" | "suppressedAt" | "failedAt" | "customerVisibleTitle" | "customerVisibleBody" | "primaryPath"
>;

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const STORAGE_FILE = path.join(STORAGE_DIR, "customer-support-notification-records.v1.json");

export const CUSTOMER_SUPPORT_NOTIFICATION_RECORD_RUNTIME_GUARDS = [
  "support notification record runtime requires customer ownership, safe status projection, and lifecycle notification contract before creating records",
  "support notification record runtime creates records only from projected lifecycle communication plans and never from raw support payloads",
  "support notification record runtime uses idempotency keys per customerIdHash, supportRequestId, notificationKey, channel, and status to prevent duplicate anxiety or spam",
  "support notification record runtime stores suppressed records safely when communication is suppressed and does not store unsafe suppression detail",
  "support notification record runtime projects records without customerIdHash, auditEventId, suppressionReason, failureReason, raw payload flags, or internal storage fields",
  "support notification record runtime stores rawPayloadStored false, rawEvidenceStored false, rawSecurityPayloadStored false, rawBillingDataStored false, internalNotesStored false, and secretsStored false",
] as const;

export function buildCustomerSupportNotificationRecords(input: CustomerSupportNotificationRecordBuildInput): CustomerSupportNotificationRecordBuildResult {
  const customerIdHash = cleanRuntimeString(input.customerIdHash, 160);
  const plan = input.communicationPlan;
  if (!customerIdHash) return { ok: false, reason: "customer ownership missing", records: [], idempotencyKeys: [] };
  if (!plan.supportRequestId || !plan.status || !plan.notificationKey || !plan.primaryPath) return { ok: false, reason: "safe status projection missing", records: [], idempotencyKeys: [] };

  const contract = CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS.find((candidate) => candidate.key === plan.notificationKey);
  if (!contract) return { ok: false, reason: "known lifecycle notification contract missing", records: [], idempotencyKeys: [] };

  const now = normalizeIsoDate(input.now) || new Date().toISOString();
  const auditEventId = cleanRuntimeString(input.auditEventId, 160) || buildAuditEventId(customerIdHash, plan.supportRequestId, plan.notificationKey, plan.status, now);
  const channels = normalizeChannels(plan.channels);
  const selectedChannels = channels.length ? channels : (["support-status"] as const);
  const state = stateFromDecision(plan.decision);
  const records = selectedChannels.map((channel) => buildRecord({ customerIdHash, plan, channel, state, now, auditEventId, title: contract.title, body: contract.body }));

  return {
    ok: true,
    records,
    idempotencyKeys: records.map(buildCustomerSupportNotificationRecordIdempotencyKey),
  };
}

export function buildCustomerSupportNotificationRecordIdempotencyKey(record: Pick<CustomerSupportNotificationRecordContract, "customerIdHash" | "supportRequestId" | "notificationKey" | "channel" | "status">) {
  return [record.customerIdHash, record.supportRequestId, record.notificationKey, record.channel, record.status].map((part) => cleanRuntimeString(part, 160)).join(":");
}

export function mergeCustomerSupportNotificationRecords(existing: readonly CustomerSupportNotificationRecordContract[], incoming: readonly CustomerSupportNotificationRecordContract[]) {
  const seen = new Set(existing.map(buildCustomerSupportNotificationRecordIdempotencyKey));
  const safeIncoming = incoming.filter((record) => {
    const key = buildCustomerSupportNotificationRecordIdempotencyKey(record);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return [...safeIncoming, ...existing].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export function projectCustomerSupportNotificationRecord(record: CustomerSupportNotificationRecordContract): CustomerSupportNotificationRecordProjection {
  return {
    notificationId: record.notificationId,
    supportRequestId: record.supportRequestId,
    notificationKey: record.notificationKey,
    status: record.status,
    channel: record.channel,
    state: record.state,
    createdAt: record.createdAt,
    queuedAt: record.queuedAt,
    displayedAt: record.displayedAt,
    sentAt: record.sentAt,
    readAt: record.readAt,
    suppressedAt: record.suppressedAt,
    failedAt: record.failedAt,
    customerVisibleTitle: record.customerVisibleTitle,
    customerVisibleBody: record.customerVisibleBody,
    primaryPath: record.primaryPath,
  };
}

export async function loadCustomerSupportNotificationRecordEnvelope(): Promise<CustomerSupportNotificationRecordEnvelope> {
  return loadFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, normalizeEntry: normalizeCustomerSupportNotificationRecord, sortEntries: sortCustomerSupportNotificationRecords, createTempId: randomUUID });
}

export async function saveCustomerSupportNotificationRecordEnvelope(envelope: CustomerSupportNotificationRecordEnvelope) {
  await saveFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, envelope, createTempId: randomUUID });
}

function buildRecord({ customerIdHash, plan, channel, state, now, auditEventId, title, body }: { customerIdHash: string; plan: CustomerSupportLifecycleCommunicationPlan; channel: CustomerSupportNotificationRecordChannel; state: CustomerSupportNotificationRecordState; now: string; auditEventId: string; title: string; body: string }): CustomerSupportNotificationRecordContract {
  return {
    notificationId: randomUUID(),
    customerIdHash,
    supportRequestId: cleanRuntimeString(plan.supportRequestId, 160),
    notificationKey: plan.notificationKey,
    status: plan.status,
    channel,
    state,
    createdAt: now,
    queuedAt: state === "queued" ? now : undefined,
    displayedAt: channel === "dashboard-notification" && state === "displayed" ? now : undefined,
    sentAt: channel === "email" && state === "sent" ? now : undefined,
    suppressedAt: state === "suppressed" ? now : undefined,
    suppressionKey: state === "suppressed" ? buildCustomerSupportNotificationRecordIdempotencyKey({ customerIdHash, supportRequestId: plan.supportRequestId, notificationKey: plan.notificationKey, channel, status: plan.status }) : undefined,
    suppressionReason: state === "suppressed" ? "safe lifecycle communication suppression" : undefined,
    customerVisibleTitle: cleanRuntimeString(title, 180),
    customerVisibleBody: cleanRuntimeString(body, 600),
    primaryPath: plan.primaryPath,
    auditEventId,
    rawPayloadStored: false,
    rawEvidenceStored: false,
    rawSecurityPayloadStored: false,
    rawBillingDataStored: false,
    internalNotesStored: false,
    secretsStored: false,
  };
}

function stateFromDecision(decision: CustomerSupportLifecycleCommunicationPlan["decision"]): CustomerSupportNotificationRecordState {
  if (decision === "suppress") return "suppressed";
  if (decision === "hold") return "queued";
  return "displayed";
}

function normalizeChannels(channels: readonly string[]) {
  return channels.filter((channel): channel is CustomerSupportNotificationRecordChannel => channel === "dashboard-notification" || channel === "email" || channel === "support-status");
}

function normalizeCustomerSupportNotificationRecord(value: unknown): CustomerSupportNotificationRecordContract | null {
  if (!isRecord(value)) return null;
  const channel = normalizeChannel(value.channel);
  const state = normalizeState(value.state);
  if (!channel || !state) return null;
  const notificationKey = typeof value.notificationKey === "string" && CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS.some((contract) => contract.key === value.notificationKey) ? value.notificationKey : null;
  if (!notificationKey) return null;
  return {
    notificationId: cleanRuntimeString(value.notificationId, 160) || randomUUID(),
    customerIdHash: cleanRuntimeString(value.customerIdHash, 160),
    supportRequestId: cleanRuntimeString(value.supportRequestId, 160),
    notificationKey,
    status: value.status === "received" || value.status === "reviewing" || value.status === "waiting-on-customer" || value.status === "in-specialist-review" || value.status === "resolved" || value.status === "closed" ? value.status : "received",
    channel,
    state,
    createdAt: normalizeIsoDate(value.createdAt) || new Date().toISOString(),
    queuedAt: normalizeIsoDate(value.queuedAt) || undefined,
    displayedAt: normalizeIsoDate(value.displayedAt) || undefined,
    sentAt: normalizeIsoDate(value.sentAt) || undefined,
    readAt: normalizeIsoDate(value.readAt) || undefined,
    suppressedAt: normalizeIsoDate(value.suppressedAt) || undefined,
    failedAt: normalizeIsoDate(value.failedAt) || undefined,
    suppressionKey: cleanRuntimeString(value.suppressionKey, 180) || undefined,
    suppressionReason: cleanRuntimeString(value.suppressionReason, 240) || undefined,
    failureReason: cleanRuntimeString(value.failureReason, 240) || undefined,
    customerVisibleTitle: cleanRuntimeString(value.customerVisibleTitle, 180),
    customerVisibleBody: cleanRuntimeString(value.customerVisibleBody, 600),
    primaryPath: value.primaryPath === "/dashboard/support/request" || value.primaryPath === "/dashboard/support" ? value.primaryPath : "/dashboard/support/status",
    auditEventId: cleanRuntimeString(value.auditEventId, 160) || randomUUID(),
    rawPayloadStored: false,
    rawEvidenceStored: false,
    rawSecurityPayloadStored: false,
    rawBillingDataStored: false,
    internalNotesStored: false,
    secretsStored: false,
  };
}

function sortCustomerSupportNotificationRecords(entries: CustomerSupportNotificationRecordContract[]) {
  return [...entries].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

function buildAuditEventId(customerIdHash: string, supportRequestId: string, notificationKey: string, status: string, now: string) {
  return ["support-notification", customerIdHash, supportRequestId, notificationKey, status, now].map((part) => cleanRuntimeString(part, 160)).join(":");
}

function normalizeChannel(value: unknown): CustomerSupportNotificationRecordChannel | null {
  return value === "dashboard-notification" || value === "email" || value === "support-status" ? value : null;
}

function normalizeState(value: unknown): CustomerSupportNotificationRecordState | null {
  return value === "queued" || value === "displayed" || value === "sent" || value === "read" || value === "suppressed" || value === "failed" ? value : null;
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
