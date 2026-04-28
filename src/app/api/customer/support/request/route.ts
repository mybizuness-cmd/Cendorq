import { NextRequest, NextResponse } from "next/server";
import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import path from "node:path";

import { CUSTOMER_SUPPORT_INTAKE_FLOWS, type CustomerSupportIntakeType } from "@/lib/customer-support-intake-architecture";
import { loadFileBackedEnvelope, saveFileBackedEnvelope, type FileBackedEnvelope } from "@/lib/storage/file-backed-envelope";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SupportRequestPayload = Record<string, unknown>;
type SupportRiskDecision = "allow" | "sanitize" | "challenge" | "block" | "quarantine";
type StoredSupportRequest = {
  id: string;
  customerIdHash: string;
  businessContext: string;
  requestType: CustomerSupportIntakeType;
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

type SupportEnvelope = FileBackedEnvelope<StoredSupportRequest>;
type SupportRequestView = Omit<StoredSupportRequest, "customerIdHash">;

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const STORAGE_FILE = path.join(STORAGE_DIR, "customer-support-requests.v3.json");
const ADMIN_HEADER = "x-support-admin-key";
const CUSTOMER_CONTEXT_HEADER = "x-cendorq-customer-context";
const MAX_REQUEST_BYTES = 20_000;
const MAX_GET_LIMIT = 100;
const SUPPORT_ADMIN_KEY_ENV_CANDIDATES = ["SUPPORT_CONSOLE_READ_KEY", "INTAKE_ADMIN_KEY"] as const;
const CUSTOMER_CONTEXT_KEY_ENV = "CUSTOMER_SUPPORT_CONTEXT_KEY";
const SUPPORT_REQUEST_TYPES = ["report-question", "correction-request", "billing-help", "security-concern", "plan-guidance"] as const satisfies readonly CustomerSupportIntakeType[];
const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
} as const;

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: { Allow: "GET,POST,OPTIONS", ...NO_STORE_HEADERS } });
}

