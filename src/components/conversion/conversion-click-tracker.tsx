"use client";

import { trackConversionEvent } from "@/lib/conversion-events";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TRACKED_HREF_PREFIXES = [
  "/free-check",
  "/plans",
  "/plans/deep-review",
  "/plans/build-fix",
  "/plans/ongoing-control",
  "/connect",
] as const;

export function ConversionClickTracker() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = normalizeHref(anchor.getAttribute("href") || "");
      if (!href || !shouldTrackHref(href)) return;

      trackConversionEvent("cta_click", {
        href,
        text: normalizeText(anchor.textContent || ""),
        sourcePage: pathname,
      });
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname]);

  return null;
}

function shouldTrackHref(href: string) {
  return TRACKED_HREF_PREFIXES.some((prefix) => href === prefix || href.startsWith(`${prefix}#`) || href.startsWith(`${prefix}/`));
}

function normalizeHref(value: string) {
  const trimmed = value.trim();
  if (!trimmed || trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")) return "";

  try {
    const parsed = new URL(trimmed, window.location.origin);
    if (parsed.origin !== window.location.origin) return "";
    return `${parsed.pathname}${parsed.hash}`;
  } catch {
    return trimmed.startsWith("/") ? trimmed : "";
  }
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 120);
}
