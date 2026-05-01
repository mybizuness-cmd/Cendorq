import { randomUUID } from "node:crypto";
import path from "node:path";

import type {
  CustomerEmailDispatchQueueSafeProjection,
  CustomerEmailDispatchQueueState,
} from "./customer-email-dispatch-queue-runtime";
import type { CustomerEmailProviderDispatchAttempt } from "./customer-email-provider-dispatch-adapter";
import { loadFileBackedEnvelope, saveFileBackedEnvelope, type FileBackedEnvelope } from "./storage/file-backed-envelope";

export type CustomerEmailDispatchAuditTransition = {
  auditId: string;
  queueId: string;
  templateKey: "confirm-email";
  fromState: CustomerEmailDispatchQueueState;
  toState: CustomerEmailDispatchQueueState;
  transitionReason: "queued" | "dry-run" | "ready" | "sent" | "hold" | "suppressed" | "failed" | "cancelled";
  createdAt: string;
  attemptDecision: CustomerEmailProviderDispatchAttempt["decision"];
  providerPayloadHash: string;
  providerEventRefHash?: string;
  failureCode?: string;
  retryCount: number;
  nextRetryAt?: string;
  requiredGuards: readonly string[];
  holdReasons: readonly string[];
  suppressionReasons: readonly string[];
  providerCallMade: boolean;
  providerSecretRead: boolean;
  browserVisible: false;
  rawCustomerEmailStored: false;
  rawTokenStored: false;
  tokenHashStored: false;
  confirmationUrlStored: false;
  providerPayloadStored: false;
  providerResponseStored: false;
  rawEvidenceStored: false;
  rawBillingDataStored: false;
  internalNotesStored: false;
  secretsStored: false;
};

export type RecordCustomerEmailDispatchTransitionInput = {
  queueRecord: CustomerEmailDispatchQueueSafeProjection;
  attempt: CustomerEmailProviderDispatchAttempt;
  toState?: CustomerEmailDispatchQueueState;
  providerEventRefHash?: string | null;
  failureCode?: string | null;
  retryCount?: number;
  nextRetryAt?: string | null;
};

export type CustomerEmailDispatchAuditSafeProjection = {
  auditId: string;
  queueId: string;
  templateKey: "confirm-email";
  fromState: CustomerEmailDispatchQueueState;
  toState: CustomerEmailDispatchQueueState;
  transitionReason: CustomerEmailDispatchAuditTransition["transitionReason"];
  createdAt: string;
  attemptDecision: CustomerEmailProviderDispatchAttempt["decision"];
  providerPayloadHash: string;
  providerEventRefHash?: string;
  retryCount: number;
  nextRetryAt?: string;
  providerCallMade: boolean;
  providerSecretRead: boolean;
  browserVisible: false;
  rawCustomerEmailStored: false;
  rawTokenStored: false;
  tokenHashStored: false;
  confirmationUrlStored: false;
  providerPayloadStored: false;
  providerResponseStored: false;
  secretsStored: false;
};

type StoredAuditEnvelope = FileBackedEnvelope<CustomerEmailDispatchAuditTransition>;

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const STORAGE_FILE = path.join(STORAGE_DIR, "customer-email-dispatch-audit.v3.json");

export async function recordCustomerEmailDispatchTransition(
  input: RecordCustomerEmailDispatchTransitionInput,
): Promise<CustomerEmailDispatchAuditSafeProjection> {
  const transition = buildTransition(input);
  const envelope = await loadEnvelope();
  envelope.entries.unshift(transition);
  await saveEnvelope(envelope);
  return projectCustomerEmailDispatchAuditTransition(transition);
}

