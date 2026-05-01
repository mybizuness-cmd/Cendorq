import { randomUUID } from "node:crypto";
import path from "node:path";

import { loadFileBackedEnvelope, saveFileBackedEnvelope, type FileBackedEnvelope } from "./storage/file-backed-envelope";

export type CustomerEmailDispatchQueueState = "queued" | "held" | "suppressed" | "sending" | "sent" | "failed" | "cancelled";
export type CustomerEmailDispatchTemplateKey = "confirm-email";

export type CustomerEmailDispatchQueueRecord = {
  queueId: string;
  customerIdHash: string;
  recipientEmailRef: string;
  templateKey: CustomerEmailDispatchTemplateKey;
  senderName: "Cendorq Support";
  fromAddress: "support@cendorq.com";
  state: CustomerEmailDispatchQueueState;
  priority: "normal" | "high";
  createdAt: string;
  queuedAt?: string;
  heldAt?: string;
  suppressedAt?: string;
  sendingAt?: string;
  sentAt?: string;
  failedAt?: string;
  cancelledAt?: string;
  retryCount: number;
  nextRetryAt?: string;
  suppressionKey?: string;
  suppressionReason?: string;
  failureReason?: string;
  subject: string;
  preheader: string;
  primaryCta: string;
  confirmationPath: "/api/customer/email/confirm";
  confirmationUrlHash: string;
  dashboardPath: "/dashboard" | "/dashboard/reports" | "/dashboard/notifications";
  expiresAt: string;
  auditEventId: string;
  rawTokenStored: false;
  tokenHashStored: false;
  rawEmailStored: false;
  rawPayloadStored: false;
  rawEvidenceStored: false;
  rawBillingDataStored: false;
  internalNotesStored: false;
  providerPayloadStored: false;
  secretsStored: false;
};

export type EnqueueCustomerEmailDispatchInput = {
  customerIdHash: string;
  recipientEmailRef: string;
  templateKey: CustomerEmailDispatchTemplateKey;
  subject: string;
  preheader: string;
  primaryCta: string;
  confirmationPath: "/api/customer/email/confirm";
  confirmationUrlHash: string;
  dashboardPath: "/dashboard" | "/dashboard/reports" | "/dashboard/notifications";
  expiresAt: string;
  priority?: "normal" | "high";
  auditEventId?: string | null;
  suppressionKey?: string | null;
  suppressionReason?: string | null;
};

export type UpdateCustomerEmailDispatchQueueStateInput = {
  queueId: string;
  toState: CustomerEmailDispatchQueueState;
  expectedState?: CustomerEmailDispatchQueueState | null;
  retryCount?: number;
  nextRetryAt?: string | null;
  suppressionKey?: string | null;
  suppressionReason?: string | null;
  failureReason?: string | null;
};

export type CustomerEmailDispatchQueueSafeProjection = {
  queueId: string;
  state: CustomerEmailDispatchQueueState;
  templateKey: CustomerEmailDispatchTemplateKey;
  senderName: "Cendorq Support";
  fromAddress: "support@cendorq.com";
  subject: string;
  preheader: string;
  primaryCta: string;
  confirmationPath: "/api/customer/email/confirm";
  confirmationUrlHash: string;
  dashboardPath: "/dashboard" | "/dashboard/reports" | "/dashboard/notifications";
  expiresAt: string;
  auditEventId: string;
  rawTokenStored: false;
  tokenHashStored: false;
  rawEmailStored: false;
  providerPayloadStored: false;
  secretsStored: false;
};

type StoredDispatchEnvelope = FileBackedEnvelope<CustomerEmailDispatchQueueRecord>;

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const STORAGE_FILE = path.join(STORAGE_DIR, "customer-email-dispatch-queue.v3.json");

