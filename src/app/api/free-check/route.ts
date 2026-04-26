import { NextRequest, NextResponse } from "next/server";
import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import { deriveFreeCheckIntelligence, type ConfidenceLevel } from "@/lib/intelligence/free-check-intelligence";
import { buildFreeCheckReportSnapshot } from "@/lib/reports/free-check-report";
import { scoreFreeCheck, type ScoreDecision, type ScoreResult, type ScoreTier } from "@/lib/scoring/free-check-score";
import { deriveSignals, type SignalResult } from "@/lib/signals/free-check-signal";
import { normalizeFreeCheckInput, validateFreeCheck, type FreeCheckInput, type IntakeSource, type NormalizedFreeCheckInput, type RoutingHint } from "@/lib/validation/free-check";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingFreeCheckPayload = Record<string, unknown>;
type TimeSensitivity = "stable" | "watch" | "urgent";
type FreeCheckSortMode = "recent" | "signal" | "score" | "priority";

type StoredFreeCheckSubmission = NormalizedFreeCheckInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
  duplicateKey: string;
  lastSubmissionHash: string;
  submissionCount: number;
  ipHash: string;
  userAgent: string;
  riskFlags: string[];
  signalQuality: number;
  routingHint: RoutingHint;
  clarityScore: number;
  intentStrength: number;
  strongestPressure: SignalResult["strongestPressure"];
  signalSummary: string;
  score: number;
  scoreTier: ScoreTier;
  decision: ScoreDecision;
  scoreReasons: string[];
  scoreSummary: string;
  confidenceLevel: ConfidenceLevel;
  dataDepthScore: number;
  timeSensitivity: TimeSensitivity;
  decisionMoment: string;
  explanationTrace: string[];
  scoreModules: {
    discoverability: number;
    recommendationVisibility: number;
    trustAuthority: number;
    conversionReadiness: number;
    competitiveExposure: number;
  };
};

type StoredFreeCheckEnvelope = {
  version: 3;
  entries: StoredFreeCheckSubmission[];
};

type StoredFreeCheckSubmissionView = Omit<StoredFreeCheckSubmission, "lastSubmissionHash" | "ipHash">;
type StoredFreeCheckLike = Partial<StoredFreeCheckSubmission> & Record<string, unknown>;

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const CURRENT_STORAGE_FILE = "free-check-intakes.v3.json";
const LEGACY_SOURCE = ["search", "presence", "scan"].join("-") as IntakeSource;
const STORAGE_FILE = path.join(STORAGE_DIR, CURRENT_STORAGE_FILE);
const LEGACY_STORAGE_FILES = [
  path.join(STORAGE_DIR, `${LEGACY_SOURCE}-intakes.v3.json`),
  path.join(STORAGE_DIR, `${LEGACY_SOURCE}-intakes.v2.json`),
  path.join(process.cwd(), ".default-ai-runtime", "free-check-intakes.json"),
] as const;

