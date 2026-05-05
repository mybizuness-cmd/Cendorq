import Link from "next/link";

type FooterLinkItem = {
  label: string;
  href: string;
};

const BRAND_NAME = "Cendorq";

const FOOTER_LINKS: readonly FooterLinkItem[] = [
  { label: "Contact", href: "/connect" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/8 bg-slate-950" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-4 rounded-[1.25rem] border border-white/8 bg-white/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" aria-label={`${BRAND_NAME} homepage`} className="inline-flex items-center gap-2.5 text-white transition hover:text-cyan-100">
            <BrandMark />
            <span>
              <span className="block text-base font-semibold tracking-[0.06em]">{BRAND_NAME}</span>
              <span className="block text-xs text-slate-400">Find the break before you buy the fix.</span>
            </span>
          </Link>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-400">
            {FOOTER_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-3 text-xs text-slate-500">© {year} {BRAND_NAME}. All rights reserved.</p>
      </div>
    </footer>
  );
}

function BrandMark() {
  return (
    <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-300/18 bg-slate-950">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(103,232,249,0.25),transparent_55%)]" />
      <span className="relative flex items-center gap-[3px]">
        <span className="h-3 w-1 rounded-full bg-cyan-200" />
        <span className="h-4.5 w-1 rounded-full bg-white" />
        <span className="h-2.5 w-1 rounded-full bg-indigo-200" />
      </span>
    </span>
  );
}
