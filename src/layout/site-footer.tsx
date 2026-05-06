import Link from "next/link";

type FooterLinkItem = {
  label: string;
  href: string;
};

type FooterJourneyItem = {
  label: string;
  href: string;
  description: string;
};

const BRAND_NAME = "Cendorq";

const FOOTER_JOURNEY: readonly FooterJourneyItem[] = [
  { label: "Free Scan", href: "/free-check", description: "Start with a first signal." },
  { label: "Pricing", href: "/plans", description: "Choose the right depth." },
  { label: "Dashboard", href: "/dashboard", description: "Return to your workspace." },
  { label: "Contact", href: "/connect", description: "Ask only when fit, scope, or timing is clear." },
];

const FOOTER_LINKS: readonly FooterLinkItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/8 bg-slate-950" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <div className="rounded-[1.35rem] border border-white/8 bg-white/[0.025] p-4 sm:p-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:justify-between">
            <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex max-w-sm items-start gap-2.5 text-white transition hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <BrandMark />
              <span>
                <span className="block text-base font-semibold tracking-[0.06em]">{BRAND_NAME}</span>
                <span className="mt-1 block text-xs leading-5 text-slate-400">Start with a first signal. Move deeper only when the stage fits.</span>
              </span>
            </Link>

            <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
              <nav aria-label="Footer customer journey" className="grid gap-2 sm:grid-cols-2">
                {FOOTER_JOURNEY.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-[1rem] border border-white/10 bg-white/[0.025] px-4 py-3 transition hover:border-cyan-300/24 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                    <span className="block text-sm font-semibold text-white">{item.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">{item.description}</span>
                  </Link>
                ))}
              </nav>

              <nav aria-label="Footer trust navigation" className="flex flex-wrap content-start gap-x-4 gap-y-2 text-sm text-slate-400">
                {FOOTER_LINKS.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500">© {year} {BRAND_NAME}. All rights reserved. Free Scan is a first signal, not full diagnosis, implementation, or monthly control.</p>
      </div>
    </footer>
  );
}

function BrandMark() {
  return (
    <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-300/18 bg-slate-950">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(103,232,249,0.25),transparent_55%)]" />
      <span className="relative flex items-center gap-[3px]">
        <span className="h-3 w-1 rounded-full bg-cyan-200" />
        <span className="h-4.5 w-1 rounded-full bg-white" />
        <span className="h-2.5 w-1 rounded-full bg-indigo-200" />
      </span>
    </span>
  );
}
