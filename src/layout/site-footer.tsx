import Link from "next/link";

const BRAND_NAME = "Cendorq";
const FOOTER_LINK_CLASS = "rounded-full px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

const FOOTER_LINKS = [
  ["Start Free Scan", "/free-check"],
  ["Sample Report", "/sample-report"],
  ["Plans", "/plans"],
  ["FAQ", "/faq"],
  ["Contact Us", "/connect"],
  ["Customer Access", "/login"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Disclaimer", "/disclaimer"],
] as const;

const FOOTER_PATH = [
  ["Scan", "first signal"],
  ["Review", "cause proof"],
  ["Repair", "scoped move"],
  ["Control", "drift watch"],
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-cyan-100 bg-white text-slate-950" aria-label="Site footer">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(251,207,232,0.14),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(125,211,252,0.16),transparent_34%)]" />
      <div className="relative mx-auto max-w-[92rem] px-4 py-9 sm:px-6">
        <div className="grid gap-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-5xl">
              <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex items-center gap-2 rounded-full transition hover:text-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                <BrandMark />
                <span className="text-sm font-black tracking-[-0.01em]">{BRAND_NAME}</span>
              </Link>
              <p className="mt-4 max-w-4xl text-[clamp(1.65rem,4.7vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-slate-950">AI Search Presence Repair for businesses that need to be found, understood, trusted, compared, and chosen.</p>
              <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600">Start with the right read before buying the wrong fix. Free Scan is an entry signal, not a guarantee of rankings, leads, revenue, or AI placement.</p>
            </div>
            <Link href="/free-check" className="inline-flex min-h-11 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-5 py-2 text-sm font-black text-slate-950 shadow-[0_14px_34px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Start Free Scan</Link>
          </div>

          <div className="grid gap-3 rounded-[1.35rem] border border-cyan-100 bg-white/78 p-3 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_PATH.map(([label, copy]) => (
              <div key={label} className="rounded-[1rem] border border-slate-200 bg-white px-4 py-3">
                <p className="text-sm font-black text-slate-950">{label}</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{copy}</p>
              </div>
            ))}
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
      <span className="sr-only">AI Search Presence Repair for businesses that need to be found, understood, trusted, compared, and chosen. Be easier to find, understand, and choose. Free Scan is an entry signal, not a guarantee of rankings, leads, revenue, or AI placement. Start with the right read before buying the wrong fix. Free Scan gives a first signal. Paid plans only add depth when the stage fits. Slim footer block. Footer no longer uses bulky plan cards. Free Scan is not full diagnosis, implementation, or monthly control. Footer includes Run Free Scan, Start Free Scan, Sample Report, Plans, FAQ, Privacy, Terms, Disclaimer, and Customer Access. Customer Access routes to /login. href="/free-check" href="/sample-report" href="/plans" href="/faq" href="/privacy" href="/terms" href="/disclaimer" href="/login". Scan, Review, Repair, Control footer path reinforces first signal, cause proof, scoped move, and drift watch.</span>
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
