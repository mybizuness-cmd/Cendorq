import { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import path from "node:path";

import { cleanGatewayString, jsonNoStore } from "@/lib/customer-access-gateway-runtime";
import { requireCustomerSupportOperatorAccess, operatorAccessJsonNoStore, operatorAccessOptionsNoStore } from "@/lib/customer-support-operator-access-runtime";
import { buildCustomerSupportOperatorAuditRecord, loadCustomerSupportOperatorAuditEnvelope, mergeCustomerSupportOperatorAuditRecords, saveCustomerSupportOperatorAuditEnvelope } from "@/lib/customer-support-operator-audit-runtime";
import type { CustomerSupportIntakeType } from "@/lib/customer-support-intake-architecture";
import { loadFileBackedEnvelope, type FileBackedEnvelope } from "@/lib/storage/file-backed-envelope";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

type SupportOperatorSafeSummary = Pick<StoredSupportRequest, "id" | "businessContext" | "requestType" | "safeSummary" | "decision" | "sourceRoute" | "createdAt" | "updatedAt" | "rawPayloadStored" | "customerOwnershipRequired" | "supportAuditRequired" | "downstreamProcessingAllowed" | "operatorReviewRequired"> & {
  riskFlagCount: number;
};

type SupportEnvelope = FileBackedEnvelope<StoredSupportRequest>;

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const STORAGE_FILE = path.join(STORAGE_DIR, "customer-support-requests.v3.json");
const MAX_GET_LIMIT = 100;
const SUPPORT_REQUEST_TYPES = ["report-question", "correction-request", "billing-help", "security-concern", "plan-guidance"] as const satisfies readonly CustomerSupportIntakeType[];

export async function OPTIONS() {
  return operatorAccessOptionsNoStore();
}

export async function GET(request: NextRequest) {
  const access = requireCustomerSupportOperatorAccess({
    request,
    surface: "admin-support-api",
    action: "view-safe-summary",
  });
  if (!access.ok) return operatorAccessJsonNoStore(access);

  try {
    const envelope = await loadSupportEnvelope();
    const requestedId = cleanQueryValue(request.nextUrl.searchParams.get("id") ?? "", 120);
    const limit = clampInteger(request.nextUrl.searchParams.get("limit"), 1, MAX_GET_LIMIT, 50);
    const requestType = normalizeRequestType(request.nextUrl.searchParams.get("requestType"));
    const decision = normalizeDecision(request.nextUrl.searchParams.get("decision"));

    const matchingEntries = envelope.entries
      .filter((entry) => (requestedId ? entry.id === requestedId : true))
      .filter((entry) => (requestType ? entry.requestType === requestType : true))
      .filter((entry) => (decision ? entry.decision === decision : true));

    if (requestedId && matchingEntries.length === 0) {
      return jsonNoStore({ ok: false, error: "No authorized safe support summary was found.", details: ["Check the support request ID and keep using the protected operator path."] }, 404);
    }

    const entries = matchingEntries.slice(0, limit).map(projectSupportRequestForOperator);
    const auditBuild = buildCustomerSupportOperatorAuditRecord({
      supportRequestId: requestedId || "support-summary-list",
      customerIdHash: requestedId ? matchingEntries[0]?.customerIdHash ?? "safe-summary-list" : "safe-summary-list",
      operatorRole: access.operatorRole,
      operatorActorRef: access.operatorActorRef,
      action: "view-safe-summary",
      outcome: "viewed",
      approvalGate: "none",
      reasonCode: requestedId ? "support-safe-summary-read" : "support-safe-summary-list-read",
      customerSafeSummary: requestedId ? "Operator viewed one customer-owned safe support summary." : "Operator viewed a bounded list of customer-safe support summaries.",
      now: new Date().toISOString(),
    });

    if (auditBuild.ok) {
      const auditEnvelope = await loadCustomerSupportOperatorAuditEnvelope();
      auditEnvelope.entries = mergeCustomerSupportOperatorAuditRecords(auditEnvelope.entries, [auditBuild.record]);
      await saveCustomerSupportOperatorAuditEnvelope(auditEnvelope);
    }

    return jsonNoStore({ ok: true, returned: entries.length, entries, auditRecorded: auditBuild.ok, projection: "safe-summary-only" }, 200);
  } catch {
    return jsonNoStore({ ok: false, error: "Unable to load safe support summaries.", details: ["The support summary storage layer could not be read cleanly."] }, 500);
  }
}

async function loadSupportEnvelope(): Promise<SupportEnvelope> {
  return loadFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, normalizeEntry: normalizeStoredEntryFromUnknown, sortEntries: sortStoredEntriesByUpdatedAt, createTempId: randomUUID });
}

function projectSupportRequestForOperator(entry: StoredSupportRequest): SupportOperatorSafeSummary {
  return {
    id: entry.id,
    businessContext: entry.businessContext,
    requestType: entry.requestType,
    safeSummary: entry.safeSummary,
    decision: entry.decision,
    riskFlagCount: entry.riskFlags.length,
    sourceRoute: entry.sourceRoute,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
    rawPayloadStored: false,
    customerOwnershipRequired: true,
    supportAuditRequired: true,
    downstreamProcessingAllowed: entry.downstreamProcessingAllowed,
    operatorReviewRequired: entry.operatorReviewRequired,
  };
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