export async function GET(request: NextRequest) {
  if (!canReadEntries(request)) {
    return jsonNoStore({ ok: false, error: "The support console is not authorized to read requests.", details: ["Provide the configured support admin header before requesting stored support entries."] }, 401);
  }

  try {
    const envelope = await loadEnvelope();
    const requestedId = cleanQueryValue(request.nextUrl.searchParams.get("id") ?? "", 120);
    if (requestedId) {
      const match = envelope.entries.find((entry) => entry.id === requestedId);
      if (!match) return jsonNoStore({ ok: false, error: "The requested support request was not found.", details: ["Check the support request id and try again."] }, 404);
      return jsonNoStore({ ok: true, entry: projectEntryForConsole(match) }, 200);
    }

    const limit = clampInteger(request.nextUrl.searchParams.get("limit"), 1, MAX_GET_LIMIT, 50);
    const requestType = normalizeRequestType(request.nextUrl.searchParams.get("requestType"));
    const decision = normalizeDecision(request.nextUrl.searchParams.get("decision"));
    const entries = envelope.entries
      .filter((entry) => (requestType ? entry.requestType === requestType : true))
      .filter((entry) => (decision ? entry.decision === decision : true))
      .slice(0, limit)
      .map(projectEntryForConsole);

    return jsonNoStore({ ok: true, returned: entries.length, entries }, 200);
  } catch {
    return jsonNoStore({ ok: false, error: "Unable to load support requests.", details: ["The support request storage layer could not be read cleanly."] }, 500);
  }
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) return jsonNoStore({ ok: false, error: "The support request is too large to process safely.", details: ["Shorten the safe description and submit again."] }, 413);

  const contextCheck = verifyCustomerContext(request);
  if (!contextCheck.ok) {
    return jsonNoStore({ ok: false, error: "Verified customer context is required before submitting support requests.", details: ["Open support from the authenticated customer dashboard and try again."] }, 401);
  }

  let rawBody = "";
  try {
    rawBody = await request.text();
  } catch {
    return jsonNoStore({ ok: false, error: "The support request body could not be read.", details: ["Submit the support request again with a valid JSON payload."] }, 400);
  }

  if (!rawBody.trim()) return jsonNoStore({ ok: false, error: "The support request body is empty.", details: ["Submit a safe support summary before routing the request."] }, 400);
  if (Buffer.byteLength(rawBody, "utf8") > MAX_REQUEST_BYTES) return jsonNoStore({ ok: false, error: "The support request is too large to process safely.", details: ["Shorten the safe description and submit again."] }, 413);

  let payload: SupportRequestPayload;
  try {
    const parsed = JSON.parse(rawBody) as unknown;
    if (!isRecord(parsed)) throw new Error("Payload is not an object.");
    payload = parsed;
  } catch {
    return jsonNoStore({ ok: false, error: "The support request payload is not valid JSON.", details: ["Submit the support request with a valid JSON body."] }, 400);
  }

  const requestType = normalizeRequestType(payload.requestType);
  if (!requestType) return jsonNoStore({ ok: false, error: "The support request type is not supported.", details: ["Choose report question, correction request, billing help, security concern, or plan guidance."] }, 400);

  const flow = CUSTOMER_SUPPORT_INTAKE_FLOWS.find((candidate) => candidate.key === requestType);
  if (!flow) return jsonNoStore({ ok: false, error: "The support request flow is not configured.", details: ["Choose a supported support path and try again."] }, 400);

  const businessContext = cleanString(payload.businessContext, 160);
  const safeDescription = cleanString(payload.safeDescription, 1400);
  const acknowledgement = payload.customerAcknowledgement === true;
  const fieldErrors: Record<string, string> = {};
  if (!businessContext) fieldErrors.businessContext = "Business or account context is required.";
  if (!safeDescription || safeDescription.length < 20) fieldErrors.safeDescription = "A safe support description of at least 20 characters is required.";
  if (!acknowledgement) fieldErrors.customerAcknowledgement = "Safety acknowledgement is required before support intake.";
  if (Object.keys(fieldErrors).length) return jsonNoStore({ ok: false, error: "The support request needs a stronger safe summary before it can be accepted.", fieldErrors }, 400);

  const risk = evaluateSupportRisk([businessContext, safeDescription].join(" "), requestType);
  if (risk.decision === "block") return jsonNoStore({ ok: false, error: risk.customerMessage, details: risk.details }, 400);

  const now = new Date().toISOString();
  const storedEntry: StoredSupportRequest = {
    id: randomUUID(),
    customerIdHash: contextCheck.customerIdHash,
    businessContext,
    requestType,
    safeDescription,
    safeSummary: buildSafeSummary({ requestType, businessContext, safeDescription }),
    decision: risk.decision,
    riskFlags: risk.riskFlags,
    sourceRoute: "/dashboard/support/request",
    createdAt: now,
    updatedAt: now,
    rawPayloadStored: false,
    customerOwnershipRequired: true,
    supportAuditRequired: true,
    downstreamProcessingAllowed: risk.decision === "allow" || risk.decision === "sanitize",
    operatorReviewRequired: risk.decision !== "allow" || requestType === "correction-request" || requestType === "security-concern" || requestType === "billing-help",
  };

  try {
    const envelope = await loadEnvelope();
    envelope.entries.unshift(storedEntry);
    envelope.entries.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
    await saveEnvelope(envelope);
    return jsonNoStore({ ok: true, supportRequestId: storedEntry.id, requestType, decision: storedEntry.decision, operatorReviewRequired: storedEntry.operatorReviewRequired, downstreamProcessingAllowed: storedEntry.downstreamProcessingAllowed, message: "The support request was captured with a safe summary and routed through the protected support path." }, 200);
  } catch {
    return jsonNoStore({ ok: false, error: "The support request could not be stored cleanly.", details: ["The support request storage layer was not able to save the request right now."] }, 500);
  }
}

async function loadEnvelope(): Promise<SupportEnvelope> {
  return loadFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, normalizeEntry: normalizeStoredEntryFromUnknown, sortEntries: sortStoredEntriesByUpdatedAt, createTempId: randomUUID });
}

async function saveEnvelope(envelope: SupportEnvelope) {
  await saveFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, envelope, createTempId: randomUUID });
}

