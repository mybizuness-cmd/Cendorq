import { createHash, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import path from "node:path";

import {
  projectCustomerEmailConfirmationHandoff,
  type CustomerEmailConfirmationJourneyKey,
} from "./customer-email-confirmation-handoff-runtime";
import { loadFileBackedEnvelope, saveFileBackedEnvelope, type FileBackedEnvelope } from "./storage/file-backed-envelope";

export type CustomerEmailVerificationTokenEntry = {
  id: string;
  tokenHash: string;
  customerIdHash: string;
  signupEmailHash: string;
  journeyKey: CustomerEmailConfirmationJourneyKey;
  requestedDestination: string;
  intakeId?: string;
  createdAt: string;
  expiresAt: string;
  consumedAt?: string;
  issueReason: "initial-confirmation" | "resend-confirmation" | "account-recovery";
  resendCount: number;
};

export type IssueCustomerEmailVerificationTokenInput = {
  customerIdHash: string;
  signupEmailHash: string;
  journeyKey: CustomerEmailConfirmationJourneyKey;
  requestedDestination?: string | null;
  intakeId?: string | null;
  issueReason?: CustomerEmailVerificationTokenEntry["issueReason"];
  ttlMinutes?: number;
};

export type IssuedCustomerEmailVerificationToken = {
  token: string;
  tokenId: string;
  expiresAt: string;
  destination: string;
  senderDisplay: "Cendorq Support <support@cendorq.com>";
  subject: string;
  primaryCta: string;
};

export type VerifyCustomerEmailConfirmationTokenInput = {
  token: string | null | undefined;
  requestedDestination?: string | null;
  safeReleaseReady?: boolean;
};

export type CustomerEmailVerificationResult = {
  ok: boolean;
  decision: "verified-redirect" | "resend-required" | "already-used" | "hold";
  status: 200 | 303 | 409;
  noStore: true;
  redirectPath: string;
  senderDisplay: "Cendorq Support <support@cendorq.com>";
  safeCustomerMessage: string;
  reportVisibilityRule: string;
  dashboardModule: string;
  tokenState: {
    tokenAccepted: boolean;
    tokenConsumed: boolean;
    tokenExpired: boolean;
    tokenAlreadyUsed: boolean;
    rawTokenReturned: false;
    tokenHashReturned: false;
    localStorageAllowed: false;
    sessionStorageAllowed: false;
  };
  blockedPatterns: readonly string[];
};

type StoredTokenEnvelope = FileBackedEnvelope<CustomerEmailVerificationTokenEntry>;

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const STORAGE_FILE = path.join(STORAGE_DIR, "customer-email-verification-tokens.v3.json");
const DEFAULT_TTL_MINUTES = 60 * 24;
const MAX_TTL_MINUTES = 60 * 24 * 3;
const TOKEN_PREFIX = "cev";
const DEFAULT_DESTINATION = "/dashboard";
const GENERIC_FAILURE_MESSAGE = "We could not verify that email confirmation link safely. Request a new confirmation email from your Cendorq dashboard or Free Scan page.";

export async function issueCustomerEmailVerificationToken(
  input: IssueCustomerEmailVerificationTokenInput,
): Promise<IssuedCustomerEmailVerificationToken> {
  const token = `${TOKEN_PREFIX}_${randomBytes(32).toString("base64url")}`;
  const tokenHash = hashToken(token);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + clampTtl(input.ttlMinutes) * 60_000).toISOString();
  const projection = projectCustomerEmailConfirmationHandoff({
    journeyKey: input.journeyKey,
    customerIdHashPresent: isSafeHash(input.customerIdHash),
    signupEmailPresent: isSafeHash(input.signupEmailHash),
    emailAlreadyVerified: false,
    verificationTokenIssued: true,
    customerOwnedDestination: isSafeHash(input.customerIdHash),
    requestedDestination: input.requestedDestination,
  });
  const entry: CustomerEmailVerificationTokenEntry = {
    id: randomUUID(),
    tokenHash,
    customerIdHash: cleanHash(input.customerIdHash),
    signupEmailHash: cleanHash(input.signupEmailHash),
    journeyKey: input.journeyKey,
    requestedDestination: projection.verifiedDestination,
    intakeId: cleanOptionalIdentifier(input.intakeId),
    createdAt: now.toISOString(),
    expiresAt,
    issueReason: input.issueReason ?? "initial-confirmation",
    resendCount: input.issueReason === "resend-confirmation" ? 1 : 0,
  };

  const envelope = await loadEnvelope();
  envelope.entries.unshift(entry);
  await saveEnvelope(envelope);

  return {
    token,
    tokenId: entry.id,
    expiresAt,
    destination: projection.verifiedDestination,
    senderDisplay: projection.senderDisplay,
    subject: projection.subject,
    primaryCta: projection.primaryCta,
  };
}

