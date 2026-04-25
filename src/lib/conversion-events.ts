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
  | "free_scan_progress_cleared";

type ConversionPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackConversionEvent(name: ConversionEventName, payload: ConversionPayload = {}) {
  if (typeof window === "undefined") return;

  const event = {
    event: name,
    cendorqEvent: name,
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...payload,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
  window.dispatchEvent(new CustomEvent("cendorq:conversion", { detail: event }));
}
