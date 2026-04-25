import Link from "next/link";
import type { ReactNode } from "react";

type FooterLinkItem = {
  label: string;
  href: string;
};

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Search Presence OS";

const PRIMARY_LINKS: readonly FooterLinkItem[] = [
  { label: "Start Free Scan", href: "/free-check" },
  { label: "How It Works", href: "/diagnosis" },
  { label: "Plans", href: "/plans" },
  { label: "Connect", href: "/connect" },
];

const PLAN_LINKS: readonly FooterLinkItem[] = [
  { label: "Free Scan", href: "/free-check" },
  { label: "Deep Review", href: "/plans/deep-review" },
  { label: "Build Fix", href: "/plans/build-fix" },
  { label: "Ongoing Control", href: "/plans/ongoing-control" },
];

const TRUST_LINKS: readonly FooterLinkItem[] = [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const ROUTING_POINTS = [
  "Unsure what is wrong? Start free.",
  "Know the problem needs explanation? Use Deep Review.",
  "Ready to improve the weak points? Use Build Fix.",
  "Need continued control? Use Ongoing Control.",
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/6 bg-slate-950" aria-label="Site footer">
      <FooterAtmosphere />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-12">
        <section className="system-panel-authority relative overflow-hidden rounded-[2rem] p-6 sm:p-8 md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.13),transparent_35%),radial-gradient(circle_at_88%_10%,rgba(56,189,248,0.09),transparent_30%)]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-center">
            <div>
              <TopChip>Best next move</TopChip>
              <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                Start with the free scan before spending more on the wrong fix.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                If the business is still unsure why people hesitate, compare, leave, or fail to act, the free scan is the cleanest first move.
              </p>
            </div>

            <div className="grid gap-3">
              <Link
                href="/free-check"
                className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
              >
                Start free scan
              </Link>
              <Link
                href="/plans"
                className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
              >
                Compare plans
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="system-surface rounded-[1.7rem] p-5 sm:p-6">
            <BrandLockup />
            <p className="mt-5 text-sm leading-7 text-slate-300">
              {BRAND_NAME} helps businesses find what is making people hesitate, then choose the right next move without turning the site into a confusing system manual.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <FooterPill>Clear first</FooterPill>
              <FooterPill>Strong next</FooterPill>
              <FooterPill>No wrong-depth push</FooterPill>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <FooterLinkGroup title="Main path" links={PRIMARY_LINKS} highlighted />
            <FooterLinkGroup title="Plans" links={PLAN_LINKS} />
            <FooterLinkGroup title="Trust" links={TRUST_LINKS} />
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          {ROUTING_POINTS.map((item, index) => (
            <RouteTile key={item} value={item} highlighted={index === 0} />
          ))}
        </section>

        <section className="mt-8 border-t border-white/8 pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-sm leading-7 text-slate-400">
              © {year} {BRAND_NAME}. All rights reserved.
            </div>

            <nav aria-label="Footer utility navigation" className="flex flex-wrap gap-3 text-sm text-slate-400">
              <Link href="/privacy" className="transition hover:text-white">Privacy</Link>
              <Link href="/terms" className="transition hover:text-white">Terms</Link>
              <Link href="/disclaimer" className="transition hover:text-white">Disclaimer</Link>
              <Link href="/connect" className="transition hover:text-white">Connect</Link>
            </nav>
          </div>
        </section>
      </div>
    </footer>
  );
}

function FooterAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-400/8 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-sky-400/8 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-300/6 blur-3xl sm:h-80 sm:w-80" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.02]" />
    </div>
  );
}

function BrandLockup() {
  return (
    <div className="inline-flex items-center gap-4 rounded-[1.4rem] border border-white/10 bg-white/[0.035] px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm">
      <BrandMark />
      <div className="min-w-0">
        <div className="text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
          {BRAND_NAME}
        </div>
        <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-xs">
          {CATEGORY_LINE}
        </div>
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[1rem] border border-cyan-300/18 bg-slate-950 shadow-[0_16px_40px_rgba(0,0,0,0.22)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(103,232,249,0.28),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
      <div className="relative flex items-center gap-[4px]">
        <span className="h-4 w-1.5 rounded-full bg-cyan-200" />
        <span className="h-6 w-1.5 rounded-full bg-white" />
        <span className="h-3 w-1.5 rounded-full bg-indigo-200" />
      </div>
    </div>
  );
}

function TopChip({ children }: { children: ReactNode }) {
  return (
    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
      <span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />
      {children}
    </div>
  );
}

function FooterPill({ children }: { children: ReactNode }) {
  return (
    <div className="system-tag-strong rounded-full px-3 py-1.5 text-xs">
      {children}
    </div>
  );
}

function FooterLinkGroup({ title, links, highlighted = false }: { title: string; links: readonly FooterLinkItem[]; highlighted?: boolean }) {
  return (
    <section className={highlighted ? "system-panel-authority rounded-[1.5rem] p-5" : "system-surface rounded-[1.5rem] p-5"}>
      <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
      <div className="mt-4 grid gap-2">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/24 hover:bg-white/[0.05] hover:text-white">
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

function RouteTile({ value, highlighted = false }: { value: string; highlighted?: boolean }) {
  return (
    <div className={highlighted ? "system-chip rounded-[1.25rem] px-4 py-4" : "system-surface rounded-[1.25rem] px-4 py-4"}>
      <p className="text-sm font-semibold leading-6 text-white">{value}</p>
    </div>
  );
}
