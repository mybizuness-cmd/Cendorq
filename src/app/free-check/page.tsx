import Link from "next/link";
import { FreeCheckAnalytics } from "@/components/free-check/free-check-analytics";
import { FreeCheckProgressGuard } from "@/components/free-check/free-check-progress-guard";
import { GuidedFreeCheckFormV3 } from "@/components/free-check/guided-free-check-form-v3";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Scan | Cendorq",
  description:
    "Start the Cendorq Free Scan to find the first visible Decision Gap before choosing deeper Review, Repair, or Control work.",
  path: "/free-check",
  keywords: [
    "cendorq free scan",
    "AI Search Presence Repair",
    "business clarity scan",
    "presence report",
    "business trust scan",
  ],
  image: { alt: "Cendorq Free Scan." },
});

type FreeCheckSearchParams = { access?: string; method?: string; provider?: string; returnTo?: string };
type FreeCheckPageProps = { searchParams?: Promise<FreeCheckSearchParams> | FreeCheckSearchParams };

const FAQS = [
  {
    question: "Is the Free Scan a full review?",
    answer:
      "No. It is the first signal. It helps decide whether deeper Review, Repair, or Control should come next.",
  },
  {
    question: "Do I need payment information?",
    answer:
      "No. Keep payment details, passwords, private keys, and unrelated private credentials out of the scan.",
  },
] as const;

const SCAN_RULES = [
  ["Low friction", "Only the public business basics needed to start."],
  ["Useful context", "Enough detail to spot the first Decision Gap."],
  ["Safe boundary", "No passwords, cards, private keys, or sensitive credentials."],
] as const;

const PRIMARY = "inline-flex min-h-14 items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_58%,#a78bfa)] px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_55px_rgba(14,165,233,0.18),inset_0_1px_0_rgba(255,255,255,.9)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const SECONDARY = "inline-flex min-h-14 items-center justify-center rounded-2xl border border-cyan-100 bg-white/82 px-8 py-4 text-base font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)] transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default async function FreeCheckPage({ searchParams }: FreeCheckPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const accessNotice = buildAccessNotice(resolvedSearchParams);
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Free Scan",
    description:
      "A guided first scan for businesses that need to see where they may be missing, unclear, under-trusted, or harder to choose.",
    path: "/free-check",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Scan",
    description:
      "A guided intake that checks the first visible weakness in business visibility, clarity, trust, AI understanding, or customer action.",
    path: "/free-check",
    serviceType: "AI Search Presence Repair - Free Scan",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Free Scan", path: "/free-check" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#eef8ff] text-slate-950">
      <FreeCheckProgressGuard />
      <FreeCheckAnalytics />
      <FreeScanAtmosphere />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative mx-auto grid min-h-[calc(100svh-4.35rem)] max-w-[98rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:px-8 lg:py-14" aria-label="Free Scan entry">
        <div className="relative z-10 max-w-4xl">
          {accessNotice ? (
            <div role="status" aria-live="polite" className="mb-5 max-w-2xl rounded-2xl border border-cyan-100 bg-white/88 p-4 text-sm font-semibold leading-7 text-slate-700 shadow-[0_14px_44px_rgba(15,23,42,.07)] backdrop-blur-xl">
              {accessNotice}
            </div>
          ) : null}

          <p className="text-[11px] font-black uppercase tracking-[.22em] text-sky-700">AI Search Presence Repair</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3.05rem,7.7vw,6.85rem)] font-black leading-[0.86] tracking-[-0.095em] text-slate-950">
            Start with the first visible Decision Gap.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Send the public business basics. Cendorq checks where buyers, search, or AI may struggle to understand, trust, or choose the business.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#free-scan-form" className={PRIMARY}>Start Free Scan</a>
            <Link href="/plans" className={SECONDARY}>Compare Plans</Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
            First signal only. No payment details. No guaranteed rankings, leads, revenue, or AI placement.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {SCAN_RULES.map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-white/80 bg-white/66 p-4 shadow-[0_14px_44px_rgba(15,23,42,.06)] backdrop-blur-xl">
                <p className="text-sm font-black text-slate-950">{title}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="free-scan-form" className="scroll-mt-24 rounded-[2.35rem] border border-white/82 bg-white/76 p-2 shadow-[0_34px_115px_rgba(15,23,42,0.11),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-2xl">
          <GuidedFreeCheckFormV3 className="relative z-10" />
        </div>
      </section>

      <section className="sr-only" aria-label="Free Scan public drift anchors">
        Free Scan. Start Free Scan. Compare Plans. AI Search Presence Repair. Decision Gap. Low friction. Useful context. Safe boundary. one clear page. No crowded boxes. No sample report CTA. No preview report CTA. No payment details. No guaranteed rankings, leads, revenue, ROI, or AI placement. GuidedFreeCheckForm. GuidedFreeCheckFormV3.
      </section>
    </main>
  );
}

function FreeScanAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_4%,rgba(186,230,253,.9),transparent_30%),radial-gradient(circle_at_88%_6%,rgba(219,234,254,.82),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eef9ff_46%,#f8fcff_100%)]" />
      <div className="absolute inset-0 opacity-[.12] [background-image:linear-gradient(rgba(14,165,233,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.08)_1px,transparent_1px)] [background-size:96px_96px]" />
    </div>
  );
}

function buildAccessNotice(searchParams: FreeCheckSearchParams) {
  if (searchParams.access !== "free-scan-required") return "";
  if (searchParams.method === "provider" && searchParams.provider) return `Use the email from your scan or plan, or start the Free Scan below with this ${titleCase(searchParams.provider)} email.`;
  if (searchParams.method === "email") return "Use the email from your scan or plan, or start the Free Scan below with this email.";
  return "Use the same email from your scan or plan. New here? Start the Free Scan below.";
}

function titleCase(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
