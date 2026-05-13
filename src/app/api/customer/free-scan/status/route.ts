import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type StoredFreeScanEntry = Record<string, unknown> & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  routingHint?: string;
  signalQuality?: number;
  score?: number;
  confidenceLevel?: string;
  decision?: string;
};

type StorageEnvelope = { entries?: unknown[] };

const STORAGE_DIR = path.join(process.cwd(), ".cendorq-runtime");
const STORAGE_FILES = ["free-check-intakes.v3.json", "search-presence-scan-intakes.v3.json", "search-presence-scan-intakes.v2.json"] as const;
const DEFAULT_AI_STORAGE_FILE = path.join(process.cwd(), ".default-ai-runtime", "free-check-intakes.json");
const FREE_SCAN_RESULTS_DESTINATION = "/dashboard/reports/free-scan";
const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow",
  "Referrer-Policy": "same-origin",
} as const;

export async function GET(request: NextRequest) {
  const intakeId = cleanIdentifier(request.nextUrl.searchParams.get("intakeId"));
  if (!intakeId) {
    return json({ ok: false, status: "missing-intake-id", nextAction: "start-free-scan", message: "Start the Free Scan when Cendorq still needs business context." }, 400);
  }

  const entry = await findFreeScanEntry(intakeId);
  if (!entry) {
    return json({ ok: true, status: "not-found", nextAction: "start-free-scan", message: "Cendorq could not find that scan status safely. Start or continue the Free Scan from the dashboard." }, 200);
  }

  const hasCalculatedSignal = readNumber(entry.signalQuality) > 0 || readNumber(entry.score) > 0;
  return json({
    ok: true,
    status: hasCalculatedSignal ? "result-ready" : "submitted",
    nextAction: "open-free-scan-result",
    resultDestination: FREE_SCAN_RESULTS_DESTINATION,
    submittedAt: safeIso(entry.createdAt),
    updatedAt: safeIso(entry.updatedAt),
    routingHint: safeRoutingHint(entry.routingHint),
    signalQuality: clamp(readNumber(entry.signalQuality), 0, 100),
    score: clamp(readNumber(entry.score), 0, 100),
    confidenceLevel: safeLabel(entry.confidenceLevel, 40),
    decision: safeLabel(entry.decision, 40),
    message: hasCalculatedSignal ? "Your Free Scan status is ready to open from the protected dashboard." : "Your Free Scan was submitted and is connected to this workspace.",
    privacy: { rawEmailReturned: false, rawBusinessTextReturned: false, rawReportReturned: false, adminFieldsReturned: false },
  }, 200);
}

async function findFreeScanEntry(intakeId: string) {
  for (const filePath of candidateStorageFiles()) {
    const entries = await readEntries(filePath);
    const match = entries.find((entry) => cleanIdentifier(entry.id) === intakeId);
    if (match) return match;
  }
  return null;
}

async function readEntries(filePath: string): Promise<StoredFreeScanEntry[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as StorageEnvelope;
    if (!parsed || !Array.isArray(parsed.entries)) return [];
    return parsed.entries.filter(isRecord) as StoredFreeScanEntry[];
  } catch {
    return [];
  }
}

function candidateStorageFiles() {
  const runtimeDir = resolveRuntimeStorageDir();
  return [...STORAGE_FILES.map((fileName) => path.join(runtimeDir, fileName)), DEFAULT_AI_STORAGE_FILE];
}

function resolveRuntimeStorageDir() {
  const overrideDir = cleanStorageDir(process.env.CENDORQ_FILE_STORAGE_DIR);
  if (overrideDir) return overrideDir;
  return process.env.VERCEL ? path.join("/tmp", "cendorq-runtime") : STORAGE_DIR;
}

function cleanStorageDir(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim();
  return cleaned && !cleaned.includes("\0") ? cleaned : "";
}

function cleanIdentifier(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim();
  return /^[a-zA-Z0-9:_-]{8,180}$/.test(cleaned) ? cleaned : "";
}

function safeRoutingHint(value: unknown) {
  if (value === "scan-only" || value === "blueprint-candidate" || value === "infrastructure-review" || value === "command-review") return value;
  return "scan-only";
}

function safeLabel(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[^a-zA-Z0-9 _-]/g, "").trim().slice(0, maxLength);
}

function safeIso(value: unknown) {
  if (typeof value !== "string") return "";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString();
}

function readNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status, headers: NO_STORE_HEADERS });
}
