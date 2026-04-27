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
  await ensureStorageDir(storageDir);

  const current = await readEnvelopeFile({ filePath: storageFile, normalizeEntry, sortEntries });
  if (current) return current;

  for (const filePath of legacyStorageFiles) {
    const legacy = await readEnvelopeFile({ filePath, normalizeEntry, sortEntries });
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
  await ensureStorageDir(storageDir);
  const tempFile = `${storageFile}.${createTempId()}.tmp`;
  await writeFile(tempFile, JSON.stringify(envelope, null, 2), "utf8");
  await rename(tempFile, storageFile);
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

function isEnvelopeLike(value: unknown): value is { entries: unknown[] } {
  return typeof value === "object" && value !== null && !Array.isArray(value) && Array.isArray((value as { entries?: unknown }).entries);
}

function isPresent<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
