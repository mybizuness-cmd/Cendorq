"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type MatchMode = "exact" | "startsWith";
type NavItem = { label: string; href: string; description: string; match?: MatchMode };
type Action = { href: string; label: string; note: string };

const BRAND_NAME = "Cendorq";

const PRIMARY_NAV: readonly NavItem[] = [
  { label: "Free Scan", href: "/free-check", description: "Start with a first signal.", match: "startsWith" },
  { label: "Plans", href: "/plans", description: "Compare Scan, Diagnose, Fix, and Control.", match: "startsWith" },
  { label: "Dashboard", href: "/dashboard", description: "Return to your workspace.", match: "startsWith" },
] as const;

const MOBILE_JOURNEY = [
  "Free Scan: first signal",
  "Deep Review: diagnosis",
  "Build Fix: scoped implementation",
  "Ongoing Control: monthly control",
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const safePathname = pathname || "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [safePathname]);

  const primaryCta = useMemo(() => buildPrimaryCta(safePathname), [safePathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#fbfbf8]/88 text-slate-950 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#fbfbf8]/76">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex min-h-[3.75rem] items-center justify-between gap-3 py-2.5">
          <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex min-w-0 items-center gap-2.5 rounded-full px-1.5 py-1.5 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
            <BrandMark />
            <span className="truncate text-sm font-semibold tracking-[0.12em] text-slate-950 sm:text-base">{BRAND_NAME}</span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV.map((item) => (
              <DesktopNavLink key={item.href} href={item.href} active={isNavActive(safePathname, item)}>
                {item.label}
              </DesktopNavLink>
            ))}
          </nav>

          <div className="hidden lg:flex">
            <Link href={primaryCta.href} className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              {primaryCta.label}
            </Link>
          </div>

          <button type="button" aria-expanded={mobileOpen} aria-controls="mobile-site-nav" aria-label={mobileOpen ? "Close site navigation" : "Open site navigation"} onClick={() => setMobileOpen((current) => !current)} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 lg:hidden">
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        {mobileOpen ? (
          <div id="mobile-site-nav" className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain pb-4 lg:hidden">
            <div className="rounded-[1.4rem] border border-slate-200 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
              <div className="grid gap-2">
                <Link href={primaryCta.href} className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                  {primaryCta.label}
                </Link>
                <p className="rounded-[1rem] border border-slate-200 bg-[#fbfbf8] px-4 py-3 text-xs leading-5 text-slate-600">{primaryCta.note}</p>
                <div className="grid gap-2">
                  {PRIMARY_NAV.map((item) => (
                    <MobileNavLink key={item.href} href={item.href} active={isNavActive(safePathname, item)}>
                      {item.label}
                      <span>{item.description}</span>
                    </MobileNavLink>
                  ))}
                </div>
                <div className="rounded-[1.1rem] border border-slate-200 bg-[#fbfbf8] p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Customer journey</div>
                  <div className="mt-2 grid gap-1">
                    {MOBILE_JOURNEY.map((item) => (
                      <p key={item} className="text-xs leading-5 text-slate-600">{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function BrandMark() {
  return <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm"><span className="relative flex items-center gap-[3px]"><span className="h-3.5 w-1.5 rounded-full bg-cyan-500" /><span className="h-5 w-1.5 rounded-full bg-slate-950" /><span className="h-3 w-1.5 rounded-full bg-indigo-400" /></span></span>;
}

function DesktopNavLink({ href, active, children }: { href: string; active?: boolean; children: ReactNode }) {
  return <Link href={href} aria-current={active ? "page" : undefined} className={["inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2", active ? "bg-slate-950 text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"].join(" ")}>{children}</Link>;
}

function MobileNavLink({ href, active, children }: { href: string; active?: boolean; children: ReactNode }) {
  return <Link href={href} aria-current={active ? "page" : undefined} className={["rounded-[1.1rem] border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2", active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"].join(" ")}><span className="block text-sm font-semibold">{Array.isArray(children) ? children[0] : children}</span>{Array.isArray(children) ? <span className={["mt-1 block text-xs leading-5", active ? "text-slate-200" : "text-slate-500"].join(" ")}>{children[1]}</span> : null}</Link>;
}

function buildPrimaryCta(pathname: string): Action {
  if (pathname.startsWith("/free-check")) return { href: "/free-check#free-check-intake", label: "Start scan", note: "Use safe business context only. Free Scan gives a first signal, not a full diagnosis." };
  if (pathname.startsWith("/plans")) return { href: "/free-check", label: "Start free scan", note: "Start with the first signal when the correct paid depth is not yet clear." };
  if (pathname.startsWith("/dashboard")) return { href: "/dashboard", label: "Open dashboard", note: "Return to the protected workspace for reports, billing, support, and notifications." };
  return { href: "/free-check", label: "Start free scan", note: "Start with a first signal, then choose Deep Review, Build Fix, or Ongoing Control only when the stage fits." };
}

function isNavActive(pathname: string, item: NavItem) {
  if (item.match === "startsWith") return pathname === item.href || pathname.startsWith(`${item.href}/`);
  return pathname === item.href;
}
