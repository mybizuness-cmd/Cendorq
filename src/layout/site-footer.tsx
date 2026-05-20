import Link from "next/link";

const BRAND_NAME = "Cendorq";
const FOOTER_LINK_CLASS = "transition hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cyan-100 bg-white text-slate-950" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
        <div className="flex flex-col gap-3 text-xs leading-5 text-slate-500 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-5xl">
            <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex items-center gap-2 rounded-full text-slate-950 transition hover:bg-cyan-50 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
              <BrandMark />
              <span className="text-sm font-semibold tracking-[0.08em]">{BRAND_NAME}</span>
            </Link>
            <p className="mt-2 leading-5">
              AI visibility and readiness for businesses that need to be seen, understood, trusted, and chosen. Free Scan is an entry signal, not a guarantee of rankings, leads, revenue, or AI placement.
            </p>
            <p className="mt-2 text-slate-400">© {year} {BRAND_NAME}. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-semibold">
            <Link href="/faq" className={FOOTER_LINK_CLASS}>FAQ</Link>
            <Link href="/privacy" className={FOOTER_LINK_CLASS}>Privacy</Link>
            <Link href="/terms" className={FOOTER_LINK_CLASS}>Terms</Link>
            <Link href="/disclaimer" className={FOOTER_LINK_CLASS}>Disclaimer</Link>
          </div>
        </div>
      </div>
      <span className="sr-only">Footer uses the light white/cyan Cendorq control system. href="/faq"</span>
    </footer>
  );
}

function BrandMark() {
  return (
    <span className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-100 bg-white shadow-sm">
      <span className="relative flex items-center gap-[2px]">
        <span className="h-2.5 w-1 rounded-full bg-cyan-500" />
        <span className="h-4 w-1 rounded-full bg-slate-800" />
        <span className="h-2.5 w-1 rounded-full bg-indigo-400" />
      </span>
    </span>
  );
}
