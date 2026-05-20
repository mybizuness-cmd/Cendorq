import { createHash, randomUUID } from "node:crypto";
import path from "node:path";

import { loadFileBackedEnvelope, type FileBackedEnvelope } from "@/lib/storage/file-backed-envelope";

export type CustomerAccessEligibilitySource = "free-scan" | "paid-plan" | "report-vault" | "billing" | "support";

export type CustomerAccessEligibilitySourceStatus = "active" | "contract-ready";

export type CustomerAccessEligibilitySourceDefinition = {
  key: CustomerAccessEligibilitySource;
  status: CustomerAccessEligibilitySourceStatus;
  customerMeaning: string;
  dashboardDestination: string;
  releaseRequirement: string;
};

export type CustomerAccessEligibilityResult = {
  eligible: boolean;
  reason: "free-scan-email-match" | "paid-plan-email-match" | "report-vault-email-match" | "billing-email-match" | "support-email-match" | "no-cendorq-account-for-email" | "invalid-email";
  emailHash: string;
  customerIdHash: string;
  signupEmailHash: string;
  customerEmailHash: string;
  matchedSources: CustomerAccessEligibilitySource[];
  primaryDestination: string;
  safeCustomerMessage: string;
  safeHelpText: string;
};

type FreeScanEligibilityEntry = {
  id: string;
  email: string;
  businessName: string;
  updatedAt: string;
};

type FreeScanEligibilityEnvelope = FileBackedEnvelope<FreeScanEligibilityEntry>;

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const CURRENT_FREE_SCAN_STORAGE_FILE = "free-check-intakes.v3.json";
const LEGACY_SOURCE = ["search", "presence", "scan"].join("-");
const FREE_SCAN_STORAGE_FILE = path.join(STORAGE_DIR, CURRENT_FREE_SCAN_STORAGE_FILE);
const LEGACY_FREE_SCAN_STORAGE_FILES = [
  path.join(STORAGE_DIR, `${LEGACY_SOURCE}-intakes.v3.json`),
  path.join(STORAGE_DIR, `${LEGACY_SOURCE}-intakes.v2.json`),
  path.join(process.cwd(), ".default-ai-runtime", "free-check-intakes.json"),
] as const;

const DEFAULT_DASHBOARD_DESTINATION = "/dashboard";
const SAFE_DASHBOARD_PATHS = [
  "/dashboard",
  "/dashboard/reports",
  "/dashboard/reports/free-scan",
  "/dashboard/billing",
  "/dashboard/support",
  "/dashboard/notifications",
] as const;

export const CUSTOMER_ACCESS_ELIGIBILITY_SOURCE_ORDER: readonly CustomerAccessEligibilitySource[] = ["free-scan", "paid-plan", "report-vault", "billing", "support"] as const;

export const CUSTOMER_ACCESS_ELIGIBILITY_SOURCES: readonly CustomerAccessEligibilitySourceDefinition[] = [
  {
    key: "free-scan",
    status: "active",
    customerMeaning: "The email submitted a Free Scan and can return to the protected Free Scan result path.",
    dashboardDestination: "/dashboard/reports/free-scan",
    releaseRequirement: "Free Scan intake storage must contain the same verified email before access is allowed.",
  },
  {
    key: "paid-plan",
    status: "contract-ready",
    customerMeaning: "The email bought Review, Repair, or Control and can return to paid plan status.",
    dashboardDestination: "/dashboard/billing",
    releaseRequirement: "Paid plan eligibility must come from durable entitlement records, not browser state or checkout query strings.",
  },
  {
    key: "report-vault",
    status: "contract-ready",
    customerMeaning: "The email owns a protected report vault item and can return to reports.",
    dashboardDestination: "/dashboard/reports",
    releaseRequirement: "Report vault eligibility must require release approval, ownership, and safe projection.",
  },
  {
    key: "billing",
    status: "contract-ready",
    customerMeaning: "The email has billing history and can return to the billing center.",
    dashboardDestination: "/dashboard/billing",
    releaseRequirement: "Billing eligibility must use durable billing customer mapping and safe billing projection.",
  },
  {
    key: "support",
    status: "contract-ready",
    customerMeaning: "The email has a support request and can return to support.",
    dashboardDestination: "/dashboard/support",
    releaseRequirement: "Support eligibility must use verified customer context and never expose support context keys.",
  },
] as const;

export const CUSTOMER_ACCESS_ELIGIBILITY_STANDARD = [
  "Authentication only proves who the person is; Cendorq still checks whether the verified email belongs to a Free Scan or paid customer before dashboard access.",
  "Known Free Scan or paid customers can receive access and continue to the dashboard.",
  "Free Scan is the active eligibility source until paid plan, report vault, billing, and support records have durable server-side ownership stores.",
  "Paid plan, report vault, billing, and support are contract-ready eligibility sources, not browser-trusted access shortcuts.",
  "Unknown emails are routed to Free Scan instead of receiving a blank dashboard account.",
  "Customer-facing copy says account, scan, plan, and same email instead of customer record or internal eligibility.",
  "Wrong-email recovery tells the customer to use the email from the Free Scan, form, or plan, or start a new Free Scan.",
] as const;