export async function verifyCustomerEmailConfirmationToken(
  input: VerifyCustomerEmailConfirmationTokenInput,
): Promise<CustomerEmailVerificationResult> {
  const token = cleanToken(input.token);
  if (!token) return buildFailureResult("resend-required", false, false, false, ["verificationTokenMissing"]);

  const envelope = await loadEnvelope();
  const tokenHash = hashToken(token);
  const index = envelope.entries.findIndex((entry) => safeEqual(entry.tokenHash, tokenHash));
  const entry = index >= 0 ? envelope.entries[index] : null;
  if (!entry) return buildFailureResult("resend-required", false, false, false, ["verificationTokenInvalid"]);

  const now = new Date();
  const expired = new Date(entry.expiresAt).getTime() <= now.getTime();
  if (entry.consumedAt) return buildStoredResult(entry, "already-used", false, true, expired, input.safeReleaseReady, input.requestedDestination);
  if (expired) return buildStoredResult(entry, "resend-required", false, false, true, input.safeReleaseReady, input.requestedDestination);

  const consumedEntry = { ...entry, consumedAt: now.toISOString() };
  envelope.entries[index] = consumedEntry;
  await saveEnvelope(envelope);

  return buildStoredResult(consumedEntry, "verified-redirect", true, true, false, input.safeReleaseReady, input.requestedDestination);
}

export function getCustomerEmailVerificationNoStoreHeaders() {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "Surrogate-Control": "no-store",
  } as const;
}

function buildStoredResult(
  entry: CustomerEmailVerificationTokenEntry,
  decision: CustomerEmailVerificationResult["decision"],
  accepted: boolean,
  consumed: boolean,
  expired: boolean,
  safeReleaseReady: boolean | undefined,
  requestedDestination: string | null | undefined,
): CustomerEmailVerificationResult {
  const projection = projectCustomerEmailConfirmationHandoff({
    journeyKey: entry.journeyKey,
    customerIdHashPresent: Boolean(entry.customerIdHash),
    signupEmailPresent: Boolean(entry.signupEmailHash),
    emailAlreadyVerified: accepted,
    verificationTokenIssued: true,
    verificationTokenConsumed: consumed,
    verificationTokenExpired: expired,
    safeReleaseReady,
    customerOwnedDestination: Boolean(entry.customerIdHash),
    requestedDestination: requestedDestination || entry.requestedDestination,
  });
  const verified = decision === "verified-redirect";
  return {
    ok: verified,
    decision,
    status: verified ? 303 : 409,
    noStore: true,
    redirectPath: verified ? projection.verifiedDestination : DEFAULT_DESTINATION,
    senderDisplay: projection.senderDisplay,
    safeCustomerMessage: verified ? projection.safeCustomerMessage : GENERIC_FAILURE_MESSAGE,
    reportVisibilityRule: projection.reportVisibilityRule,
    dashboardModule: projection.dashboardModule,
    tokenState: {
      tokenAccepted: accepted,
      tokenConsumed: consumed,
      tokenExpired: expired,
      tokenAlreadyUsed: decision === "already-used",
      rawTokenReturned: false,
      tokenHashReturned: false,
      localStorageAllowed: false,
      sessionStorageAllowed: false,
    },
    blockedPatterns: projection.blockedPatterns,
  };
}