export async function enqueueCustomerEmailDispatch(
  input: EnqueueCustomerEmailDispatchInput,
): Promise<CustomerEmailDispatchQueueSafeProjection> {
  const now = new Date().toISOString();
  const state: CustomerEmailDispatchQueueState = input.suppressionKey || input.suppressionReason ? "suppressed" : "queued";
  const record: CustomerEmailDispatchQueueRecord = {
    queueId: randomUUID(),
    customerIdHash: cleanHash(input.customerIdHash),
    recipientEmailRef: cleanHash(input.recipientEmailRef),
    templateKey: input.templateKey,
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    state,
    priority: input.priority ?? "normal",
    createdAt: now,
    queuedAt: state === "queued" ? now : undefined,
    suppressedAt: state === "suppressed" ? now : undefined,
    retryCount: 0,
    suppressionKey: cleanOptionalText(input.suppressionKey, 120),
    suppressionReason: cleanOptionalText(input.suppressionReason, 240),
    subject: cleanRequiredText(input.subject, 140),
    preheader: cleanRequiredText(input.preheader, 220),
    primaryCta: cleanRequiredText(input.primaryCta, 90),
    confirmationPath: input.confirmationPath,
    confirmationUrlHash: cleanHash(input.confirmationUrlHash),
    dashboardPath: cleanDashboardPath(input.dashboardPath),
    expiresAt: cleanIso(input.expiresAt) || now,
    auditEventId: cleanOptionalText(input.auditEventId, 160) || randomUUID(),
    rawTokenStored: false,
    tokenHashStored: false,
    rawEmailStored: false,
    rawPayloadStored: false,
    rawEvidenceStored: false,
    rawBillingDataStored: false,
    internalNotesStored: false,
    providerPayloadStored: false,
    secretsStored: false,
  };

  const envelope = await loadEnvelope();
  const existing = envelope.entries.find(
    (entry) =>
      entry.customerIdHash === record.customerIdHash &&
      entry.recipientEmailRef === record.recipientEmailRef &&
      entry.templateKey === record.templateKey &&
      entry.confirmationUrlHash === record.confirmationUrlHash,
  );
  if (existing) return projectCustomerEmailDispatchQueueRecord(existing);

  envelope.entries.unshift(record);
  await saveEnvelope(envelope);
  return projectCustomerEmailDispatchQueueRecord(record);
}

export async function updateCustomerEmailDispatchQueueState(
  input: UpdateCustomerEmailDispatchQueueStateInput,
): Promise<CustomerEmailDispatchQueueSafeProjection | null> {
  const queueId = cleanOptionalText(input.queueId, 160);
  if (!queueId) return null;

  const envelope = await loadEnvelope();
  const index = envelope.entries.findIndex((entry) => entry.queueId === queueId);
  if (index < 0) return null;

  const existing = envelope.entries[index];
  if (input.expectedState && existing.state !== input.expectedState) return projectCustomerEmailDispatchQueueRecord(existing);

  const updated = applyQueueStateMutation(existing, input);
  envelope.entries[index] = updated;
  await saveEnvelope(envelope);
  return projectCustomerEmailDispatchQueueRecord(updated);
}

export function applyQueueStateMutation(
  record: CustomerEmailDispatchQueueRecord,
  input: Omit<UpdateCustomerEmailDispatchQueueStateInput, "queueId" | "expectedState">,
): CustomerEmailDispatchQueueRecord {
  const now = new Date().toISOString();
  const toState = normalizeState(input.toState);
  const retryCount = clampNumber(input.retryCount, 0, 20, record.retryCount);
  return {
    ...record,
    state: toState,
    queuedAt: record.queuedAt || (toState === "queued" ? now : undefined),
    heldAt: toState === "held" ? now : record.heldAt,
    suppressedAt: toState === "suppressed" ? now : record.suppressedAt,
    sendingAt: toState === "sending" ? now : record.sendingAt,
    sentAt: toState === "sent" ? now : record.sentAt,
    failedAt: toState === "failed" ? now : record.failedAt,
    cancelledAt: toState === "cancelled" ? now : record.cancelledAt,
    retryCount,
    nextRetryAt: cleanIso(input.nextRetryAt) || (toState === "failed" ? record.nextRetryAt : undefined),
    suppressionKey: cleanOptionalText(input.suppressionKey, 120) || record.suppressionKey,
    suppressionReason: cleanOptionalText(input.suppressionReason, 240) || record.suppressionReason,
    failureReason: cleanOptionalText(input.failureReason, 240) || record.failureReason,
    rawTokenStored: false,
    tokenHashStored: false,
    rawEmailStored: false,
    rawPayloadStored: false,
    rawEvidenceStored: false,
    rawBillingDataStored: false,
    internalNotesStored: false,
    providerPayloadStored: false,
    secretsStored: false,
  };
}

export function projectCustomerEmailDispatchQueueRecord(
  record: CustomerEmailDispatchQueueRecord,
): CustomerEmailDispatchQueueSafeProjection {
  return {
    queueId: record.queueId,
    state: record.state,
    templateKey: record.templateKey,
    senderName: record.senderName,
    fromAddress: record.fromAddress,
    subject: record.subject,
    preheader: record.preheader,
    primaryCta: record.primaryCta,
    confirmationPath: record.confirmationPath,
    confirmationUrlHash: record.confirmationUrlHash,
    dashboardPath: record.dashboardPath,
    expiresAt: record.expiresAt,
    auditEventId: record.auditEventId,
    rawTokenStored: false,
    tokenHashStored: false,
    rawEmailStored: false,
    providerPayloadStored: false,
    secretsStored: false,
  };
}

