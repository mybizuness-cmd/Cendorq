import type { ScoreResult } from "./scoring/free-check-score";
import type { SignalResult } from "./signals/free-check-signal";
import type { FreeCheckInput } from "./validation/free-check";

export type StoredFreeCheckSubmission = {
    id: string;
    submittedAt: string;
    payload: FreeCheckInput;
    signals: SignalResult;
    scoring: ScoreResult;
};

declare global {
    // eslint-disable-next-line no-var
    var __cendorqFreeCheckStore: StoredFreeCheckSubmission[] | undefined;
}

const MAX_STORED_SUBMISSIONS = 500;

function getStore(): StoredFreeCheckSubmission[] {
    if (!globalThis.__cendorqFreeCheckStore) {
        globalThis.__cendorqFreeCheckStore = [];
    }

    return globalThis.__cendorqFreeCheckStore;
}

export function addFreeCheckSubmission(
    entry: StoredFreeCheckSubmission
): StoredFreeCheckSubmission {
    const store = getStore();
    const normalized = normalizeSubmission(entry);

    const existingIndex = store.findIndex((item) => item.id === normalized.id);

    if (existingIndex >= 0) {
        store.splice(existingIndex, 1);
    }

    store.unshift(normalized);

    if (store.length > MAX_STORED_SUBMISSIONS) {
        store.length = MAX_STORED_SUBMISSIONS;
    }

    return normalized;
}

export function getFreeCheckSubmissions(): StoredFreeCheckSubmission[] {
    return getStore().map(cloneSubmission);
}

export function getFreeCheckSubmissionById(id: string) {
    const submission = getStore().find((item) => item.id === id);
    return submission ? cloneSubmission(submission) : null;
}

export function clearFreeCheckSubmissions() {
    getStore().length = 0;
}

export function createSubmissionId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return `fc_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`;
    }

    return `fc_${Math.random().toString(36).slice(2, 14)}`;
}

function normalizeSubmission(
    entry: StoredFreeCheckSubmission
): StoredFreeCheckSubmission {
    return {
        id: entry.id.trim() || createSubmissionId(),
        submittedAt: normalizeSubmittedAt(entry.submittedAt),
        payload: structuredCloneSafe(entry.payload),
        signals: structuredCloneSafe(entry.signals),
        scoring: structuredCloneSafe(entry.scoring),
    };
}

function normalizeSubmittedAt(value: string) {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return new Date().toISOString();
    }

    return parsed.toISOString();
}

function cloneSubmission(
    entry: StoredFreeCheckSubmission
): StoredFreeCheckSubmission {
    return {
        id: entry.id,
        submittedAt: entry.submittedAt,
        payload: structuredCloneSafe(entry.payload),
        signals: structuredCloneSafe(entry.signals),
        scoring: structuredCloneSafe(entry.scoring),
    };
}

function structuredCloneSafe<T>(value: T): T {
    if (typeof structuredClone === "function") {
        return structuredClone(value);
    }

    return JSON.parse(JSON.stringify(value)) as T;
}