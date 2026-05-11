import Link from "next/link";

const BRAND_NAME = "Cendorq";

const NAV_LINKS = [
  { label: "AI Readiness", href: "/#ai-readiness" },
  { label: "Plans", href: "/plans" },
] as const;

const CTA_CLASS =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-slate-950 bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.08)] transition duration-200 hover:border-slate-700 hover:bg-slate-50 hover:text-slate-950 hover:shadow-[inset_0_0_0_1px_rgba(15,23,42,0.12),0_10px_28px_rgba(15,23,42,0.1)] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";

const NAV_LINK_CLASS =
  "inline-flex min-h-9 shrink-0 items-center justify-center rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 text-slate-950 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-1.5 px-5 py-2.5 sm:px-8 lg:min-h-[4.25rem] lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex min-w-0 items-center gap-2.5 rounded-full px-1.5 py-1.5 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
            <BrandMark />
            <span className="truncate text-sm font-semibold tracking-[0.16em] text-slate-950 sm:text-base">{BRAND_NAME}</span>
          </Link>

          <Link href="/free-check" className={`${CTA_CLASS} lg:hidden`}>
            Start Free Scan
          </Link>
        </div>

        <nav aria-label="Primary navigation" className="flex items-center justify-center gap-1 border-t border-slate-100 pt-1 sm:gap-2 lg:border-0 lg:pt-0">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className={NAV_LINK_CLASS}>
              {item.label}
            </Link>
          ))}
          <Link href="/login" className={NAV_LINK_CLASS}>
            Sign in
          </Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Link href="/free-check" className={CTA_CLASS}>
            Start Free Scan
          </Link>
        </div>
      </div>
      <span className="sr-only">No dropdown public header. Visible navigation uses AI Readiness, Plans, Sign in, and Start Free Scan.</span>
    </header>
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
