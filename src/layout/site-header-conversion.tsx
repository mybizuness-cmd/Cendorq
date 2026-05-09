"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type MatchMode = "exact" | "startsWith";
type NavItem = { label: string; href: string; description: string; match?: MatchMode };
type Action = { href: string; label: string; note: string };

const BRAND_NAME = "Cendorq";

const MENU_ITEMS: readonly NavItem[] = [
  { label: "Plans", href: "/plans", description: "Compare Scan, Diagnose, Fix, and Control.", match: "startsWith" },
  { label: "Dashboard", href: "/dashboard", description: "Return to your workspace.", match: "startsWith" },
  { label: "Support", href: "/dashboard/support", description: "Get help from the support workspace.", match: "startsWith" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const safePathname = pathname || "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [safePathname]);

  const primaryCta = useMemo(() => buildPrimaryCta(safePathname), [safePathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#fffefa]/88 text-slate-950 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#fffefa]/76">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex min-h-[3.75rem] items-center justify-between gap-3 py-2.5">
          <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex min-w-0 items-center gap-2.5 rounded-full px-1.5 py-1.5 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
            <BrandMark />
            <span className="truncate text-sm font-semibold tracking-[0.12em] text-slate-950 sm:text-base">{BRAND_NAME}</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href={primaryCta.href} className="hidden items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(15,23,42,0.16)] transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:inline-flex">
              {primaryCta.label}
            </Link>

            <button type="button" aria-expanded={mobileOpen} aria-controls="site-menu" aria-label={mobileOpen ? "Close site menu" : "Open site menu"} onClick={() => setMobileOpen((current) => !current)} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              {mobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div id="site-menu" className="pb-4">
            <div className="ml-auto max-w-sm rounded-[1.4rem] border border-slate-200 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
              <div className="grid gap-2">
                <Link href={primaryCta.href} className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:hidden">
                  {primaryCta.label}
                </Link>
                <p className="rounded-[1rem] border border-slate-200 bg-[#fffefa] px-4 py-3 text-xs leading-5 text-slate-600">{primaryCta.note}</p>
                <div className="grid gap-2">
                  {MENU_ITEMS.map((item) => (
                    <MenuLink key={item.href} href={item.href} active={isNavActive(safePathname, item)}>
                      {item.label}
                      <span>{item.description}</span>
                    </MenuLink>
                  ))}
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

function MenuLink({ href, active, children }: { href: string; active?: boolean; children: ReactNode }) {
  return <Link href={href} aria-current={active ? "page" : undefined} className={["rounded-[1.1rem] border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2", active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"].join(" ")}><span className="block text-sm font-semibold">{Array.isArray(children) ? children[0] : children}</span>{Array.isArray(children) ? <span className={["mt-1 block text-xs leading-5", active ? "text-slate-200" : "text-slate-500"].join(" ")}>{children[1]}</span> : null}</Link>;
}

function buildPrimaryCta(pathname: string): Action {
  if (pathname.startsWith("/free-check")) return { href: "/free-check#free-check-intake", label: "Start scan", note: "Free Scan gives a first signal, not a full diagnosis." };
  if (pathname.startsWith("/dashboard")) return { href: "/dashboard", label: "Open dashboard", note: "Return to the protected workspace for reports, billing, support, and notifications." };
  return { href: "/free-check", label: "Start free scan", note: "Start with a first signal, then choose deeper work only when the stage fits." };
}

function isNavActive(pathname: string, item: NavItem) {
  if (item.match === "startsWith") return pathname === item.href || pathname.startsWith(`${item.href}/`);
  return pathname === item.href;
}
