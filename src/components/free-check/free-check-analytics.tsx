"use client";

import { trackConversionEvent } from "@/lib/conversion-events";
import { useEffect, useRef, type MutableRefObject } from "react";

const STEP_LABELS = ["Business basics", "Market context", "Offer and buyer", "Problem pressure"] as const;

export function FreeCheckAnalytics() {
  const lastStepRef = useRef<string>("");
  const lastLifecycleSignatureRef = useRef<string>("");
  const lastValidationSignatureRef = useRef<string>("");

  useEffect(() => {
    const root = document.getElementById("free-check-intake");
    if (!root) return;
    const rootElement = root;

    const captureState = () => {
      captureStep(rootElement, lastStepRef);
      captureValidation(rootElement, lastStepRef.current, lastValidationSignatureRef);
      captureLifecycle(rootElement, lastLifecycleSignatureRef);
    };

    const observer = new MutationObserver(captureState);
    observer.observe(rootElement, { childList: true, subtree: true, characterData: true, attributes: true });
    captureState();

    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest("button");
      if (!(button instanceof HTMLButtonElement)) return;

      const text = normalizeText(button.textContent || "");
      const stepText = lastStepRef.current || findCurrentStep(rootElement);

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
      trackConversionEvent("free_scan_submit_attempt", { step: lastStepRef.current || findCurrentStep(rootElement) });
    }

    rootElement.addEventListener("click", handleClick, { capture: true });
    rootElement.addEventListener("submit", handleSubmit, { capture: true });

    return () => {
      observer.disconnect();
      rootElement.removeEventListener("click", handleClick, { capture: true });
      rootElement.removeEventListener("submit", handleSubmit, { capture: true });
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

function captureStep(root: HTMLElement, lastStepRef: MutableRefObject<string>) {
  const stepText = findCurrentStep(root);
  if (!stepText || stepText === lastStepRef.current) return;

  lastStepRef.current = stepText;
  trackConversionEvent("free_scan_step_view", {
    step: stepText,
    stepIndex: STEP_LABELS.indexOf(stepText as (typeof STEP_LABELS)[number]) + 1,
  });
}

function captureValidation(root: HTMLElement, step: string, signatureRef: MutableRefObject<string>) {
  const validationErrors = [...root.querySelectorAll("p")]
    .map((node) => normalizeText(node.textContent || ""))
    .filter(isValidationMessage);

  if (!validationErrors.length) return;

  const signature = validationErrors.join("|");
  if (signature === signatureRef.current) return;

  signatureRef.current = signature;
  announceFreeScanValidationError({
    step: step || findCurrentStep(root),
    errorCount: validationErrors.length,
  });
}

function captureLifecycle(root: HTMLElement, signatureRef: MutableRefObject<string>) {
  const success = root.querySelector(".system-note-success");
  if (success) {
    const text = normalizeText(success.textContent || "");
    const signature = `success:${text}`;
    if (signature !== signatureRef.current) {
      signatureRef.current = signature;
      announceFreeScanSuccess({
        quality: extractQuality(root),
        routingHint: extractLikelyMove(root),
        hasReport: text.includes("View scan report"),
      });
    }
    return;
  }

  const danger = root.querySelector(".system-note-danger");
  if (danger) {
    const text = normalizeText(danger.textContent || "");
    const signature = `error:${text}`;
    if (signature !== signatureRef.current) {
      signatureRef.current = signature;
      announceFreeScanError({
        message: text.slice(0, 180),
        detailsCount: Math.max(0, danger.querySelectorAll("div").length - 1),
      });
    }
  }
}

function findCurrentStep(root: HTMLElement) {
  const candidates = [...root.querySelectorAll("span")]
    .map((node) => normalizeText(node.textContent || ""))
    .filter((text) => STEP_LABELS.includes(text as (typeof STEP_LABELS)[number]));

  return candidates[0] || "";
}

function extractQuality(root: HTMLElement) {
  const text = normalizeText(root.textContent || "");
  const match = text.match(/Scan strength\s*(\d{1,3})%/i) || text.match(/(\d{1,3})%/);
  if (!match) return 0;

  const value = Number.parseInt(match[1] || "0", 10);
  return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
}

function extractLikelyMove(root: HTMLElement) {
  const likelyMoveHeading = [...root.querySelectorAll("h3")]
    .map((node) => normalizeText(node.textContent || ""))
    .find((text) => /fit|read|support/i.test(text));

  return likelyMoveHeading || "Unknown next move";
}

function isValidationMessage(text: string) {
  return /^(Enter|Choose|Explain|Describe)\b/.test(text);
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}
