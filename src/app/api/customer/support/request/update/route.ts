import { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import path from "node:path";

import { cleanGatewayString, jsonNoStore, optionsNoStore } from "@/lib/customer-access-gateway-runtime";
import { requireCustomerSession } from "@/lib/customer-session-auth-runtime";
import { loadFileBackedEnvelope, saveFileBackedEnvelope, type FileBackedEnvelope } from "@/lib/storage/file-backed-envelope";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CustomerSupportUpdateRequestType = "report-question" | "correction-request" | "billing-help" | "security-concern" | "plan-guidance";
type SupportRiskDecision = "allow" | "sanitize" | "challenge" | "block" | "quarantine";

type StoredSupportRequest = {
  id: string;
  customerIdHash: string;
  businessContext: string;
  requestType: CustomerSupportUpdateRequestType;
  safeDescription: string;
  safeSummary: string;
  decision: SupportRiskDecision;
  riskFlags: string[];
  sourceRoute: "/dashboard/support/request";
  createdAt: string;
  updatedAt: string;
  rawPayloadStored: false;
  customerOwnershipRequired: true;
  supportAuditRequired: true;
  downstreamProcessingAllowed: boolean;
  operatorReviewRequired: boolean;
};

type SupportUpdatePayload = Record<string, unknown>;
type SupportEnvelope = FileBackedEnvelope<StoredSupportRequest>;

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const STORAGE_FILE = path.join(STORAGE_DIR, "customer-support-requests.v3.json");
const MAX_REQUEST_BYTES = 16_000;
const SUPPORT_REQUEST_TYPES = ["report-question", "correction-request", "billing-help", "security-concern", "plan-guidance"] as const satisfies readonly CustomerSupportUpdateRequestType[];

export async function OPTIONS() {
  return optionsNoStore("POST,OPTIONS");
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) return jsonNoStore({ ok: false, error: "The support update is too large to process safely.", details: ["Shorten the safe update summary and submit again."] }, 413);

  const sessionAccess = requireCustomerSession(request, { requireVerifiedEmail: true });
  if (!sessionAccess.ok || !sessionAccess.customerIdHash) {
    return jsonNoStore({ ok: false, error: sessionAccess.safeMessage, details: ["Open the update path from the authenticated customer dashboard and try again."] }, 401);
  }

  let rawBody = "";
  try {
    rawBody = await request.text();
  } catch {
    return jsonNoStore({ ok: false, error: "The support update body could not be read.", details: ["Submit the support update again with a valid JSON payload."] }, 400);
  }

  if (!rawBody.trim()) return jsonNoStore({ ok: false, error: "The support update body is empty.", details: ["Submit a safe update summary before routing the request."] }, 400);
  if (Buffer.byteLength(rawBody, "utf8") > MAX_REQUEST_BYTES) return jsonNoStore({ ok: false, error: "The support update is too large to process safely.", details: ["Shorten the safe update summary and submit again."] }, 413);

  let payload: SupportUpdatePayload;
  try {
    const parsed = JSON.parse(rawBody) as unknown;
    if (!isRecord(parsed)) throw new Error("Payload is not an object.");
    payload = parsed;
  } catch {
    return jsonNoStore({ ok: false, error: "The support update payload is not valid JSON.", details: ["Submit the support update with a valid JSON body."] }, 400);
  }

  const supportRequestId = cleanString(payload.supportRequestId, 120);
  const safeUpdateSummary = cleanString(payload.safeUpdateSummary, 1400);
  const acknowledgement = payload.customerAcknowledgement === true;
  const fieldErrors: Record<string, string> = {};
  if (!supportRequestId) fieldErrors.supportRequestId = "Support request ID is required.";
  if (!safeUpdateSummary || safeUpdateSummary.length < 20) fieldErrors.safeUpdateSummary = "A safe update summary of at least 20 characters is required.";
  if (!acknowledgement) fieldErrors.customerAcknowledgement = "Safety acknowledgement is required before support update.";
  if (Object.keys(fieldErrors).length) return jsonNoStore({ ok: false, error: "The support update needs a stronger safe summary before it can be accepted.", fieldErrors }, 400);

  const risk = evaluateSupportUpdateRisk(safeUpdateSummary);
  if (risk.decision === "block") return jsonNoStore({ ok: false, error: risk.customerMessage, details: risk.details }, 400);

  try {
    const envelope = await loadEnvelope();
    const entryIndex = envelope.entries.findIndex((entry) => entry.id === supportRequestId && entry.customerIdHash === sessionAccess.customerIdHash);
    if (entryIndex < 0) return jsonNoStore({ ok: false, error: "No authorized support request was found for update.", details: ["Check the request ID from your support status page and try again."] }, 404);

    const existing = envelope.entries[entryIndex];
    if (existing.decision !== "sanitize") {
      return jsonNoStore({ ok: false, error: "This request is not waiting for a safe customer update.", details: ["Open support status for the current safe next step."] }, 409);
    }

    const now = new Date().toISOString();
    const updatedEntry: StoredSupportRequest = {
      ...existing,
      safeDescription: safeUpdateSummary,
      safeSummary: buildSafeUpdateSummary({ requestType: existing.requestType, businessContext: existing.businessContext, safeUpdateSummary }),
      decision: risk.decision === "allow" || risk.decision === "sanitize" ? "allow" : risk.decision,
      riskFlags: risk.riskFlags,
      updatedAt: now,
      rawPayloadStored: false,
      customerOwnershipRequired: true,
      supportAuditRequired: true,
      downstreamProcessingAllowed: risk.decision === "allow" || risk.decision === "sanitize",
      operatorReviewRequired: true,
    };

    envelope.entries[entryIndex] = updatedEntry;
    envelope.entries.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
    await saveEnvelope(envelope);

    return jsonNoStore({
      ok: true,
      supportRequestId: updatedEntry.id,
      status: "reviewing",
      message: "The support update was captured with a safe summary and returned to the protected review path.",
      rawPayloadStored: false,
      customerSafeProjectionOnly: true,
    }, 200);
  } catch {
    return jsonNoStore({ ok: false, error: "The support update could not be stored cleanly.", details: ["The support request storage layer was not able to save the update right now."] }, 500);
  }
}

