"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type MatchMode = "exact" | "startsWith";
type NavItem = { label: string; href: string; description: string; match?: MatchMode };
type RouteContext = { eyebrow: string; label: string; note: string };
type Action = { href: string; label: string };

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Search Presence OS";

const PRIMARY_NAV: readonly NavItem[] = [
  { label: "Start Here", href: "/free-check", description: "Begin with the guided free scan.", match: "startsWith" },
  { label: "How It Works", href: "/diagnosis", description: "See how we find what is making people hesitate.", match: "exact" },
  { label: "Plans", href: "/pricing", description: "Compare the deeper paths in plain English.", match: "startsWith" },
  { label: "Proof & Profile", href: "/profile", description: "Understand the Cendorq point of view.", match: "exact" },
  { label: "FAQ", href: "/faq", description: "Get clear answers before choosing the next step.", match: "exact" },
] as const;

const TRUST_NAV: readonly NavItem[] = [
  { label: "Privacy", href: "/privacy", description: "How data is handled.", match: "exact" },
  { label: "Terms", href: "/terms", description: "Service scope and boundaries.", match: "exact" },
  { label: "Disclaimer", href: "/disclaimer", description: "Outcome and claim limits.", match: "exact" },
] as const;

const PLAN_NAV = [
  { label: "Free Scan", href: "/free-check", description: "Find what is making people hesitate." },
  { label: "Deep Review", href: "/pricing/full-diagnosis", description: "Know what is broken and why." },
  { label: "Build Fix", href: "/pricing/optimization", description: "Strengthen the pages, message, and path." },
  { label: "Ongoing Control", href: "/pricing/monthly-partner", description: "Keep improving as the market changes." },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const safePathname = pathname || "/";
  const isHomepage = safePathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [safePathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const previousOverflow = document.body.style.overflow;
    if (mobileOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const currentRoute = useMemo(() => buildCurrentRoute(safePathname), [safePathname]);
  const primaryCta = useMemo(() => buildPrimaryCta(safePathname), [safePathname]);
  const secondaryCta = useMemo(() => buildSecondaryCta(safePathname), [safePathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-slate-950/82 text-white backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-950/68">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />

      {!isHomepage ? (
        <div className="hidden border-b border-white/6 lg:block">
          <div className="mx-auto flex min-h-[2.7rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              <span className="system-chip rounded-full px-3 py-1 text-cyan-200">{BRAND_NAME}</span>
              <span className="text-white/20">/</span>
              <span className="truncate text-white/70">{currentRoute.eyebrow}</span>
              <span className="text-white/20">/</span>
              <span className="truncate text-cyan-100">{currentRoute.label}</span>
            </div>
            <Link href={primaryCta.href} className="truncate text-[11px] font-semibold uppercase tracking-[0.2em] text-white/78 transition hover:text-cyan-100">
              {primaryCta.label}
            </Link>
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex min-h-[4.15rem] items-center justify-between gap-4 py-3">
          <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="group inline-flex min-w-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 transition duration-200 hover:border-cyan-300/30 hover:bg-white/[0.06]">
            <BrandMark />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-[0.16em] text-white sm:text-base">{BRAND_NAME}</span>
              <span className="hidden truncate text-[11px] uppercase tracking-[0.18em] text-slate-400 sm:block">{CATEGORY_LINE}</span>
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">
            {PRIMARY_NAV.map((item) => <DesktopNavLink key={item.href} href={item.href} active={isNavActive(safePathname, item)}>{item.label}</DesktopNavLink>)}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {!isHomepage ? <Link href={secondaryCta.href} className="system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition">{secondaryCta.label}</Link> : null}
            <Link href={primaryCta.href} className="system-button-primary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition">{primaryCta.label}</Link>
          </div>

          <button type="button" aria-expanded={mobileOpen} aria-controls="mobile-site-nav" aria-label={mobileOpen ? "Close site navigation" : "Open site navigation"} onClick={() => setMobileOpen((current) => !current)} className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/26 hover:bg-white/[0.07] lg:hidden">
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        {isHomepage ? <HomeConversionStrip /> : <InnerRouteStrip label={currentRoute.label} note={currentRoute.note} />}

        {mobileOpen ? (
          <div id="mobile-site-nav" className="pb-4 lg:hidden">
            <div className="system-panel-authority rounded-[1.9rem] p-4 sm:p-5">
              <div className="grid gap-4">
                <div className="system-surface rounded-[1.35rem] p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{isHomepage ? "Start here" : currentRoute.eyebrow}</div>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">{isHomepage ? "Find what is making people hesitate." : currentRoute.label}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{isHomepage ? "The homepage has one job: move the right business into the guided free scan." : currentRoute.note}</p>
                </div>

                <Link href={primaryCta.href} className="system-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition">{primaryCta.label}</Link>

                <NavSection title="Pages" items={PRIMARY_NAV} pathname={safePathname} />
                <PlanSection pathname={safePathname} />
                <NavSection title="Trust pages" items={TRUST_NAV} pathname={safePathname} compact />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function HomeConversionStrip() {
  return (
    <div className="hidden border-t border-white/6 py-3 lg:block">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <HeaderPill>Free guided scan</HeaderPill>
          <HeaderPill>No giant form</HeaderPill>
          <HeaderPill>Clear next move</HeaderPill>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">Start with the free scan before spending more on the wrong fix.</p>
      </div>
    </div>
  );
}

function InnerRouteStrip({ label, note }: { label: string; note: string }) {
  return (
    <div className="hidden border-t border-white/6 py-3 lg:block">
      <div className="flex flex-wrap items-center gap-3">
        <HeaderPill>{label}</HeaderPill>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">/</span>
        <span className="max-w-3xl text-sm text-slate-300">{note}</span>
      </div>
    </div>
  );
}

function NavSection({ title, items, pathname, compact = false }: { title: string; items: readonly NavItem[]; pathname: string; compact?: boolean }) {
  return (
    <section>
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{title}</div>
      <div className="mt-3 grid gap-2">
        {items.map((item) => <MobileNavLink key={item.href} href={item.href} active={isNavActive(pathname, item)} compact={compact}>{item.label}<span>{item.description}</span></MobileNavLink>)}
      </div>
    </section>
  );
}

function PlanSection({ pathname }: { pathname: string }) {
  return (
    <section className="border-t border-white/8 pt-4">
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Plans in plain English</div>
      <div className="mt-3 grid gap-2">
        {PLAN_NAV.map((item) => <MobileNavLink key={item.href} href={item.href} active={pathname === item.href} compact>{item.label}<span>{item.description}</span></MobileNavLink>)}
      </div>
    </section>
  );
}

function BrandMark() {
  return <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-300/20 bg-slate-950 shadow-[0_10px_30px_rgba(2,8,23,0.22)]"><span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(103,232,249,0.25),transparent_55%)]" /><span className="relative flex items-center gap-[3px]"><span className="h-4 w-1.5 rounded-full bg-cyan-200" /><span className="h-5 w-1.5 rounded-full bg-white" /><span className="h-3 w-1.5 rounded-full bg-indigo-200" /></span></span>;
}

function HeaderPill({ children }: { children: ReactNode }) {
  return <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200"><span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />{children}</div>;
}

function DesktopNavLink({ href, active, children }: { href: string; active?: boolean; children: ReactNode }) {
  return <Link href={href} aria-current={active ? "page" : undefined} className={["inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition duration-200", active ? "border border-cyan-300/18 bg-cyan-300/10 text-cyan-100" : "text-slate-300 hover:bg-white/[0.04] hover:text-white"].join(" ")}>{children}</Link>;
}

function MobileNavLink({ href, active, children, compact = false }: { href: string; active?: boolean; children: ReactNode; compact?: boolean }) {
  return <Link href={href} aria-current={active ? "page" : undefined} className={["rounded-[1.25rem] border text-left transition duration-200", compact ? "px-4 py-3" : "px-4 py-3.5", active ? "border-cyan-300/18 bg-cyan-300/10 text-cyan-100" : "border-white/10 bg-white/[0.03] text-slate-200 hover:border-cyan-300/22 hover:bg-white/[0.05] hover:text-white"].join(" ")}><span className="block text-sm font-semibold">{Array.isArray(children) ? children[0] : children}</span>{Array.isArray(children) ? <span className="mt-1 block text-xs font-medium leading-5 tracking-normal text-slate-400">{children[1]}</span> : null}</Link>;
}

function buildPrimaryCta(pathname: string): Action {
  if (pathname.startsWith("/free-check")) return { href: "/free-check#free-check-intake", label: "Start scan" };
  return { href: "/free-check", label: "Start free scan" };
}

function buildSecondaryCta(pathname: string): Action {
  if (pathname.startsWith("/pricing/optimization")) return { href: "/pricing/full-diagnosis", label: "See deep review" };
  if (pathname.startsWith("/pricing")) return { href: "/diagnosis", label: "How it works" };
  if (pathname.startsWith("/free-check")) return { href: "/pricing", label: "View plans" };
  return { href: "/diagnosis", label: "How it works" };
}

function buildCurrentRoute(pathname: string): RouteContext {
  if (pathname.startsWith("/free-check")) return { eyebrow: "Guided scan", label: "Free Search Presence Scan", note: "A step-by-step first read for businesses that need to know why people hesitate." };
  if (pathname.startsWith("/pricing/full-diagnosis")) return { eyebrow: "Plan", label: "Deep Review", note: "Find what is broken, why it matters, and what should happen next." };
  if (pathname.startsWith("/pricing/optimization")) return { eyebrow: "Plan", label: "Build Fix", note: "Strengthen the pages, message, trust, and path people use before they act." };
  if (pathname.startsWith("/pricing/monthly-partner")) return { eyebrow: "Plan", label: "Ongoing Control", note: "Keep improving the business presence as search, competitors, and customers change." };
  if (pathname === "/pricing") return { eyebrow: "Plans", label: "Plans", note: "Compare the next steps in plain English after the free scan." };
  if (pathname.startsWith("/diagnosis")) return { eyebrow: "How it works", label: "How It Works", note: "See the path Cendorq uses to find what is making people hesitate." };
  if (pathname.startsWith("/profile")) return { eyebrow: "Profile", label: "Proof & Profile", note: "The Cendorq point of view and way of working." };
  if (pathname.startsWith("/faq")) return { eyebrow: "Answers", label: "FAQ", note: "Clear answers that help the next move feel easier." };
  if (pathname.startsWith("/contact")) return { eyebrow: "Contact", label: "Contact", note: "Use the direct lane when fit, scope, or context needs discussion." };
  if (pathname.startsWith("/privacy")) return { eyebrow: "Trust page", label: "Privacy", note: "Data boundaries and privacy posture." };
  if (pathname.startsWith("/terms")) return { eyebrow: "Trust page", label: "Terms", note: "Service scope and boundaries." };
  if (pathname.startsWith("/disclaimer")) return { eyebrow: "Trust page", label: "Disclaimer", note: "Outcome limits and claim boundaries." };
  return { eyebrow: "Cendorq", label: "Cendorq", note: "A focused system for making businesses easier to understand, trust, and choose." };
}

function isNavActive(pathname: string, item: NavItem) {
  if (item.match === "startsWith") return pathname === item.href || pathname.startsWith(`${item.href}/`);
  return pathname === item.href;
}