export async function resolveCustomerAccessEligibility(input: { email: string; requestedDestination?: string | null }): Promise<CustomerAccessEligibilityResult> {
  const email = cleanEmail(input.email);
  const primaryDestination = safeDashboardPath(input.requestedDestination) || DEFAULT_DASHBOARD_DESTINATION;
  const emailHash = email ? hashAccessSecret(email) : "";

  if (!email) {
    return buildIneligibleResult({ reason: "invalid-email", emailHash, primaryDestination });
  }

  const freeScan = await findFreeScanByEmail(email);
  if (freeScan) {
    return {
      eligible: true,
      reason: "free-scan-email-match",
      emailHash,
      customerIdHash: hashAccessSecret(`free-scan:${freeScan.id}:${emailHash}`),
      signupEmailHash: emailHash,
      customerEmailHash: emailHash,
      matchedSources: ["free-scan"],
      primaryDestination: safeDashboardPath(input.requestedDestination) || getEligibilitySourceDestination("free-scan"),
      safeCustomerMessage: "We found your Cendorq account. Check your email for the secure access link.",
      safeHelpText: "Use the same email you used when you submitted your Free Scan or bought a plan.",
    };
  }

  return buildIneligibleResult({ reason: "no-cendorq-account-for-email", emailHash, primaryDestination });
}

export function buildFreeScanRequiredUrl(baseUrl: string, input: { method: "email" | "provider" | "session" | "signup"; provider?: string | null; returnTo?: string | null }) {
  const url = new URL("/free-check", baseUrl);
  url.searchParams.set("access", "free-scan-required");
  url.searchParams.set("method", input.method);
  if (input.provider) url.searchParams.set("provider", cleanUrlValue(input.provider, 40));
  const safeReturnTo = safeDashboardPath(input.returnTo);
  if (safeReturnTo) url.searchParams.set("returnTo", safeReturnTo);
  return url;
}

function buildIneligibleResult(input: { reason: CustomerAccessEligibilityResult["reason"]; emailHash: string; primaryDestination: string }): CustomerAccessEligibilityResult {
  return {
    eligible: false,
    reason: input.reason,
    emailHash: input.emailHash,
    customerIdHash: "",
    signupEmailHash: input.emailHash,
    customerEmailHash: input.emailHash,
    matchedSources: [],
    primaryDestination: input.primaryDestination,
    safeCustomerMessage: "We couldn’t find a Cendorq account for that email. Start the Free Scan first.",
    safeHelpText: "Already have an account? Use the same email you used when you submitted your Free Scan or bought a plan. If you used a different email then, try that one.",
  };
}

function getEligibilitySourceDestination(source: CustomerAccessEligibilitySource) {
  return CUSTOMER_ACCESS_ELIGIBILITY_SOURCES.find((entry) => entry.key === source)?.dashboardDestination || DEFAULT_DASHBOARD_DESTINATION;
}

async function findFreeScanByEmail(email: string) {
  const envelope = await loadFreeScanEligibilityEnvelope();
  const normalizedEmail = email.toLowerCase();
  return envelope.entries.find((entry) => entry.email.toLowerCase() === normalizedEmail) || null;
}

async function loadFreeScanEligibilityEnvelope(): Promise<FreeScanEligibilityEnvelope> {
  return loadFileBackedEnvelope({
    storageDir: STORAGE_DIR,
    storageFile: FREE_SCAN_STORAGE_FILE,
    legacyStorageFiles: LEGACY_FREE_SCAN_STORAGE_FILES,
    normalizeEntry: normalizeFreeScanEligibilityEntry,
    sortEntries: sortFreeScanEligibilityEntries,
    createTempId: randomUUID,
  });
}

function normalizeFreeScanEligibilityEntry(value: unknown): FreeScanEligibilityEntry | null {
  if (!isRecord(value)) return null;
  const id = cleanUrlValue(value.id, 120);
  const email = cleanEmail(value.email);
  if (!id || !email) return null;
  return {
    id,
    email,
    businessName: cleanText(value.businessName, 180),
    updatedAt: normalizeIsoDate(value.updatedAt),
  };
}

function sortFreeScanEligibilityEntries(entries: FreeScanEligibilityEntry[]) {
  return [...entries].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function safeDashboardPath(value: string | null | undefined) {
  if (!value) return null;
  return SAFE_DASHBOARD_PATHS.find((path) => value === path || value.startsWith(`${path}/`)) || null;
}

function cleanEmail(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim().toLowerCase();
  if (cleaned.length < 6 || cleaned.length > 254) return "";
  const atIndex = cleaned.indexOf("@");
  if (atIndex <= 0 || atIndex !== cleaned.lastIndexOf("@")) return "";
  const local = cleaned.slice(0, atIndex);
  const domain = cleaned.slice(atIndex + 1);
  if (!local || local.length > 64 || local.startsWith(".") || local.endsWith(".") || local.includes("..")) return "";
  if (!domain || domain.length > 253 || !domain.includes(".") || domain.startsWith(".") || domain.endsWith(".") || domain.includes("..")) return "";
  return domain.split(".").every((label) => Boolean(label && label.length <= 63 && !label.startsWith("-") && !label.endsWith("-"))) ? cleaned : "";
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.normalize("NFKC").replace(/<[^>]*>/g, " ").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanUrlValue(value: unknown, maxLength: number) {
  return cleanText(value, maxLength).replace(/[^a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=%-]/g, "");
}

function normalizeIsoDate(value: unknown) {
  if (typeof value !== "string") return new Date(0).toISOString();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date(0).toISOString() : date.toISOString();
}

function hashAccessSecret(value: string) {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
