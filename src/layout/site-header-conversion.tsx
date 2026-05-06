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
  { label: "Pricing", href: "/plans", description: "Choose the right depth.", match: "startsWith" },
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
    <header className="sticky top-0 z-50 border-b border-white/8 bg-slate-950/88 text-white backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-950/76">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex min-h-[3.75rem] items-center justify-between gap-3 py-2.5">
          <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex min-w-0 items-center gap-2.5 rounded-full px-1.5 py-1.5 transition hover:bg-white/[0.035] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            <BrandMark />
            <span className="truncate text-sm font-semibold tracking-[0.12em] text-white sm:text-base">{BRAND_NAME}</span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV.map((item) => (
              <DesktopNavLink key={item.href} href={item.href} active={isNavActive(safePathname, item)}>
                {item.label}
              </DesktopNavLink>
            ))}
          </nav>

          <div className="hidden lg:flex">
            <Link href={primaryCta.href} className="system-button-primary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              {primaryCta.label}
            </Link>
          </div>

          <button type="button" aria-expanded={mobileOpen} aria-controls="mobile-site-nav" aria-label={mobileOpen ? "Close site navigation" : "Open site navigation"} onClick={() => setMobileOpen((current) => !current)} className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/26 hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 lg:hidden">
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        {mobileOpen ? (
          <div id="mobile-site-nav" className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain pb-4 lg:hidden">
            <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/96 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <div className="grid gap-2">
                <Link href={primaryCta.href} className="system-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
                  {primaryCta.label}
                </Link>
                <p className="rounded-[1rem] border border-cyan-300/15 bg-cyan-300/10 px-4 py-3 text-xs leading-5 text-cyan-50">{primaryCta.note}</p>
                <div className="grid gap-2">
                  {PRIMARY_NAV.map((item) => (
                    <MobileNavLink key={item.href} href={item.href} active={isNavActive(safePathname, item)}>
                      {item.label}
                      <span>{item.description}</span>
                    </MobileNavLink>
                  ))}
                </div>
                <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Customer journey</div>
                  <div className="mt-2 grid gap-1">
                    {MOBILE_JOURNEY.map((item) => (
                      <p key={item} className="text-xs leading-5 text-slate-300">{item}</p>
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
  return <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-300/18 bg-slate-950"><span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(103,232,249,0.25),transparent_55%)]" /><span className="relative flex items-center gap-[3px]"><span className="h-3.5 w-1.5 rounded-full bg-cyan-200" /><span className="h-5 w-1.5 rounded-full bg-white" /><span className="h-3 w-1.5 rounded-full bg-indigo-200" /></span></span>;
}

function DesktopNavLink({ href, active, children }: { href: string; active?: boolean; children: ReactNode }) {
  return <Link href={href} aria-current={active ? "page" : undefined} className={["inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950", active ? "bg-cyan-300/10 text-cyan-100" : "text-slate-300 hover:bg-white/[0.04] hover:text-white"].join(" ")}>{children}</Link>;
}

function MobileNavLink({ href, active, children }: { href: string; active?: boolean; children: ReactNode }) {
  return <Link href={href} aria-current={active ? "page" : undefined} className={["rounded-[1.1rem] border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950", active ? "border-cyan-300/18 bg-cyan-300/10 text-cyan-100" : "border-white/10 bg-white/[0.03] text-slate-200 hover:border-cyan-300/22 hover:bg-white/[0.05] hover:text-white"].join(" ")}><span className="block text-sm font-semibold">{Array.isArray(children) ? children[0] : children}</span>{Array.isArray(children) ? <span className="mt-1 block text-xs leading-5 text-slate-400">{children[1]}</span> : null}</Link>;
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