const ADMIN_HEADER = "x-intake-admin-key";
const MAX_REQUEST_BYTES = 32_000;
const SUBMISSION_COOLDOWN_MS = 45_000;
const MAX_GET_LIMIT = 200;
const READ_KEY_ENV_CANDIDATES = ["INTAKE_CONSOLE_READ_KEY", "INTAKE_ADMIN_KEY"] as const;
const ROUTING_HINT_VALUES = ["scan-only", "blueprint-candidate", "infrastructure-review", "command-review"] as const satisfies readonly RoutingHint[];
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
    return jsonNoStore({ ok: false, error: "The intake console is not authorized to read submissions.", details: ["Provide the configured intake admin header before requesting stored entries."] }, 401);
  }

  try {
    const envelope = await loadEnvelope();
    const requestedId = cleanQueryValue(request.nextUrl.searchParams.get("id") ?? "", 120);
    const requestedView = cleanQueryValue(request.nextUrl.searchParams.get("view") ?? "", 40).toLowerCase();

    if (requestedId) {
      const match = envelope.entries.find((entry) => entry.id === requestedId);
      if (!match) {
        return jsonNoStore({ ok: false, error: "The requested Free Scan entry was not found.", details: ["Check the entry id and request the report again."] }, 404);
      }
      const responsePayload = { ok: true, entry: projectEntryForConsole(match), report: buildFreeCheckReportSnapshot(match) };
      return jsonNoStore(responsePayload, requestedView === "report" ? 200 : 200);
    }

    const limit = clampInteger(request.nextUrl.searchParams.get("limit"), 1, MAX_GET_LIMIT, 100);
    const riskOnly = request.nextUrl.searchParams.get("riskOnly") === "1";
    const routingHint = normalizeRoutingHintValue(request.nextUrl.searchParams.get("routingHint"));
    const decision = normalizeDecisionValue(request.nextUrl.searchParams.get("decision"));
    const confidence = normalizeConfidenceLevelValue(request.nextUrl.searchParams.get("confidence"));
    const minSignal = parseOptionalInteger(request.nextUrl.searchParams.get("minSignal"), 0, 100);
    const minScore = parseOptionalInteger(request.nextUrl.searchParams.get("minScore"), 0, 100);
    const query = cleanQueryValue(request.nextUrl.searchParams.get("q") ?? "", 160);
    const sort = normalizeSortModeValue(request.nextUrl.searchParams.get("sort"));

    const filtered = envelope.entries.filter((entry) => {
      if (riskOnly && entry.riskFlags.length === 0) return false;
      if (routingHint && entry.routingHint !== routingHint) return false;
      if (decision && entry.decision !== decision) return false;
      if (confidence && entry.confidenceLevel !== confidence) return false;
      if (typeof minSignal === "number" && entry.signalQuality < minSignal) return false;
      if (typeof minScore === "number" && entry.score < minScore) return false;
      if (query && !matchesEntryQuery(entry, query.toLowerCase())) return false;
      return true;
    });

    const entries = sortEntries(filtered, sort || "recent").slice(0, limit).map(projectEntryForConsole);
    return jsonNoStore({ ok: true, count: filtered.length, returned: entries.length, appliedFilters: { riskOnly, routingHint: routingHint || null, decision: decision || null, confidence: confidence || null, minSignal, minScore, q: query || null, sort: sort || "recent" }, summary: buildSummary(filtered), entries }, 200);
  } catch {
    return jsonNoStore({ ok: false, error: "Unable to load Free Scan entries.", details: ["The intake storage layer could not be read cleanly."] }, 500);
  }
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return jsonNoStore({ ok: false, error: "The submission is too large to be accepted cleanly.", details: ["Reduce the amount of text in the intake and submit the Free Scan again."] }, 413);
  }

  let rawBody = "";
  try {
    rawBody = await request.text();
  } catch {
    return jsonNoStore({ ok: false, error: "The submission body could not be read.", details: ["Submit the Free Scan again with a valid JSON payload."] }, 400);
  }

  if (!rawBody.trim()) {
    return jsonNoStore({ ok: false, error: "The submission body is empty.", details: ["Submit the Free Scan with real business information."] }, 400);
  }
  if (Buffer.byteLength(rawBody, "utf8") > MAX_REQUEST_BYTES) {
    return jsonNoStore({ ok: false, error: "The submission is too large to be accepted cleanly.", details: ["Reduce the amount of text in the intake and submit the Free Scan again."] }, 413);
  }

  let parsedBody: IncomingFreeCheckPayload;
  try {
    const parsed = JSON.parse(rawBody) as unknown;
    if (!isRecord(parsed)) throw new Error("Payload is not an object.");
    parsedBody = parsed;
  } catch {
    return jsonNoStore({ ok: false, error: "The submission payload is not valid JSON.", details: ["Submit the Free Scan again with a valid JSON body."] }, 400);
  }

  const incomingSource = cleanSource(parsedBody.source);
  if (parsedBody.source !== undefined && !incomingSource) {
    return jsonNoStore({ ok: false, error: "The submission source is not recognized.", details: ["Submit this intake from the supported Free Scan route."] }, 400);
  }

  const input = coerceIncomingInput(parsedBody, incomingSource || undefined);
  const validation = validateFreeCheck(input);
  if (!validation.isValid) {
    return jsonNoStore({ ok: false, error: "The Free Scan needs stronger signal before it can be accepted.", details: Object.values(validation.errors), fieldErrors: validation.errors }, 400);
  }

  const normalized = validation.normalized;
  const signals = deriveSignals(input);
  const scoring = scoreFreeCheck(input, signals);
  const intelligence = deriveFreeCheckIntelligence(normalized, signals, scoring);
  const duplicateKey = buildDuplicateKey(normalized);
  const submissionHash = buildSubmissionHash(normalized);
  const requestFingerprint = buildRequestFingerprint(request);
  const userAgent = cleanString(request.headers.get("user-agent") ?? "", 300);
  const now = new Date().toISOString();

  try {
    const envelope = await loadEnvelope();
    const recentFingerprintEntry = requestFingerprint && envelope.entries.find((entry) => entry.ipHash === requestFingerprint && millisecondsSince(entry.updatedAt) < SUBMISSION_COOLDOWN_MS);
    if (recentFingerprintEntry && recentFingerprintEntry.lastSubmissionHash !== submissionHash && recentFingerprintEntry.duplicateKey !== duplicateKey) {
      return jsonNoStore({ ok: false, error: "The intake service is rate-limiting rapid repeated submissions.", details: ["Wait a short moment before submitting a different business signal again."] }, 429);
    }

    const existingIndex = envelope.entries.findIndex((entry) => entry.duplicateKey === duplicateKey);
    let storedEntry: StoredFreeCheckSubmission;
    let duplicate = false;

    if (existingIndex >= 0) {
      duplicate = true;
      const existing = envelope.entries[existingIndex];
      const meaningfulChange = existing.lastSubmissionHash !== submissionHash;
      storedEntry = buildStoredEntry({ id: existing.id, createdAt: existing.createdAt, updatedAt: now, duplicateKey, lastSubmissionHash: submissionHash, submissionCount: meaningfulChange ? existing.submissionCount + 1 : existing.submissionCount, ipHash: requestFingerprint, userAgent, normalized, signals, scoring, intelligence });
      envelope.entries[existingIndex] = storedEntry;
    } else {
      storedEntry = buildStoredEntry({ id: randomUUID(), createdAt: now, updatedAt: now, duplicateKey, lastSubmissionHash: submissionHash, submissionCount: 1, ipHash: requestFingerprint, userAgent, normalized, signals, scoring, intelligence });
      envelope.entries.unshift(storedEntry);
    }

    envelope.entries.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
    await saveEnvelope(envelope);

    return jsonNoStore({ ok: true, intakeId: storedEntry.id, signalQuality: storedEntry.signalQuality, routingHint: storedEntry.routingHint, duplicate, riskFlags: storedEntry.riskFlags, clarityScore: storedEntry.clarityScore, intentStrength: storedEntry.intentStrength, score: storedEntry.score, tier: storedEntry.scoreTier, decision: storedEntry.decision, confidenceLevel: storedEntry.confidenceLevel, dataDepthScore: storedEntry.dataDepthScore, scoreModules: storedEntry.scoreModules, timeSensitivity: storedEntry.timeSensitivity, decisionMoment: storedEntry.decisionMoment, explanationTrace: storedEntry.explanationTrace, reportPath: `/report?id=${storedEntry.id}`, message: duplicate ? "This business already had a recent Free Scan in the system. The existing signal has been updated with the newest submission." : "The Free Scan has been captured successfully. The business now has a first serious signal inside the system." }, 200);
  } catch {
    return jsonNoStore({ ok: false, error: "The submission could not be stored cleanly.", details: ["The intake storage layer was not able to save the Free Scan right now."] }, 500);
  }
}

