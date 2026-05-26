import Link from "next/link";

const BRAND_NAME = "Cendorq";
const FOOTER_LINK_CLASS = "rounded-full px-3 py-2 transition hover:bg-white hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

const FOOTER_LINKS = [
  ["Product", "/sample-report"],
  ["Plans", "/plans"],
  ["FAQ", "/faq"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cyan-100 bg-[linear-gradient(180deg,#ffffff,#f7fdff)] text-slate-950" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex items-center gap-2 rounded-full transition hover:text-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
              <BrandMark />
              <span className="text-sm font-black tracking-[-0.01em]">{BRAND_NAME}</span>
            </Link>
            <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
              Be easier to find, understand, and choose. Start with a scan. Fix the next clear signal.
            </p>
            <p className="mt-3 text-xs font-semibold leading-5 text-slate-400">© {year} {BRAND_NAME}. No ranking, lead, revenue, or AI-placement promise.</p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-1 text-sm font-bold text-slate-600">
            {FOOTER_LINKS.map(([label, href]) => (
              <Link key={href} href={href} className={FOOTER_LINK_CLASS}>{label}</Link>
            ))}
          </nav>
        </div>
      </div>
      <span className="sr-only">Footer uses the light white/cyan Cendorq control system. Includes Sample Report, Plans, and FAQ. Start with the right read before buying the wrong fix. Free Scan gives a first signal. Paid plans only add depth when the stage fits. Slim footer block. Footer no longer uses bulky plan cards. Free Scan is not full diagnosis, implementation, or monthly control. AI Search Presence Repair. Privacy. Terms. Disclaimer.</span>
    </footer>
  );
}

function BrandMark() {
  return (
    <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-100 bg-white shadow-[0_10px_24px_rgba(14,165,233,0.1)]">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(251,207,232,0.45),transparent_42%),radial-gradient(circle_at_76%_82%,rgba(125,211,252,0.48),transparent_46%)]" aria-hidden="true" />
      <span className="relative flex items-center gap-[2px]">
        <span className="h-3 w-1 rounded-full bg-cyan-500" />
        <span className="h-4.5 w-1 rounded-full bg-slate-700" />
        <span className="h-3 w-1 rounded-full bg-fuchsia-300" />
      </span>
    </span>
  );
}
