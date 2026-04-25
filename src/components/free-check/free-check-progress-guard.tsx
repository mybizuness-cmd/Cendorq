"use client";

import { trackConversionEvent } from "@/lib/conversion-events";
import { useEffect } from "react";

const STORAGE_KEY = "cendorq.free-check.progress.v1";
const FIELD_SELECTOR = "input[name], textarea[name], select[name]";

type StoredProgress = {
  savedAt: string;
  values: Record<string, string>;
};

export function FreeCheckProgressGuard() {
  useEffect(() => {
    const root = document.getElementById("free-check-intake");
    if (!root) return;

    restoreProgress(root);

    const save = () => saveProgress(root);
    root.addEventListener("input", save);
    root.addEventListener("change", save);

    const clear = () => {
      window.localStorage.removeItem(STORAGE_KEY);
      trackConversionEvent("free_scan_progress_cleared");
    };
    window.addEventListener("cendorq:free-check:submitted", clear);

    return () => {
      root.removeEventListener("input", save);
      root.removeEventListener("change", save);
      window.removeEventListener("cendorq:free-check:submitted", clear);
    };
  }, []);

  return null;
}

function saveProgress(root: HTMLElement) {
  const values: Record<string, string> = {};
  const fields = root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(FIELD_SELECTOR);

  fields.forEach((field) => {
    if (!field.name) return;
    values[field.name] = field.value;
  });

  const hasMeaningfulValue = Object.values(values).some((value) => value.trim().length > 0);
  if (!hasMeaningfulValue) return;

  const stored: StoredProgress = {
    savedAt: new Date().toISOString(),
    values,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}

function restoreProgress(root: HTMLElement) {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const stored = JSON.parse(raw) as StoredProgress;
    const fields = root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(FIELD_SELECTOR);
    let restored = 0;

    fields.forEach((field) => {
      const value = stored.values[field.name];
      if (typeof value !== "string" || !value) return;

      const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(field), "value")?.set;
      setter?.call(field, value);
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
      restored += 1;
    });

    if (restored > 0) {
      trackConversionEvent("free_scan_progress_restored", { restoredFields: restored });
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}
