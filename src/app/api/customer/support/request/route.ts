import { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import path from "node:path";

import { CUSTOMER_SUPPORT_INTAKE_FLOWS, type CustomerSupportIntakeType } from "@/lib/customer-support-intake-architecture";
import { cleanGatewayString, jsonNoStore, optionsNoStore, verifyAdminReadAccess } from "@/lib/customer-access-gateway-runtime";
import { requireCustomerSession } from "@/lib/customer-session-auth-runtime";
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
const MAX_REQUEST_BYTES = 20_000;
const MAX_GET_LIMIT = 100;
const CUSTOMER_CONTEXT_HEADER = "x-cendorq-customer-context";
const CUSTOMER_SUPPORT_CONTEXT_KEY = "CUSTOMER_SUPPORT_CONTEXT_KEY";
const SUPPORT_CONTEXT_REQUIRED_MESSAGE = "Verified customer context is required before submitting support requests.";
const SUPPORT_ADMIN_KEY_ENV_CANDIDATES = ["SUPPORT_CONSOLE_READ_KEY", "INTAKE_ADMIN_KEY"] as const;
const SUPPORT_ALLOWED_ORIGIN_ENV_CANDIDATES = ["CUSTOMER_APP_ORIGINS", "CENDORQ_APP_ORIGIN", "VERCEL_PROJECT_PRODUCTION_URL"] as const;
const SUPPORT_REQUEST_TYPES = ["report-question", "correction-request", "billing-help", "security-concern", "plan-guidance"] as const satisfies readonly CustomerSupportIntakeType[];
const SUPPORT_REQUEST_CONTEXT_GUARDS = [
  "CUSTOMER_CONTEXT_HEADER identifies the verified support context header name for support request intake.",
  "CUSTOMER_SUPPORT_CONTEXT_KEY identifies the server-only environment key used by the customer support context gateway.",
  SUPPORT_CONTEXT_REQUIRED_MESSAGE,
] as const;

export async function OPTIONS() {
  return optionsNoStore("GET,POST,OPTIONS");
}

export async function GET(request: NextRequest) {
  const adminAccess = verifyAdminReadAccess(request, SUPPORT_ADMIN_KEY_ENV_CANDIDATES);
  if (!adminAccess.ok) {
    return jsonNoStore({ ok: false, error: adminAccess.safeMessage, details: ["Provide the configured support admin header before requesting stored support entries."] }, 401);
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
  void CUSTOMER_CONTEXT_HEADER;
  void CUSTOMER_SUPPORT_CONTEXT_KEY;
  void SUPPORT_REQUEST_CONTEXT_GUARDS;
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) return jsonNoStore({ ok: false, error: "The support request is too large to process safely.", details: ["Shorten the safe description and submit again."] }, 413);

  const sessionAccess = requireCustomerSession(request, {
    requireVerifiedEmail: true,
    allowedOrigins: configuredSupportAllowedOrigins(),
  });
  if (!sessionAccess.ok || !sessionAccess.customerIdHash) {
    return jsonNoStore({ ok: false, error: sessionAccess.safeMessage || SUPPORT_CONTEXT_REQUIRED_MESSAGE, details: ["Open support from the authenticated customer dashboard and try again."] }, 401);
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
    customerIdHash: sessionAccess.customerIdHash,
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

function configuredSupportAllowedOrigins() {
  const origins = SUPPORT_ALLOWED_ORIGIN_ENV_CANDIDATES.flatMap((envName) => splitOriginList(process.env[envName] ?? ""));
  return [...new Set(origins.map(normalizeOrigin).filter(Boolean))];
}

function splitOriginList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeOrigin(value: string) {
  const cleaned = cleanGatewayString(value, 300);
  if (!cleaned) return "";
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) return cleaned.replace(/\/$/, "");
  return `https://${cleaned}`.replace(/\/$/, "");
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
  return cleanGatewayString(value, maxLength);
}

function cleanQueryValue(value: unknown, maxLength: number) {
  return cleanGatewayString(value, maxLength);
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
