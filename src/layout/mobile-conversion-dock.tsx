"use client";

import { trackConversionEvent } from "@/lib/conversion-events";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HOME_DOCK_DELAY_MS = 18_000;
const HOME_DOCK_SCROLL_RATIO = 0.58;

export function MobileConversionDock() {
  const pathname = usePathname() || "/";
  const [homeReady, setHomeReady] = useState(false);
  const isHome = pathname === "/";
  const hidden = !isHome || pathname.startsWith("/intake-console") || pathname.startsWith("/api");

  useEffect(() => {
    if (!isHome) {
      setHomeReady(false);
      return;
    }

    setHomeReady(false);
    const timer = window.setTimeout(() => setHomeReady(true), HOME_DOCK_DELAY_MS);

    function handleScroll() {
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = window.scrollY / scrollable;
      if (progress >= HOME_DOCK_SCROLL_RATIO) setHomeReady(true);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  if (hidden || !homeReady) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 lg:hidden">
      <div className="mx-auto max-w-lg rounded-full border border-cyan-300/18 bg-slate-950/88 p-2 shadow-[0_-18px_60px_rgba(2,8,23,0.45)] backdrop-blur-2xl">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1 px-3">
            <div className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Command path
            </div>
            <div className="mt-0.5 truncate text-sm font-semibold text-white">
              Start free when ready
            </div>
          </div>
          <Link
            href="/free-check"
            onClick={() => trackConversionEvent("mobile_dock_click", { label: "Start free scan", href: "/free-check" })}
            className="system-button-primary inline-flex shrink-0 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition active:scale-[0.98]"
          >
            Start free
          </Link>
        </div>
      </div>
    </div>
  );
}
