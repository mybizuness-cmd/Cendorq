export type ConversionEventName =
  | "cta_click"
  | "mobile_dock_click"
  | "free_scan_step_view"
  | "free_scan_step_continue"
  | "free_scan_step_back"
  | "free_scan_step_jump"
  | "free_scan_submit_attempt"
  | "free_scan_submit_success"
  | "free_scan_submit_error"
  | "free_scan_validation_error"
  | "free_scan_progress_restored"
  | "free_scan_progress_cleared"
  | "free_scan_progress_fresh_start";

type ConversionPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const MAX_PAYLOAD_KEYS = 24;
const MAX_STRING_VALUE_LENGTH = 240;

export function trackConversionEvent(name: ConversionEventName, payload: ConversionPayload = {}) {
  if (typeof window === "undefined") return;

  const event = {
    event: name,
    cendorqEvent: name,
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...sanitizeConversionPayload(payload),
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
  window.dispatchEvent(new CustomEvent("cendorq:conversion", { detail: event }));
}

function sanitizeConversionPayload(payload: ConversionPayload) {
  const clean: ConversionPayload = {};
  let count = 0;

  for (const [key, value] of Object.entries(payload)) {
    if (count >= MAX_PAYLOAD_KEYS) break;
    const cleanKey = key.replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 80);
    if (!cleanKey || cleanKey === "event" || cleanKey === "cendorqEvent" || cleanKey === "timestamp") continue;
    if (value === null || value === undefined || typeof value === "boolean") {
      clean[cleanKey] = value;
      count += 1;
      continue;
    }
    if (typeof value === "number") {
      clean[cleanKey] = Number.isFinite(value) ? value : 0;
      count += 1;
      continue;
    }
    clean[cleanKey] = value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, MAX_STRING_VALUE_LENGTH);
    count += 1;
  }

  return clean;
}