function verifyCustomerContext(request: NextRequest) {
  const configuredKey = cleanQueryValue(process.env[CUSTOMER_CONTEXT_KEY_ENV] ?? "", 200);
  if (!configuredKey && process.env.NODE_ENV !== "production") return { ok: true as const, customerIdHash: "local-development-context" };
  const providedKey = cleanQueryValue(request.headers.get(CUSTOMER_CONTEXT_HEADER) ?? "", 200);
  if (!configuredKey || !providedKey || !safeEqual(providedKey, configuredKey)) return { ok: false as const, customerIdHash: "" };
  return { ok: true as const, customerIdHash: createHash("sha256").update(providedKey).digest("hex").slice(0, 24) };
}

function canReadEntries(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") return true;
  const configuredKey = configuredReadKey();
  if (!configuredKey) return false;
  const providedKey = cleanQueryValue(request.headers.get(ADMIN_HEADER) ?? "", 200);
  return providedKey ? safeEqual(providedKey, configuredKey) : false;
}

function configuredReadKey() {
  for (const envName of SUPPORT_ADMIN_KEY_ENV_CANDIDATES) {
    const value = cleanQueryValue(process.env[envName] ?? "", 200);
    if (value) return value;
  }
  return "";
}

function evaluateSupportRisk(text: string, requestType: CustomerSupportIntakeType) {
  const lower = text.toLowerCase();
  const riskFlags: string[] = [];
  if (containsAny(lower, ["password", "secret key", "private key", "api key", "bearer ", "token="])) riskFlags.push("secret-or-token-submission");
  if (containsAny(lower, ["card number", "cvv", "routing number", "bank account", "payment card"])) riskFlags.push("payment-data-submission");
  if (containsAny(lower, ["ignore previous instructions", "override policy", "reveal prompt", "system prompt", "developer message"])) riskFlags.push("prompt-injection-or-agent-override");
  if (text.length > 1200) riskFlags.push("raw-evidence-dump");
  if (containsAny(lower, ["guarantee", "guaranteed roi", "refund approved", "legal outcome", "change my report now"])) riskFlags.push("unsafe-promise-demand");
  if (requestType === "security-concern" && containsAny(lower, ["malware", "payload", "exploit", "session cookie"])) riskFlags.push("security-sensitive-content");

  if (riskFlags.includes("payment-data-submission")) return { decision: "block" as const, riskFlags, customerMessage: "Do not send payment details here. Use the billing center or support path instead.", details: ["Remove raw payment information before submitting support intake."] };
  if (riskFlags.includes("secret-or-token-submission") || riskFlags.includes("prompt-injection-or-agent-override")) return { decision: "quarantine" as const, riskFlags, customerMessage: "The request needs review before processing safely.", details: ["Remove secrets, credentials, or system-control instructions before continuing."] };
  if (riskFlags.includes("unsafe-promise-demand") || riskFlags.includes("security-sensitive-content")) return { decision: "challenge" as const, riskFlags, customerMessage: "Cendorq can review the request, but outcomes require the correct approval path.", details: ["The request will be routed for review without unsupported commitments."] };
  if (riskFlags.includes("raw-evidence-dump")) return { decision: "sanitize" as const, riskFlags, customerMessage: "Please summarize the issue instead of pasting raw evidence.", details: ["The request will be routed using a safe summary only."] };
  return { decision: "allow" as const, riskFlags, customerMessage: "The support request can be accepted.", details: [] };
}

function buildSafeSummary({ requestType, businessContext, safeDescription }: { requestType: CustomerSupportIntakeType; businessContext: string; safeDescription: string }) {
  return [requestType, businessContext, safeDescription.slice(0, 420)].join(" | ");
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

function projectEntryForConsole(entry: StoredSupportRequest): SupportRequestView {
  const { customerIdHash: _customerIdHash, ...rest } = entry;
  return rest;
}

function normalizeRequestType(value: unknown): CustomerSupportIntakeType | null {
  return typeof value === "string" && SUPPORT_REQUEST_TYPES.includes(value as CustomerSupportIntakeType) ? (value as CustomerSupportIntakeType) : null;
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
  if (typeof value !== "string") return "";
  return value.normalize("NFKC").replace(/<[^>]*>/g, " ").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanQueryValue(value: unknown, maxLength: number) {
  return cleanString(value, maxLength);
}

function clampInteger(value: unknown, min: number, max: number, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}

function normalizeIsoDate(value: unknown) {
  if (typeof value !== "string") return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function jsonNoStore(payload: unknown, status: number) {
  return NextResponse.json(payload, { status, headers: NO_STORE_HEADERS });
}
