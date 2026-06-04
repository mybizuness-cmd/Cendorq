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
      <div className="mx-auto max-w-lg rounded-full border border-cyan-100 bg-white/92 p-2 shadow-[0_-18px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1 px-3">
            <div className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Start Scan
            </div>
            <div className="mt-0.5 truncate text-sm font-black text-slate-950">
              Find the first weak signal
            </div>
          </div>
          <Link
            href="/free-check"
            onClick={() => trackConversionEvent("mobile_dock_click", { label: "Start Scan", href: "/free-check" })}
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-5 py-3 text-sm font-black text-slate-950 shadow-sm transition active:scale-[0.98]"
          >
            Start Scan
          </Link>
        </div>
      </div>
    </div>
  );
}