export function getCustomerEmailDispatchQueueStorageRules() {
  return [
    "customer email dispatch queue records store recipientEmailRef rather than raw customer email addresses",
    "customer email dispatch queue records store confirmationUrlHash rather than confirmationUrl or raw token",
    "customer email dispatch queue records do not store providerReadyPayload or call an external email provider",
    "customer email dispatch queue records are idempotent per customerIdHash, recipientEmailRef, templateKey, and confirmationUrlHash",
    "customer email dispatch queue state mutations update state timestamps and retry metadata without storing raw emails, tokens, confirmation URLs, provider payloads, provider responses, or secrets",
    "customer email dispatch queue records keep Cendorq Support <support@cendorq.com> as the sender identity",
  ] as const;
}

async function loadEnvelope(): Promise<StoredDispatchEnvelope> {
  return loadFileBackedEnvelope({
    storageDir: STORAGE_DIR,
    storageFile: STORAGE_FILE,
    normalizeEntry,
    sortEntries,
    createTempId: randomUUID,
  });
}

async function saveEnvelope(envelope: StoredDispatchEnvelope) {
  await saveFileBackedEnvelope({
    storageDir: STORAGE_DIR,
    storageFile: STORAGE_FILE,
    envelope: { version: 3, entries: sortEntries(envelope.entries) },
    createTempId: randomUUID,
  });
}

function normalizeEntry(value: unknown): CustomerEmailDispatchQueueRecord | null {
  if (!isRecord(value)) return null;
  const customerIdHash = cleanHash(value.customerIdHash);
  const recipientEmailRef = cleanHash(value.recipientEmailRef);
  const confirmationUrlHash = cleanHash(value.confirmationUrlHash);
  if (!customerIdHash || !recipientEmailRef || !confirmationUrlHash) return null;
  return {
    queueId: cleanOptionalText(value.queueId, 160) || randomUUID(),
    customerIdHash,
    recipientEmailRef,
    templateKey: "confirm-email",
    senderName: "Cendorq Support",
    fromAddress: "support@cendorq.com",
    state: normalizeState(value.state),
    priority: value.priority === "high" ? "high" : "normal",
    createdAt: cleanIso(value.createdAt) || new Date().toISOString(),
    queuedAt: cleanIso(value.queuedAt) || undefined,
    heldAt: cleanIso(value.heldAt) || undefined,
    suppressedAt: cleanIso(value.suppressedAt) || undefined,
    sendingAt: cleanIso(value.sendingAt) || undefined,
    sentAt: cleanIso(value.sentAt) || undefined,
    failedAt: cleanIso(value.failedAt) || undefined,
    cancelledAt: cleanIso(value.cancelledAt) || undefined,
    retryCount: clampNumber(value.retryCount, 0, 20, 0),
    nextRetryAt: cleanIso(value.nextRetryAt) || undefined,
    suppressionKey: cleanOptionalText(value.suppressionKey, 120),
    suppressionReason: cleanOptionalText(value.suppressionReason, 240),
    failureReason: cleanOptionalText(value.failureReason, 240),
    subject: cleanRequiredText(value.subject, 140),
    preheader: cleanRequiredText(value.preheader, 220),
    primaryCta: cleanRequiredText(value.primaryCta, 90),
    confirmationPath: "/api/customer/email/confirm",
    confirmationUrlHash,
    dashboardPath: cleanDashboardPath(value.dashboardPath),
    expiresAt: cleanIso(value.expiresAt) || new Date().toISOString(),
    auditEventId: cleanOptionalText(value.auditEventId, 160) || randomUUID(),
    rawTokenStored: false,
    tokenHashStored: false,
    rawEmailStored: false,
    rawPayloadStored: false,
    rawEvidenceStored: false,
    rawBillingDataStored: false,
    internalNotesStored: false,
    providerPayloadStored: false,
    secretsStored: false,
  };
}

function sortEntries(entries: CustomerEmailDispatchQueueRecord[]) {
  return [...entries].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

function cleanHash(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim().toLowerCase();
  return /^[a-f0-9]{24,96}$/.test(cleaned) ? cleaned : "";
}

function cleanRequiredText(value: unknown, max: number) {
  const cleaned = cleanOptionalText(value, max);
  return cleaned || "Cendorq confirmation";
}

function cleanOptionalText(value: unknown, max: number) {
  if (typeof value !== "string") return undefined;
  const cleaned = value.replace(/\s+/g, " ").trim().slice(0, max);
  return cleaned || undefined;
}

function cleanIso(value: unknown) {
  if (typeof value !== "string") return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function cleanDashboardPath(value: unknown): CustomerEmailDispatchQueueRecord["dashboardPath"] {
  if (value === "/dashboard/reports" || value === "/dashboard/notifications") return value;
  return "/dashboard";
}

function normalizeState(value: unknown): CustomerEmailDispatchQueueState {
  if (value === "held" || value === "suppressed" || value === "sending" || value === "sent" || value === "failed" || value === "cancelled") return value;
  return "queued";
}

function clampNumber(value: unknown, min: number, max: number, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
