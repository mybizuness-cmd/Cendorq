import Link from "next/link";

type FooterLinkItem = {
  label: string;
  href: string;
};

type FooterJourneyItem = {
  label: string;
  href: string;
  description: string;
  price: string;
};

const BRAND_NAME = "Cendorq";

const FOOTER_JOURNEY: readonly FooterJourneyItem[] = [
  { label: "Free Scan", href: "/free-check", description: "Start with the first signal before buying deeper work.", price: "$0" },
  { label: "Deep Review", href: "/plans/deep-review", description: "Diagnose the real reason customers hesitate.", price: "$497" },
  { label: "Build Fix", href: "/plans/build-fix", description: "Improve the known weak point with scoped work.", price: "$1,497" },
  { label: "Ongoing Control", href: "/plans/ongoing-control", description: "Keep decisions, visibility, and trust under monthly review.", price: "$597/mo" },
];

const FOOTER_LINKS: readonly FooterLinkItem[] = [
  { label: "Pricing", href: "/plans" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Support", href: "/dashboard/support" },
  { label: "Contact", href: "/connect" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cyan-300/10 bg-slate-950" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="relative overflow-hidden rounded-[1.7rem] border border-cyan-300/14 bg-[radial-gradient(circle_at_top_left,rgba(103,232,249,0.12),transparent_32%),linear-gradient(135deg,rgba(8,47,73,0.52),rgba(2,8,23,0.96)_48%,rgba(15,23,42,0.88))] p-5 shadow-[0_28px_100px_rgba(2,8,23,0.45)] sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" />
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.35fr] lg:items-start">
            <div>
              <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex items-center gap-3 text-white transition hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                <BrandMark />
                <span className="text-lg font-semibold tracking-[0.08em]">{BRAND_NAME}</span>
              </Link>
              <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Do not buy the wrong fix.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300">
                Start with the first signal. Move into diagnosis, scoped implementation, or monthly control only when the stage fits.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href="/free-check" className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
                  Start Free Scan
                </Link>
                <Link href="/plans" className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                  Compare plans
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {FOOTER_JOURNEY.map((item) => (
                <Link key={item.href} href={item.href} className="group rounded-[1.2rem] border border-white/10 bg-slate-950/45 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-base font-semibold text-white">{item.label}</span>
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs font-semibold text-cyan-100">{item.price}</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{item.description}</p>
                  <span className="mt-3 inline-flex text-xs font-semibold text-cyan-100 transition group-hover:text-white">Open →</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 lg:flex-row lg:items-center lg:justify-between">
            <nav aria-label="Footer trust navigation" className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-400">
              {FOOTER_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="text-xs leading-5 text-slate-500">© {year} {BRAND_NAME}. Free Scan is a first signal, not full diagnosis, implementation, or monthly control.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BrandMark() {
  return (
    <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-300/18 bg-slate-950">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(103,232,249,0.25),transparent_55%)]" />
      <span className="relative flex items-center gap-[3px]">
        <span className="h-3.5 w-1.5 rounded-full bg-cyan-200" />
        <span className="h-5 w-1.5 rounded-full bg-white" />
        <span className="h-3 w-1.5 rounded-full bg-indigo-200" />
      </span>
    </span>
  );
}
