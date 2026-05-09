import Link from "next/link";

type FooterLinkItem = {
  label: string;
  href: string;
};

const BRAND_NAME = "Cendorq";

const FOOTER_LINKS: readonly FooterLinkItem[] = [
  { label: "Plans", href: "/plans" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Support", href: "/dashboard/support" },
  { label: "Connect", href: "/connect" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[#020713]" aria-label="Site footer">
      <div className="mx-auto max-w-[86rem] px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex items-center gap-3 text-white transition hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <BrandMark />
              <span className="text-base font-semibold tracking-[0.08em]">{BRAND_NAME}</span>
            </Link>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Market Command Intelligence for becoming easier to find, understand, trust, and choose.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-400">
              {FOOTER_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:justify-end">
              <Link href="/free-check" className="inline-flex min-h-10 items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
                Start Free Scan
              </Link>
              <Link href="/plans" className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-bold text-white transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                Review Plans
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {BRAND_NAME}. All rights reserved.</p>
          <p>Free Scan is an entry signal, not a guarantee of rankings, leads, revenue, or outcomes.</p>
        </div>

        <p className="sr-only">Minimal Market Command footer. Free Scan. Deep Review. Build Fix. Ongoing Control.</p>
      </div>
    </footer>
  );
}

function BrandMark() {
  return (
    <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-300/18 bg-slate-950">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(103,232,249,0.25),transparent_55%)]" />
      <span className="relative flex items-center gap-[3px]">
        <span className="h-3.5 w-1.5 rounded-full bg-cyan-200" />
        <span className="h-5 w-1.5 rounded-full bg-white" />
        <span className="h-3 w-1.5 rounded-full bg-indigo-200" />
      </span>
    </span>
  );
}
