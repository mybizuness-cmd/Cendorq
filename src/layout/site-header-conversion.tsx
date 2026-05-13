import Link from "next/link";

const BRAND_NAME = "Cendorq";

const NAV_LINKS = [
  { label: "AI Readiness", href: "/#ai-readiness", mobile: false },
  { label: "Plans", href: "/plans", mobile: true },
  { label: "Sign in", href: "/login", mobile: true },
] as const;

const CTA_CLASS =
  "inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border border-cyan-200 bg-white px-3 py-2 text-sm font-semibold text-slate-950 shadow-[0_8px_24px_rgba(14,165,233,0.1)] transition duration-200 hover:border-cyan-300 hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 sm:min-h-11 sm:px-5 sm:py-2.5";

const NAV_LINK_CLASS =
  "inline-flex min-h-9 shrink-0 items-center justify-center rounded-full px-2 py-2 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:bg-cyan-50 focus-visible:text-slate-950 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 sm:px-3";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full overflow-hidden border-b border-cyan-100 bg-white/95 text-slate-950 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-1.5 px-3 sm:h-auto sm:min-h-[4.25rem] sm:gap-3 sm:px-8 sm:py-2.5">
        <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex min-w-0 shrink-0 items-center gap-2 rounded-full py-1.5 transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 sm:px-1.5">
          <BrandMark />
          <span className="hidden truncate text-sm font-semibold tracking-[0.16em] text-slate-950 sm:inline sm:text-base">{BRAND_NAME}</span>
        </Link>

        <nav aria-label="Primary navigation" className="flex min-w-0 shrink items-center justify-center gap-0.5 overflow-hidden px-0 sm:flex-1 sm:gap-2 sm:px-1">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className={`${NAV_LINK_CLASS} ${item.mobile ? "" : "hidden md:inline-flex"}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/free-check" className={CTA_CLASS}>
          <span className="sm:hidden">Scan</span>
          <span className="hidden sm:inline">Start Free Scan</span>
        </Link>
      </div>
      <span className="sr-only">Logo links to the Cendorq homepage. Mobile navigation keeps Plans, Sign in, and Scan visible without clipping AI Readiness. Header CTA uses the light white/cyan button system. href="/login"</span>
    </header>
  );
}

function BrandMark() {
  return (
    <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-100 bg-white shadow-sm">
      <span className="relative flex items-center gap-[3px]">
        <span className="h-3.5 w-1.5 rounded-full bg-cyan-500" />
        <span className="h-5 w-1.5 rounded-full bg-slate-800" />
        <span className="h-3 w-1.5 rounded-full bg-indigo-400" />
      </span>
    </span>
  );
}
