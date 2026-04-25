"use client";

import { trackConversionEvent } from "@/lib/conversion-events";
import { useEffect, useRef } from "react";

const STEP_LABELS = ["Business basics", "Market context", "Offer and buyer", "Problem pressure"] as const;

export function FreeCheckAnalytics() {
  const lastStepRef = useRef<string>("");

  useEffect(() => {
    const root = document.getElementById("free-check-intake");
    if (!root) return;

    const captureStep = () => {
      const stepText = findCurrentStep(root);
      if (!stepText || stepText === lastStepRef.current) return;
      lastStepRef.current = stepText;
      trackConversionEvent("free_scan_step_view", {
        step: stepText,
        stepIndex: STEP_LABELS.indexOf(stepText as (typeof STEP_LABELS)[number]) + 1,
      });
    };

    const observer = new MutationObserver(captureStep);
    observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true });
    captureStep();

    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest("button");
      if (!(button instanceof HTMLButtonElement)) return;

      const text = normalizeText(button.textContent || "");
      const stepText = lastStepRef.current || findCurrentStep(root);

      if (text === "Continue") {
        trackConversionEvent("free_scan_step_continue", { step: stepText });
      } else if (text === "Back") {
        trackConversionEvent("free_scan_step_back", { step: stepText });
      } else if (text.startsWith("Submit free scan") || text.startsWith("Submitting scan")) {
        trackConversionEvent("free_scan_submit_attempt", { step: stepText });
      } else if (STEP_LABELS.includes(text as (typeof STEP_LABELS)[number])) {
        trackConversionEvent("free_scan_step_jump", { step: text });
      }
    }

    function handleSubmit() {
      trackConversionEvent("free_scan_submit_attempt", { step: lastStepRef.current || findCurrentStep(root) });
    }

    root.addEventListener("click", handleClick, { capture: true });
    root.addEventListener("submit", handleSubmit, { capture: true });

    return () => {
      observer.disconnect();
      root.removeEventListener("click", handleClick, { capture: true });
      root.removeEventListener("submit", handleSubmit, { capture: true });
    };
  }, []);

  return null;
}

export function announceFreeScanSuccess(payload: { quality: number; routingHint: string; hasReport: boolean }) {
  trackConversionEvent("free_scan_submit_success", payload);
  window.dispatchEvent(new Event("cendorq:free-check:submitted"));
}

export function announceFreeScanError(payload: { message: string; detailsCount: number }) {
  trackConversionEvent("free_scan_submit_error", payload);
}

export function announceFreeScanValidationError(payload: { step: string; errorCount: number }) {
  trackConversionEvent("free_scan_validation_error", payload);
}

function findCurrentStep(root: HTMLElement) {
  const candidates = [...root.querySelectorAll("span")]
    .map((node) => normalizeText(node.textContent || ""))
    .filter((text) => STEP_LABELS.includes(text as (typeof STEP_LABELS)[number]));

  return candidates[0] || "";
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}