function canReadEntries(request: NextRequest) {
  if (shouldAllowLocalConsoleReads()) return true;
  const configuredKey = configuredReadKey();
  if (!configuredKey) return false;
  const providedKey = cleanQueryValue(request.headers.get(ADMIN_HEADER) ?? "", 200);
  return providedKey ? safeEqual(providedKey, configuredKey) : false;
}

function shouldAllowLocalConsoleReads() {
  return cleanQueryValue(process.env.NODE_ENV ?? "", 20).toLowerCase() !== "production";
}

function configuredReadKey() {
  for (const envName of READ_KEY_ENV_CANDIDATES) {
    const value = cleanQueryValue(process.env[envName] ?? "", 200);
    if (value) return value;
  }
  return "";
}

function coerceIncomingInput(payload: IncomingFreeCheckPayload, source: IntakeSource | undefined): FreeCheckInput {
  return { source, fullName: asString(payload.fullName), email: asString(payload.email), businessName: asString(payload.businessName), websiteUrl: asString(payload.websiteUrl), businessType: asString(payload.businessType), country: asString(payload.country), stateRegion: asString(payload.stateRegion), city: asString(payload.city), primaryOffer: asString(payload.primaryOffer), audience: asString(payload.audience), biggestIssue: asString(payload.biggestIssue), competitors: asOptionalString(payload.competitors), notes: asOptionalString(payload.notes), location: asOptionalString(payload.location), primaryGoal: asOptionalString(payload.primaryGoal), monthlyRevenue: asOptionalString(payload.monthlyRevenue), monthlyMarketing: asOptionalString(payload.monthlyMarketing), consent: asBoolean(payload.consent) };
}

