import { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import path from "node:path";

import { jsonNoStore, optionsNoStore, cleanGatewayString } from "@/lib/customer-access-gateway-runtime";
import { requireCustomerSession } from "@/lib/customer-session-auth-runtime";
import { CUSTOMER_SUPPORT_STATUS_CONTRACTS, type CustomerSupportCustomerVisibleStatus } from "@/lib/customer-support-status-contracts";
import { loadFileBackedEnvelope, type FileBackedEnvelope } from "@/lib/storage/file-backed-envelope";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CustomerSupportStatusRequestType = "report-question" | "correction-request" | "billing-help" | "security-concern" | "plan-guidance";
type SupportRiskDecision = "allow" | "sanitize" | "challenge" | "block" | "quarantine";

type StoredSupportRequest = {
  id: string;
  customerIdHash: string;
  businessContext: string;
  requestType: CustomerSupportStatusRequestType;
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

type SupportStatusEnvelope = FileBackedEnvelope<StoredSupportRequest>;

type CustomerSupportStatusView = {
  supportRequestId: string;
  requestType: CustomerSupportStatusRequestType;
  businessContext: string;
  safeSummary: string;
  customerVisibleStatus: CustomerSupportCustomerVisibleStatus;
  customerSafeStatus: string;
  statusLabel: string;
  statusCopy: string;
  primaryCta: string;
  primaryPath: string;
  createdAt: string;
  updatedAt: string;
  operatorReviewRequired: boolean;
  downstreamProcessingAllowed: boolean;
};

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const STORAGE_FILE = path.join(STORAGE_DIR, "customer-support-requests.v3.json");
const MAX_GET_LIMIT = 50;
const SUPPORT_REQUEST_TYPES = ["report-question", "correction-request", "billing-help", "security-concern", "plan-guidance"] as const satisfies readonly CustomerSupportStatusRequestType[];

export async function OPTIONS() {
  return optionsNoStore("GET,OPTIONS");
}

export async function GET(request: NextRequest) {
  const sessionAccess = requireCustomerSession(request, { requireVerifiedEmail: true });
  if (!sessionAccess.ok || !sessionAccess.customerIdHash) {
    return jsonNoStore({ ok: false, error: sessionAccess.safeMessage, details: ["Open support status from the authenticated customer dashboard and try again."] }, 401);
  }

  try {
    const envelope = await loadEnvelope();
    const requestedId = cleanGatewayString(request.nextUrl.searchParams.get("id") ?? "", 120);
    const requestType = normalizeRequestType(request.nextUrl.searchParams.get("requestType"));
    const limit = clampInteger(request.nextUrl.searchParams.get("limit"), 1, MAX_GET_LIMIT, 20);

    const ownedEntries = envelope.entries.filter((entry) => entry.customerIdHash === sessionAccess.customerIdHash);

    if (requestedId) {
      const match = ownedEntries.find((entry) => entry.id === requestedId);
      if (!match) {
        return jsonNoStore({ ok: false, error: "No authorized support status was found.", details: ["Check the request ID from your dashboard and try again."] }, 404);
      }

      return jsonNoStore({ ok: true, entry: projectSupportStatus(match) }, 200);
    }

    const entries = ownedEntries
      .filter((entry) => (requestType ? entry.requestType === requestType : true))
      .slice(0, limit)
      .map(projectSupportStatus);

    return jsonNoStore({ ok: true, returned: entries.length, entries }, 200);
  } catch {
    return jsonNoStore({ ok: false, error: "Unable to load support status safely.", details: ["The support status storage layer could not be read cleanly."] }, 500);
  }
}

async function loadEnvelope(): Promise<SupportStatusEnvelope> {
  return loadFileBackedEnvelope({
    storageDir: STORAGE_DIR,
    storageFile: STORAGE_FILE,
    normalizeEntry: normalizeStoredEntryFromUnknown,
    sortEntries: sortStoredEntriesByUpdatedAt,
    createTempId: randomUUID,
  });
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

function projectSupportStatus(entry: StoredSupportRequest): CustomerSupportStatusView {
  const customerVisibleStatus = mapCustomerVisibleStatus(entry);
  const statusContract = CUSTOMER_SUPPORT_STATUS_CONTRACTS.find((candidate) => candidate.key === customerVisibleStatus) ?? CUSTOMER_SUPPORT_STATUS_CONTRACTS[0];

  return {
    supportRequestId: entry.id,
    requestType: entry.requestType,
    businessContext: entry.businessContext,
    safeSummary: entry.safeSummary,
    customerVisibleStatus,
    customerSafeStatus: statusContract.customerMeaning,
    statusLabel: statusContract.label,
    statusCopy: statusContract.allowedCustomerCopy,
    primaryCta: statusContract.allowedPrimaryCta,
    primaryPath: statusContract.allowedPrimaryPath,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
    operatorReviewRequired: entry.operatorReviewRequired,
    downstreamProcessingAllowed: entry.downstreamProcessingAllowed,
  };
}

function mapCustomerVisibleStatus(entry: StoredSupportRequest): CustomerSupportCustomerVisibleStatus {
  if (entry.decision === "sanitize") return "waiting-on-customer";
  if (entry.decision === "challenge" || entry.decision === "quarantine") return "in-specialist-review";
  if (entry.operatorReviewRequired) return "reviewing";
  return "received";
}

function sortStoredEntriesByUpdatedAt(entries: StoredSupportRequest[]) {
  return [...entries].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function normalizeRequestType(value: unknown): CustomerSupportStatusRequestType | null {
  return typeof value === "string" && SUPPORT_REQUEST_TYPES.includes(value as CustomerSupportStatusRequestType) ? (value as CustomerSupportStatusRequestType) : null;
}

function normalizeDecision(value: unknown): SupportRiskDecision | null {
  return value === "allow" || value === "sanitize" || value === "challenge" || value === "block" || value === "quarantine" ? value : null;
}

function normalizeStringArray(value: unknown, maxLength: number) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => cleanString(item, maxLength)).filter(Boolean);
}

function cleanString(value: unknown, maxLength: number) {
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