function buildFailureResult(
  decision: CustomerEmailVerificationResult["decision"],
  accepted: boolean,
  consumed: boolean,
  expired: boolean,
  blockedPatterns: readonly string[],
): CustomerEmailVerificationResult {
  return {
    ok: false,
    decision,
    status: 409,
    noStore: true,
    redirectPath: DEFAULT_DESTINATION,
    senderDisplay: "Cendorq Support <support@cendorq.com>",
    safeCustomerMessage: GENERIC_FAILURE_MESSAGE,
    reportVisibilityRule: "Only show customer-owned safe projections after email verification and safe release state.",
    dashboardModule: "safe resend or dashboard recovery path",
    tokenState: {
      tokenAccepted: accepted,
      tokenConsumed: consumed,
      tokenExpired: expired,
      tokenAlreadyUsed: decision === "already-used",
      rawTokenReturned: false,
      tokenHashReturned: false,
      localStorageAllowed: false,
      sessionStorageAllowed: false,
    },
    blockedPatterns,
  };
}

async function loadEnvelope(): Promise<StoredTokenEnvelope> {
  return loadFileBackedEnvelope({
    storageDir: STORAGE_DIR,
    storageFile: STORAGE_FILE,
    normalizeEntry,
    sortEntries,
    createTempId: randomUUID,
  });
}

async function saveEnvelope(envelope: StoredTokenEnvelope) {
  await saveFileBackedEnvelope({ storageDir: STORAGE_DIR, storageFile: STORAGE_FILE, envelope: { version: 3, entries: sortEntries(envelope.entries) }, createTempId: randomUUID });
}

function normalizeEntry(value: unknown): CustomerEmailVerificationTokenEntry | null {
  if (!isRecord(value)) return null;
  const tokenHash = cleanHash(value.tokenHash);
  const customerIdHash = cleanHash(value.customerIdHash);
  const signupEmailHash = cleanHash(value.signupEmailHash);
  const journeyKey = normalizeJourneyKey(value.journeyKey);
  const createdAt = normalizeIso(value.createdAt);
  const expiresAt = normalizeIso(value.expiresAt);
  if (!tokenHash || !customerIdHash || !signupEmailHash || !journeyKey || !createdAt || !expiresAt) return null;
  return {
    id: cleanOptionalIdentifier(value.id) || randomUUID(),
    tokenHash,
    customerIdHash,
    signupEmailHash,
    journeyKey,
    requestedDestination: cleanDestination(value.requestedDestination) || DEFAULT_DESTINATION,
    intakeId: cleanOptionalIdentifier(value.intakeId),
    createdAt,
    expiresAt,
    consumedAt: normalizeIso(value.consumedAt),
    issueReason: normalizeIssueReason(value.issueReason),
    resendCount: clampNumber(value.resendCount, 0, 100, 0),
  };
}

function sortEntries(entries: CustomerEmailVerificationTokenEntry[]) {
  return [...entries].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function cleanToken(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim();
  return /^cev_[A-Za-z0-9_-]{32,120}$/.test(cleaned) ? cleaned : "";
}

function cleanHash(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim().toLowerCase();
  return /^[a-f0-9]{24,96}$/.test(cleaned) ? cleaned : "";
}

function isSafeHash(value: unknown) {
  return Boolean(cleanHash(value));
}

function cleanOptionalIdentifier(value: unknown) {
  return typeof value === "string" && /^[a-zA-Z0-9:_-]{8,180}$/.test(value) ? value : undefined;
}

function cleanDestination(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim();
  return cleaned.startsWith("/dashboard") || cleaned === "/free-check" ? cleaned.slice(0, 180) : "";
}

function normalizeJourneyKey(value: unknown): CustomerEmailConfirmationJourneyKey | null {
  if (
    value === "free-scan-submitted" ||
    value === "deep-review-purchased-or-submitted" ||
    value === "build-fix-purchased-or-submitted" ||
    value === "ongoing-control-started" ||
    value === "support-or-billing-entry"
  ) {
    return value;
  }
  return null;
}

function normalizeIssueReason(value: unknown): CustomerEmailVerificationTokenEntry["issueReason"] {
  if (value === "resend-confirmation" || value === "account-recovery") return value;
  return "initial-confirmation";
}

function normalizeIso(value: unknown) {
  if (typeof value !== "string") return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function clampTtl(value: unknown) {
  return clampNumber(value, 5, MAX_TTL_MINUTES, DEFAULT_TTL_MINUTES);
}

function clampNumber(value: unknown, min: number, max: number, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.round(parsed)));
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