function buildStoredEntry({ id, createdAt, updatedAt, duplicateKey, lastSubmissionHash, submissionCount, ipHash, userAgent, normalized, signals, scoring, intelligence }: { id: string; createdAt: string; updatedAt: string; duplicateKey: string; lastSubmissionHash: string; submissionCount: number; ipHash: string; userAgent: string; normalized: NormalizedFreeCheckInput; signals: SignalResult; scoring: ScoreResult; intelligence: ReturnType<typeof deriveFreeCheckIntelligence>; }): StoredFreeCheckSubmission {
  return { ...normalized, id, createdAt, updatedAt, duplicateKey, lastSubmissionHash, submissionCount, ipHash, userAgent, riskFlags: signals.riskFlags, signalQuality: signals.signalQuality, routingHint: signals.routingHint, clarityScore: signals.clarityScore, intentStrength: signals.intentStrength, strongestPressure: signals.strongestPressure, signalSummary: signals.summary, score: scoring.score, scoreTier: scoring.tier, decision: scoring.decision, scoreReasons: scoring.reasons, scoreSummary: scoring.summary, confidenceLevel: intelligence.confidenceLevel, dataDepthScore: intelligence.dataDepthScore, timeSensitivity: intelligence.timeSensitivity, decisionMoment: intelligence.decisionMoment, explanationTrace: intelligence.explanationTrace, scoreModules: intelligence.scoreModules };
}

function buildDuplicateKey(input: NormalizedFreeCheckInput) {
  const anchor = input.websiteHostname || input.email.toLowerCase();
  return [normalizeKey(input.businessName), anchor, normalizeKey(input.city), normalizeKey(input.stateRegion)].join("::");
}

function buildSubmissionHash(input: NormalizedFreeCheckInput) {
  return createHash("sha256").update(JSON.stringify([input.fullName, input.email, input.businessName, input.websiteUrl, input.country, input.stateRegion, input.city, input.businessType, input.primaryOffer, input.audience, input.biggestIssue, input.competitors, input.notes, input.primaryGoal, input.monthlyRevenue, input.monthlyMarketing])).digest("hex").slice(0, 24);
}

