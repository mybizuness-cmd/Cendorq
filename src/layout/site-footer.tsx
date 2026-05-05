import Link from "next/link";
import type { ReactNode } from "react";

type FooterLinkItem = {
  label: string;
  href: string;
};

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Business Command Intelligence";

const ESSENTIAL_LINKS: readonly FooterLinkItem[] = [
  { label: "Free Scan", href: "/free-check" },
  { label: "Pricing", href: "/plans" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Contact", href: "/connect" },
];

const PLAN_PRICES = [
  { name: "Free Scan", price: "$0", note: "first read" },
  { name: "Deep Review", price: "$300", note: "full diagnosis" },
  { name: "Build Fix", price: "$750+", note: "scoped improvement" },
  { name: "Ongoing Control", price: "$300/mo", note: "monthly command" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/6 bg-slate-950" aria-label="Site footer">
      <FooterAtmosphere />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10">
        <section className="system-panel-authority relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_35%),radial-gradient(circle_at_88%_10%,rgba(56,189,248,0.08),transparent_30%)]" />
          <div className="relative z-10 grid gap-7 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <TopChip>Final command path</TopChip>
              <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                If the business is hard to understand, trust, find, or choose, start with the first read.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                Cendorq shows where the customer decision path is breaking before the business spends deeper.
              </p>
            </div>

            <div className="grid gap-3">
              <Link
                href="/free-check"
                className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Start free scan
              </Link>
              <Link
                href="/plans"
                className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                View pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="system-surface rounded-[1.7rem] p-5 sm:p-6">
            <BrandLockup />
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {BRAND_NAME} is a business command intelligence system for owners who need the next decision to be obvious, protected, and grounded before they spend deeper.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <FooterPill>Clarity command</FooterPill>
              <FooterPill>Trust command</FooterPill>
              <FooterPill>AI-search aware</FooterPill>
              <FooterPill>Protected platform</FooterPill>
            </div>
          </div>

          <div className="system-surface rounded-[1.7rem] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-white">Clear plan depth</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Start free. Move deeper only when the business needs fuller diagnosis, implementation, or monthly command.
                </p>
              </div>
              <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white">
                Compare all plans →
              </Link>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {PLAN_PRICES.map((plan) => (
                <div key={plan.name} className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4">
                  <div className="text-sm font-semibold text-white">{plan.name}</div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-cyan-100">{plan.price}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{plan.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 border-t border-white/8 pt-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-sm leading-7 text-slate-400">
              © {year} {BRAND_NAME}. All rights reserved.
            </div>

            <nav aria-label="Essential footer navigation" className="flex flex-wrap gap-3 text-sm text-slate-400">
              {ESSENTIAL_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ))}
              <Link href="/privacy" className="transition hover:text-white">Privacy</Link>
              <Link href="/terms" className="transition hover:text-white">Terms</Link>
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
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
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
