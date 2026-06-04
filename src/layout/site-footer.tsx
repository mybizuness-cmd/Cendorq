import Link from "next/link";

const BRAND_NAME = "Cendorq";
const FOOTER_LINK_CLASS = "rounded-full px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

const FOOTER_LINKS = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Disclaimer", "/disclaimer"],
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cyan-100 bg-white text-slate-950" aria-label="Site footer">
      <div className="mx-auto flex max-w-[92rem] flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex w-fit items-center gap-2 rounded-full transition hover:text-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
          <BrandMark />
          <span className="text-sm font-black tracking-[-0.01em]">{BRAND_NAME}</span>
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:gap-5">
          <nav aria-label="Footer legal navigation" className="flex flex-wrap items-center gap-1">
            {FOOTER_LINKS.map(([label, href]) => (
              <Link key={href} href={href} className={FOOTER_LINK_CLASS}>{label}</Link>
            ))}
          </nav>
          <p className="text-xs font-semibold leading-5 text-slate-400">© {year} {BRAND_NAME}</p>
        </div>
      </div>
      <span className="sr-only">Slim footer. Footer keeps only Privacy, Terms, and Disclaimer. Main buyer navigation stays in the header.</span>
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
