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
    <footer className="relative border-t border-slate-200 bg-[#fbfbf8] text-slate-950" aria-label="Site footer">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex items-center gap-3 text-slate-950 transition hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              <BrandMark />
              <span className="text-base font-semibold tracking-[0.08em]">{BRAND_NAME}</span>
            </Link>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Market Command Intelligence for becoming easier to find, understand, trust, and choose.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-500">
              {FOOTER_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:justify-end">
              <Link href="/free-check" className="inline-flex min-h-10 items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                Start Free Scan
              </Link>
              <Link href="/plans" className="inline-flex min-h-10 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                Review Plans
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
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
    <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
      <span className="relative flex items-center gap-[3px]">
        <span className="h-3.5 w-1.5 rounded-full bg-cyan-500" />
        <span className="h-5 w-1.5 rounded-full bg-slate-950" />
        <span className="h-3 w-1.5 rounded-full bg-indigo-400" />
      </span>
    </span>
  );
}
