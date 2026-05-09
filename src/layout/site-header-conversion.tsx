import Link from "next/link";

const BRAND_NAME = "Cendorq";

const NAV_LINKS = [
  { label: "AI Readiness", href: "/#ai-readiness", description: "Understand the AI Engine Readiness path." },
  { label: "Plans", href: "/plans", description: "Compare Scan, Review, Repair, and Control." },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white text-slate-950">
      <div className="mx-auto flex min-h-[3.75rem] max-w-7xl items-center justify-between gap-4 px-5 py-2.5 sm:px-8">
        <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex min-w-0 items-center gap-2.5 rounded-full px-1.5 py-1.5 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
          <BrandMark />
          <span className="truncate text-sm font-semibold tracking-[0.12em] text-slate-950 sm:text-base">{BRAND_NAME}</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} title={item.description} className="transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              {item.label}
              <span className="sr-only"> — {item.description}</span>
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link href="/login" className="hidden items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:inline-flex">
            Sign in
          </Link>
          <Link href="/free-check" className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-950 bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
            Start Free Scan
          </Link>
        </div>
      </div>
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