function buildRequestFingerprint(request: NextRequest) {
  const ip = extractClientIp(request);
  return ip ? createHash("sha256").update(ip).digest("hex").slice(0, 20) : "";
}

function extractClientIp(request: NextRequest) {
  const candidates = [request.headers.get("cf-connecting-ip"), request.headers.get("true-client-ip"), request.headers.get("x-real-ip"), request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()];
  for (const candidate of candidates) {
    const cleaned = cleanQueryValue(candidate ?? "", 120);
    if (cleaned && cleaned.toLowerCase() !== "unknown") return cleaned;
  }
  return "";
}

async function loadEnvelope(): Promise<StoredFreeCheckEnvelope> {
  await ensureStorageDir();
  const current = await readEnvelopeFile(STORAGE_FILE);
  if (current) return current;
  for (const filePath of LEGACY_STORAGE_FILES) {
    const legacy = await readEnvelopeFile(filePath);
    if (legacy) {
      await saveEnvelope(legacy);
      return legacy;
    }
  }
  return { version: 3, entries: [] };
}

async function readEnvelopeFile(filePath: string) {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (isRecord(parsed) && Array.isArray(parsed.entries)) {
      const entries = parsed.entries.filter(isStoredFreeCheckLike).map(normalizeStoredEntry).sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
      return { version: 3 as const, entries };
    }
    return null;
  } catch {
    return null;
  }
}

async function saveEnvelope(envelope: StoredFreeCheckEnvelope) {
  await ensureStorageDir();
  const tempFile = `${STORAGE_FILE}.${randomUUID()}.tmp`;
  await writeFile(tempFile, JSON.stringify(envelope, null, 2), "utf8");
  await rename(tempFile, STORAGE_FILE);
}

async function ensureStorageDir() {
  await mkdir(STORAGE_DIR, { recursive: true });
}

function normalizeStoredEntry(value: StoredFreeCheckLike): StoredFreeCheckSubmission {
  const normalized = normalizeFreeCheckInput({ source: cleanSource(value.source) || undefined, fullName: asString(value.fullName), email: asString(value.email), businessName: asString(value.businessName), websiteUrl: asString(value.websiteUrl), businessType: asString(value.businessType), biggestIssue: asString(value.biggestIssue), competitors: asOptionalString(value.competitors), country: asOptionalString(value.country), stateRegion: asOptionalString(value.stateRegion), city: asOptionalString(value.city), primaryOffer: asOptionalString(value.primaryOffer), audience: asOptionalString(value.audience), notes: asOptionalString(value.notes), location: asOptionalString(value.location), primaryGoal: asOptionalString(value.primaryGoal), monthlyRevenue: asOptionalString(value.monthlyRevenue), monthlyMarketing: asOptionalString(value.monthlyMarketing), consent: asBoolean(value.consent) });
  const signals = deriveSignals(normalized);
  const scoring = scoreFreeCheck(normalized, signals);
  const intelligence = deriveFreeCheckIntelligence(normalized, signals, scoring);
  return buildStoredEntry({ id: cleanString(value.id, 120) || randomUUID(), createdAt: normalizeIsoDate(value.createdAt), updatedAt: normalizeIsoDate(value.updatedAt), duplicateKey: cleanString(value.duplicateKey, 400) || buildDuplicateKey(normalized), lastSubmissionHash: cleanString(value.lastSubmissionHash, 64) || buildSubmissionHash(normalized), submissionCount: clampInteger(value.submissionCount, 1, 10_000, 1), ipHash: cleanString(value.ipHash, 40), userAgent: cleanString(value.userAgent, 300), normalized, signals: { ...signals, clarityScore: clampInteger(value.clarityScore, 0, 14, signals.clarityScore), intentStrength: clampInteger(value.intentStrength, 0, 8, signals.intentStrength), riskFlags: normalizeStringArray(value.riskFlags, 80) || signals.riskFlags, signalQuality: clampInteger(value.signalQuality, 0, 100, signals.signalQuality), routingHint: normalizeRoutingHintValue(value.routingHint) || signals.routingHint, strongestPressure: normalizeStrongestPressure(value.strongestPressure) || signals.strongestPressure, summary: cleanString(value.signalSummary, 800) || signals.summary }, scoring: { ...scoring, score: clampInteger(value.score, 0, 100, scoring.score), tier: normalizeScoreTierValue(value.scoreTier) || scoring.tier, decision: normalizeDecisionValue(value.decision) || scoring.decision, reasons: normalizeStringArray(value.scoreReasons, 80) || scoring.reasons, routeFit: normalizeRoutingHintValue(value.routingHint) || scoring.routeFit, summary: cleanString(value.scoreSummary, 800) || scoring.summary }, intelligence: { ...intelligence, confidenceLevel: normalizeConfidenceLevelValue(value.confidenceLevel) || intelligence.confidenceLevel, dataDepthScore: clampInteger(value.dataDepthScore, 0, 100, intelligence.dataDepthScore), timeSensitivity: normalizeTimeSensitivity(value.timeSensitivity) || intelligence.timeSensitivity, decisionMoment: cleanString(value.decisionMoment, 600) || intelligence.decisionMoment, explanationTrace: normalizeStringArray(value.explanationTrace, 240) || intelligence.explanationTrace, scoreModules: normalizeScoreModules(value.scoreModules, intelligence.scoreModules) } });
}

