"use client";

import { trackConversionEvent } from "@/lib/conversion-events";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type DockAction = {
  href: string;
  label: string;
  support: string;
  title: string;
};

const HOME_DOCK_DELAY_MS = 16_000;
const HOME_DOCK_SCROLL_RATIO = 0.42;

export function MobileConversionDock() {
  const pathname = usePathname() || "/";
  const [homeReady, setHomeReady] = useState(false);
  const action = useMemo(() => buildDockAction(pathname), [pathname]);
  const hidden = pathname.startsWith("/intake-console") || pathname.startsWith("/api");
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setHomeReady(true);
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

  if (hidden || (isHome && !homeReady)) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 lg:hidden">
      <div className="mx-auto max-w-lg rounded-[1.35rem] border border-cyan-300/18 bg-slate-950/88 p-2 shadow-[0_-18px_60px_rgba(2,8,23,0.55)] backdrop-blur-2xl">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1 px-2">
            <div className="truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
              {action.support}
            </div>
            <div className="mt-0.5 truncate text-sm font-semibold text-white">
              {action.title}
            </div>
          </div>
          <Link
            href={action.href}
            onClick={() => trackConversionEvent("mobile_dock_click", { label: action.label, href: action.href })}
            className="system-button-primary inline-flex shrink-0 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition active:scale-[0.98]"
          >
            {action.label}
          </Link>
        </div>
      </div>
    </div>
  );
}

function buildDockAction(pathname: string): DockAction {
  if (pathname.startsWith("/free-check")) {
    return {
      href: "/free-check#free-check-intake",
      label: "Continue scan",
      support: "Guided scan room",
      title: "Keep the first read focused",
    };
  }

  if (pathname.startsWith("/plans/deep-review")) {
    return {
      href: "/plans/build-fix",
      label: "See Build Fix",
      support: "Need action next?",
      title: "Move from diagnosis to scoped improvement",
    };
  }

  if (pathname.startsWith("/plans/build-fix")) {
    return {
      href: "/plans/ongoing-control",
      label: "See Ongoing",
      support: "Need control next?",
      title: "Protect the improvement over time",
    };
  }

  if (pathname.startsWith("/plans/ongoing-control")) {
    return {
      href: "/connect",
      label: "Talk fit",
      support: "Ongoing Control",
      title: "Discuss the control path",
    };
  }

  if (pathname.startsWith("/plans")) {
    return {
      href: "/free-check",
      label: "Start free scan",
      support: "Safest first move",
      title: "Find the pressure before choosing depth",
    };
  }

  if (pathname.startsWith("/connect")) {
    return {
      href: "/free-check",
      label: "Start scan",
      support: "Still unsure?",
      title: "Return to the clean first read",
    };
  }

  return {
    href: "/free-check",
    label: "Start free scan",
    support: "Command path",
    title: "Begin with the protected first read",
  };
}