export function projectCustomerEmailDispatchAuditTransition(
  transition: CustomerEmailDispatchAuditTransition,
): CustomerEmailDispatchAuditSafeProjection {
  return {
    auditId: transition.auditId,
    queueId: transition.queueId,
    templateKey: transition.templateKey,
    fromState: transition.fromState,
    toState: transition.toState,
    transitionReason: transition.transitionReason,
    createdAt: transition.createdAt,
    attemptDecision: transition.attemptDecision,
    providerPayloadHash: transition.providerPayloadHash,
    providerEventRefHash: transition.providerEventRefHash,
    retryCount: transition.retryCount,
    nextRetryAt: transition.nextRetryAt,
    providerCallMade: transition.providerCallMade,
    providerSecretRead: transition.providerSecretRead,
    browserVisible: false,
    rawCustomerEmailStored: false,
    rawTokenStored: false,
    tokenHashStored: false,
    confirmationUrlStored: false,
    providerPayloadStored: false,
    providerResponseStored: false,
    secretsStored: false,
  };
}

export function getCustomerEmailDispatchAuditRules() {
  return [
    "dispatch audit transitions are append-only records separate from browser-safe responses",
    "dispatch audit transitions record providerPayloadHash and providerEventRefHash, not raw provider payloads or provider responses",
    "dispatch audit transitions never store raw customer emails, raw tokens, token hashes, confirmation URLs, secrets, raw evidence, raw billing data, or internal notes",
    "dispatch audit transitions preserve required guards, hold reasons, and suppression reasons for operational review",
    "dispatch audit transitions allow providerCallMade and providerSecretRead only as booleans, never as provider secrets or provider response bodies",
  ] as const;
}

function buildTransition(input: RecordCustomerEmailDispatchTransitionInput): CustomerEmailDispatchAuditTransition {
  const toState = input.toState ?? deriveToState(input.attempt);
  return {
    auditId: randomUUID(),
    queueId: input.queueRecord.queueId,
    templateKey: "confirm-email",
    fromState: input.queueRecord.state,
    toState,
    transitionReason: deriveTransitionReason(input.attempt, toState),
    createdAt: new Date().toISOString(),
    attemptDecision: input.attempt.decision,
    providerPayloadHash: cleanHash(input.attempt.providerPayloadHash),
    providerEventRefHash: cleanOptionalHash(input.providerEventRefHash),
    failureCode: cleanOptionalCode(input.failureCode),
    retryCount: clampNumber(input.retryCount, 0, 20, 0),
    nextRetryAt: cleanIso(input.nextRetryAt),
    requiredGuards: input.attempt.requiredGuards,
    holdReasons: input.attempt.holdReasons,
    suppressionReasons: input.attempt.suppressionReasons,
    providerCallMade: Boolean(input.attempt.decision === "ready-for-provider" && input.toState === "sent"),
    providerSecretRead: Boolean(input.attempt.decision === "ready-for-provider" && input.toState === "sent"),
    browserVisible: false,
    rawCustomerEmailStored: false,
    rawTokenStored: false,
    tokenHashStored: false,
    confirmationUrlStored: false,
    providerPayloadStored: false,
    providerResponseStored: false,
    rawEvidenceStored: false,
    rawBillingDataStored: false,
    internalNotesStored: false,
    secretsStored: false,
  };
}

function deriveToState(attempt: CustomerEmailProviderDispatchAttempt): CustomerEmailDispatchQueueState {
  if (attempt.decision === "suppress") return "suppressed";
  if (attempt.decision === "hold") return "held";
  if (attempt.decision === "dry-run-ready") return "queued";
  return "sending";
}

function deriveTransitionReason(
  attempt: CustomerEmailProviderDispatchAttempt,
  toState: CustomerEmailDispatchQueueState,
): CustomerEmailDispatchAuditTransition["transitionReason"] {
  if (toState === "sent") return "sent";
  if (toState === "failed") return "failed";
  if (toState === "cancelled") return "cancelled";
  if (attempt.decision === "suppress" || toState === "suppressed") return "suppressed";
  if (attempt.decision === "hold" || toState === "held") return "hold";
  if (attempt.decision === "dry-run-ready") return "dry-run";
  if (attempt.decision === "ready-for-provider") return "ready";
  return "queued";
}

async function loadEnvelope(): Promise<StoredAuditEnvelope> {
  return loadFileBackedEnvelope({
    storageDir: STORAGE_DIR,
    storageFile: STORAGE_FILE,
    normalizeEntry,
    sortEntries,
    createTempId: randomUUID,
  });
}