async function loadEnvelope(): Promise<SupportEnvelope> {
  return loadFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, normalizeEntry: normalizeStoredEntryFromUnknown, sortEntries: sortStoredEntriesByUpdatedAt, createTempId: randomUUID });
}

async function saveEnvelope(envelope: SupportEnvelope) {
  await saveFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, envelope, createTempId: randomUUID });
}

function evaluateSupportUpdateRisk(text: string) {
  const lower = text.toLowerCase();
  const riskFlags: string[] = [];
  if (containsAny(lower, ["password", "secret key", "private key", "api key", "bearer ", "token="])) riskFlags.push("secret-or-token-submission");
  if (containsAny(lower, ["card number", "cvv", "routing number", "bank account", "payment card"])) riskFlags.push("payment-data-submission");
  if (containsAny(lower, ["ignore previous instructions", "override policy", "reveal prompt", "system prompt", "developer message"])) riskFlags.push("prompt-injection-or-agent-override");
  if (text.length > 1200) riskFlags.push("raw-evidence-dump");
  if (containsAny(lower, ["guarantee", "guaranteed roi", "refund approved", "legal outcome", "change my report now"])) riskFlags.push("unsafe-promise-demand");

  if (riskFlags.includes("payment-data-submission")) return { decision: "block" as const, riskFlags, customerMessage: "Do not send payment details here. Use the billing center or protected support path instead.", details: ["Remove raw payment information before submitting the update."] };
  if (riskFlags.includes("secret-or-token-submission") || riskFlags.includes("prompt-injection-or-agent-override")) return { decision: "quarantine" as const, riskFlags, customerMessage: "The update needs review before processing safely.", details: ["Remove secrets, credentials, or system-control instructions before continuing."] };
  if (riskFlags.includes("unsafe-promise-demand")) return { decision: "challenge" as const, riskFlags, customerMessage: "Cendorq can review the update, but outcomes require the correct approval path.", details: ["The update will be routed for review without unsupported commitments."] };
  if (riskFlags.includes("raw-evidence-dump")) return { decision: "sanitize" as const, riskFlags, customerMessage: "Please summarize the issue instead of pasting raw evidence.", details: ["The update will be routed using a safe summary only."] };
  return { decision: "allow" as const, riskFlags, customerMessage: "The support update can be accepted.", details: [] };
}

function buildSafeUpdateSummary({ requestType, businessContext, safeUpdateSummary }: { requestType: CustomerSupportUpdateRequestType; businessContext: string; safeUpdateSummary: string }) {
  return [requestType, businessContext, `customer update: ${safeUpdateSummary.slice(0, 420)}`].join(" | ");
}

function normalizeStoredEntryFromUnknown(value: unknown) {
  if (!isRecord(value)) return null;
  const requestType = normalizeRequestType(value.requestType);
  if (!requestType) return null;
  const now = new Date().toISOString();
  return {
    id: cleanString(value.id, 120) || randomUUID(),
    customerIdHash: cleanString(value.customerIdHash, 120),
    businessContext: cleanString(value.businessContext, 160),
    requestType,
    safeDescription: cleanString(value.safeDescription, 1400),
    safeSummary: cleanString(value.safeSummary, 600),
    decision: normalizeDecision(value.decision) || "allow",
    riskFlags: normalizeStringArray(value.riskFlags, 80),
    sourceRoute: "/dashboard/support/request" as const,
    createdAt: normalizeIsoDate(value.createdAt) || now,
    updatedAt: normalizeIsoDate(value.updatedAt) || now,
    rawPayloadStored: false as const,
    customerOwnershipRequired: true as const,
    supportAuditRequired: true as const,
    downstreamProcessingAllowed: value.downstreamProcessingAllowed === true,
    operatorReviewRequired: value.operatorReviewRequired === true,
  } satisfies StoredSupportRequest;
}

function sortStoredEntriesByUpdatedAt(entries: StoredSupportRequest[]) {
  return [...entries].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function normalizeRequestType(value: unknown): CustomerSupportUpdateRequestType | null {
  return typeof value === "string" && SUPPORT_REQUEST_TYPES.includes(value as CustomerSupportUpdateRequestType) ? (value as CustomerSupportUpdateRequestType) : null;
}

function normalizeDecision(value: unknown): SupportRiskDecision | null {
  return value === "allow" || value === "sanitize" || value === "challenge" || value === "block" || value === "quarantine" ? value : null;
}

function normalizeStringArray(value: unknown, maxLength: number) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => cleanString(item, maxLength)).filter(Boolean);
}

function containsAny(value: string, needles: readonly string[]) {
  return needles.some((needle) => value.includes(needle));
}

function cleanString(value: unknown, maxLength: number) {
  return cleanGatewayString(value, maxLength);
}

function normalizeIsoDate(value: unknown) {
  if (typeof value !== "string") return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
