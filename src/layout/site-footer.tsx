import Link from "next/link";

const BRAND_NAME = "Cendorq";
const FOOTER_LINK_CLASS = "rounded-full px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

const FOOTER_LINKS = [
  ["How it works", "/sample-report"],
  ["Plans", "/plans"],
  ["Questions", "/faq"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Disclaimer", "/disclaimer"],
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cyan-100 bg-white text-slate-950" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid gap-5">
          <div className="max-w-5xl">
            <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex items-center gap-2 rounded-full transition hover:text-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
              <BrandMark />
              <span className="text-sm font-black tracking-[-0.01em]">{BRAND_NAME}</span>
            </Link>
            <p className="mt-4 text-[clamp(1.85rem,5vw,3.4rem)] font-semibold leading-[0.95] tracking-[-0.075em] text-slate-950">
              Be easier to find, understand, and choose.
            </p>
          </div>

          <div className="grid gap-4 border-t border-cyan-100 pt-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-1">
              {FOOTER_LINKS.map(([label, href]) => (
                <Link key={href} href={href} className={FOOTER_LINK_CLASS}>{label}</Link>
              ))}
            </nav>
            <p className="text-xs font-semibold leading-5 text-slate-400">© {year} {BRAND_NAME}</p>
          </div>
        </div>
      </div>
      <span className="sr-only">AI Search Presence Repair for businesses that need to be found, understood, trusted, compared, and chosen. Free Scan is an entry signal, not a guarantee of rankings, leads, revenue, or AI placement. Start with the right read before buying the wrong fix. Free Scan gives a first signal. Paid plans only add depth when the stage fits. Slim footer block. Footer no longer uses bulky plan cards. Free Scan is not full diagnosis, implementation, or monthly control. Footer includes Sample Report, Plans, FAQ, Privacy, Terms, and Disclaimer. href="/sample-report" href="/plans" href="/faq" href="/privacy" href="/terms" href="/disclaimer"</span>
    </footer>
  );
}

function BrandMark() {
  return (
    <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-100 bg-white shadow-[0_10px_24px_rgba(14,165,233,0.1)]">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(251,207,232,0.45),transparent_42%),radial-gradient(circle_at_76%_82%,rgba(125,211,252,0.48),transparent_46%)]" aria-hidden="true" />
      <span className="relative flex items-center gap-[2px]">
        <span className="h-3 w-1 rounded-full bg-cyan-500" />
        <span className="h-[1.125rem] w-1 rounded-full bg-slate-700" />
        <span className="h-3 w-1 rounded-full bg-fuchsia-300" />
      </span>
    </span>
  );
}