function isStoredFreeCheckLike(value: unknown): value is StoredFreeCheckLike {
  return isRecord(value);
}

function buildSummary(entries: StoredFreeCheckSubmission[]) {
  const byRoutingHint: Record<RoutingHint, number> = { "scan-only": 0, "blueprint-candidate": 0, "infrastructure-review": 0, "command-review": 0 };
  const byDecision: Record<ScoreDecision, number> = { reject: 0, review: 0, priority: 0 };
  let flagged = 0;
  for (const entry of entries) {
    byRoutingHint[entry.routingHint] += 1;
    byDecision[entry.decision] += 1;
    if (entry.riskFlags.length > 0) flagged += 1;
  }
  return { flagged, averageSignalQuality: average(entries.map((entry) => entry.signalQuality)), averageScore: average(entries.map((entry) => entry.score)), averageDataDepth: average(entries.map((entry) => entry.dataDepthScore)), byRoutingHint, byDecision };
}

function average(values: number[]) {
  return values.length === 0 ? 0 : Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function projectEntryForConsole(entry: StoredFreeCheckSubmission): StoredFreeCheckSubmissionView {
  const { lastSubmissionHash: _lastSubmissionHash, ipHash: _ipHash, ...rest } = entry;
  return rest;
}

function matchesEntryQuery(entry: StoredFreeCheckSubmission, query: string) {
  return [entry.id, entry.businessName, entry.websiteUrl, entry.websiteHostname, entry.fullName, entry.email, entry.city, entry.stateRegion, entry.country, entry.businessType, entry.primaryOffer, entry.audience, entry.biggestIssue, entry.routingHint, entry.decision, entry.scoreTier, entry.strongestPressure, entry.confidenceLevel, entry.signalSummary, entry.scoreSummary, entry.decisionMoment, ...entry.riskFlags, ...entry.explanationTrace].join(" ").toLowerCase().includes(query);
}

function sortEntries(entries: StoredFreeCheckSubmission[], sort: FreeCheckSortMode) {
  return [...entries].sort((left, right) => {
    if (sort === "signal") return compareNumbers(right.signalQuality, left.signalQuality) || compareDates(right.updatedAt, left.updatedAt);
    if (sort === "score") return compareNumbers(right.score, left.score) || compareDates(right.updatedAt, left.updatedAt);
    if (sort === "priority") return compareDecisionPriority(right.decision, left.decision) || compareNumbers(right.score, left.score) || compareDates(right.updatedAt, left.updatedAt);
    return compareDates(right.updatedAt, left.updatedAt);
  });
}

function compareNumbers(left: number, right: number) {
  return left - right;
}

function compareDates(leftIso: string, rightIso: string) {
  return leftIso.localeCompare(rightIso);
}

function compareDecisionPriority(left: ScoreDecision, right: ScoreDecision) {
  return decisionWeight(left) - decisionWeight(right);
}

function decisionWeight(value: ScoreDecision) {
  if (value === "priority") return 3;
  if (value === "review") return 2;
  return 1;
}

function cleanSource(value: unknown): IntakeSource | "" {
  if (typeof value !== "string") return "";
  const cleaned = value.trim().toLowerCase();
  if (cleaned === "free-check") return "free-check";
  if (cleaned === LEGACY_SOURCE) return LEGACY_SOURCE;
  return "";
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function asOptionalString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function asBoolean(value: unknown) {
  return typeof value === "boolean" ? value : undefined;
}

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.normalize("NFKC").replace(/<[^>]*>/g, " ").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanQueryValue(value: unknown, maxLength: number) {
  return cleanString(value, maxLength);
}

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function normalizeIsoDate(value: unknown) {
  if (typeof value !== "string") return new Date().toISOString();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function normalizeStringArray(value: unknown, maxLength: number) {
  if (!Array.isArray(value)) return null;
  const items = value.map((item) => cleanString(item, maxLength)).filter(Boolean);
  return items.length ? items : null;
}

function normalizeScoreModules(value: unknown, fallback: StoredFreeCheckSubmission["scoreModules"]) {
  if (!isRecord(value)) return fallback;
  return { discoverability: clampInteger(value.discoverability, 0, 100, fallback.discoverability), recommendationVisibility: clampInteger(value.recommendationVisibility, 0, 100, fallback.recommendationVisibility), trustAuthority: clampInteger(value.trustAuthority, 0, 100, fallback.trustAuthority), conversionReadiness: clampInteger(value.conversionReadiness, 0, 100, fallback.conversionReadiness), competitiveExposure: clampInteger(value.competitiveExposure, 0, 100, fallback.competitiveExposure) };
}

function normalizeRoutingHintValue(value: unknown): RoutingHint | null {
  return typeof value === "string" && ROUTING_HINT_VALUES.includes(value as RoutingHint) ? (value as RoutingHint) : null;
}

function normalizeDecisionValue(value: unknown): ScoreDecision | null {
  return value === "reject" || value === "review" || value === "priority" ? value : null;
}

function normalizeScoreTierValue(value: unknown): ScoreTier | null {
  return value === "low" || value === "mid" || value === "high" ? value : null;
}

function normalizeConfidenceLevelValue(value: unknown): ConfidenceLevel | null {
  return value === "high" || value === "medium" || value === "low" ? value : null;
}

function normalizeTimeSensitivity(value: unknown): TimeSensitivity | null {
  return value === "stable" || value === "watch" || value === "urgent" ? value : null;
}

function normalizeStrongestPressure(value: unknown): SignalResult["strongestPressure"] | null {
  return value === "trust" || value === "clarity" || value === "positioning" || value === "action" || value === "mixed" ? value : null;
}

function normalizeSortModeValue(value: unknown): FreeCheckSortMode | null {
  return value === "recent" || value === "signal" || value === "score" || value === "priority" ? value : null;
}

function parseOptionalInteger(value: unknown, min: number, max: number) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}

function clampInteger(value: unknown, min: number, max: number, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}

function millisecondsSince(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return Number.POSITIVE_INFINITY;
  return Date.now() - date.getTime();
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
