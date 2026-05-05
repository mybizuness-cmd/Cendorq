import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export type FileBackedEnvelope<TEntry> = {
  version: 3;
  entries: TEntry[];
};

type LoadFileBackedEnvelopeInput<TEntry> = Readonly<{
  storageDir: string;
  storageFile: string;
  legacyStorageFiles?: readonly string[];
  normalizeEntry: (value: unknown) => TEntry | null;
  sortEntries: (entries: TEntry[]) => TEntry[];
  createTempId?: () => string;
}>;

type SaveFileBackedEnvelopeInput<TEntry> = Readonly<{
  storageDir: string;
  storageFile: string;
  envelope: FileBackedEnvelope<TEntry>;
  createTempId: () => string;
}>;

export async function loadFileBackedEnvelope<TEntry>({
  storageDir,
  storageFile,
  legacyStorageFiles = [],
  normalizeEntry,
  sortEntries,
  createTempId,
}: LoadFileBackedEnvelopeInput<TEntry>): Promise<FileBackedEnvelope<TEntry>> {
  const runtime = resolveRuntimeStoragePaths(storageDir, storageFile);
  await ensureStorageDir(runtime.storageDir);

  const current = await readEnvelopeFile({ filePath: runtime.storageFile, normalizeEntry, sortEntries });
  if (current) return current;

  for (const filePath of legacyStorageFiles) {
    const legacyPath = resolveRuntimeLegacyPath(storageDir, runtime.storageDir, filePath);
    const legacy = await readEnvelopeFile({ filePath: legacyPath, normalizeEntry, sortEntries });
    if (!legacy) continue;

    if (createTempId) {
      await saveFileBackedEnvelope({ storageDir, storageFile, envelope: legacy, createTempId });
    }
    return legacy;
  }

  return { version: 3, entries: [] };
}

export async function saveFileBackedEnvelope<TEntry>({
  storageDir,
  storageFile,
  envelope,
  createTempId,
}: SaveFileBackedEnvelopeInput<TEntry>) {
  const runtime = resolveRuntimeStoragePaths(storageDir, storageFile);
  await ensureStorageDir(runtime.storageDir);
  const tempFile = `${runtime.storageFile}.${createTempId()}.tmp`;
  await writeFile(tempFile, JSON.stringify(envelope, null, 2), "utf8");
  await rename(tempFile, runtime.storageFile);
}

async function readEnvelopeFile<TEntry>({
  filePath,
  normalizeEntry,
  sortEntries,
}: Readonly<{
  filePath: string;
  normalizeEntry: (value: unknown) => TEntry | null;
  sortEntries: (entries: TEntry[]) => TEntry[];
}>) {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!isEnvelopeLike(parsed)) return null;

    const entries = parsed.entries.map(normalizeEntry).filter(isPresent);
    return { version: 3 as const, entries: sortEntries(entries) };
  } catch {
    return null;
  }
}

async function ensureStorageDir(storageDir: string) {
  await mkdir(path.resolve(storageDir), { recursive: true });
}

function resolveRuntimeStoragePaths(storageDir: string, storageFile: string) {
  const resolvedStorageDir = path.resolve(storageDir);
  const overrideDir = cleanStorageDir(process.env.CENDORQ_FILE_STORAGE_DIR);
  const runtimeStorageDir = overrideDir || (process.env.VERCEL ? path.join("/tmp", "cendorq-runtime") : resolvedStorageDir);
  return {
    storageDir: runtimeStorageDir,
    storageFile: path.join(runtimeStorageDir, path.basename(storageFile)),
  };
}

function resolveRuntimeLegacyPath(originalStorageDir: string, runtimeStorageDir: string, legacyStorageFile: string) {
  const resolvedOriginalDir = path.resolve(originalStorageDir);
  const resolvedLegacy = path.resolve(legacyStorageFile);
  if (resolvedLegacy.startsWith(`${resolvedOriginalDir}${path.sep}`)) return path.join(runtimeStorageDir, path.basename(legacyStorageFile));
  return legacyStorageFile;
}

function cleanStorageDir(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim();
  if (!cleaned || cleaned.includes("\0")) return "";
  return cleaned;
}

function isEnvelopeLike(value: unknown): value is { entries: unknown[] } {
  return typeof value === "object" && value !== null && !Array.isArray(value) && Array.isArray((value as { entries?: unknown }).entries);
}

function isPresent<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