async function saveEnvelope(envelope: StoredAuditEnvelope) {
  await saveFileBackedEnvelope({
    storageDir: STORAGE_DIR,
    storageFile: STORAGE_FILE,
    envelope: { version: 3, entries: sortEntries(envelope.entries) },
    createTempId: randomUUID,
  });
}

function normalizeEntry(value: unknown): CustomerEmailDispatchAuditTransition | null {
  if (!isRecord(value)) return null;
  const queueId = cleanOptionalText(value.queueId, 160);
  const providerPayloadHash = cleanHash(value.providerPayloadHash);
  if (!queueId || !providerPayloadHash) return null;
  const attemptDecision = normalizeAttemptDecision(value.attemptDecision);
  const toState = normalizeState(value.toState);
  return {
    auditId: cleanOptionalText(value.auditId, 160) || randomUUID(),
    queueId,
    templateKey: "confirm-email",
    fromState: normalizeState(value.fromState),
    toState,
    transitionReason: normalizeReason(value.transitionReason, attemptDecision, toState),
    createdAt: cleanIso(value.createdAt) || new Date().toISOString(),
    attemptDecision,
    providerPayloadHash,
    providerEventRefHash: cleanOptionalHash(value.providerEventRefHash),
    failureCode: cleanOptionalCode(value.failureCode),
    retryCount: clampNumber(value.retryCount, 0, 20, 0),
    nextRetryAt: cleanIso(value.nextRetryAt),
    requiredGuards: normalizeStringList(value.requiredGuards),
    holdReasons: normalizeStringList(value.holdReasons),
    suppressionReasons: normalizeStringList(value.suppressionReasons),
    providerCallMade: value.providerCallMade === true,
    providerSecretRead: value.providerSecretRead === true,
    browserVisible: false,
    rawCustomerEmailStored: false,
    rawTokenStored: false,
    tokenHashStored: false,
    confirmationUrlStored: false,
    providerPayloadStored: false,
    providerResponseStored: false,
    rawEvidenceStored: false,
    rawBillingDataStored: false,
    internalNotesStored: false,
    secretsStored: false,
  };
}

function sortEntries(entries: CustomerEmailDispatchAuditTransition[]) {
  return [...entries].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

function normalizeAttemptDecision(value: unknown): CustomerEmailProviderDispatchAttempt["decision"] {
  if (value === "ready-for-provider" || value === "dry-run-ready" || value === "hold" || value === "suppress") return value;
  return "hold";
}

function normalizeState(value: unknown): CustomerEmailDispatchQueueState {
  if (value === "queued" || value === "held" || value === "suppressed" || value === "sending" || value === "sent" || value === "failed" || value === "cancelled") return value;
  return "held";
}

function normalizeReason(
  value: unknown,
  attemptDecision: CustomerEmailProviderDispatchAttempt["decision"],
  toState: CustomerEmailDispatchQueueState,
): CustomerEmailDispatchAuditTransition["transitionReason"] {
  if (value === "queued" || value === "dry-run" || value === "ready" || value === "sent" || value === "hold" || value === "suppressed" || value === "failed" || value === "cancelled") return value;
  return deriveTransitionReason({ decision: attemptDecision } as CustomerEmailProviderDispatchAttempt, toState);
}

function normalizeStringList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => cleanOptionalText(item, 220)).filter(Boolean) as string[];
}

function cleanHash(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim().toLowerCase();
  return /^[a-f0-9]{24,96}$/.test(cleaned) ? cleaned : "";
}

function cleanOptionalHash(value: unknown) {
  const cleaned = cleanHash(value);
  return cleaned || undefined;
}

function cleanOptionalCode(value: unknown) {
  return cleanOptionalText(value, 80)?.replace(/[^a-zA-Z0-9:_-]/g, "");
}

function cleanOptionalText(value: unknown, max: number) {
  if (typeof value !== "string") return undefined;
  const cleaned = value.replace(/\s+/g, " ").trim().slice(0, max);
  return cleaned || undefined;
}

function cleanIso(value: unknown) {
  if (typeof value !== "string") return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function clampNumber(value: unknown, min: number, max: number, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
